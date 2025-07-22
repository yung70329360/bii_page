'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

const mainNavLinks = [
  { href: 'https://bii.tw', label: '首頁', isExternal: true },
  { href: '/ai-spin-training', label: 'AI SPIN培訓' },
  { href: '/knowledge-base', label: '知識庫' },
  {
    label: '電子書',
    subLinks: [{ href: '/ebooks/wisdom-strategy', label: '《智慧策略》' }],
  },
  { href: '/about', label: '關於我們' },
];

const contactLink = { href: '/contact', label: '聯絡我們' };

export default function Navigator() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isEbookMenuOpen, setIsEbookMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-white shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <a href="https://bii.tw" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition">
                <Image src="/Logo/logo.png" alt="BiiPage Logo" width={120} height={40} />
              </a>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-1">
                {mainNavLinks.map((link) => {
                  if (link.isExternal) {
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    );
                  }
                  if (link.subLinks) {
                    return (
                      <div key={link.label} className="relative group">
                        <button
                          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center gap-1 ${
                            pathname.startsWith('/ebooks')
                              ? 'text-blue-600 font-semibold'
                              : 'text-gray-900 hover:text-blue-600'
                          }`}
                        >
                          {link.label}
                          <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                        </button>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                          <div className="py-1">
                            {link.subLinks.map((subLink) => (
                              <Link
                                key={subLink.href}
                                href={subLink.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                {subLink.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                        pathname === link.href
                          ? 'text-blue-600 font-semibold'
                          : 'text-gray-900 hover:text-blue-600'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden sm:block">
              <Link
                href={contactLink.href}
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm transition-all duration-300 transform hover:scale-105"
              >
                {contactLink.label}
              </Link>
            </div>
            <div className="-mr-2 flex sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {mainNavLinks.map((link) => {
              if (link.isExternal) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-600 hover:text-white transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                );
              }
              if (link.subLinks) {
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setIsEbookMenuOpen(!isEbookMenuOpen)}
                      className="w-full flex justify-between items-center text-gray-700 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-base font-medium transition"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          isEbookMenuOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isEbookMenuOpen && (
                      <div className="mt-1 pl-4">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.href}
                            href={subLink.href}
                            className="text-gray-700 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition"
                            onClick={() => setIsOpen(false)}
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                    pathname === link.href
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-blue-600 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href={contactLink.href}
              className="text-gray-700 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition"
              onClick={() => setIsOpen(false)}
            >
              {contactLink.label}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 