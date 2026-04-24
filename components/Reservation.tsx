'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Mail, Phone, User, MessageSquare, Check } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function Reservation() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', date: '', time: '', guests: '2', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="reservation" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900/95 to-ink-950" />
      </div>

      <div className="absolute top-20 left-10 font-jp text-[12rem] text-gold-500/[0.03] leading-none pointer-events-none select-none">
        予約
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gold-500" />
            <span className="text-gold-400 text-xs tracking-[0.4em] uppercase">{t.reservation.label}</span>
            <div className="w-8 h-[1px] bg-gold-500" />
          </div>

          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-4">
            {t.reservation.title}{' '}
            <span className="italic font-semibold shimmer-gold">{t.reservation.titleAccent}</span>
          </h2>

          <p className="text-gold-100/60 text-lg font-light">{t.reservation.subtitle}</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Gold corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-gold-500/40 rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-gold-500/40 rounded-br-3xl" />

          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              icon={<User size={16} />}
              type="text"
              placeholder={t.reservation.name}
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              required
            />
            <InputField
              icon={<Mail size={16} />}
              type="email"
              placeholder={t.reservation.email}
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              required
            />
            <InputField
              icon={<Phone size={16} />}
              type="tel"
              placeholder={t.reservation.phone}
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
              required
            />
            <InputField
              icon={<Users size={16} />}
              type="number"
              placeholder={t.reservation.guests}
              value={form.guests}
              onChange={(v) => setForm({ ...form, guests: v })}
              min="1"
              max="20"
              required
            />
            <InputField
              icon={<Calendar size={16} />}
              type="date"
              placeholder={t.reservation.date}
              value={form.date}
              onChange={(v) => setForm({ ...form, date: v })}
              required
            />
            <InputField
              icon={<Clock size={16} />}
              type="time"
              placeholder={t.reservation.time}
              value={form.time}
              onChange={(v) => setForm({ ...form, time: v })}
              required
            />
          </div>

          <div className="mt-6">
            <InputField
              icon={<MessageSquare size={16} />}
              type="textarea"
              placeholder={t.reservation.message}
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
            />
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="glow-btn group inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-ink-950 text-sm font-semibold uppercase tracking-widest hover:shadow-[0_0_40px_rgba(232,194,102,0.6)] transition-all duration-500 disabled:opacity-60"
            >
              {status === 'loading' ? t.reservation.submitting : t.reservation.submit}
              {status === 'success' && <Check size={16} />}
            </button>

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gold-300 text-sm"
              >
                ✓ {t.reservation.success}
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-crimson-500 text-sm"
              >
                {t.reservation.error}
              </motion.div>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}

type InputFieldProps = {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  min?: string;
  max?: string;
};

function InputField({ icon, type, placeholder, value, onChange, required, min, max }: InputFieldProps) {
  const [focused, setFocused] = useState(false);

  if (type === 'textarea') {
    return (
      <div className={`relative group`}>
        <div className="absolute top-4 left-4 text-gold-500/60">{icon}</div>
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={3}
          required={required}
          className="w-full pl-12 pr-4 py-4 bg-ink-950/60 rounded-xl border border-gold-500/20 text-gold-100 placeholder:text-gold-500/40 focus:border-gold-400 focus:outline-none transition-all duration-300 resize-none"
        />
        <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-gold-400 to-crimson-500 transition-all duration-500 ${focused ? 'w-full' : 'w-0'}`} />
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gold-500/60">{icon}</div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        min={min}
        max={max}
        className="w-full pl-12 pr-4 py-4 bg-ink-950/60 rounded-xl border border-gold-500/20 text-gold-100 placeholder:text-gold-500/40 focus:border-gold-400 focus:outline-none transition-all duration-300 [color-scheme:dark]"
      />
      <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-gold-400 to-crimson-500 transition-all duration-500 rounded-full ${focused ? 'w-full' : 'w-0'}`} />
    </div>
  );
}
