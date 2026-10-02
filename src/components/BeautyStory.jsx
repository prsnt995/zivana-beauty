import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const BeautyStory = () => {
  const { cms, navigateTo, setSelectedCategory } = useApp();

  return (
    <section style={{ padding: '112px 0', background: '#121212', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', left: -120, top: '50%', transform: 'translateY(-50%)', width: 500, height: 500, background: 'radial-gradient(circle, rgba(197,160,89,0.10) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: -80, bottom: -80, width: 350, height: 350, background: 'radial-gradient(circle, rgba(197,160,89,0.07) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

          {/* Left: Text */}
          <div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 16px', borderRadius: 30,
              background: 'rgba(197,160,89,0.10)',
              border: '1px solid rgba(197,160,89,0.30)',
              fontSize: 9, fontWeight: 700, letterSpacing: '0.20em',
              textTransform: 'uppercase', color: '#C5A059', marginBottom: 24
            }}>
              <Sparkles size={10} /> THE ZIVANA PHILOSOPHY
            </span>

            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
              fontWeight: 700, lineHeight: 1.1,
              color: '#fff', letterSpacing: '-0.02em', marginBottom: 12
            }}>
              {cms.storyTitle || 'Beauty,'}
              <br />
              <span style={{ fontStyle: 'italic', color: '#C5A059' }}>Reimagined.</span>
            </h2>

            {/* Gold line */}
            <div style={{ width: 56, height: 2, background: 'linear-gradient(90deg, #C5A059, transparent)', borderRadius: 2, margin: '24px 0' }} />

            <p style={{ fontSize: 15, color: 'rgba(232,223,213,0.82)', fontWeight: 300, lineHeight: 1.85, marginBottom: 32, maxWidth: 480 }}>
              "{cms.storyQuote || 'ZIVANA brings together modern beauty, thoughtful care and timeless Indian inspiration. Discover products designed to become part of your everyday beauty ritual.'}"
            </p>

            {/* USP points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
              {[
                { title: 'Pure Indian Botanicals', desc: 'Hand-picked Kashmiri Saffron, Mysore Sandalwood, and organic cold-pressed herbs.' },
                { title: 'NOEUL ENTERPRISES Trust', desc: 'Grounded in uncompromising quality standards and Pan-India trustworthiness.' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C5A059', marginTop: 6, flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', display: 'block', marginBottom: 3 }}>{item.title}</span>
                    <span style={{ fontSize: 12, color: 'rgba(232,223,213,0.65)', lineHeight: 1.60 }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => { setSelectedCategory('All'); navigateTo('shop'); }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '15px 36px', background: '#C5A059',
                color: '#fff', borderRadius: 40, fontSize: 11,
                fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                boxShadow: '0 8px 32px rgba(197,160,89,0.35)',
                transition: 'all 0.22s ease', cursor: 'pointer'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#A8833B'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#C5A059'; e.currentTarget.style.transform = ''; }}
            >
              DISCOVER ZIVANA <ArrowRight size={14} />
            </button>
          </div>

          {/* Right: Image */}
          <div style={{ position: 'relative' }}>
            <div style={{ aspectRatio: '4/5', borderRadius: 28, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 32px 64px rgba(18,18,18,0.50)' }}>
              <img src={cms.storyImage || "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1000"}
                alt="ZIVANA Beauty Story"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transition: 'transform 0.8s ease' }}
                onMouseEnter={e => { e.target.style.transform = 'scale(1.04)'; }}
                onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,18,18,0.65) 0%, transparent 55%)' }} />

              {/* NOEUL Panel */}
              <div style={{
                position: 'absolute', bottom: 20, left: 20, right: 20,
                padding: '18px 20px',
                background: 'rgba(18,18,18,0.80)',
                backdropFilter: 'blur(16px)',
                borderRadius: 16, border: '1px solid rgba(255,255,255,0.12)', color: '#fff'
              }}>
                <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C5A059', marginBottom: 4 }}>PARENT COMPANY</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700 }}>NOEUL ENTERPRISES</p>
                <p style={{ fontSize: 11, color: 'rgba(232,223,213,0.65)', marginTop: 5, fontWeight: 300 }}>
                  Crafting premier consumer experiences for modern India.
                </p>
              </div>
            </div>

            {/* Floating stats card */}
            <div style={{
              position: 'absolute', top: -20, right: -20,
              background: '#fff', borderRadius: 16, padding: '16px 20px',
              boxShadow: '0 12px 32px rgba(18,18,18,0.20)',
              border: '1px solid #E8DFD5', textAlign: 'center'
            }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 800, color: '#C5A059', lineHeight: 1 }}>50+</p>
              <p style={{ fontSize: 10, fontWeight: 600, color: '#6B635B', marginTop: 4, letterSpacing: '0.08em' }}>LUXURY<br />PRODUCTS</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .story-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
