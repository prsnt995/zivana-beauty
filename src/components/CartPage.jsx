import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Heart, Trash2, Plus, Minus, Tag, ArrowRight, PackageOpen, Sparkles, Zap } from 'lucide-react';
import { GooglePayLogo } from './GooglePayGateway';

const S = {
  btn: (bg='#121212', color='#fff', extra={}) => ({
    display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
    padding:'14px 28px', background:bg, color, borderRadius:40,
    fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase',
    border:'none', cursor:'pointer', transition:'all 0.22s ease', ...extra
  }),
  input: { width:'100%', padding:'12px 16px', background:'#F7F3EE', border:'1.5px solid #E8DFD5', borderRadius:14, fontFamily:'inherit', fontSize:12, color:'#121212', outline:'none', transition:'border-color 0.2s' },
};

export const CartPage = () => {
  const { cart, updateCartQty, removeFromCart, appliedCoupon, applyCoupon, removeCoupon, coupons, navigateTo, wishlist, toggleWishlist } = useApp();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const subtotal = cart.reduce((a, i) => a + i.product.price * i.quantity, 0);
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percent') discount = Math.round(subtotal * appliedCoupon.discountValue / 100);
    else discount = Math.min(appliedCoupon.discountValue, subtotal);
  }
  const shipping = subtotal - discount >= 999 ? 0 : 49;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleCoupon = () => {
    const c = coupons?.find(x => x.code.toUpperCase() === couponCode.toUpperCase());
    if (!c) { setCouponError('Invalid coupon code'); return; }
    if (c.minOrder && subtotal < c.minOrder) { setCouponError(`Min. order ₹${c.minOrder.toLocaleString('en-IN')} required`); return; }
    applyCoupon(c); setCouponError('');
  };

  if (cart.length === 0) {
    return (
      <div style={{ background:'#FDFBF7', minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px' }}>
        <div style={{ textAlign:'center', maxWidth:400 }}>
          <div style={{ width:80, height:80, borderRadius:'50%', background:'#F7F1E5', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', boxShadow:'0 4px 16px rgba(197,160,89,0.20)' }}>
            <ShoppingBag size={32} color="#C5A059" />
          </div>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:28, fontWeight:700, color:'#121212', marginBottom:10 }}>Your Bag is Empty</h2>
          <p style={{ fontSize:13, color:'#6B635B', lineHeight:1.75, fontWeight:300, marginBottom:28 }}>
            Discover our curated collection of luxury beauty essentials — crafted for your everyday glow.
          </p>
          <button onClick={() => navigateTo('shop')} style={{ ...S.btn('#C5A059', '#fff', { boxShadow:'0 8px 24px rgba(197,160,89,0.35)' }) }}
          onMouseEnter={e => { e.currentTarget.style.background='#A8833B'; }}
          onMouseLeave={e => { e.currentTarget.style.background='#C5A059'; }}>
            <Sparkles size={14} /> Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background:'#FDFBF7', minHeight:'100vh' }}>
      {/* Page Header */}
      <div style={{ background:'linear-gradient(105deg, #121212 0%, #1A1A0A 100%)', padding:'48px 40px 40px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(197,160,89,0.80)' }}>BAG REVIEW</span>
          <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(2rem, 4vw, 3.2rem)', fontWeight:800, color:'#fff', marginTop:8, letterSpacing:'-0.02em' }}>
            Shopping Bag ({cart.reduce((a, i) => a + i.quantity, 0)} {cart.reduce((a, i) => a + i.quantity, 0) === 1 ? 'item' : 'items'})
          </h1>
        </div>
      </div>

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'40px 40px 80px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:36, alignItems:'flex-start' }}>

          {/* ── Left: Cart Items ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {cart.map(({ product, quantity }) => (
              <div key={product.id} style={{
                background:'#fff', borderRadius:20, border:'1px solid #E8DFD5',
                padding:'20px 24px', display:'flex', gap:20, alignItems:'center',
                boxShadow:'0 2px 8px rgba(28,25,23,0.04)', transition:'all 0.2s ease'
              }}>
                <img src={product.images[0]} alt={product.name} style={{ width:84, height:84, borderRadius:14, objectFit:'cover', background:'#F7F3EE', flexShrink:0 }} />

                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12 }}>
                    <div>
                      <span style={{ fontSize:9, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#C5A059' }}>{product.category}</span>
                      <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:16, fontWeight:700, color:'#121212', marginTop:2, lineHeight:1.3 }}>{product.name}</h3>
                      <p style={{ fontSize:11, color:'#9A8E84', marginTop:2 }}>{product.weight || 'Full Size'}</p>
                    </div>
                    <button onClick={() => removeFromCart(product.id)} style={{ color:'#9A8E84', padding:6, borderRadius:8, border:'none', background:'none', cursor:'pointer', transition:'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.color='#8C2D38'; e.currentTarget.style.background='#F7F3EE'; }}
                    onMouseLeave={e => { e.currentTarget.style.color='#9A8E84'; e.currentTarget.style.background='none'; }}>
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:14 }}>
                    {/* Qty Controls */}
                    <div style={{ display:'inline-flex', alignItems:'center', background:'#F7F3EE', borderRadius:30, border:'1px solid #E8DFD5', padding:2 }}>
                      <button onClick={() => updateCartQty(product.id, quantity - 1)} style={{ width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', border:'none', background:'none', cursor:'pointer', color:'#3D3530', transition:'color 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.color='#C5A059'; }} onMouseLeave={e => { e.currentTarget.style.color='#3D3530'; }}>
                        <Minus size={13} />
                      </button>
                      <span style={{ width:36, textAlign:'center', fontSize:13, fontWeight:800, color:'#121212' }}>{quantity}</span>
                      <button onClick={() => updateCartQty(product.id, quantity + 1)} style={{ width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', border:'none', background:'none', cursor:'pointer', color:'#3D3530', transition:'color 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.color='#C5A059'; }} onMouseLeave={e => { e.currentTarget.style.color='#3D3530'; }}>
                        <Plus size={13} />
                      </button>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontSize:17, fontWeight:800, color:'#121212' }}>₹{(product.price * quantity).toLocaleString('en-IN')}</div>
                      {quantity > 1 && <div style={{ fontSize:10, color:'#9A8E84', marginTop:2 }}>₹{product.price.toLocaleString('en-IN')} each</div>}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <button onClick={() => navigateTo('shop')} style={{ ...S.btn('transparent','#121212',{ border:'1.5px solid #E8DFD5', alignSelf:'flex-start', marginTop:8 }) }}
            onMouseEnter={e => { e.currentTarget.style.background='#F7F3EE'; }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; }}>
              ← Continue Shopping
            </button>
          </div>

          {/* ── Right: Order Summary ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {/* Coupon */}
            <div style={{ background:'#fff', borderRadius:20, border:'1px solid #E8DFD5', padding:'24px', boxShadow:'0 2px 8px rgba(28,25,23,0.05)' }}>
              <p style={{ fontSize:11, fontWeight:700, color:'#121212', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:14, display:'flex', alignItems:'center', gap:6 }}>
                <Tag size={14} color="#C5A059" /> Coupon Code
              </p>
              {appliedCoupon ? (
                <div style={{ background:'rgba(45,106,79,0.08)', border:'1px solid rgba(45,106,79,0.25)', borderRadius:14, padding:'12px 16px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div>
                    <span style={{ fontSize:12, fontWeight:800, color:'#2D6A4F' }}>✓ {appliedCoupon.code}</span>
                    <p style={{ fontSize:10, color:'#2D6A4F', marginTop:2 }}>Coupon applied successfully</p>
                  </div>
                  <button onClick={removeCoupon} style={{ color:'#9A8E84', cursor:'pointer', border:'none', background:'none', fontSize:18, lineHeight:1 }}>×</button>
                </div>
              ) : (
                <div>
                  <div style={{ display:'flex', gap:8 }}>
                    <input value={couponCode} onChange={e => setCouponCode(e.target.value.toUpperCase())}
                      onKeyDown={e => { if(e.key==='Enter') handleCoupon(); }}
                      placeholder="Enter coupon code"
                      style={{ ...S.input, flex:1, padding:'11px 14px', borderRadius:12 }}
                      onFocus={e => { e.target.style.borderColor='#C5A059'; }} onBlur={e => { e.target.style.borderColor='#E8DFD5'; }}>
                    </input>
                    <button onClick={handleCoupon} style={{ ...S.btn('#121212','#fff',{ padding:'11px 18px', fontSize:10, borderRadius:12 }) }}
                    onMouseEnter={e => { e.currentTarget.style.background='#C5A059'; }} onMouseLeave={e => { e.currentTarget.style.background='#121212'; }}>APPLY</button>
                  </div>
                  {couponError && <p style={{ fontSize:10, color:'#8C2D38', marginTop:6, fontWeight:600 }}>{couponError}</p>}
                  <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:12 }}>
                    {coupons?.slice(0,3).map(c => (
                      <button key={c.code} onClick={() => { setCouponCode(c.code); }} style={{ padding:'3px 10px', background:'#F7F3EE', border:'1px dashed rgba(197,160,89,0.55)', borderRadius:20, fontSize:9, fontWeight:700, color:'#C5A059', letterSpacing:'0.08em', cursor:'pointer' }}>
                        {c.code}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Summary */}
            <div style={{ background:'#fff', borderRadius:20, border:'1px solid #E8DFD5', padding:'24px', boxShadow:'0 4px 16px rgba(28,25,23,0.08)' }}>
              <p style={{ fontSize:11, fontWeight:700, color:'#121212', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:18 }}>Order Summary</p>
              {[
                { label:'Subtotal', value:`₹${subtotal.toLocaleString('en-IN')}` },
                { label:'Discount', value: discount > 0 ? `-₹${discount.toLocaleString('en-IN')}` : '—', color: discount > 0 ? '#2D6A4F' : undefined },
                { label:'Delivery', value: shipping === 0 ? 'FREE' : `₹${shipping}`, color: shipping === 0 ? '#2D6A4F' : undefined },
              ].map(row => (
                <div key={row.label} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #F4EFEA' }}>
                  <span style={{ fontSize:12, color:'#6B635B' }}>{row.label}</span>
                  <span style={{ fontSize:12, fontWeight:700, color: row.color || '#121212' }}>{row.value}</span>
                </div>
              ))}
              <div style={{ display:'flex', justifyContent:'space-between', padding:'16px 0 0', marginTop:4 }}>
                <span style={{ fontSize:14, fontWeight:800, color:'#121212' }}>Total</span>
                <div style={{ textAlign:'right' }}>
                  <span style={{ fontFamily:"'Playfair Display', serif", fontSize:22, fontWeight:800, color:'#121212' }}>₹{total.toLocaleString('en-IN')}</span>
                  <p style={{ fontSize:9, color:'#9A8E84', marginTop:2 }}>inclusive of all taxes</p>
                </div>
              </div>

              {/* Standard Checkout */}
              <button onClick={() => navigateTo('checkout')} style={{ ...S.btn('#C5A059','#fff',{ width:'100%', marginTop:20, padding:'15px', fontSize:12, boxShadow:'0 8px 24px rgba(197,160,89,0.35)' }) }}
              onMouseEnter={e => { e.currentTarget.style.background='#A8833B'; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='#C5A059'; e.currentTarget.style.transform=''; }}>
                Proceed to Checkout <ArrowRight size={15} />
              </button>

              {/* Fast Google Pay Checkout Button */}
              <button
                onClick={() => navigateTo('checkout')}
                style={{
                  ...S.btn('#121212','#fff',{
                    width:'100%',
                    marginTop:10,
                    padding:'13px',
                    fontSize:11,
                    boxShadow:'0 4px 14px rgba(0,0,0,0.15)',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    gap:8
                  })
                }}
                onMouseEnter={e => { e.currentTarget.style.background='#222'; e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='#121212'; e.currentTarget.style.transform=''; }}
              >
                <span>Express Pay with</span>
                <div style={{ background:'#fff', padding:'2px 7px', borderRadius:6, display:'inline-flex', alignItems:'center' }}>
                  <GooglePayLogo height={16} variant="dark" />
                </div>
              </button>

              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, marginTop:14, fontSize:10, color:'#9A8E84', fontWeight:500 }}>
                🔒 Secure checkout · 256-bit SSL encrypted
              </div>

              {/* Free shipping progress */}
              {shipping > 0 && (
                <div style={{ marginTop:16, padding:'12px 14px', background:'#F7F1E5', borderRadius:12, border:'1px solid rgba(197,160,89,0.25)' }}>
                  <p style={{ fontSize:11, fontWeight:600, color:'#6B635B', marginBottom:8 }}>
                    Add <strong style={{ color:'#C5A059' }}>₹{(999 - subtotal).toLocaleString('en-IN')}</strong> more for free delivery!
                  </p>
                  <div style={{ height:5, background:'#E8DFD5', borderRadius:10, overflow:'hidden' }}>
                    <div style={{ width:`${Math.min(100,(subtotal/999)*100)}%`, height:'100%', background:'linear-gradient(90deg, #C5A059, #A8833B)', borderRadius:10, transition:'width 0.5s ease' }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
