import React from 'react';
import { Instagram } from 'lucide-react';

const IG_IMAGES = [
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1583241475880-083f84372725?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1631730486572-226d1f595b68?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1532413992378-f169ac26fff0?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600",
];

export const InstagramSection = () => {
  return (
    <section style={{ padding: '80px 0', background: '#F7F3EE' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Instagram size={18} color="#C5A059" />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C5A059' }}>@zivanaindia</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, color: '#121212' }}>
            #ZivanaGlow Community
          </h2>
          <p style={{ fontSize: 13, color: '#6B635B', fontWeight: 300, marginTop: 10 }}>
            Tag us to be featured · Join 200K+ beauty lovers on Instagram
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {IG_IMAGES.map((src, i) => (
            <div key={i} style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', boxShadow: '0 2px 8px rgba(28,25,23,0.08)' }}
            onMouseEnter={e => {
              const img = e.currentTarget.querySelector('img');
              const overlay = e.currentTarget.querySelector('.ig-overlay');
              if (img) img.style.transform = 'scale(1.10)';
              if (overlay) overlay.style.opacity = '1';
            }}
            onMouseLeave={e => {
              const img = e.currentTarget.querySelector('img');
              const overlay = e.currentTarget.querySelector('.ig-overlay');
              if (img) img.style.transform = 'scale(1)';
              if (overlay) overlay.style.opacity = '0';
            }}>
              <img src={src} alt="ZIVANA Instagram"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)' }} />
              <div className="ig-overlay" style={{
                position: 'absolute', inset: 0,
                background: 'rgba(18,18,18,0.48)',
                opacity: 0, transition: 'opacity 0.3s ease',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 4, color: '#fff'
              }}>
                <Instagram size={22} />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase' }}>View Post</span>
              </div>
            </div>
          ))}
        </div>

        {/* Follow CTA */}
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '13px 32px', background: 'transparent',
            border: '1.5px solid #121212', borderRadius: 40,
            fontSize: 11, fontWeight: 700, color: '#121212',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            textDecoration: 'none', transition: 'all 0.22s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#121212'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#121212'; }}>
            <Instagram size={14} /> FOLLOW @ZIVANAINDIA
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .ig-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
};
