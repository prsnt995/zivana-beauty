import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RotateCcw, ChevronLeft, Plus, Minus, Sparkles, Share2 } from 'lucide-react';

const S = {
  btn: (bg='#121212', color='#fff', extra={}) => ({
    display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
    padding:'14px 28px', background:bg, color, borderRadius:40,
    fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase',
    border:'none', cursor:'pointer', transition:'all 0.22s ease', ...extra
  }),
  eyebrow: { fontSize:10, fontWeight:700, letterSpacing:'0.25em', textTransform:'uppercase', color:'#C5A059' },
  label: { display:'block', fontSize:10, fontWeight:700, color:'#121212', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:8 },
};

export const ProductDetailPage = () => {
  const { selectedProduct, addToCart, wishlist, toggleWishlist, navigateTo, products } = useApp();
  const product = selectedProduct;

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [activeTab, setActiveTab] = useState('description');

  if (!product) return (
    <div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#FDFBF7' }}>
      <div style={{ textAlign:'center' }}>
        <p style={{ fontSize:18, color:'#6B635B', marginBottom:20 }}>Product not found.</p>
        <button onClick={() => navigateTo('shop')} style={S.btn()}>Browse All Products</button>
      </div>
    </div>
  );

  const isWished = wishlist.includes(product.id);
  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  const tabs = [
    { id:'description', label:'Description' },
    { id:'ingredients', label:'Ingredients' },
    { id:'howToUse', label:'How to Use' },
    { id:'reviews', label:`Reviews (${product.reviewsCount})` },
  ];

  return (
    <div style={{ background:'#FDFBF7', minHeight:'100vh' }}>
      {/* Breadcrumb */}
      <div style={{ background:'#fff', borderBottom:'1px solid #E8DFD5', padding:'14px 40px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', alignItems:'center', gap:10 }}>
          <button onClick={() => navigateTo('home')} style={{ fontSize:11, color:'#9A8E84', cursor:'pointer', border:'none', background:'none', fontFamily:'inherit' }}
          onMouseEnter={e => { e.target.style.color='#C5A059'; }} onMouseLeave={e => { e.target.style.color='#9A8E84'; }}>Home</button>
          <span style={{ color:'#D4C9BA' }}>›</span>
          <button onClick={() => navigateTo('shop')} style={{ fontSize:11, color:'#9A8E84', cursor:'pointer', border:'none', background:'none', fontFamily:'inherit' }}
          onMouseEnter={e => { e.target.style.color='#C5A059'; }} onMouseLeave={e => { e.target.style.color='#9A8E84'; }}>{product.category}</button>
          <span style={{ color:'#D4C9BA' }}>›</span>
          <span style={{ fontSize:11, color:'#3D3530', fontWeight:600 }}>{product.name}</span>
        </div>
      </div>

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'48px 40px 80px' }}>
        {/* Back button */}
        <button onClick={() => navigateTo('shop')} style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:'#6B635B', cursor:'pointer', border:'none', background:'none', fontFamily:'inherit', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:36, transition:'color 0.18s' }}
        onMouseEnter={e => { e.currentTarget.style.color='#C5A059'; }} onMouseLeave={e => { e.currentTarget.style.color='#6B635B'; }}>
          <ChevronLeft size={15} /> Back to Shop
        </button>

        {/* Main grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'flex-start' }}>
          {/* ── Left: Images ── */}
          <div>
            {/* Main Image */}
            <div style={{ position:'relative', aspectRatio:'1/1', borderRadius:24, overflow:'hidden', background:'#F7F3EE', border:'1px solid #E8DFD5', boxShadow:'0 8px 32px rgba(28,25,23,0.08)', marginBottom:14 }}>
              <img src={product.images[activeImg] || product.images[0]} alt={product.name}
                style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', transition:'transform 0.45s ease', cursor:'zoom-in' }}
                onMouseEnter={e => { e.target.style.transform='scale(1.04)'; }}
                onMouseLeave={e => { e.target.style.transform='scale(1)'; }} />
              {product.isLimited && (
                <div style={{ position:'absolute', top:16, left:16, padding:'5px 14px', background:'#8C2D38', color:'#fff', fontSize:9, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', borderRadius:20 }}>LIMITED EDITION</div>
              )}
            </div>
            {/* Thumbnails */}
            <div style={{ display:'flex', gap:10 }}>
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} style={{
                  width:72, height:72, borderRadius:12, overflow:'hidden',
                  border:`2px solid ${activeImg===i ? '#C5A059' : '#E8DFD5'}`,
                  cursor:'pointer', transition:'border-color 0.18s',
                  background:'#F7F3EE', flexShrink:0,
                  transform: activeImg===i ? 'scale(0.94)' : 'scale(1)',
                  boxShadow: activeImg===i ? '0 4px 12px rgba(197,160,89,0.30)' : 'none'
                }}>
                  <img src={img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Info ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            {/* Brand + Category */}
            <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
              <span style={S.eyebrow}>{product.brand}</span>
              <span style={{ color:'#D4C9BA' }}>·</span>
              <span style={{ fontSize:10, fontWeight:600, color:'#9A8E84', letterSpacing:'0.12em', textTransform:'uppercase' }}>{product.category}</span>
            </div>

            {/* Name */}
            <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(1.6rem, 3vw, 2.4rem)', fontWeight:800, color:'#121212', lineHeight:1.15, letterSpacing:'-0.015em' }}>
              {product.name}
            </h1>

            {/* Rating row */}
            <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
              <div style={{ display:'flex', alignItems:'center', gap:4, background:'#F7F1E5', padding:'5px 12px', borderRadius:20 }}>
                {Array.from({ length:5 }).map((_,j) => (
                  <Star key={j} size={13} color="#C5A059" fill={j < Math.floor(product.rating) ? "#C5A059" : "none"} />
                ))}
                <span style={{ fontSize:12, fontWeight:800, color:'#121212', marginLeft:4 }}>{product.rating}</span>
              </div>
              <span style={{ fontSize:11, color:'#9A8E84' }}>{product.reviewsCount} verified reviews</span>
              {product.isBestSeller && <span style={{ padding:'3px 10px', background:'#121212', color:'#fff', fontSize:9, fontWeight:800, letterSpacing:'0.08em', textTransform:'uppercase', borderRadius:20 }}>BEST SELLER</span>}
            </div>

            {/* Price */}
            <div style={{ display:'flex', alignItems:'baseline', gap:12, paddingBottom:20, borderBottom:'1px solid #F4EFEA' }}>
              <span style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(1.6rem, 3vw, 2.2rem)', fontWeight:800, color:'#121212' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize:14, color:'#9A8E84', textDecoration:'line-through' }}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
              {product.discountPercent > 0 && (
                <span style={{ fontSize:12, fontWeight:700, color:'#fff', background:'#8C2D38', padding:'3px 10px', borderRadius:20 }}>Save {product.discountPercent}%</span>
              )}
            </div>

            {/* Variants */}
            {product.variants?.map(variant => (
              <div key={variant.name}>
                <p style={S.label}>{variant.name}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {variant.options.map(opt => (
                    <button key={opt} onClick={() => setSelectedVariants(prev => ({ ...prev, [variant.name]: opt }))} style={{
                      padding:'7px 16px', borderRadius:30, fontSize:11, fontWeight:600, cursor:'pointer',
                      background: selectedVariants[variant.name]===opt ? '#121212' : '#fff',
                      color: selectedVariants[variant.name]===opt ? '#fff' : '#3D3530',
                      border: `1.5px solid ${selectedVariants[variant.name]===opt ? '#121212' : '#E8DFD5'}`,
                      transition:'all 0.18s'
                    }}>{opt}</button>
                  ))}
                </div>
              </div>
            ))}

            {/* Qty + Add to Cart */}
            <div style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap' }}>
              {/* Qty */}
              <div style={{ display:'flex', alignItems:'center', border:'1.5px solid #E8DFD5', borderRadius:40, overflow:'hidden', background:'#F7F3EE' }}>
                <button onClick={() => setQty(q => Math.max(1, q-1))} style={{ width:40, height:44, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', border:'none', background:'none', color:'#3D3530', transition:'color 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color='#C5A059'; }} onMouseLeave={e => { e.currentTarget.style.color='#3D3530'; }}>
                  <Minus size={14} />
                </button>
                <span style={{ width:40, textAlign:'center', fontSize:14, fontWeight:800, color:'#121212' }}>{qty}</span>
                <button onClick={() => setQty(q => q+1)} style={{ width:40, height:44, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', border:'none', background:'none', color:'#3D3530', transition:'color 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color='#C5A059'; }} onMouseLeave={e => { e.currentTarget.style.color='#3D3530'; }}>
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to cart */}
              <button onClick={() => { for(let i=0; i<qty; i++) addToCart(product); }} style={{ ...S.btn('#C5A059', '#fff', { flex:1, minWidth:160, padding:'14px 24px', boxShadow:'0 8px 24px rgba(197,160,89,0.35)' }) }}
              onMouseEnter={e => { e.currentTarget.style.background='#A8833B'; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='#C5A059'; e.currentTarget.style.transform=''; }}>
                <ShoppingBag size={15} /> Add to Cart
              </button>

              {/* Wishlist */}
              <button onClick={() => toggleWishlist(product.id)} style={{
                width:48, height:48, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                background: isWished ? '#8C2D38' : '#fff',
                border:`1.5px solid ${isWished ? '#8C2D38' : '#E8DFD5'}`,
                color: isWished ? '#fff' : '#3D3530', cursor:'pointer',
                transition:'all 0.20s ease', boxShadow:'0 2px 8px rgba(28,25,23,0.06)'
              }}
              onMouseEnter={e => { if(!isWished) { e.currentTarget.style.borderColor='#C5A059'; e.currentTarget.style.color='#C5A059'; }}}
              onMouseLeave={e => { if(!isWished) { e.currentTarget.style.borderColor='#E8DFD5'; e.currentTarget.style.color='#3D3530'; }}}>
                <Heart size={18} fill={isWished ? '#fff' : 'none'} />
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {[
                { icon: Truck, text:'Free delivery above ₹999' },
                { icon: ShieldCheck, text:'100% authentic guarantee' },
                { icon: RotateCcw, text:'30-day easy returns' },
                { icon: Sparkles, text:'Cruelty-free & vegan' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 12px', background:'#fff', border:'1px solid #E8DFD5', borderRadius:14, boxShadow:'0 1px 4px rgba(28,25,23,0.04)' }}>
                  <Icon size={14} color="#C5A059" style={{ flexShrink:0 }} />
                  <span style={{ fontSize:11, color:'#3D3530', fontWeight:500, lineHeight:1.4 }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {product.tags.map(tag => (
                  <span key={tag} style={{ padding:'4px 12px', background:'#F7F3EE', border:'1px solid #E8DFD5', borderRadius:20, fontSize:10, fontWeight:600, color:'#6B635B' }}>#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Tabs Section ── */}
        <div style={{ marginTop:64 }}>
          <div style={{ display:'flex', gap:8, marginBottom:28, borderBottom:'1px solid #E8DFD5', paddingBottom:0 }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                padding:'10px 22px', borderRadius:'12px 12px 0 0',
                fontSize:11, fontWeight:700, cursor:'pointer', border:'none', letterSpacing:'0.06em',
                background: activeTab===tab.id ? '#121212' : 'transparent',
                color: activeTab===tab.id ? '#fff' : '#6B635B',
                borderBottom: activeTab===tab.id ? '2px solid #121212' : '2px solid transparent',
                transition:'all 0.20s ease'
              }}>{tab.label}</button>
            ))}
          </div>

          <div style={{ background:'#fff', borderRadius:20, border:'1px solid #E8DFD5', padding:'32px', boxShadow:'0 2px 8px rgba(28,25,23,0.05)' }}>
            {activeTab === 'description' && (
              <div style={{ fontSize:13, color:'#3D3530', lineHeight:1.85, fontWeight:300 }}>
                <p>{product.description || product.shortDesc}</p>
                {product.benefits?.length > 0 && (
                  <div style={{ marginTop:20 }}>
                    <p style={{ fontSize:12, fontWeight:700, color:'#121212', marginBottom:12 }}>Key Benefits</p>
                    <ul style={{ paddingLeft:0, listStyle:'none', display:'flex', flexDirection:'column', gap:8 }}>
                      {product.benefits.map((b, i) => (
                        <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                          <span style={{ color:'#C5A059', fontWeight:700, flexShrink:0 }}>✦</span>
                          <span style={{ fontSize:13, color:'#3D3530' }}>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {activeTab === 'ingredients' && (
              <div>
                <p style={{ fontSize:12, fontWeight:700, color:'#121212', marginBottom:12 }}>Full Ingredients List</p>
                <p style={{ fontSize:13, color:'#3D3530', lineHeight:1.85, fontWeight:300 }}>{product.ingredients || 'Aqua, Niacinamide, Kashmiri Saffron Extract, Rosehip Oil, Bakuchiol, Hyaluronic Acid, Vitamin C, Aloe Vera, Peptides.'}</p>
              </div>
            )}
            {activeTab === 'howToUse' && (
              <div style={{ fontSize:13, color:'#3D3530', lineHeight:1.85, fontWeight:300 }}>
                <p>{product.howToUse || 'Apply a small amount to clean, dry skin. Gently massage in upward circular motions until fully absorbed. Use morning and evening for best results.'}</p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:20, padding:'20px', background:'#F7F3EE', borderRadius:16, marginBottom:24 }}>
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontFamily:"'Playfair Display', serif", fontSize:48, fontWeight:800, color:'#121212', lineHeight:1 }}>{product.rating}</div>
                    <div style={{ display:'flex', justifyContent:'center', gap:2, margin:'6px 0' }}>
                      {Array.from({ length:5 }).map((_,j) => <Star key={j} size={14} color="#C5A059" fill={j < Math.floor(product.rating) ? "#C5A059" : "none"} />)}
                    </div>
                    <div style={{ fontSize:11, color:'#6B635B' }}>{product.reviewsCount} reviews</div>
                  </div>
                  <div style={{ flex:1 }}>
                    {[5,4,3,2,1].map(star => {
                      const pct = star === 5 ? 78 : star === 4 ? 16 : star === 3 ? 4 : star === 2 ? 1 : 1;
                      return (
                        <div key={star} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                          <span style={{ fontSize:11, fontWeight:600, color:'#6B635B', width:8 }}>{star}</span>
                          <Star size={11} color="#C5A059" fill="#C5A059" />
                          <div style={{ flex:1, height:6, background:'#E8DFD5', borderRadius:10, overflow:'hidden' }}>
                            <div style={{ width:`${pct}%`, height:'100%', background:'linear-gradient(90deg, #C5A059, #A8833B)', borderRadius:10 }} />
                          </div>
                          <span style={{ fontSize:11, color:'#9A8E84', width:28 }}>{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <p style={{ fontSize:12, color:'#6B635B', textAlign:'center' }}>Detailed reviews available on product pages with verified purchases.</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div style={{ marginTop:80 }}>
            <div style={{ marginBottom:36 }}>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.25em', textTransform:'uppercase', color:'#C5A059' }}>You May Also Like</span>
              <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(1.5rem, 3vw, 2rem)', fontWeight:700, color:'#121212', marginTop:8 }}>Related Products</h2>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:20 }}>
              {related.map(p => {
                const [h, setH] = useState(false);
                const { addToCart: a, wishlist: w, toggleWishlist: tw } = useApp();
                return (
                  <div key={p.id} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                    style={{ background:'#fff', borderRadius:18, border:`1px solid ${h?'rgba(197,160,89,0.35)':'#E8DFD5'}`, overflow:'hidden', boxShadow: h ? '0 16px 40px rgba(28,25,23,0.12)' : '0 2px 8px rgba(28,25,23,0.05)', transform: h ? 'translateY(-5px)' : 'none', transition:'all 0.35s cubic-bezier(0.16,1,0.3,1)' }}>
                    <div style={{ aspectRatio:'1/1', overflow:'hidden', background:'#F7F3EE', cursor:'pointer' }} onClick={() => navigateTo('product-detail', p)}>
                      <img src={p.images[0]} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover', transform: h ? 'scale(1.07)' : 'scale(1)', transition:'transform 0.6s ease' }} />
                    </div>
                    <div style={{ padding:'14px 16px' }}>
                      <h4 onClick={() => navigateTo('product-detail', p)} style={{ fontFamily:"'Playfair Display', serif", fontSize:13, fontWeight:600, color: h ? '#C5A059' : '#121212', cursor:'pointer', transition:'color 0.2s', marginBottom:8, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{p.name}</h4>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                        <span style={{ fontSize:15, fontWeight:800, color:'#121212' }}>₹{p.price.toLocaleString('en-IN')}</span>
                        <button onClick={() => a(p)} style={{ width:34, height:34, borderRadius:'50%', background: h ? '#C5A059' : '#121212', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', border:'none', transition:'background 0.2s' }}>
                          <ShoppingBag size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
