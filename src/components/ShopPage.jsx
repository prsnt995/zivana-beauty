import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Star, Heart, ShoppingBag, SlidersHorizontal, X, Filter, Eye } from 'lucide-react';

/* ─── Reusable inline-style helpers ─── */
const S = {
  btn: (bg='#121212', color='#fff', extra={}) => ({
    display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6,
    padding:'10px 22px', background:bg, color, borderRadius:40,
    fontSize:11, fontWeight:700, letterSpacing:'0.10em', textTransform:'uppercase',
    border:'none', cursor:'pointer', transition:'all 0.20s ease', ...extra
  }),
  card: { background:'#fff', borderRadius:20, border:'1px solid #E8DFD5', overflow:'hidden',
    boxShadow:'0 2px 8px rgba(28,25,23,0.05)', transition:'all 0.35s cubic-bezier(0.16,1,0.3,1)' },
  input: { width:'100%', padding:'12px 16px', background:'#F7F3EE', border:'1.5px solid #E8DFD5',
    borderRadius:14, fontFamily:'inherit', fontSize:12, color:'#121212',
    outline:'none', transition:'border-color 0.2s' },
  label: { display:'block', fontSize:10, fontWeight:700, color:'#121212', letterSpacing:'0.06em',
    textTransform:'uppercase', marginBottom:8 },
  eyebrow: { fontSize:10, fontWeight:700, letterSpacing:'0.25em', textTransform:'uppercase', color:'#C5A059' },
};

const ProductCard = ({ product }) => {
  const { navigateTo, addToCart, wishlist, toggleWishlist } = useApp();
  const isWished = wishlist.includes(product.id);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ ...S.card,
        transform: hovered ? 'translateY(-5px)' : 'none',
        boxShadow: hovered ? '0 20px 44px rgba(28,25,23,0.13)' : '0 2px 8px rgba(28,25,23,0.05)',
        borderColor: hovered ? 'rgba(197,160,89,0.40)' : '#E8DFD5',
        display:'flex', flexDirection:'column'
      }}>
      {/* Image */}
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', background:'#F7F3EE' }}>
        <img src={product.images[0]} alt={product.name} style={{
          width:'100%', height:'100%', objectFit:'cover',
          transform: hovered ? 'scale(1.07)' : 'scale(1)',
          transition:'transform 0.6s cubic-bezier(0.16,1,0.3,1)'
        }} />
        {/* Badges */}
        <div style={{ position:'absolute', top:12, left:12, display:'flex', flexDirection:'column', gap:5, zIndex:2 }}>
          {product.isBestSeller && <span style={{ padding:'3px 10px', background:'#121212', color:'#fff', fontSize:9, fontWeight:800, letterSpacing:'0.10em', textTransform:'uppercase', borderRadius:20 }}>BEST SELLER</span>}
          {product.discountPercent > 0 && <span style={{ padding:'3px 10px', background:'#8C2D38', color:'#fff', fontSize:9, fontWeight:800, letterSpacing:'0.10em', textTransform:'uppercase', borderRadius:20 }}>-{product.discountPercent}%</span>}
          {product.isNewArrival && <span style={{ padding:'3px 10px', background:'#C5A059', color:'#fff', fontSize:9, fontWeight:800, letterSpacing:'0.10em', textTransform:'uppercase', borderRadius:20 }}>NEW</span>}
        </div>
        {/* Wishlist */}
        <button onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }} style={{
          position:'absolute', top:10, right:10, zIndex:3, width:36, height:36,
          borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
          background: isWished ? '#8C2D38' : 'rgba(255,255,255,0.88)',
          border:`1px solid ${isWished ? '#8C2D38' : 'rgba(255,255,255,0.60)'}`,
          backdropFilter:'blur(8px)', cursor:'pointer', transition:'all 0.18s ease'
        }}>
          <Heart size={14} color={isWished ? '#fff' : '#3D3530'} fill={isWished ? '#fff' : 'none'} />
        </button>
        {/* Quick View */}
        {hovered && (
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(18,18,18,0.18)' }}>
            <button onClick={() => navigateTo('product-detail', product)} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 18px', background:'#fff', color:'#121212', borderRadius:30, fontSize:10, fontWeight:700, boxShadow:'0 4px 16px rgba(18,18,18,0.18)', cursor:'pointer', border:'none', letterSpacing:'0.06em' }}>
              <Eye size={12} /> Quick View
            </button>
          </div>
        )}
      </div>
      {/* Body */}
      <div style={{ padding:'16px 18px', flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
            <span style={{ ...S.eyebrow, fontSize:9 }}>{product.category}</span>
            <div style={{ display:'flex', alignItems:'center', gap:3, background:'#F7F1E5', padding:'2px 8px', borderRadius:20 }}>
              <Star size={11} color="#C5A059" fill="#C5A059" />
              <span style={{ fontSize:11, fontWeight:700, color:'#121212' }}>{product.rating}</span>
              <span style={{ fontSize:10, color:'#9A8E84' }}>({product.reviewsCount})</span>
            </div>
          </div>
          <h3 onClick={() => navigateTo('product-detail', product)} style={{
            fontFamily:"'Playfair Display', serif", fontSize:14, fontWeight:600,
            color: hovered ? '#C5A059' : '#121212', lineHeight:1.35, cursor:'pointer',
            transition:'color 0.2s', display:'-webkit-box', WebkitLineClamp:2,
            WebkitBoxOrient:'vertical', overflow:'hidden'
          }}>{product.name}</h3>
        </div>
        {/* Price & CTA */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:14, paddingTop:12, borderTop:'1px solid #F4EFEA' }}>
          <div>
            <div style={{ display:'flex', alignItems:'baseline', gap:6 }}>
              <span style={{ fontSize:16, fontWeight:800, color:'#121212' }}>₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && <span style={{ fontSize:11, color:'#9A8E84', textDecoration:'line-through' }}>₹{product.originalPrice.toLocaleString('en-IN')}</span>}
            </div>
          </div>
          <button onClick={() => addToCart(product)} style={{
            ...S.btn(hovered ? '#C5A059' : '#121212', '#fff', { padding:'9px 14px', fontSize:10 })
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#C5A059'; }}
          onMouseLeave={e => { e.currentTarget.style.background = hovered ? '#C5A059' : '#121212'; }}>
            <ShoppingBag size={13} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export const ShopPage = () => {
  const { products, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, wishlist } = useApp();
  const [priceRange, setPriceRange] = useState(10000);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [filterOpen, setFilterOpen] = useState(false);

  const CATS = ['All','Skincare','Makeup','Haircare','Body Care','Fragrance'];

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      const catMatch = selectedCategory === 'All' || p.category === selectedCategory || (selectedCategory === 'New' && p.isNewArrival) || (selectedCategory === 'Offers' && p.discountPercent > 0);
      const searchMatch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const priceMatch = p.price <= priceRange;
      const ratingMatch = p.rating >= minRating;
      const stockMatch = !inStockOnly || p.stock > 0;
      return catMatch && searchMatch && priceMatch && ratingMatch && stockMatch;
    });
    if (sortBy === 'newest') list = [...list].sort((a,b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    else if (sortBy === 'price-low') list = [...list].sort((a,b) => a.price - b.price);
    else if (sortBy === 'price-high') list = [...list].sort((a,b) => b.price - a.price);
    else if (sortBy === 'rating') list = [...list].sort((a,b) => b.rating - a.rating);
    else list = [...list].sort((a,b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    return list;
  }, [products, selectedCategory, searchQuery, priceRange, minRating, inStockOnly, sortBy]);

  const FilterSidebar = () => (
    <aside style={{ width: 240, flexShrink:0, display:'flex', flexDirection:'column', gap:0 }}>
      <div style={{ background:'#fff', borderRadius:20, border:'1px solid #E8DFD5', padding:'24px', boxShadow:'0 2px 8px rgba(28,25,23,0.05)' }}>
        {/* Category */}
        <div style={{ marginBottom:24 }}>
          <p style={S.label}>Category</p>
          {CATS.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              width:'100%', padding:'9px 12px', borderRadius:12,
              fontSize:12, fontWeight:600, textAlign:'left', cursor:'pointer', border:'none',
              background: selectedCategory===cat ? '#121212' : 'transparent',
              color: selectedCategory===cat ? '#fff' : '#6B635B',
              marginBottom:3, transition:'all 0.18s ease'
            }}
            onMouseEnter={e => { if(selectedCategory!==cat) { e.currentTarget.style.background='#F7F3EE'; e.currentTarget.style.color='#121212'; }}}
            onMouseLeave={e => { if(selectedCategory!==cat) { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#6B635B'; }}}>
              {cat}
              {selectedCategory===cat && <span style={{ color:'#C5A059', fontSize:14 }}>✓</span>}
            </button>
          ))}
        </div>

        {/* Price Range */}
        <div style={{ borderTop:'1px solid #F4EFEA', paddingTop:20, marginBottom:24 }}>
          <p style={S.label}>Max Price</p>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
            <span style={{ fontSize:11, color:'#6B635B' }}>₹100</span>
            <span style={{ fontSize:13, fontWeight:700, color:'#121212' }}>₹{priceRange.toLocaleString('en-IN')}</span>
          </div>
          <input type="range" min={100} max={10000} step={100} value={priceRange}
            onChange={e => setPriceRange(Number(e.target.value))}
            style={{ width:'100%', accentColor:'#C5A059' }} />
        </div>

        {/* Min Rating */}
        <div style={{ borderTop:'1px solid #F4EFEA', paddingTop:20, marginBottom:24 }}>
          <p style={S.label}>Min Rating</p>
          <div style={{ display:'flex', gap:6 }}>
            {[0,3,4,4.5].map(r => (
              <button key={r} onClick={() => setMinRating(r)} style={{
                padding:'5px 10px', borderRadius:20, fontSize:10, fontWeight:700, cursor:'pointer',
                background: minRating===r ? '#121212' : '#F7F3EE',
                color: minRating===r ? '#fff' : '#6B635B',
                border: minRating===r ? '1px solid #121212' : '1px solid #E8DFD5',
                transition:'all 0.18s'
              }}>{r === 0 ? 'All' : `${r}★`}</button>
            ))}
          </div>
        </div>

        {/* In Stock */}
        <div style={{ borderTop:'1px solid #F4EFEA', paddingTop:20 }}>
          <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', fontSize:12, fontWeight:600, color:'#121212' }}>
            <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)}
              style={{ accentColor:'#C5A059', width:16, height:16 }} />
            In Stock Only
          </label>
        </div>

        {/* Reset */}
        <button onClick={() => { setSelectedCategory('All'); setPriceRange(10000); setMinRating(0); setInStockOnly(false); setSearchQuery(''); }}
          style={{ ...S.btn('transparent','#6B635B',{ border:'1px solid #E8DFD5', marginTop:20, width:'100%', padding:'10px', fontSize:10 }) }}
          onMouseEnter={e => { e.currentTarget.style.background='#F7F3EE'; e.currentTarget.style.color='#121212'; }}
          onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#6B635B'; }}>
          Reset Filters
        </button>
      </div>
    </aside>
  );

  return (
    <div style={{ background:'#FDFBF7', minHeight:'100vh' }}>
      {/* Page Header */}
      <div style={{ background:'linear-gradient(105deg, #121212 0%, #1A1A0A 100%)', padding:'56px 40px 48px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <span style={{ ...S.eyebrow, color:'rgba(197,160,89,0.80)' }}>ZIVANA Collection</span>
          <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:800, color:'#fff', marginTop:8, letterSpacing:'-0.02em' }}>
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h1>
          {/* Search bar */}
          <div style={{ position:'relative', maxWidth:500, marginTop:24 }}>
            <Search size={16} style={{ position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', color:'rgba(232,223,213,0.55)' }} />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products, ingredients, collections..."
              style={{ ...S.input, paddingLeft:44, background:'rgba(255,255,255,0.08)', border:'1.5px solid rgba(255,255,255,0.18)', color:'#fff', borderRadius:40 }}
              onFocus={e => { e.target.style.borderColor='#C5A059'; e.target.style.background='rgba(255,255,255,0.13)'; }}
              onBlur={e => { e.target.style.borderColor='rgba(255,255,255,0.18)'; e.target.style.background='rgba(255,255,255,0.08)'; }} />
          </div>
          {/* Category pills */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:20 }}>
            {CATS.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
                padding:'7px 18px', borderRadius:30, fontSize:11, fontWeight:600, cursor:'pointer',
                background: selectedCategory===cat ? '#C5A059' : 'rgba(255,255,255,0.10)',
                color: selectedCategory===cat ? '#fff' : 'rgba(232,223,213,0.75)',
                border: selectedCategory===cat ? '1px solid #C5A059' : '1px solid rgba(255,255,255,0.20)',
                backdropFilter:'blur(8px)', transition:'all 0.20s ease'
              }}>{cat}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'40px 40px 80px' }}>
        {/* Sort + count bar */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:28, background:'#fff', padding:'14px 20px', borderRadius:16, border:'1px solid #E8DFD5', boxShadow:'0 2px 8px rgba(28,25,23,0.04)' }}>
          <span style={{ fontSize:12, color:'#6B635B', fontWeight:500 }}>
            Showing <strong style={{ color:'#121212', fontWeight:800 }}>{filtered.length}</strong> products
            {searchQuery && <span style={{ color:'#C5A059' }}> for "{searchQuery}"</span>}
          </span>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontSize:11, fontWeight:700, color:'#121212' }}>Sort:</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
              ...S.input, width:'auto', padding:'7px 14px', borderRadius:20, fontSize:11, fontWeight:600,
              background:'#F7F3EE', cursor:'pointer'
            }}>
              <option value="popular">Popularity</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div style={{ display:'flex', gap:28, alignItems:'flex-start' }}>
          <FilterSidebar />

          <div style={{ flex:1, minWidth:0 }}>
            {filtered.length === 0 ? (
              <div style={{ background:'#fff', borderRadius:24, padding:'64px 40px', textAlign:'center', border:'1px solid #E8DFD5' }}>
                <div style={{ width:72, height:72, borderRadius:'50%', background:'#F7F1E5', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
                  <Search size={28} color="#C5A059" />
                </div>
                <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:22, fontWeight:700, color:'#121212', marginBottom:8 }}>No products found</h3>
                <p style={{ fontSize:12, color:'#6B635B', marginBottom:24 }}>Try adjusting your search or filters.</p>
                <button onClick={() => { setSelectedCategory('All'); setPriceRange(10000); setMinRating(0); setInStockOnly(false); setSearchQuery(''); }}
                  style={S.btn()}>Clear All Filters</button>
              </div>
            ) : (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:22 }}>
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
