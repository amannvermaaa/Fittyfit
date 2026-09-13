import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { GlassCard, MetricCard, AIRecommendationCard, ChartCard, ProgressRing, ProgressBar } from '../components/ui';
import { Activity, Pill, Droplet, Clock, CheckCircle2, AlertCircle, ChevronRight, Flame, Footprints, Timer, GlassWater } from 'lucide-react';

// Dummy data for the weekly trend chart
const weeklyData = [
  { day: 'Mon', sugar: 110, bpSys: 120, bpDia: 80 },
  { day: 'Tue', sugar: 115, bpSys: 122, bpDia: 82 },
  { day: 'Wed', sugar: 108, bpSys: 118, bpDia: 79 },
  { day: 'Thu', sugar: 120, bpSys: 125, bpDia: 85 },
  { day: 'Fri', sugar: 112, bpSys: 121, bpDia: 81 },
  { day: 'Sat', sugar: 105, bpSys: 119, bpDia: 78 },
  { day: 'Sun', sugar: 109, bpSys: 120, bpDia: 80 },
];

// Dummy data for mini sparkline
const miniSugarData = [{val: 115}, {val: 110}, {val: 118}, {val: 112}, {val: 109}];

export const Dashboard = () => {
  const [vitals] = useLocalStorage('eudaimix_vitals', []);
  const [profileData] = useLocalStorage('eudaimix_user_profile', { name: 'Vishu', age: 28, height: 175, weight: 78 });
  
  // Find latest vitals if they exist in local storage, otherwise use defaults
  const latestSugar = vitals.filter(v => v.type === 'sugar').pop()?.value || '109';
  const latestBP = vitals.filter(v => v.type === 'bp').pop()?.value || '120/80';
  
  // Basic logic to determine BP status color
  const bpSys = parseInt(latestBP.split('/')[0]) || 120;
  const bpStatusColor = bpSys > 130 ? 'var(--color-alert-red)' : bpSys > 120 ? 'var(--color-alert-orange)' : 'var(--color-success-green)';

  // Medicine Checklist State
  const [meds, setMeds] = useState([
    { id: 1, name: 'Metformin', dosage: '500mg', time: '08:00 AM', doctor: 'Dr. Sharma', taken: false, scheduled: new Date().setHours(8, 0, 0, 0) },
    { id: 2, name: 'Amlodipine', dosage: '5mg', time: '09:00 AM', doctor: 'Dr. Patel', taken: false, scheduled: new Date().setHours(9, 0, 0, 0) },
    { id: 3, name: 'Atorvastatin', dosage: '20mg', time: '09:00 PM', doctor: 'Dr. Patel', taken: false, scheduled: new Date().setHours(21, 0, 0, 0) },
  ]);

  const [currentTime, setCurrentTime] = useState(Date.now());

  const carouselImages = [
    '/image/images.jpg',
    '/image/images (1).jpg',
    '/image/images (3).jpg',
    '/image/images (4).jpg'
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timeTimer = setInterval(() => setCurrentTime(Date.now()), 60000); // update every min
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => {
      clearInterval(timeTimer);
      clearInterval(slideTimer);
    };
  }, []);

  const toggleMed = (id) => {
    setMeds(meds.map(med => med.id === id ? { ...med, taken: !med.taken } : med));
  };

  // Find next medicine
  const upcomingMeds = meds.filter(m => !m.taken && m.scheduled > currentTime).sort((a,b) => a.scheduled - b.scheduled);
  const nextMed = upcomingMeds.length > 0 ? upcomingMeds[0] : null;
  
  let countdownStr = "All done!";
  if (nextMed) {
    const diff = nextMed.scheduled - currentTime;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    countdownStr = `in ${hours}h ${mins}m`;
  }

  // Fitness & Wellness State
  const [water, setWater] = useLocalStorage('eudaimix_water_intake', 3);
  const waterGoal = 8;
  const activeCalories = 420;
  const calGoal = 600;
  
  const handleAddWater = () => setWater(w => Math.min(w + 1, waterGoal));

  return (
    <div className="page-animate" style={{ paddingBottom: '6rem' }}>
      
      {/* Top Bar Greeting */}
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-navy)', fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          Good morning, {profileData.name}
          <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-success-green)', boxShadow: '0 0 10px var(--color-success-green)', animation: 'pulse 2s infinite' }} title="Vitals Online" />
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>Here is your daily health summary.</p>
      </header>


      {/* Daily Fitness & Wellness Goals */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        
        {/* Active Calories Goal with Ring */}
        <GlassCard style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-alert-red)', marginBottom: '0.5rem' }}>
              <Flame size={20} />
              <span style={{ fontWeight: 600 }}>Active Calories</span>
            </div>
            <h2 style={{ fontSize: '2rem', margin: 0, color: 'var(--color-text-primary)' }}>{activeCalories} <span style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>/ {calGoal}</span></h2>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>You are crushing it today!</p>
          </div>
          <ProgressRing progress={(activeCalories / calGoal) * 100} size={80} strokeWidth={8} color="var(--color-alert-red)">
            <Flame size={24} color="var(--color-alert-red)" />
          </ProgressRing>
        </GlassCard>

        {/* Water Intake */}
        <GlassCard style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-brand-sky)' }}>
              <GlassWater size={20} />
              <span style={{ fontWeight: 600 }}>Hydration</span>
            </div>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>{water} / {waterGoal} glasses</span>
          </div>
          <ProgressBar progress={(water / waterGoal) * 100} color="var(--color-brand-sky)" height="12px" />
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
            <button onClick={handleAddWater} className="btn btn-outline" style={{ flex: 1 }}>+ 1 Glass</button>
          </div>
        </GlassCard>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <MetricCard title="Steps" value="6,420" icon={Footprints} color="var(--color-success-green)" />
        <MetricCard title="Active Mins" value="45" unit="min" icon={Timer} color="var(--color-brand-gold)" />
        {/* Blood Sugar & BP as Metric Cards */}
        <MetricCard title="Blood Sugar" value={latestSugar} unit="mg/dL" icon={Droplet} color="var(--color-brand-navy)" />
        <MetricCard title="Blood Pressure" value={latestBP} unit="mmHg" icon={Activity} color="var(--color-brand-navy)" trend={bpSys > 130 ? 'up' : 'down'} trendLabel={bpSys > 130 ? 'HIGH' : 'NORMAL'} />
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <AIRecommendationCard 
          title="Optimal Hydration Window"
          message={`You are ${waterGoal - water} glasses away from your hydration goal. Drinking a glass now will help process your ${nextMed ? nextMed.name : 'medication'} effectively.`}
          actionLabel="Log Water"
          onAction={handleAddWater}
        />
      </div>

      {/* Today's Workout */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-brand-navy)', margin: '0 0 1rem 0' }}>Today's Workout</h3>
        <GlassCard style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>Morning Cardio Routine</h4>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                 <span>⏱ 30 Min</span>
                 <span>🔥 ~300 Cal</span>
                 <span>📊 Intermediate</span>
              </div>
           </div>
           <button style={{ padding: '0.75rem 1.5rem', background: 'var(--color-brand-gold)', color: 'white', border: 'none', borderRadius: '24px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(201, 162, 75, 0.4)' }}>
              Start
           </button>
        </GlassCard>
      </div>

      {/* Next Medicine Card */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'linear-gradient(135deg, var(--color-brand-navy) 0%, #1a2a40 100%)', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Pill size={20} color="var(--color-brand-gold)" />
              <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>Next Medicine</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Clock size={12} />
              {countdownStr}
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: '1.75rem', margin: '0 0 0.25rem 0', lineHeight: 1, color: 'white' }}>
              {nextMed ? nextMed.name : 'No more meds'}
            </h2>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
              {nextMed ? `${nextMed.dosage} • ${nextMed.time}` : 'Enjoy your day!'}
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        
        {/* Today's Medicine Checklist */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-brand-navy)', margin: 0 }}>Today's Medicines</h3>
            <span style={{ color: 'var(--color-brand-mid)', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>View All</span>
          </div>
          
          <div className="glass-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowX: 'hidden' }}>
            {meds.map(med => {
              const isMissed = !med.taken && med.scheduled < currentTime;
              
              // Local state for swipe logic per item (handled implicitly by React events for simple implementation)
              let touchStartX = 0;
              let touchEndX = 0;
              
              const handleTouchStart = (e) => {
                touchStartX = e.changedTouches[0].screenX;
              };
              const handleTouchMove = (e) => {
                touchEndX = e.changedTouches[0].screenX;
              };
              const handleTouchEnd = () => {
                if (touchEndX > touchStartX + 75) {
                  // Swiped right -> Mark taken
                  if (!med.taken) toggleMed(med.id);
                } else if (touchStartX > touchEndX + 75) {
                  // Swiped left -> Unmark taken
                  if (med.taken) toggleMed(med.id);
                }
              };

              return (
                <div 
                  key={med.id}
                  onClick={() => toggleMed(med.id)}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '1rem', 
                    borderRadius: '12px',
                    background: med.taken ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.5)',
                    border: `1px solid ${isMissed ? 'rgba(255, 75, 75, 0.3)' : 'var(--color-border-light)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    opacity: med.taken ? 0.6 : 1,
                    position: 'relative',
                    userSelect: 'none'
                  }}
                >
                  {/* Hint overlay for swipe (optional, keeping it clean for now) */}
                  <div style={{ marginRight: '1rem' }}>
                    {med.taken ? (
                      <CheckCircle2 size={24} color="var(--color-success-green)" />
                    ) : (
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: `2px solid ${isMissed ? 'var(--color-alert-red)' : 'var(--color-brand-mid)'}` }}></div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: '1rem', color: isMissed ? 'var(--color-alert-red)' : 'var(--color-text-primary)', textDecoration: med.taken ? 'line-through' : 'none' }}>
                      {med.name}
                    </h4>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                      {med.dosage} • {med.doctor}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: isMissed ? 'var(--color-alert-red)' : 'var(--color-text-primary)' }}>
                      {med.time}
                    </span>
                    {isMissed && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-alert-red)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                        <AlertCircle size={12} /> Missed
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Weekly Trend Chart */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-brand-navy)', margin: 0 }}>Weekly Trends</h3>
            <span style={{ color: 'var(--color-brand-mid)', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              Details <ChevronRight size={16} />
            </span>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '1rem' }}
                  itemStyle={{ fontSize: '0.875rem', fontWeight: 600 }}
                  labelStyle={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}
                />
                
                {/* Gold Line for Sugar */}
                <Line yAxisId="left" type="monotone" dataKey="sugar" name="Blood Sugar" stroke="var(--color-brand-gold)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                
                {/* Navy Line for BP Sys */}
                <Line yAxisId="right" type="monotone" dataKey="bpSys" name="BP (Systolic)" stroke="var(--color-brand-navy)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

      </div>

      {/* Advanced About EduaiMix Carousel */}
      <section style={{ marginTop: '3rem', animation: 'slideUp 0.8s ease-out' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '21/9', minHeight: '280px', maxHeight: '450px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          
          {/* Animated Background Images */}
          {carouselImages.map((src, idx) => (
            <img 
              key={idx}
              src={src} 
              alt={`Fitty Fit Slide ${idx + 1}`} 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: currentSlide === idx ? 1 : 0,
                transform: currentSlide === idx ? 'scale(1.05)' : 'scale(1)',
                transition: 'opacity 1.2s ease-in-out, transform 8s linear'
              }}
            />
          ))}
          
          {/* Dark Gradient Overlay for Text Legibility */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10, 25, 47, 0.8) 0%, rgba(10, 25, 47, 0.2) 100%)' }} />

          {/* Floating Glass Content Box */}
          <div style={{ position: 'absolute', top: '50%', left: '5%', transform: 'translateY(-50%)', maxWidth: '500px', width: '85%', padding: '2rem', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
            <h3 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Discover <span style={{ color: 'var(--color-brand-gold)' }}>Fitty Fit</span>
            </h3>
            <p style={{ fontSize: '0.95rem', margin: 0, lineHeight: 1.6, opacity: 0.9 }}>
              Pioneering the future of medical biology and healthcare technology. We bridge the gap between advanced genetic research and daily personal health monitoring, empowering patients worldwide with cutting-edge AI insights.
            </p>
            <button style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', borderRadius: '30px', background: 'var(--color-brand-gold)', color: 'var(--color-brand-navy)', border: 'none', fontWeight: 600, cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)' }} onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>
              Learn More
            </button>
          </div>
          
          {/* Elegant Carousel Dots */}
          <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '12px' }}>
            {carouselImages.map((_, idx) => (
              <div 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                style={{
                  width: currentSlide === idx ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: currentSlide === idx ? 'var(--color-brand-gold)' : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
