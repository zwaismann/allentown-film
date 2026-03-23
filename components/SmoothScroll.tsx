'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const rafIdRef = useRef<number>(0);
  const snapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let isSnapping = false;

    const handleScroll = () => {
      if (isSnapping) return;
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);

      snapTimeoutRef.current = setTimeout(() => {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        // Near the very top? Snap to 0
        if (scrollY > 10 && scrollY < vh * 0.3) {
          isSnapping = true;
          lenis.scrollTo(0, { duration: 0.8 });
          setTimeout(() => { isSnapping = false; }, 900);
          return;
        }

        // Find nearest section start
        const ids = ['story', 'contest', 'men', 'timeline', 'film', 'director', 'team', 'contact'];
        let bestOffset = -1;
        let bestDist = Infinity;

        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top + scrollY;
          const dist = Math.abs(top - scrollY);
          if (dist < bestDist && dist < vh * 0.25) {
            bestDist = dist;
            bestOffset = top;
          }
        }

        if (bestOffset >= 0 && bestDist > 5) {
          isSnapping = true;
          lenis.scrollTo(bestOffset, { duration: 0.6 });
          setTimeout(() => { isSnapping = false; }, 750);
        }
      }, 200);
    };

    lenis.on('scroll', handleScroll);

    function raf(time: number) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }
    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
      cancelAnimationFrame(rafIdRef.current);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
