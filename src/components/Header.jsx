import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, LayoutDashboard, Sparkles, LogIn, LogOut, Crown } from 'lucide-react';

export const Header = () => {
  const { currentView, navigateTo, cart, wishlist, user, logoutUser, cms, searchQuery, setSearchQuery, setSelectedCategory } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const cartCount = cart.reduce((a, i) => a + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const categories = [
    { label: 'Skincare', cat: 'Skincare' },
    { label: 'Makeup', cat: 'Makeup' },
    { label: 'Haircare', cat: 'Haircare' },
    { label: 'Body Care', cat: 'Body Care' },
    { label: 'Fragrance', cat: 'Fragrance' },
    { label: 'New Arrivals', cat: 'New' },
    { label: 'Offers', cat: 'Offers' },
  ];

  const goShop = (cat) => { setSelectedCategory(cat); navigateTo('shop'); setMobileOpen(false); };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Announcement Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #121212 0%, #1a1208 50%, #121212 100%)',
        color: '#E8DFD5', fontSize: 11, letterSpacing: '0.12em', padding: '9px 20px',
        textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 8, borderBottom: '1px solid rgba(197,160,89,0.20)'
      }}>
        <Sparkles size={12} color="#C5A059" />
        <span style={{ fontWeight: 500 }}>{cms.announcementBar || 'Premium Beauty Essentials — Delivered Across India'}</span>
        <span style={{ color: 'rgba(197,160,89,0.5)', margin: '0 6px' }}>|</span>
        <span style={{ color: '#C5A059', fontWeight: 600 }}>Free Shipping Above ₹999</span>
      </div>

      {/* Main Nav */}
      <div style={{
        background: scrolled ? 'rgba(253,251,247,0.97)' : '#FDFBF7',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E8DFD5',
        boxShadow: scrolled ? '0 2px 20px rgba(28,25,23,0.08)' : 'none',
        transition: 'box-shadow 0.3s ease'
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: 72, gap: 32 }}>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileOpen(true)} style={{ display: 'none', padding: 6, color: '#121212' }} className="mobile-menu-toggle">
            <Menu size={22} />
          </button>

          {/* Logo */}
          <div onClick={() => navigateTo('home')} style={{ cursor: 'pointer', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 26, fontWeight: 800,
                letterSpacing: '0.25em', color: '#121212',
                lineHeight: 1
              }}>ZIVANA</span>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#C5A059', marginBottom: 1 }} />
            </div>
            <span style={{ fontSize: 8.5, letterSpacing: '0.18em', color: '#9A8E84', textTransform: 'uppercase', fontWeight: 600, marginTop: 2 }}>
              A brand by <strong style={{ color: '#6B635B' }}>NOEUL ENTERPRISES</strong>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 28, flex: 1 }} className="desktop-nav">
            <button onClick={() => navigateTo('home')} style={{
              fontSize: 12, fontWeight: currentView === 'home' ? 700 : 500,
              color: currentView === 'home' ? '#C5A059' : '#3D3530',
              letterSpacing: '0.04em', padding: '4px 0',
              borderBottom: currentView === 'home' ? '2px solid #C5A059' : '2px solid transparent',
              transition: 'color 0.2s, border-color 0.2s'
            }}>Home</button>

            <button onClick={() => goShop('All')} style={{
              fontSize: 12, fontWeight: 500, color: '#3D3530',
              letterSpacing: '0.04em', padding: '4px 0',
              borderBottom: '2px solid transparent',
              transition: 'color 0.2s'
            }}
            onMouseEnter={e => { e.target.style.color = '#C5A059'; }}
            onMouseLeave={e => { e.target.style.color = '#3D3530'; }}>Shop</button>

            {categories.slice(0, 5).map(c => (
              <button key={c.cat} onClick={() => goShop(c.cat)} style={{
                fontSize: 12, fontWeight: 500, color: '#3D3530',
                letterSpacing: '0.04em', padding: '4px 0',
                borderBottom: '2px solid transparent',
                transition: 'color 0.2s', whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => { e.target.style.color = '#C5A059'; }}
              onMouseLeave={e => { e.target.style.color = '#3D3530'; }}>{c.label}</button>
            ))}

            <button onClick={() => goShop('New')} style={{
              fontSize: 11, fontWeight: 700, color: '#C5A059',
              letterSpacing: '0.08em', padding: '3px 10px',
              background: 'rgba(197,160,89,0.10)',
              border: '1px solid rgba(197,160,89,0.30)',
              borderRadius: 20, whiteSpace: 'nowrap'
            }}>NEW ✦</button>

            <button onClick={() => goShop('Offers')} style={{
              fontSize: 11, fontWeight: 700, color: '#8C2D38',
              letterSpacing: '0.08em', padding: '3px 10px',
              background: 'rgba(140,45,56,0.08)',
              border: '1px solid rgba(140,45,56,0.25)',
              borderRadius: 20
            }}>OFFERS</button>
          </nav>

          {/* Right Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
            {/* Search */}
            <button onClick={() => setSearchOpen(s => !s)} style={{
              width: 38, height: 38, borderRadius: '50%', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: '#3D3530', transition: 'all 0.18s ease',
              background: searchOpen ? '#F7F3EE' : 'transparent'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F7F3EE'; e.currentTarget.style.color = '#C5A059'; }}
            onMouseLeave={e => { e.currentTarget.style.background = searchOpen ? '#F7F3EE' : 'transparent'; e.currentTarget.style.color = '#3D3530'; }}>
              <Search size={18} />
            </button>

            {/* Wishlist */}
            <button onClick={() => navigateTo('wishlist')} style={{
              width: 38, height: 38, borderRadius: '50%', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: '#3D3530', position: 'relative', transition: 'all 0.18s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F7F3EE'; e.currentTarget.style.color = '#C5A059'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#3D3530'; }}>
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute', top: 4, right: 4, width: 16, height: 16,
                  background: '#C5A059', color: '#fff', borderRadius: '50%',
                  fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid #FDFBF7'
                }}>{wishlist.length}</span>
              )}
            </button>

            {/* Account Dropdown */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setAccountOpen(o => !o)} style={{
                width: 38, height: 38, borderRadius: '50%', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                color: user?.isLoggedIn ? '#C5A059' : '#3D3530', transition: 'all 0.18s ease',
                background: accountOpen ? '#F7F3EE' : user?.isLoggedIn ? 'rgba(197,160,89,0.12)' : 'transparent',
                border: user?.isLoggedIn ? '1px solid rgba(197,160,89,0.30)' : '1px solid transparent'
              }}
              title={user?.isLoggedIn ? `${user.name} (Account)` : 'Sign In'}
              onMouseEnter={e => { e.currentTarget.style.background = '#F7F3EE'; e.currentTarget.style.color = '#C5A059'; }}
              onMouseLeave={e => { e.currentTarget.style.background = accountOpen ? '#F7F3EE' : user?.isLoggedIn ? 'rgba(197,160,89,0.12)' : 'transparent'; e.currentTarget.style.color = user?.isLoggedIn ? '#C5A059' : '#3D3530'; }}>
                {user?.isLoggedIn ? (
                  <span style={{ fontSize: 13, fontWeight: 800, fontFamily: "'Playfair Display', serif" }}>
                    {user.name?.[0] || 'Z'}
                  </span>
                ) : (
                  <User size={18} />
                )}
              </button>

              {accountOpen && (
                <div style={{
                  position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                  background: '#fff', borderRadius: 18, border: '1px solid #E8DFD5',
                  boxShadow: '0 20px 48px -8px rgba(28,25,23,0.18)',
                  padding: '12px', width: 220, zIndex: 200,
                  animation: 'fadeIn 0.2s ease both'
                }}>
                  {user?.isLoggedIn ? (
                    <>
                      <div style={{ padding: '8px 12px 12px', borderBottom: '1px solid #F4EFEA', marginBottom: 6 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                          <p style={{ fontSize: 12, fontWeight: 700, color: '#121212' }}>{user.name}</p>
                          <span style={{ fontSize: 9, fontWeight: 800, color: '#C5A059', background: 'rgba(197,160,89,0.15)', padding: '1px 6px', borderRadius: 10 }}>PRIVÉ</span>
                        </div>
                        <p style={{ fontSize: 10, color: '#9A8E84' }}>{user.email}</p>
                      </div>
                      {[
                        { label: 'My Orders', view: 'account' },
                        { label: 'My Profile', view: 'account' },
                        { label: 'Wishlist', view: 'wishlist' },
                      ].map(item => (
                        <button key={item.label} onClick={() => { navigateTo(item.view); setAccountOpen(false); }} style={{
                          display: 'block', width: '100%', padding: '9px 12px',
                          textAlign: 'left', fontSize: 12, fontWeight: 500,
                          color: '#3D3530', borderRadius: 10, transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#F7F3EE'; e.currentTarget.style.color = '#C5A059'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#3D3530'; }}>
                          {item.label}
                        </button>
                      ))}
                      <button onClick={() => { navigateTo('admin'); setAccountOpen(false); }} style={{
                        display: 'flex', alignItems: 'center', gap: 6, width: '100%',
                        padding: '9px 12px', textAlign: 'left', fontSize: 11,
                        fontWeight: 700, color: '#C5A059', borderRadius: 10,
                        background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.20)',
                        margin: '6px 0', letterSpacing: '0.04em', transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#121212'; e.currentTarget.style.color = '#C5A059'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(197,160,89,0.08)'; e.currentTarget.style.color = '#C5A059'; }}>
                        <LayoutDashboard size={13} /> Admin Dashboard
                      </button>
                      <button onClick={() => { logoutUser(); setAccountOpen(false); }} style={{
                        display: 'flex', alignItems: 'center', gap: 6, width: '100%',
                        padding: '8px 12px', textAlign: 'left', fontSize: 11,
                        fontWeight: 600, color: '#8C2D38', borderRadius: 10,
                        borderTop: '1px solid #F4EFEA', marginTop: 4, transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(140,45,56,0.08)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                        <LogOut size={13} /> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <div style={{ padding: '8px 10px 12px', borderBottom: '1px solid #F4EFEA', marginBottom: 8, textAlign: 'center' }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: '#121212' }}>Welcome to ZIVANA</p>
                        <p style={{ fontSize: 10, color: '#9A8E84', marginTop: 2 }}>Sign in to access your Privé privileges</p>
                      </div>
                      <button onClick={() => { navigateTo('login'); setAccountOpen(false); }} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        width: '100%', padding: '11px', background: '#121212', color: '#fff',
                        borderRadius: 12, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                        border: 'none', cursor: 'pointer', transition: 'all 0.18s ease', marginBottom: 6
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#C5A059'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#121212'; }}>
                        <LogIn size={14} /> SIGN IN / REGISTER
                      </button>
                      <button onClick={() => { navigateTo('admin'); setAccountOpen(false); }} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%',
                        padding: '8px 12px', fontSize: 11, fontWeight: 600, color: '#6B635B',
                        borderRadius: 10, background: 'transparent', border: 'none', cursor: 'pointer'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#C5A059'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#6B635B'; }}>
                        <LayoutDashboard size={13} /> Admin Portal
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <button onClick={() => navigateTo('cart')} style={{
              position: 'relative', width: 42, height: 42, borderRadius: '50%',
              background: '#121212', color: '#fff', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.20s ease', boxShadow: '0 2px 8px rgba(18,18,18,0.25)', marginLeft: 4
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#C5A059'; e.currentTarget.style.transform = 'scale(1.07)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#121212'; e.currentTarget.style.transform = 'scale(1)'; }}>
              <ShoppingBag size={17} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: -2, right: -2, width: 19, height: 19,
                  background: '#C5A059', color: '#fff', borderRadius: '50%',
                  fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid #FDFBF7'
                }}>{cartCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div style={{ background: '#F7F3EE', borderTop: '1px solid #E8DFD5', padding: '14px 24px', animation: 'fadeIn 0.25s ease' }}>
            <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#9A8E84' }} />
              <input
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { setSelectedCategory('All'); navigateTo('shop'); setSearchOpen(false); }}}
                placeholder="Search serums, lipsticks, oudh, rose water..."
                style={{
                  width: '100%', padding: '13px 110px 13px 44px',
                  background: '#fff', border: '1.5px solid #E8DFD5',
                  borderRadius: 40, fontSize: 13, color: '#121212',
                  outline: 'none', transition: 'border-color 0.2s'
                }}
                onFocus={e => { e.target.style.borderColor = '#C5A059'; }}
                onBlur={e => { e.target.style.borderColor = '#E8DFD5'; }}
              />
              <button onClick={() => { setSelectedCategory('All'); navigateTo('shop'); setSearchOpen(false); }} style={{
                position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
                background: '#121212', color: '#fff', padding: '8px 18px',
                borderRadius: 30, fontSize: 10, fontWeight: 700, letterSpacing: '0.10em',
                transition: 'background 0.18s'
              }}>SEARCH</button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300 }}>
          <div onClick={() => setMobileOpen(false)} style={{
            position: 'absolute', inset: 0,
            background: 'rgba(18,18,18,0.55)',
            backdropFilter: 'blur(4px)'
          }} />
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: 'min(82vw, 340px)',
            background: '#FDFBF7',
            padding: '28px 24px',
            display: 'flex', flexDirection: 'column', gap: 0,
            boxShadow: '4px 0 40px rgba(18,18,18,0.20)',
            animation: 'slideInLeft 0.3s ease both', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, letterSpacing: '0.20em', color: '#121212' }}>ZIVANA</div>
                <div style={{ fontSize: 8, letterSpacing: '0.18em', color: '#9A8E84', textTransform: 'uppercase' }}>by NOEUL ENTERPRISES</div>
              </div>
              <button onClick={() => setMobileOpen(false)} style={{ color: '#121212', marginTop: 2 }}>
                <X size={20} />
              </button>
            </div>

            {[{ label: 'Home', action: () => navigateTo('home') }, { label: 'All Products', action: () => goShop('All') },
              ...categories.map(c => ({ label: c.label, action: () => goShop(c.cat) }))
            ].map((link, i) => (
              <button key={i} onClick={() => { link.action(); setMobileOpen(false); }} style={{
                width: '100%', textAlign: 'left', padding: '14px 0',
                fontSize: 14, fontWeight: 500, color: '#3D3530',
                borderBottom: '1px solid #F4EFEA',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                {link.label}
                <span style={{ color: '#C5A059', fontSize: 16 }}>›</span>
              </button>
            ))}

            {user?.isLoggedIn ? (
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #E8DFD5' }}>
                <div style={{ padding: '8px 0 12px' }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#121212' }}>{user.name}</p>
                  <p style={{ fontSize: 10, color: '#9A8E84' }}>{user.email}</p>
                </div>
                <button onClick={() => { navigateTo('account'); setMobileOpen(false); }} style={{
                  width: '100%', padding: '12px', background: '#F7F3EE', color: '#121212',
                  borderRadius: 12, fontSize: 12, fontWeight: 700, marginBottom: 8,
                  border: '1px solid #E8DFD5', textAlign: 'center'
                }}>
                  MY ACCOUNT & ORDERS
                </button>
                <button onClick={() => { logoutUser(); setMobileOpen(false); }} style={{
                  width: '100%', padding: '10px', background: 'transparent', color: '#8C2D38',
                  borderRadius: 12, fontSize: 11, fontWeight: 700, border: 'none', textAlign: 'center'
                }}>
                  SIGN OUT
                </button>
              </div>
            ) : (
              <button onClick={() => { navigateTo('login'); setMobileOpen(false); }} style={{
                marginTop: 20, width: '100%', padding: '14px',
                background: '#121212', color: '#fff',
                borderRadius: 12, fontSize: 11, fontWeight: 700,
                letterSpacing: '0.08em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}>
                <LogIn size={15} /> SIGN IN / REGISTER
              </button>
            )}

            <button onClick={() => { navigateTo('admin'); setMobileOpen(false); }} style={{
              marginTop: 10, width: '100%', padding: '12px',
              background: 'rgba(197,160,89,0.10)', color: '#C5A059', border: '1px solid rgba(197,160,89,0.25)',
              borderRadius: 12, fontSize: 11, fontWeight: 700,
              letterSpacing: '0.08em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
            }}>
              <LayoutDashboard size={14} /> ADMIN DASHBOARD
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
};
