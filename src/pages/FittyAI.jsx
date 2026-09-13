import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Mic, Sparkles, User, Dumbbell, Apple, HeartPulse, ChevronRight, Loader2, MicOff } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const INITIAL_MESSAGE = {
  id: 'init',
  sender: 'ai',
  text: "Hi! I'm Fitty, your personal fitness and wellness companion. How can I help you today?",
  timestamp: new Date().toISOString()
};

const SUGGESTED_PROMPTS = [
  "Create a workout for me",
  "What should I eat today?",
  "Why am I not losing weight?",
  "Make today's workout easier",
  "What should I do for recovery?",
  "Give me a 20-minute workout"
];

// Helper to format time
const formatTime = (isoString) => {
  const d = new Date(isoString);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const FittyAI = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useLocalStorage('eudaimix_fitty_msgs', [INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Speech Recognition State
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef(null);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    // Initialize Speech Recognition if supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(prev => prev + ' ' + transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      
      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }
  }, []);

  const toggleListen = () => {
    if (!speechSupported) {
      alert("Voice input is not supported in this browser.");
      return;
    }
    
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleSend = (text = inputText) => {
    if (!text.trim()) return;
    
    const newMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulated AI Response Logic
    setTimeout(() => {
      generateResponse(text.trim());
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (prompt) => {
    const lower = prompt.toLowerCase();
    let response = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      timestamp: new Date().toISOString()
    };

    // Safety Catch
    if (lower.includes('pain') || lower.includes('hurt') || lower.includes('doctor') || lower.includes('chest') || lower.includes('dizzy')) {
      response.text = "I am an AI fitness companion, not a doctor. If you are experiencing pain, dizziness, or a potential medical emergency, please stop your workout and consult a qualified healthcare professional immediately.";
      response.isWarning = true;
      setMessages(prev => [...prev, response]);
      return;
    }

    if (lower.includes('workout for me') || lower.includes('20-minute workout')) {
      response.text = "I've put together a personalized 20-minute routine focused on full-body engagement.";
      response.card = {
        type: 'workout',
        title: 'Full Body Burn',
        exercises: '4 Exercises • 20 Min • ~250 Cal',
        linkId: 'w1'
      };
    } else if (lower.includes('eat today') || lower.includes('nutrition')) {
      response.text = "Based on your active calories today, here is a suggested meal pattern focused on protein and recovery.";
      response.card = {
        type: 'meal',
        title: 'High-Protein Recovery Plan',
        exercises: 'Chicken Bowl • Protein Shake • Nuts'
      };
    } else if (lower.includes('recovery')) {
      response.text = "Recovery is just as important as training! Try doing some light stretching and ensure you get enough sleep.";
      response.card = {
        type: 'recovery',
        title: 'Yoga Flow',
        exercises: 'Focus on flexibility and breathing',
        linkId: 'w3'
      };
    } else {
      response.text = "That's a great question. Remember that consistency is key to seeing results! Stay hydrated and keep moving at your own pace.";
    }

    setMessages(prev => [...prev, response]);
  };

  return (
    <div className="page-animate" style={{ paddingBottom: '7rem', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <header style={{ padding: '1rem 0', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)', flexShrink: 0 }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-brand-mid) 0%, var(--color-brand-sky) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 10px rgba(59, 111, 160, 0.3)' }}>
          <Sparkles size={24} />
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-navy)', fontSize: '1.5rem', margin: 0 }}>Fitty AI</h1>
          <p style={{ color: 'var(--color-brand-mid)', fontSize: '0.875rem', margin: 0, fontWeight: 500 }}>Your personal fitness companion</p>
        </div>
      </header>

      {/* Chat Area */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map(msg => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start', maxWidth: '85%', alignSelf: isUser ? 'flex-end' : 'flex-start' }}>
              <div style={{
                padding: '1rem',
                borderRadius: '20px',
                borderBottomRightRadius: isUser ? '4px' : '20px',
                borderBottomLeftRadius: isUser ? '20px' : '4px',
                background: isUser ? 'var(--color-brand-navy)' : (msg.isWarning ? 'rgba(214, 69, 69, 0.1)' : 'rgba(255,255,255,0.7)'),
                color: isUser ? 'white' : (msg.isWarning ? 'var(--color-alert-red)' : 'var(--color-text-primary)'),
                backdropFilter: isUser ? 'none' : 'blur(12px)',
                border: isUser ? 'none' : (msg.isWarning ? '1px solid var(--color-alert-red)' : '1px solid rgba(255,255,255,0.6)'),
                boxShadow: isUser ? '0 4px 12px rgba(30, 58, 95, 0.2)' : '0 4px 12px rgba(0,0,0,0.05)',
                fontSize: '0.95rem',
                lineHeight: 1.5
              }}>
                {msg.text}
                
                {/* AI Cards */}
                {msg.card && (
                  <div style={{ marginTop: '1rem', background: 'white', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-brand-navy)', marginBottom: '0.5rem', fontWeight: 600 }}>
                      {msg.card.type === 'workout' || msg.card.type === 'recovery' ? <Dumbbell size={18} /> : <Apple size={18} />}
                      {msg.card.title}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                      {msg.card.exercises}
                    </div>
                    {msg.card.linkId && (
                      <button 
                        onClick={() => navigate(`/fitness/workout/${msg.card.linkId}`)}
                        style={{ width: '100%', padding: '0.5rem', background: 'var(--color-brand-gold)', color: 'white', border: 'none', borderRadius: '20px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                      >
                        START <ChevronRight size={16} />
                      </button>
                    )}
                  </div>
                )}
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem', padding: '0 0.5rem' }}>
                {formatTime(msg.timestamp)}
              </span>
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'flex-start', maxWidth: '80%' }}>
            <div style={{ padding: '1rem', borderRadius: '20px', borderBottomLeftRadius: '4px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.6)', display: 'flex', gap: '0.5rem' }}>
              <Loader2 size={20} className="animate-spin" color="var(--color-brand-mid)" />
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Fitty is typing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Chips */}
      {messages.length < 3 && !isTyping && (
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <button 
              key={i} 
              onClick={() => handleSend(prompt)}
              style={{ flexShrink: 0, padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)', border: '1px solid var(--color-brand-mid)', borderRadius: '20px', color: 'var(--color-brand-navy)', fontSize: '0.875rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', padding: '0.5rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 10px 30px rgba(30, 58, 95, 0.1)', flexShrink: 0 }}>
        <button 
          onClick={toggleListen}
          style={{ width: '40px', height: '40px', borderRadius: '50%', background: isListening ? 'var(--color-alert-red)' : 'transparent', color: isListening ? 'white' : 'var(--color-brand-mid)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}
        >
          {speechSupported ? <Mic size={20} /> : <MicOff size={20} opacity={0.5} />}
        </button>
        
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={isListening ? 'Listening...' : "Ask Fitty something..."}
          style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', color: 'var(--color-text-primary)', fontSize: '1rem' }}
        />
        
        <button 
          onClick={() => handleSend()}
          disabled={!inputText.trim()}
          style={{ width: '40px', height: '40px', borderRadius: '50%', background: inputText.trim() ? 'var(--color-brand-navy)' : 'rgba(30,58,95,0.2)', color: 'white', border: 'none', cursor: inputText.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}
        >
          <Send size={18} style={{ marginLeft: '2px' }} />
        </button>
      </div>

    </div>
  );
};
