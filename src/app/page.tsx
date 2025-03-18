'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from '@/components/GlitchText';
import Countdown from '@/components/Countdown';
import LogoReveal from '@/components/LogoReveal';
import TerminalEffect from '@/components/TerminalEffect';
import InfoTechLogo from '@/components/InfoTechLogo';

// Dynamically import the heavy components to improve initial load performance
const GlitchBackground = dynamic(() => import('@/components/GlitchBackground'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black"></div>,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hackingStage, setHackingStage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  
  // Event date - April 26, 2025
  // Using explicit date constructor to avoid timezone issues
  const eventDate = new Date(2025, 3, 26, 0, 0, 0);
  
  // For debugging and to ensure the date is correct
  useEffect(() => {
    console.log('Event date set to:', eventDate.toLocaleString());
    console.log('Current date:', new Date().toLocaleString());
    console.log('Time difference (ms):', eventDate.getTime() - new Date().getTime());
    console.log('Time difference (days):', Math.floor((eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
    
    // Uncomment to skip animation sequence and show countdown immediately
    // setIsLoading(false);
    // setHackingStage(3);
  }, [eventDate]);

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Staged hacking sequence
  useEffect(() => {
    // Initial load
    const initialLoad = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    // Start hacking sequence after showing normal website
    const startHacking = setTimeout(() => {
      setHackingStage(1); // Glitching
    }, 3500);
    
    // Show terminal
    const showTerminal = setTimeout(() => {
      setHackingStage(2); // Terminal
    }, 5000);
    
    // Show countdown
    const showCountdown = setTimeout(() => {
      setHackingStage(3); // Countdown reveal
    }, 8000);
    
    return () => {
      clearTimeout(initialLoad);
      clearTimeout(startHacking);
      clearTimeout(showTerminal);
      clearTimeout(showCountdown);
    };
  }, []);
  
  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <div className="text-gray-800 text-xl font-bold mb-4">InfoTech Ensa Tetouan</div>
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin mx-auto"></div>
          <div className="mt-4 text-gray-600">Loading website...</div>
        </motion.div>
      </div>
    );
  }
  
  // Normal website (before hack)
  if (hackingStage === 0) {
    return (
      <div className="min-h-screen bg-white text-gray-800">
        <header className="bg-blue-600 text-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold">InfoTech Ensa Tetouan</div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="hover:underline">Home</a>
              <a href="#" className="hover:underline">About</a>
              <a href="#" className="hover:underline">Programs</a>
              <a href="#" className="hover:underline">Events</a>
              <a href="#" className="hover:underline">Contact</a>
            </nav>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl font-bold mb-4">Welcome to InfoTech Ensa Tetouan</h1>
              <p className="text-gray-600 mb-6">Learn, innovate, and shape the future of technology with our cutting-edge programs and world-class faculty.</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">Learn More</button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-full max-w-md h-64 bg-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-gray-500">University Campus Image</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  // Glitching stage (transition to hack)
  if (hackingStage === 1) {
  return (
      <div className="min-h-screen relative">
        {/* Normal site with glitches */}
        <div className="absolute inset-0 bg-white text-gray-800 opacity-90">
          <header className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="text-2xl font-bold glitch" data-text="InfoTech University">InfoTech University</div>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="hover:underline">Home</a>
                <a href="#" className="hover:underline">About</a>
                <a href="#" className="hover:underline">Programs</a>
                <a href="#" className="hover:underline">Events</a>
                <a href="#" className="hover:underline">Contact</a>
              </nav>
            </div>
          </header>
          
          <main className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl font-bold mb-4 glitch" data-text="Welcome to InfoTech Ensa Tetouan">Welcome to InfoTech Ensa Tetouan</h1>
                <p className="text-gray-600 mb-6">Learn, innovate, and shape the future of technology with our cutting-edge programs and world-class faculty.</p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">Learn More</button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="w-full max-w-md h-64 bg-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-gray-500">University Campus Image</div>
                </div>
              </div>
            </div>
          </main>
        </div>
        
        {/* Glitch overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute inset-0 bg-black opacity-0"
            animate={{ opacity: [0, 0.8, 0, 0.5, 0.1] }}
            transition={{ duration: 1, times: [0, 0.2, 0.3, 0.4, 1], repeat: 1 }}
          />
          <motion.div
            className="absolute inset-0 bg-green-500 opacity-0"
            animate={{ opacity: [0, 0.1, 0, 0.2, 0] }}
            transition={{ duration: 0.8, times: [0, 0.1, 0.5, 0.7, 1], repeat: 2 }}
          />
          
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500 text-2xl font-mono"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, times: [0, 0.1, 1] }}
          >
            SYSTEM BREACH DETECTED
          </motion.div>
        </div>
        
        <div className="scanline"></div>
      </div>
    );
  }
  
  // Terminal stage
  if (hackingStage === 2) {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center">
        <div className="scanline"></div>
        <div className="crt-effect"></div>
        
        <motion.div 
          className="w-full max-w-2xl p-4 overflow-hidden border border-green-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-black/80 p-2 border-b border-green-900 mb-4 flex justify-between items-center">
            <span className="text-xs">root@infotech:~#</span>
            <span className="text-xs">TERMINAL v2.4.1</span>
          </div>
          
          <AnimatePresence>
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TypewriterText text="$ ssh -i id_rsa hack@infotech.edu" delay={50} />
              <TypewriterText text="Connecting to server..." delay={50} startDelay={700} />
              <TypewriterText text="Connection established." delay={50} startDelay={1500} />
              <TypewriterText text="Bypassing security protocols..." delay={50} startDelay={2000} />
              <TypewriterText text="Accessing main database..." delay={50} startDelay={2500} />
              <TypewriterText text="EXECUTING: override_website.sh" className="text-red-500" delay={50} startDelay={3000} />
              <TypewriterText text="TARGET ACQUIRED. INITIATING OVERRIDE..." className="text-yellow-500 font-bold" delay={50} startDelay={3500} />
              <TypewriterText text="DEPLOYMENT SUCCESSFUL" className="text-green-500 font-bold" delay={50} startDelay={4500} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }
  
  // Final hacked state with countdown
  return (
    <>
      {/* Background effects */}
      <GlitchBackground />
      <div className="scanline"></div>
      <div className="crt-effect"></div>
      
      {/* Terminal Effect */}
      <TerminalEffect position="bottom-left" />
      
      {/* Main container */}
      <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="w-full h-full absolute top-0 left-0 pointer-events-none">
          <div className="noise"></div>
        </div>
        
        {/* SYSTEM HACKED message */}
        <motion.div
          className="absolute top-8 left-0 w-full text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="inline-block bg-red-500/20 border border-red-500 px-6 py-2">
            <GlitchText text="SYSTEM HACKED" size="3xl" intensityLevel="high" color="#ff3333" />
          </div>
        </motion.div>
        
        {/* Logo section */}
        <motion.div
          className="w-full max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ 
            y: scrollY * -0.2 // Parallax effect
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <InfoTechLogo size="lg" />
            <div className="mt-6">
              <LogoReveal 
                logoText="INFOTECH" 
                subtitle="EVENT INCOMING"
                color="#00ff41"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Main teaser content with dramatic reveal */}
        <div className="w-full max-w-6xl mx-auto grid gap-10 items-center z-10">
          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="w-full"
          >
            <motion.h2 
              className="text-6xl font-bold text-center mb-10 gradient-text font-vt323 tracking-wider"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              ACCESS GRANTED
            </motion.h2>
            
            {/* Spotlight effect for countdown */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-radial from-green-500/10 via-transparent to-transparent rounded-3xl transform scale-150 -z-10"></div>
              <div className="mx-auto max-w-4xl relative">
                <Countdown targetDate={eventDate} />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Simple footer */}
        <motion.footer 
          className="w-full mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <p className="text-sm text-green-500/60 font-vt323">
            © {new Date().getFullYear()} InfoTech - Made by Raissouni Abdellah
          </p>
        </motion.footer>
      </main>
    </>
  );
}

// Simple typewriter component for terminal effect
const TypewriterText = ({ 
  text, 
  delay = 100, 
  startDelay = 0,
  className = "" 
}: { 
  text: string, 
  delay?: number, 
  startDelay?: number,
  className?: string 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);
  
  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, startDelay);
    
    return () => clearTimeout(startTimeout);
  }, [startDelay]);
  
  useEffect(() => {
    if (!started) return;
    
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      i++;
      if (i > text.length) {
        clearInterval(intervalId);
      }
    }, delay);
    
    return () => clearInterval(intervalId);
  }, [text, delay, started]);
  
  return (
    <div className={`${className} flex`}>
      <span>{displayedText}</span>
      {displayedText.length < text.length && started && (
        <span className="ml-0.5 w-2 h-4 bg-green-500 animate-pulse"></span>
      )}
    </div>
  );
};

