import React, { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, className = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part
    const numMatch = value.replace(/,/g, '').match(/[\d.]+/);
    if (!numMatch) {
      setDisplayValue(value);
      return;
    }

    const target = parseFloat(numMatch[0]);
    const prefix = value.substring(0, value.indexOf(numMatch[0]));
    const suffix = value.substring(value.indexOf(numMatch[0]) + numMatch[0].length);
    const hasDecimal = numMatch[0].includes('.');
    const duration = 1500;
    const steps = 40;
    const stepDuration = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (step >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        const formatted = hasDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString('en-IN');
        setDisplayValue(`${prefix}${formatted}${suffix}`);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref} className={className}>{displayValue}</span>;
};

export default AnimatedCounter;
