'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import GlitchText from './GlitchText';
import gsap from 'gsap';

interface MysteryTeaserProps {
  revealDate?: Date;
}

const MysteryTeaser: React.FC<MysteryTeaserProps> = ({ revealDate = new Date('2024-08-01') }) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [hackSuccess, setHackSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mysteryPhrases = [
    "Initiating secure connection...",
    "Access protocol activated...",
    "Bypassing firewall...",
    "Executing kernel_override.sh...",
    "Decrypting event data...",
    "Accessing classified information...",
  ];
  
  const secretCodes = [
    "root@infotech:~$ ./access -t restricted",
    "INFOTECH:SEC-LEVEL=ALPHA",
    "CIPHER_KEY=0x4FF1C8D2A",
    "ssh -i id_rsa root@192.168.1.45",
  ];
  
  // Type out effect for terminal-like experience
  useEffect(() => {
    if (currentPhase < mysteryPhrases.length - 1) {
      const timer = setTimeout(() => {
        setCurrentPhase((prev) => prev + 1);
      }, 2000); // 2 seconds between phrases
      
      return () => clearTimeout(timer);
    } else {
      // Show success after all phases complete
      setTimeout(() => {
        setHackSuccess(true);
      }, 1500);
    }
  }, [currentPhase, mysteryPhrases.length]);
  
  // Random code flashing effect
  useEffect(() => {
    if (containerRef.current) {
      const elements = document.querySelectorAll('.secret-code');
      
      elements.forEach((el) => {
        const randomDelay = Math.random() * 5; // Random delay up to 5 seconds
        const randomDuration = 0.2 + Math.random() * 0.3; // Random duration
        
        gsap.to(el, {
          opacity: 0.8,
          duration: randomDuration,
          repeat: -1,
          yoyo: true,
          repeatDelay: randomDelay,
        });
      });
    }
  }, []);
  
  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full max-w-3xl mx-auto p-8 bg-black/60 backdrop-blur-md border border-green-900/40 rounded-md shadow-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="matrix-animation">
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={i} 
              className="matrix-code" 
              style={{ 
                left: `${Math.random() * 100}%`, 
                animationDuration: `${5 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-xs font-mono text-green-500 mb-6 opacity-80">
        {secretCodes.map((code, index) => (
          <div 
            key={index} 
            className="secret-code mb-2 px-2 py-1 bg-black/40 border-l-2 border-green-700 font-vt323"
          >
            {code}
          </div>
        ))}
      </div>
      
      <div className="terminal-text space-y-1 mb-6 border border-green-900/40 p-3 bg-black/50 rounded-sm">
        <div className="flex justify-between text-xs border-b border-green-900/40 pb-1 mb-2">
          <span className="text-green-400">SYSTEM TERMINAL</span>
          <span className="text-green-400">[ACTIVE]</span>
        </div>
        
        {mysteryPhrases.slice(0, currentPhase + 1).map((phrase, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-sm font-mono text-green-400 font-vt323"
          >
            <span className="text-green-600 mr-2">&gt;</span>
            {phrase}
            {index === currentPhase && !hackSuccess && (
              <span className="inline-block w-2 h-4 ml-1 bg-green-500 animate-pulse"></span>
            )}
            {index === currentPhase && currentPhase !== mysteryPhrases.length - 1 && (
              <span className="text-green-600 ml-2">[IN PROGRESS]</span>
            )}
            {index === mysteryPhrases.length - 1 && hackSuccess && (
              <span className="text-green-400 ml-2">[SUCCESS - ACCESS GRANTED]</span>
            )}
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: hackSuccess ? 1 : 0,
          scale: hackSuccess ? 1 : 0.8
        }}
        transition={{ duration: 0.8 }}
        className="mt-8 text-center"
      >
        <div className="inline-block border-2 border-green-500/50 px-4 py-2 rounded-sm">
          <GlitchText 
            text="ACCESS GRANTED: THE GUEST IS COMING" 
            size="3xl" 
            intensityLevel="high"
            color="#00ff41"
            delay={mysteryPhrases.length * 0.5}
          />
        </div>
        
        <motion.div 
          className="mt-6 text-xl font-vt323 text-green-500"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: hackSuccess ? 1 : 0
          }}
          transition={{ duration: 1, delay: mysteryPhrases.length * 0.5 + 0.5 }}
        >
          <span className="gradient-text">{revealDate.toLocaleDateString('en-US', { 
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}</span>
        </motion.div>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-green-500"></div>
      <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-green-500"></div>
      
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
    </motion.div>
  );
};

export default MysteryTeaser; 