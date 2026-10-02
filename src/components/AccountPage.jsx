import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Package, Heart, MapPin, Lock, LogOut, ChevronRight, CheckCircle, Truck, FileText, Clock, ShoppingBag, Star } from 'lucide-react';

const S = {
  btn: (bg='#121212', color='#fff', extra={}) => ({
    display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
    padding:'12px 24px', background:bg, color, borderRadius:40,
    fontSize:11, fontWeight:700, letterSpacing:'0.10em', textTransform:'uppercase',
    border:'none', cursor:'pointer', transition:'all 0.22s ease', ...extra
  }),
  input: { width:'100%', padding:'13px 16px', background:'#F7F3EE', border:'1.5px solid #E8DFD5', borderRadius:14, fontFamily:'inherit', fontSize:13, color:'#121212', outline:'none', transition:'border-color 0.2s' },
  label: { display:'block', fontSize:10, fontWeight:700, color:'#121212', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:8 },
  card: { background:'#fff', borderRadius:20, border:'1px solid #E8DFD5', padding:'24px', boxShadow:'0 2px 8px rgba(28,25,23,0.05)' },
};

const InputField = ({ label, ...props }) => (
  <div>
    {label && <label style={S.label}>{label}</label>}
    <input style={S.input} onFocus={e => { e.target.style.borderColor='#C5A059'; e.target.style.background='#fff'; }} onBlur={e => { e.target.style.borderColor='#E8DFD5'; e.target.style.background='#F7F3EE'; }} {...props} />
  </div>
);

const STATUS_COLORS = {
  'Order Placed':  { bg:'rgba(197,160,89,0.12)', color:'#A8833B', border:'rgba(197,160,89,0.35)' },
  'Processing':    { bg:'rgba(59,130,246,0.10)', color:'#3B82F6', border:'rgba(59,130,246,0.25)' },
  'Shipped':       { bg:'rgba(168,83,59,0.10)', color:'#A8533B', border:'rgba(168,83,59,0.25)' },
  'Out for Delivery':{ bg:'rgba(147,51,234,0.10)', color:'#9333EA', border:'rgba(147,51,234,0.25)' },
  'Delivered':     { bg:'rgba(45,106,79,0.12)', color:'#2D6A4F', border:'rgba(45,106,79,0.25)' },
  'Cancelled':     { bg:'rgba(140,45,56,0.10)', color:'#8C2D38', border:'rgba(140,45,56,0.25)' },
};

const StatusChip = ({ status }) => {
  const colors = STATUS_COLORS[status] || STATUS_COLORS['Order Placed'];
  return (
    <span style={{ padding:'4px 12px', borderRadius:20, fontSize:10, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:4, background:colors.bg, color:colors.color, border:`1px solid ${colors.border}` }}>
      {status}
    </span>
  );
};

export const AccountPage = () => {
  const { user, setUser, logoutUser, orders, wishlist, products, navigateTo, showToast, currentView, toggleWishlist } = useApp();
  const [activeTab, setActiveTab] = useState(currentView === 'wishlist' ? 'wishlist' : 'orders');

  const wishedProds = products.filter(p => wishlist.includes(p.id));

  // If user is not logged in and not viewing wishlist
  if (!user?.isLoggedIn && activeTab !== 'wishlist') {
    return (
      <div style={{ background:'#FDFBF7', minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'60px 24px' }}>
        <div style={{ ...S.card, maxWidth:520, width:'100%', textAlign:'center', padding:'48px 36px' }}>
          <div style={{ width:64, height:64, borderRadius:'50%', background:'rgba(197,160,89,0.15)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
            <User size={30} color="#C5A059" />
          </div>
          <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.20em', textTransform:'uppercase', color:'#C5A059' }}>ZIVANA PRIVÉ ACCESS</span>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:26, fontWeight:700, color:'#121212', marginTop:6, marginBottom:10 }}>
            Sign In to Access Your Account
          </h2>
          <p style={{ fontSize:13, color:'#6B635B', lineHeight:1.6, marginBottom:28, fontWeight:300 }}>
            Track your botanical orders, manage saved addresses, redeem Glow Club points, and access private launch masterclasses.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <button onClick={() => navigateTo('login')} style={S.btn('#121212','#fff')}>
              Sign In / Register Now
            </button>
            <button onClick={() => navigateTo('home')} style={S.btn('transparent','#121212', { border:'1.5px solid #E8DFD5' })}>
              Continue Browsing Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  const TABS = [
    { id:'orders', label:'My Orders', icon:Package, badge: orders.length },
    { id:'wishlist', label:'Wishlist', icon:Heart, badge: wishlist.length },
    { id:'profile', label:'Profile', icon:User },
    { id:'addresses', label:'Addresses', icon:MapPin },
    { id:'security', label:'Security', icon:Lock },
  ];

  return (
    <div style={{ background:'#FDFBF7', minHeight:'100vh' }}>
      {/* Page Header */}
      <div style={{ background:'linear-gradient(105deg, #121212 0%, #1A1A0A 100%)', padding:'48px 40px 40px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(197,160,89,0.80)' }}>CUSTOMER PORTAL</span>
          <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(1.8rem, 4vw, 3rem)', fontWeight:800, color:'#fff', marginTop:8, letterSpacing:'-0.02em' }}>
            My ZIVANA Account
          </h1>
          <p style={{ fontSize:12, color:'rgba(232,223,213,0.60)', marginTop:8 }}>Welcome back, <strong style={{ color:'rgba(197,160,89,0.90)' }}>{user?.name || 'Valued Member'}</strong></p>
        </div>
      </div>

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'40px 40px 80px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap:28, alignItems:'flex-start' }}>

          {/* ── Sidebar ── */}
          <aside style={{ ...S.card, display:'flex', flexDirection:'column', gap:4 }}>
            {/* Avatar */}
            <div style={{ textAlign:'center', paddingBottom:20, marginBottom:16, borderBottom:'1px solid #F4EFEA' }}>
              <div style={{ width:56, height:56, borderRadius:'50%', background:'linear-gradient(135deg, #C5A059, #A8833B)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, fontFamily:"'Playfair Display', serif", fontWeight:700, color:'#fff', margin:'0 auto 10px' }}>
                {user?.name?.[0] || 'Z'}
              </div>
              <p style={{ fontSize:13, fontWeight:700, color:'#121212' }}>{user?.name || 'Valued Customer'}</p>
              <p style={{ fontSize:10, color:'#9A8E84', marginTop:2 }}>{user?.email || 'member@zivana.in'}</p>
            </div>

            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
                  padding:'11px 14px', borderRadius:14, fontSize:12, fontWeight:600,
                  border:'none', cursor:'pointer', textAlign:'left',
                  background: isActive ? '#121212' : 'transparent',
                  color: isActive ? '#fff' : '#6B635B',
                  transition:'all 0.18s ease'
                }}
                onMouseEnter={e => { if(!isActive) { e.currentTarget.style.background='#F7F3EE'; e.currentTarget.style.color='#121212'; }}}
                onMouseLeave={e => { if(!isActive) { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#6B635B'; }}}>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <Icon size={15} color={isActive ? '#C5A059' : 'currentColor'} />
                    {tab.label}
                  </div>
                  {tab.badge > 0 && (
                    <span style={{ padding:'2px 8px', borderRadius:20, fontSize:10, fontWeight:800, background: isActive ? '#C5A059' : '#F7F3EE', color: isActive ? '#fff' : '#121212' }}>{tab.badge}</span>
                  )}
                </button>
              );
            })}

            <div style={{ borderTop:'1px solid #F4EFEA', marginTop:8, paddingTop:8 }}>
              <button onClick={() => logoutUser()} style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'11px 14px', borderRadius:14, fontSize:12, fontWeight:600, border:'none', cursor:'pointer', color:'#8C2D38', background:'transparent', transition:'background 0.18s' }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(140,45,56,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; }}>
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <div>
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <div style={{ marginBottom:28 }}>
                  <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.20em', textTransform:'uppercase', color:'#C5A059' }}>ORDER HISTORY</span>
                  <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:24, fontWeight:700, color:'#121212', marginTop:4 }}>My Orders ({orders.length})</h2>
                </div>
                {orders.length === 0 ? (
                  <div style={{ ...S.card, textAlign:'center', padding:'60px 40px' }}>
                    <Package size={40} color="#C5A059" style={{ margin:'0 auto 16px' }} />
                    <p style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:700, color:'#121212', marginBottom:8 }}>No Orders Yet</p>
                    <p style={{ fontSize:12, color:'#6B635B', marginBottom:24 }}>Start shopping to see your orders here.</p>
                    <button onClick={() => navigateTo('shop')} style={S.btn()}>Shop Now</button>
                  </div>
                ) : (
                  <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                    {orders.map(order => (
                      <div key={order.id} style={{ ...S.card, transition:'box-shadow 0.25s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow='0 8px 24px rgba(28,25,23,0.10)'; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow='0 2px 8px rgba(28,25,23,0.05)'; }}>
                        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:16, paddingBottom:16, borderBottom:'1px solid #F4EFEA' }}>
                          <div>
                            <p style={{ fontSize:12, fontWeight:800, color:'#121212', fontFamily:'monospace', letterSpacing:'0.06em' }}>#{order.id}</p>
                            <p style={{ fontSize:11, color:'#9A8E84', marginTop:4 }}>{order.date} · {order.items?.length || 1} item(s)</p>
                          </div>
                          <StatusChip status={order.status} />
                        </div>
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
                          <div style={{ display:'flex', gap:8 }}>
                            {order.items?.slice(0,3).map((item, i) => (
                              <img key={i} src={item.product?.images?.[0] || item.image} alt="" style={{ width:44, height:44, borderRadius:10, objectFit:'cover', border:'1px solid #E8DFD5', background:'#F7F3EE' }} />
                            ))}
                          </div>
                          <div style={{ textAlign:'right' }}>
                            <p style={{ fontFamily:"'Playfair Display', serif", fontSize:18, fontWeight:700, color:'#121212' }}>₹{order.total?.toLocaleString('en-IN')}</p>
                            <p style={{ fontSize:10, color:'#9A8E84', marginTop:2 }}>Order Total</p>
                          </div>
                        </div>
                        {/* Tracking Timeline */}
                        <div style={{ marginTop:16, paddingTop:16, borderTop:'1px solid #F4EFEA' }}>
                          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative' }}>
                            {['Order Placed','Processing','Shipped','Delivered'].map((step, i) => {
                              const statusOrder = ['Order Placed','Processing','Shipped','Out for Delivery','Delivered'];
                              const currentIdx = statusOrder.indexOf(order.status);
                              const stepIdx = statusOrder.indexOf(step);
                              const done = stepIdx <= currentIdx;
                              return (
                                <React.Fragment key={step}>
                                  {i > 0 && <div style={{ flex:1, height:2, background: done ? '#C5A059' : '#E8DFD5', transition:'background 0.3s' }} />}
                                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                                    <div style={{ width:22, height:22, borderRadius:'50%', background: done ? '#C5A059' : '#E8DFD5', border:`2px solid ${done ? '#C5A059' : '#E8DFD5'}`, display:'flex', alignItems:'center', justifyContent:'center', zIndex:1 }}>
                                      {done && <div style={{ width:8, height:8, borderRadius:'50%', background:'#fff' }} />}
                                    </div>
                                    <span style={{ fontSize:9, fontWeight:600, color: done ? '#C5A059' : '#9A8E84', whiteSpace:'nowrap', letterSpacing:'0.04em' }}>{step}</span>
                                  </div>
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div>
                <div style={{ marginBottom:28 }}>
                  <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.20em', textTransform:'uppercase', color:'#C5A059' }}>SAVED ITEMS</span>
                  <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:24, fontWeight:700, color:'#121212', marginTop:4 }}>My Wishlist ({wishlist.length})</h2>
                </div>
                {wishedProds.length === 0 ? (
                  <div style={{ ...S.card, textAlign:'center', padding:'60px 40px' }}>
                    <Heart size={40} color="#C5A059" style={{ margin:'0 auto 16px' }} />
                    <p style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:700, color:'#121212', marginBottom:8 }}>Your Wishlist is Empty</p>
                    <p style={{ fontSize:12, color:'#6B635B', marginBottom:24 }}>Save products you love to revisit them anytime.</p>
                    <button onClick={() => navigateTo('shop')} style={S.btn()}>Explore Products</button>
                  </div>
                ) : (
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:20 }}>
                    {wishedProds.map(product => {
                      const [hovered, setHovered] = useState(false);
                      const { addToCart } = useApp();
                      return (
                        <div key={product.id} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                          style={{ background:'#fff', borderRadius:20, border:`1px solid ${hovered ? 'rgba(197,160,89,0.40)' : '#E8DFD5'}`, overflow:'hidden', boxShadow: hovered ? '0 16px 40px rgba(28,25,23,0.12)' : '0 2px 8px rgba(28,25,23,0.05)', transform: hovered ? 'translateY(-5px)' : 'none', transition:'all 0.35s cubic-bezier(0.16,1,0.3,1)', display:'flex', flexDirection:'column' }}>
                          <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', background:'#F7F3EE', cursor:'pointer' }} onClick={() => navigateTo('product-detail', product)}>
                            <img src={product.images[0]} alt={product.name} style={{ width:'100%', height:'100%', objectFit:'cover', transform: hovered ? 'scale(1.07)' : 'scale(1)', transition:'transform 0.6s ease' }} />
                            <button onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }} style={{ position:'absolute', top:10, right:10, width:34, height:34, borderRadius:'50%', background:'#8C2D38', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                              <Heart size={14} color="#fff" fill="#fff" />
                            </button>
                          </div>
                          <div style={{ padding:'14px 16px', flex:1, display:'flex', flexDirection:'column', gap:10 }}>
                            <h4 onClick={() => navigateTo('product-detail', product)} style={{ fontFamily:"'Playfair Display', serif", fontSize:13, fontWeight:600, color: hovered ? '#C5A059' : '#121212', cursor:'pointer', transition:'color 0.2s', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{product.name}</h4>
                            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:10, borderTop:'1px solid #F4EFEA' }}>
                              <span style={{ fontSize:16, fontWeight:800, color:'#121212' }}>₹{product.price.toLocaleString('en-IN')}</span>
                              <button onClick={() => addToCart(product)} style={{ display:'flex', alignItems:'center', gap:5, padding:'8px 14px', background: hovered ? '#C5A059' : '#121212', color:'#fff', borderRadius:30, fontSize:10, fontWeight:700, border:'none', cursor:'pointer', transition:'background 0.2s', letterSpacing:'0.06em' }}>
                                <ShoppingBag size={12} /> Add
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div style={S.card}>
                <div style={{ marginBottom:24, paddingBottom:20, borderBottom:'1px solid #F4EFEA' }}>
                  <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.20em', textTransform:'uppercase', color:'#C5A059' }}>PERSONAL DETAILS</span>
                  <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:22, fontWeight:700, color:'#121212', marginTop:4 }}>Profile Information</h2>
                </div>
                <form onSubmit={e => { e.preventDefault(); showToast('Profile updated successfully!'); }} style={{ display:'flex', flexDirection:'column', gap:18 }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
                    <InputField label="Full Name" defaultValue={user.name} />
                    <InputField label="Mobile Number" defaultValue={user.phone || '+91 98765 43210'} />
                    <InputField label="Email Address" type="email" defaultValue={user.email} />
                    <InputField label="Date of Birth" type="date" defaultValue="1995-03-15" />
                  </div>
                  <div>
                    <label style={S.label}>Gender</label>
                    <div style={{ display:'flex', gap:12 }}>
                      {['Female', 'Male', 'Non-binary', 'Prefer not to say'].map(g => (
                        <label key={g} style={{ display:'flex', alignItems:'center', gap:7, fontSize:12, color:'#3D3530', cursor:'pointer', fontWeight:500 }}>
                          <input type="radio" name="gender" defaultChecked={g==='Female'} style={{ accentColor:'#C5A059' }} /> {g}
                        </label>
                      ))}
                    </div>
                  </div>
                  <button type="submit" style={{ ...S.btn('#C5A059','#fff',{ alignSelf:'flex-start', boxShadow:'0 6px 20px rgba(197,160,89,0.30)' }) }}
                  onMouseEnter={e => { e.currentTarget.style.background='#A8833B'; }} onMouseLeave={e => { e.currentTarget.style.background='#C5A059'; }}>
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div>
                <div style={{ marginBottom:24 }}>
                  <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.20em', textTransform:'uppercase', color:'#C5A059' }}>SAVED LOCATIONS</span>
                  <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:22, fontWeight:700, color:'#121212', marginTop:4 }}>My Addresses</h2>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                  {(user.addresses || [{ type:'Home', street:'42 MG Road, Indiranagar', city:'Bengaluru', state:'Karnataka', pincode:'560038' }]).map((addr, i) => (
                    <div key={i} style={{ ...S.card, display:'flex', gap:16, alignItems:'flex-start' }}>
                      <div style={{ width:40, height:40, borderRadius:'50%', background:'#F7F1E5', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <MapPin size={18} color="#C5A059" />
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:6 }}>
                          <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.10em', textTransform:'uppercase', padding:'3px 10px', background:'#121212', color:'#fff', borderRadius:20 }}>{addr.type || 'Home'}</span>
                          {i === 0 && <span style={{ fontSize:9, fontWeight:700, color:'#2D6A4F', background:'rgba(45,106,79,0.10)', padding:'2px 8px', borderRadius:20, border:'1px solid rgba(45,106,79,0.25)' }}>DEFAULT</span>}
                        </div>
                        <p style={{ fontSize:13, color:'#3D3530', lineHeight:1.65, fontWeight:300 }}>
                          {addr.street}, {addr.city}, {addr.state} — {addr.pincode}
                        </p>
                      </div>
                      <button style={{ fontSize:11, fontWeight:700, color:'#C5A059', cursor:'pointer', border:'none', background:'none', letterSpacing:'0.06em', textTransform:'uppercase' }}>Edit</button>
                    </div>
                  ))}
                  <button style={{ ...S.btn('transparent','#121212',{ border:'1.5px solid #E8DFD5', alignSelf:'flex-start' }) }}
                  onMouseEnter={e => { e.currentTarget.style.background='#F7F3EE'; }} onMouseLeave={e => { e.currentTarget.style.background='transparent'; }}>
                    + Add New Address
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div style={S.card}>
                <div style={{ marginBottom:24, paddingBottom:20, borderBottom:'1px solid #F4EFEA' }}>
                  <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.20em', textTransform:'uppercase', color:'#C5A059' }}>ACCOUNT SECURITY</span>
                  <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:22, fontWeight:700, color:'#121212', marginTop:4 }}>Password & Security</h2>
                </div>
                <form onSubmit={e => { e.preventDefault(); showToast('Password updated successfully!'); }} style={{ display:'flex', flexDirection:'column', gap:18, maxWidth:440 }}>
                  <InputField label="Current Password" type="password" placeholder="••••••••" />
                  <InputField label="New Password" type="password" placeholder="Min. 8 characters" />
                  <InputField label="Confirm New Password" type="password" placeholder="Must match new password" />
                  <div style={{ padding:'14px 16px', background:'rgba(197,160,89,0.06)', border:'1px solid rgba(197,160,89,0.25)', borderRadius:14 }}>
                    <p style={{ fontSize:11, fontWeight:700, color:'#121212', marginBottom:8 }}>Password Requirements</p>
                    {['Minimum 8 characters','At least one uppercase letter','At least one number or special character'].map(r => (
                      <p key={r} style={{ fontSize:11, color:'#6B635B', display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
                        <CheckCircle size={12} color="#C5A059" /> {r}
                      </p>
                    ))}
                  </div>
                  <button type="submit" style={{ ...S.btn('#121212','#fff',{ alignSelf:'flex-start' }) }}
                  onMouseEnter={e => { e.currentTarget.style.background='#C5A059'; }} onMouseLeave={e => { e.currentTarget.style.background='#121212'; }}>
                    Update Password
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
