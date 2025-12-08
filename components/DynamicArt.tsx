/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, ImagePlus, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface DynamicArtProps {
  prompt: string;
  className?: string;
  overlayColor?: string;
}

const DynamicArt: React.FC<DynamicArtProps> = ({ 
  prompt, 
  className = "", 
  overlayColor = "bg-white/80" 
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    const win = window as any;
    if (win.aistudio) {
      const selected = await win.aistudio.hasSelectedApiKey();
      setHasKey(selected);
    }
  };

  const handleGenerate = async () => {
    const win = window as any;
    if (!win.aistudio) return;

    // API Key Flow
    const selected = await win.aistudio.hasSelectedApiKey();
    if (!selected) {
      await win.aistudio.openSelectKey();
      const retrySelected = await win.aistudio.hasSelectedApiKey();
      if (!retrySelected) return; // User cancelled
    }
    setHasKey(true);
    setLoading(true);

    try {
      // Create new instance to ensure key is fresh
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: "2K"
          }
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64String = part.inlineData.data;
          setImageUrl(`data:image/png;base64,${base64String}`);
          break;
        }
      }
    } catch (error) {
      console.error("Image generation failed:", error);
      // If error is related to key, might need to re-prompt, but for now just log
    } finally {
      setLoading(false);
    }
  };

  if (imageUrl) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`absolute inset-0 z-0 ${className}`}
      >
        <img 
          src={imageUrl} 
          alt="AI Generated Art" 
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${overlayColor}`}></div>
      </motion.div>
    );
  }

  return (
    <div className={`absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden ${className}`}>
      {/* Fallback Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5"></div>
      
      {/* Interactive Trigger */}
      <div className="pointer-events-auto relative z-10 opacity-0 hover:opacity-100 transition-opacity duration-500 group">
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="bg-slate-900/80 backdrop-blur-md text-white px-6 py-3 rounded-full flex items-center gap-3 text-xs font-bold uppercase tracking-widest shadow-xl border border-emerald-500/30 hover:bg-slate-900 transition-all transform hover:scale-105"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
              Generating Art...
            </>
          ) : (
            <>
              <ImagePlus className="w-4 h-4 text-emerald-400" />
              {hasKey ? "Infuse with AI Art" : "Enable AI Graphics"}
            </>
          )}
        </button>
        <p className="mt-2 text-[9px] text-center text-slate-400 font-mono">
          Powered by gemini-3-pro-image-preview
        </p>
      </div>
    </div>
  );
};

export default DynamicArt;