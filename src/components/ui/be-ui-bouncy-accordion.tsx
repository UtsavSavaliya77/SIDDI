import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useId, useState, type ReactNode } from 'react';

export type BouncyAccordionItem = {
  id: string;
  title: ReactNode;
  description: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
};

export type BouncyAccordionClassNames = {
  root?: string; item?: string; trigger?: string; icon?: string; title?: string;
  chevron?: string; content?: string; description?: string;
};

type BouncyAccordionProps = {
  items: BouncyAccordionItem[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  collapsible?: boolean;
  className?: string;
  classNames?: BouncyAccordionClassNames;
};

/** Single-open accordion with the springy panel motion from the reference component. */
export function BouncyAccordion({ items, value, defaultValue = null, onValueChange, collapsible = true, className = '', classNames }: BouncyAccordionProps) {
  const [internalId, setInternalId] = useState<string | null>(defaultValue);
  const controlled = value !== undefined;
  const activeId = controlled ? value : internalId;
  const setActiveId = (next: string | null) => {
    if (!controlled) setInternalId(next);
    onValueChange?.(next);
  };
  const baseId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <div className={`bouncy-accordion ${className} ${classNames?.root ?? ''}`}>
      {items.map((item) => {
        const open = activeId === item.id;
        const triggerId = `${baseId}-${item.id}-trigger`;
        const contentId = `${baseId}-${item.id}-content`;

        return (
          <motion.div layout transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 360, damping: 32, mass: 0.6 }} className={`bouncy-accordion__item ${classNames?.item ?? ''}`} data-state={open ? 'open' : 'closed'} key={item.id}>
            <button
              className={`bouncy-accordion__trigger ${classNames?.trigger ?? ''}`}
              id={triggerId}
              type="button"
              disabled={item.disabled}
              aria-expanded={open}
              aria-controls={contentId}
              onClick={() => open ? (collapsible && setActiveId(null)) : setActiveId(item.id)}
            >
              {item.icon && <span className={`bouncy-accordion__leading-icon ${classNames?.icon ?? ''}`}>{item.icon}</span>}
              <span className={`bouncy-accordion__title ${classNames?.title ?? ''}`}>{item.title}</span>
              <motion.span
                className={`bouncy-accordion__icon ${classNames?.chevron ?? ''}`}
                aria-hidden="true"
                animate={{ rotate: open ? 45 : 0, scale: open ? 1.08 : 1 }}
                transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 16, mass: 0.55 }}
              >+</motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  className={`bouncy-accordion__panel ${classNames?.content ?? ''}`}
                  id={contentId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={reduceMotion ? { duration: 0 } : {
                    height: { type: 'spring', stiffness: 280, damping: 27, mass: 0.8 },
                    opacity: { duration: 0.18 },
                  }}
                >
                  <motion.div
                    className={`bouncy-accordion__description ${classNames?.description ?? ''}`}
                    initial={{ y: -10, opacity: 0, scale: 0.985 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -5, opacity: 0 }}
                    transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 24, opacity: { duration: 0.22 } }}
                  >{item.description}</motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
