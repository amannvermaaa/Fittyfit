import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Activity, Flame, Flower2, Calendar, Clock, ChevronRight, Play } from 'lucide-react';
import { GlassCard } from '../components/ui';

export const Fitness = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Strength', icon: Dumbbell, color: 'var(--color-brand-navy)', count: '12 Workouts' },
    { name: 'Cardio', icon: Activity, color: 'var(--color-brand-sky)', count: '8 Workouts' },
    { name: 'HIIT', icon: Flame, color: 'var(--color-alert-red)', count: '15 Workouts' },
    { name: 'Yoga', icon: Flower2, color: 'var(--color-success-green)', count: '5 Workouts' },
  ];

  const weeklyPlan = [
    { day: 'Mon', focus: 'Upper Body', done: true },
    { day: 'Tue', focus: 'Cardio', done: false, active: true },
    { day: 'Wed', focus: 'Recovery', done: false },
    { day: 'Thu', focus: 'Lower Body', done: false },
    { day: 'Fri', focus: 'HIIT', done: false },
  ];

  const suggestedWorkouts = [
    { id: 'w1', name: 'Morning Cardio Surge', difficulty: 'Intermediate', target: 'Full Body', sets: 3, reps: '45s', rest: '15s', calories: 300, duration: '20 Min' },
    { id: 'w2', name: 'Core Crusher', difficulty: 'Advanced', target: 'Abs & Obliques', sets: 4, reps: '20', rest: '30s', calories: 150, duration: '15 Min' },
    { id: 'w3', name: 'Yoga Flow', difficulty: 'Beginner', target: 'Flexibility', sets: 1, reps: '5m', rest: '0s', calories: 100, duration: '10 Min' }
  ];

  return (
    <div className="page-animate" style={{ paddingBottom: '6rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-navy)', fontSize: '2rem' }}>Fitness Hub</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>Your customized training plan.</p>
      </header>

      {/* Categories */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
          {categories.map(cat => (
            <GlassCard key={cat.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', padding: '1rem', cursor: 'pointer', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-2px)' } }}>
              <div style={{ padding: '0.75rem', borderRadius: '50%', background: `${cat.color}15`, color: cat.color }}>
                <cat.icon size={28} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{cat.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{cat.count}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Personalized Plan */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-brand-navy)', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={20} /> Your Personalized Plan
        </h3>
        <GlassCard style={{ display: 'flex', justifyContent: 'space-between', overflowX: 'auto', gap: '1rem', padding: '1rem' }}>
          {weeklyPlan.map(day => (
            <div key={day.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', minWidth: '70px', opacity: day.done ? 0.6 : 1 }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: day.active ? 'var(--color-brand-navy)' : 'var(--color-text-secondary)' }}>{day.day}</span>
              <div style={{ 
                width: '12px', height: '12px', borderRadius: '50%', 
                background: day.done ? 'var(--color-success-green)' : (day.active ? 'var(--color-brand-gold)' : 'rgba(0,0,0,0.1)'),
                boxShadow: day.active ? '0 0 10px var(--color-brand-gold)' : 'none'
              }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textAlign: 'center', fontWeight: day.active ? 600 : 400 }}>{day.focus}</span>
            </div>
          ))}
        </GlassCard>
      </section>

      {/* Suggested Exercises */}
      <section>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-brand-navy)', margin: '0 0 1rem 0' }}>Suggested for You</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {suggestedWorkouts.map(workout => (
            <GlassCard key={workout.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--color-brand-mid) 0%, var(--color-brand-sky) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                  <Play size={32} fill="white" />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', color: 'var(--color-brand-navy)' }}>{workout.name}</h4>
                  <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {workout.duration}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Flame size={14} /> {workout.calories} Cal</span>
                    <span style={{ fontWeight: 500, color: 'var(--color-brand-mid)' }}>{workout.difficulty}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.5)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div><span style={{ color: 'var(--color-text-secondary)' }}>Target:</span> <strong>{workout.target}</strong></div>
                  <div><span style={{ color: 'var(--color-text-secondary)' }}>Format:</span> <strong>{workout.sets} x {workout.reps}</strong></div>
                  <div><span style={{ color: 'var(--color-text-secondary)' }}>Rest:</span> <strong>{workout.rest}</strong></div>
                </div>
                <button 
                  onClick={() => navigate(`/fitness/workout/${workout.id}`)}
                  style={{ background: 'var(--color-brand-navy)', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '20px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  START <ChevronRight size={16} />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

    </div>
  );
};
