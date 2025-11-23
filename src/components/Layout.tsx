'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CircuitBoard,
  Wrench,
  Droplets,
  Star,
  Menu,
  X,
  ChevronRight,
  PowerOff,
  Database,
} from 'lucide-react';

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(' ');

export const Button = ({
  className = '',
  children,
  variant = 'primary',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm hover:shadow-md';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 px-5 py-3',
    secondary:
      'bg-transparent text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-600 px-5 py-3',
  };

  return (
    <button className={cn(baseClasses, variantClasses[variant], className)} {...props}>
      {children}
    </button>
  );
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { name: 'サービス', href: '#features' },
    { name: '修理事例', href: '/repairs' },
    { name: '技術コラム', href: '/blog' },
    { name: 'お問い合わせ', href: '/contact' },
  ];

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <CircuitBoard className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">基板修理.com</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <Link href="/contact">
              <Button>無料相談・お見積もり</Button>
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="メニューを開く"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <nav className="flex flex-col px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
               <Link href="/contact">
                <Button className="w-full">無料相談・お見積もり</Button>
               </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export const Footer = () => (
  <footer className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <nav className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-8">
        {[
          { name: '修理事例', href: '/repairs' },
          { name: '利用規約', href: '/terms' },
          { name: '会社概要', href: '/about' },
        ].map(link => (
          <Link
            key={link.name}
            href={link.href}
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <p className="text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} 基板修理.com. All Rights Reserved.</p>
    </div>
  </footer>
);