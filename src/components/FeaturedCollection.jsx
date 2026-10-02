import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const FeaturedCollection = () => {
  const { navigateTo, setSelectedCategory } = useApp();

  const collections = [
    {
      title: 'Kashmiri Saffron Collection',
      subtitle: 'Glow · Radiance · Luxury',
      desc: 'The rarest Kashmiri saffron, cold-pressed and concentrated for a natural, luminous skin transformation.',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1000',
      cat: 'Skincare', span: 2
    },
    {
      title: 'Sunset Lip Luxe',
      subtitle: 'Makeup Collection',
      desc: 'Rich, long-wear Indian pigments inspired by Rajasthani sunsets.',
      image: 'https://images.unsplash.com/photo-1586495777744-4e6232bf4e5e?auto=format&fit=crop&q=80&w=800',
      cat: 'Makeup', span: 1
    },
    {
      title: 'Oudh & Rose Attar',
      subtitle: 'Fragrance Collection',
      desc: 'Hand-distilled Indian attars blended with modern sensibility.',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
      cat: 'Fragrance', span: 1
    },
  ];

  return (
    <section style={{ padding: '96px 0', background: '#121212', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', right: -100, top: '20%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(197,160,89,0.10) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C5A059' }}>Curated Edits</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#fff', marginTop: 10 }}>
            Featured Collections
          </h2>
          <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, transparent, #C5A059, transparent)', margin: '16px auto 0' }} />
        </div>

        {/* Bento grid layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: 'auto', gap: 16 }}>
          {collections.map((col, i) => (
            <div
              key={col.title}
              onClick={() => { setSelectedCategory(col.cat); navigateTo('shop'); }}
              style={{
                gridColumn: i === 0 ? 'span 2' : 'span 1',
                position: 'relative', borderRadius: 22, overflow: 'hidden',
                aspectRatio: i === 0 ? '16/9' : '1/1',
                cursor: 'pointer', boxShadow: '0 16px 40px rgba(18,18,18,0.40)',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.02)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              <img src={col.image} alt={col.title} style={{
                width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
                transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)'
              }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,18,18,0.90) 0%, rgba(18,18,18,0.30) 55%, transparent 100%)' }} />

              <div style={{ position: 'absolute', inset: 0, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 10 }}>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.90)' }}>{col.subtitle}</span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: i === 0 ? 'clamp(1.4rem, 3vw, 2rem)' : '1.2rem', fontWeight: 700, color: '#fff', lineHeight: 1.25 }}>{col.title}</h3>
                {i === 0 && <p style={{ fontSize: 12, color: 'rgba(232,223,213,0.72)', fontWeight: 300, lineHeight: 1.65, maxWidth: 400 }}>{col.desc}</p>}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#C5A059', letterSpacing: '0.10em', textTransform: 'uppercase' }}>EXPLORE</span>
                  <ArrowRight size={13} color="#C5A059" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .feat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
