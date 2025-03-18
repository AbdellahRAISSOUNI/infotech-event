'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  intensityLevel?: 'low' | 'medium' | 'high';
  color?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  delay?: number;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = '',
  intensityLevel = 'medium',
  color = 'white',
  size = 'xl',
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Random glitch effect trigger
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [delay]);

  // Set intensity based on level
  const getIntensity = () => {
    switch (intensityLevel) {
      case 'low':
        return 'glitch-low';
      case 'high':
        return 'glitch-high';
      case 'medium':
      default:
        return 'glitch';
    }
  };

  // Set font size based on size prop
  const getFontSize = () => {
    switch (size) {
      case 'sm': return 'text-sm';
      case 'md': return 'text-md';
      case 'lg': return 'text-lg';
      case 'xl': return 'text-xl';
      case '2xl': return 'text-2xl';
      case '3xl': return 'text-3xl';
      case '4xl': return 'text-4xl';
      case '5xl': return 'text-5xl';
      default: return 'text-xl';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, delay }}
      className={`${getFontSize()} font-bold ${className}`}
      style={{ color }}
    >
      <span 
        className={getIntensity()} 
        data-text={text}
      >
        {text}
      </span>
    </motion.div>
  );
};

export default GlitchText; 