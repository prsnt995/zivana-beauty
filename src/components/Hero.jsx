import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, ShieldCheck, Sparkles, Award, Truck } from 'lucide-react';

export const Hero = () => {
  const { cms, navigateTo, setSelectedCategory } = useApp();

  return (
    <section style={{
      position: 'relative', width: '100%',
      minHeight: 'calc(100vh - 106px)',
      display: 'flex', alignItems: 'center',
      background: '#121212', overflow: 'hidden'
    }}>
      {/* BG Image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src={cms.heroBannerImg || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1920"}
          alt="ZIVANA"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', animation: 'heroKenBurns 18s ease-in-out infinite alternate' }}
        />
        {/* Multi-layer overlay for depth */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(18,18,18,0.94) 0%, rgba(18,18,18,0.70) 45%, rgba(18,18,18,0.15) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,18,18,0.80) 0%, transparent 50%)' }} />
      </div>

      {/* Gold ambient glow */}
      <div style={{
        position: 'absolute', left: -100, top: '20%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(197,160,89,0.12) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 1
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '80px 40px', width: '100%' }}>
        <div style={{ maxWidth: 680 }}>

          {/* Eyebrow badge */}
          <div style={{ animation: 'fadeSlideUp 0.8s ease 0.1s both' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '7px 18px', borderRadius: 30,
              background: 'rgba(197,160,89,0.12)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(197,160,89,0.40)',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.20em',
              textTransform: 'uppercase', color: '#C5A059'
            }}>
              <Sparkles size={12} /> ZIVANA — A brand by NOEUL ENTERPRISES
            </span>
          </div>

          {/* Main Heading */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            fontWeight: 800, lineHeight: 1.02,
            letterSpacing: '-0.025em', color: '#fff',
            marginTop: 24,
            animation: 'fadeSlideUp 0.8s ease 0.22s both'
          }}>
            {cms.heroHeading || 'YOUR BEAUTY.\nYOUR GLOW.\nYOUR ZIVANA.'}
          </h1>

          {/* Gold separator line */}
          <div style={{ width: 64, height: 2, background: 'linear-gradient(90deg, #C5A059, #A8833B)', borderRadius: 2, margin: '28px 0', animation: 'fadeSlideUp 0.8s ease 0.32s both' }} />

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
            color: 'rgba(232,223,213,0.88)',
            fontWeight: 300, lineHeight: 1.75, maxWidth: 500,
            animation: 'fadeSlideUp 0.8s ease 0.40s both'
          }}>
            {cms.heroSubtitle || 'Discover beauty essentials curated for your everyday glow. Crafted with rare Indian botanicals and modern skincare science.'}
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 36, animation: 'fadeSlideUp 0.8s ease 0.52s both' }}>
            <button
              onClick={() => { setSelectedCategory('All'); navigateTo('shop'); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '16px 36px', background: '#C5A059',
                color: '#fff', borderRadius: 40, fontSize: 11,
                fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                boxShadow: '0 8px 32px rgba(197,160,89,0.40)',
                transition: 'all 0.22s ease', cursor: 'pointer'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#A8833B'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(197,160,89,0.50)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#C5A059'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(197,160,89,0.40)'; }}
            >
              SHOP NOW <ArrowRight size={15} />
            </button>

            <button
              onClick={() => { setSelectedCategory('Skincare'); navigateTo('shop'); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '16px 36px',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                color: '#fff', borderRadius: 40, fontSize: 11,
                fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
                border: '1px solid rgba(255,255,255,0.28)',
                transition: 'all 0.22s ease', cursor: 'pointer'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.50)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'; }}
            >
              EXPLORE COLLECTION
            </button>
          </div>

          {/* Trust Badges */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px 28px', marginTop: 52, paddingTop: 32,
            borderTop: '1px solid rgba(255,255,255,0.10)',
            animation: 'fadeSlideUp 0.8s ease 0.64s both'
          }}>
            {[
              { icon: ShieldCheck, text: '100% Authentic Formulas' },
              { icon: Award, text: 'Dermatologically Tested' },
              { icon: Sparkles, text: 'Cruelty-Free & Vegan' },
              { icon: Truck, text: 'Pan-India Free Shipping' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'rgba(232,223,213,0.80)' }}>
                <Icon size={14} color="#C5A059" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        color: 'rgba(255,255,255,0.45)', fontSize: 9, letterSpacing: '0.15em', fontWeight: 600,
        textTransform: 'uppercase', zIndex: 2, animation: 'float 3s ease-in-out infinite'
      }}>
        <span>SCROLL</span>
        <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, rgba(197,160,89,0.60), transparent)' }} />
      </div>
    </section>
  );
};
