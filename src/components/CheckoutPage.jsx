import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Truck, CreditCard, QrCode, Building2, CheckCircle2, Lock, Sparkles, ArrowRight, Info, ShieldCheck, Zap } from 'lucide-react';
import { GooglePayGateway, ExpressGooglePayBanner, GooglePayLogo } from './GooglePayGateway';

const S = {
  btn: (bg='#121212', color='#fff', extra={}) => ({
    display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
    padding:'14px 28px', background:bg, color, borderRadius:40,
    fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase',
    border:'none', cursor:'pointer', transition:'all 0.22s ease', ...extra
  }),
  input: { width:'100%', padding:'13px 16px', background:'#F7F3EE', border:'1.5px solid #E8DFD5', borderRadius:14, fontFamily:'inherit', fontSize:13, color:'#121212', outline:'none', transition:'border-color 0.2s' },
  card: { background:'#fff', borderRadius:22, border:'1px solid #E8DFD5', padding:'28px', boxShadow:'0 2px 8px rgba(28,25,23,0.05)', marginBottom:20 },
  label: { display:'block', fontSize:10, fontWeight:700, color:'#121212', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:8 },
  stepNum: (active) => ({ width:30, height:30, borderRadius:'50%', background: active ? '#121212' : '#F7F3EE', color: active ? '#fff' : '#9A8E84', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, flexShrink:0 }),
};

const InputField = ({ label, ...props }) => (
  <div>
    {label && <label style={S.label}>{label}</label>}
    <input style={S.input} onFocus={e => { e.target.style.borderColor='#C5A059'; e.target.style.background='#fff'; }} onBlur={e => { e.target.style.borderColor='#E8DFD5'; e.target.style.background='#F7F3EE'; }} {...props} />
  </div>
);

export const CheckoutPage = () => {
  const { cart, appliedCoupon, placeOrder, user, navigateTo, showToast } = useApp();
  const [formData, setFormData] = useState({
    fullName: user?.name || '', phone: user?.phone || '', email: user?.email || '',
    address: user?.addresses?.[0]?.street || '', city: user?.addresses?.[0]?.city || 'Bengaluru',
    state: user?.addresses?.[0]?.state || 'Karnataka', pincode: user?.addresses?.[0]?.pincode || '560103', gstin: ''
  });
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('gpay'); // 'gpay' | 'upi' | 'card' | 'netbanking' | 'cod'
  const [upiVpa, setUpiVpa] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percent') discount = Math.round(subtotal * appliedCoupon.discountValue / 100);
    else discount = Math.min(appliedCoupon.discountValue, subtotal);
  }
  const deliveryFee = deliveryMethod === 'express' ? 99 : subtotal >= 999 ? 0 : 49;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const STATES = ['Andhra Pradesh','Assam','Bihar','Delhi','Gujarat','Haryana','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','West Bengal'];

  const fd = (k, v) => setFormData(p => ({ ...p, [k]: v }));

  const handleOrderCompletion = (customPaymentDetails = null) => {
    const pMethod = customPaymentDetails ? customPaymentDetails.method : paymentMethod === 'gpay' ? 'Google Pay' : paymentMethod.toUpperCase();
    
    const order = {
      customer: {
        fullName: formData.fullName || 'Valued Customer',
        phone: formData.phone || '9876543210',
        email: formData.email || 'customer@example.com',
        address: formData.address || 'Street Address',
        city: formData.city || 'Bengaluru',
        state: formData.state || 'Karnataka',
        pincode: formData.pincode || '560103',
      },
      subtotal,
      discount,
      deliveryFee,
      total,
      paymentMethod: pMethod,
      gstin: formData.gstin || null,
      transactionDetails: customPaymentDetails
    };

    placeOrder?.(order);
    setIsProcessing(false);
    navigateTo('account');
    showToast(`🎉 Order placed successfully via ${pMethod}! Check your email for details.`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      showToast('Please fill in all required fields in Step 1', 'error');
      return;
    }
    if (formData.phone.replace(/\D/g,'').length < 10) {
      showToast('Enter a valid 10-digit mobile number', 'error');
      return;
    }

    if (paymentMethod === 'gpay') {
      // Trigger Google Pay processing
      setIsProcessing(true);
      setTimeout(() => {
        handleOrderCompletion({
          method: 'Google Pay',
          transactionId: `GPA.${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
          status: 'PAID'
        });
      }, 1500);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      handleOrderCompletion();
    }, 2000);
  };

  const handleExpressGPay = () => {
    if (!formData.fullName || !formData.phone || !formData.address) {
      // Auto-populate demo customer if missing for instant express checkout experience
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || 'Priya Sharma',
        phone: prev.phone || '9876543210',
        email: prev.email || 'priya.sharma@example.com',
        address: prev.address || '104 Lotus Boulevard, Indiranagar',
        city: prev.city || 'Bengaluru',
        state: prev.state || 'Karnataka',
        pincode: prev.pincode || '560038'
      }));
    }
    setPaymentMethod('gpay');
    showToast('⚡ Google Pay selected. Authorize your payment below.');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  if (cart.length === 0) {
    return (
      <div style={{ background:'#FDFBF7', minHeight:'70vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <p style={{ fontSize:16, color:'#6B635B', marginBottom:20 }}>Your cart is empty.</p>
          <button onClick={() => navigateTo('shop')} style={S.btn()}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background:'#FDFBF7', minHeight:'100vh' }}>
      {/* Header */}
      <div style={{ background:'linear-gradient(105deg, #121212 0%, #1A1A0A 100%)', padding:'48px 40px 40px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:16 }}>
          <div>
            <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(197,160,89,0.80)' }}>
              SECURE CHECKOUT · A BRAND BY NOEUL ENTERPRISES
            </span>
            <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(1.8rem, 4vw, 3rem)', fontWeight:800, color:'#fff', marginTop:8, letterSpacing:'-0.02em' }}>
              Complete Your Order
            </h1>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10, background:'rgba(255,255,255,0.08)', padding:'8px 16px', borderRadius:30, border:'1px solid rgba(197,160,89,0.3)' }}>
            <GooglePayLogo height={16} variant="light" />
            <span style={{ color:'#fff', fontSize:11, fontWeight:600 }}>Enabled</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'40px 40px 80px' }}>
        {/* Express Google Pay 1-Click Banner */}
        <ExpressGooglePayBanner onExpressPay={handleExpressGPay} total={total} />

        <form onSubmit={handleSubmit}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:32, alignItems:'flex-start' }}>

            {/* ── Left: Checkout Sections ── */}
            <div>
              {/* 1. Delivery Address */}
              <div style={S.card}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24, paddingBottom:20, borderBottom:'1px solid #F4EFEA' }}>
                  <div style={S.stepNum(true)}>1</div>
                  <div>
                    <p style={{ fontFamily:"'Playfair Display', serif", fontSize:18, fontWeight:700, color:'#121212' }}>Delivery Address</p>
                    <p style={{ fontSize:11, color:'#9A8E84', marginTop:2 }}>Where should we send your luxury package?</p>
                  </div>
                  <MapPin size={18} color="#C5A059" style={{ marginLeft:'auto' }} />
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
                  <InputField label="Full Name *" value={formData.fullName} onChange={e => fd('fullName', e.target.value)} placeholder="Priya Sharma" required />
                  <InputField label="Phone Number *" value={formData.phone} onChange={e => fd('phone', e.target.value)} placeholder="98765 43210" type="tel" required />
                </div>
                <div style={{ marginBottom:16 }}>
                  <InputField label="Email Address" value={formData.email} onChange={e => fd('email', e.target.value)} placeholder="priya@example.com" type="email" />
                </div>
                <div style={{ marginBottom:16 }}>
                  <InputField label="Street Address / Flat / Building *" value={formData.address} onChange={e => fd('address', e.target.value)} placeholder="Flat 402, Lotus Apartments, 12th Main Road" required />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16, marginBottom:16 }}>
                  <InputField label="City *" value={formData.city} onChange={e => fd('city', e.target.value)} placeholder="Bengaluru" required />
                  <InputField label="PIN Code *" value={formData.pincode} onChange={e => fd('pincode', e.target.value)} placeholder="560103" maxLength={6} required />
                  <div>
                    <label style={S.label}>State *</label>
                    <select value={formData.state} onChange={e => fd('state', e.target.value)} style={{ ...S.input }}
                    onFocus={e => { e.target.style.borderColor='#C5A059'; }} onBlur={e => { e.target.style.borderColor='#E8DFD5'; }}>
                      {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <InputField label="GSTIN (Optional)" value={formData.gstin} onChange={e => fd('gstin', e.target.value)} placeholder="22AAAAA0000A1Z5" />
                </div>
              </div>

              {/* 2. Delivery Method */}
              <div style={S.card}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24, paddingBottom:20, borderBottom:'1px solid #F4EFEA' }}>
                  <div style={S.stepNum(true)}>2</div>
                  <div>
                    <p style={{ fontFamily:"'Playfair Display', serif", fontSize:18, fontWeight:700, color:'#121212' }}>Delivery Method</p>
                    <p style={{ fontSize:11, color:'#9A8E84', marginTop:2 }}>Choose how fast you want your order</p>
                  </div>
                  <Truck size={18} color="#C5A059" style={{ marginLeft:'auto' }} />
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {[
                    { id:'standard', label:'Standard Delivery', desc:'4–6 business days', price: subtotal >= 999 ? 'FREE' : '₹49' },
                    { id:'express', label:'Express Delivery', desc:'1–2 business days', price:'₹99' },
                  ].map(opt => (
                    <div key={opt.id} onClick={() => setDeliveryMethod(opt.id)} style={{
                      padding:'16px 20px', borderRadius:16, cursor:'pointer',
                      border:`2px solid ${deliveryMethod===opt.id ? '#C5A059' : '#E8DFD5'}`,
                      background: deliveryMethod===opt.id ? 'rgba(197,160,89,0.06)' : '#fff',
                      display:'flex', alignItems:'center', justifyContent:'space-between',
                      transition:'all 0.20s ease'
                    }}>
                      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                        <div style={{ width:18, height:18, borderRadius:'50%', border:`2px solid ${deliveryMethod===opt.id ? '#C5A059' : '#D4C9BA'}`, position:'relative', flexShrink:0 }}>
                          {deliveryMethod===opt.id && <div style={{ position:'absolute', inset:3, borderRadius:'50%', background:'#C5A059' }} />}
                        </div>
                        <div>
                          <p style={{ fontSize:13, fontWeight:700, color:'#121212' }}>{opt.label}</p>
                          <p style={{ fontSize:11, color:'#9A8E84', marginTop:2 }}>{opt.desc}</p>
                        </div>
                      </div>
                      <span style={{ fontSize:13, fontWeight:800, color: opt.price==='FREE' ? '#2D6A4F' : '#121212' }}>{opt.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Payment Method */}
              <div style={S.card}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24, paddingBottom:20, borderBottom:'1px solid #F4EFEA' }}>
                  <div style={S.stepNum(true)}>3</div>
                  <div>
                    <p style={{ fontFamily:"'Playfair Display', serif", fontSize:18, fontWeight:700, color:'#121212' }}>Payment Method</p>
                    <p style={{ fontSize:11, color:'#9A8E84', marginTop:2 }}>100% Encrypted & NPCI Certified Gateway</p>
                  </div>
                  <Lock size={18} color="#C5A059" style={{ marginLeft:'auto' }} />
                </div>

                {/* Payment Tabs with Google Pay Featured */}
                <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:8, marginBottom:24 }}>
                  {[
                    { id:'gpay', label:'Google Pay', customIcon: <GooglePayLogo height={16} variant={paymentMethod==='gpay' ? 'light' : 'dark'} />, badge:'RECOMMENDED' },
                    { id:'upi', label:'UPI Apps', icon:'📱' },
                    { id:'card', label:'Card', icon:'💳' },
                    { id:'netbanking', label:'Net Banking', icon:'🏦' },
                    { id:'cod', label:'COD', icon:'📦' },
                  ].map(p => (
                    <button key={p.id} type="button" onClick={() => setPaymentMethod(p.id)} style={{
                      padding:'14px 6px', borderRadius:16,
                      border:`1.5px solid ${paymentMethod===p.id ? '#121212' : '#E8DFD5'}`,
                      background: paymentMethod===p.id ? '#121212' : '#F7F3EE',
                      color: paymentMethod===p.id ? '#fff' : '#3D3530',
                      fontSize:10, fontWeight:700, cursor:'pointer',
                      display:'flex', flexDirection:'column', alignItems:'center', gap:6,
                      letterSpacing:'0.04em', textTransform:'uppercase',
                      transition:'all 0.20s ease', lineHeight:1.3,
                      position: 'relative'
                    }}>
                      {p.badge && (
                        <span style={{
                          position:'absolute',
                          top:-8,
                          background:'#C5A059',
                          color:'#fff',
                          fontSize:7,
                          fontWeight:800,
                          padding:'2px 6px',
                          borderRadius:8,
                          letterSpacing:'0.06em'
                        }}>
                          {p.badge}
                        </span>
                      )}
                      <span style={{ fontSize:20, minHeight:24, display:'flex', alignItems:'center', justifyContent:'center' }}>
                        {p.customIcon || p.icon}
                      </span>
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>

                {/* GOOGLE PAY GATEWAY INTEGRATION */}
                {paymentMethod === 'gpay' && (
                  <GooglePayGateway
                    total={total}
                    customerData={formData}
                    isProcessing={isProcessing}
                    setIsProcessing={setIsProcessing}
                    showToast={showToast}
                    onPaymentSuccess={(paymentDetails) => {
                      handleOrderCompletion(paymentDetails);
                    }}
                  />
                )}

                {/* Other UPI */}
                {paymentMethod === 'upi' && (
                  <div style={{ padding:16, background:'rgba(197,160,89,0.06)', border:'1.5px solid rgba(197,160,89,0.35)', borderRadius:16 }}>
                    <InputField label="UPI ID (e.g. name@paytm, name@ybl)" value={upiVpa} onChange={e => setUpiVpa(e.target.value)} placeholder="priya@ybl" />
                    <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:10 }}>
                      {['PhonePe','Paytm','BHIM','CRED UPI','Amazon Pay'].map(app => (
                        <span key={app} style={{ padding:'4px 12px', background:'#fff', border:'1px solid #E8DFD5', borderRadius:20, fontSize:10, fontWeight:600, color:'#3D3530' }}>{app}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Card */}
                {paymentMethod === 'card' && (
                  <div style={{ display:'flex', flexDirection:'column', gap:14, padding:16, background:'#F7F3EE', borderRadius:16 }}>
                    <InputField label="Card Number" placeholder="4242 4242 4242 4242" maxLength={19} />
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                      <InputField label="Expiry" placeholder="MM / YY" maxLength={7} />
                      <InputField label="CVV" placeholder="•••" maxLength={3} type="password" />
                    </div>
                    <InputField label="Cardholder Name" placeholder="PRIYA SHARMA" />
                  </div>
                )}

                {/* Net Banking */}
                {paymentMethod === 'netbanking' && (
                  <div style={{ padding:16, background:'#F7F3EE', borderRadius:16 }}>
                    <label style={S.label}>Select Bank</label>
                    <select style={{ ...S.input }} onFocus={e => { e.target.style.borderColor='#C5A059'; }} onBlur={e => { e.target.style.borderColor='#E8DFD5'; }}>
                      {['State Bank of India','HDFC Bank','ICICI Bank','Axis Bank','Kotak Mahindra Bank','Yes Bank'].map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                )}

                {/* COD */}
                {paymentMethod === 'cod' && (
                  <div style={{ padding:16, background:'#F7F3EE', borderRadius:16, display:'flex', gap:10, alignItems:'flex-start' }}>
                    <Info size={14} color="#C5A059" style={{ flexShrink:0, marginTop:1 }} />
                    <p style={{ fontSize:12, color:'#6B635B', lineHeight:1.65, fontWeight:300 }}>
                      Pay in cash when your order arrives. Available for orders up to ₹10,000. Exact change appreciated.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Right: Order Summary ── */}
            <div style={{ position:'sticky', top:100 }}>
              <div style={{ background:'#fff', borderRadius:22, border:'1px solid #E8DFD5', padding:'24px', boxShadow:'0 4px 16px rgba(28,25,23,0.08)' }}>
                <p style={{ fontSize:11, fontWeight:700, color:'#121212', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:18 }}>
                  <Sparkles size={13} color="#C5A059" style={{ marginRight:6, verticalAlign:'middle' }} />
                  Order Summary
                </p>

                {/* Items */}
                <div style={{ maxHeight:200, overflowY:'auto', marginBottom:16, display:'flex', flexDirection:'column', gap:12 }}>
                  {cart.map(({ product, quantity }) => (
                    <div key={product.id} style={{ display:'flex', gap:10, alignItems:'center' }}>
                      <img src={product.images[0]} alt={product.name} style={{ width:46, height:46, borderRadius:10, objectFit:'cover', background:'#F7F3EE', flexShrink:0 }} />
                      <div style={{ flex:1, minWidth:0 }}>
                        <p style={{ fontSize:11, fontWeight:600, color:'#121212', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{product.name}</p>
                        <p style={{ fontSize:10, color:'#9A8E84', marginTop:2 }}>Qty: {quantity}</p>
                      </div>
                      <span style={{ fontSize:12, fontWeight:700, color:'#121212', flexShrink:0 }}>₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop:'1px solid #F4EFEA', paddingTop:16 }}>
                  {[
                    { label:'Subtotal', value:`₹${subtotal.toLocaleString('en-IN')}` },
                    { label:'Discount', value: discount > 0 ? `-₹${discount.toLocaleString('en-IN')}` : '—', color: discount > 0 ? '#2D6A4F' : '#6B635B' },
                    { label:'Delivery', value: deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`, color: deliveryFee === 0 ? '#2D6A4F' : '#6B635B' },
                  ].map(row => (
                    <div key={row.label} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0' }}>
                      <span style={{ fontSize:12, color:'#6B635B' }}>{row.label}</span>
                      <span style={{ fontSize:12, fontWeight:700, color: row.color || '#121212' }}>{row.value}</span>
                    </div>
                  ))}
                  <div style={{ display:'flex', justifyContent:'space-between', paddingTop:14, marginTop:8, borderTop:'1.5px solid #E8DFD5' }}>
                    <span style={{ fontSize:14, fontWeight:800, color:'#121212' }}>Total</span>
                    <div style={{ textAlign:'right' }}>
                      <span style={{ fontFamily:"'Playfair Display', serif", fontSize:22, fontWeight:800, color:'#121212' }}>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  style={{
                    ...S.btn(paymentMethod === 'gpay' ? '#121212' : '#C5A059', '#fff', {
                      width:'100%',
                      marginTop:20,
                      padding:'16px',
                      fontSize:12,
                      boxShadow: paymentMethod === 'gpay' ? '0 8px 24px rgba(0,0,0,0.25)' : '0 8px 24px rgba(197,160,89,0.35)',
                      opacity: isProcessing ? 0.75 : 1,
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'center',
                      gap:8
                    })
                  }}
                  onMouseEnter={e => {
                    if(!isProcessing) {
                      e.currentTarget.style.background = paymentMethod === 'gpay' ? '#333' : '#A8833B';
                      e.currentTarget.style.transform='translateY(-2px)';
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = paymentMethod === 'gpay' ? '#121212' : '#C5A059';
                    e.currentTarget.style.transform='';
                  }}
                >
                  {isProcessing ? '⏳ Processing Order...' : paymentMethod === 'gpay' ? (
                    <>
                      <Lock size={13} /> Pay with <GooglePayLogo height={16} variant="light" /> <ArrowRight size={13} />
                    </>
                  ) : (
                    <>
                      <Lock size={13} /> Place Order <ArrowRight size={13} />
                    </>
                  )}
                </button>

                <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, marginTop:14, fontSize:10, color:'#9A8E84', textAlign:'center', lineHeight:1.5 }}>
                  <ShieldCheck size={13} color="#2D6A4F" /> Google Pay 256-bit encrypted checkout
                </div>

                {appliedCoupon && (
                  <div style={{ marginTop:14, padding:'10px 14px', background:'rgba(45,106,79,0.08)', border:'1px solid rgba(45,106,79,0.25)', borderRadius:12, display:'flex', gap:8 }}>
                    <CheckCircle2 size={14} color="#2D6A4F" style={{ flexShrink:0, marginTop:1 }} />
                    <p style={{ fontSize:11, color:'#2D6A4F', fontWeight:600 }}>Coupon <strong>{appliedCoupon.code}</strong> applied</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
