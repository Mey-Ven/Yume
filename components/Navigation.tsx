'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function Navigation() {
  const { locale, setLocale, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#home', label: t.nav.home },
    { href: '#menu', label: t.nav.menu },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#reservation', label: t.nav.reservation },
    { href: '#order', label: t.nav.order },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3 bg-ink-950/85 backdrop-blur-xl border-b border-gold-500/10' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-3">
            <div className="relative w-11 h-11">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-400 to-crimson-600 opacity-90 group-hover:opacity-100 transition" />
              <div className="absolute inset-[2px] rounded-full bg-ink-950 flex items-center justify-center">
                <span className="font-jp text-gold-400 text-lg font-bold">夢</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-xl font-semibold shimmer-gold tracking-wide">Yumē</div>
              <div className="text-[10px] tracking-[0.3em] text-gold-500/70 uppercase -mt-1">Sushi & More</div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm text-gold-300/80 hover:text-gold-300 transition group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gold-400 group-hover:w-6 transition-all duration-500" />
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold-500/30 text-xs text-gold-300 hover:bg-gold-500/10 transition uppercase tracking-widest"
            >
              <Globe size={12} />
              {locale === 'fr' ? 'EN' : 'FR'}
            </button>

            <a
              href="#reservation"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-ink-950 text-xs font-semibold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(232,194,102,0.5)] transition-all duration-500"
            >
              {t.nav.reservation}
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-gold-400 p-2"
              aria-label="menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink-950/98 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="font-display text-3xl text-gold-300 hover:text-gold-400 transition"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
