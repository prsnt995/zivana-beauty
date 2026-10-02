import React from 'react';
import { useApp } from '../context/AppContext';
import { Zap, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const CouponCard = ({ coupon }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(coupon.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{
      background: '#fff', borderRadius: 20,
      border: '2px dashed rgba(197,160,89,0.45)',
      padding: '24px', position: 'relative', overflow: 'hidden',
      transition: 'border-color 0.25s ease, box-shadow 0.25s ease'
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = '#C5A059'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(197,160,89,0.15)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(197,160,89,0.45)'; e.currentTarget.style.boxShadow = 'none'; }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: 'radial-gradient(circle at top right, rgba(197,160,89,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C5A059' }}>EXCLUSIVE OFFER</span>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#121212', lineHeight: 1.1, marginTop: 4 }}>
            {coupon.discountType === 'percent' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} OFF`}
          </p>
          <p style={{ fontSize: 11, color: '#6B635B', fontWeight: 300, marginTop: 4 }}>{coupon.description}</p>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #F7F1E5, #F4EFEA)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Zap size={20} color="#C5A059" />
        </div>
      </div>

      {/* Code box */}
      <div style={{ background: '#F7F3EE', border: '1px solid #E8DFD5', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: '#121212', letterSpacing: '0.12em' }}>{coupon.code}</span>
        <button onClick={copy} style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '6px 12px', borderRadius: 20, fontSize: 10, fontWeight: 700,
          background: copied ? '#2D6A4F' : '#121212',
          color: '#fff', transition: 'all 0.20s ease', cursor: 'pointer'
        }}>
          {copied ? <><Check size={11} /> COPIED!</> : <><Copy size={11} /> COPY</>}
        </button>
      </div>

      {coupon.minOrder && (
        <p style={{ fontSize: 10, color: '#9A8E84', marginTop: 10, fontWeight: 500 }}>Min. order: ₹{coupon.minOrder.toLocaleString('en-IN')}</p>
      )}
    </div>
  );
};

export const OffersSection = () => {
  const { coupons, navigateTo, setSelectedCategory } = useApp();

  return (
    <section style={{ padding: '96px 0', background: '#FDFBF7' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C5A059' }}>Members' Deals</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#121212', marginTop: 10 }}>
            Exclusive Offers & Coupons
          </h2>
          <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, transparent, #C5A059, transparent)', margin: '16px auto 0' }} />
        </div>

        {/* Coupon Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {(coupons || []).map(c => <CouponCard key={c.code} coupon={c} />)}
        </div>

        {/* CTA Banner */}
        <div style={{
          marginTop: 48, padding: '36px 40px',
          background: 'linear-gradient(105deg, #121212 0%, #1A1A0A 100%)',
          borderRadius: 24, border: '1px solid rgba(197,160,89,0.20)',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20
        }}>
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
              Up to <span style={{ color: '#C5A059' }}>40% Off</span> on Bestsellers
            </p>
            <p style={{ fontSize: 12, color: 'rgba(232,223,213,0.60)', marginTop: 6, fontWeight: 300 }}>Limited time. Don't miss out on our biggest sale of the season.</p>
          </div>
          <button onClick={() => { setSelectedCategory('Offers'); navigateTo('shop'); }} style={{
            padding: '14px 36px', background: '#C5A059',
            color: '#fff', borderRadius: 40, fontSize: 11,
            fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
            boxShadow: '0 8px 24px rgba(197,160,89,0.35)',
            transition: 'all 0.20s ease', cursor: 'pointer', whiteSpace: 'nowrap'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#A8833B'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#C5A059'; }}>
            SHOP OFFERS →
          </button>
        </div>
      </div>
    </section>
  );
};
