'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/lib/language-context';

function Counter({ value, duration = 2 }: { value: string; duration?: number }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const numeric = parseFloat(value);
  const suffix = value.replace(/[\d.]/g, '');

  useEffect(() => {
    if (!inView || isNaN(numeric)) {
      setDisplay(value);
      return;
    }
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const current = numeric * (1 - Math.pow(1 - progress, 3));
      setDisplay(Number.isInteger(numeric) ? Math.floor(current).toString() + suffix : current.toFixed(1) + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, numeric, suffix, value, duration]);

  return <span ref={ref}>{display}</span>;
}

export default function About() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Decorative background */}
      <motion.div
        style={{ y, rotate }}
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full border border-gold-500/10"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 150]) }}
        className="absolute top-1/2 -left-40 w-80 h-80 rounded-full border border-crimson-600/10"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-gold-500" />
              <span className="text-gold-400 text-xs tracking-[0.4em] uppercase">{t.about.label}</span>
            </div>

            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-8">
              {t.about.title}
              <br />
              <span className="italic font-semibold gold-text">{t.about.titleAccent}</span>
            </h2>

            <p className="text-gold-100/70 text-lg leading-relaxed mb-10 font-light max-w-xl">
              {t.about.text}
            </p>

            {/* Japanese signature */}
            <div className="flex items-center gap-4">
              <div className="font-jp text-3xl text-crimson-500">夢</div>
              <div>
                <div className="font-display italic text-gold-300 text-lg">Yumē</div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold-500/60">Le rêve</div>
              </div>
            </div>
          </motion.div>

          {/* Right: 3D tilt card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <TiltCard />
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
          {t.about.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="relative group"
            >
              <div className="glass rounded-2xl p-6 md:p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-50" />
                <div className="font-display text-5xl md:text-6xl font-semibold shimmer-gold mb-2">
                  <Counter value={stat.value} />
                </div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold-300/70">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-[4/5] rounded-3xl overflow-hidden transition-transform duration-300 will-change-transform"
      style={{ transform, transformStyle: 'preserve-3d' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=900&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-crimson-700/20 via-transparent to-gold-600/20" />

      {/* Border glow */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-gold-500/30" />

      {/* Floating badges */}
      <div
        className="absolute top-6 right-6 glass rounded-full px-4 py-2 flex items-center gap-2"
        style={{ transform: 'translateZ(40px)' }}
      >
        <div className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
        <span className="text-xs text-gold-300 tracking-widest uppercase">Fresh Daily</span>
      </div>

      <div
        className="absolute bottom-8 left-8 right-8"
        style={{ transform: 'translateZ(30px)' }}
      >
        <div className="font-jp text-6xl text-gold-400 mb-2 opacity-80">職人</div>
        <div className="font-display italic text-2xl text-white mb-1">Shokunin</div>
        <div className="text-xs tracking-[0.3em] uppercase text-gold-300/70">L'artisan</div>
      </div>
    </div>
  );
}
