
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const NeuralNodes = () => {
  const nodes = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 8 + 3,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 3 + 4,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute rounded-full bg-cyan-500/10 blur-[2px] will-change-transform"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.5, 1]
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
      <motion.div
        className="absolute top-[-20%] right-[-10%] w-[90vw] h-[90vw] bg-cyan-400/20 rounded-full mix-blend-multiply filter blur-[90px] opacity-70 will-change-transform"
        animate={{ scale: [1, 1.15, 0.95, 1], x: [0, 60, -20, 0], y: [0, 30, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[-20%] w-[100vw] h-[100vw] bg-cyan-500/15 rounded-full mix-blend-multiply filter blur-[90px] opacity-60 will-change-transform"
        animate={{ scale: [1.1, 0.9, 1.1], y: [0, -60, 0], x: [0, -30, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
    </div>
  );
};

export default FluidBackground;
