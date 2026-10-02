import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles, Lock, Mail, Phone, User, Eye, EyeOff, ArrowRight,
  ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, KeyRound,
  Gift, Crown, Heart, ArrowLeft, Star, Smartphone,
  Check, X, Zap
} from 'lucide-react';

const S = {
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  inputIcon: {
    position: 'absolute',
    left: 14,
    color: '#9A8E84',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '13px 16px 13px 44px',
    background: '#F7F3EE',
    border: '1.5px solid #E8DFD5',
    borderRadius: 14,
    fontFamily: 'inherit',
    fontSize: 13,
    color: '#121212',
    outline: 'none',
    transition: 'all 0.2s ease',
  },
  label: {
    display: 'block',
    fontSize: 10,
    fontWeight: 700,
    color: '#121212',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: 7,
  },
  btnPrimary: (isLoading) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    padding: '15px 24px',
    background: 'linear-gradient(135deg, #1A1A1A 0%, #121212 100%)',
    color: '#FDFBF7',
    border: '1px solid rgba(197,160,89,0.35)',
    borderRadius: 14,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    cursor: isLoading ? 'wait' : 'pointer',
    boxShadow: '0 8px 24px rgba(18,18,18,0.22)',
    transition: 'all 0.25s ease',
    opacity: isLoading ? 0.8 : 1,
  }),
};

export const LoginPage = ({ onLoginSuccess, defaultTab = 'signin', returnView = 'account' }) => {
  const { loginUser, registerUser, showToast, navigateTo } = useApp();

  // Mode state: 'signin' | 'signup' | 'otp'
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState('ananya.sharma@example.com');
  const [signInPassword, setSignInPassword] = useState('••••••••');
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referralCode: 'NOEULVIP',
    agreeTerms: true,
    subscribeNewsletter: true,
  });
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP Login State
  const [otpPhone, setOtpPhone] = useState('9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const otpInputRefs = useRef([]);

  // Forgot Password Modal State
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: input, 2: reset
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotNewPass, setForgotNewPass] = useState('');
  const [forgotConfirmPass, setForgotConfirmPass] = useState('');

  // Privé perks carousel index
  const [activePerk, setActivePerk] = useState(0);

  const PERKS = [
    {
      icon: Gift,
      title: '₹500 Welcome Voucher',
      desc: 'Instant discount code NOEULFIRST unlocked on registration for orders above ₹1,999.',
      tag: 'WELCOME GIFT',
    },
    {
      icon: Crown,
      title: 'ZIVANA Privé 100 Points',
      desc: 'Earn 5% cashback in Glow Points on every luxury botanical order.',
      tag: 'LOYALTY REWARDS',
    },
    {
      icon: Sparkles,
      title: 'Complimentary Saffron Samples',
      desc: 'Deluxe travel miniatures of Kashmiri Kumkumadi serums with every order.',
      tag: 'EXCLUSIVE SAMPLE',
    },
    {
      icon: ShieldCheck,
      title: '1-Click Fast Express Checkout',
      desc: 'Save verified shipping addresses and pay smoothly with Google Pay or UPI.',
      tag: 'SEAMLESS SHOPPING',
    },
  ];

  // Auto-rotate perks on left banner
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePerk((prev) => (prev + 1) % PERKS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [PERKS.length]);

  // OTP timer countdown
  useEffect(() => {
    let interval = null;
    if (otpSent && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((t) => t - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [otpSent, resendTimer]);

  // Password strength calculation
  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const passScore = calculateStrength(signUpData.password);
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['#EF4444', '#F59E0B', '#C5A059', '#10B981'];

  // Handle Sign In Submit
  const handleSignIn = (e) => {
    e.preventDefault();
    if (!signInEmail.trim()) {
      showToast('Please enter your email or phone number', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      loginUser(
        {
          name: signInEmail.includes('admin') ? 'Brand Administrator' : 'Ananya Sharma',
          email: signInEmail.includes('@') ? signInEmail : `${signInEmail}@example.com`,
          phone: '+91 98765 43210',
          tier: 'Privé Gold Member',
        },
        returnView
      );
      if (onLoginSuccess) onLoginSuccess();
    }, 600);
  };

  // Handle Sign Up Submit
  const handleSignUp = (e) => {
    e.preventDefault();
    if (!signUpData.fullName.trim()) {
      showToast('Please enter your full name', 'error');
      return;
    }
    if (!signUpData.email.trim() || !signUpData.email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    if (signUpData.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    if (!signUpData.agreeTerms) {
      showToast('Please accept the Terms & Conditions', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      registerUser(
        {
          fullName: signUpData.fullName,
          email: signUpData.email,
          phone: signUpData.phone ? `+91 ${signUpData.phone}` : '+91 98765 43210',
          points: 100,
          tier: 'Privé Club Member',
        },
        returnView
      );
      if (onLoginSuccess) onLoginSuccess();
    }, 700);
  };

  // Handle OTP Send
  const handleSendOtp = (e) => {
    e?.preventDefault();
    if (!otpPhone || otpPhone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOtpSent(true);
      setResendTimer(30);
      setCanResend(false);
      showToast(`Verification OTP sent to +91 ${otpPhone} (Code: 123456)`);
      setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
    }, 600);
  };

  // Handle OTP Box Input Change
  const handleOtpDigitChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    // Auto advance
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle OTP Backspace
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle OTP Paste
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasted)) {
      const digits = pasted.split('');
      setOtpDigits(digits);
      otpInputRefs.current[5]?.focus();
      showToast('OTP code pasted!');
    }
  };

  // Handle OTP Verification Submit
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredCode = otpDigits.join('');
    if (enteredCode.length < 6) {
      showToast('Please enter the complete 6-digit OTP', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      loginUser(
        {
          name: 'Ananya Sharma',
          email: 'ananya.sharma@example.com',
          phone: `+91 ${otpPhone}`,
          tier: 'Privé Club Member',
        },
        returnView
      );
      if (onLoginSuccess) onLoginSuccess();
    }, 600);
  };

  // Quick Demo Logins
  const demoLogin = (role) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (role === 'admin') {
        loginUser(
          {
            name: 'Executive Brand Director',
            email: 'director@noeul.com',
            phone: '+91 98000 11223',
            tier: 'Brand Administrator',
          },
          'admin'
        );
      } else {
        loginUser(
          {
            name: 'Ananya Sharma',
            email: 'ananya.sharma@example.com',
            phone: '+91 98765 43210',
            tier: 'Privé Gold VIP',
          },
          returnView
        );
      }
    }, 400);
  };

  // Handle Forgot Password Reset Flow
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (forgotStep === 1) {
      if (!forgotIdentifier) {
        showToast('Please enter your email or mobile number', 'error');
        return;
      }
      showToast(`Password reset code sent to ${forgotIdentifier}!`);
      setForgotStep(2);
    } else {
      if (!forgotNewPass || forgotNewPass.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
      }
      if (forgotNewPass !== forgotConfirmPass) {
        showToast('Passwords do not match', 'error');
        return;
      }
      showToast('Password updated successfully! You can now sign in.');
      setForgotModalOpen(false);
      setForgotStep(1);
      setActiveTab('signin');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FDFBF7', display: 'flex', flexDirection: 'column' }}>
      
      {/* ── Top Brand Breadcrumb ── */}
      <div style={{
        background: '#FDFBF7',
        borderBottom: '1px solid #EDE8E0',
        padding: '14px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <button
          onClick={() => navigateTo('home')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 600,
            color: '#6B635B',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#C5A059')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6B635B')}
        >
          <ArrowLeft size={16} /> Return to Store
        </button>

        {/* Center Monogram */}
        <div
          onClick={() => navigateTo('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: '0.25em',
            color: '#121212',
          }}>
            ZIVANA
          </span>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#C5A059' }} />
        </div>

        {/* Concierge Help */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#9A8E84' }}>
          <span>Need assistance?</span>
          <strong style={{ color: '#C5A059', fontWeight: 700 }}>care@zivana.in</strong>
        </div>
      </div>

      {/* ── Main Container: Split Layout ── */}
      <div style={{
        flex: 1,
        maxWidth: 1200,
        width: '100%',
        margin: '36px auto 60px',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: '1.05fr 1fr',
        gap: 36,
        alignItems: 'stretch',
      }} className="login-container">

        {/* ════════════════════════════════════════════
            LEFT COLUMN: ZIVANA CLUB PRIVÉ SHOWCASE
            ════════════════════════════════════════════ */}
        <div style={{
          background: 'linear-gradient(150deg, #161411 0%, #201A12 50%, #11100D 100%)',
          borderRadius: 28,
          border: '1px solid rgba(197,160,89,0.30)',
          boxShadow: '0 24px 60px rgba(18,18,18,0.25)',
          padding: '48px 44px',
          color: '#FDFBF7',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle Ambient Glow Spheres */}
          <div style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(197,160,89,0.25) 0%, transparent 70%)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 260,
            height: 260,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,131,59,0.18) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }} />

          {/* Top Section */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            {/* VIP Club Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 30,
              background: 'rgba(197,160,89,0.15)',
              border: '1px solid rgba(197,160,89,0.35)',
              marginBottom: 24,
            }}>
              <Sparkles size={13} color="#C5A059" />
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', color: '#C5A059', textTransform: 'uppercase' }}>
                ZIVANA PRIVÉ CLUB
              </span>
            </div>

            {/* Editorial Heading */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)',
              fontWeight: 800,
              lineHeight: 1.18,
              color: '#FDFBF7',
              letterSpacing: '-0.02em',
              marginBottom: 16,
            }}>
              Where Ayurvedic Opulence Meets Modern Dermatology.
            </h1>

            <p style={{
              fontSize: 13,
              lineHeight: 1.75,
              color: 'rgba(232,223,213,0.78)',
              fontWeight: 300,
              maxWidth: 440,
              marginBottom: 32,
            }}>
              Sign in to manage your orders, access personalized skin ritual consultations, and unlock VIP privileges curated for Indian skin tones.
            </p>

            {/* Interactive Privé Perks Showcase */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
              {PERKS.map((perk, idx) => {
                const Icon = perk.icon;
                const isSelected = activePerk === idx;
                return (
                  <div
                    key={perk.title}
                    onClick={() => setActivePerk(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 14,
                      padding: '14px 16px',
                      borderRadius: 18,
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(197,160,89,0.12)' : 'rgba(255,255,255,0.03)',
                      border: isSelected ? '1px solid rgba(197,160,89,0.45)' : '1px solid rgba(255,255,255,0.06)',
                      transition: 'all 0.25s ease',
                      transform: isSelected ? 'translateX(4px)' : 'none',
                    }}
                  >
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 12,
                      background: isSelected ? '#C5A059' : 'rgba(255,255,255,0.08)',
                      color: isSelected ? '#121212' : '#C5A059',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.25s',
                    }}>
                      <Icon size={18} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: isSelected ? '#FDFBF7' : 'rgba(253,251,247,0.88)' }}>
                          {perk.title}
                        </span>
                        <span style={{
                          fontSize: 9,
                          fontWeight: 800,
                          letterSpacing: '0.10em',
                          color: '#C5A059',
                          textTransform: 'uppercase',
                        }}>
                          {perk.tag}
                        </span>
                      </div>
                      <p style={{ fontSize: 11, color: 'rgba(232,223,213,0.65)', lineHeight: 1.5, margin: 0 }}>
                        {perk.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Testimonial & Heritage Seal */}
          <div style={{ position: 'relative', zIndex: 2, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {/* VIP Review Quote */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="#C5A059" color="#C5A059" />
              ))}
              <span style={{ fontSize: 11, fontWeight: 700, color: '#C5A059', marginLeft: 6 }}>
                4.9 / 5.0 Rating
              </span>
            </div>
            <p style={{ fontSize: 12, fontStyle: 'italic', color: 'rgba(232,223,213,0.85)', lineHeight: 1.6, marginBottom: 8 }}>
              "ZIVANA's Kumkumadi Glow Serum transformed my skin ritual completely. Becoming a Privé member gave me first access to every limited drop!"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#FDFBF7' }}>
                Dr. Ananya Roy, Mumbai <span style={{ color: '#C5A059', fontWeight: 500 }}>(Verified VIP)</span>
              </span>
              <span style={{ fontSize: 9, letterSpacing: '0.14em', color: '#9A8E84', textTransform: 'uppercase' }}>
                By NOEUL ENTERPRISES
              </span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            RIGHT COLUMN: AUTHENTICATION CARD
            ════════════════════════════════════════════ */}
        <div style={{
          background: '#fff',
          borderRadius: 28,
          border: '1px solid #E8DFD5',
          boxShadow: '0 20px 48px rgba(28,25,23,0.08)',
          padding: '40px 38px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}>

          {/* ── Mode Selection Segmented Control ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 6,
            background: '#F7F3EE',
            padding: 5,
            borderRadius: 16,
            marginBottom: 28,
            border: '1px solid #E8DFD5',
          }}>
            <button
              type="button"
              onClick={() => { setActiveTab('signin'); setOtpSent(false); }}
              style={{
                padding: '10px 8px',
                borderRadius: 12,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.04em',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'signin' ? '#121212' : 'transparent',
                color: activeTab === 'signin' ? '#FDFBF7' : '#6B635B',
                boxShadow: activeTab === 'signin' ? '0 2px 8px rgba(18,18,18,0.20)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('signup'); setOtpSent(false); }}
              style={{
                padding: '10px 8px',
                borderRadius: 12,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.04em',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'signup' ? '#121212' : 'transparent',
                color: activeTab === 'signup' ? '#FDFBF7' : '#6B635B',
                boxShadow: activeTab === 'signup' ? '0 2px 8px rgba(18,18,18,0.20)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              Create Account
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('otp'); }}
              style={{
                padding: '10px 8px',
                borderRadius: 12,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.04em',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'otp' ? '#121212' : 'transparent',
                color: activeTab === 'otp' ? '#FDFBF7' : '#6B635B',
                boxShadow: activeTab === 'otp' ? '0 2px 8px rgba(18,18,18,0.20)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              Phone OTP
            </button>
          </div>

          {/* ═══════════════════════════════════
              TAB 1: SIGN IN (EMAIL & PASSWORD)
              ═══════════════════════════════════ */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#C5A059' }}>
                  WELCOME BACK
                </span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: '#121212', marginTop: 4 }}>
                  Sign in to your account
                </h2>
              </div>

              {/* Email / Username */}
              <div>
                <label style={S.label}>Email Address or Mobile</label>
                <div style={S.inputWrapper}>
                  <Mail size={16} style={S.inputIcon} />
                  <input
                    type="text"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="name@example.com or +91 98765..."
                    required
                    style={S.input}
                    onFocus={(e) => { e.target.style.borderColor = '#C5A059'; e.target.style.background = '#fff'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E8DFD5'; e.target.style.background = '#F7F3EE'; }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                  <label style={{ ...S.label, marginBottom: 0 }}>Password</label>
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#C5A059',
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div style={S.inputWrapper}>
                  <Lock size={16} style={S.inputIcon} />
                  <input
                    type={showSignInPassword ? 'text' : 'password'}
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    style={{ ...S.input, paddingRight: 44 }}
                    onFocus={(e) => { e.target.style.borderColor = '#C5A059'; e.target.style.background = '#fff'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E8DFD5'; e.target.style.background = '#F7F3EE'; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignInPassword((s) => !s)}
                    style={{
                      position: 'absolute',
                      right: 12,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#9A8E84',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {showSignInPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: -4 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 12, color: '#6B635B' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: '#C5A059', width: 16, height: 16, borderRadius: 4, cursor: 'pointer' }}
                  />
                  <span>Keep me signed in on this device</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={S.btnPrimary(isSubmitting)}
                onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.background = '#C5A059'; }}
                onMouseLeave={(e) => { if (!isSubmitting) e.currentTarget.style.background = 'linear-gradient(135deg, #1A1A1A 0%, #121212 100%)'; }}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In to ZIVANA <ArrowRight size={15} />
                  </>
                )}
              </button>

              {/* ── Demo Quick Login Shortcuts ── */}
              <div style={{
                marginTop: 4,
                padding: '12px 14px',
                background: 'rgba(197,160,89,0.08)',
                border: '1px dashed rgba(197,160,89,0.35)',
                borderRadius: 14,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <Zap size={13} color="#C5A059" />
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.10em', color: '#121212', textTransform: 'uppercase' }}>
                    Quick Demo One-Click Access
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => demoLogin('customer')}
                    style={{
                      padding: '8px 10px',
                      background: '#fff',
                      border: '1px solid #E8DFD5',
                      borderRadius: 10,
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#121212',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.18s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C5A059'; e.currentTarget.style.color = '#C5A059'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E8DFD5'; e.currentTarget.style.color = '#121212'; }}
                  >
                    👤 Ananya Sharma <span style={{ fontSize: 9, color: '#9A8E84', display: 'block' }}>VIP Customer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => demoLogin('admin')}
                    style={{
                      padding: '8px 10px',
                      background: '#fff',
                      border: '1px solid #E8DFD5',
                      borderRadius: 10,
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#121212',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.18s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C5A059'; e.currentTarget.style.color = '#C5A059'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E8DFD5'; e.currentTarget.style.color = '#121212'; }}
                  >
                    👑 Brand Manager <span style={{ fontSize: 9, color: '#9A8E84', display: 'block' }}>Admin Dashboard</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* ═══════════════════════════════════
              TAB 2: CREATE ACCOUNT (SIGN UP)
              ═══════════════════════════════════ */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#C5A059' }}>
                  JOIN ZIVANA PRIVÉ
                </span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: '#121212', marginTop: 4 }}>
                  Create your VIP account
                </h2>
                <p style={{ fontSize: 11, color: '#6B635B', marginTop: 2 }}>
                  Unlock ₹500 welcome discount & 100 Glow Points instantly.
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label style={S.label}>Full Name</label>
                <div style={S.inputWrapper}>
                  <User size={16} style={S.inputIcon} />
                  <input
                    type="text"
                    value={signUpData.fullName}
                    onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                    placeholder="Ananya Sharma"
                    required
                    style={S.input}
                    onFocus={(e) => { e.target.style.borderColor = '#C5A059'; e.target.style.background = '#fff'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E8DFD5'; e.target.style.background = '#F7F3EE'; }}
                  />
                </div>
              </div>

              {/* Email & Phone 2-col */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={S.label}>Email Address</label>
                  <div style={S.inputWrapper}>
                    <Mail size={15} style={S.inputIcon} />
                    <input
                      type="email"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      placeholder="name@email.com"
                      required
                      style={S.input}
                      onFocus={(e) => { e.target.style.borderColor = '#C5A059'; e.target.style.background = '#fff'; }}
                      onBlur={(e) => { e.target.style.borderColor = '#E8DFD5'; e.target.style.background = '#F7F3EE'; }}
                    />
                  </div>
                </div>

                <div>
                  <label style={S.label}>Phone Number</label>
                  <div style={S.inputWrapper}>
                    <span style={{ position: 'absolute', left: 12, fontSize: 12, fontWeight: 700, color: '#6B635B' }}>+91</span>
                    <input
                      type="tel"
                      value={signUpData.phone}
                      onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                      placeholder="9876543210"
                      style={{ ...S.input, paddingLeft: 46 }}
                      onFocus={(e) => { e.target.style.borderColor = '#C5A059'; e.target.style.background = '#fff'; }}
                      onBlur={(e) => { e.target.style.borderColor = '#E8DFD5'; e.target.style.background = '#F7F3EE'; }}
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label style={S.label}>Create Password</label>
                <div style={S.inputWrapper}>
                  <Lock size={16} style={S.inputIcon} />
                  <input
                    type={showSignUpPassword ? 'text' : 'password'}
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    placeholder="Min. 8 characters with letter & number"
                    required
                    style={{ ...S.input, paddingRight: 44 }}
                    onFocus={(e) => { e.target.style.borderColor = '#C5A059'; e.target.style.background = '#fff'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E8DFD5'; e.target.style.background = '#F7F3EE'; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignUpPassword((s) => !s)}
                    style={{
                      position: 'absolute',
                      right: 12,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#9A8E84',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {showSignUpPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Live Password Strength Meter */}
                {signUpData.password && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 10, color: '#9A8E84' }}>Password Strength:</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: strengthColors[Math.max(0, passScore - 1)] }}>
                        {strengthLabels[Math.max(0, passScore - 1)]}
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          style={{
                            height: 4,
                            borderRadius: 2,
                            background: step <= passScore ? strengthColors[Math.max(0, passScore - 1)] : '#E8DFD5',
                            transition: 'all 0.25s ease',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label style={S.label}>Confirm Password</label>
                <div style={S.inputWrapper}>
                  <Lock size={16} style={S.inputIcon} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={signUpData.confirmPassword}
                    onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                    placeholder="Re-enter password"
                    required
                    style={{ ...S.input, paddingRight: 44 }}
                    onFocus={(e) => { e.target.style.borderColor = '#C5A059'; e.target.style.background = '#fff'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E8DFD5'; e.target.style.background = '#F7F3EE'; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    style={{
                      position: 'absolute',
                      right: 12,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#9A8E84',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {signUpData.confirmPassword && (
                  <p style={{
                    fontSize: 10,
                    fontWeight: 600,
                    marginTop: 4,
                    color: signUpData.password === signUpData.confirmPassword ? '#10B981' : '#EF4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                    {signUpData.password === signUpData.confirmPassword ? (
                      <>
                        <CheckCircle2 size={12} /> Passwords match perfectly
                      </>
                    ) : (
                      <>
                        <AlertCircle size={12} /> Passwords do not match
                      </>
                    )}
                  </p>
                )}
              </div>

              {/* Referral / VIP Code */}
              <div>
                <label style={S.label}>VIP Referral / Invite Code (Optional)</label>
                <div style={S.inputWrapper}>
                  <Gift size={16} style={S.inputIcon} />
                  <input
                    type="text"
                    value={signUpData.referralCode}
                    onChange={(e) => setSignUpData({ ...signUpData, referralCode: e.target.value.toUpperCase() })}
                    placeholder="e.g. NOEULVIP or GLOW2026"
                    style={{ ...S.input, letterSpacing: '0.08em', fontWeight: 600 }}
                    onFocus={(e) => { e.target.style.borderColor = '#C5A059'; e.target.style.background = '#fff'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E8DFD5'; e.target.style.background = '#F7F3EE'; }}
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 2 }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer', fontSize: 11, color: '#6B635B', lineHeight: 1.4 }}>
                  <input
                    type="checkbox"
                    checked={signUpData.agreeTerms}
                    onChange={(e) => setSignUpData({ ...signUpData, agreeTerms: e.target.checked })}
                    style={{ accentColor: '#C5A059', width: 15, height: 15, borderRadius: 4, marginTop: 1 }}
                  />
                  <span>I agree to ZIVANA's Terms of Service, Privacy Policy & Privé Club terms.</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={S.btnPrimary(isSubmitting)}
                onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.background = '#C5A059'; }}
                onMouseLeave={(e) => { if (!isSubmitting) e.currentTarget.style.background = 'linear-gradient(135deg, #1A1A1A 0%, #121212 100%)'; }}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} />
                    Creating Privé Account...
                  </>
                ) : (
                  <>
                    <Sparkles size={15} /> Join ZIVANA Privé & Claim ₹500
                  </>
                )}
              </button>
            </form>
          )}

          {/* ═══════════════════════════════════
              TAB 3: FAST PHONE OTP LOGIN
              ═══════════════════════════════════ */}
          {activeTab === 'otp' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#C5A059' }}>
                  INSTANT ACCESS
                </span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: '#121212', marginTop: 4 }}>
                  Sign in with Mobile OTP
                </h2>
                <p style={{ fontSize: 11, color: '#6B635B', marginTop: 2 }}>
                  We'll send a 6-digit verification code to your Indian phone number.
                </p>
              </div>

              {!otpSent ? (
                <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={S.label}>Indian Mobile Number</label>
                    <div style={S.inputWrapper}>
                      <div style={{
                        position: 'absolute',
                        left: 12,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        borderRight: '1px solid #E8DFD5',
                        paddingRight: 8,
                      }}>
                        <span style={{ fontSize: 13 }}>🇮🇳</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#121212' }}>+91</span>
                      </div>
                      <input
                        type="tel"
                        value={otpPhone}
                        onChange={(e) => setOtpPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="98765 43210"
                        required
                        style={{ ...S.input, paddingLeft: 84, fontSize: 14, letterSpacing: '0.04em' }}
                        onFocus={(e) => { e.target.style.borderColor = '#C5A059'; e.target.style.background = '#fff'; }}
                        onBlur={(e) => { e.target.style.borderColor = '#E8DFD5'; e.target.style.background = '#F7F3EE'; }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={S.btnPrimary(isSubmitting)}
                    onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.background = '#C5A059'; }}
                    onMouseLeave={(e) => { if (!isSubmitting) e.currentTarget.style.background = 'linear-gradient(135deg, #1A1A1A 0%, #121212 100%)'; }}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        Send 6-Digit OTP <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{
                    padding: '12px 14px',
                    background: 'rgba(197,160,89,0.08)',
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Smartphone size={16} color="#C5A059" />
                      <div>
                        <p style={{ fontSize: 11, fontWeight: 700, color: '#121212' }}>Code sent to +91 {otpPhone}</p>
                        <p style={{ fontSize: 10, color: '#9A8E84' }}>Check your SMS messages</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#C5A059',
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Change
                    </button>
                  </div>

                  {/* 6 Digits Boxes */}
                  <div>
                    <label style={{ ...S.label, textAlign: 'center', marginBottom: 10 }}>Enter 6-Digit Verification Code</label>
                    <div
                      onPaste={handleOtpPaste}
                      style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}
                    >
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => (otpInputRefs.current[idx] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          style={{
                            width: '100%',
                            height: 48,
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: 800,
                            borderRadius: 12,
                            border: digit ? '2px solid #C5A059' : '1.5px solid #E8DFD5',
                            background: digit ? '#fff' : '#F7F3EE',
                            color: '#121212',
                            outline: 'none',
                            transition: 'all 0.2s',
                          }}
                          onFocus={(e) => { e.target.style.borderColor = '#C5A059'; e.target.style.background = '#fff'; }}
                          onBlur={(e) => { if (!digit) { e.target.style.borderColor = '#E8DFD5'; e.target.style.background = '#F7F3EE'; } }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Resend OTP Timer & Demo hint */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11 }}>
                    <span style={{ color: '#9A8E84' }}>
                      {resendTimer > 0 ? (
                        <>Resend code in <strong style={{ color: '#121212' }}>{resendTimer}s</strong></>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSendOtp()}
                          style={{ background: 'none', border: 'none', color: '#C5A059', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                        >
                          Resend Code Now
                        </button>
                      )}
                    </span>
                    <span style={{ color: '#C5A059', fontWeight: 600, fontSize: 10, background: 'rgba(197,160,89,0.12)', padding: '2px 8px', borderRadius: 10 }}>
                      Demo Code: 123456
                    </span>
                  </div>

                  {/* Submit OTP */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={S.btnPrimary(isSubmitting)}
                    onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.background = '#C5A059'; }}
                    onMouseLeave={(e) => { if (!isSubmitting) e.currentTarget.style.background = 'linear-gradient(135deg, #1A1A1A 0%, #121212 100%)'; }}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} />
                        Verifying Code...
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={16} /> Verify & Enter Store
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════
              SOCIAL & INSTANT AUTH SECTION
              ═══════════════════════════════════ */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #EDE8E0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: 16 }}>
              <div style={{ position: 'absolute', left: 0, right: 0, height: 1, background: '#E8DFD5' }} />
              <span style={{
                position: 'relative',
                background: '#fff',
                padding: '0 12px',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#9A8E84',
              }}>
                Or fast sign-in with
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {/* Google Button */}
              <button
                type="button"
                onClick={() => demoLogin('customer')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '11px 14px',
                  background: '#fff',
                  border: '1.5px solid #E8DFD5',
                  borderRadius: 14,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#121212',
                  cursor: 'pointer',
                  transition: 'all 0.20s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C5A059'; e.currentTarget.style.background = '#F7F3EE'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E8DFD5'; e.currentTarget.style.background = '#fff'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Google
              </button>

              {/* Apple Button */}
              <button
                type="button"
                onClick={() => demoLogin('customer')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '11px 14px',
                  background: '#121212',
                  border: '1.5px solid #121212',
                  borderRadius: 14,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.20s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#2A2A2A'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#121212'; }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 0.6-2.65 1.35-.58.66-1.09 1.73-.95 2.76 1.01.08 2.05-.51 2.67-1.26z" />
                </svg>
                Apple ID
              </button>
            </div>
          </div>

          {/* Security Assurance Footer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            marginTop: 20,
            paddingTop: 14,
            borderTop: '1px solid #F4EFEA',
            fontSize: 10,
            color: '#9A8E84',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <ShieldCheck size={13} color="#C5A059" /> 256-Bit SSL Encrypted
            </span>
            <span>•</span>
            <span>100% Privacy Protected</span>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          FORGOT PASSWORD INTERACTIVE MODAL
          ════════════════════════════════════════════ */}
      {forgotModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(18,18,18,0.70)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 24,
            border: '1px solid #E8DFD5',
            boxShadow: '0 30px 70px rgba(18,18,18,0.30)',
            maxWidth: 440,
            width: '100%',
            padding: '32px 28px',
            position: 'relative',
            animation: 'fadeIn 0.25s ease both',
          }}>
            <button
              onClick={() => { setForgotModalOpen(false); setForgotStep(1); }}
              style={{
                position: 'absolute',
                top: 18,
                right: 18,
                background: '#F7F3EE',
                border: 'none',
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#6B635B',
              }}
            >
              <X size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: 'rgba(197,160,89,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <KeyRound size={20} color="#C5A059" />
              </div>
              <div>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C5A059' }}>
                  PASSWORD RECOVERY
                </span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#121212', margin: 0 }}>
                  Reset Your Password
                </h3>
              </div>
            </div>

            <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {forgotStep === 1 ? (
                <>
                  <p style={{ fontSize: 12, color: '#6B635B', lineHeight: 1.5, margin: 0 }}>
                    Enter the email address or phone number registered with your ZIVANA account, and we will send you a secure verification link.
                  </p>
                  <div>
                    <label style={S.label}>Email Address or Phone</label>
                    <div style={S.inputWrapper}>
                      <Mail size={16} style={S.inputIcon} />
                      <input
                        type="text"
                        value={forgotIdentifier}
                        onChange={(e) => setForgotIdentifier(e.target.value)}
                        placeholder="ananya.sharma@example.com"
                        required
                        style={S.input}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    style={{ ...S.btnPrimary(false), marginTop: 4 }}
                  >
                    Send Recovery Code <ArrowRight size={14} />
                  </button>
                </>
              ) : (
                <>
                  <p style={{ fontSize: 12, color: '#6B635B', lineHeight: 1.5, margin: 0 }}>
                    Enter the 6-digit code sent to <strong>{forgotIdentifier}</strong> and choose your new password.
                  </p>
                  <div>
                    <label style={S.label}>Verification Code (OTP)</label>
                    <input
                      type="text"
                      value={forgotOtp}
                      onChange={(e) => setForgotOtp(e.target.value)}
                      placeholder="Enter 6-digit code (e.g. 123456)"
                      required
                      style={{ ...S.input, paddingLeft: 16 }}
                    />
                  </div>
                  <div>
                    <label style={S.label}>New Password</label>
                    <input
                      type="password"
                      value={forgotNewPass}
                      onChange={(e) => setForgotNewPass(e.target.value)}
                      placeholder="Min. 8 characters"
                      required
                      style={{ ...S.input, paddingLeft: 16 }}
                    />
                  </div>
                  <div>
                    <label style={S.label}>Confirm New Password</label>
                    <input
                      type="password"
                      value={forgotConfirmPass}
                      onChange={(e) => setForgotConfirmPass(e.target.value)}
                      placeholder="Re-enter new password"
                      required
                      style={{ ...S.input, paddingLeft: 16 }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{ ...S.btnPrimary(false), marginTop: 4 }}
                  >
                    Update Password & Sign In <Check size={14} />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Media Queries & Responsive styling */}
      <style>{`
        @media (max-width: 900px) {
          .login-container {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
