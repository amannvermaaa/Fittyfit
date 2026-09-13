import React, { useState } from 'react';
import { Target, TrendingDown, TrendingUp, Activity, ShieldCheck, ArrowRight } from 'lucide-react';
import { GlassCard, ProgressRing } from '../components/ui';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const GOAL_TYPES = [
  { id: 'lose_weight', title: 'Lose Weight', icon: TrendingDown, desc: 'Burn fat and get leaner' },
  { id: 'build_muscle', title: 'Build Muscle', icon: TrendingUp, desc: 'Increase strength and size' },
  { id: 'improve_fitness', title: 'Improve Fitness', icon: Activity, desc: 'Boost endurance and stamina' },
  { id: 'maintain_weight', title: 'Maintain Weight', icon: ShieldCheck, desc: 'Stay healthy and active' }
];

export const Goals = () => {
  const navigate = useNavigate();
  const [goal, setGoal] = useLocalStorage('eudaimix_fitness_goal', null);
  const [streak] = useLocalStorage('eudaimix_streak', 0);

  // If a goal is selected, render the dashboard
  if (goal) {
    const isWeightLoss = goal.id === 'lose_weight';
    // Dummy progression math
    const current = isWeightLoss ? 78 : 65;
    const target = isWeightLoss ? 70 : 70;
    const start = isWeightLoss ? 82 : 60;
    const progress = Math.abs((start - current) / (start - target)) * 100;

    return (
      <div className="page-animate" style={{ paddingBottom: '7rem' }}>
        <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-navy)', fontSize: '2rem', margin: 0 }}>Active Goal</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', margin: 0 }}>{goal.title}</p>
          </div>
          <button onClick={() => setGoal(null)} style={{ background: 'transparent', border: '1px solid var(--color-brand-mid)', borderRadius: '20px', padding: '0.25rem 1rem', color: 'var(--color-brand-mid)', fontWeight: 600, cursor: 'pointer' }}>Edit</button>
        </header>

        {/* Master Progress */}
        <GlassCard style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', marginBottom: '2rem' }}>
          <ProgressRing progress={progress} size={160} strokeWidth={12} color="var(--color-brand-gold)">
            <Target size={40} color="var(--color-brand-gold)" />
          </ProgressRing>
          <h2 style={{ fontSize: '2.5rem', margin: '1rem 0 0 0', color: 'var(--color-brand-navy)' }}>{progress.toFixed(0)}%</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>Overall Progress</p>
          
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Current</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-brand-navy)' }}>{current}kg</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Target</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-brand-gold)' }}>{target}kg</div>
            </div>
          </div>
        </GlassCard>

        {/* Weekly Objectives */}
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-brand-navy)', margin: '0 0 1rem 0' }}>Weekly Objectives</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <GlassCard style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--color-brand-navy)' }}>Consistency</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Current Streak: {streak} Days</div>
            </div>
            <div style={{ background: 'var(--color-success-green)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>ON TRACK</div>
          </GlassCard>
          <GlassCard style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--color-brand-navy)' }}>Workouts</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>3 of 4 completed</div>
            </div>
            <button onClick={() => navigate('/fitness')} style={{ background: 'var(--color-brand-navy)', border: 'none', color: 'white', borderRadius: '20px', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
              START <ArrowRight size={16} />
            </button>
          </GlassCard>
        </div>
      </div>
    );
  }

  // Goal Selection Screen
  return (
    <div className="page-animate" style={{ paddingBottom: '7rem' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-navy)', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>Set Your Goal</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', margin: 0 }}>What would you like to achieve?</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {GOAL_TYPES.map(g => (
          <GlassCard 
            key={g.id} 
            style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', cursor: 'pointer', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-2px)' } }}
            onClick={() => setGoal(g)}
          >
            <div style={{ padding: '1rem', borderRadius: '50%', background: 'var(--color-brand-navy)', color: 'white' }}>
              <g.icon size={28} />
            </div>
            <div>
              <h3 style={{ margin: '0 0 0.25rem 0', color: 'var(--color-brand-navy)', fontSize: '1.25rem' }}>{g.title}</h3>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{g.desc}</p>
            </div>
            <ArrowRight size={24} color="var(--color-brand-mid)" style={{ marginLeft: 'auto' }} />
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
