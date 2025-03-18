'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoBackgroundProps {
  videoSrc?: string;
  opacity?: number;
  overlay?: boolean;
  children?: React.ReactNode;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc = '/teaser.mp4',
  opacity = 0.6,
  overlay = true,
  children,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Video autoplay failed:', error);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <motion.video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute top-0 left-0 w-full h-full object-cover`}
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity }}
        transition={{ duration: 2 }}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>

      {overlay && (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 via-black/20 to-black/70 z-[1]"></div>
      )}

      {children && (
        <div className="relative z-[2]">{children}</div>
      )}

      {/* Scanlines effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[3]">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2)_1px,transparent_1px)] bg-[length:100%_4px]"></div>
      </div>
    </div>
  );
};

export default VideoBackground; 