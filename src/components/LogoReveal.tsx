'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface LogoRevealProps {
  logoText?: string;
  subtitle?: string;
  color?: string;
  glitchIntensity?: number;
}

const LogoReveal: React.FC<LogoRevealProps> = ({
  logoText = 'InfoTech',
  subtitle = 'The Future Awaits',
  color = '#00ff41',
  glitchIntensity = 0.7,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [revealComplete, setRevealComplete] = useState(false);
  
  // Glitch animation effect
  useEffect(() => {
    if (textRef.current) {
      const applyGlitch = () => {
        if (Math.random() < glitchIntensity / 2) {
          const randomOffset = Math.random() * 15 - 7.5;
          
          gsap.to(textRef.current, {
            x: randomOffset,
            skewX: randomOffset,
            duration: 0.08,
            ease: 'power1.inOut',
            onComplete: () => {
              gsap.to(textRef.current, {
                x: 0,
                skewX: 0,
                duration: 0.1,
              });
            },
          });
          
          // Add a brief color shift
          if (Math.random() > 0.6 && textRef.current) {
            const element = textRef.current;
            const originalColor = element.style.color;
            element.style.color = Math.random() > 0.5 ? '#ff003c' : '#39ff14';
            
            setTimeout(() => {
              if (element) {
                element.style.color = originalColor;
              }
            }, 50);
          }
        }
      };
      
      // Apply glitch effect randomly
      const glitchInterval = setInterval(applyGlitch, 150);
      
      // Set reveal complete after animations
      setTimeout(() => {
        setRevealComplete(true);
      }, 3000);
      
      return () => clearInterval(glitchInterval);
    }
  }, [glitchIntensity]);
  
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };
  
  return (
    <div ref={containerRef} className="text-center py-8 relative">
      {/* Digital circuit lines */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-green-500"
            style={{
              height: '1px',
              width: Math.random() * 100 + 50,
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 90 + 5}%`,
              opacity: 0.5 + Math.random() * 0.5,
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: Math.random() * 100 + 50, opacity: 0.5 + Math.random() * 0.5 }}
            transition={{ delay: 1 + Math.random() * 2, duration: 1 }}
          />
        ))}
      </div>
      
      <motion.div
        className="relative py-4 px-10 inline-block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Top border with animated glow */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        
        {/* Bottom border with animated glow */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
        
        <motion.h1
          ref={textRef}
          className="text-8xl font-black font-vt323 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-green-500 mb-4 tracking-tight"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {Array.from(logoText).map((letter, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              custom={i}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="relative"
        >
          <span className="text-2xl font-light tracking-widest text-green-400 inline-block font-vt323">
            {subtitle}
            <motion.span
              className="absolute bottom-0 left-0 w-full h-[1px]"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 2 }}
              style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
            />
          </span>
        </motion.div>
      </motion.div>
      
      {/* Binary decorative elements */}
      {revealComplete && (
        <motion.div
          className="mt-4 text-green-500/30 text-xs font-mono overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {Array.from({ length: 20 }).map((_, index) => (
            <span key={index} className="mr-3">
              {Math.random() > 0.5 ? '1' : '0'}
              {Math.random() > 0.5 ? '1' : '0'}
              {Math.random() > 0.5 ? '1' : '0'}
              {Math.random() > 0.5 ? '1' : '0'}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default LogoReveal; 