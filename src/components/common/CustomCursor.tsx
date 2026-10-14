import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

interface ClickFlash {
  id: number;
  x: number;
  y: number;
}

class CrystalParticle {
  x: number;
  y: number;
  angle: number;
  radius: number;
  targetRadius: number;
  life: number;
  maxLife: number;
  context: CanvasRenderingContext2D;
  lineWidth: number;
  turnAngle: number;

  constructor(x: number, y: number, context: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.angle = Math.random() * Math.PI * 2;
    this.radius = 0;
    this.targetRadius = Math.random() * 55 + 15;
    this.maxLife = 110;
    this.life = this.maxLife;
    this.context = context;
    this.lineWidth = Math.random() * 1.5 + 0.6;
    this.turnAngle = (Math.random() - 0.5) * 0.12;
  }

  draw() {
    const alpha = (this.life / this.maxLife) * 0.85;
    this.context.save();
    // High-contrast deep gold with subtle shadow for crisp visibility on white & light screens
    this.context.strokeStyle = `rgba(180, 115, 0, ${alpha})`;
    this.context.shadowColor = `rgba(0, 0, 0, ${alpha * 0.4})`;
    this.context.shadowBlur = 2;
    this.context.lineWidth = this.lineWidth;
    this.context.lineCap = 'round';
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    const endX = this.x + Math.cos(this.angle) * this.radius;
    const endY = this.y + Math.sin(this.angle) * this.radius;
    this.context.lineTo(endX, endY);
    this.context.stroke();
    this.context.restore();
  }

  update() {
    if (this.radius < this.targetRadius) {
      this.radius += 1.0;
    }
    this.life -= 1;
    this.angle += this.turnAngle;
  }
}

class ShardParticle {
  x: number;
  y: number;
  angle: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  context: CanvasRenderingContext2D;

  constructor(x: number, y: number, context: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 2.5;
    this.vx = Math.cos(this.angle) * speed;
    this.vy = Math.sin(this.angle) * speed;
    this.maxLife = 85;
    this.life = this.maxLife;
    this.size = Math.random() * 3 + 1.2;
    this.context = context;
  }

  draw() {
    const alpha = this.life / this.maxLife;
    this.context.save();
    // High-contrast amber-gold with shadow for visibility on light & dark screens
    this.context.fillStyle = `rgba(195, 125, 0, ${alpha})`;
    this.context.shadowColor = `rgba(0, 0, 0, ${alpha * 0.45})`;
    this.context.shadowBlur = 3;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.context.fill();
    this.context.restore();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.96;
    this.vy *= 0.96;
    this.life -= 1;
  }
}

export const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointRef = useRef<HTMLDivElement | null>(null);

  const targetPos = useRef({ x: -300, y: -300 });
  const animFrameId = useRef<number | null>(null);

  const crystals = useRef<CrystalParticle[]>([]);
  const shards = useRef<ShardParticle[]>([]);

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [flashes, setFlashes] = useState<ClickFlash[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect mobile / touch devices
    const checkTouch = () => {
      const isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(Boolean(isCoarse || hasTouch));
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();

    let flashCounter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Micro point follows instantly
      if (pointRef.current) {
        pointRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }

      // Spawn crystal fractures along the cursor trail
      if (Math.random() > 0.45) {
        crystals.current.push(
          new CrystalParticle(
            e.clientX + (Math.random() - 0.5) * 30,
            e.clientY + (Math.random() - 0.5) * 30,
            ctx
          )
        );
      }

      // Check if hovering clickable elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('a, button, input, select, textarea, [role="button"], label, .cursor-pointer, [data-cursor-hover]')
        );
        setIsHovered(isClickable);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsPressed(true);

      // Emit crystalline shard shatter explosion (50 particles)
      for (let i = 0; i < 50; i++) {
        shards.current.push(new ShardParticle(e.clientX, e.clientY, ctx));
      }

      // Flash shockwave
      const newFlash: ClickFlash = {
        id: ++flashCounter,
        x: e.clientX,
        y: e.clientY
      };
      setFlashes(prev => [...prev.slice(-3), newFlash]);

      setTimeout(() => {
        setFlashes(prev => prev.filter(f => f.id !== newFlash.id));
      }, 450);
    };

    const handleMouseUp = () => {
      setIsPressed(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Render loop for crystal canvas
    const render = () => {
      // Clear & Draw Crystal Fractures & Shards
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      crystals.current = crystals.current.filter((c) => c.life > 0);
      for (let i = 0; i < crystals.current.length; i++) {
        const c = crystals.current[i];
        c.update();
        c.draw();
      }

      shards.current = shards.current.filter((s) => s.life > 0);
      for (let i = 0; i < shards.current.length; i++) {
        const s = shards.current[i];
        s.update();
        s.draw();
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('resize', handleResize);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isTouchDevice, isHovered, isPressed, isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Crystal Shatter & Fracture Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99998] block w-full h-full"
      />

      {/* Precision Micro Point */}
      <div className={`spotlight-cursor-container ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
        <div
          ref={pointRef}
          className="spotlight-cursor__point"
        />

        {flashes.map(flash => (
          <div
            key={flash.id}
            className="spotlight-cursor__flash"
            style={{
              left: `${flash.x}px`,
              top: `${flash.y}px`
            }}
          />
        ))}
      </div>
    </>
  );
};
