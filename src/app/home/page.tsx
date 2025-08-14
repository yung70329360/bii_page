'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigator from '@/components/Navigator';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    service: '',
  });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic to send form data to an API endpoint
    console.log('Form submitted:', formData);
    alert('感謝您的預約，我們會盡快與您聯繫！');
    setFormData({ name: '', contact: '', service: '' });
  };

  // Intro overlay animation
  const [introStage, setIntroStage] = useState<'black' | 'intro' | 'settle' | 'fly' | 'fade' | 'hidden'>('black');
  // Reveal Hero elements after intro
  const [heroRevealed, setHeroRevealed] = useState(false);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    // Sequence: black -> intro(appear) -> settle(center normal) -> fly -> fade -> hidden
    const t0 = setTimeout(() => setIntroStage('intro'), 60);   // 第一幀為純黑遮罩，稍後才出現 logo 動畫
    const t1 = setTimeout(() => setIntroStage('settle'), 900 + 60); // 緩慢顯現放大結束
    const t2 = setTimeout(() => setIntroStage('fly'), 1200 + 60);   // 飛向導覽列
    const t3 = setTimeout(() => { setIntroStage('fade'); setHeroRevealed(true); }, 2100 + 60);  // 遮罩開始淡出
    const t4 = setTimeout(() => setIntroStage('hidden'), 2800 + 60); // 遮罩移除
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Lock scroll while intro overlay is visible
  const lockedScrollYRef = React.useRef(0);
  
  // Mouse-following plane animation
  const planeRef = React.useRef<HTMLDivElement | null>(null);
  const mousePos = React.useRef({ x: 0, y: 0 });
  const planePos = React.useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    
    const animatePlane = () => {
      if (!planeRef.current) return;
      
      // Smooth follow with lerp
      const lerp = 0.1;
      planePos.current.x += (mousePos.current.x - planePos.current.x) * lerp;
      planePos.current.y += (mousePos.current.y - planePos.current.y) * lerp;
      
      // Update plane position
      const planeAngle = Math.atan2(mousePos.current.y - planePos.current.y, mousePos.current.x - planePos.current.x) * 180 / Math.PI;
      planeRef.current.style.transform = `translate(${planePos.current.x - 20}px, ${planePos.current.y - 20}px) rotate(${planeAngle}deg)`;
      
      requestAnimationFrame(animatePlane);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    animatePlane();
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body as HTMLBodyElement & { style: CSSStyleDeclaration };
    if (introStage !== 'hidden') {
      const y = window.scrollY || window.pageYOffset || 0;
      lockedScrollYRef.current = y;
      root.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.left = '0';
      body.style.right = '0';
      body.style.top = `-${y}px`;
      body.style.width = '100%';
      body.style.touchAction = 'none';
    } else {
      root.style.overflow = '';
      body.style.overflow = '';
      const top = body.style.top;
      body.style.position = '';
      body.style.left = '';
      body.style.right = '';
      body.style.top = '';
      body.style.width = '';
      body.style.touchAction = '';
      const y = top ? parseInt(top, 10) : 0;
      if (y) window.scrollTo(0, -y);
    }
    return () => {
      root.style.overflow = '';
      body.style.overflow = '';
      const top = body.style.top;
      body.style.position = '';
      body.style.left = '';
      body.style.right = '';
      body.style.top = '';
      body.style.width = '';
      body.style.touchAction = '';
      const y = top ? parseInt(top, 10) : 0;
      if (y) window.scrollTo(0, -y);
    };
  }, [introStage]);

  // Smooth scroll to About section
  const scrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('about');
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.pageYOffset - 8;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  // (Hero animation removed for a clean finance-style hero.)

  // Slogan draw animation on view
  const sloganHeadlineRef = React.useRef<HTMLHeadingElement | null>(null);
  const sloganPathRef = React.useRef<SVGPathElement | null>(null);
  const [sloganInView, setSloganInView] = useState(false);
  const [sloganReady, setSloganReady] = useState(false);
  useEffect(() => {
    const el = sloganHeadlineRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSloganInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const path = sloganPathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.setProperty('--pathLen', `${len}`);
    path.style.strokeDasharray = `${len}`;
    setSloganReady(true);
  }, []);

  return (
    <>
      {introStage !== 'hidden' && (
        <div
          className={`intro-overlay ${introStage === 'fade' ? 'overlay-fade' : ''}`}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: '#000',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity .6s ease',
          }}
        >
          {introStage !== 'black' && (
            <div
              className={`intro-logo ${introStage === 'intro' ? 'appear' : ''} ${introStage === 'settle' ? 'center' : ''} ${introStage === 'fly' ? 'fly' : ''}`}
            >
              <img src="/Logo/logo_white_noword.png" alt="logo" className="h-10 w-auto md:h-12" />
            </div>
          )}
        </div>
      )}
      {/* Mouse-following plane */}
      <div ref={planeRef} className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out w-8 h-8">
        <Image src="/Image/mouse/plane.png" alt="plane" width={32} height={32} priority className="w-full h-full opacity-80 object-contain" />
      </div>
      <Navigator />
      <main className="bg-gray-50 text-gray-900">
        {/* Hero Section */}
        <section className={`relative bg-[#f5f6f7] py-44 sm:py-56 overflow-hidden z-10 ${heroRevealed ? 'hero-in' : 'hero-pre'}`}>
          
          {/* Entrance aura */}
          <div className={`hero-entrance-aura z-0 ${heroRevealed ? 'show' : ''}`} />
          <div className="side-label left fixed">Welcome</div>
          <div className="side-label right fixed">Use a scroll</div>
          <div className="container mx-auto px-6 md:px-10">
            <div className="relative z-20 max-w-7xl mx-auto pl-2 md:pl-6">
              <p className={`caption text-[10px] md:text-[11px] uppercase tracking-[0.38em] text-gray-400 ${heroRevealed ? 'anim-fade-up' : 'opacity-0 translate-y-4'}`} style={{transition:'opacity .6s ease, transform .6s ease', transitionDelay: heroRevealed ? '80ms' : '0ms'}}>WE</p>
              <h1 className={`headline mt-3 ${heroRevealed ? 'anim-fade-up' : 'opacity-0 translate-y-4'}`} style={{transition:'opacity .7s ease, transform .7s ease'}}>
                <span className="block">聚智而行<span className="accent-dot" /></span>
                <span className="block mt-1">創領未來</span>
              </h1>
              <div className={`mt-10 md:mt-12 h-px w-full bg-gray-300/80 ${heroRevealed ? 'anim-scale-in' : 'scale-x-0'}`} style={{transition:'transform .8s ease', transformOrigin:'left'}}></div>
              <div className={`mt-5 md:mt-6 flex items-center justify-between text-sm ${heroRevealed ? 'anim-fade-up' : 'opacity-0 translate-y-4'}`} style={{transition:'opacity .6s ease, transform .6s ease', transitionDelay: heroRevealed ? '120ms' : '0ms'}}>
                <div className="flex items-center gap-2 text-gray-400 bullets">
                  <span className="bullet active" />
                  <span className="bullet" />
                  <span className="bullet" />
                  <span className="bullet" />
                </div>
                <Link href="/contact" className="text-rose-600 hover:text-rose-700 font-semibold">Contact</Link>
              </div>
            </div>
          </div>
          {/* Scroll down indicator */}
          <a href="#about" onClick={scrollToAbout} aria-label="Scroll to About" className={`scroll-indicator ${heroRevealed ? 'anim-bounce' : 'opacity-0'}`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </section>

        {/* About Us Section */}
        <section id="about" className="relative bg-[#f5f6f7] min-h-screen py-8 sm:py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
              {/* Left Side - Text Content */}
              <div className="bg-transparent text-gray-900 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8">
                  Who we are
                </h2>
                <div className="space-y-6 text-base md:text-lg leading-relaxed font-normal">
                  <p className="font-normal text-gray-700">
                    突圍智創 由三位共同創辦人攜手成立，結合多年實務經驗與專業輔導能力，針對創業者、企業主、二代傳承與職場人士提供服務。
                  </p>
                  <div className="space-y-4">
                    <div className="font-normal text-gray-700">
                      <span className="font-bold text-xl">突圍</span> 象徵我們協助突破困境、走出困局。
                    </div>
                    <div className="font-normal text-gray-700">
                      <span className="font-bold text-xl">智創</span> 代表我們重視群體智慧與資源整合，共生共創。
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Image with geometric clip */}
              <div className="relative h-[400px] lg:h-auto p-6 md:p-8 lg:p-10">
                <div className="geo-shape">
                  <img
                    src="/Image/about_us/v1.png"
                    alt="Team collaboration - hands stacked together"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slogan Section (above service cards) */}
        <section className="relative bg-[#f5f6f7] pt-4 pb-4 sm:pt-5 sm:pb-5">
          <div className="container mx-auto px-6 md:px-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="slogan-divider"></div>
              <div className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-slate-400 mb-4">Our Mission</div>
              <h3 ref={sloganHeadlineRef} className="slogan-headline relative inline-block mb-10 md:mb-14">
                我們與<span className="marker-word">逐夢者
                  <svg className={`marker-underline ${sloganInView && sloganReady ? 'play' : ''}`} viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
                    <path ref={sloganPathRef} className="marker-underline-path" d="M5 14 C 30 19, 70 19, 95 14" />
                  </svg>
                </span>同行，共創未來
              </h3>
            </div>
          </div>
        </section>

        {/* Service Cards Section */}
        <section className="relative bg-[#f5f6f7] py-20 sm:py-28">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="waterfall-layout">
                {/* 創業突圍 */}
                <div className="content-section waterfall-item">
                  <div className="section-header">
                    <div className="service-icon">
                      <img src="/Image/service_card/icon/startup.png" alt="創業突圍" className="icon-image" />
                    </div>
                    <h3 className="section-title">創業突圍</h3>
                    <div className="title-separator"></div>
                  </div>
                  <div className="section-content">
                    <p className="content-text">
                      突圍智創專注於早期創業者的成長與發展，提供從商業模式設計到資源整合的全方位支持。我們相信每個創業想法都值得被認真對待，透過策略投資與專業輔導，協助創業者突破困境、實現夢想。
                    </p>
                    <div className="service-items">
                      <span className="service-item">創業孵化</span>
                      <span className="service-item">策略投資</span>
                      <span className="service-item">資源整合</span>
                    </div>
                  </div>
                </div>

                {/* 企業突圍 */}
                <div className="content-section waterfall-item">
                  <div className="section-header">
                    <div className="service-icon">
                      <img src="/Image/service_card/icon/enterprise.png" alt="企業突圍" className="icon-image" />
                    </div>
                    <h3 className="section-title">企業突圍</h3>
                    <div className="title-separator"></div>
                  </div>
                  <div className="section-content">
                    <p className="content-text">
                      由前集團執行長與上市櫃顧問團隊領銜，我們深入企業核心，診斷問題根源並設計解決方案。從內訓到專案顧問，再到策略陪跑，我們與企業一同面對挑戰，實現轉型升級與持續成長。
                    </p>
                    <div className="service-items">
                      <span className="service-item">企業內訓</span>
                      <span className="service-item">專案顧問</span>
                      <span className="service-item">策略陪跑</span>
                    </div>
                  </div>
                </div>

                {/* 二代突圍 */}
                <div className="content-section waterfall-item">
                  <div className="section-header">
                    <div className="service-icon">
                      <img src="/Image/service_card/icon/succession.png" alt="二代突圍" className="icon-image" />
                    </div>
                    <h3 className="section-title">二代突圍</h3>
                    <div className="title-separator"></div>
                  </div>
                  <div className="section-content">
                    <p className="content-text">
                      企業傳承是家族企業面臨的最大挑戰之一。我們為企二代提供系統化的接班培訓與顧問服務，涵蓋領導力發展、家族治理、創新轉型等關鍵領域，協助新一代順利承接使命並推動企業持續發展。
                    </p>
                    <div className="service-items">
                      <span className="service-item">接班規劃</span>
                      <span className="service-item">領導培訓</span>
                      <span className="service-item">傳承顧問</span>
                    </div>
                  </div>
                </div>

                {/* 職涯突圍 */}
                <div className="content-section waterfall-item">
                  <div className="section-header">
                    <div className="service-icon">
                      <img src="/Image/service_card/icon/career.png" alt="職涯突圍" className="icon-image" />
                    </div>
                    <h3 className="section-title">職涯突圍</h3>
                    <div className="title-separator"></div>
                  </div>
                  <div className="section-content">
                    <p className="content-text">
                      在快速變化的職場環境中，我們為職場人士提供一對一諮詢與系統化培訓，協助突破發展瓶頸。從職涯定位到能力精進，再到成長陪伴，我們成為你職涯路上的堅實夥伴，共同面對挑戰、實現突破。
                    </p>
                    <div className="service-items">
                      <span className="service-item">職涯規劃</span>
                      <span className="service-item">能力精進</span>
                      <span className="service-item">成長陪伴</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative contact-section">
          {/* Concave curve separating previous section (gray) and Contact */}
          <div className="contact-top-curve" aria-hidden="true">
            <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="contact-top-curve-svg">
              <path d="M0,0 L1200,0 L1200,80 C800,40 400,40 0,80 Z" fill="#f5f6f7" />
            </svg>
          </div>
          
          
          <div className="container mx-auto px-6 md:px-10 relative z-10 pt-24 sm:pt-28 pb-36 sm:pb-44">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="contact-title text-xl md:text-2xl font-bold text-gray-900 mb-5">
                Contact
              </h2>
              <p className="contact-description text-sm md:text-base text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
                我們針對不同族群量身打造專屬服務，協助創業者突破瓶頸、走出困境，支持企業加速成長、穩健擴張，輔導二代順利承接家業並推動轉型，同時為職場工作者提供系統化的職涯規劃指引，助其在競爭環境中掌握優勢與方向，誠摯邀請您與我們聯繫，以深入了解我們的專業服務內容與解決方案
              </p>
              <Link href="/contact" className="contact-button inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-none text-sm transition-colors duration-200">
                Contact
              </Link>
            </div>
          </div>
        </section>
 
      </main>
      <style jsx>{`
        /* Intro overlay */
        .intro-overlay {
          position: fixed; inset: 0; background: #000; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          transition: opacity .6s ease;
        }
        .intro-overlay.overlay-fade { opacity: 0; }
        .intro-logo {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(.8); opacity: 0;
          transition: top .8s cubic-bezier(.4,0,.2,1), left .8s cubic-bezier(.4,0,.2,1), transform .8s cubic-bezier(.4,0,.2,1), opacity .3s ease;
        }
        .intro-logo.appear { animation: revealPop .9s cubic-bezier(.2,.8,.2,1) forwards; }
        .intro-logo.center { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        .intro-logo.fly { top: 14px; left: 24px; transform: translate(0,0) scale(.55); opacity: 1; }
        @media (min-width: 768px) {
          .intro-logo.fly { top: 18px; left: 32px; transform: translate(0,0) scale(.6); }
        }
        @keyframes revealPop {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(.8); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
        }
        .shape-diag {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(16,185,129,0.06), rgba(16,185,129,0));
          clip-path: polygon(100% 0, 60% 0, 0 100%, 40% 100%);
        }
        .shape-diag--2 {
          background: linear-gradient(135deg, rgba(59,130,246,0.06), rgba(59,130,246,0));
          clip-path: polygon(100% 0, 70% 0, 10% 100%, 0 100%);
        }
        .accent-dot::after {
          content: '';
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-left: 8px;
          border-radius: 9999px;
          background: #ef4444; /* rose-500 */
          vertical-align: middle;
        }
        .headline {
          font-weight: 900;
          color: #2b1f26; /* deep plum-like black */
          line-height: 0.95;
          letter-spacing: -0.015em;
          font-size: clamp(40px, 7vw, 104px);
        }

        /* Slogan */
        .slogan-headline {
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -0.01em;
          line-height: 1.05;
          font-size: clamp(28px, 6vw, 70px);
          position: relative;
          display: inline-block;
        }
        .marker-word { position: relative; display: inline-block; }
        .marker-underline { position: absolute; left: 0; bottom: -14px; height: 22px; width: 110%; transform: translateX(-5%); overflow: visible; }
        .marker-underline-path {
          fill: none; stroke: #2563eb; stroke-width: 5; stroke-linecap: round; filter: drop-shadow(0 1px 0 rgba(0,0,0,0.06));
          stroke-dasharray: var(--pathLen, 120);
          stroke-dashoffset: var(--pathLen, 120);
          transition: stroke-dashoffset 900ms cubic-bezier(.2,.9,.2,1);
        }
        .marker-underline.play .marker-underline-path { stroke-dashoffset: 0; }
 
        .bullets .bullet {
          width: 6px; height: 6px; border-radius: 9999px; background: #cbd5e1;
        }
        .bullets .bullet.active { background: #e11d48; }
        .side-label {
          position: fixed;
          top: 50vh;
          transform: translateY(-50%);
          font-size: 11px;
          letter-spacing: 0.2em;
          color: rgba(2,6,23,0.45);
          writing-mode: vertical-rl;
          text-transform: uppercase;
          z-index: 100;
          pointer-events: none;
        }
        .side-label.left { left: 18px; transform: translateY(-50%) rotate(180deg); }
        .side-label.right { right: 18px; }
 
         /* Geometric clipped image for About Us */
         .geo-shape {
           position: relative;
           width: 100%;
           height: 100%;
           /* Diamond-like diagonal cut similar to the reference */
           clip-path: polygon(18% 0, 100% 0, 100% 82%, 82% 100%, 0 100%, 0 18%);
           filter: drop-shadow(0 8px 24px rgba(0,0,0,0.18));
           overflow: hidden;
         }

         /* Feature cards cut-corner accents */
         .feature-card { position: relative; }
         .feature-card .corner { position: absolute; width: 48px; height: 48px; background: #f8fafc; border: 1px solid rgba(15,23,42,0.1); transform: rotate(45deg); }
         .feature-card .corner-tl { left: -24px; top: -24px; }
         .feature-card .corner-br { right: -24px; bottom: -24px; }

         /* Grey cut card with TL and BR cut, TR/BL normal */
         .cut-card {
           position: relative;
           border-radius: 16px;
           /* mask to cut TL and BR */
           -webkit-mask:
             radial-gradient(16px at 0 0, transparent 98%, #000 100%) top left,
             radial-gradient(16px at 100% 100%, transparent 98%, #000 100%) bottom right,
             linear-gradient(#000, #000);
           -webkit-mask-size: 32px 32px, 32px 32px, 100% 100%;
           -webkit-mask-repeat: no-repeat, no-repeat, no-repeat;
           mask:
             radial-gradient(16px at 0 0, transparent 98%, #000 100%) top left,
             radial-gradient(16px at 100% 100%, transparent 98%, #000 100%) bottom right,
             linear-gradient(#000, #000);
           mask-size: 32px 32px, 32px 32px, 100% 100%;
           mask-repeat: no-repeat, no-repeat, no-repeat;
           margin-left: clamp(0px, 2vw, 24px);
         }

        /* Entrance animations */
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-fade-up { animation: fadeUp 700ms ease forwards; }
        .animate-scale-in { animation: scaleIn 900ms ease forwards; transform-origin: left; }

        /* Hero reveal helpers */
        .hero-pre {}
        .hero-in .anim-fade-up { animation: fadeUp 700ms ease forwards; }
        .hero-in .anim-scale-in { animation: scaleIn 900ms ease forwards; }
        .hero-entrance-aura.show { animation: fadeUp 800ms ease both; }

        .scroll-indicator.anim-bounce { opacity: 1; }

        /* Content Sections - 2x2 Layout */
        /* Waterfall Layout */
        .waterfall-layout {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          position: relative;
        }
        
        .waterfall-item {
          position: relative;
        }
        
        /* Stagger positioning for visual interest */
        .waterfall-item:nth-child(1) {
          transform: translateY(0);
        }
        
        .waterfall-item:nth-child(2) {
          transform: translateY(48px);
        }
        
        .waterfall-item:nth-child(3) {
          transform: translateY(0);
        }
        
        .waterfall-item:nth-child(4) {
          transform: translateY(48px);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .waterfall-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          
          .waterfall-item:nth-child(2),
          .waterfall-item:nth-child(4) {
            transform: translateY(0);
          }
        }
        
        .content-section {
          background: transparent;
          padding: 40px 32px;
          border: 1px solid #e5e7eb;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .content-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.02), rgba(139, 92, 246, 0.02));
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
        }
        
        .content-section:hover {
          border-color: #3b82f6;
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.08);
        }
        
        .content-section:hover::before {
          opacity: 1;
        }
        
        .content-section:hover .section-title {
          color: #1e40af;
        }
        
        .content-section:hover .title-separator {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transform: scaleX(1.2);
          transform-origin: left;
        }
        
        .section-header {
          margin-bottom: 24px;
        }
        
        .service-icon {
          margin-bottom: 20px;
          display: flex;
          justify-content: flex-start;
        }
        
        .icon-image {
          width: 48px;
          height: 48px;
          object-fit: contain;
          opacity: 0.8;
          transition: all 0.3s ease;
        }
        
        .content-section:hover .icon-image {
          opacity: 1;
          transform: scale(1.1);
        }
        
        .section-title {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 16px;
          line-height: 1.2;
        }
        
        .title-separator {
          width: 100%;
          height: 1px;
          background: #111827;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .section-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .content-text {
          font-size: 15px;
          line-height: 1.6;
          color: #374151;
          margin: 0;
        }
        
        .content-text-en {
          font-size: 14px;
          line-height: 1.6;
          color: #6b7280;
          margin: 0;
          font-style: italic;
        }
        
        .service-items {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 20px;
        }
        
        .service-item {
          font-size: 13px;
          color: #475569;
          font-weight: 500;
        }
 
        /* Hero mouse glow tweaks */
        
        .hero-entrance-aura {
          position: absolute; inset: -20%; pointer-events: none;
          background: radial-gradient(600px 600px at 20% 40%, rgba(59,130,246,0.08), transparent 60%),
                      radial-gradient(700px 700px at 80% 20%, rgba(16,185,129,0.08), transparent 60%);
          animation: fadeUp 800ms ease both;
        }

        /* Scroll indicator animation */
        @keyframes bounce {
          0%, 100% { transform: translateY(-10px); }
          50% { transform: translateY(0); }
        }
        .scroll-indicator {
          position: absolute;
          bottom: 30px; /* Adjust as needed */
          left: 50%;
          transform: translateX(-50%);
          color: #6b7280; /* Gray color for the arrow */
          animation: bounce 2s infinite;
          z-index: 10;
        }

        /* Scroll down indicator */
        .scroll-indicator {
          position: absolute; left: 50%; bottom: 24px; transform: translateX(-50%);
          color: #0f172a; opacity: 0.7; transition: opacity .2s ease, transform .2s ease;
          animation: bounceDown 1.6s ease-in-out infinite;
        }
        .scroll-indicator:hover { opacity: 1; transform: translateX(-50%) translateY(2px); }
        @keyframes bounceDown {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        
        /* Flow Diagram */
        .flow-diagram {
          position: relative;
        }
        
        .top-line {
          height: 1px;
          background: #d1d5db;
          margin-bottom: 40px;
        }
        
        .flow-columns {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          position: relative;
        }
        
        .flow-columns::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: #d1d5db;
        }
        
        .flow-columns::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: repeating-linear-gradient(
            to right,
            transparent,
            transparent calc(25% - 0.5px),
            #d1d5db calc(25% - 0.5px),
            #d1d5db calc(25% + 0.5px),
            transparent calc(25% + 0.5px)
          );
          pointer-events: none;
        }
        
        .flow-column {
          text-align: center;
          padding: 20px;
          position: relative;
        }
        
        .flow-title {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 32px;
          text-align: center;
        }
        
        .flow-icon {
          margin-bottom: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .flow-arrow {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .flow-columns {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
          
          .flow-columns::after {
            background: repeating-linear-gradient(
              to right,
              transparent,
              transparent calc(50% - 0.5px),
              #d1d5db calc(50% - 0.5px),
              #d1d5db calc(50% + 0.5px),
              transparent calc(50% + 0.5px)
            );
          }
        }
        
        @media (max-width: 480px) {
          .flow-columns {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          
          .flow-columns::after {
            display: none;
          }
        }
        
        :global(html) { scroll-behavior: smooth; }

        /* Minimalist Cards */
        .cards-wrap { background: transparent; }
        .mini-card {
          position: relative;
          min-height: 220px;
          padding: 28px;
          display: grid;
          grid-template-rows: auto 1fr auto;
          transition: background-color .25s ease, color .25s ease;
        }
        .mini-title {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
        }
        .mini-icon { align-self: end; color: #4f46e5; }
        .mini-arrow { justify-self: end; color: #2563eb; opacity: 0.8; transition: transform .25s ease, opacity .25s ease; }
        .mini-card:hover { background: transparent; }
        .mini-card:hover .mini-arrow { transform: translateX(4px); opacity: 1; }

        .slogan-divider {
          width: 1px; height: 56px; margin: 0 auto 12px auto; background: linear-gradient(to bottom, rgba(37,99,235,0), #2563eb 60%, rgba(37,99,235,0));
        }
 
        /* Contact Section */
        .contact-section { position: relative; background: #ffffff; isolation: isolate; }
        .contact-section { margin-top: -40px; background: url('/Image/contact/bg.png') center/cover no-repeat; }
        .contact-top-curve {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          z-index: 2;
          pointer-events: none;
          overflow: hidden;
        }
        .contact-top-curve-svg { width: 100%; height: 100%; display: block; }
        .contact-section::before { content: ''; position: absolute; inset: 0; background: rgba(255,255,255,0.76); z-index: 0; }
        @media (max-width: 768px) {
          .contact-section { margin-top: -32px; }
          .contact-top-curve { top: 0; height: 72px; }
        }
      `}</style>
    </>
  );
};

export default Home;
