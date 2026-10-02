import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { navigateTo, addToCart, wishlist, toggleWishlist } = useApp();
  const isWished = wishlist.includes(product.id);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', borderRadius: 20, overflow: 'hidden',
        border: hovered ? '1px solid rgba(197,160,89,0.40)' : '1px solid #E8DFD5',
        boxShadow: hovered ? '0 24px 48px rgba(28,25,23,0.13)' : '0 2px 8px rgba(28,25,23,0.05)',
        transform: hovered ? 'translateY(-6px)' : 'none',
        transition: 'all 0.38s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex', flexDirection: 'column'
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: '#F7F3EE' }}>
        <img src={product.images[0]} alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)'
          }} />

        {/* Badges */}
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 6, zIndex: 2 }}>
          {product.isBestSeller && <span style={{ padding: '3px 10px', background: '#121212', color: '#fff', fontSize: 9, fontWeight: 800, letterSpacing: '0.10em', textTransform: 'uppercase', borderRadius: 20 }}>BEST SELLER</span>}
          {product.isNewArrival && <span style={{ padding: '3px 10px', background: '#C5A059', color: '#fff', fontSize: 9, fontWeight: 800, letterSpacing: '0.10em', textTransform: 'uppercase', borderRadius: 20 }}>NEW</span>}
          {product.isLimited && <span style={{ padding: '3px 10px', background: '#8C2D38', color: '#fff', fontSize: 9, fontWeight: 800, letterSpacing: '0.10em', textTransform: 'uppercase', borderRadius: 20 }}>LIMITED</span>}
        </div>

        {/* Wishlist */}
        <button
          onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }}
          style={{
            position: 'absolute', top: 12, right: 12, zIndex: 2,
            width: 36, height: 36, borderRadius: '50%',
            background: isWished ? '#8C2D38' : 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(8px)',
            border: '1px solid ' + (isWished ? '#8C2D38' : 'rgba(255,255,255,0.70)'),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(18,18,18,0.10)',
            transition: 'all 0.20s ease', cursor: 'pointer'
          }}
        >
          <Heart size={14} color={isWished ? '#fff' : '#3D3530'} fill={isWished ? '#fff' : 'none'} />
        </button>

        {/* Quick View overlay */}
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(18,18,18,0.20)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <button
            onClick={() => navigateTo('product-detail', product)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '9px 20px', background: '#fff',
              color: '#121212', borderRadius: 30, fontSize: 11,
              fontWeight: 700, letterSpacing: '0.06em',
              boxShadow: '0 4px 16px rgba(18,18,18,0.18)',
              transition: 'all 0.18s ease', cursor: 'pointer',
              transform: hovered ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.96)',
            }}
          >
            <Eye size={13} /> Quick View
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C5A059' }}>{product.brand}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#F7F1E5', padding: '3px 8px', borderRadius: 20 }}>
              <Star size={11} color="#C5A059" fill="#C5A059" />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#121212' }}>{product.rating}</span>
              <span style={{ fontSize: 10, color: '#9A8E84' }}>({product.reviewsCount})</span>
            </div>
          </div>

          <h3
            onClick={() => navigateTo('product-detail', product)}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 15, fontWeight: 600, color: hovered ? '#C5A059' : '#121212',
              lineHeight: 1.35, cursor: 'pointer',
              transition: 'color 0.2s ease',
              display: '-webkit-box', WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical', overflow: 'hidden'
            }}
          >{product.name}</h3>
        </div>

        {/* Price & Cart */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 16, paddingTop: 14,
          borderTop: '1px solid #F4EFEA'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: '#121212', letterSpacing: '-0.01em' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: 12, color: '#9A8E84', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {product.discountPercent > 0 && (
              <span style={{ fontSize: 10, fontWeight: 700, color: '#8C2D38' }}>Save {product.discountPercent}%</span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: hovered ? '#C5A059' : '#121212',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: hovered ? '0 4px 16px rgba(197,160,89,0.40)' : '0 2px 8px rgba(18,18,18,0.20)',
              transition: 'all 0.22s ease', cursor: 'pointer'
            }}
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const BestSellers = () => {
  const { products, navigateTo, setSelectedCategory } = useApp();
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Skincare', 'Makeup', 'Haircare', 'Body Care', 'Fragrance'];

  const filtered = products.filter(p => {
    if (activeTab === 'All') return p.isBestSeller || p.rating >= 4.8;
    return (p.isBestSeller || p.rating >= 4.8) && p.category === activeTab;
  });

  return (
    <section style={{ padding: '96px 0', background: '#F7F3EE' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C5A059' }}>Most Loved Formulas</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#121212', marginTop: 8, letterSpacing: '-0.01em' }}>
              ZIVANA Best Sellers
            </h2>
            <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, #C5A059, #A8833B)', borderRadius: 2, marginTop: 14 }} />
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: '8px 18px', borderRadius: 30,
                fontSize: 11, fontWeight: 600,
                background: activeTab === tab ? '#121212' : '#fff',
                color: activeTab === tab ? '#fff' : '#6B635B',
                border: activeTab === tab ? '1px solid #121212' : '1px solid #E8DFD5',
                boxShadow: activeTab === tab ? '0 4px 12px rgba(18,18,18,0.18)' : 'none',
                transition: 'all 0.20s ease', cursor: 'pointer', whiteSpace: 'nowrap'
              }}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 24 }}>
          {filtered.map(product => <ProductCard key={product.id} product={product} />)}
        </div>

        {/* View All CTA */}
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <button onClick={() => { setSelectedCategory('All'); navigateTo('shop'); }} style={{
            padding: '16px 44px', background: 'transparent',
            color: '#121212', borderRadius: 40, fontSize: 11,
            fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
            border: '1.5px solid #121212', transition: 'all 0.22s ease', cursor: 'pointer'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#121212'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#121212'; }}>
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};
