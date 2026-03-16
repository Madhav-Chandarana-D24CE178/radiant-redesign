import React, { useRef } from 'react';
import { motion, useInView, type Variant } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  distance?: number;
  scale?: number;
}

const getInitial = (direction: Direction, distance: number, scale?: number): Variant => {
  const base: Record<string, number> = { opacity: 0 };
  if (scale) base.scale = scale;
  
  switch (direction) {
    case 'up': return { ...base, y: distance };
    case 'down': return { ...base, y: -distance };
    case 'left': return { ...base, x: distance };
    case 'right': return { ...base, x: -distance };
    case 'none': return { opacity: 0, scale: scale || 0.95 };
  }
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
  distance = 60,
  scale,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: getInitial(direction, distance, scale),
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.4, 0.25, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
