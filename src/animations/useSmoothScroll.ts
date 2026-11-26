import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export interface SmoothScrollState {
  progressRef: React.MutableRefObject<number>;
  scrollToTop: () => void;
  scrollToFraction: (fraction: number) => void;
}

/**
 * Reusable Lenis smooth-scroll controller that updates a mutable normalized
 * scroll-progress ref (0..1) for zero-re-render 3D parallax and GSAP/UI sync.
 */
export function useSmoothScroll(
  onProgress?: (progress: number) => void,
): SmoothScrollState {
  const progressRef = useRef<number>(0);
  const lenisRef = useRef<Lenis | null>(null);
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.01 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    const updateProgress = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const raw = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const clamped = Math.max(0, Math.min(1, raw));
      progressRef.current = clamped;
      onProgressRef.current?.(clamped);
    };

    lenis.on('scroll', () => {
      updateProgress();
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    updateProgress();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToFraction = (fraction: number) => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const target = Math.max(0, Math.min(1, fraction)) * Math.max(0, maxScroll);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target);
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };

  return { progressRef, scrollToTop, scrollToFraction };
}
