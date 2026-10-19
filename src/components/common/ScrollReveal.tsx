import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface ScrollRevealProps {
  children: React.ReactNode;
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'aside' | 'main';
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'zoom' | 'blur' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  amount?: number | 'some' | 'all';
  scale?: number;
  style?: React.CSSProperties;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.55,
  distance = 24,
  className = '',
  once = true, // Default to true to prevent sections from turning into blank white pages on scroll
  amount = 'some', // 'some' ensures immediate reliable trigger on mobile and tablet screens
  scale = 1,
  style,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0, scale: scale !== 1 ? scale : 1 };
      case 'down':
        return { y: -distance, x: 0, scale: scale !== 1 ? scale : 1 };
      case 'left':
        return { x: distance, y: 0, scale: scale !== 1 ? scale : 1 };
      case 'right':
        return { x: -distance, y: 0, scale: scale !== 1 ? scale : 1 };
      case 'scale':
      case 'zoom':
        return { x: 0, y: 12, scale: 0.96 };
      case 'blur':
      case 'none':
      default:
        return { x: 0, y: 0, scale: 1 };
    }
  };

  const initialOffset = getInitialOffset();
  const MotionComponent = motion[as];

  return (
    <MotionComponent
      initial={{
        opacity: 0,
        x: initialOffset.x,
        y: initialOffset.y,
        scale: initialOffset.scale,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once,
        amount,
        margin: '0px 0px 80px 0px', // Pre-reveals 80px before entering viewport for smooth seamless display
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className={className}
      style={style}
    >
      {children}
    </MotionComponent>
  );
};

export interface TextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  once?: boolean;
  style?: React.CSSProperties;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  as = 'h2',
  className = '',
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.03,
  once = true,
  style,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} style={style}>
        {text}
      </Tag>
    );
  }

  // Split text into words while preserving spacing
  const words = text.split(' ');
  const MotionComponent = motion[as];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  // Clean translation without heavy blur filter for reliable mobile GPU rendering
  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 14,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <MotionComponent
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 'some', margin: '0px 0px 60px 0px' }}
      className={className}
      style={style}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block pb-0.5 mr-[0.25em] align-top">
          <motion.span
            variants={wordVariants}
            className="inline-block will-change-transform"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionComponent>
  );
};

export interface ScrollRevealStaggerProps {
  children: React.ReactNode;
  as?: 'div' | 'section' | 'ul' | 'ol';
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number | 'some' | 'all';
  style?: React.CSSProperties;
}

export const ScrollRevealStagger: React.FC<ScrollRevealStaggerProps> = ({
  children,
  as = 'div',
  className = '',
  staggerDelay = 0.08,
  delayChildren = 0.02,
  once = true,
  amount = 'some',
  style,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  const MotionComponent = motion[as];

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount,
        margin: '0px 0px 80px 0px',
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </MotionComponent>
  );
};

export interface ScrollRevealItemProps {
  children: React.ReactNode;
  as?: 'div' | 'li' | 'article';
  className?: string;
  distance?: number;
  duration?: number;
  style?: React.CSSProperties;
}

export const ScrollRevealItem: React.FC<ScrollRevealItemProps> = ({
  children,
  as = 'div',
  className = '',
  distance = 20,
  duration = 0.55,
  style,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  const MotionComponent = motion[as];

  return (
    <MotionComponent
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </MotionComponent>
  );
};

