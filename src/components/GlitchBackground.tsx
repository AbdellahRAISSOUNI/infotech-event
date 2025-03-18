'use client';

import { useRef, useEffect } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { EffectComposer, Glitch, Noise, ChromaticAberration, Bloom } from '@react-three/postprocessing';
import { BlendFunction, GlitchMode } from 'postprocessing';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Digital grid component
const Grid = () => {
  const gridRef = useRef<THREE.GridHelper>(null);
  
  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.position.z = (clock.getElapsedTime() * 0.25) % 1.0;
    }
  });
  
  return (
    <gridHelper 
      ref={gridRef}
      args={[50, 50, 0x00ff41, 0x003300]} 
      position={[0, -5, 0]} 
      rotation={[Math.PI / 2, 0, 0]}
    />
  );
};

// Particle system
const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particlesGeometryRef = useRef<THREE.BufferGeometry>(null);
  
  useEffect(() => {
    if (particlesGeometryRef.current) {
      const geometry = particlesGeometryRef.current;
      const count = 3000;
      const positions = new Float32Array(count * 3);
      
      for (let i = 0; i < count; i++) {
        // random positions for each particle
        positions[i * 3 + 0] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, []);
  
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.08;
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.035) * 0.7;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry ref={particlesGeometryRef} />
      <pointsMaterial 
        size={0.08} 
        color="#00ff41" 
        transparent 
        opacity={0.8} 
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Digital wireframe terrain
const Terrain = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.PlaneGeometry>(null);
  
  useEffect(() => {
    if (geometryRef.current) {
      const geometry = geometryRef.current;
      const position = geometry.attributes.position;
      
      // Apply some noise to the terrain
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        
        const noise = 
          Math.sin(x * 0.5) * 0.8 + 
          Math.sin(y * 0.5) * 0.8;
        
        position.setZ(i, noise);
      }
      
      geometry.computeVertexNormals();
    }
  }, []);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Animate the terrain
      meshRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.15) * 0.08;
    }
  });
  
  return (
    <mesh ref={meshRef} position={[0, 0, -10]} rotation={[-Math.PI / 4, 0, 0]}>
      <planeGeometry ref={geometryRef} args={[40, 40, 38, 38]} />
      <meshStandardMaterial 
        color="#002400" 
        emissive="#004000"
        wireframe
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Digital Binary Stream
const BinaryStream = () => {
  const groupRef = useRef<THREE.Group>(null);
  const streams = Array(10).fill(0).map((_, i) => ({
    position: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 15],
    speed: 0.2 + Math.random() * 0.5,
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]
  }));
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });
  
  return (
    <group ref={groupRef}>
      {streams.map((stream, i) => (
        <mesh key={i} position={stream.position} rotation={stream.rotation}>
          <boxGeometry args={[0.2, 10, 0.2]} />
          <meshBasicMaterial color="#00ff41" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
};

// Main component to export
const GlitchBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 0, 5]} intensity={0.7} color="#00ff41" />
        
        <Particles />
        <Grid />
        <Terrain />
        <BinaryStream />
        
        {/* Post-processing effects */}
        <EffectComposer>
          <Glitch
            strength={new THREE.Vector2(0.03, 0.04)}
            ratio={0.15}
            mode={GlitchMode.SPORADIC}
          />
          <Noise
            blendFunction={BlendFunction.OVERLAY}
            opacity={0.2}
          />
          <ChromaticAberration
            offset={new THREE.Vector2(0.002, 0.002)}
          />
          <Bloom
            intensity={0.4}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
    </div>
  );
};

export default GlitchBackground; 