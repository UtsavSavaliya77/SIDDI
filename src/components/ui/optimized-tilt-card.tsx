"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
} from "react";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isActive?: boolean;
  /**
   * Real mouse hover already works via CSS (:hover / group-hover).
   * Touch has no such state, so this fires on touchstart/touchend
   * for anything OUTSIDE this component (glow border, reveal mask)
   * that also needs to react to "hover".
   */
  onHoverChange?: (hovering: boolean) => void;
  sheenColor?: string;
  maxTilt?: number;
  hoverScale?: number;
}

const DEFAULT_MAX_TILT = 8;
const DEFAULT_HOVER_SCALE = 1.025;
const TOUCH_HOLD_MS = 400;

export const OptimizedTiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  style,
  onHoverChange,
  sheenColor: _sheenColor,
  maxTilt = DEFAULT_MAX_TILT,
  hoverScale = DEFAULT_HOVER_SCALE,
  ...restProps
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const touchHideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      if (touchHideTimeoutRef.current !== null) {
        clearTimeout(touchHideTimeoutRef.current);
      }
    };
  }, []);

  const applyVars = useCallback(
    (px: number, py: number, rotX: number, rotY: number, scale: number) => {
      const card = cardRef.current;
      if (!card) return;

      card.style.setProperty("--pointer-x", `${px}%`);
      card.style.setProperty("--pointer-y", `${py}%`);
      card.style.setProperty("--rotate-x", `${rotX}deg`);
      card.style.setProperty("--rotate-y", `${rotY}deg`);
      card.style.setProperty("--card-scale", `${scale}`);
    },
    []
  );

  // Shared by mouse AND touch so the math can never drift apart.
  const updateFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();

      const px = Math.max(
        0,
        Math.min(100, ((clientX - rect.left) / rect.width) * 100)
      );

      const py = Math.max(
        0,
        Math.min(100, ((clientY - rect.top) / rect.height) * 100)
      );

      const rotY = ((px - 50) / 50) * maxTilt;
      const rotX = ((py - 50) / 50) * -maxTilt;

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() =>
        applyVars(px, py, rotX, rotY, hoverScale)
      );
    },
    [applyVars, maxTilt, hoverScale]
  );

  const resetTilt = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;

      card.style.setProperty("--rotate-x", "0deg");
      card.style.setProperty("--rotate-y", "0deg");
      card.style.setProperty("--card-scale", "1");
    });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      updateFromPoint(e.clientX, e.clientY);
    },
    [updateFromPoint]
  );

  const handleMouseLeave = useCallback(() => {
    resetTilt();
  }, [resetTilt]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      if (!touch) return;

      if (touchHideTimeoutRef.current !== null) {
        clearTimeout(touchHideTimeoutRef.current);
        touchHideTimeoutRef.current = null;
      }

      updateFromPoint(touch.clientX, touch.clientY);
      onHoverChange?.(true);
    },
    [updateFromPoint, onHoverChange]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      if (!touch) return;

      updateFromPoint(touch.clientX, touch.clientY);
    },
    [updateFromPoint]
  );

  const handleTouchEnd = useCallback(() => {
    resetTilt();

    touchHideTimeoutRef.current = setTimeout(() => {
      onHoverChange?.(false);
      touchHideTimeoutRef.current = null;
    }, TOUCH_HOLD_MS);
  }, [resetTilt, onHoverChange]);

  const cardStyle: React.CSSProperties = {
    ...style,
    transform:
      "perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) scale(var(--card-scale, 1))",
    transition: "transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
    "--pointer-x": "50%",
    "--pointer-y": "50%",
    "--rotate-x": "0deg",
    "--rotate-y": "0deg",
    "--card-scale": "1",
    WebkitTapHighlightColor: "transparent",
  } as React.CSSProperties;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className={`relative overflow-hidden group touch-manipulation ${className}`}
      style={cardStyle}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default OptimizedTiltCard;
