import React, { useState } from 'react';
import { User, Bell, Shield, Users, HeartPulse, Settings, ChevronRight, LogOut, Flame, Target, Droplet, Dumbbell, Apple, Activity } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { GlassCard } from '../components/ui';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './Profile.css';

export const Profile = () => {
  const navigate = useNavigate();
  const [isCaregiverMode, setIsCaregiverMode] = useState(false);

  // Settings Toggles
  const [pushNotifs, setPushNotifs] = useState(true);
  const [missedDoseEscalation, setMissedDoseEscalation] = useState(true);

  // Fitness Data from LocalStorage
  const [goal] = useLocalStorage('eudaimix_fitness_goal', { title: 'Improve Fitness' });
  const [streak] = useLocalStorage('eudaimix_streak', 0);
  const [achievements] = useLocalStorage('eudaimix_achievements', []);
  const [workoutHistory] = useLocalStorage('eudaimix_workout_history', []);
  const [nutritionLog] = useLocalStorage('eudaimix_nutrition_log', []);

  // Profile Data
  const [profileData, setProfileData] = useLocalStorage('eudaimix_user_profile', {
    name: 'Vishu',
    age: 28,
    height: 175,
    weight: 78,
    photo: null // Base64 string for photo
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profileData);

  const handleSaveProfile = () => {
    setProfileData(editForm);
    setIsEditing(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const earnedAchievements = achievements.filter(a => a.earned).length;

  return (
    <div className="page-animate" style={{ paddingBottom: '7rem', padding: '1.5rem', minHeight: '100vh' }}>
      
      {/* Header Profile Summary with Photo */}
      <GlassCard style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', padding: '1.5rem', position: 'relative' }}>
        <button onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)} className="btn btn-outline" style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.25rem 0.75rem', fontSize: '0.8rem', zIndex: 10 }}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
        
        <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0 }}>
          <div style={{ 
            width: '100%', height: '100%', borderRadius: '50%', 
            background: 'linear-gradient(135deg, var(--color-brand-navy) 0%, var(--color-brand-mid) 100%)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', 
            boxShadow: '0 4px 12px rgba(30, 58, 95, 0.3)', overflow: 'hidden'
          }}>
            {isEditing ? (
              editForm.photo ? <img src={editForm.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={40} />
            ) : (
              profileData.photo ? <img src={profileData.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={40} />
            )}
          </div>
          {isEditing && (
            <>
              <label htmlFor="photo-upload" style={{ position: 'absolute', bottom: -5, right: -5, background: 'var(--color-brand-gold)', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid white', color: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                <span style={{ fontSize: '1rem', lineHeight: 1 }}>+</span>
              </label>
              <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
            </>
          )}
        </div>
        
        <div style={{ flex: 1, paddingRight: '3rem' }}>
          {isEditing ? (
            <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} style={{ width: '100%', padding: '0.25rem', marginBottom: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
          ) : (
            <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-navy)', fontSize: '1.75rem', margin: 0 }}>{profileData.name}</h1>
          )}
          <p style={{ color: 'var(--color-text-secondary)', margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>ID: EUD-8849-MX</p>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
            {isEditing ? (
              <>
                <span><input type="number" value={editForm.age} onChange={e => setEditForm({...editForm, age: e.target.value})} style={{ width: '40px' }} /> yrs</span>
                <span><input type="number" value={editForm.height} onChange={e => setEditForm({...editForm, height: e.target.value})} style={{ width: '50px' }} /> cm</span>
                <span><input type="number" value={editForm.weight} onChange={e => setEditForm({...editForm, weight: e.target.value})} style={{ width: '50px' }} /> kg</span>
              </>
            ) : (
              <>
                <span><strong>{profileData.age}</strong> yrs</span>
                <span><strong>{profileData.height}</strong> cm</span>
                <span><strong>{profileData.weight}</strong> kg</span>
              </>
            )}
          </div>
        </div>
      </GlassCard>

      {/* Fitness Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <GlassCard style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.5rem' }}>
          <Flame size={24} color="var(--color-brand-gold)" />
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-brand-navy)' }}>{streak}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Day Streak</div>
          </div>
        </GlassCard>
        <GlassCard style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.5rem' }}>
          <Target size={24} color="var(--color-success-green)" />
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-brand-navy)' }}>{goal?.title || 'None'}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Current Goal</div>
          </div>
        </GlassCard>
        <GlassCard style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.5rem' }}>
          <Shield size={24} color="var(--color-brand-sky)" />
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-brand-navy)' }}>{earnedAchievements}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Badges</div>
          </div>
        </GlassCard>
      </div>

      {/* Caregiver View Toggle */}
      <div className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', border: '1px solid var(--color-brand-mid)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Users size={20} color="var(--color-brand-navy)" />
          <span style={{ fontWeight: 600, color: 'var(--color-brand-navy)' }}>Caregiver Mode</span>
        </div>
        <label className="switch">
          <input type="checkbox" checked={isCaregiverMode} onChange={() => setIsCaregiverMode(!isCaregiverMode)} />
          <span className="slider round"></span>
        </label>
      </div>

      {isCaregiverMode && (
        <div style={{ background: 'rgba(30, 58, 95, 0.05)', borderRadius: '12px', padding: '1rem', marginBottom: '2rem', borderLeft: '4px solid var(--color-brand-navy)' }}>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-brand-navy)', fontWeight: 500 }}>
            You are now viewing health data for: <strong style={{ color: 'var(--color-brand-gold)' }}>Dad (Rajesh)</strong>
          </p>
        </div>
      )}

      {/* Doctor Connect Link */}
      <Link to="/doctor-connect" style={{ textDecoration: 'none' }}>
        <div className="glass-card" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', background: 'linear-gradient(135deg, var(--color-brand-navy) 0%, #1a2a40 100%)', color: 'white' }}>
          <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>
            <HeartPulse size={24} color="var(--color-brand-gold)" />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Doctor Connect</h3>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8125rem', opacity: 0.8 }}>Consultations & Messages</p>
          </div>
          <ChevronRight size={20} color="rgba(255,255,255,0.5)" />
        </div>
      </Link>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Medical History Section */}
        <section>
          <h3 style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', margin: '0 0 1rem 0' }}>Medical Profile</h3>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--color-text-primary)' }}>Blood Group</span>
              <span style={{ fontWeight: 600, color: 'var(--color-brand-navy)' }}>O Positive</span>
            </div>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--color-text-primary)' }}>Allergies</span>
              <span style={{ fontWeight: 600, color: 'var(--color-alert-red)' }}>Penicillin</span>
            </div>
            <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--color-text-primary)' }}>Insurance</span>
              <span style={{ fontWeight: 600, color: 'var(--color-brand-navy)' }}>BlueCross Shield</span>
            </div>
          </div>
        </section>

        {/* Wellness History Links */}
        <section>
          <h3 style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', margin: '0 0 1rem 0' }}>Fitness & Nutrition</h3>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Dumbbell size={20} color="var(--color-brand-navy)" />
                <span style={{ color: 'var(--color-text-primary)' }}>Workout History</span>
              </div>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{workoutHistory.length} logs</span>
            </div>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Apple size={20} color="var(--color-brand-navy)" />
                <span style={{ color: 'var(--color-text-primary)' }}>Nutrition Log</span>
              </div>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{nutritionLog.length} meals</span>
            </div>
            <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Activity size={20} color="var(--color-brand-navy)" />
                <span style={{ color: 'var(--color-text-primary)' }}>Activity Level</span>
              </div>
              <span style={{ fontWeight: 600, color: 'var(--color-brand-mid)' }}>Active (3-4x/week)</span>
            </div>
          </div>
        </section>

        {/* Reminders & Notifications */}
        <section>
          <h3 style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', margin: '0 0 1rem 0' }}>Notifications</h3>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: '0.5rem 1rem' }}>
            <div style={{ padding: '1rem 0', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Bell size={20} color="var(--color-brand-mid)" />
                <span style={{ color: 'var(--color-text-primary)' }}>Medicine Reminders</span>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={pushNotifs} 
                  onChange={() => {
                    const newValue = !pushNotifs;
                    setPushNotifs(newValue);
                    if (newValue && 'Notification' in window) {
                      if (Notification.permission !== 'granted') {
                        Notification.requestPermission().then(permission => {
                          if (permission !== 'granted') setPushNotifs(false);
                        });
                      }
                    }
                  }} 
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div style={{ padding: '1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Shield size={20} color="var(--color-brand-mid)" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'var(--color-text-primary)' }}>Missed Dose Escalation</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Alert caregiver if missed</span>
                </div>
              </div>
              <label className="switch">
                <input type="checkbox" checked={missedDoseEscalation} onChange={() => setMissedDoseEscalation(!missedDoseEscalation)} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </section>

        <section>
          <button 
            onClick={handleLogout}
            style={{ width: '100%', padding: '1rem', background: 'white', border: '1px solid rgba(255, 75, 75, 0.3)', borderRadius: '12px', color: 'var(--color-alert-red)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}
          >
            <LogOut size={20} /> Log Out
          </button>
        </section>
      </div>
    </div>
  );
};
