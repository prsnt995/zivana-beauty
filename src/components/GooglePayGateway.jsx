import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, CheckCircle2, QrCode, Smartphone, Zap, Lock, ArrowRight, ExternalLink, RefreshCw, AlertCircle, X, Sparkles } from 'lucide-react';

// Google Pay Official SVG Logo
export const GooglePayLogo = ({ height = 24, variant = 'dark' }) => (
  <svg height={height} viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle', display: 'inline-block' }}>
    {/* Google G */}
    <path d="M19.5 20.2c0-.7-.06-1.4-.18-2H10v3.8h5.3c-.23 1.25-.94 2.3-2 3v2.5h3.2c1.9-1.75 3-4.35 3-7.3z" fill="#4285F4" />
    <path d="M10 29.8c2.7 0 4.96-.9 6.6-2.4l-3.2-2.5c-.9.6-2.05 1-3.4 1-2.6 0-4.8-1.75-5.6-4.1H1.1v2.6C2.8 27.8 6.1 29.8 10 29.8z" fill="#34A853" />
    <path d="M4.4 21.8c-.2-.6-.3-1.25-.3-1.8s.1-1.2.3-1.8v-2.6H1.1C.4 16.9 0 18.4 0 20s.4 3.1 1.1 4.4l3.3-2.6z" fill="#FBBC05" />
    <path d="M10 13.9c1.47 0 2.8.5 3.84 1.5l2.88-2.88C15 10.7 12.7 9.8 10 9.8c-3.9 0-7.2 2-8.9 5.4l3.3 2.6c.8-2.35 3-3.9 5.6-3.9z" fill="#EA4335" />
    {/* "Pay" text */}
    <path d="M30.5 13.5h-5.2v16.1h3.3v-5.8h1.9c3.2 0 5.6-2.2 5.6-5.15s-2.4-5.15-5.6-5.15zm.1 7.2h-2v-4.1h2c1.5 0 2.4.9 2.4 2.05s-.9 2.05-2.4 2.05z" fill={variant === 'light' ? '#FFFFFF' : '#3C4043'} />
    <path d="M42.2 18.2c-2.3 0-4.1 1.7-4.1 4.2 0 2.4 1.8 4.2 4.1 4.2 1.2 0 2.2-.5 2.8-1.4v1.2h3.2V13.5H45v4.9c-.6-.9-1.6-1.4-2.8-1.4zm.5 5.5c-1.2 0-2.1-.9-2.1-2.1 0-1.2.9-2.1 2.1-2.1s2.1.9 2.1 2.1c0 1.2-.9 2.1-2.1 2.1z" fill={variant === 'light' ? '#FFFFFF' : '#3C4043'} />
    <path d="M57.9 18.4l-3.8 8.8h-3.4l1.4-3.1-3.7-8.7h3.6l1.9 4.8 1.9-4.8h3.6l-1.9 4.8z" fill={variant === 'light' ? '#FFFFFF' : '#3C4043'} />
  </svg>
);

// Google Pay Interactive Gateway Component
export const GooglePayGateway = ({
  total,
  customerData,
  onPaymentSuccess,
  isProcessing,
  setIsProcessing,
  showToast
}) => {
  const [gpayTab, setGpayTab] = useState('oneclick'); // 'oneclick' | 'upi_id' | 'qr' | 'phone'
  const [gpayUpiId, setGpayUpiId] = useState('');
  const [gpayPhone, setGpayPhone] = useState(customerData?.phone || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState('confirm'); // 'confirm' | 'pin' | 'processing' | 'success'
  const [pinDigits, setPinDigits] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(300); // 5 min countdown for QR
  const [qrScanned, setQrScanned] = useState(false);
  const gpayBtnContainerRef = useRef(null);

  // Common Google Pay UPI handle extensions
  const GPAY_HANDLES = ['@oksbi', '@okhdfcbank', '@okaxis', '@okicici', '@paytm', '@upi'];

  // Countdown timer for QR code
  useEffect(() => {
    if (gpayTab !== 'qr') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [gpayTab]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Attempt Google Pay Web API Native Integration
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initGooglePay = () => {
      if (window.google && window.google.payments && window.google.payments.api) {
        try {
          const paymentsClient = new window.google.payments.api.PaymentsClient({
            environment: 'TEST'
          });

          const isReadyToPayRequest = {
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
              {
                type: 'CARD',
                parameters: {
                  allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                  allowedCardNetworks: ['MASTERCARD', 'VISA']
                }
              }
            ]
          };

          paymentsClient.isReadyToPay(isReadyToPayRequest)
            .then((response) => {
              if (response.result && gpayBtnContainerRef.current) {
                gpayBtnContainerRef.current.innerHTML = '';
                const button = paymentsClient.createButton({
                  buttonColor: 'black',
                  buttonType: 'buy',
                  buttonSizeMode: 'fill',
                  onClick: () => triggerGooglePayFlow('Google Pay Web API')
                });
                gpayBtnContainerRef.current.appendChild(button);
              }
            })
            .catch(() => {
              // Graceful fallback to rich interactive UI
            });
        } catch (e) {
          console.log('GPay API init fallback mode');
        }
      }
    };

    if (window.google?.payments?.api) {
      initGooglePay();
    } else {
      const checkInterval = setInterval(() => {
        if (window.google?.payments?.api) {
          initGooglePay();
          clearInterval(checkInterval);
        }
      }, 500);
      setTimeout(() => clearInterval(checkInterval), 4000);
    }
  }, []);

  // Trigger Google Pay Flow
  const triggerGooglePayFlow = (source = '1-Click') => {
    if (!customerData?.fullName || !customerData?.phone || !customerData?.address) {
      showToast?.('Please complete your delivery details in Step 1 first', 'error');
      return;
    }
    setModalStep('confirm');
    setIsModalOpen(true);
  };

  const handleUpiSubmit = (e) => {
    e?.preventDefault();
    if (!gpayUpiId || !gpayUpiId.includes('@')) {
      showToast?.('Please enter a valid Google Pay UPI ID (e.g. yourname@oksbi)', 'error');
      return;
    }
    triggerGooglePayFlow(`Google Pay UPI (${gpayUpiId})`);
  };

  const handlePhoneSubmit = (e) => {
    e?.preventDefault();
    const clean = gpayPhone.replace(/\D/g, '');
    if (clean.length < 10) {
      showToast?.('Please enter a valid 10-digit Google Pay mobile number', 'error');
      return;
    }
    triggerGooglePayFlow(`Google Pay Mobile (+91 ${clean})`);
  };

  // Process Confirmation in Modal
  const handleProceedToPin = () => {
    setModalStep('pin');
    setPinDigits(['', '', '', '']);
  };

  const handlePinInput = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newDigits = [...pinDigits];
    newDigits[index] = value;
    setPinDigits(newDigits);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`gpay-pin-${index + 1}`);
      nextInput?.focus();
    }

    // When all 4 digits entered, auto submit payment
    if (newDigits.every(d => d !== '') && index === 3) {
      executePayment();
    }
  };

  const executePayment = () => {
    setModalStep('processing');
    setTimeout(() => {
      setModalStep('success');
      setTimeout(() => {
        setIsModalOpen(false);
        onPaymentSuccess?.({
          method: 'Google Pay',
          subMethod: gpayTab,
          transactionId: `GPA.${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10000 + Math.random() * 90000)}`,
          upiId: gpayUpiId || 'customer@oksbi',
          timestamp: new Date().toISOString()
        });
      }, 1500);
    }, 2000);
  };

  return (
    <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8DFD5', overflow: 'hidden' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #121212 0%, #1F1F1F 100%)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            background: '#fff',
            padding: '5px 12px',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}>
            <GooglePayLogo height={20} variant="dark" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.02em' }}>
                Google Pay Instant Gateway
              </span>
              <span style={{
                background: '#C5A059',
                color: '#fff',
                fontSize: 9,
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: 12,
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                FAST & SECURE
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 2 }}>
              Verified Merchant: <strong style={{ color: '#C5A059' }}>NOEUL ENTERPRISES</strong> (ZIVANA)
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#4ADE80', fontSize: 11, fontWeight: 600 }}>
          <ShieldCheck size={15} />
          <span>Google 256-Bit Protection</span>
        </div>
      </div>

      {/* GPay Sub-methods Navigation Tabs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        background: '#F7F3EE',
        padding: 6,
        gap: 6,
        borderBottom: '1px solid #E8DFD5'
      }}>
        {[
          { id: 'oneclick', label: '1-Click GPay', icon: <Zap size={13} color={gpayTab === 'oneclick' ? '#C5A059' : '#6B635B'} /> },
          { id: 'upi_id', label: 'GPay UPI ID', icon: <Smartphone size={13} color={gpayTab === 'upi_id' ? '#C5A059' : '#6B635B'} /> },
          { id: 'qr', label: 'Scan & Pay', icon: <QrCode size={13} color={gpayTab === 'qr' ? '#C5A059' : '#6B635B'} /> },
          { id: 'phone', label: 'Mobile No.', icon: <Smartphone size={13} color={gpayTab === 'phone' ? '#C5A059' : '#6B635B'} /> }
        ].map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setGpayTab(t.id)}
            style={{
              padding: '10px 6px',
              borderRadius: 10,
              border: 'none',
              background: gpayTab === t.id ? '#fff' : 'transparent',
              color: gpayTab === t.id ? '#121212' : '#6B635B',
              fontSize: 11,
              fontWeight: gpayTab === t.id ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              boxShadow: gpayTab === t.id ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div style={{ padding: '24px 20px' }}>
        {/* TAB 1: 1-Click Instant Google Pay */}
        {gpayTab === 'oneclick' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#121212', marginBottom: 4 }}>
                Instant 1-Click Payment via Google Pay
              </p>
              <p style={{ fontSize: 11, color: '#6B635B' }}>
                Use your linked bank account or card saved in your Google Account for zero-wait checkout.
              </p>
            </div>

            {/* Official GPay Native / Styled Button */}
            <div style={{ maxWidth: 360, margin: '0 auto' }}>
              <div ref={gpayBtnContainerRef} style={{ marginBottom: 12 }}>
                <button
                  type="button"
                  onClick={() => triggerGooglePayFlow('1-Click Button')}
                  disabled={isProcessing}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    background: '#121212',
                    color: '#fff',
                    border: '1px solid #333',
                    borderRadius: 30,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.15)'; }}
                >
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#fff', letterSpacing: '0.04em' }}>
                    Pay ₹{total.toLocaleString('en-IN')} with
                  </span>
                  <div style={{ background: '#fff', padding: '3px 8px', borderRadius: 6, display: 'inline-flex', alignItems: 'center' }}>
                    <GooglePayLogo height={18} variant="dark" />
                  </div>
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#6B635B' }}>
                  <CheckCircle2 size={12} color="#2D6A4F" /> No OTP required
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#6B635B' }}>
                  <CheckCircle2 size={12} color="#2D6A4F" /> Instant refund protection
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Google Pay UPI ID */}
        {gpayTab === 'upi_id' && (
          <form onSubmit={handleUpiSubmit}>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#121212', marginBottom: 8 }}>
              Enter your Google Pay UPI ID / VPA
            </p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <input
                type="text"
                value={gpayUpiId}
                onChange={e => setGpayUpiId(e.target.value.toLowerCase())}
                placeholder="e.g. yourname@oksbi"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: '#F7F3EE',
                  border: '1.5px solid #E8DFD5',
                  borderRadius: 12,
                  fontSize: 13,
                  outline: 'none',
                  color: '#121212'
                }}
                onFocus={e => { e.target.style.borderColor = '#C5A059'; e.target.style.background = '#fff'; }}
                onBlur={e => { e.target.style.borderColor = '#E8DFD5'; e.target.style.background = '#F7F3EE'; }}
              />
              <button
                type="submit"
                style={{
                  padding: '12px 20px',
                  background: '#121212',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#C5A059'}
                onMouseLeave={e => e.currentTarget.style.background = '#121212'}
              >
                Verify & Pay
              </button>
            </div>

            {/* Quick GPay handles selector */}
            <div style={{ marginTop: 8 }}>
              <span style={{ fontSize: 10, color: '#9A8E84', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Quick Handle Suffixes:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                {GPAY_HANDLES.map(h => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => {
                      const prefix = gpayUpiId.split('@')[0] || 'yourname';
                      setGpayUpiId(`${prefix}${h}`);
                    }}
                    style={{
                      padding: '4px 10px',
                      background: gpayUpiId.endsWith(h) ? '#121212' : '#F7F3EE',
                      color: gpayUpiId.endsWith(h) ? '#fff' : '#3D3530',
                      border: '1px solid #E8DFD5',
                      borderRadius: 16,
                      fontSize: 10,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </form>
        )}

        {/* TAB 3: Google Pay QR Code */}
        {gpayTab === 'qr' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-block',
              padding: 16,
              background: '#fff',
              border: '2px dashed #C5A059',
              borderRadius: 18,
              boxShadow: '0 4px 16px rgba(197,160,89,0.15)',
              position: 'relative',
              marginBottom: 14
            }}>
              {/* SVG QR Code Simulation */}
              <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* QR Pattern */}
                <rect width="160" height="160" rx="8" fill="#FFFFFF" />
                {/* Top-Left Corner */}
                <rect x="12" y="12" width="38" height="38" rx="4" fill="#121212" />
                <rect x="18" y="18" width="26" height="26" rx="2" fill="#FFFFFF" />
                <rect x="23" y="23" width="16" height="16" rx="2" fill="#121212" />
                {/* Top-Right Corner */}
                <rect x="110" y="12" width="38" height="38" rx="4" fill="#121212" />
                <rect x="116" y="18" width="26" height="26" rx="2" fill="#FFFFFF" />
                <rect x="121" y="23" width="16" height="16" rx="2" fill="#121212" />
                {/* Bottom-Left Corner */}
                <rect x="12" y="110" width="38" height="38" rx="4" fill="#121212" />
                <rect x="18" y="116" width="26" height="26" rx="2" fill="#FFFFFF" />
                <rect x="23" y="121" width="16" height="16" rx="2" fill="#121212" />
                {/* Data Matrix Elements */}
                <rect x="60" y="14" width="8" height="8" fill="#121212" />
                <rect x="74" y="14" width="8" height="8" fill="#121212" />
                <rect x="88" y="14" width="8" height="8" fill="#121212" />
                <rect x="60" y="28" width="8" height="8" fill="#121212" />
                <rect x="74" y="28" width="8" height="8" fill="#C5A059" />
                <rect x="88" y="28" width="8" height="8" fill="#121212" />
                <rect x="14" y="60" width="8" height="8" fill="#121212" />
                <rect x="28" y="60" width="8" height="8" fill="#121212" />
                <rect x="42" y="60" width="8" height="8" fill="#121212" />
                <rect x="56" y="60" width="8" height="8" fill="#121212" />
                <rect x="70" y="60" width="8" height="8" fill="#121212" />
                <rect x="84" y="60" width="8" height="8" fill="#121212" />
                <rect x="98" y="60" width="8" height="8" fill="#121212" />
                <rect x="112" y="60" width="8" height="8" fill="#121212" />
                <rect x="126" y="60" width="8" height="8" fill="#121212" />
                <rect x="140" y="60" width="8" height="8" fill="#121212" />
                <rect x="60" y="74" width="8" height="8" fill="#121212" />
                <rect x="74" y="74" width="8" height="8" fill="#121212" />
                <rect x="88" y="74" width="8" height="8" fill="#121212" />
                <rect x="60" y="88" width="8" height="8" fill="#121212" />
                <rect x="74" y="88" width="8" height="8" fill="#C5A059" />
                <rect x="88" y="88" width="8" height="8" fill="#121212" />
                <rect x="110" y="74" width="8" height="8" fill="#121212" />
                <rect x="124" y="74" width="8" height="8" fill="#121212" />
                <rect x="138" y="74" width="8" height="8" fill="#121212" />
                <rect x="110" y="88" width="8" height="8" fill="#121212" />
                <rect x="124" y="88" width="8" height="8" fill="#121212" />
                <rect x="138" y="88" width="8" height="8" fill="#121212" />
                <rect x="60" y="110" width="8" height="8" fill="#121212" />
                <rect x="74" y="110" width="8" height="8" fill="#121212" />
                <rect x="88" y="110" width="8" height="8" fill="#121212" />
                <rect x="102" y="110" width="8" height="8" fill="#121212" />
                <rect x="116" y="110" width="8" height="8" fill="#121212" />
                <rect x="130" y="110" width="8" height="8" fill="#121212" />
                <rect x="60" y="124" width="8" height="8" fill="#121212" />
                <rect x="74" y="124" width="8" height="8" fill="#121212" />
                <rect x="88" y="124" width="8" height="8" fill="#121212" />
                <rect x="102" y="124" width="8" height="8" fill="#121212" />
                <rect x="116" y="124" width="8" height="8" fill="#121212" />
                <rect x="130" y="124" width="8" height="8" fill="#121212" />
                <rect x="60" y="138" width="8" height="8" fill="#121212" />
                <rect x="74" y="138" width="8" height="8" fill="#121212" />
                <rect x="88" y="138" width="8" height="8" fill="#121212" />
                <rect x="102" y="138" width="8" height="8" fill="#121212" />
                <rect x="116" y="138" width="8" height="8" fill="#121212" />
                <rect x="130" y="138" width="8" height="8" fill="#121212" />
                {/* Center Google Pay Mini Badge */}
                <circle cx="80" cy="80" r="15" fill="#FFFFFF" stroke="#E8DFD5" strokeWidth="2" />
                <text x="80" y="84" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#4285F4">G</text>
              </svg>

              {/* Animated scan line */}
              <div style={{
                position: 'absolute',
                top: 20,
                left: 20,
                right: 20,
                height: 2,
                background: 'linear-gradient(90deg, transparent, #C5A059, transparent)',
                boxShadow: '0 0 8px #C5A059',
                animation: 'pulse 2s infinite ease-in-out'
              }} />
            </div>

            <p style={{ fontSize: 13, fontWeight: 700, color: '#121212' }}>
              Scan with Google Pay App to Pay ₹{total.toLocaleString('en-IN')}
            </p>
            <p style={{ fontSize: 11, color: '#6B635B', marginTop: 4 }}>
              QR code expires in: <strong style={{ color: '#C5A059' }}>{formatTimer(timeLeft)}</strong>
            </p>

            <button
              type="button"
              onClick={() => triggerGooglePayFlow('QR Scanner')}
              style={{
                marginTop: 14,
                padding: '10px 20px',
                background: '#F7F3EE',
                border: '1px solid #C5A059',
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 700,
                color: '#121212',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#C5A059'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F7F3EE'; e.currentTarget.style.color = '#121212'; }}
            >
              <CheckCircle2 size={14} /> I Have Completed Payment on Google Pay
            </button>
          </div>
        )}

        {/* TAB 4: Google Pay Registered Mobile Number */}
        {gpayTab === 'phone' && (
          <form onSubmit={handlePhoneSubmit}>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#121212', marginBottom: 8 }}>
              Pay with Google Pay Mobile Number
            </p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px',
                background: '#E8DFD5',
                borderRadius: '12px 0 0 12px',
                fontSize: 13,
                fontWeight: 700,
                color: '#121212'
              }}>
                🇮🇳 +91
              </div>
              <input
                type="tel"
                value={gpayPhone}
                onChange={e => setGpayPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="Enter 10-digit mobile number"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: '#F7F3EE',
                  border: '1.5px solid #E8DFD5',
                  borderRadius: '0 12px 12px 0',
                  fontSize: 13,
                  outline: 'none',
                  color: '#121212'
                }}
                onFocus={e => { e.target.style.borderColor = '#C5A059'; e.target.style.background = '#fff'; }}
                onBlur={e => { e.target.style.borderColor = '#E8DFD5'; e.target.style.background = '#F7F3EE'; }}
              />
              <button
                type="submit"
                style={{
                  padding: '12px 20px',
                  background: '#121212',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#C5A059'}
                onMouseLeave={e => e.currentTarget.style.background = '#121212'}
              >
                Send Request
              </button>
            </div>
            <p style={{ fontSize: 10, color: '#6B635B' }}>
              We will send a payment collect request of ₹{total.toLocaleString('en-IN')} directly to your Google Pay app.
            </p>
          </form>
        )}
      </div>

      {/* Google Pay Bottom Sheet Modal (Authentic Flow) */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: 20
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 24,
            width: '100%',
            maxWidth: 440,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            animation: 'fadeIn 0.25s ease-out'
          }}>
            {/* Modal Top Bar */}
            <div style={{
              background: '#F8F9FA',
              padding: '16px 20px',
              borderBottom: '1px solid #E8EAED',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <GooglePayLogo height={22} variant="dark" />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#5F6368', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Secure Checkout
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5F6368' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px 24px' }}>
              {/* STEP 1: Confirmation Sheet */}
              {modalStep === 'confirm' && (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      background: '#121212',
                      color: '#C5A059',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px',
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 22,
                      fontWeight: 800
                    }}>
                      Z
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#202124', margin: 0 }}>
                      ZIVANA Luxury Beauty
                    </h3>
                    <p style={{ fontSize: 11, color: '#5F6368', marginTop: 2 }}>
                      NOEUL ENTERPRISES · noeul.zivana@okhdfcbank
                    </p>
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 32,
                      fontWeight: 800,
                      color: '#202124',
                      marginTop: 12
                    }}>
                      ₹{total.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Payment Account Selector */}
                  <div style={{
                    padding: '14px 16px',
                    background: '#F8F9FA',
                    border: '1px solid #E8EAED',
                    borderRadius: 14,
                    marginBottom: 20
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 34,
                          height: 34,
                          borderRadius: 8,
                          background: '#004C8F',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 10,
                          fontWeight: 800
                        }}>
                          HDFC
                        </div>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: '#202124' }}>
                            HDFC Bank •••• 4892
                          </p>
                          <p style={{ fontSize: 11, color: '#5F6368' }}>
                            Primary UPI Account (Google Pay)
                          </p>
                        </div>
                      </div>
                      <CheckCircle2 size={18} color="#1A73E8" />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleProceedToPin}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: '#1A73E8',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 24,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      boxShadow: '0 4px 12px rgba(26,115,232,0.3)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#1557B0'}
                    onMouseLeave={e => e.currentTarget.style.background = '#1A73E8'}
                  >
                    <Lock size={14} /> Proceed to Pay ₹{total.toLocaleString('en-IN')}
                  </button>

                  <p style={{ fontSize: 10, color: '#5F6368', textAlign: 'center', marginTop: 14 }}>
                    🔒 Secured by Google Pay & NPCI UPI Unified Payments
                  </p>
                </div>
              )}

              {/* STEP 2: UPI PIN Entry */}
              {modalStep === 'pin' && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ marginBottom: 16 }}>
                    <GooglePayLogo height={20} variant="dark" />
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: '#202124', marginTop: 8 }}>
                      Enter 4-Digit UPI PIN
                    </h4>
                    <p style={{ fontSize: 11, color: '#5F6368' }}>
                      To authorize payment of ₹{total.toLocaleString('en-IN')} to NOEUL ENTERPRISES
                    </p>
                  </div>

                  {/* 4 PIN Boxes */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 12, margin: '24px 0' }}>
                    {[0, 1, 2, 3].map(idx => (
                      <input
                        key={idx}
                        id={`gpay-pin-${idx}`}
                        type="password"
                        maxLength={1}
                        value={pinDigits[idx]}
                        onChange={e => handlePinInput(idx, e.target.value)}
                        autoFocus={idx === 0}
                        style={{
                          width: 48,
                          height: 54,
                          fontSize: 24,
                          textAlign: 'center',
                          borderRadius: 12,
                          border: '2px solid #1A73E8',
                          background: '#F8F9FA',
                          color: '#202124',
                          outline: 'none',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                        }}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={executePayment}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: '#1A73E8',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 24,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Confirm Payment
                  </button>
                  <p style={{ fontSize: 10, color: '#5F6368', marginTop: 12 }}>
                    Demo Mode: You can enter any 4 digits or click Confirm
                  </p>
                </div>
              )}

              {/* STEP 3: Processing Animation */}
              {modalStep === 'processing' && (
                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                  <div style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    border: '4px solid #E8EAED',
                    borderTopColor: '#1A73E8',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 20px'
                  }} />
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: '#202124' }}>
                    Authorizing Google Pay...
                  </h4>
                  <p style={{ fontSize: 12, color: '#5F6368', marginTop: 6 }}>
                    Connecting with Google Security & NPCI UPI Gateway
                  </p>
                </div>
              )}

              {/* STEP 4: Payment Verified Success */}
              {modalStep === 'success' && (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: '#E6F4EA',
                    color: '#137333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    boxShadow: '0 4px 16px rgba(19,115,51,0.2)'
                  }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 style={{ fontSize: 18, fontWeight: 800, color: '#137333' }}>
                    Payment Successful!
                  </h4>
                  <p style={{ fontSize: 12, color: '#5F6368', marginTop: 6 }}>
                    ₹{total.toLocaleString('en-IN')} paid to <strong>NOEUL ENTERPRISES</strong>
                  </p>
                  <div style={{
                    margin: '16px 0 0',
                    padding: '8px 12px',
                    background: '#F8F9FA',
                    borderRadius: 10,
                    fontSize: 10,
                    color: '#5F6368',
                    fontFamily: 'monospace'
                  }}>
                    UPI Ref: GPA.9281-4019-58291 · Verified by Google Pay
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Express Google Pay 1-Click Banner
export const ExpressGooglePayBanner = ({ onExpressPay, total }) => (
  <div style={{
    background: 'linear-gradient(135deg, #121212 0%, #242424 100%)',
    borderRadius: 18,
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    border: '1px solid rgba(197,160,89,0.3)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
    marginBottom: 24
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        background: '#fff',
        padding: '6px 12px',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center'
      }}>
        <GooglePayLogo height={18} variant="dark" />
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em' }}>
            Express Checkout with Google Pay
          </span>
          <span style={{ background: '#C5A059', color: '#fff', fontSize: 8, fontWeight: 800, padding: '2px 6px', borderRadius: 10 }}>
            RECOMMENDED
          </span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 2 }}>
          Skip filling lengthy forms — pay in seconds with your saved address & payment methods
        </p>
      </div>
    </div>

    <button
      type="button"
      onClick={onExpressPay}
      style={{
        padding: '10px 22px',
        background: '#fff',
        color: '#121212',
        border: 'none',
        borderRadius: 30,
        fontSize: 11,
        fontWeight: 700,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        letterSpacing: '0.06em',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#C5A059'; e.currentTarget.style.color = '#fff'; }}
      onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#121212'; }}
    >
      <Zap size={13} color="#EA4335" /> Pay with GPay <ArrowRight size={13} />
    </button>
  </div>
);
