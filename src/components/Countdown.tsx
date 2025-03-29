'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isGlitching, setIsGlitching] = useState(false);
  const [isTicking, setIsTicking] = useState(false);
  
  // Add ref for debugging
  const hasLoggedRef = useRef(false);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
    }, 3000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    // Calculate time difference immediately to show correct values right away
    const calculateTime = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      // If target date is in the past, stop countdown
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return false;
      }
      
      // Calculate all time units
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
      
      // Flash the ticking indicator briefly when seconds change
      setIsTicking(true);
      setTimeout(() => setIsTicking(false), 500);
      
      return true;
    };
    
    // Immediate calculation
    calculateTime();
    
    // Set up interval only if target date is in the future
    let interval: NodeJS.Timeout | null = null;
    
    // Force the first recalculation after a short delay to ensure state updates
    const initialTimer = setTimeout(() => {
      calculateTime();
      // Then set up the regular interval
      interval = setInterval(calculateTime, 1000);
    }, 100);
    
    // Log the target date for debugging (only once)
    if (!hasLoggedRef.current) {
      console.log('=========== COUNTDOWN DEBUG ===========');
      console.log('Countdown target:', targetDate.toLocaleString());
      console.log('Current time:', new Date().toLocaleString());
      console.log('Time difference in ms:', targetDate.getTime() - new Date().getTime());
      console.log('Time difference in days:', Math.floor((targetDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
      console.log('Is date in future?', targetDate.getTime() > new Date().getTime());
      hasLoggedRef.current = true;
    }
    
    return () => {
      clearTimeout(initialTimer);
      if (interval) clearInterval(interval);
    };
  }, [targetDate]);
  
  return (
    <div className="space-y-2">
      <motion.div 
        className="countdown-wrapper flex flex-wrap justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <CountdownItem value={timeLeft.days} label="D" delay={0.1} isGlitching={isGlitching} />
        <div className="text-green-500 self-center text-3xl md:text-5xl font-vt323 mx-1 md:mx-0">:</div>
        <CountdownItem value={timeLeft.hours} label="H" delay={0.2} isGlitching={isGlitching} />
        <div className="text-green-500 self-center text-3xl md:text-5xl font-vt323 mx-1 md:mx-0">:</div>
        <CountdownItem value={timeLeft.minutes} label="M" delay={0.3} isGlitching={isGlitching} />
        <div className={`text-green-500 self-center text-3xl md:text-5xl font-vt323 mx-1 md:mx-0 ${isTicking ? 'text-green-300' : ''}`}>:</div>
        <CountdownItem value={timeLeft.seconds} label="S" delay={0.4} isGlitching={isGlitching} isTicking={isTicking} />
      </motion.div>
      
      <motion.div
        className="text-center text-sm font-mono text-green-500 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <span className="typing-effect">COUNTDOWN ACTIVE - STAY TUNED ...</span>
      </motion.div>
      
      {/* Ticking indicator */}
      <div className="flex justify-center mt-2">
        <div className={`h-1.5 w-1.5 rounded-full ${isTicking ? 'bg-green-500' : 'bg-green-900'} transition-colors duration-300`}></div>
      </div>
    </div>
  );
};

interface CountdownItemProps {
  value: number;
  label: string;
  delay: number;
  isGlitching: boolean;
  isTicking?: boolean;
}

const CountdownItem: React.FC<CountdownItemProps> = ({ value, label, delay, isGlitching, isTicking }) => {
  const displayed = isGlitching 
    ? Math.floor(Math.random() * 99).toString().padStart(2, '0')
    : value.toString().padStart(2, '0');
  
  // Add a subtle pulse animation to the seconds items
  const isPulsing = label === 'S';
  const isHighlighted = label === 'S' && isTicking && !isGlitching;
  
  return (
    <motion.div 
      className={`countdown-item relative overflow-hidden mx-1 my-2 md:mx-0 md:my-0 ${isHighlighted ? 'border-green-400 shadow-[0_0_30px_rgba(0,255,65,0.8)]' : ''}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className={`absolute inset-0 ${isHighlighted ? 'bg-green-500/15' : 'bg-green-500/5'} animate-pulse`}></div>
      <motion.span
        className={`countdown-number font-vt323 glitch ${isGlitching ? 'text-red-400' : ''} ${isHighlighted ? 'text-green-300' : ''}`}
        data-text={displayed}
        animate={isPulsing ? { scale: [1, 1.03, 1] } : {}}
        transition={isPulsing ? { duration: 1, repeat: Infinity, ease: "easeInOut" } : {}}
      >
        {displayed}
      </motion.span>
      <span className="countdown-label font-vt323">{label}</span>
      
      {/* Corner accents */}
      <div className="corner corner-top-left"></div>
      <div className="corner corner-top-right"></div>
      <div className="corner corner-bottom-left"></div>
      <div className="corner corner-bottom-right"></div>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-green-500/20"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500/20"></div>
    </motion.div>
  );
};

export default Countdown; 