/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ text, as: Component = 'span', className = '' }) => {
  return (
    <Component className={`relative inline-block font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-teal-600 to-emerald-800 ${className}`}>
      <motion.span
        className="block bg-gradient-to-r from-slate-900 via-emerald-600 to-slate-900 bg-[length:200%_auto] bg-clip-text text-transparent"
        animate={{
          backgroundPosition: ['0% center', '200% center'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {text}
      </motion.span>
    </Component>
  );
};

export default GradientText;