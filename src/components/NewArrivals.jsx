import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const ArrivalCard = ({ product, reverse }) => {
  const { navigateTo, addToCart, wishlist, toggleWishlist } = useApp();
  const isWished = wishlist.includes(product.id);

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      gap: 0, borderRadius: 24, overflow: 'hidden',
      border: '1px solid #E8DFD5',
      boxShadow: '0 8px 32px rgba(28,25,23,0.08)',
      direction: reverse ? 'rtl' : 'ltr',
      transition: 'box-shadow 0.35s ease'
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 20px 48px rgba(28,25,23,0.14)'; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(28,25,23,0.08)'; }}>
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: '#F7F3EE', direction: 'ltr' }}>
        <img src={product.images[0]} alt={product.name} style={{
          width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
          transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)'
        }}
        onMouseEnter={e => { e.target.style.transform = 'scale(1.07)'; }}
        onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
        />
        <div style={{ position: 'absolute', top: 16, left: 16 }}>
          <span style={{ padding: '4px 12px', background: '#C5A059', color: '#fff', fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: 20, display: 'block' }}>NEW ARRIVAL</span>
        </div>
        <button onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }} style={{
          position: 'absolute', top: 14, right: 14,
          width: 36, height: 36, borderRadius: '50%',
          background: isWished ? '#8C2D38' : 'rgba(255,255,255,0.88)',
          border: '1px solid ' + (isWished ? '#8C2D38' : 'rgba(255,255,255,0.60)'),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.20s ease', backdropFilter: 'blur(8px)'
        }}>
          <Heart size={14} color={isWished ? '#fff' : '#3D3530'} fill={isWished ? '#fff' : 'none'} />
        </button>
      </div>

      {/* Info */}
      <div style={{ background: '#fff', padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16, direction: 'ltr' }}>
        <div>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C5A059', display: 'block', marginBottom: 6 }}>
            {product.brand} · {product.category}
          </span>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 2.2vw, 1.7rem)', fontWeight: 700, color: '#121212', lineHeight: 1.25 }}>{product.name}</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 2 }}>
            {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={13} color="#C5A059" fill={j < Math.floor(product.rating) ? "#C5A059" : "none"} />)}
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#121212' }}>{product.rating}</span>
          <span style={{ fontSize: 11, color: '#9A8E84' }}>({product.reviewsCount} reviews)</span>
        </div>

        <p style={{ fontSize: 12, color: '#6B635B', fontWeight: 300, lineHeight: 1.75, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.shortDesc}
        </p>

        {/* Size / Shade chips */}
        {product.variants?.[0]?.options?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {product.variants[0].options.slice(0, 4).map(opt => (
              <span key={opt} style={{ padding: '4px 12px', borderRadius: 20, background: '#F7F3EE', border: '1px solid #E8DFD5', fontSize: 10, fontWeight: 600, color: '#6B635B' }}>{opt}</span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #F4EFEA' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: '#121212' }}>₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && <span style={{ fontSize: 12, color: '#9A8E84', textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString('en-IN')}</span>}
            </div>
            {product.discountPercent > 0 && <span style={{ fontSize: 10, fontWeight: 700, color: '#8C2D38' }}>Save {product.discountPercent}%</span>}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => navigateTo('product-detail', product)} style={{
              padding: '10px 16px', border: '1.5px solid #121212',
              borderRadius: 30, fontSize: 10, fontWeight: 700, color: '#121212',
              letterSpacing: '0.06em', transition: 'all 0.18s ease', cursor: 'pointer',
              background: 'transparent'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F7F3EE'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
              VIEW
            </button>
            <button onClick={() => addToCart(product)} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '10px 18px', background: '#121212',
              color: '#fff', borderRadius: 30, fontSize: 10,
              fontWeight: 700, letterSpacing: '0.06em',
              transition: 'all 0.20s ease', cursor: 'pointer'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#C5A059'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#121212'; }}>
              <ShoppingBag size={13} /> ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NewArrivals = () => {
  const { products, navigateTo, setSelectedCategory } = useApp();
  const newProds = products.filter(p => p.isNewArrival).slice(0, 3);

  if (!newProds.length) return null;

  return (
    <section style={{ padding: '96px 0', background: '#FDFBF7' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 56, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C5A059' }}>Fresh Launches</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#121212', marginTop: 8 }}>New Arrivals</h2>
            <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, #C5A059, #A8833B)', borderRadius: 2, marginTop: 14 }} />
          </div>
          <button onClick={() => { setSelectedCategory('New'); navigateTo('shop'); }} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 11, fontWeight: 700, color: '#121212', letterSpacing: '0.08em',
            textTransform: 'uppercase', cursor: 'pointer',
            transition: 'color 0.18s', background: 'transparent', border: 'none'
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#C5A059'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#121212'; }}>
            VIEW ALL <ArrowRight size={14} />
          </button>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {newProds.map((p, i) => <ArrivalCard key={p.id} product={p} reverse={i % 2 !== 0} />)}
        </div>
      </div>
    </section>
  );
};
