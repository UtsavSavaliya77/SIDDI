import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { ProductFinish } from '../../types';

interface FinishOptionWheelProps {
  finishes: ProductFinish[];
  selectedId: string;
  onSelect: (finishId: string) => void;
  productName: string;
}

/** Finish-color adaptation of React Bits' OptionWheel motion and controls. */
export const FinishOptionWheel: React.FC<FinishOptionWheelProps> = ({ finishes, selectedId, onSelect, productName }) => {
  const initialIndex = Math.max(0, finishes.findIndex((finish) => finish.id === selectedId));
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const positionRef = useRef(initialIndex);
  const targetRef = useRef(initialIndex);
  const frameRef = useRef<number | null>(null);
  const previousFrameRef = useRef(0);
  const selectedRef = useRef(initialIndex);
  const initializedRef = useRef(false);
  const pointerOverWheelRef = useRef(false);
  const callbackRef = useRef(onSelect);
  const dragRef = useRef<{ y: number; start: number; pointerId: number } | null>(null);
  const draggedRef = useRef(false);
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [dragging, setDragging] = useState(false);

  callbackRef.current = onSelect;
  const rowHeight = 34;
  const tiltRadians = (6 * Math.PI) / 180;
  const radius = rowHeight / tiltRadians;

  const animate = useCallback((now: number) => {
    const dt = Math.min((now - previousFrameRef.current) / 1000, 0.05);
    previousFrameRef.current = now;
    const blend = 1 - Math.exp(-dt / 0.2);
    let next = positionRef.current + (targetRef.current - positionRef.current) * blend;
    const settled = Math.abs(targetRef.current - next) < 0.001;
    if (settled) next = targetRef.current;
    positionRef.current = next;

    itemRefs.current.forEach((element, index) => {
      if (!element) return;
      const distance = index - next;
      const angle = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, distance * tiltRadians));
      const x = -radius * (1 - Math.cos(angle));
      const y = radius * Math.sin(angle);
      const rotation = (angle * 180 / Math.PI).toFixed(2);
      element.style.transform = `translate(${x.toFixed(2)}px, calc(${y.toFixed(2)}px - 50%)) rotate(${rotation}deg)`;
      element.style.setProperty('--wheel-rotation', `${rotation}deg`);
      const absDistance = Math.abs(distance);
      element.style.opacity = String(Math.max(0.16, 1 - absDistance * 0.25));
      element.style.filter = `blur(${(absDistance * 0.25).toFixed(2)}px)`;
      element.style.setProperty('--finish-active', String(Math.max(0, 1 - Math.min(absDistance, 1))));
    });

    frameRef.current = settled ? null : requestAnimationFrame(animate);
  }, [radius, tiltRadians]);

  const startAnimation = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    previousFrameRef.current = performance.now();
    frameRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const setTarget = useCallback((value: number, snap: boolean) => {
    let target = Math.min(Math.max(value, 0), Math.max(finishes.length - 1, 0));
    if (snap) target = Math.round(target);
    targetRef.current = target;
    const index = Math.round(target);
    if (index !== selectedRef.current && finishes[index]) {
      selectedRef.current = index;
      setSelectedIndex(index);
      callbackRef.current(finishes[index].id);
    }
    startAnimation();
  }, [finishes, startAnimation]);

  useEffect(() => {
    const index = Math.max(0, finishes.findIndex((finish) => finish.id === selectedId));
    if (initializedRef.current && selectedRef.current === index) return;
    initializedRef.current = true;
    selectedRef.current = index;
    setSelectedIndex(index);
    positionRef.current = index;
    targetRef.current = index;
    itemRefs.current.forEach((element, itemIndex) => {
      if (!element) return;
      const distance = itemIndex - index;
      const angle = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, distance * tiltRadians));
      const x = -radius * (1 - Math.cos(angle));
      const y = radius * Math.sin(angle);
      const rotation = (angle * 180 / Math.PI).toFixed(2);
      element.style.transform = `translate(${x.toFixed(2)}px, calc(${y.toFixed(2)}px - 50%)) rotate(${rotation}deg)`;
      element.style.setProperty('--wheel-rotation', `${rotation}deg`);
      element.style.opacity = String(Math.max(0.16, 1 - Math.abs(distance) * 0.25));
      element.style.filter = `blur(${(Math.abs(distance) * 0.25).toFixed(2)}px)`;
      element.style.setProperty('--finish-active', String(Math.max(0, 1 - Math.min(Math.abs(distance), 1))));
    });
  }, [finishes, radius, selectedId, tiltRadians]);

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
  }, []);

  const onWheel = useCallback((event: WheelEvent) => {
    if (!pointerOverWheelRef.current) return;
    if (event.cancelable) event.preventDefault();
    event.stopPropagation();
    const delta = event.deltaMode === 1 ? event.deltaY * 24 : event.deltaY;
    setTarget(targetRef.current + Math.max(-1, Math.min(1, delta / rowHeight)), false);
    if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    wheelTimerRef.current = setTimeout(() => setTarget(targetRef.current, true), 140);
  }, [setTarget]);

  useEffect(() => {
    window.addEventListener('wheel', onWheel, { capture: true, passive: false });
    return () => window.removeEventListener('wheel', onWheel, true);
  }, [onWheel]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = { y: event.clientY, start: targetRef.current, pointerId: event.pointerId };
    draggedRef.current = false;
    setDragging(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const deltaY = event.clientY - drag.y;
    if (!draggedRef.current && Math.abs(deltaY) > 4) {
      draggedRef.current = true;
      rootRef.current?.setPointerCapture(drag.pointerId);
    }
    if (draggedRef.current) setTarget(drag.start - deltaY / rowHeight, false);
  };

  const onPointerEnd = () => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setDragging(false);
    if (draggedRef.current) setTarget(targetRef.current, true);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const delta = event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 1;
    setTarget(Math.round(targetRef.current) + delta, true);
  };

  const onChoose = (index: number) => {
    if (draggedRef.current) return;
    setTarget(index, true);
  };

  return (
    <div
      ref={rootRef}
      className={`product-card__option-wheel${dragging ? ' is-dragging' : ''}`}
      role="listbox"
      tabIndex={0}
      aria-label={`${productName} finish options`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onPointerEnter={() => { pointerOverWheelRef.current = true; }}
      onPointerLeave={() => { pointerOverWheelRef.current = false; }}
      onKeyDown={onKeyDown}
    >
      {finishes.map((finish, index) => (
        <button
          key={finish.id}
          ref={(element) => { itemRefs.current[index] = element; }}
          className={`product-card__wheel-option${selectedIndex === index ? ' is-selected' : ''}`}
          type="button"
          role="option"
          aria-selected={selectedIndex === index}
          aria-label={finish.name}
          title={finish.name}
          onClick={() => onChoose(index)}
        >
          <span className="product-card__wheel-dot" style={{ backgroundColor: finish.hex }} />
          <span className="product-card__wheel-name">{finish.name}</span>
        </button>
      ))}
    </div>
  );
};
