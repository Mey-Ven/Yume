'use client';

import { motion } from 'framer-motion';
import { Bike, ShoppingBag, Phone, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function Order() {
  const { t } = useLanguage();

  const options = [
    {
      icon: <Bike size={32} />,
      title: t.order.delivery,
      desc: t.order.deliveryDesc,
      jp: '配達',
      cta: t.order.glovo,
      href: 'https://glovoapp.com',
      gradient: 'from-crimson-600 to-crimson-700',
    },
    {
      icon: <ShoppingBag size={32} />,
      title: t.order.takeaway,
      desc: t.order.takeawayDesc,
      jp: '持ち帰り',
      cta: t.order.call,
      href: 'tel:+212000000000',
      gradient: 'from-gold-500 to-gold-600',
    },
  ];

  return (
    <section id="order" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold-600/5 blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gold-500" />
            <span className="text-gold-400 text-xs tracking-[0.4em] uppercase">{t.order.label}</span>
            <div className="w-8 h-[1px] bg-gold-500" />
          </div>

          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-4">
            {t.order.title}{' '}
            <span className="italic font-semibold shimmer-gold">{t.order.titleAccent}</span>
          </h2>

          <p className="text-gold-100/60 text-lg font-light">{t.order.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {options.map((opt, i) => (
            <motion.a
              key={i}
              href={opt.href}
              target={opt.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl overflow-hidden glass p-10 md:p-12 block"
            >
              {/* Background glow */}
              <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br ${opt.gradient} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-700`} />

              {/* JP character background */}
              <div className="absolute top-4 right-6 font-jp text-[8rem] text-gold-500/5 leading-none pointer-events-none select-none">
                {opt.jp}
              </div>

              {/* Icon */}
              <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${opt.gradient} flex items-center justify-center text-ink-950 mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                {opt.icon}
              </div>

              {/* Content */}
              <h3 className="relative font-display text-3xl md:text-4xl text-gold-300 mb-3 font-semibold">
                {opt.title}
              </h3>
              <p className="relative text-gold-100/70 text-base leading-relaxed mb-8 max-w-md">
                {opt.desc}
              </p>

              {/* CTA */}
              <div className="relative inline-flex items-center gap-3 text-gold-400 text-sm font-semibold uppercase tracking-widest group-hover:gap-5 transition-all duration-500">
                {opt.cta}
                <span className="w-8 h-[1px] bg-gold-400 group-hover:w-12 transition-all duration-500" />
                <span className="font-jp">→</span>
              </div>

              {/* Border accent */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-gold-500/20 group-hover:ring-gold-500/40 transition-all duration-500" />
            </motion.a>
          ))}
        </div>

        {/* Hours banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-3 text-gold-300/80"
        >
          <Clock size={16} />
          <span className="text-sm tracking-widest uppercase">{t.contact.hours}</span>
        </motion.div>
      </div>
    </section>
  );
}
