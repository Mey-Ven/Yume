'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/language-context';

const menuImages: Record<string, string> = {
  'sushi-0': 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600&q=80',
  'maki-1': 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&q=80',
  'sashimi-2': 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&q=80',
  'special-3': 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=600&q=80',
  'maki-4': 'https://images.unsplash.com/photo-1563612116625-3012372fccce?w=600&q=80',
  'special-5': 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80',
};

export default function Menu() {
  const { t, locale } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: locale === 'fr' ? 'Tout' : 'All' },
    { id: 'sushi', label: t.menu.categories.sushi },
    { id: 'maki', label: t.menu.categories.maki },
    { id: 'sashimi', label: t.menu.categories.sashimi },
    { id: 'special', label: t.menu.categories.special },
  ];

  const filtered = activeCategory === 'all'
    ? t.menu.items
    : t.menu.items.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-crimson-700/10 blur-[150px]" />
      </div>

      {/* Huge Japanese text background */}
      <div className="absolute top-10 right-0 font-jp text-[20rem] text-gold-500/[0.02] leading-none pointer-events-none select-none">
        寿司
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gold-500" />
            <span className="text-gold-400 text-xs tracking-[0.4em] uppercase">{t.menu.label}</span>
            <div className="w-8 h-[1px] bg-gold-500" />
          </div>

          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-4">
            {t.menu.title}{' '}
            <span className="italic font-semibold shimmer-gold">{t.menu.titleAccent}</span>
          </h2>

          <p className="text-gold-100/60 text-lg font-light max-w-xl mx-auto">{t.menu.subtitle}</p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-5 md:px-7 py-2.5 rounded-full text-xs md:text-sm tracking-widest uppercase transition-all duration-500 ${
                activeCategory === cat.id
                  ? 'text-ink-950 font-semibold'
                  : 'text-gold-300/70 hover:text-gold-300 border border-gold-500/20'
              }`}
            >
              {activeCategory === cat.id && (
                <motion.span
                  layoutId="activeCat"
                  className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filtered.map((item, i) => {
              const originalIdx = t.menu.items.findIndex(
                (it) => it.name === item.name && it.category === item.category
              );
              const imgKey = `${item.category}-${originalIdx}`;
              return (
                <MenuCard
                  key={`${activeCategory}-${i}`}
                  item={item}
                  index={i}
                  img={menuImages[imgKey] || menuImages['sushi-0']}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#order"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-gold-500/40 text-gold-300 text-sm uppercase tracking-widest hover:bg-gold-500/10 transition-all duration-500"
          >
            {t.menu.viewAll}
            <span className="font-jp text-lg">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function MenuCard({ item, index, img }: { item: any; index: number; img: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -8;
    const rotateY = ((x - rect.width / 2) / rect.width) * 8;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="menu-card relative rounded-2xl overflow-hidden"
    >
      <div className="menu-glow" />
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTransform('')}
        style={{ transform, transformStyle: 'preserve-3d' }}
        className="relative bg-ink-800/50 backdrop-blur rounded-2xl overflow-hidden border border-gold-500/10 transition-transform duration-300"
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
            style={{ backgroundImage: `url('${img}')`, transform: 'translateZ(20px)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />

          {/* Price badge */}
          <div
            className="absolute top-4 right-4 glass rounded-full px-4 py-1.5"
            style={{ transform: 'translateZ(40px)' }}
          >
            <span className="font-display text-lg font-semibold shimmer-gold">{item.price}</span>
            <span className="text-[10px] text-gold-300/70 ml-1 tracking-widest">MAD</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6" style={{ transform: 'translateZ(10px)' }}>
          <h3 className="font-display text-2xl font-semibold text-gold-300 mb-2">{item.name}</h3>
          <p className="text-sm text-gold-100/60 leading-relaxed">{item.desc}</p>

          <div className="mt-4 pt-4 border-t border-gold-500/10 flex items-center justify-between">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gold-500/60">
              {item.category}
            </span>
            <div className="font-jp text-gold-500/50 text-sm">美味</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
