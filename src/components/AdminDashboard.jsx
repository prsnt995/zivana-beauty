import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ANALYTICS_DATA, CATEGORIES } from '../data/mockData';
import {
  LayoutDashboard, Package, ShoppingBag, Users, Tag, Globe,
  TrendingUp, TrendingDown, Plus, Edit, Trash2, CheckCircle2,
  XCircle, ArrowUpRight, Eye, Sparkles, BarChart3, AlertTriangle,
  X, ChevronLeft, Search, Filter, Download, RefreshCw, Send,
  ShieldCheck, Truck, CreditCard, DollarSign, Calendar, MapPin,
  Phone, Mail, Award, Check, Layers, Copy, Zap, ArrowRight, ExternalLink
} from 'lucide-react';

const S = {
  btn: (bg='#C5A059', color='#fff', extra={}) => ({
    display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
    padding:'10px 20px', background:bg, color, borderRadius:12,
    fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase',
    border:'none', cursor:'pointer', transition:'all 0.20s ease', ...extra
  }),
  input: {
    width:'100%', padding:'11px 14px', background:'rgba(255,255,255,0.06)',
    border:'1.5px solid rgba(255,255,255,0.12)', borderRadius:12,
    fontFamily:'inherit', fontSize:12, color:'#fff', outline:'none',
    transition:'border-color 0.2s, background 0.2s'
  },
  label: {
    display:'block', fontSize:10, fontWeight:700, color:'rgba(232,223,213,0.70)',
    letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:6
  },
  card: {
    background:'#181614', borderRadius:20,
    border:'1px solid rgba(255,255,255,0.07)', padding:'22px',
    boxShadow:'0 8px 24px rgba(0,0,0,0.35)'
  },
  th: {
    padding:'14px 16px', fontSize:10, fontWeight:800, letterSpacing:'0.12em',
    textTransform:'uppercase', color:'#C5A059', textAlign:'left', whiteSpace:'nowrap'
  },
  td: {
    padding:'14px 16px', fontSize:12, color:'rgba(232,223,213,0.85)', verticalAlign:'middle'
  },
};

const InputAdmin = ({ label, ...props }) => (
  <div>
    {label && <label style={S.label}>{label}</label>}
    <input
      style={S.input}
      onFocus={e => { e.target.style.borderColor='#C5A059'; e.target.style.background='rgba(255,255,255,0.09)'; }}
      onBlur={e => { e.target.style.borderColor='rgba(255,255,255,0.12)'; e.target.style.background='rgba(255,255,255,0.06)'; }}
      {...props}
    />
  </div>
);

const STATUS_COLORS = {
  'Order Placed': { bg:'rgba(197,160,89,0.15)', text:'#C5A059', border:'rgba(197,160,89,0.35)' },
  'Processing':   { bg:'rgba(59,130,246,0.15)', text:'#60A5FA', border:'rgba(59,130,246,0.35)' },
  'Shipped':      { bg:'rgba(245,158,11,0.15)', text:'#FBBF24', border:'rgba(245,158,11,0.35)' },
  'Out for Delivery': { bg:'rgba(168,85,247,0.15)', text:'#C084FC', border:'rgba(168,85,247,0.35)' },
  'Delivered':    { bg:'rgba(16,185,129,0.15)', text:'#34D399', border:'rgba(16,185,129,0.35)' },
  'Cancelled':    { bg:'rgba(239,68,68,0.15)', text:'#F87171', border:'rgba(239,68,68,0.35)' },
};

const PRESET_IMAGES = [
  { label: 'Saffron Serum', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800' },
  { label: 'Velvet Lipstick', url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800' },
  { label: 'Rose Hair Oil', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800' },
  { label: 'Royal Perfume', url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800' },
  { label: 'Gold Face Polish', url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800' },
  { label: 'Gua Sha Tool', url: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800' }
];

export const AdminDashboard = () => {
  const {
    products, orders, coupons, customers, cms, navigateTo,
    addProduct, editProduct, deleteProduct, quickUpdateStock,
    updateOrderStatus, deleteOrder, updateCMSData,
    addCoupon, deleteCoupon, toggleCoupon, updateCustomerPoints,
    showToast
  } = useApp();

  // Tab State
  const [activeTab, setActiveTab] = useState('analytics');

  // Search & Filter States
  const [globalSearch, setGlobalSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState('All');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [productStockFilter, setProductStockFilter] = useState('All');

  // Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProd, setEditingProd] = useState(null);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState(null);
  const [selectedCustomerForPoints, setSelectedCustomerForPoints] = useState(null);
  const [pointsAdjustment, setPointsAdjustment] = useState(100);

  // Forms
  const EMPTY_PROD = {
    name: '', brand: 'ZIVANA', category: 'Skincare', price: 1850, originalPrice: 2250,
    discountPercent: 18, stock: 45, sku: `ZIV-SK-${Math.floor(100 + Math.random() * 900)}`,
    description: '', keyBenefits: ['100% pure botanical formulation', 'Dermatologically tested for Indian skin tones'],
    ingredients: 'Kashmiri Saffron, Kumkumadi Tailam, Rosehip Oil', howToUse: 'Apply 3-4 drops daily on damp face.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false, isNewArrival: true, isLimited: false
  };

  const [prodForm, setProdForm] = useState(EMPTY_PROD);
  const [couponForm, setCouponForm] = useState({ code: '', discountPercent: 15, minSpend: 1499, expiry: '2026-12-31' });
  const [cmsForm, setCmsForm] = useState(cms || {});

  // Analytics Aggregates
  const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrdersCount = orders.filter(o => o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled').length;
  const lowStockCount = products.filter(p => (p.stock || 0) <= 10).length;
  const outOfStockCount = products.filter(p => (p.stock || 0) === 0).length;

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = (p.name || '').toLowerCase().includes(globalSearch.toLowerCase()) ||
                          (p.sku || '').toLowerCase().includes(globalSearch.toLowerCase());
      const matchCategory = productCategoryFilter === 'All' || p.category === productCategoryFilter;
      const matchStock = productStockFilter === 'All' ||
        (productStockFilter === 'in' && (p.stock || 0) > 10) ||
        (productStockFilter === 'low' && (p.stock || 0) > 0 && (p.stock || 0) <= 10) ||
        (productStockFilter === 'out' && (p.stock || 0) === 0);
      return matchSearch && matchCategory && matchStock;
    });
  }, [products, globalSearch, productCategoryFilter, productStockFilter]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchSearch = (o.id || '').toLowerCase().includes(globalSearch.toLowerCase()) ||
                          (o.customer?.name || o.customer?.fullName || '').toLowerCase().includes(globalSearch.toLowerCase()) ||
                          (o.customer?.city || '').toLowerCase().includes(globalSearch.toLowerCase());
      const matchStatus = orderFilter === 'All' || (o.orderStatus || o.status) === orderFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, globalSearch, orderFilter]);

  // Product Modal Handlers
  const openAddProd = () => {
    setProdForm(EMPTY_PROD);
    setEditingProd(null);
    setIsProductModalOpen(true);
  };

  const openEditProd = (p) => {
    setProdForm({
      name: p.name || '',
      brand: p.brand || 'ZIVANA',
      category: p.category || 'Skincare',
      price: p.price || 1500,
      originalPrice: p.originalPrice || 1800,
      discountPercent: p.discountPercent || 15,
      stock: p.stock || 0,
      sku: p.sku || `ZIV-${Date.now()}`,
      description: p.description || '',
      keyBenefits: p.keyBenefits || ['Visibly enhances skin radiance', 'Ayurvedic botanical formulation'],
      ingredients: Array.isArray(p.ingredients) ? p.ingredients.join(', ') : (p.ingredients || ''),
      howToUse: p.howToUse || 'Apply as directed daily.',
      image: p.images?.[0] || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
      isBestSeller: !!p.isBestSeller,
      isNewArrival: !!p.isNewArrival,
      isLimited: !!p.isLimited,
    });
    setEditingProd(p);
    setIsProductModalOpen(true);
  };

  const handleSaveProd = (e) => {
    e.preventDefault();
    const payload = {
      ...prodForm,
      images: [prodForm.image],
      ingredients: typeof prodForm.ingredients === 'string'
        ? prodForm.ingredients.split(',').map(s => s.trim()).filter(Boolean)
        : prodForm.ingredients,
      rating: editingProd?.rating || 4.9,
      reviewsCount: editingProd?.reviewsCount || 84,
      reviews: editingProd?.reviews || []
    };

    if (editingProd) {
      editProduct({ ...editingProd, ...payload });
      showToast(`Product "${payload.name}" updated!`);
    } else {
      addProduct({ ...payload, id: `ziv-${Date.now()}` });
      showToast(`Product "${payload.name}" launched into inventory!`);
    }
    setIsProductModalOpen(false);
  };

  // Coupon Handlers
  const handleSaveCoupon = (e) => {
    e.preventDefault();
    addCoupon({
      code: couponForm.code.toUpperCase().trim(),
      discountPercent: Number(couponForm.discountPercent),
      minSpend: Number(couponForm.minSpend),
      expiry: couponForm.expiry,
      active: true,
      usageLimit: 500
    });
    setCouponForm({ code: '', discountPercent: 15, minSpend: 1499, expiry: '2026-12-31' });
    setIsCouponModalOpen(false);
  };

  // CSV Export
  const exportOrdersCSV = () => {
    const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'City', 'Total Amount', 'Payment Method', 'Payment Status', 'Order Status', 'Courier'];
    const rows = orders.map(o => [
      o.id, o.date, o.customer?.name || o.customer?.fullName || 'Guest',
      o.customer?.phone || '', o.customer?.city || '',
      o.total, o.paymentMethod, o.paymentStatus || 'Paid', o.orderStatus || o.status, o.courier || 'Bluedart'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `zivana_orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Orders export generated and downloaded!');
  };

  // Quick Order Simulation
  const simulateOrder = () => {
    const randomCustomer = customers?.[Math.floor(Math.random() * (customers?.length || 1))] || {
      name: 'Dr. Ananya Roy',
      email: 'ananya.roy@example.com',
      phone: '+91 98765 43210',
      city: 'Mumbai',
      state: 'Maharashtra'
    };
    const randomProd = products[Math.floor(Math.random() * products.length)];
    const newOrderId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      customer: {
        name: randomCustomer.name,
        email: randomCustomer.email,
        phone: randomCustomer.phone,
        address: '88 Marine Drive, Penthouse 4',
        city: randomCustomer.city || 'Mumbai',
        state: randomCustomer.state || 'Maharashtra',
        pincode: '400020'
      },
      items: [
        {
          id: randomProd.id,
          name: randomProd.name,
          price: randomProd.price,
          quantity: 1,
          image: randomProd.images?.[0]
        }
      ],
      subtotal: randomProd.price,
      discount: 0,
      deliveryFee: 0,
      gst: Math.round(randomProd.price * 0.18),
      total: Math.round(randomProd.price * 1.18),
      paymentMethod: 'Google Pay (UPI)',
      paymentStatus: 'Paid',
      orderStatus: 'Order Placed',
      trackingId: `AWB-IN-${Math.floor(100000 + Math.random() * 900000)}`,
      courier: 'Bluedart Express'
    };

    updateOrderStatus(newOrderId, 'Order Placed');
    showToast(`Simulated live order #${newOrderId} from ${randomCustomer.name}! 🚀`);
  };

  const TABS = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package, badge: products.length },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} pending` : orders.length },
    { id: 'inventory', label: 'Inventory', icon: AlertTriangle, badge: lowStockCount > 0 ? `${lowStockCount} low` : null, alert: lowStockCount > 0 },
    { id: 'customers', label: 'Privé VIPs', icon: Users, badge: (customers || []).length },
    { id: 'coupons', label: 'Coupons', icon: Tag, badge: (coupons || []).length },
    { id: 'cms', label: 'Storefront CMS', icon: Globe },
  ];

  return (
    <div style={{ background: '#0F0E0D', minHeight: '100vh', color: '#FDFBF7', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ═══════════════════════════════════
          TOP EXECUTIVE COMMAND BAR
          ═══════════════════════════════════ */}
      <header style={{
        background: 'rgba(22, 20, 18, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(197,160,89,0.20)',
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20
      }}>
        {/* Left Brand Identifier */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'linear-gradient(135deg, #C5A059 0%, #8C6A28 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 800,
            color: '#121212', boxShadow: '0 4px 14px rgba(197,160,89,0.35)'
          }}>
            Z
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: '0.14em', color: '#fff' }}>
                ZIVANA EXECUTIVE CONTROL
              </span>
              <span style={{
                fontSize: 9, fontWeight: 800, color: '#10B981',
                background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.30)',
                padding: '2px 8px', borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 4
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                LIVE 2026
              </span>
            </div>
            <div style={{ fontSize: 9.5, letterSpacing: '0.16em', color: '#9A8E84', textTransform: 'uppercase' }}>
              A prestige brand by <strong style={{ color: '#C5A059' }}>NOEUL ENTERPRISES</strong>
            </div>
          </div>
        </div>

        {/* Center Search Bar */}
        <div style={{ flex: 1, maxWidth: 420, position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9A8E84' }} />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search orders, SKU, customers, products..."
            style={{
              width: '100%',
              padding: '10px 14px 10px 40px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 30,
              fontSize: 12,
              color: '#fff',
              outline: 'none',
              transition: 'all 0.2s'
            }}
            onFocus={(e) => { e.target.style.borderColor = '#C5A059'; e.target.style.background = 'rgba(255,255,255,0.08)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
          />
          {globalSearch && (
            <button
              onClick={() => setGlobalSearch('')}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9A8E84', cursor: 'pointer' }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={simulateOrder}
            title="Generate a sample order to test the fulfillment pipeline"
            style={{
              ...S.btn('rgba(197,160,89,0.12)', '#C5A059', {
                border: '1px solid rgba(197,160,89,0.30)',
                padding: '8px 14px', fontSize: 10
              })
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(197,160,89,0.25)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(197,160,89,0.12)'; }}
          >
            <Zap size={13} /> Test Live Order
          </button>

          <button
            onClick={() => navigateTo('home')}
            style={{
              ...S.btn('rgba(255,255,255,0.08)', '#FDFBF7', {
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '8px 16px', fontSize: 10
              })
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#C5A059'; e.currentTarget.style.color = '#121212'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#FDFBF7'; }}
          >
            <Eye size={13} /> View Storefront
          </button>
        </div>
      </header>

      {/* ═══════════════════════════════════
          MAIN ADMIN WRAPPER
          ═══════════════════════════════════ */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '32px 32px 80px' }}>

        {/* ── Navigation Tab Bar ── */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 10,
          marginBottom: 32,
          paddingBottom: 20,
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}>
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  borderRadius: 14,
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: isActive ? '1px solid #C5A059' : '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                  background: isActive ? 'linear-gradient(135deg, #C5A059 0%, #9E7B35 100%)' : '#1A1815',
                  color: isActive ? '#121212' : 'rgba(232,223,213,0.70)',
                  boxShadow: isActive ? '0 6px 20px rgba(197,160,89,0.35)' : 'none',
                  transition: 'all 0.22s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#25211D';
                    e.currentTarget.style.color = '#fff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#1A1815';
                    e.currentTarget.style.color = 'rgba(232,223,213,0.70)';
                  }
                }}
              >
                <Icon size={14} color={isActive ? '#121212' : '#C5A059'} />
                {tab.label}
                {tab.badge && (
                  <span style={{
                    background: isActive ? '#121212' : tab.alert ? '#EF4444' : 'rgba(197,160,89,0.20)',
                    color: isActive ? '#C5A059' : '#fff',
                    fontSize: 9,
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: 20
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════
            TAB 1: ANALYTICS & BUSINESS REVENUE
            ═══════════════════════════════════════════ */}
        {activeTab === 'analytics' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#C5A059' }}>
                  FINANCIAL & OPERATIONAL INTELLIGENCE
                </span>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#fff', marginTop: 4 }}>
                  Executive Performance Dashboard
                </h1>
              </div>
              <button onClick={exportOrdersCSV} style={S.btn('rgba(255,255,255,0.08)', '#fff', { border: '1px solid rgba(255,255,255,0.12)' })}>
                <Download size={14} /> Export CSV Report
              </button>
            </div>

            {/* Top Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 18, marginBottom: 32 }}>
              {/* Card 1: Revenue */}
              <div style={S.card}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#9A8E84' }}>
                    GROSS REVENUE
                  </span>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(197,160,89,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DollarSign size={16} color="#C5A059" />
                  </div>
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', fontFamily: "'Playfair Display', serif" }}>
                  ₹{(revenue || 34200).toLocaleString('en-IN')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#10B981', marginTop: 8 }}>
                  <TrendingUp size={13} />
                  <span>+18.4% vs last month</span>
                </div>
              </div>

              {/* Card 2: Orders */}
              <div style={S.card}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#9A8E84' }}>
                    TOTAL DISPATCHED ORDERS
                  </span>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShoppingBag size={16} color="#60A5FA" />
                  </div>
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', fontFamily: "'Playfair Display', serif" }}>
                  {orders.length} <span style={{ fontSize: 13, color: '#9A8E84', fontWeight: 500 }}>orders</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#10B981', marginTop: 8 }}>
                  <TrendingUp size={13} />
                  <span>{pendingOrdersCount} orders currently in fulfillment</span>
                </div>
              </div>

              {/* Card 3: Average Order Value */}
              <div style={S.card}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#9A8E84' }}>
                    AVG ORDER VALUE (AOV)
                  </span>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award size={16} color="#34D399" />
                  </div>
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', fontFamily: "'Playfair Display', serif" }}>
                  ₹{orders.length > 0 ? Math.round(revenue / orders.length).toLocaleString('en-IN') : '3,450'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#10B981', marginTop: 8 }}>
                  <TrendingUp size={13} />
                  <span>+8.2% basket luxury uplift</span>
                </div>
              </div>

              {/* Card 4: VIP Retention */}
              <div style={S.card}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#9A8E84' }}>
                    PRIVÉ RETENTION
                  </span>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(168,85,247,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles size={16} color="#C084FC" />
                  </div>
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', fontFamily: "'Playfair Display', serif" }}>
                  78.4%
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#C5A059', marginTop: 8 }}>
                  <span>{(customers || []).length} registered VIP ambassadors</span>
                </div>
              </div>
            </div>

            {/* Split Grid: Monthly Trajectory & Category Share */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, marginBottom: 32 }}>

              {/* Monthly Trajectory */}
              <div style={S.card}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#C5A059', textTransform: 'uppercase' }}>
                      2026 PAN-INDIA REVENUE TRAJECTORY
                    </span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#fff', margin: '4px 0 0' }}>
                      Monthly Growth & Profit Margins
                    </h3>
                  </div>
                  <span style={{ fontSize: 11, color: '#9A8E84' }}>Avg Net Profit: <strong style={{ color: '#10B981' }}>72%</strong></span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 10, alignItems: 'flex-end', height: 200, padding: '20px 0 10px' }}>
                  {ANALYTICS_DATA.yearlyRevenueChart.map((item) => {
                    const heightPct = Math.round((item.revenue / 4500000) * 100);
                    return (
                      <div key={item.month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                        <span style={{ fontSize: 9, color: '#C5A059', fontWeight: 700, marginBottom: 6 }}>
                          {(item.revenue / 100000).toFixed(1)}L
                        </span>
                        <div
                          style={{
                            width: '100%',
                            height: `${heightPct}%`,
                            background: 'linear-gradient(180deg, #C5A059 0%, rgba(197,160,89,0.35) 100%)',
                            borderRadius: '8px 8px 4px 4px',
                            transition: 'all 0.3s'
                          }}
                          title={`${item.month}: ₹${(item.revenue).toLocaleString('en-IN')} (${item.orders} orders)`}
                        />
                        <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(232,223,213,0.70)', marginTop: 8 }}>
                          {item.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category Sales Breakdown */}
              <div style={S.card}>
                <div style={{ marginBottom: 18 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#C5A059', textTransform: 'uppercase' }}>
                    CATEGORY REVENUE SHARE
                  </span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#fff', margin: '4px 0 0' }}>
                    Sales by Botanical Domain
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { cat: 'Skincare (Serums & Elixirs)', pct: 44, amount: '₹15.0L' },
                    { cat: 'Makeup (Velvet Matte & Silk)', pct: 26, amount: '₹8.9L' },
                    { cat: 'Haircare (Bhringraj & Roots)', pct: 15, amount: '₹5.1L' },
                    { cat: 'Body Care (Ayurvedic Polishes)', pct: 9, amount: '₹3.1L' },
                    { cat: 'Royal Fragrance & Oudh', pct: 6, amount: '₹2.1L' },
                  ].map((c) => (
                    <div key={c.cat}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, marginBottom: 5 }}>
                        <span style={{ color: 'rgba(232,223,213,0.90)', fontWeight: 600 }}>{c.cat}</span>
                        <span style={{ color: '#C5A059', fontWeight: 800 }}>{c.amount} ({c.pct}%)</span>
                      </div>
                      <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 10, overflow: 'hidden' }}>
                        <div style={{ width: `${c.pct}%`, height: '100%', background: 'linear-gradient(90deg, #C5A059, #D4B872)', borderRadius: 10 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Geographic Distribution & Recent Fulfillment */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={S.card}>
                <div style={{ marginBottom: 16 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#C5A059', textTransform: 'uppercase' }}>
                    PAN-INDIA METRO REACH
                  </span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#fff', margin: '4px 0 0' }}>
                    Top Delivery Hubs
                  </h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { city: 'Bengaluru', share: '36%', courier: 'Bluedart Express (24h)' },
                    { city: 'Mumbai', share: '28%', courier: 'Bluedart Priority (24h)' },
                    { city: 'Delhi-NCR', share: '19%', courier: 'Delhivery Surface (48h)' },
                    { city: 'Kolkata & South', share: '17%', courier: 'Bluedart Air (48h)' },
                  ].map((hub) => (
                    <div key={hub.city} style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{hub.city}</span>
                        <span style={{ fontSize: 12, fontWeight: 800, color: '#C5A059' }}>{hub.share}</span>
                      </div>
                      <span style={{ fontSize: 10, color: '#9A8E84' }}>{hub.courier}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Selling Products */}
              <div style={S.card}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#C5A059', textTransform: 'uppercase' }}>
                      TOP PERFORMING FORMULATIONS
                    </span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#fff', margin: '4px 0 0' }}>
                      Best-Sellers Leaderboard
                    </h3>
                  </div>
                  <button onClick={() => setActiveTab('products')} style={{ background: 'none', border: 'none', color: '#C5A059', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                    Catalog →
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {products.slice(0, 4).map((p, idx) => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 12 }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: '#C5A059', width: 16 }}>#{idx + 1}</span>
                      <img src={p.images?.[0]} alt="" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>
                          {p.name}
                        </p>
                        <p style={{ fontSize: 10, color: '#9A8E84', margin: 0 }}>₹{p.price.toLocaleString('en-IN')} · {p.stock} in stock</p>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#10B981', background: 'rgba(16,185,129,0.12)', padding: '2px 8px', borderRadius: 20 }}>
                        HIGH DEMAND
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            TAB 2: PRODUCTS CATALOG MANAGEMENT
            ═══════════════════════════════════════════ */}
        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#C5A059' }}>
                  CATALOG INVENTORY & PRICING
                </span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#fff', marginTop: 4 }}>
                  Product Portfolio ({products.length})
                </h2>
              </div>
              <button onClick={openAddProd} style={S.btn('#C5A059', '#121212', { fontWeight: 800 })}>
                <Plus size={15} /> Add New Formulation
              </button>
            </div>

            {/* Filter Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.10)' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#9A8E84', textTransform: 'uppercase', marginLeft: 4 }}>Category:</span>
                {['All', 'Skincare', 'Makeup', 'Haircare', 'Body Care', 'Fragrance'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setProductCategoryFilter(cat)}
                    style={{
                      padding: '5px 12px', borderRadius: 14, fontSize: 10.5, fontWeight: 700, border: 'none', cursor: 'pointer',
                      background: productCategoryFilter === cat ? '#C5A059' : 'transparent',
                      color: productCategoryFilter === cat ? '#121212' : 'rgba(232,223,213,0.70)'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.10)' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#9A8E84', textTransform: 'uppercase', marginLeft: 4 }}>Stock:</span>
                {[
                  { id: 'All', label: 'All' },
                  { id: 'in', label: 'In Stock' },
                  { id: 'low', label: 'Low (<10)' },
                  { id: 'out', label: 'Out' }
                ].map(st => (
                  <button
                    key={st.id}
                    onClick={() => setProductStockFilter(st.id)}
                    style={{
                      padding: '5px 10px', borderRadius: 14, fontSize: 10.5, fontWeight: 700, border: 'none', cursor: 'pointer',
                      background: productStockFilter === st.id ? '#C5A059' : 'transparent',
                      color: productStockFilter === st.id ? '#121212' : 'rgba(232,223,213,0.70)'
                    }}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Table */}
            <div style={{ ...S.card, padding: 0, overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
                <thead>
                  <tr style={{ background: 'rgba(0,0,0,0.40)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    {['Product Details', 'Category', 'SKU', 'Pricing (Selling / MRP)', 'Stock Status', 'Quick Stock Adj.', 'Actions'].map(h => (
                      <th key={h} style={S.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(p => {
                    const isLow = (p.stock || 0) <= 10 && (p.stock || 0) > 0;
                    const isOut = (p.stock || 0) === 0;
                    return (
                      <tr
                        key={p.id}
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        {/* Product info with image */}
                        <td style={S.td}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                            <img
                              src={p.images?.[0] || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800'}
                              alt=""
                              style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover', background: '#25211D' }}
                            />
                            <div>
                              <div style={{ fontWeight: 700, color: '#fff', fontSize: 13, marginBottom: 2 }}>
                                {p.name}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <span style={{ fontSize: 10, color: '#9A8E84' }}>{p.brand}</span>
                                {p.isBestSeller && (
                                  <span style={{ fontSize: 8.5, fontWeight: 800, color: '#C5A059', background: 'rgba(197,160,89,0.15)', padding: '1px 6px', borderRadius: 10 }}>BESTSELLER</span>
                                )}
                                {p.isNewArrival && (
                                  <span style={{ fontSize: 8.5, fontWeight: 800, color: '#38BDF8', background: 'rgba(56,189,248,0.15)', padding: '1px 6px', borderRadius: 10 }}>NEW</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td style={S.td}>
                          <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700, background: 'rgba(197,160,89,0.12)', color: '#C5A059' }}>
                            {p.category}
                          </span>
                        </td>

                        {/* SKU */}
                        <td style={S.td}>
                          <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#9A8E84' }}>{p.sku}</span>
                        </td>

                        {/* Price */}
                        <td style={S.td}>
                          <div>
                            <span style={{ fontWeight: 800, color: '#fff', fontSize: 13 }}>₹{p.price?.toLocaleString('en-IN')}</span>
                            {p.originalPrice && (
                              <span style={{ fontSize: 10, color: '#6B635B', textDecoration: 'line-through', marginLeft: 6 }}>
                                ₹{p.originalPrice?.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                          {p.discountPercent > 0 && (
                            <span style={{ fontSize: 9.5, fontWeight: 700, color: '#10B981' }}>{p.discountPercent}% OFF</span>
                          )}
                        </td>

                        {/* Stock Status */}
                        <td style={S.td}>
                          <span style={{
                            padding: '4px 10px', borderRadius: 20, fontSize: 10, fontWeight: 800,
                            background: isOut ? 'rgba(239,68,68,0.15)' : isLow ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)',
                            color: isOut ? '#F87171' : isLow ? '#FBBF24' : '#34D399',
                            border: `1px solid ${isOut ? 'rgba(239,68,68,0.30)' : isLow ? 'rgba(245,158,11,0.30)' : 'rgba(16,185,129,0.30)'}`
                          }}>
                            {isOut ? 'OUT OF STOCK' : `${p.stock} units`}
                          </span>
                        </td>

                        {/* Quick Stock Adj */}
                        <td style={S.td}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <button
                              onClick={() => quickUpdateStock(p.id, -5)}
                              style={{ width: 26, height: 26, borderRadius: 8, background: 'rgba(255,255,255,0.07)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 11 }}
                              title="Decrease 5 units"
                            >
                              -5
                            </button>
                            <button
                              onClick={() => quickUpdateStock(p.id, 5)}
                              style={{ width: 26, height: 26, borderRadius: 8, background: 'rgba(197,160,89,0.15)', color: '#C5A059', border: '1px solid rgba(197,160,89,0.30)', cursor: 'pointer', fontWeight: 700, fontSize: 11 }}
                              title="Add 5 units"
                            >
                              +5
                            </button>
                            <button
                              onClick={() => quickUpdateStock(p.id, 20)}
                              style={{ width: 26, height: 26, borderRadius: 8, background: 'rgba(16,185,129,0.15)', color: '#34D399', border: '1px solid rgba(16,185,129,0.30)', cursor: 'pointer', fontWeight: 700, fontSize: 10 }}
                              title="Restock 20 units"
                            >
                              +20
                            </button>
                          </div>
                        </td>

                        {/* Actions */}
                        <td style={S.td}>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button
                              onClick={() => openEditProd(p)}
                              style={{
                                padding: '6px 12px', background: 'rgba(255,255,255,0.07)',
                                border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10,
                                fontSize: 11, fontWeight: 700, color: 'rgba(232,223,213,0.85)',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, transition: 'all 0.15s'
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = '#C5A059'; e.currentTarget.style.color = '#121212'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(232,223,213,0.85)'; }}
                            >
                              <Edit size={12} /> Edit
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete product "${p.name}"?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              style={{
                                padding: '6px 10px', background: 'rgba(239,68,68,0.10)',
                                border: '1px solid rgba(239,68,68,0.20)', borderRadius: 10,
                                fontSize: 11, fontWeight: 700, color: '#F87171',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.15s'
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = '#EF4444'; e.currentTarget.style.color = '#fff'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.10)'; e.currentTarget.style.color = '#F87171'; }}
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            TAB 3: ORDERS & SHIPPING FULFILLMENT
            ═══════════════════════════════════════════ */}
        {activeTab === 'orders' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#C5A059' }}>
                  FULFILLMENT & LOGISTICS CONTROL
                </span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#fff', marginTop: 4 }}>
                  Order Pipeline ({orders.length})
                </h2>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={simulateOrder} style={S.btn('rgba(197,160,89,0.15)', '#C5A059', { border: '1px solid rgba(197,160,89,0.30)' })}>
                  <Plus size={14} /> Simulate Order
                </button>
                <button onClick={exportOrdersCSV} style={S.btn('#C5A059', '#121212', { fontWeight: 800 })}>
                  <Download size={14} /> Export CSV
                </button>
              </div>
            </div>

            {/* Order Status Filters */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {['All', 'Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'].map(st => {
                const count = st === 'All' ? orders.length : orders.filter(o => (o.orderStatus || o.status) === st).length;
                return (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    style={{
                      padding: '7px 16px',
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: 'none',
                      background: orderFilter === st ? '#C5A059' : 'rgba(255,255,255,0.06)',
                      color: orderFilter === st ? '#121212' : 'rgba(232,223,213,0.70)',
                      transition: 'all 0.18s'
                    }}
                  >
                    {st} <span style={{ opacity: 0.7, marginLeft: 4 }}>({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Orders Table */}
            <div style={{ ...S.card, padding: 0, overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 950 }}>
                <thead>
                  <tr style={{ background: 'rgba(0,0,0,0.40)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    {['Order ID & Date', 'Customer Details', 'Items', 'Total & Payment', 'Tracking / Courier', 'Status', 'Update Status', 'Inspect'].map(h => (
                      <th key={h} style={S.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(o => {
                    const currentStatus = o.orderStatus || o.status || 'Order Placed';
                    const colors = STATUS_COLORS[currentStatus] || STATUS_COLORS['Order Placed'];
                    return (
                      <tr
                        key={o.id}
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        {/* Order ID & Date */}
                        <td style={S.td}>
                          <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#C5A059', fontSize: 12 }}>
                            #{o.id}
                          </span>
                          <p style={{ fontSize: 10, color: '#9A8E84', margin: '2px 0 0' }}>{o.date}</p>
                        </td>

                        {/* Customer */}
                        <td style={S.td}>
                          <div style={{ fontWeight: 700, color: '#fff' }}>{o.customer?.name || o.customer?.fullName || 'Valued Guest'}</div>
                          <p style={{ fontSize: 10, color: '#9A8E84', margin: '2px 0 0' }}>{o.customer?.city || 'India'} · {o.customer?.phone || '+91 98...'}</p>
                        </td>

                        {/* Items */}
                        <td style={S.td}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            {(o.items || []).slice(0, 2).map((it, idx) => (
                              <img
                                key={idx}
                                src={it.image || it.product?.images?.[0] || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800'}
                                alt=""
                                style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover' }}
                              />
                            ))}
                            <span style={{ fontSize: 11, color: '#9A8E84' }}>
                              {(o.items || []).length} item(s)
                            </span>
                          </div>
                        </td>

                        {/* Total & Payment */}
                        <td style={S.td}>
                          <div style={{ fontWeight: 800, color: '#fff', fontSize: 13 }}>₹{o.total?.toLocaleString('en-IN')}</div>
                          <span style={{ fontSize: 9.5, color: '#9A8E84' }}>{o.paymentMethod || 'UPI (Google Pay)'}</span>
                        </td>

                        {/* Tracking / Courier */}
                        <td style={S.td}>
                          <div style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>{o.courier || 'Bluedart Express'}</div>
                          <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#C5A059' }}>{o.trackingId || 'AWB-IN-88912'}</span>
                        </td>

                        {/* Status Chip */}
                        <td style={S.td}>
                          <span style={{
                            padding: '4px 10px', borderRadius: 20, fontSize: 9.5, fontWeight: 800, letterSpacing: '0.04em',
                            background: colors.bg, color: colors.text, border: `1px solid ${colors.border}`, textTransform: 'uppercase'
                          }}>
                            {currentStatus}
                          </span>
                        </td>

                        {/* Change Status Dropdown */}
                        <td style={S.td}>
                          <select
                            value={currentStatus}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                            style={{
                              background: 'rgba(255,255,255,0.08)',
                              border: '1px solid rgba(255,255,255,0.15)',
                              color: '#fff',
                              fontSize: 11,
                              fontWeight: 600,
                              padding: '6px 10px',
                              borderRadius: 10,
                              cursor: 'pointer',
                              outline: 'none'
                            }}
                          >
                            {['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'].map(s => (
                              <option key={s} value={s} style={{ background: '#1E1E1E', color: '#fff' }}>{s}</option>
                            ))}
                          </select>
                        </td>

                        {/* Inspect Detail */}
                        <td style={S.td}>
                          <button
                            onClick={() => setSelectedOrderForDetail(o)}
                            style={{
                              padding: '6px 12px', background: 'rgba(197,160,89,0.12)',
                              border: '1px solid rgba(197,160,89,0.30)', borderRadius: 10,
                              fontSize: 10, fontWeight: 700, color: '#C5A059', cursor: 'pointer'
                            }}
                          >
                            View Invoice
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            TAB 4: INVENTORY & LOW STOCK ALERTS
            ═══════════════════════════════════════════ */}
        {activeTab === 'inventory' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#C5A059' }}>
                  WAREHOUSE INVENTORY & PROCUREMENT
                </span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#fff', marginTop: 4 }}>
                  Realtime Stock Control
                </h2>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => {
                    products.forEach(p => {
                      if ((p.stock || 0) <= 10) quickUpdateStock(p.id, 25);
                    });
                    showToast('Restocked +25 units to all low stock formulations!');
                  }}
                  style={S.btn('#10B981', '#121212', { fontWeight: 800 })}
                >
                  <Plus size={14} /> Bulk Restock Low (+25)
                </button>
              </div>
            </div>

            {/* Inventory KPI Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
              <div style={S.card}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#9A8E84', textTransform: 'uppercase' }}>TOTAL SKUs</span>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#C5A059', marginTop: 4 }}>{products.length}</div>
              </div>
              <div style={S.card}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#9A8E84', textTransform: 'uppercase' }}>HEALTHY STOCK (&gt;10)</span>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#10B981', marginTop: 4 }}>
                  {products.filter(p => (p.stock || 0) > 10).length}
                </div>
              </div>
              <div style={S.card}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#9A8E84', textTransform: 'uppercase' }}>LOW STOCK ALERT (&lt;=10)</span>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#F59E0B', marginTop: 4 }}>{lowStockCount}</div>
              </div>
              <div style={S.card}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#9A8E84', textTransform: 'uppercase' }}>OUT OF STOCK</span>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#EF4444', marginTop: 4 }}>{outOfStockCount}</div>
              </div>
            </div>

            {/* Inventory List */}
            <div style={{ ...S.card, padding: 0, overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(0,0,0,0.40)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    {['Product', 'SKU', 'Category', 'Unit Price', 'Stock Remaining', 'Forecast', 'Procure Restock'].map(h => (
                      <th key={h} style={S.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...products].sort((a, b) => (a.stock || 0) - (b.stock || 0)).map(p => {
                    const isOut = (p.stock || 0) === 0;
                    const isLow = (p.stock || 0) <= 10 && !isOut;
                    return (
                      <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={S.td}>
                          <div style={{ fontWeight: 700, color: '#fff' }}>{p.name}</div>
                        </td>
                        <td style={S.td}><span style={{ fontFamily: 'monospace', color: '#9A8E84' }}>{p.sku}</span></td>
                        <td style={S.td}>{p.category}</td>
                        <td style={S.td}>₹{p.price.toLocaleString('en-IN')}</td>
                        <td style={S.td}>
                          <span style={{
                            padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 800,
                            background: isOut ? 'rgba(239,68,68,0.15)' : isLow ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)',
                            color: isOut ? '#F87171' : isLow ? '#FBBF24' : '#34D399'
                          }}>
                            {p.stock} units {isLow && '⚠️'} {isOut && '🚨'}
                          </span>
                        </td>
                        <td style={S.td}>
                          <span style={{ fontSize: 11, color: isOut ? '#EF4444' : isLow ? '#F59E0B' : '#9A8E84' }}>
                            {isOut ? 'Reorder Urgent' : isLow ? '~4 days supply' : '~28 days supply'}
                          </span>
                        </td>
                        <td style={S.td}>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button
                              onClick={() => quickUpdateStock(p.id, 10)}
                              style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                            >
                              +10
                            </button>
                            <button
                              onClick={() => quickUpdateStock(p.id, 50)}
                              style={{ padding: '6px 12px', background: 'rgba(197,160,89,0.15)', color: '#C5A059', border: '1px solid rgba(197,160,89,0.30)', borderRadius: 10, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                            >
                              +50 Units
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            TAB 5: PRIVÉ VIP CUSTOMERS DIRECTORY
            ═══════════════════════════════════════════ */}
        {activeTab === 'customers' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#C5A059' }}>
                  MEMBERSHIP & GLOW POINTS
                </span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#fff', marginTop: 4 }}>
                  Privé VIP Ambassadors ({(customers || []).length})
                </h2>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
              {(customers || []).map(c => (
                <div key={c.id} style={{ ...S.card, position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #C5A059, #8C6A28)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 800, color: '#121212'
                      }}>
                        {c.name?.[0] || 'A'}
                      </div>
                      <div>
                        <h4 style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: 0 }}>{c.name}</h4>
                        <span style={{ fontSize: 10, color: '#9A8E84' }}>{c.email}</span>
                      </div>
                    </div>
                    <span style={{
                      fontSize: 9, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
                      padding: '3px 8px', borderRadius: 20, background: 'rgba(197,160,89,0.15)', color: '#C5A059'
                    }}>
                      {c.tier}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, marginBottom: 14 }}>
                    <div>
                      <span style={{ fontSize: 9.5, color: '#9A8E84', textTransform: 'uppercase' }}>Lifetime Spend</span>
                      <p style={{ fontSize: 14, fontWeight: 800, color: '#fff', margin: '2px 0 0' }}>₹{c.totalSpent?.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <span style={{ fontSize: 9.5, color: '#9A8E84', textTransform: 'uppercase' }}>Glow Points</span>
                      <p style={{ fontSize: 14, fontWeight: 800, color: '#10B981', margin: '2px 0 0' }}>✨ {c.glowPoints || 100} pts</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: '#9A8E84' }}>
                    <span>📍 {c.city}, {c.state}</span>
                    <button
                      onClick={() => {
                        setSelectedCustomerForPoints(c);
                        setPointsAdjustment(100);
                      }}
                      style={{
                        background: 'none', border: 'none', color: '#C5A059', fontWeight: 700, cursor: 'pointer', padding: 0
                      }}
                    >
                      + Grant Points →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            TAB 6: COUPONS & PROMOTIONAL ENGINE
            ═══════════════════════════════════════════ */}
        {activeTab === 'coupons' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#C5A059' }}>
                  DISCOUNTS & REWARDS
                </span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#fff', marginTop: 4 }}>
                  Active Promotional Codes ({(coupons || []).length})
                </h2>
              </div>
              <button onClick={() => setIsCouponModalOpen(true)} style={S.btn('#C5A059', '#121212', { fontWeight: 800 })}>
                <Plus size={14} /> Create Coupon
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 20 }}>
              {(coupons || []).map(c => (
                <div
                  key={c.code}
                  style={{
                    ...S.card,
                    border: '1.5px dashed rgba(197,160,89,0.35)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 18, fontWeight: 800, color: '#C5A059', letterSpacing: '0.12em' }}>
                      {c.code}
                    </span>
                    <button
                      onClick={() => toggleCoupon(c.code)}
                      style={{
                        padding: '3px 8px', borderRadius: 20, fontSize: 9.5, fontWeight: 800, border: 'none', cursor: 'pointer',
                        background: c.active !== false ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                        color: c.active !== false ? '#34D399' : '#F87171'
                      }}
                    >
                      {c.active !== false ? 'ACTIVE' : 'PAUSED'}
                    </button>
                  </div>

                  <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', fontFamily: "'Playfair Display', serif", marginBottom: 6 }}>
                    {c.discountPercent ? `${c.discountPercent}% OFF` : `₹${c.fixedDiscount} FLAT OFF`}
                  </div>

                  <p style={{ fontSize: 11, color: '#9A8E84', marginBottom: 14 }}>
                    Min. spend: <strong>₹{c.minSpend?.toLocaleString('en-IN')}</strong> · Valid till {c.expiry}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontSize: 10, color: '#9A8E84' }}>Limit: {c.usageLimit || 1000} uses</span>
                    <button
                      onClick={() => deleteCoupon(c.code)}
                      style={{ background: 'none', border: 'none', color: '#F87171', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            TAB 7: CMS & STOREFRONT BUILDER
            ═══════════════════════════════════════════ */}
        {activeTab === 'cms' && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#C5A059' }}>
                DYNAMIC STOREFRONT CUSTOMIZER
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#fff', marginTop: 4 }}>
                Homepage Banners & Announcements
              </h2>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateCMSData(cmsForm);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <InputAdmin
                    label="Announcement Marquee Bar (Top Banner)"
                    value={cmsForm.announcementBar || ''}
                    onChange={(e) => setCmsForm({ ...cmsForm, announcementBar: e.target.value })}
                    placeholder="Complimentary Saffron Serum Sample on Orders Above ₹1,999"
                  />
                </div>

                <InputAdmin
                  label="Hero Section Heading"
                  value={cmsForm.heroHeading || ''}
                  onChange={(e) => setCmsForm({ ...cmsForm, heroHeading: e.target.value })}
                  placeholder="YOUR BEAUTY. YOUR GLOW. YOUR ZIVANA."
                />

                <InputAdmin
                  label="Hero Banner Image URL"
                  value={cmsForm.heroBannerImg || ''}
                  onChange={(e) => setCmsForm({ ...cmsForm, heroBannerImg: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                />

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={S.label}>Hero Subtitle & Brand Tagline</label>
                  <textarea
                    rows={2}
                    value={cmsForm.heroSubtitle || ''}
                    onChange={(e) => setCmsForm({ ...cmsForm, heroSubtitle: e.target.value })}
                    style={{ ...S.input, resize: 'vertical' }}
                    placeholder="Discover beauty essentials curated for your everyday glow..."
                  />
                </div>

                <InputAdmin
                  label="Featured Collection Title"
                  value={cmsForm.featuredCollectionTitle || ''}
                  onChange={(e) => setCmsForm({ ...cmsForm, featuredCollectionTitle: e.target.value })}
                  placeholder="EVERYDAY GLOW COLLECTION"
                />

                <InputAdmin
                  label="Brand Story Quote"
                  value={cmsForm.storyQuote || ''}
                  onChange={(e) => setCmsForm({ ...cmsForm, storyQuote: e.target.value })}
                  placeholder="ZIVANA brings together modern beauty and timeless Indian inspiration..."
                />
              </div>

              {/* Preset Image Gallery Picker */}
              <div>
                <label style={S.label}>Quick Luxury Hero Image Presets</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
                  {PRESET_IMAGES.map((img) => (
                    <div
                      key={img.label}
                      onClick={() => setCmsForm({ ...cmsForm, heroBannerImg: img.url })}
                      style={{
                        cursor: 'pointer', borderRadius: 12, overflow: 'hidden',
                        border: cmsForm.heroBannerImg === img.url ? '2px solid #C5A059' : '1px solid rgba(255,255,255,0.10)',
                        position: 'relative', height: 70
                      }}
                    >
                      <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.40)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', textAlign: 'center', padding: 2 }}>
                        {img.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                style={S.btn('#C5A059', '#121212', { fontWeight: 800, padding: '14px 28px', alignSelf: 'flex-start' })}
              >
                <CheckCircle2 size={16} /> Publish Storefront Changes
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════
          MODAL 1: ADD / EDIT PRODUCT
          ═══════════════════════════════════════════ */}
      {isProductModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)', zIndex: 999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: 20
        }}>
          <div style={{
            background: '#1A1815', borderRadius: 24, border: '1px solid rgba(197,160,89,0.30)',
            padding: 32, width: '100%', maxWidth: 680, maxHeight: '90vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div>
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C5A059' }}>
                  {editingProd ? 'UPDATE FORMULATION' : 'CREATE NEW PRODUCT'}
                </span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#fff', margin: '2px 0 0' }}>
                  {editingProd ? `Editing: ${editingProd.name}` : 'New Botanical Product'}
                </h3>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#9A8E84', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProd} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
                <InputAdmin
                  label="Product Title *"
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  placeholder="Kashmiri Saffron Glow Serum"
                  required
                />
                <div>
                  <label style={S.label}>Category</label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                    style={{ ...S.input, cursor: 'pointer' }}
                  >
                    {['Skincare', 'Makeup', 'Haircare', 'Body Care', 'Fragrance'].map(c => (
                      <option key={c} value={c} style={{ background: '#1E1E1E' }}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                <InputAdmin
                  label="Selling Price (₹) *"
                  type="number"
                  value={prodForm.price}
                  onChange={(e) => setProdForm({ ...prodForm, price: Number(e.target.value) })}
                  required
                />
                <InputAdmin
                  label="Original MRP (₹)"
                  type="number"
                  value={prodForm.originalPrice}
                  onChange={(e) => setProdForm({ ...prodForm, originalPrice: Number(e.target.value) })}
                />
                <InputAdmin
                  label="Stock Quantity *"
                  type="number"
                  value={prodForm.stock}
                  onChange={(e) => setProdForm({ ...prodForm, stock: Number(e.target.value) })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <InputAdmin
                  label="SKU Code"
                  value={prodForm.sku}
                  onChange={(e) => setProdForm({ ...prodForm, sku: e.target.value })}
                />
                <InputAdmin
                  label="Brand Name"
                  value={prodForm.brand}
                  onChange={(e) => setProdForm({ ...prodForm, brand: e.target.value })}
                />
              </div>

              <InputAdmin
                label="Image URL *"
                value={prodForm.image}
                onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                required
              />

              {/* Quick Image Selector */}
              <div>
                <span style={{ fontSize: 9.5, color: '#9A8E84', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                  Or Choose from Curated Luxury Images:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
                  {PRESET_IMAGES.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => setProdForm({ ...prodForm, image: img.url })}
                      style={{
                        padding: 0, height: 48, borderRadius: 8, overflow: 'hidden',
                        border: prodForm.image === img.url ? '2px solid #C5A059' : '1px solid rgba(255,255,255,0.10)',
                        cursor: 'pointer'
                      }}
                    >
                      <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={S.label}>Description & Story</label>
                <textarea
                  rows={2}
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  style={{ ...S.input, resize: 'vertical' }}
                  placeholder="Formulated with pure Ayurvedic saffron and cold-pressed botanicals..."
                />
              </div>

              <InputAdmin
                label="Key Active Ingredients (Comma-separated)"
                value={prodForm.ingredients}
                onChange={(e) => setProdForm({ ...prodForm, ingredients: e.target.value })}
                placeholder="Pure Kashmiri Saffron, Rosehip Oil, Bakuchiol, Vitamin C"
              />

              {/* Feature Badges Toggles */}
              <div style={{ display: 'flex', gap: 18, paddingTop: 4 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={prodForm.isBestSeller}
                    onChange={(e) => setProdForm({ ...prodForm, isBestSeller: e.target.checked })}
                    style={{ accentColor: '#C5A059' }}
                  />
                  <span>Mark as Best Seller ⭐</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={prodForm.isNewArrival}
                    onChange={(e) => setProdForm({ ...prodForm, isNewArrival: e.target.checked })}
                    style={{ accentColor: '#C5A059' }}
                  />
                  <span>Mark as New Arrival ✦</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: 10, paddingTop: 10 }}>
                <button
                  type="submit"
                  style={S.btn('#C5A059', '#121212', { fontWeight: 800, padding: '12px 24px' })}
                >
                  <Check size={14} /> {editingProd ? 'Save Updates' : 'Launch Formulation'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  style={S.btn('rgba(255,255,255,0.08)', '#fff')}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          MODAL 2: ORDER TAX INVOICE & DETAILS
          ═══════════════════════════════════════════ */}
      {selectedOrderForDetail && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)', zIndex: 999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: 20
        }}>
          <div style={{
            background: '#1A1815', borderRadius: 24, border: '1px solid rgba(197,160,89,0.30)',
            padding: 32, width: '100%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div>
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C5A059' }}>
                  TAX INVOICE & DISPATCH MANIFEST
                </span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#fff', margin: '2px 0 0' }}>
                  Order #{selectedOrderForDetail.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderForDetail(null)}
                style={{ background: 'none', border: 'none', color: '#9A8E84', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Customer & Courier Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: 14, marginBottom: 18 }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#C5A059', textTransform: 'uppercase' }}>Customer Details</span>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: '4px 0 2px' }}>{selectedOrderForDetail.customer?.name || 'Customer'}</p>
                <p style={{ fontSize: 11, color: '#9A8E84', margin: 0 }}>{selectedOrderForDetail.customer?.phone}</p>
                <p style={{ fontSize: 11, color: '#9A8E84', margin: 0 }}>{selectedOrderForDetail.customer?.email}</p>
                <p style={{ fontSize: 11, color: '#D4C9BA', margin: '4px 0 0' }}>{selectedOrderForDetail.customer?.address}, {selectedOrderForDetail.customer?.city} — {selectedOrderForDetail.customer?.pincode}</p>
              </div>

              <div>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#C5A059', textTransform: 'uppercase' }}>Fulfillment & Logistics</span>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#fff', margin: '4px 0 2px' }}>Courier: {selectedOrderForDetail.courier || 'Bluedart Express'}</p>
                <p style={{ fontSize: 11, fontFamily: 'monospace', color: '#C5A059', margin: 0 }}>AWB: {selectedOrderForDetail.trackingId || 'AWB-IN-994812'}</p>
                <p style={{ fontSize: 11, color: '#9A8E84', margin: '4px 0 0' }}>Payment: {selectedOrderForDetail.paymentMethod} ({selectedOrderForDetail.paymentStatus || 'Paid'})</p>
                <p style={{ fontSize: 11, color: '#9A8E84', margin: 0 }}>Date Placed: {selectedOrderForDetail.date}</p>
              </div>
            </div>

            {/* Order Items */}
            <div style={{ marginBottom: 18 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#9A8E84', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                Line Items
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(selectedOrderForDetail.items || []).map((it, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src={it.image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800'} alt="" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }} />
                      <div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{it.name}</span>
                        <span style={{ fontSize: 10, color: '#9A8E84', display: 'block' }}>Qty: {it.quantity || 1} × ₹{it.price?.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#C5A059' }}>
                      ₹{((it.price || 0) * (it.quantity || 1)).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Summary */}
            <div style={{ padding: '14px', background: 'rgba(197,160,89,0.08)', borderRadius: 12, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9A8E84', marginBottom: 4 }}>
                <span>Subtotal:</span>
                <span>₹{selectedOrderForDetail.subtotal?.toLocaleString('en-IN') || selectedOrderForDetail.total}</span>
              </div>
              {selectedOrderForDetail.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#10B981', marginBottom: 4 }}>
                  <span>Discount Applied:</span>
                  <span>-₹{selectedOrderForDetail.discount?.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 800, color: '#fff', paddingTop: 6, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <span>Final Total Paid:</span>
                <span style={{ color: '#C5A059' }}>₹{selectedOrderForDetail.total?.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={() => {
                  deleteOrder(selectedOrderForDetail.id);
                  setSelectedOrderForDetail(null);
                }}
                style={{ ...S.btn('rgba(239,68,68,0.15)', '#F87171', { border: '1px solid rgba(239,68,68,0.30)' }) }}
              >
                Delete Order Record
              </button>

              <button
                onClick={() => {
                  window.print();
                }}
                style={S.btn('#C5A059', '#121212', { fontWeight: 800 })}
              >
                Print / Download Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          MODAL 3: CREATE PROMOTIONAL COUPON
          ═══════════════════════════════════════════ */}
      {isCouponModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)', zIndex: 999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: 20
        }}>
          <div style={{
            background: '#1A1815', borderRadius: 24, border: '1px solid rgba(197,160,89,0.30)',
            padding: 32, width: '100%', maxWidth: 460
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 }}>
                Create Promotional Code
              </h3>
              <button onClick={() => setIsCouponModalOpen(false)} style={{ background: 'none', border: 'none', color: '#9A8E84', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCoupon} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <InputAdmin
                label="Coupon Code *"
                value={couponForm.code}
                onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                placeholder="ROYAL20 or FESTIVE500"
                required
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <InputAdmin
                  label="Discount %"
                  type="number"
                  value={couponForm.discountPercent}
                  onChange={(e) => setCouponForm({ ...couponForm, discountPercent: Number(e.target.value) })}
                  required
                />
                <InputAdmin
                  label="Min. Spend (₹)"
                  type="number"
                  value={couponForm.minSpend}
                  onChange={(e) => setCouponForm({ ...couponForm, minSpend: Number(e.target.value) })}
                  required
                />
              </div>

              <InputAdmin
                label="Expiration Date"
                type="date"
                value={couponForm.expiry}
                onChange={(e) => setCouponForm({ ...couponForm, expiry: e.target.value })}
                required
              />

              <div style={{ display: 'flex', gap: 10, paddingTop: 10 }}>
                <button type="submit" style={S.btn('#C5A059', '#121212', { fontWeight: 800 })}>
                  Launch Coupon
                </button>
                <button type="button" onClick={() => setIsCouponModalOpen(false)} style={S.btn('rgba(255,255,255,0.08)', '#fff')}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          MODAL 4: GRANT CUSTOMER GLOW POINTS
          ═══════════════════════════════════════════ */}
      {selectedCustomerForPoints && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)', zIndex: 999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: 20
        }}>
          <div style={{
            background: '#1A1815', borderRadius: 24, border: '1px solid rgba(197,160,89,0.30)',
            padding: 30, width: '100%', maxWidth: 420
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#fff', margin: 0 }}>
                Reward Glow Points
              </h3>
              <button onClick={() => setSelectedCustomerForPoints(null)} style={{ background: 'none', border: 'none', color: '#9A8E84', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <p style={{ fontSize: 12, color: 'rgba(232,223,213,0.80)', marginBottom: 16 }}>
              Grant VIP Glow Points directly to <strong>{selectedCustomerForPoints.name}</strong> ({selectedCustomerForPoints.email}).
            </p>

            <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
              {[50, 100, 250, 500].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setPointsAdjustment(amt)}
                  style={{
                    flex: 1, padding: '10px 6px', borderRadius: 10, fontSize: 12, fontWeight: 800,
                    border: pointsAdjustment === amt ? '2px solid #C5A059' : '1px solid rgba(255,255,255,0.10)',
                    background: pointsAdjustment === amt ? 'rgba(197,160,89,0.20)' : 'rgba(255,255,255,0.04)',
                    color: pointsAdjustment === amt ? '#C5A059' : '#fff', cursor: 'pointer'
                  }}
                >
                  +{amt}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                updateCustomerPoints(selectedCustomerForPoints.id, pointsAdjustment);
                setSelectedCustomerForPoints(null);
              }}
              style={S.btn('#C5A059', '#121212', { width: '100%', fontWeight: 800 })}
            >
              Grant +{pointsAdjustment} Glow Points Now
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
