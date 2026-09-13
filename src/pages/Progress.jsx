import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Award, Flame, Trophy, Activity, Droplet } from 'lucide-react';
import { GlassCard } from '../components/ui';
import { useLocalStorage } from '../hooks/useLocalStorage';

const dummyWeeklyData = [
  { day: 'Mon', weight: 78.5, cals: 450, workouts: 1 },
  { day: 'Tue', weight: 78.2, cals: 500, workouts: 1 },
  { day: 'Wed', weight: 78.2, cals: 200, workouts: 0 },
  { day: 'Thu', weight: 78.0, cals: 600, workouts: 1 },
  { day: 'Fri', weight: 77.8, cals: 400, workouts: 1 },
  { day: 'Sat', weight: 77.9, cals: 800, workouts: 2 },
  { day: 'Sun', weight: 77.5, cals: 300, workouts: 0 },
];

const dummyMonthlyData = [
  { day: 'Week 1', weight: 79.5, cals: 2450, workouts: 3 },
  { day: 'Week 2', weight: 79.0, cals: 2800, workouts: 4 },
  { day: 'Week 3', weight: 78.5, cals: 2600, workouts: 4 },
  { day: 'Week 4', weight: 77.5, cals: 3100, workouts: 5 },
];

const BADGES = [
  { id: 'b1', title: '7 Day Streak', icon: Flame, earned: true },
  { id: 'b2', title: '10 Workouts', icon: Activity, earned: true },
  { id: 'b3', title: '1000 Active Mins', icon: Award, earned: false },
  { id: 'b4', title: '7 Day Hydration', icon: Droplet, earned: false },
  { id: 'b5', title: 'First Goal Reached', icon: Trophy, earned: true },
];

export const Progress = () => {
  const [filter, setFilter] = useState('weekly');
  const [streak] = useLocalStorage('eudaimix_streak', 0);
  const [achievements] = useLocalStorage('eudaimix_achievements', BADGES);
  
  const data = filter === 'weekly' ? dummyWeeklyData : dummyMonthlyData;

  return (
    <div className="page-animate" style={{ paddingBottom: '7rem' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-navy)', fontSize: '2rem', margin: 0 }}>Progress</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', margin: 0 }}>Track your wins.</p>
        </div>
        
        {/* Streak Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-brand-gold)', padding: '0.5rem 1rem', borderRadius: '20px', color: 'white', boxShadow: '0 4px 10px rgba(201, 162, 75, 0.3)' }}>
          <Flame size={20} fill="white" />
          <span style={{ fontWeight: 700 }}>{streak} Day Streak!</span>
        </div>
      </header>

      {/* Filter Toggle */}
      <div style={{ display: 'flex', background: 'rgba(255,255,255,0.5)', padding: '4px', borderRadius: '20px', width: 'fit-content', marginBottom: '2rem' }}>
        <button onClick={() => setFilter('weekly')} style={{ background: filter === 'weekly' ? 'white' : 'transparent', color: filter === 'weekly' ? 'var(--color-brand-navy)' : 'var(--color-text-secondary)', padding: '0.5rem 1.5rem', borderRadius: '16px', border: 'none', fontWeight: 600, cursor: 'pointer', boxShadow: filter === 'weekly' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none' }}>Weekly</button>
        <button onClick={() => setFilter('monthly')} style={{ background: filter === 'monthly' ? 'white' : 'transparent', color: filter === 'monthly' ? 'var(--color-brand-navy)' : 'var(--color-text-secondary)', padding: '0.5rem 1.5rem', borderRadius: '16px', border: 'none', fontWeight: 600, cursor: 'pointer', boxShadow: filter === 'monthly' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none' }}>Monthly</button>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
        
        {/* Weight Area Chart */}
        <GlassCard style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--color-brand-navy)' }}>Weight Progress (kg)</h3>
          <div style={{ width: '100%', height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-brand-sky)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-brand-sky)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="weight" stroke="var(--color-brand-sky)" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Calories Bar Chart */}
        <GlassCard style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--color-brand-navy)' }}>Active Calories Burned</h3>
          <div style={{ width: '100%', height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                <Bar dataKey="cals" fill="var(--color-alert-red)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

      </div>

      {/* Achievements Grid */}
      <section>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-brand-navy)', margin: '0 0 1.5rem 0' }}>Achievements</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
          {achievements.map(badge => (
            <GlassCard key={badge.id} style={{ padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', textAlign: 'center', opacity: badge.earned ? 1 : 0.5, filter: badge.earned ? 'none' : 'grayscale(1)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: badge.earned ? 'linear-gradient(135deg, var(--color-brand-gold) 0%, #a67b27 100%)' : 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: badge.earned ? 'white' : 'var(--color-text-secondary)', boxShadow: badge.earned ? '0 4px 12px rgba(201, 162, 75, 0.4)' : 'none' }}>
                <badge.icon size={28} />
              </div>
              <span style={{ fontWeight: 600, color: 'var(--color-brand-navy)', fontSize: '0.875rem' }}>{badge.title}</span>
            </GlassCard>
          ))}
        </div>
      </section>

    </div>
  );
};
