'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface InfoTechLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glitchEffect?: boolean;
}

const InfoTechLogo: React.FC<InfoTechLogoProps> = ({
  size = 'md',
  glitchEffect = true,
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  
  // Size mapping
  const sizeMap = {
    sm: { width: 100, height: 100 },
    md: { width: 150, height: 150 },
    lg: { width: 200, height: 200 },
    xl: { width: 300, height: 300 },
  };
  
  // Random glitch effect
  useEffect(() => {
    if (!glitchEffect) return;
    
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }
    }, 3000);
    
    return () => clearInterval(glitchInterval);
  }, [glitchEffect]);

  // Using PNG image path
  const logoPath = '/Info-Tech.png';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      {/* Glitch clone of logo */}
      {isGlitching && glitchEffect && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0.5 top-0.5 opacity-70" 
               style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}>
            <Image 
              src={logoPath}
              width={sizeMap[size].width}
              height={sizeMap[size].height}
              alt="InfoTech Logo"
              className="filter hue-rotate-15"
              priority
            />
          </div>
          <div className="absolute -left-0.5 -top-0.5 opacity-70" 
               style={{ clipPath: 'polygon(0 45%, 100% 45%, 100% 100%, 0 100%)' }}>
            <Image 
              src={logoPath}
              width={sizeMap[size].width}
              height={sizeMap[size].height}
              alt="InfoTech Logo"
              className="filter hue-rotate-[330deg]"
              priority
            />
          </div>
        </div>
      )}
      
      {/* Main logo */}
      <div className={isGlitching ? 'opacity-80' : ''}>
        <Image 
          src={logoPath}
          width={sizeMap[size].width}
          height={sizeMap[size].height}
          alt="InfoTech Logo"
          className={isGlitching ? 'filter brightness-125' : ''}
          priority
        />
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-blue-500 opacity-20 blur-xl rounded-full -z-10"></div>
    </motion.div>
  );
};

export default InfoTechLogo; 