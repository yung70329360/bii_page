'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

const footerNavigation = {
  solutions: [
    { name: 'AI SPIN 培訓', href: '/ai-spin-training' },
    { name: '企業內訓', href: '#' },
    { name: '顧問服務', href: '#' },
  ],
  resources: [
    { name: '知識庫', href: '/knowledge-base' },
    { name: '電子書', href: '/ebooks' },
    { name: '成功案例', href: '#' },
  ],
  company: [
    { name: '關於我們', href: '/about' },
    { name: '人才招募', href: '#' },
    { name: '聯絡我們', href: '/contact' },
  ],
  legal: [
    { name: '隱私權政策', href: '#' },
    { name: '服務條款', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="pb-8 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
               <Link href="/">
                <Image src="/Logo/logo.png" alt="BiiPage Logo" width={100} height={35} />
              </Link>
              <p className="text-sm text-gray-500 hidden md:block">
                讓 AI 變得簡單，讓軟體變得智慧
              </p>
            </div>
            <div className="flex space-x-3">
              {socialLinks.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500 bg-gray-100 rounded-full p-2 transition-colors">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
                <h3 className="text-sm font-semibold text-blue-900 tracking-wider uppercase">解決方案</h3>
                <ul role="list" className="mt-4 space-y-2">
                    {footerNavigation.solutions.map((item) => (
                        <li key={item.name}>
                            <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="text-sm font-semibold text-blue-900 tracking-wider uppercase">資源</h3>
                <ul role="list" className="mt-4 space-y-2">
                    {footerNavigation.resources.map((item) => (
                        <li key={item.name}>
                            <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
             <div>
                <h3 className="text-sm font-semibold text-blue-900 tracking-wider uppercase">公司</h3>
                <ul role="list" className="mt-4 space-y-2">
                    {footerNavigation.company.map((item) => (
                        <li key={item.name}>
                            <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="text-sm font-semibold text-blue-900 tracking-wider uppercase">法律</h3>
                <ul role="list" className="mt-4 space-y-2">
                    {footerNavigation.legal.map((item) => (
                        <li key={item.name}>
                            <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
                 {footerNavigation.legal.map((item) => (
                    <a key={item.name} href={item.href} className="text-sm text-gray-500 hover:text-gray-900">
                        {item.name}
                    </a>
                ))}
            </div>
          <p className="mt-8 text-sm text-gray-500 md:mt-0 md:order-1">
            &copy; {new Date().getFullYear()} BiiPage, Inc. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 