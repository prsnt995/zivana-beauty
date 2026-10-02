import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { ArrowUpRight } from 'lucide-react';

export const Categories = () => {
  const { navigateTo, setSelectedCategory } = useApp();

  return (
    <section style={{ padding: '96px 0', background: '#FDFBF7' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C5A059' }}>
            Curated Beauty
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 700,
            color: '#121212', marginTop: 10, letterSpacing: '-0.01em'
          }}>Shop By Category</h2>
          <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, transparent, #C5A059, transparent)', margin: '18px auto 0' }} />
        </div>

        {/* 6-Col Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20
        }}>
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.name); navigateTo('shop'); }}
              style={{
                position: 'relative', borderRadius: 22, overflow: 'hidden',
                cursor: 'pointer', aspectRatio: '3/4',
                boxShadow: '0 8px 24px rgba(28,25,23,0.10)',
                transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 28px 56px rgba(28,25,23,0.20)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.10)';
                const arrow = e.currentTarget.querySelector('.cat-arrow');
                if (arrow) { arrow.style.background = '#C5A059'; arrow.style.transform = 'scale(1.12) rotate(-5deg)'; }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(28,25,23,0.10)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
                const arrow = e.currentTarget.querySelector('.cat-arrow');
                if (arrow) { arrow.style.background = 'rgba(255,255,255,0.18)'; arrow.style.transform = ''; }
              }}
            >
              {/* Image */}
              <img src={cat.image} alt={cat.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }} />

              {/* Overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,18,18,0.88) 0%, rgba(18,18,18,0.20) 55%, transparent 100%)' }} />

              {/* Content */}
              <div style={{ position: 'absolute', inset: 0, padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 2 }}>
                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <span style={{
                    padding: '4px 12px', background: 'rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(8px)', borderRadius: 20,
                    fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: '#fff',
                    border: '1px solid rgba(255,255,255,0.25)'
                  }}>{cat.itemCount}</span>

                  <div className="cat-arrow" style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', transition: 'all 0.25s ease'
                  }}>
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Bottom text */}
                <div>
                  <p style={{ fontSize: 10, color: 'rgba(197,160,89,0.90)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
                    ZIVANA
                  </p>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                    fontWeight: 700, color: '#fff',
                    letterSpacing: '0.01em', lineHeight: 1.2, marginBottom: 6
                  }}>{cat.name}</h3>
                  <p style={{ fontSize: 11, color: 'rgba(232,223,213,0.70)', fontWeight: 300 }}>{cat.subtitle}</p>
                  <p style={{ fontSize: 10, color: '#C5A059', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 12 }}>
                    EXPLORE →
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
