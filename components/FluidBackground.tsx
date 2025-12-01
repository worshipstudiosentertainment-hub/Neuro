/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const NeuralNodes = () => {
  const nodes = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      size: Math.random() * 8 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute rounded-full bg-emerald-500/10 blur-[2px] will-change-[transform,opacity]"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: node.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: node.delay,
          }}
        />
      ))}
    </div>
  );
};

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-50">
      
      <NeuralNodes />

      {/* Blob 1: Vibrant Emerald - Healing/Bio */}
      <motion.div
        className="absolute top-[-20%] right-[-10%] w-[90vw] h-[90vw] bg-emerald-400/15 rounded-full mix-blend-multiply filter blur-[150px] opacity-70 will-change-transform"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Blob 2: Deep Teal/Cyan - Consciousness */}
      <motion.div
        className="absolute bottom-[-10%] left-[-20%] w-[100vw] h-[100vw] bg-teal-500/10 rounded-full mix-blend-multiply filter blur-[150px] opacity-60 will-change-transform"
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Subtle Grain for Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none mix-blend-overlay"></div>
    </div>
  );
};

export default FluidBackground;