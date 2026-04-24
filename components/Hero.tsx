'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import { ArrowRight, ChevronDown } from 'lucide-react';
import * as THREE from 'three';
import { useLanguage } from '@/lib/language-context';

function AnimatedOrb({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#f5d78c" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#c8232c" />
      <AnimatedOrb position={[-2.5, 1, 0]} color="#d4a343" scale={1.2} />
      <AnimatedOrb position={[2.8, -0.5, -1]} color="#a31b24" scale={0.8} />
      <AnimatedOrb position={[0, -1.8, -2]} color="#8f661e" scale={1} />
    </Canvas>
  );
}

type PetalStyle = {
  left: string;
  width: string;
  height: string;
  animationDelay: string;
  animationDuration: string;
};

function Sakura() {
  const [petals, setPetals] = useState<PetalStyle[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: 25 }, () => {
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = 8 + Math.random() * 12;
        const size = 8 + Math.random() * 10;
        return {
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        };
      })
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {petals.map((style, i) => (
        <div key={i} className="sakura" style={style} />
      ))}
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950" />

      {/* Glow orbs background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-crimson-600/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gold-600/15 blur-[140px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* 3D scene */}
      <div className="absolute inset-0 opacity-40">
        <Scene3D />
      </div>

      {/* Sakura */}
      <Sakura />

      {/* Vertical Japanese text decoration */}
      <div className="absolute top-32 right-8 lg:right-16 vertical-jp font-jp text-gold-500/20 text-4xl lg:text-6xl hidden md:block pointer-events-none">
        寿司の芸術
      </div>
      <div className="absolute bottom-32 left-8 lg:left-16 vertical-jp font-jp text-crimson-500/15 text-4xl lg:text-6xl hidden md:block pointer-events-none">
        新鮮な味
      </div>

      {/* Decorative line elements */}
      <div className="absolute top-1/2 left-0 w-32 h-[1px] bg-gradient-to-r from-transparent to-gold-500/40" />
      <div className="absolute top-1/2 right-0 w-32 h-[1px] bg-gradient-to-l from-transparent to-gold-500/40" />

      {/* Main content */}
      <motion.div
        style={{ y: smoothY, opacity, scale }}
        className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 pt-0 md:pt-32 pb-12 md:pb-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-12 h-[1px] bg-gold-500" />
          <span className="text-gold-400 text-xs tracking-[0.4em] uppercase font-light">{t.hero.tagline}</span>
          <div className="w-12 h-[1px] bg-gold-500" />
        </motion.div>

        <h1 className="font-display text-center leading-[0.95] mb-6">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="block text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white tracking-tight"
          >
            {t.hero.title}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="block text-6xl md:text-8xl lg:text-9xl xl:text-[11rem] font-semibold italic leading-[1.08] pb-2 md:leading-[1.12] md:pb-3 lg:leading-[1.08] lg:pb-4 xl:leading-[1.06] xl:pb-6 shimmer-gold"
          >
            {t.hero.titleAccent}
          </motion.span>
        </h1>

        {/* Japanese character accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="font-jp text-crimson-500 text-5xl md:text-6xl my-2 md:my-4"
        >
          夢
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="max-w-2xl text-center text-gold-100/70 text-base md:text-lg leading-relaxed mb-8 md:mb-12 font-light"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#menu"
            className="group glow-btn inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-ink-950 text-sm font-semibold uppercase tracking-widest hover:shadow-[0_0_40px_rgba(232,194,102,0.6)] transition-all duration-500"
          >
            {t.hero.cta}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#reservation"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-gold-500/40 text-gold-300 text-sm font-semibold uppercase tracking-widest hover:bg-gold-500/10 hover:border-gold-500 transition-all duration-500"
          >
            {t.hero.cta2}
          </a>
        </motion.div>

        {/* Rating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12 flex items-center gap-3 px-6 py-3 rounded-full glass"
        >
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#e8c266">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="text-gold-300 text-sm font-medium">4.9/5 · 299 avis Google</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-gold-500/50"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase">{t.hero.scroll}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      <div className="vignette" />
    </section>
  );
}
