'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Send, Check, Instagram, Mail } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute top-40 right-10 font-jp text-[12rem] text-crimson-500/[0.03] leading-none pointer-events-none select-none">
        連絡
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
            <span className="text-gold-400 text-xs tracking-[0.4em] uppercase">{t.contact.label}</span>
            <div className="w-8 h-[1px] bg-gold-500" />
          </div>

          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05]">
            {t.contact.title}{' '}
            <span className="italic font-semibold shimmer-gold">{t.contact.titleAccent}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-5"
          >
            <InfoCard
              icon={<MapPin size={20} />}
              title={t.contact.label}
              value={t.contact.address}
              href="https://maps.app.goo.gl/qQcvTDfVPtHaxQWt7"
              jp="場所"
            />
            <InfoCard
              icon={<Clock size={20} />}
              title="Horaires"
              value={t.contact.hours}
              jp="時間"
            />
            <InfoCard
              icon={<Instagram size={20} />}
              title="Instagram"
              value="@yumesushis"
              href="https://www.instagram.com/yumesushis/"
              jp="写真"
            />

            {/* Map embed */}
            <div className="relative rounded-2xl overflow-hidden h-64 ring-1 ring-gold-500/20 glass">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.123!2d-7.6786776!3d33.5470292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda62d004f1f144d%3A0x7ad2b4f46700ad0b!2sYum%C4%93%20sushi%20%26%20more!5e0!3m2!1sen!2sma!4v1735000000000!5m2!1sen!2sma"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(0.92) hue-rotate(180deg) saturate(0.7)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Yumē Sushi location"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 glass rounded-3xl p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gold-500/40 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-gold-500/40 rounded-bl-3xl" />

            <div className="space-y-5">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t.contact.name}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-5 py-4 bg-ink-950/60 rounded-xl border border-gold-500/20 text-gold-100 placeholder:text-gold-500/40 focus:border-gold-400 focus:outline-none transition-all duration-300"
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  placeholder={t.contact.email}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-5 py-4 bg-ink-950/60 rounded-xl border border-gold-500/20 text-gold-100 placeholder:text-gold-500/40 focus:border-gold-400 focus:outline-none transition-all duration-300"
                />
              </div>

              <div className="relative">
                <textarea
                  placeholder={t.contact.message}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-5 py-4 bg-ink-950/60 rounded-xl border border-gold-500/20 text-gold-100 placeholder:text-gold-500/40 focus:border-gold-400 focus:outline-none transition-all duration-300 resize-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-y-3 pt-2">
                {status === 'success' ? (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold-300 text-sm">
                    ✓ Message envoyé !
                  </motion.span>
                ) : status === 'error' ? (
                  <span className="text-crimson-500 text-sm">Erreur, réessayez.</span>
                ) : (
                  <span className="text-gold-500/50 text-xs tracking-widest uppercase">
                    Réponse sous 24h
                  </span>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group glow-btn inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-ink-950 text-sm font-semibold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(232,194,102,0.5)] transition-all duration-500 disabled:opacity-60"
                >
                  {status === 'loading' ? '...' : t.contact.submit}
                  {status === 'success' ? <Check size={16} /> : <Send size={14} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  title,
  value,
  href,
  jp,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  jp: string;
}) {
  const content = (
    <>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 font-jp text-5xl text-gold-500/10 group-hover:text-gold-500/20 transition-colors">
        {jp}
      </div>

      <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-ink-950 flex-shrink-0">
        {icon}
      </div>

      <div className="relative flex-1 min-w-0">
        <div className="text-[10px] tracking-[0.3em] uppercase text-gold-500/60 mb-1">{title}</div>
        <div className="text-gold-100 text-sm leading-snug">{value}</div>
      </div>
    </>
  );

  const className =
    'group relative glass rounded-2xl p-6 flex items-center gap-5 overflow-hidden hover:border-gold-500/40 transition-all duration-500';

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }
  return <div className={className}>{content}</div>;
}
