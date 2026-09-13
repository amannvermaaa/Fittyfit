import React, { useState } from 'react';
import { Video, MessageSquare, Calendar, Phone, ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DoctorConnect = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('video'); // 'video' or 'chat'
  
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'doctor', text: 'Hello Vishu, how are your sugar levels today?', time: '10:00 AM' },
    { id: 2, sender: 'user', text: 'A bit high this morning, 142.', time: '10:05 AM' }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'user', text: chatMessage, time: 'Just now' }]);
    setChatMessage('');
    
    // Mock doctor reply
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), sender: 'doctor', text: 'I see. Please make sure to take your Metformin after lunch. We can discuss more on our call.', time: 'Just now' }]);
    }, 1500);
  };

  return (
    <div className="page-animate" style={{ paddingBottom: '6rem', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <header style={{ padding: '1.5rem', background: 'var(--color-surface)', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid var(--color-border)' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowLeft size={24} color="var(--color-brand-navy)" />
        </button>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-navy)', fontSize: '1.25rem', margin: 0 }}>Dr. Anil Sharma</h1>
          <p style={{ color: 'var(--color-success-green)', fontSize: '0.875rem', margin: 0, fontWeight: 500 }}>Online</p>
        </div>
      </header>

      {/* Segmented Control */}
      <div style={{ padding: '1.5rem 1.5rem 0 1.5rem' }}>
        <div style={{ display: 'flex', background: 'var(--color-surface)', borderRadius: '12px', padding: '0.25rem' }}>
          <button 
            onClick={() => setActiveTab('video')}
            style={{ flex: 1, padding: '0.75rem', border: 'none', borderRadius: '10px', background: activeTab === 'video' ? 'white' : 'transparent', color: activeTab === 'video' ? 'var(--color-brand-navy)' : 'var(--color-text-secondary)', fontWeight: 600, boxShadow: activeTab === 'video' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none', cursor: 'pointer', transition: 'all 0.3s' }}
          >
            Consultation
          </button>
          <button 
            onClick={() => setActiveTab('chat')}
            style={{ flex: 1, padding: '0.75rem', border: 'none', borderRadius: '10px', background: activeTab === 'chat' ? 'white' : 'transparent', color: activeTab === 'chat' ? 'var(--color-brand-navy)' : 'var(--color-text-secondary)', fontWeight: 600, boxShadow: activeTab === 'chat' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none', cursor: 'pointer', transition: 'all 0.3s' }}
          >
            Messages
          </button>
        </div>
      </div>

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {activeTab === 'video' ? (
          // Video / Appointments Tab
          <div className="page-animate" style={{ flex: 1 }}>
            
            <h3 style={{ fontSize: '1.125rem', color: 'var(--color-brand-navy)', marginBottom: '1rem' }}>Upcoming Appointment</h3>
            
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(30, 58, 95, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={24} color="var(--color-brand-navy)" />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.125rem', color: 'var(--color-brand-navy)' }}>Today, 04:30 PM</h4>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Follow-up • 15 mins</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Video size={18} /> Join Call
                </button>
                <button className="btn" style={{ flex: 1, background: 'white', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={18} />
                </button>
              </div>
            </div>

            <h3 style={{ fontSize: '1.125rem', color: 'var(--color-brand-navy)', marginBottom: '1rem' }}>Book Appointment</h3>
            <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                Schedule a new consultation with Dr. Sharma for a comprehensive health review.
              </p>
              <button className="btn" style={{ width: '100%', background: 'transparent', border: '2px dashed var(--color-brand-mid)', color: 'var(--color-brand-mid)', padding: '1rem' }}>
                + Find Available Slots
              </button>
            </div>

          </div>
        ) : (
          // Chat Tab
          <div className="page-animate" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', paddingBottom: '1rem' }}>
              {messages.map(msg => (
                <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '80%',
                    padding: '1rem',
                    borderRadius: msg.sender === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                    background: msg.sender === 'user' ? 'var(--gradient-brand)' : 'white',
                    color: msg.sender === 'user' ? 'white' : 'var(--color-text-primary)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                    border: msg.sender === 'doctor' ? '1px solid var(--color-border)' : 'none'
                  }}>
                    {msg.text}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>{msg.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
              <input 
                type="text" 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type a message..." 
                style={{ flex: 1, padding: '1rem', borderRadius: '24px', border: '1px solid var(--color-border)', outline: 'none' }}
              />
              <button type="submit" style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-brand-navy)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Send size={20} style={{ marginLeft: '4px' }} />
              </button>
            </form>

          </div>
        )}
      </div>

    </div>
  );
};
