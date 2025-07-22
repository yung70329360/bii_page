'use client';
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
// Removed unused Building, User, Briefcase

export default function ContactPage() {
  const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      inquiryType: formData.get('inquiry-type'),
      firstName: formData.get('first-name'),
      lastName: formData.get('last-name'),
      company: formData.get('company'),
      jobTitle: formData.get('job-title'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      setStatus('submitting');
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="bg-white">
      {/* Hero Section - No changes */}
      <section className="relative w-full bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(110,110,110,0.1)_1px,_transparent_80%)]" 
            style={{backgroundSize: '30px 30px'}}
          />
          <div className="absolute top-0 -left-1/4 w-96 h-96 bg-blue-700/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-0 -right-1/4 w-96 h-96 bg-sky-500/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-600/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-24 md:py-32">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">聯絡我們</h1>
          <p className="text-lg md:text-xl text-gray-300">
            有任何問題、合作提案，或想聊聊您的商業挑戰？<br />我們隨時準備好傾聽並提供協助。
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Contact Information */}
            <div className="lg:col-span-1 flex flex-col gap-8 justify-start">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-gray-900 mb-2 text-center lg:text-left">
                與我們的專家<br />聊聊
              </h2>
              <p className="text-base md:text-sm text-gray-600 leading-relaxed mb-8">
                我們致力於協助像您一樣的公司，在顧客旅程的每個階段實現業務增長。請留下您的訊息，我們將盡快與您聯繫。
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-700" />
                  <a href="mailto:bii.globalservice@gmail.com" className="text-base text-gray-700 hover:text-blue-700 transition-colors">
                    bii.globalservice@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-700" />
                  <p className="text-base text-gray-700">(02)2365-1689</p>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-700" />
                  <p className="text-base text-gray-700">台北市大安區羅斯福路三段335號12樓之二</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-2xl shadow-lg">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="inquiry-type" className="block text-sm font-semibold text-gray-800 mb-1.5">
                    我想詢問關於... <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="inquiry-type"
                    name="inquiry-type"
                    className="block w-full rounded-lg border-gray-300 bg-white py-3 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-blue-600 transition"
                    required
                  >
                    <option value="">請選擇</option>
                    <option value="sales">業務諮詢</option>
                    <option value="partnership">合作提案</option>
                    <option value="support">產品與帳戶支援</option>
                    <option value="other">其他</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-semibold text-gray-800 mb-1.5">
                      名 <span className="text-red-500">*</span>
                    </label>
                    <input type="text" id="first-name" name="first-name" required className="block w-full rounded-lg border-gray-300 bg-white py-3 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-blue-600 transition" />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-semibold text-gray-800 mb-1.5">
                      姓 <span className="text-red-500">*</span>
                    </label>
                    <input type="text" id="last-name" name="last-name" required className="block w-full rounded-lg border-gray-300 bg-white py-3 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-blue-600 transition" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-800 mb-1.5">
                      公司名稱 <span className="text-red-500">*</span>
                    </label>
                    <input type="text" id="company" name="company" required className="block w-full rounded-lg border-gray-300 bg-white py-3 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-blue-600 transition" />
                  </div>
                  <div>
                    <label htmlFor="job-title" className="block text-sm font-semibold text-gray-800 mb-1.5">職稱</label>
                    <input type="text" id="job-title" name="job-title" className="block w-full rounded-lg border-gray-300 bg-white py-3 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-blue-600 transition" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-1.5">
                    電子郵件 <span className="text-red-500">*</span>
                  </label>
                  <input type="email" id="email" name="email" required className="block w-full rounded-lg border-gray-300 bg-white py-3 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-blue-600 transition" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-1.5">
                    訊息 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="block w-full rounded-lg border-gray-300 bg-white py-3 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-blue-600 transition"
                    placeholder="請簡要說明您的需求..."
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-x-2 py-3.5 px-6 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        送出中...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        送出訊息
                      </>
                    )}
                  </button>
                  {status === 'success' && (
                    <p className="mt-4 text-green-600 text-center">訊息已送出，我們將盡快與您聯繫！</p>
                  )}
                  {status === 'error' && (
                    <p className="mt-4 text-red-600 text-center">送出失敗，請稍後再試。</p>
                  )}
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
} 