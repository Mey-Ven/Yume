'use client';

import { motion } from 'framer-motion';
import { Instagram, Facebook, MapPin, Heart } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden border-t border-gold-500/10">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      {/* Background glow */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-gold-600/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo-yume.svg"
                  alt="Yume Sushi logo"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <div>
                <div className="font-display text-2xl font-semibold shimmer-gold tracking-wide">Yumē</div>
                <div className="text-[10px] tracking-[0.3em] text-gold-500/70 uppercase -mt-1">Sushi & More</div>
              </div>
            </div>
            <p className="text-gold-100/60 text-sm leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="text-[10px] tracking-[0.3em] uppercase text-gold-500/60 mb-4">Navigation</div>
            <div className="grid grid-cols-2 gap-y-2 gap-x-8">
              {[
                { href: '#home', label: t.nav.home },
                { href: '#menu', label: t.nav.menu },
                { href: '#gallery', label: t.nav.gallery },
                { href: '#reservation', label: t.nav.reservation },
                { href: '#order', label: t.nav.order },
                { href: '#contact', label: t.nav.contact },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gold-100/70 text-sm hover:text-gold-300 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact + social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-[10px] tracking-[0.3em] uppercase text-gold-500/60 mb-4">{t.footer.follow}</div>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.instagram.com/yumesushis/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-ink-950 hover:border-gold-500 transition-all duration-500"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-11 h-11 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-ink-950 hover:border-gold-500 transition-all duration-500"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://maps.app.goo.gl/qQcvTDfVPtHaxQWt7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-ink-950 hover:border-gold-500 transition-all duration-500"
              >
                <MapPin size={16} />
              </a>
            </div>

            <div className="text-sm text-gold-100/60 leading-relaxed">
              {t.contact.address}
              <br />
              <span className="text-gold-500/50">{t.contact.hours}</span>
            </div>
          </motion.div>
        </div>

        {/* Divider with JP character */}
        <div className="flex items-center gap-6 mb-8">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
          <div className="font-jp text-2xl text-gold-500/40">夢</div>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gold-500/50">
          <div>
            © {new Date().getFullYear()} Yumē Sushi & More. {t.footer.rights}.
          </div>
          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <Heart size={12} className="text-crimson-500 fill-crimson-500" />
            <span>in Casablanca</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
