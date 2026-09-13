import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, SkipForward, SkipBack, X, Trophy, Timer } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Dummy exercises database
const workoutDB = {
  'w1': {
    name: 'Morning Cardio Surge',
    calories: 300,
    exercises: [
      { id: 'e1', name: 'Jumping Jacks', reps: '45s', rest: 15 },
      { id: 'e2', name: 'High Knees', reps: '45s', rest: 15 },
      { id: 'e3', name: 'Burpees', reps: '30s', rest: 30 },
    ]
  },
  'w2': {
    name: 'Core Crusher',
    calories: 150,
    exercises: [
      { id: 'e4', name: 'Crunches', reps: '20', rest: 30 },
      { id: 'e5', name: 'Plank', reps: '60s', rest: 30 },
    ]
  },
  'w3': {
    name: 'Yoga Flow',
    calories: 100,
    exercises: [
      { id: 'e6', name: 'Downward Dog', reps: '60s', rest: 0 },
      { id: 'e7', name: 'Childs Pose', reps: '60s', rest: 0 },
    ]
  }
};

export const WorkoutActive = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [history, setHistory] = useLocalStorage('eudaimix_workout_history', []);
  const [streak, setStreak] = useLocalStorage('eudaimix_streak', 0);
  
  const workout = workoutDB[id] || workoutDB['w1'];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());
  const [durationStr, setDurationStr] = useState('00:00');

  const currentExercise = workout.exercises[currentIndex];
  const progressPercent = ((currentIndex + (isResting ? 0.5 : 0)) / workout.exercises.length) * 100;

  // Timer logic for Rest
  useEffect(() => {
    let timer;
    if (isResting && !isPaused && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (isResting && !isPaused && timeLeft === 0) {
      // Rest over, go to next exercise or finish
      handleNext();
    }
    return () => clearInterval(timer);
  }, [isResting, isPaused, timeLeft]);

  // Total duration timer when complete
  useEffect(() => {
    if (isComplete) {
      const diff = Math.floor((Date.now() - startTime) / 1000);
      const m = Math.floor(diff / 60).toString().padStart(2, '0');
      const s = (diff % 60).toString().padStart(2, '0');
      setDurationStr(`${m}:${s}`);
    }
  }, [isComplete]);

  const handleNext = () => {
    if (isResting) {
      // Moving from Rest to Next Exercise
      setIsResting(false);
      if (currentIndex + 1 >= workout.exercises.length) {
        finishWorkout();
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    } else {
      // Moving from Exercise to Rest (if rest exists)
      if (currentExercise.rest > 0 && currentIndex + 1 < workout.exercises.length) {
        setTimeLeft(currentExercise.rest);
        setIsResting(true);
      } else {
        // No rest, straight to next or finish
        if (currentIndex + 1 >= workout.exercises.length) {
          finishWorkout();
        } else {
          setCurrentIndex(prev => prev + 1);
        }
      }
    }
  };

  const handlePrev = () => {
    if (isResting) {
      setIsResting(false);
    } else if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsResting(false);
    }
  };

  const finishWorkout = () => {
    setIsComplete(true);
    setStreak(s => s + 1);
    const log = {
      id: Date.now(),
      workoutId: id,
      name: workout.name,
      date: new Date().toISOString(),
      calories: workout.calories
    };
    setHistory([...history, log]);
  };

  if (isComplete) {
    return (
      <div className="page-animate" style={{ paddingBottom: '6rem', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ background: 'var(--color-success-green)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 0 40px rgba(63, 166, 107, 0.4)' }}>
          <Trophy size={40} color="white" />
        </div>
        <h1 style={{ color: 'var(--color-brand-navy)', fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>Workout Complete!</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>Great work! You crushed {workout.name}.</p>
        
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', background: 'rgba(255,255,255,0.7)', padding: '1.5rem 2rem', borderRadius: '24px', backdropFilter: 'blur(12px)' }}>
          <div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Duration</div>
            <div style={{ color: 'var(--color-brand-navy)', fontSize: '1.5rem', fontWeight: 700 }}>{durationStr}</div>
          </div>
          <div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Calories</div>
            <div style={{ color: 'var(--color-alert-red)', fontSize: '1.5rem', fontWeight: 700 }}>{workout.calories}</div>
          </div>
          <div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Streak</div>
            <div style={{ color: 'var(--color-brand-gold)', fontSize: '1.5rem', fontWeight: 700 }}>{streak + 1}🔥</div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/')} 
          style={{ padding: '1rem 3rem', background: 'var(--color-brand-navy)', color: 'white', borderRadius: '30px', fontWeight: 600, fontSize: '1.1rem', border: 'none', cursor: 'pointer', boxShadow: 'var(--shadow-button)' }}
        >
          BACK TO DASHBOARD
        </button>
      </div>
    );
  }

  return (
    <div className="page-animate" style={{ paddingBottom: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Nav & Progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <button onClick={() => navigate('/fitness')} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <X size={28} />
        </button>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-brand-navy)' }}>
          {isResting ? 'Recovery' : `Exercise ${currentIndex + 1} of ${workout.exercises.length}`}
        </div>
        <div style={{ width: 28 }} /> {/* Spacer */}
      </div>

      <div style={{ width: '100%', height: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '3px', marginBottom: '2rem', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${progressPercent}%`, background: 'var(--color-brand-navy)', transition: 'width 0.3s ease' }} />
      </div>

      {/* Main Visual Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
        {isResting ? (
          <>
            <Timer size={64} color="var(--color-brand-sky)" style={{ marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '2rem', color: 'var(--color-text-secondary)', margin: '0 0 1rem 0' }}>Rest & Recover</h2>
            <div style={{ fontSize: '5rem', fontWeight: 700, color: 'var(--color-brand-navy)', lineHeight: 1, fontFamily: 'monospace' }}>
              00:{timeLeft.toString().padStart(2, '0')}
            </div>
            <p style={{ marginTop: '2rem', color: 'var(--color-text-secondary)' }}>
              Next up: <strong>{workout.exercises[currentIndex + 1]?.name || 'Finish'}</strong>
            </p>
          </>
        ) : (
          <>
            <div style={{ width: '100%', maxWidth: '400px', aspectRatio: '4/3', background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))', borderRadius: '24px', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: 'var(--shadow-elevation)' }}>
              {/* Placeholder for Video/Animation */}
              <Activity size={80} color="var(--color-brand-mid)" opacity={0.5} />
            </div>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--color-brand-navy)', margin: '0 0 0.5rem 0', textAlign: 'center' }}>
              {currentExercise.name}
            </h1>
            <div style={{ fontSize: '1.5rem', color: 'var(--color-brand-gold)', fontWeight: 600 }}>
              {currentExercise.reps}
            </div>
          </>
        )}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
        <button onClick={handlePrev} disabled={currentIndex === 0 && !isResting} style={{ background: 'rgba(255,255,255,0.7)', border: 'none', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-navy)', cursor: 'pointer', opacity: (currentIndex === 0 && !isResting) ? 0.3 : 1 }}>
          <SkipBack size={24} />
        </button>
        
        <button onClick={() => setIsPaused(!isPaused)} style={{ background: 'var(--color-brand-navy)', border: 'none', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', boxShadow: '0 10px 25px rgba(30, 58, 95, 0.3)' }}>
          {isPaused ? <Play size={32} fill="white" /> : <Pause size={32} fill="white" />}
        </button>

        <button onClick={handleNext} style={{ background: 'rgba(255,255,255,0.7)', border: 'none', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-navy)', cursor: 'pointer' }}>
          <SkipForward size={24} />
        </button>
      </div>

    </div>
  );
};
