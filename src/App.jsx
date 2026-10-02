import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { BestSellers } from './components/BestSellers';
import { FeaturedCollection } from './components/FeaturedCollection';
import { OffersSection } from './components/OffersSection';
import { CustomerReviews } from './components/CustomerReviews';
import { InstagramSection } from './components/InstagramSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { AccountPage } from './components/AccountPage';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const ToastNotification = ({ toast }) => (
  <div style={{ position:'fixed', bottom:28, right:28, zIndex:9999, animation:'fadeIn 0.3s ease both' }}>
    <div style={{
      display:'flex', alignItems:'center', gap:10, padding:'14px 20px', borderRadius:18,
      backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
      border:'1px solid rgba(255,255,255,0.15)',
      boxShadow:'0 20px 48px rgba(18,18,18,0.35)',
      fontSize:12, fontWeight:700, minWidth:240, maxWidth:380,
      background: toast.type==='error' ? 'rgba(80,12,20,0.92)' : 'rgba(18,18,18,0.92)',
      color: toast.type==='error' ? '#FCA5A5' : toast.type==='info' ? '#fff' : '#C5A059'
    }}>
      {toast.type==='error' ? <AlertCircle size={16} color="#F87171" />
        : toast.type==='info' ? <Info size={16} color="#93C5FD" />
        : <CheckCircle2 size={16} color="#C5A059" />}
      <span>{toast.message}</span>
    </div>
  </div>
);

const MainContent = () => {
  const { currentView, toast } = useApp();
  if (currentView === 'admin') {
    return (
      <div style={{ position:'relative', minHeight:'100vh' }}>
        {toast && <ToastNotification toast={toast} />}
        <AdminDashboard />
      </div>
    );
  }
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'#FDFBF7' }}>
      {toast && <ToastNotification toast={toast} />}
      <Header />
      <main style={{ flex:1 }}>
        {currentView==='home' && (<>
          <Hero />
          <Categories />
          <BestSellers />
          <FeaturedCollection />
          <OffersSection />
          <CustomerReviews />
          <InstagramSection />
          <Newsletter />
        </>)}
        {currentView==='shop' && <ShopPage />}
        {currentView==='product-detail' && <ProductDetailPage />}
        {currentView==='cart' && <CartPage />}
        {currentView==='checkout' && <CheckoutPage />}
        {currentView==='login' && <LoginPage />}
        {(currentView==='account'||currentView==='wishlist') && <AccountPage />}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return <AppProvider><MainContent /></AppProvider>;
}
