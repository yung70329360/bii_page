"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';

const AiSpinTrainingPage = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSyllabusTab, setActiveSyllabusTab] = useState(1);
    const [highlightedTableRow, setHighlightedTableRow] = useState(1);

    useEffect(() => {
        const tableInterval = setInterval(() => {
            setHighlightedTableRow(prevRow => (prevRow % 4) + 1);
        }, 3000);
        return () => clearInterval(tableInterval);
    }, []);

    return (
        <div className="bg-white">
            <link rel="stylesheet" href="/ai-spin-training/output.css" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+TC:wght@300;400;500;700;900&display=swap" rel="stylesheet" />

            {/* Navigation Bar */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <a href="https://bii.tw" target="_blank" rel="noopener" className="flex items-center">
                                <img src="/ai-spin-training/logo.png" alt="突圍智創 Logo" className="h-8 w-auto" />
                            </a>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-6">
                                <Link href="#why-spin" className="text-slate-600 hover:text-cyan-700 px-3 py-2 rounded-md text-sm font-medium">為何是SPIN</Link>
                                <Link href="#pain-gain" className="text-slate-600 hover:text-cyan-700 px-3 py-2 rounded-md text-sm font-medium">痛點與收益</Link>
                                <Link href="#framework" className="text-slate-600 hover:text-cyan-700 px-3 py-2 rounded-md text-sm font-medium">核心架構</Link>
                                <Link href="#syllabus" className="text-slate-600 hover:text-cyan-700 px-3 py-2 rounded-md text-sm font-medium">課程大綱</Link>
                                <Link href="#contact" className="bg-cyan-600 text-white hover:bg-cyan-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">洽詢內訓</Link>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} type="button" className="bg-slate-100 inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-200 focus:outline-none" aria-controls="mobile-menu" aria-expanded={mobileMenuOpen}>
                                <span className="sr-only">Open main menu</span>
                                <svg className={`h-6 w-6 ${mobileMenuOpen ? 'hidden' : 'block'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                <svg className={`h-6 w-6 ${mobileMenuOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <div className="md:hidden" id="mobile-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link href="#why-spin" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 hover:bg-slate-100 hover:text-cyan-700 block px-3 py-2 rounded-md text-base font-medium">為何是SPIN</Link>
                            <Link href="#pain-gain" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 hover:bg-slate-100 hover:text-cyan-700 block px-3 py-2 rounded-md text-base font-medium">痛點與收益</Link>
                            <Link href="#framework" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 hover:bg-slate-100 hover:text-cyan-700 block px-3 py-2 rounded-md text-base font-medium">核心架構</Link>
                            <Link href="#syllabus" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 hover:bg-slate-100 hover:text-cyan-700 block px-3 py-2 rounded-md text-base font-medium">課程大綱</Link>
                            <Link href="#contact" onClick={() => setMobileMenuOpen(false)} className="bg-cyan-600 text-white hover:bg-cyan-700 block px-3 py-2 rounded-md text-base font-medium transition-colors">洽詢內訓</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Header Section */}
            <header className="relative bg-slate-900">
                <canvas id="particle-canvas" className="absolute inset-0 w-full h-full z-0"></canvas>
                <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
                    <div className="max-w-2xl z-10">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                            AI SPIN 銷售法
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-slate-300">
                            本課程專為頂尖銷售團隊設計，將全球公認最有效的顧問式銷售法，與當代最強大的 AI 工具深度整合，打造一套可複製、可量化的高效銷售作業系統。
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                            <Link href="/contact" className="rounded-md bg-cyan-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-all duration-300 transform hover:scale-105">預約企業內訓</Link>
                            <a href="#framework" className="text-base font-semibold leading-6 text-white">探索核心架構 <span aria-hidden="true">→</span></a>
                        </div>
                    </div>
                    <div className="hidden lg:block absolute right-0 top-0 w-2/5 h-full z-10 keyword-cloud-container">
                        <div id="keyword-cloud" className="keyword-cloud">
                            {/* Keywords will be injected here */}
                        </div>
                    </div>
                </div>
            </header>

            <main className="py-16 md:py-24 space-y-24 md:space-y-32">

                {/* Why SPIN Section */}
                <section id="why-spin" className="fade-in-section px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                            <div className="prose-custom max-w-none space-y-6">
                                <h2 className="text-3xl font-bold">為何在當代 B2B 銷售中，<br /><span className="text-cyan-700">SPIN 依然是黃金準則？</span></h2>
                                <p>在客戶比你更懂產品的時代，單向的產品推銷已然失效。銷售的成功關鍵，從「說了什麼」轉變為「問對了什麼」。真正的銷售精英，是客戶眼中能解決問題的顧問。</p>
                                <blockquote>SPIN® Selling 銷售法，正是建立這種顧問式信任關係的基石。它將複雜的銷售對話，解構成四個清晰、科學的提問階段，讓客戶「自我說服」，從而大幅提高大額訂單的成交率。</blockquote>
                            </div>
                            {/* Diagram Layout */}
                            <div className="relative">
                                {/* Vertical Line */}
                                <div className="absolute left-5 top-5 h-full w-0.5 bg-slate-200 -z-10"></div>
                                <div className="space-y-12">
                                    {/* S Node */}
                                    <div className="flex items-start space-x-6">
                                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-cyan-600 text-white shadow-md">
                                            <span className="font-bold text-lg">S</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-slate-800">Situation (背景情境)</h4>
                                            <p className="text-slate-600 mt-1">了解客戶的現狀與作業背景，建立對話基礎。</p>
                                        </div>
                                    </div>
                                    {/* P Node */}
                                    <div className="flex items-start space-x-6">
                                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-cyan-600 text-white shadow-md">
                                            <span className="font-bold text-lg">P</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-slate-800">Problem (問題探索)</h4>
                                            <p className="text-slate-600 mt-1">發掘客戶流程中的困難與隱性不滿，找到切入點。</p>
                                        </div>
                                    </div>
                                    {/* I Node */}
                                    <div className="flex items-start space-x-6">
                                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-cyan-600 text-white shadow-md">
                                            <span className="font-bold text-lg">I</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-slate-800">Implication (擴大暗示)</h4>
                                            <p className="text-slate-600 mt-1">引導客戶意識到問題不解決的嚴重後果，創造急迫感。</p>
                                        </div>
                                    </div>
                                    {/* N Node */}
                                    <div className="flex items-start space-x-6">
                                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-cyan-600 text-white shadow-md">
                                            <span className="font-bold text-lg">N</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-slate-800">Need-Payoff (需求回報)</h4>
                                            <p className="text-slate-600 mt-1">讓客戶親口說出解決方案能帶來的價值，完成自我說服。</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Benefits of SPIN Section */}
                        <div className="mt-20 bg-slate-100 rounded-2xl p-8 md:p-12">
                            <h3 className="text-2xl font-bold text-center text-slate-800 mb-10">SPIN 銷售法帶來的核心效益</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                <div className="text-center">
                                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-white shadow-md border border-slate-200 mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-800">建立一致的銷售方法</h4>
                                    <p className="text-slate-600 mt-2">建立顧問式銷售思維，讓團隊擁有可複製的成功模式。</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-white shadow-md border border-slate-200 mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-800">提升客戶滿意度</h4>
                                    <p className="text-slate-600 mt-2">真正聽懂客戶需求，從供應商轉變為值得信賴的合作夥伴。</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-white shadow-md border border-slate-200 mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-800">降低客戶異議</h4>
                                    <p className="text-slate-600 mt-2">透過提問引導，在異議產生前就化解疑慮，讓成交過程更順暢。</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-white shadow-md border border-slate-200 mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-800">縮短銷售週期</h4>
                                    <p className="text-slate-600 mt-2">精準定位決策者與需求，加速成交過程，提升業績效率。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pain vs Gain Section */}
                <section id="pain-gain" className="fade-in-section px-6">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="section-header">結合AI，解決您的銷售困境</h2>
                        <p className="section-subheader">我們將傳統銷售的四大痛點，轉化為 AI 賦能的四大收益。</p>
                        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Card 1 */}
                            <div className="pain-gain-card">
                                <div>
                                    <p className="font-bold text-rose-600">困境一：</p>
                                    <p className="mt-1 text-slate-800 font-bold text-lg leading-snug">客戶聊完沒感覺，總說「我們再想想」</p>
                                </div>
                                <div className="flex-grow my-4 border-t border-slate-200"></div>
                                <div>
                                    <p className="font-bold text-cyan-700">本課程提供：</p>
                                    <p className="mt-1 text-slate-600 text-base">一套可複製的「SPIN 提問模型」，透過精準提問，引導客戶自行說出需求與價值，建立真正的連結。</p>
                                </div>
                            </div>
                            {/* Card 2 */}
                            <div className="pain-gain-card">
                                <div>
                                    <p className="font-bold text-rose-600">困境二：</p>
                                    <p className="mt-1 text-slate-800 font-bold text-lg leading-snug">會議記錄繁雜，不知如何轉換成成交關鍵</p>
                                </div>
                                <div className="flex-grow my-4 border-t border-slate-200"></div>
                                <div>
                                    <p className="font-bold text-cyan-700">本課程提供：</p>
                                    <p className="mt-1 text-slate-600 text-base">一套「從逐字稿到提案」的 AI 工作流，自動分析對話，標記痛點，將雜亂資訊轉化為致勝洞察。</p>
                                </div>
                            </div>
                            {/* Card 3 */}
                            <div className="pain-gain-card">
                                <div>
                                    <p className="font-bold text-rose-600">困境三：</p>
                                    <p className="mt-1 text-slate-800 font-bold text-lg leading-snug">想做顧問式銷售，卻不懂如何有效提問</p>
                                </div>
                                <div className="flex-grow my-4 border-t border-slate-200"></div>
                                <div>
                                    <p className="font-bold text-cyan-700">本課程提供：</p>
                                    <p className="mt-1 text-slate-600 text-base">SPIN 銷售法的系統性訓練，讓您的團隊掌握顧問式銷售的核心精髓：問對問題，而非滔滔不絕。</p>
                                </div>
                            </div>
                            {/* Card 4 */}
                            <div className="pain-gain-card">
                                <div>
                                    <p className="font-bold text-rose-600">困境四：</p>
                                    <p className="mt-1 text-slate-800 font-bold text-lg leading-snug">想導入 AI 提升效率，卻找不到實際方法</p>
                                </div>
                                <div className="flex-grow my-4 border-t border-slate-200"></div>
                                <div>
                                    <p className="font-bold text-cyan-700">本課程提供：</p>
                                    <p className="mt-1 text-slate-600 text-base">一套能馬上上手的 AI 工具應用方法，將抽象的 AI 概念，轉化為銷售流程中具體、可執行的步驟。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Framework Section */}
                <section id="framework" className="w-full bg-slate-800 py-20 sm:py-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="section-header text-white">課程設計核心架構｜<span className="accent-gradient-text-dark">SPIN × AI 工具</span></h2>
                        <p className="section-subheader text-slate-300">我們將 SPIN 的四個經典階段，注入對應的 AI 工具，打造一套可複製、高效的銷售作業系統。</p>
                        <div className="mt-12">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse min-w-[700px] text-sm sm:text-base">
                                    <thead>
                                        <tr>
                                            <th className="p-4 text-left font-semibold text-white border-b border-slate-600">SPIN 銷售階段</th>
                                            <th className="p-4 text-left font-semibold text-white border-b border-slate-600">核心任務</th>
                                            <th className="p-4 text-left font-semibold text-white border-b border-slate-600">搭配 AI 工具</th>
                                            <th className="p-4 text-left font-semibold text-white border-b border-slate-600">可操作產出</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className={`transition-all duration-700 ease-in-out ${highlightedTableRow === 1 ? 'bg-slate-700' : ''}`}>
                                            <td className={`p-4 font-bold text-cyan-400 border-b border-slate-700 transition-all duration-700 ease-in-out ${highlightedTableRow === 1 ? 'border-l-4 border-cyan-400 pl-6' : 'border-l-4 border-transparent pl-4'}`}>S：情境 Situation</td>
                                            <td className="p-4 text-slate-300 border-b border-slate-700">了解產業、理解客戶現況</td>
                                            <td className="p-4 text-slate-300 border-b border-slate-700">Perplexity.ai、ChatGPT</td>
                                            <td className="p-4 text-slate-300 border-b border-slate-700">產業趨勢摘要、潛在客戶背景說明</td>
                                        </tr>
                                        <tr className={`transition-all duration-700 ease-in-out ${highlightedTableRow === 2 ? 'bg-slate-700' : ''}`}>
                                            <td className={`p-4 font-bold text-cyan-400 border-b border-slate-700 transition-all duration-700 ease-in-out ${highlightedTableRow === 2 ? 'border-l-4 border-cyan-400 pl-6' : 'border-l-4 border-transparent pl-4'}`}>P：問題 Problem</td>
                                            <td className="p-4 text-slate-300 border-b border-slate-700">探索問題、角色利益、追問切角</td>
                                            <td className="p-4 text-slate-300 border-b border-slate-700">Otter.ai、ChatGPT</td>
                                            <td className="p-4 text-slate-300 border-b border-slate-700">逐字稿重點分析、痛點標記、追問建議</td>
                                        </tr>
                                        <tr className={`transition-all duration-700 ease-in-out ${highlightedTableRow === 3 ? 'bg-slate-700' : ''}`}>
                                            <td className={`p-4 font-bold text-cyan-400 border-b border-slate-700 transition-all duration-700 ease-in-out ${highlightedTableRow === 3 ? 'border-l-4 border-cyan-400 pl-6' : 'border-l-4 border-transparent pl-4'}`}>I：後果 Implication</td>
                                            <td className="p-4 text-slate-300 border-b border-slate-700">擴大後果、建構損失模型、風險敘事</td>
                                            <td className="p-4 text-slate-300 border-b border-slate-700">Gemini、ChatGPT、Excel</td>
                                            <td className="p-4 text-slate-300 border-b border-slate-700">損失試算頁面、風險說服語句</td>
                                        </tr>
                                        <tr className={`transition-all duration-700 ease-in-out ${highlightedTableRow === 4 ? 'bg-slate-700' : ''}`}>
                                            <td className={`p-4 font-bold text-cyan-400 border-b-0 transition-all duration-700 ease-in-out ${highlightedTableRow === 4 ? 'border-l-4 border-cyan-400 pl-6' : 'border-l-4 border-transparent pl-4'}`}>N：回報 Need-Payoff</td>
                                            <td className="p-4 text-slate-300 border-b-0">呈現價值、生成提案、視覺簡報</td>
                                            <td className="p-4 text-slate-300 border-b-0">Gamma.app、Canva Docs AI</td>
                                            <td className="p-4 text-slate-300 border-b-0">一頁式價值簡報、簡報語言模板</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Logo Wall Section */}
                        <div className="mt-12 rounded-lg bg-slate-900/70 p-8">
                            <h3 className="text-center text-lg font-semibold text-slate-200 mb-8">課程涵蓋的重點 AI 工具</h3>
                            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
                                <img className="h-8 transition duration-300" src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="ChatGPT Logo" />
                                <img className="h-8 transition duration-300" src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Perplexity_AI_logo.svg" alt="Perplexity AI Logo" />
                                <img className="h-7 transition duration-300" src="https://img.icons8.com/?size=512&id=GEwnpUHOxl4r&format=png" alt="Otter.ai Logo" />
                                <img className="h-8 transition duration-300" src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" alt="Google (for Gemini) Logo" />
                                <img className="h-7 transition duration-300" src="https://upload.wikimedia.org/wikipedia/commons/5/57/NotebookLM_logo.svg" alt="NotebookLM Logo" />
                                <img className="h-6 transition duration-300" src="https://logosandtypes.com/wp-content/uploads/2024/12/gamma-app.svg" alt="Gamma.app Logo" />
                            </div>
                        </div>
                        {/* AI Tools Application Section */}
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center transition hover:border-cyan-500 hover:-translate-y-1">
                                <img className="h-12 mx-auto mb-4" src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Perplexity_AI_logo.svg" alt="Perplexity Logo" />
                                <h4 className="font-bold text-lg text-white">Perplexity</h4>
                                <p className="text-slate-300 text-base mt-2">快速生成客戶背景研究，瞭解產業需求與痛點，大幅提升準備效率與提問深度，精準的擊中顧客的心理。</p>
                            </div>
                            <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center transition hover:border-cyan-500 hover:-translate-y-1">
                                <img className="h-12 mx-auto mb-4" src="https://img.icons8.com/?size=512&id=GEwnpUHOxl4r&format=png" alt="Otter.ai Logo" />
                                <h4 className="font-bold text-lg text-white">Otter AI</h4>
                                <p className="text-slate-300 text-base mt-2">使用 Otter.ai 快速分析逐字稿重點，發覺顧客對話中潛在意涵，生成痛點摘要報告，並結合ChatGPT產生追問建議與下一步建議行動。</p>
                            </div>
                            <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center transition hover:border-cyan-500 hover:-translate-y-1">
                                <img className="h-12 mx-auto mb-4" src="https://logosandtypes.com/wp-content/uploads/2024/12/gamma-app.svg" alt="Gamma.app Logo" />
                                <h4 className="font-bold text-lg text-white">Gamma</h4>
                                <p className="text-slate-300 text-base mt-2">根據蒐集的洞察與價值論述，一鍵生成專業、視覺化的提案簡報，讓業務專注於溝通，而非耗時的文書工作。</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="teaching-method" className="fade-in-section sm:px-6">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="section-header px-6 sm:px-0">讓AI成為銷售人員的利器</h2>
                        <p className="section-subheader px-6 sm:px-0">三大教學基石，四大關鍵成果，每位學員都將帶著可立即應用的AI實戰武器離開。</p>
                        <div className="mt-12 bg-slate-100 p-8 md:p-12 rounded-2xl">
                            {/* Step 1: Principles */}
                            <div className="text-center mb-12">
                                <h3 className="text-2xl font-bold text-slate-800">三大教學基石</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white shadow-md border border-slate-200 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </div>
                                    <h4 className="font-bold text-lg text-slate-800">AI導向</h4>
                                    <p className="text-slate-600 mt-1 text-base">以AI為核心，帶領銷售人員學會各式AI工具，優化各個成交節點，增進銷售的效率與效益。</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white shadow-md border border-slate-200 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /></svg>
                                    </div>
                                    <h4 className="font-bold text-lg text-slate-800">SPIN情境教學</h4>
                                    <p className="text-slate-600 mt-1 text-base">以經典的「SPIN銷售法」貫穿整堂課程，闡述如何結合SPIN概念與AI應用，從產品銷售者，成為解決問題者。</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white shadow-md border border-slate-200 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <h4 className="font-bold text-lg text-slate-800">成果導向</h4>
                                    <p className="text-slate-600 mt-1 text-base">課堂中每階段都有實際「輸出物」可用於真實業務工作，確保授課內容直接落地。</p>
                                </div>
                            </div>

                            {/* Arrow Connector */}
                            <div className="my-12 flex justify-center">
                                <svg className="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                            </div>

                            {/* Step 2: Outputs */}
                            <div className="text-center mb-12">
                                <h3 className="text-2xl font-bold text-slate-800">四大教學成果</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="custom-table min-w-[600px] text-sm sm:text-base" id="versions-table">
                                    <thead>
                                        <tr>
                                            <th className="w-12 sm:w-16 whitespace-nowrap">階段</th>
                                            <th>學習目標成果</th>
                                            <th>實際可應用情境</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td className="w-12 sm:w-16 font-semibold text-cyan-700 whitespace-nowrap">S</td><td>能使用 AI 工具快速掌握產業現況與客戶背景，整理出拜訪前的關鍵資訊摘要。</td><td>客戶初次拜訪前的準備：了解產業趨勢、潛在痛點與關鍵人角色</td></tr>
                                        <tr><td className="w-12 sm:w-16 font-semibold text-cyan-700 whitespace-nowrap">P</td><td>能從客戶語句中抓出潛在問題、角色利益與需求線索，並使用 AI 工具協助產出有效的追問話術。</td><td>- 拜訪中對話紀錄整理：從錄音轉文字後快速找痛點<br />- 拜訪後內部檢討會議，判斷客戶的真正關鍵問題</td></tr>
                                        <tr><td className="w-12 sm:w-16 font-semibold text-cyan-700 whitespace-nowrap">I</td><td>能設計「後果型」提問，並透過 AI 工具模擬風險情境與損失金額，提升價值說服力。</td><td>- 能以數據闡述「不改變會有什麼損失」<br />- 製作提案簡報前說服內部預算決策者</td></tr>
                                        <tr><td className="w-12 sm:w-16 font-semibold text-cyan-700 whitespace-nowrap">N</td><td>能將痛點轉化為價值說明，並用 AI 工具產出提案簡報與口語化說服語句。</td><td>提案會議或簡報展示時，讓客戶清楚理解價值與效益</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="syllabus" className="fade-in-section px-6">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="section-header">課程大綱：從理論到<span className="accent-gradient-text">實戰輸出</span>的完整路徑</h2>
                        <p className="section-subheader">本課程採模組化設計，確保理論與實戰緊密結合，每一單元皆有明確的「實戰輸出」。</p>
                        <div className="mt-12">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                                {/* Vertical Tabs */}
                                <div className="col-span-1 flex flex-row lg:flex-col gap-2">
                                    {[1, 2, 3, 4, 5].map(tabId => (
                                        <button key={tabId} onMouseOver={() => setActiveSyllabusTab(tabId)} className={`syllabus-tab w-full text-left p-4 rounded-lg font-semibold text-slate-600 ${activeSyllabusTab === tabId ? 'active' : 'hover:bg-slate-200'}`}>
                                            {
                                                {
                                                    1: '模組一：S - 認識客戶',
                                                    2: '模組二：P - 找出問題',
                                                    3: '模組三：I - 放大後果',
                                                    4: '模組四：N - 說明好處',
                                                    5: '模組五：整合實作演練'
                                                }[tabId]
                                            }
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content */}
                                <div className="lg:col-span-3">
                                    <div className="content-card syllabus-content min-h-[450px]">
                                        {activeSyllabusTab === 1 && (
                                            <div className="transition-all ease-out duration-300 opacity-100 transform-none">
                                                <h3 className="text-2xl font-bold text-slate-800 mb-2">模組一：S - 認識客戶：快速搞懂你的客戶</h3>
                                                <p className="text-slate-600 mb-6">本模組聚焦於運用 AI 工具，在拜訪前快速建立全面、深入的情境理解，讓每一次提問都建立在數據與洞察之上。</p>
                                                <ul>
                                                    <li>為什麼提問前要先懂產業？ (用對問題才不白問)</li>
                                                    <li>怎麼用 AI 找出產業現況？ (用 Perplexity 查資料)</li>
                                                    <li>用 ChatGPT 整理客戶背景摘要 (不靠主管，也能快速做功課)</li>
                                                    <li>自製一頁式「客戶備忘錄」 (面談前快速預備，讓你問話更精準)</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeSyllabusTab === 2 && (
                                            <div className="transition-all ease-out duration-300 opacity-100 transform-none">
                                                <h3 className="text-2xl font-bold text-slate-800 mb-2">模組二：P - 找出問題：把客戶說的話變成交機會</h3>
                                                <p className="text-slate-600 mb-6">學員將學習如何透過 AI 分析對話，從中精準挖掘客戶未言明的隱性需求與真實痛點，將每一段對話轉化為有效的成交機會。</p>
                                                <ul>
                                                    <li>問對問題的 3 個層次 (問題不是問「您需要什麼」)</li>
                                                    <li>錄音轉文字：用 Otter.ai 抓出重點 (不用手抄筆記)</li>
                                                    <li>從逐字稿找痛點、角色重點 (主管 vs 使用者要的不同)</li>
                                                    <li>ChatGPT 幫你想「追問怎麼問」</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeSyllabusTab === 3 && (
                                             <div className="transition-all ease-out duration-300 opacity-100 transform-none">
                                                <h3 className="text-2xl font-bold text-slate-800 mb-2">模組三：I - 放大後果：讓客戶自己感受到「不改會虧大」</h3>
                                                <p className="text-slate-600 mb-6">本章節的核心是將抽象問題轉化為具體的商業風險。我們將利用 AI 工具，協助您量化問題的負面影響，創造客戶非改變不可的急迫感。</p>
                                                <ul>
                                                    <li>問出「不改的後果」技巧 (讓客戶講出自己有壓力)</li>
                                                    <li>ChatGPT 幫你說出後果、模擬狀況</li>
                                                    <li>用 AI 查「別人出錯的真實案例」當警示牌</li>
                                                    <li>用 Gemini 打造互動式損失試算網站 (客戶自己輸入就看到風險)</li>
                                                    <li>整理好一段說服話術：導入會省下什麼？</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeSyllabusTab === 4 && (
                                            <div className="transition-all ease-out duration-300 opacity-100 transform-none">
                                                <h3 className="text-2xl font-bold text-slate-800 mb-2">模組四：N - 說明好處：讓對方覺得「你這提案真不錯」</h3>
                                                <p className="text-slate-600 mb-6">當客戶意識到問題的嚴重性後，本模組將教您如何運用 AI 快速生成具備說服力的價值提案，讓客戶清楚看見解決方案能帶來的美好回報。</p>
                                                <ul>
                                                    <li>怎麼問出「對他有好處」的問題 (不是說你很好，而是對方得什麼)</li>
                                                    <li>用 ChatGPT 寫一段價值說明句子</li>
                                                    <li>用 Gamma / Canva 生成一頁式簡報草稿</li>
                                                    <li>做出一份「會讓人想看下去」的提案頁面</li>
                                                </ul>
                                            </div>
                                        )}
                                        {activeSyllabusTab === 5 && (
                                            <div className="transition-all ease-out duration-300 opacity-100 transform-none">
                                                <h3 className="text-2xl font-bold text-slate-800 mb-2">模組五：整合實作演練：從對話到成交，一次練完整流程</h3>
                                                <p className="text-slate-600 mb-6">這是將所有理論與技能融會貫通的實戰環節。學員將在模擬的商業場景中，完整演練從初步接觸到最終提案的全流程 AI 輔助銷售。</p>
                                                <ul>
                                                    <li>小組模擬演練：扮演業務角色，實際操作提問、後果試算與價值呈現的全過程。</li>
                                                    <li>成果評比與回饋：針對模擬演練的表現，由講師提供專業點評與個人化指導。</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="outcomes" className="fade-in-section px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="space-y-16">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">適合對象</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                                        <p className="font-semibold text-slate-700 text-center">B2B、B2C 各行業業務代表／業務主管</p>
                                    </div>
                                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                                        <p className="font-semibold text-slate-700 text-center">想學會如何「用 AI 解決成交問題」的前線同仁</p>
                                    </div>
                                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                                        <p className="font-semibold text-slate-700 text-center">客戶資料多卻不知道怎麼提案的行銷與技術業務</p>
                                    </div>
                                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                                        <p className="font-semibold text-slate-700 text-center">企業內訓需求（可客製不同產業場景）</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">培訓形式與版本</h2>
                                <div className="overflow-x-auto">
                                    <table className="custom-table">
                                        <thead>
                                            <tr>
                                                <th>版本</th>
                                                <th>形式</th>
                                                <th>時數</th>
                                                <th>適合用途</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td>標準版</td><td>1 天工作坊</td><td>6hr</td><td>緊湊實作、範例導向、單場訓練、教育推廣活動</td></tr>
                                            <tr><td>客製版</td><td>客戶場景模組化設計</td><td>依產業調整</td><td>B2B SaaS／製造／金融／醫療等</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact" className="fade-in-section px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative py-20 overflow-hidden bg-slate-800 rounded-2xl">
                            <div className="max-w-4xl mx-auto px-6 text-center">
                                <h2 className="text-3xl font-extrabold text-white">這不只是學會 AI，而是強化你的<span className="accent-gradient-text">成交影響力</span></h2>
                                <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-300">我們相信業務最強的能力，不是背產品規格，而是能聽出問題、放大後果、說出價值、提出解法。AI 是讓這一切「更有效、更快速、更具說服力」的助力。</p>
                                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">若你正在尋找一門能馬上落地、直接提升業績能力的課程，這將是極具回報的選擇。</p>
                                <div className="mt-10">
                                    <Link href="/contact" className="inline-block bg-white text-cyan-700 font-bold text-lg px-10 py-5 rounded-lg shadow-2xl hover:bg-slate-200 transition-all duration-300 transform hover:scale-105">
                                        企業內訓合作詢問
                                    </Link>
                                </div>
                                <p className="mt-6 text-sm text-slate-400">提供課程大綱、客製化內訓課程。<br />請來信：bii.globalservice@gmail.com 或<Link href="/contact" className="underline hover:text-white">聯絡我們表單</Link></p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            
            <footer className="bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-8 text-center text-slate-500">
                    <p>&copy; 2025 突圍智創. All Rights Reserved.</p>
                </div>
            </footer>


            <Script id="ai-spin-animations" strategy="lazyOnload">
                {`
                    // This script handles animations that are self-contained and don't need React state.
                    const initAnimations = () => {
                        // Fade-in animation for sections on scroll
                        const sections = document.querySelectorAll('.fade-in-section');
                        const observer = new IntersectionObserver((entries) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    entry.target.classList.add('is-visible');
                                }
                            });
                        }, {
                            threshold: 0.1
                        });
                        sections.forEach(section => {
                            observer.observe(section);
                        });

                        // Particle and keyword cloud animation for header
                        const canvas = document.getElementById('particle-canvas');
                        if (canvas) {
                            const ctx = canvas.getContext('2d');
                            if (!ctx) return;
                            canvas.width = canvas.offsetWidth;
                            canvas.height = canvas.offsetHeight;

                            let particles = [];
                            const particleCount = 70;

                            class Particle {
                                constructor() {
                                    this.x = Math.random() * canvas.width;
                                    this.y = Math.random() * canvas.height;
                                    this.size = Math.random() * 1.2 + 0.3;
                                    this.speedX = (Math.random() * 0.5 - 0.25) * 0.5;
                                    this.speedY = (Math.random() * 0.5 - 0.25) * 0.5;
                                }
                                update() {
                                    this.x += this.speedX;
                                    this.y += this.speedY;
                                    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                                    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
                                }
                                draw() {
                                    ctx.fillStyle = 'rgba(100, 150, 255, 0.5)';
                                    ctx.beginPath();
                                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                            }

                            function initParticles() {
                                particles = [];
                                for (let i = 0; i < particleCount; i++) {
                                    particles.push(new Particle());
                                }
                            }

                            function animateParticles() {
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                for (let i = 0; i < particles.length; i++) {
                                    particles[i].update();
                                    particles[i].draw();
                                    for (let j = i; j < particles.length; j++) {
                                        const dx = particles[i].x - particles[j].x;
                                        const dy = particles[i].y - particles[j].y;
                                        const distance = Math.sqrt(dx * dx + dy * dy);
                                        if (distance < 150) {
                                            ctx.beginPath();
                                            ctx.strokeStyle = \`rgba(100, 150, 255, \${0.5 - distance / 150})\`;
                                            ctx.lineWidth = 0.3;
                                            ctx.moveTo(particles[i].x, particles[i].y);
                                            ctx.lineTo(particles[j].x, particles[j].y);
                                            ctx.stroke();
                                        }
                                    }
                                }
                                requestAnimationFrame(animateParticles);
                            }
                            
                            initParticles();
                            animateParticles();

                            window.addEventListener('resize', () => {
                                canvas.width = canvas.offsetWidth;
                                canvas.height = canvas.offsetHeight;
                                initParticles();
                            });
                        }

                        const keywordCloud = document.getElementById('keyword-cloud');
                        if (keywordCloud) {
                            const keywords = ['SPIN銷售法', '銷售效率', '成交率', 'ChatGPT', '顧問式銷售', 'Perplexity', 'Gamma', 'Otter.ai', 'Gemini', 'AI賦能', '客戶洞察', '價值提案'];
                            const radius = keywordCloud.offsetWidth / 2.5; 
                            
                            // Clear previous keywords if any
                            keywordCloud.innerHTML = '';
                            
                            keywords.forEach((text, i) => {
                                const phi = Math.acos(-1 + (2 * i + 1) / keywords.length);
                                const theta = Math.sqrt(keywords.length * Math.PI) * phi;
                                
                                const x = radius * Math.cos(theta) * Math.sin(phi);
                                const y = radius * Math.sin(theta) * Math.sin(phi);
                                const z = radius * Math.cos(phi);

                                const item = document.createElement('div');
                                item.className = 'keyword-item';
                                item.innerText = text;
                                
                                item.style.left = '50%';
                                item.style.top = '50%';
                                
                                const scale = (z + radius * 1.5) / (radius * 2.5);
                                item.style.transform = \`translate3d(-50%, -50%, 0) translate3d(\${x}px, \${y}px, \${z}px) scale(\${scale})\`;
                                item.style.fontSize = \`\${0.8 + scale * 0.6}rem\`;
                                item.style.opacity = \`\${0.5 + scale * 0.5}\`;
                                
                                keywordCloud.appendChild(item);
                            });

                            let angleX = 0;
                            let angleY = 0;
                            const cloud = document.getElementById('keyword-cloud');
                            let animationFrameId;
                            
                            function animateCloud() {
                                angleY += 0.05;
                                
                                const rotateX = \`rotateX(\${angleX}deg)\`;
                                const rotateY = \`rotateY(\${angleY}deg)\`;
                                if (cloud) {
                                  cloud.style.transform = \`\${rotateY} \${rotateX}\`;
                                }
                                
                                animationFrameId = requestAnimationFrame(animateCloud);
                            }
                            
                            if(window.innerWidth >= 1024) {
                                // Cancel any previous animation frame to avoid multiple loops
                                if(animationFrameId) cancelAnimationFrame(animationFrameId);
                                animateCloud();
                            }
                        }
                    };

                    // Fix for React Hydration
                    if (typeof window !== 'undefined') {
                        if (document.readyState === 'complete') {
                            initAnimations();
                        } else {
                            window.addEventListener('DOMContentLoaded', initAnimations);
                        }
                    }
                `}
            </Script>
        </div>
    );
};

export default AiSpinTrainingPage; 