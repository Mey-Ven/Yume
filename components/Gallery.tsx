'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const galleryImages = [
  'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
  'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&q=80',
  'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&q=80',
  'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=800&q=80',
  'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=800&q=80',
  'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80',
  'https://images.unsplash.com/photo-1563612116625-3012372fccce?w=800&q=80',
  'https://images.unsplash.com/photo-1558985250-27a406d64cb3?w=800&q=80',
  'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80',
  'https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=800&q=80',
];

export default function Gallery() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-30%', '0%']);

  return (
    <section id="gallery" ref={containerRef} className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gold-500" />
            <span className="text-gold-400 text-xs tracking-[0.4em] uppercase">{t.gallery.label}</span>
            <div className="w-8 h-[1px] bg-gold-500" />
          </div>

          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-4">
            {t.gallery.title}{' '}
            <span className="italic font-semibold shimmer-gold">{t.gallery.titleAccent}</span>
          </h2>

          <p className="text-gold-100/60 text-lg font-light">{t.gallery.subtitle}</p>
        </motion.div>
      </div>

      {/* Row 1: Moves left on scroll */}
      <motion.div style={{ x: x1 }} className="flex gap-6 mb-6 w-[180%]">
        {[...galleryImages.slice(0, 5), ...galleryImages.slice(0, 5)].map((img, i) => (
          <GalleryItem key={`r1-${i}`} img={img} onClick={() => setLightbox(img)} size="large" />
        ))}
      </motion.div>

      {/* Row 2: Moves right on scroll */}
      <motion.div style={{ x: x2 }} className="flex gap-6 w-[180%]">
        {[...galleryImages.slice(5), ...galleryImages.slice(5)].map((img, i) => (
          <GalleryItem key={`r2-${i}`} img={img} onClick={() => setLightbox(img)} size="medium" />
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-ink-950/95 backdrop-blur-2xl flex items-center justify-center p-6 cursor-pointer"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-gold-400 p-2 hover:rotate-90 transition-transform duration-500"
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={lightbox}
              alt=""
              className="max-h-[90vh] max-w-[90vw] rounded-2xl ring-1 ring-gold-500/30"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryItem({ img, onClick, size }: { img: string; onClick: () => void; size: 'large' | 'medium' }) {
  const [hover, setHover] = useState(false);
  const height = size === 'large' ? 'h-96 md:h-[480px]' : 'h-72 md:h-96';
  const width = size === 'large' ? 'w-[380px] md:w-[480px]' : 'w-[300px] md:w-[380px]';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative flex-shrink-0 ${width} ${height} rounded-2xl overflow-hidden group cursor-pointer`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
        style={{ backgroundImage: `url('${img}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      <div className="absolute inset-0 ring-1 ring-gold-500/20 rounded-2xl" />

      {/* Hover badge */}
      <div
        className={`absolute bottom-4 left-4 glass rounded-full px-4 py-2 transition-all duration-500 ${
          hover ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <span className="text-xs tracking-widest uppercase text-gold-300 font-jp">拡大</span>
      </div>
    </button>
  );
}
