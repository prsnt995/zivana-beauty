import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const CustomerReviews = () => {
  const { reviews } = useApp();
  const [active, setActive] = useState(0);
  const disp = reviews?.length > 0 ? reviews : [];

  const prev = () => setActive(a => (a - 1 + disp.length) % disp.length);
  const next = () => setActive(a => (a + 1) % disp.length);

  if (!disp.length) return null;

  return (
    <section style={{ padding: '96px 0', background: '#FDFBF7' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C5A059' }}>Real Stories</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#121212', marginTop: 10 }}>
            Loved By Thousands
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {[1,2,3,4,5].map(s => <Star key={s} size={18} color="#C5A059" fill="#C5A059" />)}
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#121212' }}>4.9</span>
            <span style={{ fontSize: 12, color: '#9A8E84' }}>average from 12,000+ reviews</span>
          </div>
        </div>

        {/* Review Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, marginBottom: 48 }}>
          {disp.slice(0, 6).map((review, i) => (
            <div key={review.id} style={{
              background: '#fff', borderRadius: 20, border: '1px solid #E8DFD5',
              padding: '28px', display: 'flex', flexDirection: 'column',
              justifyContent: 'space-between', gap: 20,
              boxShadow: '0 2px 8px rgba(28,25,23,0.05)',
              position: 'relative', overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(28,25,23,0.10)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 8px rgba(28,25,23,0.05)'; }}
            >
              {/* Big quote mark */}
              <div style={{
                position: 'absolute', top: 16, right: 20,
                fontFamily: "'Playfair Display', serif",
                fontSize: 90, color: '#F7F1E5',
                lineHeight: 1, pointerEvents: 'none', fontStyle: 'italic'
              }}>"</div>

              <div>
                {/* Stars */}
                <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                  {Array.from({ length: review.rating }).map((_, j) => <Star key={j} size={14} color="#C5A059" fill="#C5A059" />)}
                </div>
                {/* Text */}
                <p style={{
                  fontSize: 13, fontWeight: 300, lineHeight: 1.80,
                  color: '#3D3530', fontStyle: 'italic',
                  display: '-webkit-box', WebkitLineClamp: 5,
                  WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>"{review.text}"</p>
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid #F4EFEA' }}>
                {review.avatar ? (
                  <img src={review.avatar} alt={review.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid #E8DFD5' }} />
                ) : (
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #C5A059, #A8833B)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                    {review.name?.[0] || 'A'}
                  </div>
                )}
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#121212' }}>{review.name}</p>
                  <p style={{ fontSize: 10, color: '#9A8E84', marginTop: 1 }}>{review.location || 'India'} · Verified Buyer</p>
                </div>
                {review.isVerified && (
                  <span style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 700, color: '#2D6A4F', background: 'rgba(45,106,79,0.10)', padding: '3px 8px', borderRadius: 20 }}>✓ VERIFIED</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Trust banner */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '12px 40px', padding: '24px 32px', background: '#F7F3EE', borderRadius: 20, border: '1px solid #E8DFD5' }}>
          {[
            { value: '50,000+', label: 'Happy Customers' },
            { value: '12,000+', label: 'Five-Star Reviews' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '98%', label: 'Repurchase Rate' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: '#C5A059', lineHeight: 1 }}>{stat.value}</p>
              <p style={{ fontSize: 10, fontWeight: 600, color: '#6B635B', marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
