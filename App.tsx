/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { Menu, X, Brain, Sparkles, MessageCircle, Activity, Atom, ArrowRight, Quote, Instagram, Linkedin, ArrowUp, Lock, Zap, CheckCircle2, ShieldCheck, Award, Users, Verified } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import DynamicArt from './components/DynamicArt';
import { Section, MethodologyStep } from './types';

// Methodology Data - REFACTORED FOR NEUROMARKETING (Reptilian Brain: Safety, Power, Freedom)
const METHODOLOGY: MethodologyStep[] = [
  { 
    id: '1', 
    title: 'Desactivación del Miedo', 
    subtitle: 'Protocolo de Seguridad',
    iconName: 'Ear',
    description: 'El cerebro no negocia soluciones en estado de alerta. Blindamos tu entorno emocional para apagar los mecanismos de defensa y acceder al núcleo del conflicto.'
  },
  { 
    id: '2', 
    title: 'Claridad Radical', 
    subtitle: 'Lógica Biológica',
    iconName: 'Brain',
    description: 'Abandonamos la victimización para encontrar la función biológica del síntoma. Entender el "para qué" profundo disuelve la incertidumbre al instante.'
  },
  { 
    id: '3', 
    title: 'Soberanía Emocional', 
    subtitle: 'Re-Codificación',
    iconName: 'Sparkles',
    description: 'No solo resolvemos el síntoma; actualizamos tu identidad. Dejas de ser un resultado de tu pasado para convertirte en el arquitecto de tu futuro.'
  },
  ];

// Testimonials Data
const TESTIMONIALS = [
  {
    id: 1,
    name: "Rodrigo Vargas",
    role: "Personal Trainer",
    image: "https://i.ibb.co/p65k6CYf/Whats-App-Image-2025-12-05-at-20-51-42.jpg",
    quote: "No es la típica terapia donde solo hablas. Es una experiencia diferente que no te esperas. Pepe me hizo darme cuenta de patrones inconscientes y entender su origen real. Recomendado ampliamente si buscas mejorar tu vida.",
    impact: "Consciencia Inmediata"
  },
  {
    id: 2,
    name: "Gabriela D.",
    role: "Interiorista",
    image: "https://i.ibb.co/TqvzwtT7/Whats-App-Image-2025-12-03-at-09-21-22.jpg",
    quote: "Pepe me ayudó a ver que forzaba un camino ajeno. Al redirigir mi energía hacia mi felicidad, las oportunidades reales aparecieron. Hoy soy remunerada por lo que amo hacer.",
    impact: "Propósito Real"
  },
  {
    id: 3,
    name: "Martha Parra",
    role: "Diseñadora Gráfica",
    image: "https://i.ibb.co/gsxHGRx/Whats-App-Image-2025-12-05-at-22-40-05.jpg",
    quote: "Pasé por un duelo largo y a pesar de haber tomado terapia aún entraba en depresión constantemente, finalmente Pepe me ayudó a abrazar mi dolor, aprender de él y dejarlo ir. Hoy me siento plena y estoy muy agradecida.",
    impact: "Plenitud Interior"
  },
  {
      id: 4,
      name: "J.P. Rojo",
      role: "Empresario",
      image: "https://i.ibb.co/7JBhKpFx/Whats-App-Image-2025-11-19-at-15-29-30.jpg",
      quote: "Pepe creó el ángulo correcto para ver lo que antes me dolía. Con esa nueva perspectiva, transformé el conflicto en herramientas para mejorar mi vida. Poco a poco, trabajo para expandir esta nueva visión.",
      impact: "Visión Expandida"
  }
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(Section.HERO);
  
  // Scroll Progress Bar Logic - Snappier
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
    restDelta: 0.001
  });
  
  // Parallax effects - Smoother
  const heroTextY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  
  // Decoder State
  const [symptom, setSymptom] = useState('');
  const [decoderResult, setDecoderResult] = useState<{
    title: string;
    core: string;
    hook: string;
    whatsappUrl: string;
    badge: string;
  } | null>(null);
  const [isDecoding, setIsDecoding] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();
    
    // OPTIMIZED SCROLL HANDLER (RequestAnimationFrame + DOM Caching)
    let ticking = false;
    
    // Cache section elements to avoid repeated DOM queries during scroll
    const sectionIds = [
      Section.HERO, 
      Section.SOBRE_MI, 
      Section.DECODIFICADOR, 
      Section.METODOLOGIA, 
      Section.TESTIMONIOS, 
      Section.CONTACTO
    ];

    const cachedElements = new Map<string, HTMLElement | null>();
    // Pre-fetch elements
    sectionIds.forEach(id => {
      cachedElements.set(id, document.getElementById(id));
    });

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 20);
          setShowScrollTop(scrollY > 300);

          // Highly Optimized ScrollSpy
          const threshold = 180;
          let current = Section.HERO;
          
          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const id = sectionIds[i];
            const element = cachedElements.get(id); // Use cache
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= threshold) {
                current = id as Section;
                break;
              }
            }
          }
          
          setActiveSection(current);
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      const offset = 110; // Precision tuned: Header height + minimal breathing room
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleDecode = () => {
    if (!symptom.trim()) return;
    setIsDecoding(true);
    
    const lowerInput = symptom.toLowerCase();
    
    // Default Neuromarketing Response (Identity + Curiosity Gap)
    let title = "Fuga de Energía";
    let core = "Esta situación no es el problema real, es el síntoma de una incoherencia interna. Tu cerebro está gastando recursos vitales intentando sostener una 'verdad' que ya no te sirve.";
    let hook = "Tu biología te está pidiendo a gritos una actualización. ¿Vas a seguir ignorando la señal o vas a tomar el control?";
    let waConflict = "Incoherencia Vital";
    let badge = "Análisis Prioritario";

    // Logic Refactored for Situations/Emotions using Neuromarketing Triggers
    
    // TRIGGER: LOSS OF CONTROL / FREEDOM
    if (lowerInput.match(/ansiedad|estres|estrés|miedo|pánico|futuro|preocupaci|nervio/)) {
      title = "Ilusión de Control";
      core = "La ansiedad es tu mente mintiéndote, diciéndote que estás en peligro para mantenerte pequeño. No es protección, es una cárcel mental que tú mismo has construido.";
      hook = "La paz no se encuentra controlando el exterior, sino dominando tu interior. Rompe el ciclo ahora.";
      waConflict = "Desactivar Ansiedad";
      badge = "Sistema en Alerta";
    } 
    // TRIGGER: REJECTION / BELONGING
    else if (lowerInput.match(/pareja|amor|relacion|novi|espos|soledad|celos|infidelidad|separaci/)) {
      title = "Resonancia Inversa";
      core = "Nadie te hace nada; todo te lo haces a ti mismo a través del otro. Tu pareja es el espejo exacto de cómo te tratas a ti mismo en tu inconsciente.";
      hook = "Deja de mendigar afuera lo que te niegas adentro. Conviértete en la persona que quieres atraer.";
      waConflict = "Sanar Vínculos";
      badge = "Patrón Repetitivo";
    } 
    // TRIGGER: STATUS / SURVIVAL / WORTH
    else if (lowerInput.match(/trabajo|dinero|jefe|éxito|fracaso|profesi|abundancia|econom/)) {
      title = "Conflicto de Valor";
      core = "Tu cuenta bancaria es un reflejo directo de tu permiso interno para recibir. Estás operando con un 'programa de escasez' heredado que limita tu expansión.";
      hook = "El dinero no sigue al esfuerzo, sigue a la consciencia. Reprograma tu valor y la realidad te seguirá.";
      waConflict = "Desbloqueo Económico";
      badge = "Bloqueo Activo";
    }

    const waMessage = encodeURIComponent(`Hola Pepe, mi escaneo reveló: *${title.toUpperCase()}* (${symptom}). Necesito la sesión para *${waConflict.toUpperCase()}*.`);
    const whatsappUrl = `https://wa.me/523331155895?text=${waMessage}`;

    setTimeout(() => {
      setIsDecoding(false);
      setDecoderResult({
        title,
        core,
        hook,
        whatsappUrl,
        badge
      });
    }, 1200); // Fast enough to keep attention, slow enough to feel "processed"
  };

  const renderIcon = (name: string) => {
    switch(name) {
      case 'Ear': return <Lock className="w-10 h-10 text-emerald-500" />; // Safety
      case 'Brain': return <Zap className="w-10 h-10 text-emerald-500" />; // Clarity/Energy
      case 'Sparkles': return <Sparkles className="w-10 h-10 text-emerald-500" />; // Identity
      default: return <Activity className="w-10 h-10 text-emerald-500" />;
    }
  };

  const WHATSAPP_MESSAGE = encodeURIComponent("Hola Pepe, estoy listo para asumir mi responsabilidad y transformar mi realidad. Solicito disponibilidad para sesión.");

  return (
    <div className="relative min-h-screen text-slate-900 selection:bg-emerald-500/30 selection:text-emerald-900 overflow-x-hidden font-sans bg-slate-50">
      
      {/* HYBRID BACKGROUND ENGINE */}
      {isMobile ? (
        <div className="fixed inset-0 -z-10 bg-slate-50">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/5 via-slate-900/5 to-emerald-900/5 animate-pulse-slow"></div>
        </div>
      ) : (
        <FluidBackground />
      )}
      
      {/* WHATSAPP FAB - High Velocity Pulse */}
      <motion.a 
        href="https://wa.me/523331155895" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-6 md:right-8 z-[70] bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_30px_rgba(37,211,102,0.4)] flex items-center justify-center group"
      >
        <div className="absolute inset-0 rounded-full border border-[#25D366] animate-ping opacity-50"></div>
        <MessageCircle className="w-7 h-7 fill-current relative z-10" />
      </motion.a>

      {/* SCROLL TO TOP */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Volver arriba"
            className="fixed bottom-8 left-6 md:left-8 z-[70] bg-white/50 backdrop-blur-md border border-slate-200 text-slate-900 p-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:bg-slate-900 hover:text-white transition-colors"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* DYNAMIC NAV - Architectural Precision */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md border-b border-emerald-900/5 h-20' 
            : 'bg-transparent border-b border-transparent h-32'
        }`}
      >
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 origin-left z-50"
          style={{ scaleX }}
        />

        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
          {/* LOGO LOCKUP - Ultra-Premium Typography */}
          <div className={`flex items-center group cursor-pointer transition-all duration-500 ${isScrolled ? 'gap-3' : 'gap-5'}`} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            
            {/* ANIMATED BIO-NODE ICON LOGO - Increased Size */}
            <div className={`relative flex items-center justify-center transition-all duration-500 ${isScrolled ? 'w-10 h-10 scale-90' : 'w-14 h-14 scale-100'}`}>
               {/* Ambient Glow */}
               <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

               {/* Outer Rotating Ring (Dashed) */}
               <motion.div
                 className="absolute inset-0 rounded-full border border-dashed border-slate-300 opacity-70"
                 animate={{ rotate: 360 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               />

               {/* Middle Counter-Rotating Ring (Structural) */}
               <motion.div
                 className="absolute inset-1 rounded-full border border-slate-900/5 border-t-emerald-500 border-r-emerald-500"
                 animate={{ rotate: -360 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               />

               {/* The Atom Core */}
               <motion.div
                 className="relative z-10 text-slate-900 group-hover:text-emerald-700 transition-colors duration-500"
                 whileHover={{ scale: 1.1 }}
               >
                 <Atom className={`${isScrolled ? 'w-5 h-5' : 'w-7 h-7'}`} strokeWidth={2} />
               </motion.div>

               {/* Central Bio-Heartbeat */}
               <motion.div
                 className="absolute w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                 animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.4, 0.8] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               />

               {/* Orbiting Satellite (3D Depth Effect) */}
               <motion.div
                 className="absolute inset-0"
                 animate={{ rotate: 360 }}
                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               >
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1 w-1.5 h-1.5 bg-slate-900 rounded-full border border-white shadow-sm"></span>
               </motion.div>
            </div>
            
            {/* ADJUSTED LOGO TEXT ALIGNMENT */}
            <div className={`flex flex-col justify-center relative transition-all duration-500 ${isScrolled ? 'h-12 min-w-[120px]' : 'h-14 min-w-[180px]'}`}>
              <div className={`absolute left-0 transition-all duration-500 ${isScrolled ? '-top-2' : '-top-2'}`}>
                  <span className={`font-heading font-extrabold leading-none tracking-[-0.1em] block transition-all duration-500 text-emerald-600 ${isScrolled ? 'text-3xl' : 'text-5xl'} drop-shadow-sm`}>
                    PEPE
                  </span>
              </div>
              <div className={`absolute left-0 transition-all duration-500 z-10 ${isScrolled ? 'top-2 left-10' : 'top-6 left-12 md:left-14'}`}>
                  <span className={`font-serif-display italic font-medium leading-none text-emerald-600 block transition-all duration-500 ${isScrolled ? 'text-2xl' : 'text-4xl'} drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]`}>
                    Pérez<span className="text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,1)] animate-pulse">.</span>
                  </span>
              </div>
            </div>
            
            {/* Private Practice Badge */}
            <div className={`hidden lg:block border-l border-slate-300 pl-4 ml-2 transition-opacity duration-300 ${isScrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
              <div className="flex flex-col gap-[2px]">
                <span className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-bold leading-none">Private</span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-bold leading-none">Practice</span>
              </div>
            </div>
          </div>
          
          {/* Desktop Menu - Monospace Tech Feel with Bio-Digital Glow */}
          <div className="hidden md:flex items-center gap-12 text-xs font-bold tracking-[0.2em] text-slate-900 uppercase">
            {[
              { label: 'Sobre Mí', id: Section.SOBRE_MI },
              { label: 'Metodología', id: Section.METODOLOGIA },
              { label: 'Espejo', id: Section.DECODIFICADOR },
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button 
                  key={item.label} 
                  onClick={() => scrollToSection(item.id)}
                  className="relative py-2 group overflow-hidden"
                >
                  <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-emerald-700' : 'group-hover:text-emerald-700'}`}>
                    {item.label}
                  </span>
                  {/* Atmospheric Glow on Hover/Active */}
                  <span className={`absolute inset-0 bg-emerald-500/5 blur-lg rounded-full -z-0 transition-transform duration-500 ${isActive ? 'scale-150' : 'scale-0 group-hover:scale-150'}`}></span>
                  
                  {/* Gradient Underline */}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500 to-teal-400 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </button>
              );
            })}
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection(Section.CONTACTO)}
            className={`hidden md:inline-flex items-center gap-2 bg-slate-900 text-white rounded-full font-black tracking-widest hover:bg-emerald-700 hover:shadow-[0_10px_30px_-5px_rgba(16,185,129,0.4)] transition-all duration-300 ${isScrolled ? 'px-6 py-3 text-[0.7rem]' : 'px-8 py-4 text-xs'}`}
          >
            AGENDAR
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-slate-900 z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Alternar menú"
          >
             {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-slate-950 flex flex-col items-center justify-center gap-8 md:hidden overflow-hidden"
          >
             {/* Background Decoration */}
             <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-slate-950 pointer-events-none"></div>

            <div className="flex flex-col items-center gap-8 relative z-10">
              {[
                { label: 'Sobre Mí', id: Section.SOBRE_MI },
                { label: 'Metodología', id: Section.METODOLOGIA },
                { label: 'Espejo', id: Section.DECODIFICADOR },
                { label: 'Contacto', id: Section.CONTACTO },
              ].map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-4xl font-heading font-black text-white hover:text-emerald-500 transition-colors tracking-tighter uppercase text-stroke-light hover:text-stroke-emerald"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
            
            {/* Close button for redundancy/UX */}
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute bottom-12 p-4 text-slate-500 hover:text-white transition-colors"
              aria-label="Cerrar menú"
            >
              <X className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION - THE "BEST IN THE WORLD" CINEMATIC SPLIT SCREEN */}
      <header id={Section.HERO} className="relative min-h-screen flex flex-col lg:flex-row scroll-mt-0 overflow-hidden bg-slate-50">
        
        {/* LEFT COLUMN: PURE TYPOGRAPHY & STATUS (45%) */}
        <div className="w-full lg:w-[45%] relative z-20 flex flex-col justify-center px-6 lg:px-16 xl:px-24 pt-32 lg:pt-0 pb-12 lg:pb-0">
          
          {/* Status Beacon */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-3 mb-8 lg:mb-12"
          >
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"></span>
            </div>
            <span className="text-emerald-800 font-mono text-[10px] uppercase tracking-[0.35em] font-bold border-b border-emerald-500/20 pb-1">
              Acompañamiento Emocional
            </span>
          </motion.div>

          {/* Kinetic Headline */}
          <h1 className="flex flex-col text-slate-900 leading-[0.8] mb-10 select-none relative z-10">
            <motion.span 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-black text-[13vw] lg:text-[5.5rem] xl:text-[7rem] tracking-[-0.08em] uppercase text-slate-900 text-glow-dark"
            >
              TRANS
            </motion.span>
            
            <motion.span 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-black text-[13vw] lg:text-[5.5rem] xl:text-[7rem] tracking-[-0.08em] uppercase text-slate-900 hover:text-emerald-700 cursor-default -mt-2 lg:-mt-4 ml-2 text-glow-dark transition-colors"
            >
              FORMAR
            </motion.span>
            
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="font-serif-display italic font-light text-[2.5rem] lg:text-[3.5rem] text-emerald-600 leading-none -mt-2 lg:-mt-3 ml-1 text-glow"
            >
              tu realidad.
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-xl md:text-2xl font-light text-slate-600 max-w-md leading-relaxed mb-12 border-l-2 border-emerald-500/50 pl-6"
          >
            Tu paz comienza cuando cambia tu forma de ver el mundo. Acompañamiento de Alto Nivel en Bioneuroemoción® para desactivar conflictos y recuperar tu paz.
          </motion.p>

          {/* Magnetic CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mb-16 z-20">
            <motion.button 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open(`https://wa.me/523331155895?text=${WHATSAPP_MESSAGE}`, '_blank')}
              className="bg-slate-900 text-white px-10 py-5 rounded-full text-xs font-black tracking-[0.2em] uppercase hover:bg-emerald-900 transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_-12px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <span className="relative z-10">Solicitar Acompañamiento</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
            </motion.button>
            
            <motion.button 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection(Section.DECODIFICADOR)}
              className="group px-10 py-5 rounded-full bg-white border border-slate-200 text-slate-900 text-xs font-black tracking-[0.2em] uppercase hover:border-emerald-500 transition-colors shadow-sm hover:shadow-lg"
            >
              Espejo Emocional
            </motion.button>
          </div>
        </div>

        {/* RIGHT COLUMN: INFINITE DEPTH CINEMA CANVAS (55%) */}
        <div className="w-full lg:w-[55%] h-[60vh] lg:h-screen relative overflow-hidden bg-slate-100">
           {/* Ken Burns Effect - Slow Majestic Zoom */}
           <motion.div
             initial={{ scale: 1.15, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 2.5, ease: "easeOut" }}
             className="w-full h-full"
           >
             <img 
               src="https://i.ibb.co/8yTTcFQ/Whats-App-Image-2025-12-01-at-16-26-55.jpg" 
               alt="Pepe Pérez Professional Portrait" 
               className="w-full h-full object-cover object-top lg:object-center"
             />
           </motion.div>
           
           {/* Cinematic Vignette */}
           <div className="absolute inset-0 bg-gradient-to-r from-slate-50/20 via-transparent to-slate-900/20 mix-blend-multiply pointer-events-none"></div>
           <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none"></div>

            {/* ULTRA POWERFUL OFFICIAL CREDENTIAL MONOLITH */}
            <motion.div 
               initial={{ opacity: 0, y: 50, scale: 0.95 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               transition={{ delay: 1.8, duration: 1, type: "spring", stiffness: 100 }}
               className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-auto lg:bottom-20 lg:left-[10%] max-w-sm z-30"
            >
              <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-900/40 backdrop-blur-2xl border-t border-l border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] group hover:shadow-[0_30px_60px_-12px_rgba(16,185,129,0.3)] transition-all duration-500">
                {/* Holographic Sheen */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-emerald-500/10 opacity-50 pointer-events-none"></div>
                <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 group-hover:translate-x-[50%] transition-transform duration-1000"></div>

                <div className="relative p-6 flex flex-col gap-1">
                   {/* Top Badge Row */}
                   <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-200">Verified ID</span>
                      </div>
                      <div className="flex items-center gap-1">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                         <span className="text-[9px] font-bold text-emerald-500 uppercase">Active</span>
                      </div>
                   </div>

                   {/* Main Title */}
                   <div className="relative">
                      <h3 className="font-heading font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight leading-none text-glow-white">
                        MASTER
                      </h3>
                      <p className="font-serif-display italic text-emerald-400 text-lg">en Bioneuroemoción®</p>
                   </div>
                   
                   {/* Authority Source */}
                   <div className="mt-4 pt-2 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-300 flex items-center justify-center shadow-lg border border-yellow-200/50">
                        <Award className="w-5 h-5 text-yellow-950" />
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">Certificado Por</p>
                        <p className="text-white font-bold text-xs tracking-wide">Enric Corbera Institute</p>
                      </div>
                   </div>

                   {/* Decorative Seal Overlay */}
                   <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none">
                      <Verified className="w-32 h-32 text-white" />
                   </div>
                </div>
              </div>
            </motion.div>
        </div>

      </header>

      {/* ABOUT SECTION */}
      <motion.section 
        id={Section.SOBRE_MI} 
        className="py-32 bg-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
      >
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-12 gap-20 items-center">
          
          {/* TEXT BLOCK - MOVED ABOVE IMAGE FOR MOBILE */}
          <div className="md:col-span-7 order-1 md:order-1">
            <h2 className="text-5xl md:text-7xl font-heading font-black text-slate-900 mb-8 leading-[0.9] tracking-tighter text-glow-dark">
              Consultor en <br/>
              <span className="font-serif-display italic text-emerald-600 font-normal text-glow">Bioneuroemoción®</span>
            </h2>
            
            <div className="space-y-6 text-xl text-slate-600 font-light leading-relaxed">
              <p>
                Soy <strong className="text-slate-900 font-bold">Pepe Pérez</strong>. No soy tu salvador, soy el espejo donde tu inconsciente se revela para ser sanado. Mi labor es acompañarte a desactivar los programas ocultos que sabotean tu paz.
              </p>
              <p>
                A través de un proceso de indagación quirúrgica, transformamos el "por qué me pasa esto" en un "para qué lo estoy creando", devolviéndote el poder absoluto sobre tu vida.
              </p>
            </div>
          </div>

          {/* IMAGE BLOCK - MOVED BELOW TEXT FOR MOBILE */}
          <div className="md:col-span-5 relative group order-2 md:order-2">
             <div className="absolute -inset-4 border border-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
             <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden shadow-2xl rounded-sm">
               <img 
                src="https://i.ibb.co/vxjh2yXt/Whats-App-Image-2025-12-01-at-16-26-56.jpg" 
                alt="Consulta" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
              />
              {/* Quote Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex items-end p-8">
                <div>
                   <p className="font-serif-display italic text-2xl md:text-3xl text-white leading-snug mb-4 drop-shadow-lg text-glow-white">
                    "Todo lo que nos irrita de los demás nos puede llevar a un entendimiento de nosotros mismos."
                   </p>
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-[1px] bg-emerald-500"></div>
                      <p className="text-[10px] font-black tracking-[0.2em] uppercase text-emerald-400">— Carl G. Jung</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </motion.section>

      {/* DECODER SECTION - NEUROMARKETING ENHANCED */}
      <section id={Section.DECODIFICADOR} className="relative py-40 bg-slate-950 text-white overflow-hidden min-h-screen flex items-center justify-center" data-hover="true">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.08),_transparent_60%)] animate-pulse-slow"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full border border-emerald-500/30 bg-emerald-950/50 backdrop-blur-md mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-emerald-400 text-[10px] font-bold tracking-[0.3em] uppercase">Interactive Tool</span>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-heading font-black mb-6 text-white tracking-tighter text-glow-white">
              ESPEJO <span className="font-serif-display italic font-light text-emerald-500 text-glow">Emocional</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-light max-w-xl mx-auto">
              ¿Qué situación o emoción te quita la paz hoy? Escríbela y descubre su sentido.
            </p>
          </motion.div>

          <div className="relative mx-auto max-w-4xl">
            <div className="bg-slate-900/20 backdrop-blur-3xl border border-white/10 p-10 md:p-16 rounded-[2rem] shadow-[0_0_50px_rgba(16,185,129,0.05)] hover:shadow-[0_0_60px_rgba(6,182,212,0.1)] relative overflow-hidden group transition-shadow duration-500">
              {/* Scan Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-50 group-hover:top-[100%] transition-all duration-[2s] ease-in-out"></div>

              <AnimatePresence mode="wait">
                {!decoderResult ? (
                  <motion.div 
                    key="input-mode"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    className="relative z-10 max-w-2xl mx-auto"
                  >
                    <div className="mb-14 text-center relative">
                      <input 
                        type="text" 
                        value={symptom}
                        onChange={(e) => setSymptom(e.target.value)}
                        placeholder="Ej: Ansiedad, Pareja..."
                        className="w-full bg-transparent border-b border-slate-700 p-6 text-4xl md:text-6xl text-center text-white placeholder-slate-800 focus:outline-none focus:border-emerald-500 transition-all font-heading font-black uppercase tracking-tight caret-emerald-500"
                      />
                    </div>
                    
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDecode}
                      disabled={isDecoding || !symptom}
                      className={`w-full py-6 rounded-xl font-black text-sm uppercase tracking-[0.2em] transition-all relative overflow-hidden ${
                        isDecoding ? 'bg-slate-800 text-slate-500' : 'bg-emerald-600 text-white hover:bg-emerald-500'
                      }`}
                    >
                      {isDecoding ? 'Analizando...' : 'INICIAR ESCANEO EMOCIONAL'}
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="result-mode"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 text-center"
                  >
                    <div className="mb-10 inline-flex items-center gap-3 p-4 rounded-full bg-slate-800/50 border border-emerald-500/30">
                       <Brain className="w-8 h-8 text-emerald-400" />
                       <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest px-2 border-l border-emerald-500/30">
                         {decoderResult.badge}
                       </span>
                    </div>
                    
                    <h4 className="text-3xl md:text-5xl text-white font-heading font-black tracking-tight mb-8">
                      {decoderResult.title}
                    </h4>
                    
                    <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto">
                      {decoderResult.core}
                    </p>
                     
                    <div className="bg-emerald-900/20 p-8 rounded-xl border border-emerald-500/20 mb-10">
                       <p className="text-emerald-300 text-xl font-serif-display italic">"{decoderResult.hook}"</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                       <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(decoderResult.whatsappUrl, '_blank')}
                        className="bg-[#25D366] text-white px-8 py-4 rounded-lg font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(37,211,102,0.3)] animate-pulse-slow"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                        DESACTIVAR PROGRAMA EN WHATSAPP
                      </motion.button>
                      <button 
                        onClick={() => { setDecoderResult(null); setSymptom(''); }}
                        className="px-8 py-4 text-slate-500 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest"
                      >
                        Nueva Consulta
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* METHODOLOGY SECTION - ENHANCED BLUEPRINT DESIGN - FASTER PHYSICS */}
      <motion.section 
        id={Section.METODOLOGIA} 
        className="py-40 max-w-[1400px] mx-auto px-6 relative bg-slate-50 min-h-screen flex flex-col justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }} // Triggers slightly earlier for smoother flow
      >
        {/* Dynamic Art Background - The Nano Banana Pro Infusion */}
        <DynamicArt 
          prompt="Abstract artistic representation of the human brain emotions, neural networks turning into light, deep emerald and gold colors, cinematic lighting, hyper-realistic 8k, biological geometry, synaptic connections"
          className="opacity-40 mix-blend-multiply"
          overlayColor="bg-slate-50/90"
        />

        {/* Connecting Line (Desktop) */}
        <div className="absolute top-[60%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-200 to-transparent hidden md:block z-0 opacity-40"></div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-32 relative z-10">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="h-[1px] w-12 bg-emerald-500"></span>
              <span className="text-emerald-600 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">Blueprint</span>
            </div>
            <h2 className="text-6xl md:text-9xl font-heading font-black text-slate-900 tracking-tighter leading-[0.8] text-glow-dark">
              METODO <br/>
              <span className="text-emerald-600 text-glow">LOGÍA</span>
            </h2>
          </div>
          <p className="max-w-md text-right text-slate-500 font-light text-lg mt-8 md:mt-0 leading-relaxed bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-white/50">
            Un sistema de 3 fases diseñado para desmantelar el conflicto biológico y reconstruir la coherencia emocional.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative z-10">
          {METHODOLOGY.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }} // Snappy trigger
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }} // Spring-like fast ease
              whileHover={{ y: -10 }}
              className="relative bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(16,185,129,0.15)] group overflow-hidden transition-all duration-700"
            >
              {/* Hover Gradient Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/20 rounded-[2.5rem] transition-colors duration-700 pointer-events-none"></div>
              
              {/* Background Number */}
              <span className="absolute -top-6 -right-6 text-[12rem] font-heading font-black text-slate-100 group-hover:text-emerald-50 transition-colors duration-700 leading-none select-none z-0">
                0{index + 1}
              </span>

              {/* Icon Container */}
              <div className="relative z-10 w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 transition-transform duration-500 ring-1 ring-slate-100">
                <div className="group-hover:text-emerald-600 transition-colors duration-500 text-slate-400">
                   {renderIcon(step.iconName)}
                </div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-heading font-black mb-2 text-slate-900 group-hover:text-emerald-900 transition-colors">{step.title}</h3>
                <p className="font-serif-display italic text-emerald-600 text-lg mb-6 group-hover:text-emerald-500 transition-colors">{step.subtitle}</p>
                <p className="text-lg text-slate-600 font-light leading-relaxed">{step.description}</p>
              </div>

              {/* Bottom Active Line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* EVIDENCE / TESTIMONIALS - EPIC DESIGN OVERHAUL */}
      <section id={Section.TESTIMONIOS} className="py-40 bg-slate-950 relative overflow-hidden scroll-mt-20">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
             <div>
                <span className="text-emerald-500 font-mono text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  Social Proof
                </span>
                <h2 className="text-6xl md:text-9xl font-heading font-black mt-4 text-white tracking-tighter leading-[0.85] text-glow-white">
                  EVIDENCIA <br/>
                  <span className="text-white text-glow-white">REAL</span>
                </h2>
             </div>
             <p className="text-slate-400 max-w-sm text-lg font-light leading-relaxed text-right md:text-left">
               Resultados tangibles de quienes decidieron dejar de sobrevivir y comenzaron a vivir.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }} // Faster entrance
                whileHover={{ y: -15, scale: 1.02 }}
                className={`relative group rounded-[2rem] overflow-hidden border border-white/10 bg-slate-900/20 backdrop-blur-3xl hover:border-cyan-400/30 hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)] transition-all duration-700 ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                {/* Spotlight Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                
                <div className="p-8 md:p-12 flex flex-col h-full justify-between relative z-10">
                   {/* Header: User Info */}
                   <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                         <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-cyan-500 transition-colors duration-500">
                           <img src={t.image} alt={t.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-110" />
                         </div>
                         <div>
                            <h4 className="text-white font-heading font-bold text-xl md:text-2xl uppercase tracking-wide">{t.name}</h4>
                            <span className="text-cyan-500 text-xs font-bold uppercase tracking-widest block mt-1">{t.role}</span>
                         </div>
                      </div>
                      <Quote className="text-slate-800 w-12 h-12 md:w-20 md:h-20 rotate-180 group-hover:text-cyan-900/30 transition-colors duration-700" />
                   </div>

                   {/* Body: Quote */}
                   <div className="flex-grow">
                      <p className={`text-slate-300 font-serif-display italic leading-relaxed ${i === 0 ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>
                        "{t.quote}"
                      </p>
                   </div>

                   {/* Footer: Impact Badge */}
                   <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-cyan-500" />
                        <span className="text-slate-400 text-xs uppercase tracking-widest font-bold">Resultado Verificado</span>
                      </div>
                      <span className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-slate-900 transition-all duration-500">
                        {t.impact || "Transformación"}
                      </span>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER - Monolithic Finish */}
      <footer id={Section.CONTACTO} className="bg-slate-950 text-white pt-0 pb-12 rounded-t-[3rem] mt-12 overflow-hidden">
        {/* Header Image Section */}
        <div className="w-full h-[40vh] md:h-[60vh] relative overflow-hidden">
           <img 
             src="https://i.ibb.co/1Yn4S0dp/Iconic-photo-blue-202512021416.jpg" 
             alt="Pepe Pérez Iconic" 
             className="w-full h-full object-cover object-top opacity-80"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 -mt-20 relative z-10">
          <div>
            <div className="mb-12 relative select-none group cursor-default block">
               {/* REDESIGNED LOGO: SOLID, GLOWING, HIGH CONTRAST */}
               <h3 className="font-heading text-[6rem] md:text-[9rem] lg:text-[11rem] font-black tracking-[-0.05em] text-white leading-[0.8] drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] text-glow-white">
                 PEPE
               </h3>
               <h3 className="font-serif-display italic text-[4rem] md:text-[6rem] lg:text-[7rem] text-emerald-500 leading-[0.8] ml-2 md:ml-4 -mt-2 md:-mt-4 drop-shadow-lg text-glow">
                 Pérez<span className="text-white drop-shadow-md">.</span>
               </h3>
            </div>
            
            <p className="text-slate-300 max-w-sm mb-12 text-xl font-light leading-relaxed">
              Si cambias tu percepción, cambias tu realidad. Agenda tu sesión y comienza el cambio.
            </p>

            <div className="flex gap-4">
               <a href="#" aria-label="Instagram" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 hover:text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition-all text-slate-400">
                 <Instagram className="w-5 h-5" />
               </a>
               <a href="#" aria-label="LinkedIn" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white hover:shadow-[0_0_20px_rgba(0,119,181,0.6)] transition-all text-slate-400">
                 <Linkedin className="w-5 h-5" />
               </a>
            </div>
          </div>

          {/* Contact Card - ULTRA MYSTICAL PORTAL */}
          <div className="relative group overflow-hidden bg-slate-900/60 backdrop-blur-3xl border border-white/10 p-12 rounded-[2.5rem] self-end transition-all duration-700 hover:border-emerald-400/50 hover:shadow-[0_0_100px_-20px_rgba(16,185,129,0.3)]">
            
            {/* Mystical Atmosphere Layers */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.1),_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute -top-[50%] -right-[50%] w-[100%] h-[100%] bg-emerald-500/20 rounded-full blur-[100px] animate-pulse-slow pointer-events-none mix-blend-screen"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform duration-500">
                    <Zap className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                    <h4 className="text-2xl font-heading font-black text-white tracking-tight">Acceso Directo</h4>
                    <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Portal de Cambio</p>
                </div>
              </div>
              
              <div className="space-y-6 text-slate-300 relative pl-2">
                {/* Circuit Line */}
                <div className="absolute left-[1.9rem] top-6 bottom-6 w-[1px] bg-gradient-to-b from-emerald-500/30 to-transparent"></div>
                
                <a href="mailto:asesoria@pepeperez.mx" className="flex items-center gap-6 group/link relative z-10">
                  <div className="relative w-14 h-14 rounded-full bg-slate-950 flex items-center justify-center border border-white/10 group-hover/link:border-emerald-500 group-hover/link:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-500">
                     <div className="absolute inset-0 rounded-full bg-emerald-500/10 scale-0 group-hover/link:scale-100 transition-transform duration-500"></div>
                     <span className="text-sm font-mono font-bold text-slate-500 group-hover/link:text-emerald-400 transition-colors">@</span>
                  </div>
                  <span className="tracking-wide text-lg font-light text-slate-400 group-hover/link:text-white group-hover/link:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-500">
                    asesoria@pepeperez.mx
                  </span>
                </a>
                
                <div className="flex items-center gap-6 group/link relative z-10">
                   <div className="relative w-14 h-14 rounded-full bg-slate-950 flex items-center justify-center border border-white/10 group-hover/link:border-emerald-500 group-hover/link:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-500">
                     <div className="absolute inset-0 rounded-full bg-emerald-500/10 scale-0 group-hover/link:scale-100 transition-transform duration-500"></div>
                     <span className="text-sm font-mono font-bold text-slate-500 group-hover/link:text-emerald-400 transition-colors">Ph</span>
                  </div>
                  <span className="tracking-wide text-lg font-light text-slate-400 group-hover/link:text-white group-hover/link:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-500">
                    +52 333 115 5895
                  </span>
                </div>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('https://wa.me/523331155895', '_blank')}
                className="mt-12 w-full group/btn relative overflow-hidden rounded-xl bg-white text-slate-900 font-black py-6 uppercase tracking-[0.2em] text-xs shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(16,185,129,0.6)] transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Iniciar Transformación <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          <p>© 2025 Pepe Pérez.</p>
          <p>Bioneuroemoción® Certified.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;