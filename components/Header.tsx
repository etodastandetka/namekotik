'use client';

import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-sm bg-black/20' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="text-lg sm:text-xl font-semibold text-white">
            name_kotik
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              href="/"
              className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base"
            >
              Главная
            </Link>
            <Link
              href="/second"
              className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base"
            >
              О себе
            </Link>
            <Link
              href="/contacts"
              className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base"
            >
              Контакты
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Меню"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          <div className="space-y-3 pb-4 border-t border-white/10 pt-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-white hover:text-gray-300 transition-colors w-full text-left py-2 px-2 rounded-lg hover:bg-white/5"
            >
              Главная
            </Link>
            <Link
              href="/second"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-white hover:text-gray-300 transition-colors w-full text-left py-2 px-2 rounded-lg hover:bg-white/5"
            >
              О себе
            </Link>
            <Link
              href="/contacts"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-white hover:text-gray-300 transition-colors w-full text-left py-2 px-2 rounded-lg hover:bg-white/5"
            >
              Контакты
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

