import React from 'react';
import { useApp } from '../context/AppContext';
import { Instagram, Facebook, Youtube, Twitter, MapPin, Phone, Mail, Sparkles } from 'lucide-react';

export const Footer = () => {
  const { navigateTo, setSelectedCategory } = useApp();

  const goShop = cat => { setSelectedCategory(cat); navigateTo('shop'); };

  return (
    <footer style={{ background: '#0E0E0E', borderTop: '1px solid rgba(197,160,89,0.20)', color: 'rgba(232,223,213,0.72)' }}>

      {/* Top Strip */}
      <div style={{ background: '#161616', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '22px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '12px 40px' }}>
          {[
            { icon: '🚚', label: 'Free Delivery Above ₹999' },
            { icon: '↩️', label: '30-Day Easy Returns' },
            { icon: '🔒', label: '100% Secure Payments' },
            { icon: '✅', label: 'Authentic Guarantee' },
            { icon: '🌿', label: 'Cruelty-Free & Vegan' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 500, color: 'rgba(232,223,213,0.75)', whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Grid */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 40px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48 }}>

          {/* Brand Column */}
          <div>
            {/* Logo */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 800, letterSpacing: '0.22em', color: '#fff', cursor: 'pointer' }}
                  onClick={() => navigateTo('home')}>ZIVANA</span>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#C5A059' }} />
              </div>
              <p style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9A8E84', fontWeight: 600 }}>
                A brand by <strong style={{ color: '#6B635B' }}>NOEUL ENTERPRISES</strong>
              </p>
            </div>

            <p style={{ fontSize: 12, lineHeight: 1.85, fontWeight: 300, maxWidth: 300, marginBottom: 24, color: 'rgba(232,223,213,0.65)' }}>
              Premium beauty essentials crafted with the finest Indian botanicals and modern science, celebrating the timeless beauty of Indian women.
            </p>

            {/* Social */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
              {[
                { Icon: Instagram, href: '#' },
                { Icon: Facebook, href: '#' },
                { Icon: Youtube, href: '#' },
                { Icon: Twitter, href: '#' },
              ].map(({ Icon, href }) => (
                <a key={href + Math.random()} href={href} style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(232,223,213,0.65)',
                  transition: 'all 0.20s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#C5A059'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(232,223,213,0.65)'; e.currentTarget.style.transform = ''; }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { Icon: MapPin, text: 'NOEUL ENTERPRISES, New Delhi, India' },
                { Icon: Phone, text: '+91 98765 43210' },
                { Icon: Mail, text: 'care@zivana.in' },
              ].map(({ Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 11, color: 'rgba(232,223,213,0.55)' }}>
                  <Icon size={13} color="#C5A059" style={{ flexShrink: 0, marginTop: 1 }} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <p style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#C5A059', marginBottom: 18 }}>SHOP</p>
            {[
              { label: 'All Products', cat: 'All' },
              { label: 'Skincare', cat: 'Skincare' },
              { label: 'Makeup', cat: 'Makeup' },
              { label: 'Haircare', cat: 'Haircare' },
              { label: 'Body Care', cat: 'Body Care' },
              { label: 'Fragrance', cat: 'Fragrance' },
              { label: 'New Arrivals', cat: 'New' },
              { label: 'Offers', cat: 'Offers' },
            ].map(item => (
              <button key={item.cat} onClick={() => goShop(item.cat)} style={{
                display: 'block', width: '100%', textAlign: 'left',
                fontSize: 12, color: 'rgba(232,223,213,0.60)', fontWeight: 300,
                padding: '5px 0', cursor: 'pointer',
                transition: 'color 0.18s'
              }}
              onMouseEnter={e => { e.target.style.color = '#C5A059'; }}
              onMouseLeave={e => { e.target.style.color = 'rgba(232,223,213,0.60)'; }}>
                {item.label}
              </button>
            ))}
          </div>

          {/* Help Column */}
          <div>
            <p style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#C5A059', marginBottom: 18 }}>HELP</p>
            {['My Account', 'Track Order', 'Returns & Exchanges', 'Shipping Policy', 'Payment Methods', 'FAQs', 'Contact Us', 'Gift Cards'].map(item => (
              <button key={item} onClick={() => { if (item === 'My Account' || item === 'Track Order') navigateTo('account'); }} style={{ display: 'block', width: '100%', textAlign: 'left', fontSize: 12, color: 'rgba(232,223,213,0.60)', fontWeight: 300, padding: '5px 0', cursor: 'pointer', transition: 'color 0.18s' }}
              onMouseEnter={e => { e.target.style.color = '#C5A059'; }}
              onMouseLeave={e => { e.target.style.color = 'rgba(232,223,213,0.60)'; }}>
                {item}
              </button>
            ))}
          </div>

          {/* Company Column */}
          <div>
            <p style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#C5A059', marginBottom: 18 }}>COMPANY</p>
            {['Our Story', 'NOEUL Enterprises', 'Sustainability', 'Ingredients', 'Blog', 'Press & Media', 'Careers', 'Become a Stockist'].map(item => (
              <button key={item} style={{ display: 'block', width: '100%', textAlign: 'left', fontSize: 12, color: 'rgba(232,223,213,0.60)', fontWeight: 300, padding: '5px 0', cursor: 'pointer', transition: 'color 0.18s' }}
              onMouseEnter={e => { e.target.style.color = '#C5A059'; }}
              onMouseLeave={e => { e.target.style.color = 'rgba(232,223,213,0.60)'; }}>
                {item}
              </button>
            ))}

            {/* Admin link */}
            <button onClick={() => navigateTo('admin')} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              marginTop: 20, padding: '8px 14px',
              background: 'rgba(197,160,89,0.10)',
              border: '1px solid rgba(197,160,89,0.25)',
              borderRadius: 12, fontSize: 10, fontWeight: 700,
              color: '#C5A059', letterSpacing: '0.06em',
              cursor: 'pointer', transition: 'all 0.18s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#C5A059'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(197,160,89,0.10)'; e.currentTarget.style.color = '#C5A059'; }}>
              <Sparkles size={11} /> ADMIN PORTAL
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '40px 0 28px' }} />

        {/* Bottom Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ fontSize: 11, color: 'rgba(107,99,91,0.70)' }}>
            © 2025 <strong style={{ color: '#6B635B' }}>NOEUL ENTERPRISES</strong>. All rights reserved. ZIVANA™ is a registered trademark.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
              <button key={link} style={{ fontSize: 10, color: 'rgba(107,99,91,0.70)', cursor: 'pointer', transition: 'color 0.18s' }}
              onMouseEnter={e => { e.target.style.color = '#C5A059'; }}
              onMouseLeave={e => { e.target.style.color = 'rgba(107,99,91,0.70)'; }}>
                {link}
              </button>
            ))}
          </div>
          <p style={{ fontSize: 10, color: 'rgba(107,99,91,0.50)' }}>Made with ♥ in India</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 580px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
};
