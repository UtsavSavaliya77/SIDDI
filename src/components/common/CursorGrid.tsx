import React, { useRef, useEffect } from 'react';
import './CursorGrid.css';

interface CursorGridProps {
  cellSize?: number;
  color?: string;
  radius?: number;
  falloff?: 'linear' | 'smooth' | 'sharp';
  holdTime?: number;
  fadeDuration?: number;
  lineWidth?: number;
  maxOpacity?: number;
  fillOpacity?: number;
  gridOpacity?: number;
  cellRadius?: number;
  clickPulse?: boolean;
  pulseSpeed?: number;
  className?: string;
  targetRef?: React.RefObject<HTMLElement | null>;
  autoAnimateOnTouch?: boolean;
}

const FALLOFF_CURVES: Record<string, (t: number) => number> = {
  linear: (t: number) => t,
  smooth: (t: number) => t * t * (3 - 2 * t),
  sharp: (t: number) => t * t * t
};

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace('#', '');
  const v = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const num = parseInt(v.slice(0, 6), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

export const CursorGrid: React.FC<CursorGridProps> = ({
  cellSize = 70,
  color = '#F2B705',
  radius = 140,
  falloff = 'smooth',
  holdTime = 400,
  fadeDuration = 800,
  lineWidth = 1.2,
  maxOpacity = 1,
  fillOpacity = 0,
  gridOpacity = 0,
  cellRadius = 0,
  clickPulse = true,
  pulseSpeed = 600,
  className = '',
  targetRef,
  autoAnimateOnTouch = true
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const propsRef = useRef({
    cellSize,
    color,
    radius,
    falloff,
    holdTime,
    fadeDuration,
    lineWidth,
    maxOpacity,
    fillOpacity,
    gridOpacity,
    cellRadius,
    clickPulse,
    pulseSpeed,
    autoAnimateOnTouch
  });
  const wakeRef = useRef<(() => void) | null>(null);

  propsRef.current = {
    cellSize,
    color,
    radius,
    falloff,
    holdTime,
    fadeDuration,
    lineWidth,
    maxOpacity,
    fillOpacity,
    gridOpacity,
    cellRadius,
    clickPulse,
    pulseSpeed,
    autoAnimateOnTouch
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const eventTarget = targetRef?.current || container;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let cols = 0;
    let rows = 0;
    let offX = 0;
    let offY = 0;
    let alphas = new Float32Array(0);
    let touched = new Float64Array(0);
    let w = 0;
    let h = 0;
    const pulses: Array<{ x: number; y: number; t0: number }> = [];
    let raf = 0;
    let running = false;
    let lastFrame = 0;
    let isIntersecting = true;

    // Check if device is mobile or tablet screen (width <= 1024px or primary touch)
    const isMobileOrTablet = () => {
      if (typeof window === 'undefined') return false;
      const isTouchQuery = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      const isWidthQuery = window.innerWidth <= 1024;
      return isTouchQuery || isWidthQuery;
    };

    const rebuild = () => {
      const p = propsRef.current;
      w = container.offsetWidth;
      h = container.offsetHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / p.cellSize) + 1;
      rows = Math.ceil(h / p.cellSize) + 1;
      offX = (w - cols * p.cellSize) / 2;
      offY = (h - rows * p.cellSize) / 2;
      alphas = new Float32Array(cols * rows);
      touched = new Float64Array(cols * rows);
    };

    const cellCenter = (i: number): [number, number] => {
      const p = propsRef.current;
      const cx = offX + (i % cols) * p.cellSize + p.cellSize / 2;
      const cy = offY + Math.floor(i / cols) * p.cellSize + p.cellSize / 2;
      return [cx, cy];
    };

    const energize = (x: number, y: number, boost?: number) => {
      const p = propsRef.current;
      const r = Math.max(p.radius, 1);
      const ease = FALLOFF_CURVES[p.falloff] ?? FALLOFF_CURVES.linear;
      const now = performance.now();
      const minCol = Math.max(0, Math.floor((x - r - offX) / p.cellSize));
      const maxCol = Math.min(cols - 1, Math.floor((x + r - offX) / p.cellSize));
      const minRow = Math.max(0, Math.floor((y - r - offY) / p.cellSize));
      const maxRow = Math.min(rows - 1, Math.floor((y + r - offY) / p.cellSize));
      for (let cRow = minRow; cRow <= maxRow; cRow++) {
        for (let cCol = minCol; cCol <= maxCol; cCol++) {
          const i = cRow * cols + cCol;
          const [cx, cy] = cellCenter(i);
          const dist = Math.hypot(cx - x, cy - y);
          if (dist > r) continue;
          const level = ease(1 - dist / r) * p.maxOpacity * (boost ?? 1);
          if (level > alphas[i]) {
            alphas[i] = level;
            touched[i] = now;
          } else if (level > 0) {
            touched[i] = now;
          }
        }
      }
    };

    let lastAutoPulse = 0;

    const draw = (now: number) => {
      const p = propsRef.current;
      const dt = Math.min(now - lastFrame, 50);
      lastFrame = now;
      ctx.clearRect(0, 0, w, h);
      const [cr, cg, cb] = hexToRgb(p.color);

      // Auto autonomous wander animation on mobile & tablet
      const mobileActive = p.autoAnimateOnTouch && isMobileOrTablet() && isIntersecting;
      if (mobileActive && w > 0 && h > 0) {
        // Multi-frequency Lissajous wave trajectory
        const t = now * 0.0012;
        const autoX = w * (0.5 + 0.38 * Math.sin(t * 0.8) * Math.cos(t * 0.3));
        const autoY = h * (0.5 + 0.36 * Math.cos(t * 0.6) * Math.sin(t * 0.4));
        energize(autoX, autoY, 0.95);

        // Periodically trigger a pulse wave every ~3.5 seconds
        if (p.clickPulse && now - lastAutoPulse > 3500) {
          lastAutoPulse = now;
          pulses.push({
            x: autoX,
            y: autoY,
            t0: now
          });
        }
      }

      // Optional faint static lattice
      if (p.gridOpacity > 0) {
        ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${p.gridOpacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let cCol = 0; cCol <= cols; cCol++) {
          const x = Math.round(offX + cCol * p.cellSize) + 0.5;
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
        }
        for (let cRow = 0; cRow <= rows; cRow++) {
          const y = Math.round(offY + cRow * p.cellSize) + 0.5;
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
        }
        ctx.stroke();
      }

      // Expanding click pulses hand their energy to cells as they pass
      for (let pi = pulses.length - 1; pi >= 0; pi--) {
        const pulse = pulses[pi];
        const age = (now - pulse.t0) / 1000;
        const ringR = age * p.pulseSpeed;
        if (ringR > Math.hypot(w, h)) {
          pulses.splice(pi, 1);
          continue;
        }
        const band = p.cellSize;
        const minCol = Math.max(0, Math.floor((pulse.x - ringR - band - offX) / p.cellSize));
        const maxCol = Math.min(cols - 1, Math.floor((pulse.x + ringR + band - offX) / p.cellSize));
        const minRow = Math.max(0, Math.floor((pulse.y - ringR - band - offY) / p.cellSize));
        const maxRow = Math.min(rows - 1, Math.floor((pulse.y + ringR + band - offY) / p.cellSize));
        for (let cRow = minRow; cRow <= maxRow; cRow++) {
          for (let cCol = minCol; cCol <= maxCol; cCol++) {
            const i = cRow * cols + cCol;
            const [cx, cy] = cellCenter(i);
            const dist = Math.hypot(cx - pulse.x, cy - pulse.y);
            if (Math.abs(dist - ringR) < band / 2 && p.maxOpacity > alphas[i]) {
              alphas[i] = p.maxOpacity;
              touched[i] = now;
            }
          }
        }
      }

      let anyVisible = pulses.length > 0 || mobileActive;
      const fadeStep = dt / Math.max(p.fadeDuration, 16);
      const half = p.cellSize / 2;

      for (let i = 0; i < alphas.length; i++) {
        let a = alphas[i];
        if (a <= 0) continue;
        if (now - touched[i] > p.holdTime) {
          a = Math.max(0, a - fadeStep);
          alphas[i] = a;
          if (a <= 0) continue;
        }
        anyVisible = true;

        const [cx, cy] = cellCenter(i);
        const x = cx - half + 0.5;
        const y = cy - half + 0.5;
        const s = p.cellSize - 1;

        ctx.beginPath();
        if (p.cellRadius > 0) {
          ctx.roundRect(x, y, s, s, p.cellRadius);
        } else {
          ctx.rect(x, y, s, s);
        }
        if (p.fillOpacity > 0) {
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${a * p.fillOpacity})`;
          ctx.fill();
        }
        ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${a})`;
        ctx.lineWidth = p.lineWidth;
        ctx.stroke();
      }

      if (anyVisible) {
        raf = requestAnimationFrame(draw);
      } else {
        running = false;
        if (propsRef.current.gridOpacity <= 0) ctx.clearRect(0, 0, w, h);
      }
    };

    const wake = () => {
      if (running) return;
      running = true;
      lastFrame = performance.now();
      raf = requestAnimationFrame(draw);
    };
    wakeRef.current = wake;

    const toLocal = (e: MouseEvent | PointerEvent | Touch): [number, number] => {
      const rect = canvas.getBoundingClientRect();
      return [e.clientX - rect.left, e.clientY - rect.top];
    };

    const onPointerMove = (e: Event) => {
      const pe = e as PointerEvent;
      const [x, y] = toLocal(pe);
      energize(x, y);
      wake();
    };

    const onPointerDown = (e: Event) => {
      const pe = e as PointerEvent;
      const [x, y] = toLocal(pe);
      energize(x, y);
      if (propsRef.current.clickPulse) {
        pulses.push({ x, y, t0: performance.now() });
      }
      wake();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const [x, y] = toLocal(e.touches[0]);
        energize(x, y);
        wake();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const [x, y] = toLocal(e.touches[0]);
        energize(x, y);
        if (propsRef.current.clickPulse) {
          pulses.push({ x, y, t0: performance.now() });
        }
        wake();
      }
    };

    const ro = new ResizeObserver(() => {
      rebuild();
      wake();
    });
    ro.observe(container);

    // IntersectionObserver to pause auto-animation when footer is scrolled out of view
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          wake();
        }
      });
    }, { threshold: 0.05 });
    io.observe(container);

    rebuild();
    wake();

    eventTarget.addEventListener('pointermove', onPointerMove);
    eventTarget.addEventListener('pointerdown', onPointerDown);
    eventTarget.addEventListener('touchmove', onTouchMove, { passive: true });
    eventTarget.addEventListener('touchstart', onTouchStart, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      eventTarget.removeEventListener('pointermove', onPointerMove);
      eventTarget.removeEventListener('pointerdown', onPointerDown);
      eventTarget.removeEventListener('touchmove', onTouchMove);
      eventTarget.removeEventListener('touchstart', onTouchStart);
    };
  }, [cellSize, targetRef]);

  useEffect(() => {
    wakeRef.current?.();
  }, [gridOpacity, color, lineWidth, maxOpacity, fillOpacity, cellRadius, autoAnimateOnTouch]);

  return (
    <div ref={containerRef} className={`cursor-grid${className ? ` ${className}` : ''}`}>
      <canvas ref={canvasRef} className="cursor-grid__canvas" />
    </div>
  );
};

export default CursorGrid;
