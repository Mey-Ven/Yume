'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function CursorAndProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [mouse, setMouse] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)');

    const updateVisibility = () => setShowCursor(mediaQuery.matches);

    updateVisibility();

    if (!mediaQuery.matches) return;

    const moveHandler = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(
        !!target.closest('a, button, input, textarea, [role="button"]')
      );
    };

    window.addEventListener('mousemove', moveHandler);
    mediaQuery.addEventListener('change', updateVisibility);

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      mediaQuery.removeEventListener('change', updateVisibility);
    };
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-400 via-crimson-500 to-gold-400 z-[200] origin-left"
        style={{ scaleX }}
      />

      {/* Custom cursor */}
      {showCursor && (
        <>
          <motion.div
            className="pointer-events-none fixed z-[150] rounded-full border border-gold-400 mix-blend-difference"
            animate={{
              x: mouse.x - (isPointer ? 20 : 12),
              y: mouse.y - (isPointer ? 20 : 12),
              width: isPointer ? 40 : 24,
              height: isPointer ? 40 : 24,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
          />
          <motion.div
            className="pointer-events-none fixed z-[150] w-1.5 h-1.5 rounded-full bg-gold-400"
            animate={{
              x: mouse.x - 3,
              y: mouse.y - 3,
            }}
            transition={{ type: 'spring', stiffness: 800, damping: 30, mass: 0.2 }}
          />
        </>
      )}
    </>
  );
}
