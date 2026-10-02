import React, { useState } from 'react';
import { Sparkles, ArrowRight, Gift } from 'lucide-react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.includes('@')) { setSubmitted(true); }
  };

  return (
    <section style={{ padding: '96px 0', background: '#121212', position: 'relative', overflow: 'hidden' }}>
      {/* Glow decoration */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, background: 'radial-gradient(circle, rgba(197,160,89,0.08) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />

      {/* Gold border line top */}
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.40), transparent)' }} />

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 40px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        {/* Gift badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 30, background: 'rgba(197,160,89,0.10)', border: '1px solid rgba(197,160,89,0.30)', marginBottom: 28, color: '#C5A059', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          <Gift size={13} /> EXCLUSIVE OFFER FOR MEMBERS
        </div>

        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: 16 }}>
          Get 15% Off Your<br />
          <span style={{ fontStyle: 'italic', color: '#C5A059' }}>First Order</span>
        </h2>

        <p style={{ fontSize: 14, color: 'rgba(232,223,213,0.72)', fontWeight: 300, lineHeight: 1.75, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
          Join the ZIVANA inner circle. Receive exclusive offers, early access to launches, and beauty tips crafted for your skin.
        </p>

        {submitted ? (
          <div style={{ padding: '32px', background: 'rgba(197,160,89,0.12)', borderRadius: 20, border: '1px solid rgba(197,160,89,0.35)', animation: 'fadeIn 0.4s ease' }}>
            <Sparkles size={32} color="#C5A059" style={{ margin: '0 auto 12px' }} />
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Welcome to ZIVANA! ✦</p>
            <p style={{ fontSize: 13, color: 'rgba(232,223,213,0.70)' }}>Your 15% off code is on its way to your inbox.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 10, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              style={{
                flex: 1, minWidth: 200, padding: '15px 22px',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                borderRadius: 40, color: '#fff', fontSize: 13,
                outline: 'none', transition: 'border-color 0.2s'
              }}
              onFocus={e => { e.target.style.borderColor = '#C5A059'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.18)'; }}
            />
            <button onClick={handleSubmit} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '15px 30px', background: '#C5A059',
              color: '#fff', borderRadius: 40, fontSize: 11,
              fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
              boxShadow: '0 8px 24px rgba(197,160,89,0.40)',
              transition: 'all 0.20s ease', cursor: 'pointer', whiteSpace: 'nowrap'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#A8833B'; e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#C5A059'; e.currentTarget.style.transform = ''; }}>
              SUBSCRIBE <ArrowRight size={13} />
            </button>
          </div>
        )}

        <p style={{ fontSize: 10, color: 'rgba(107,99,91,0.80)', marginTop: 18, letterSpacing: '0.04em' }}>
          No spam, ever. Unsubscribe anytime. We respect your privacy.
        </p>

        {/* Features */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px 32px', marginTop: 40, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {['Exclusive Early Access', 'Birthday Gifts', 'Beauty Tutorials', 'Members-Only Deals'].map(f => (
            <span key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'rgba(232,223,213,0.65)', fontWeight: 500 }}>
              <span style={{ color: '#C5A059' }}>✦</span> {f}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom gold border */}
      <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.40), transparent)' }} />
    </section>
  );
};
