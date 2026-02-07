
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { Menu, X, Brain, Sparkles, MessageCircle, Activity, Atom, ArrowRight, Quote, Instagram, Linkedin, ArrowUp, Lock, Zap, CheckCircle2, ShieldCheck, Award, Eye, Crown, Star } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import { Section, MethodologyStep } from './types';

// Brand Constants
const BRAND_COLOR = "#00D1C1";
const BRAND_TEAL = "#00A99D";

// Optimized Logo Component 
// CRITICAL: Uses object-contain and max dimensions to ensure the logo is NEVER cut.
// It acts as the primary element in the header.
const Logo: React.FC<{ light?: boolean; className?: string }> = ({ light = false, className = "" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <img 
      src="https://i.ibb.co/8nCp0vcq/full-trimmed-transparent-customcolor.png" 
      alt="Pepe Pérez Logo" 
      className="w-full h-full object-contain block"
      style={{ 
        // Enhanced shadow for better "pop" as requested previously
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1)) drop-shadow(0 10px 15px rgba(0,0,0,0.2))',
        // OPTIMIZATION: Ensure maximum clarity and sharpness
        imageRendering: '-webkit-optimize-contrast', 
        transform: 'translateZ(0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    />
  </div>
);

// Methodology Data
const METHODOLOGY: MethodologyStep[] = [
  { 
    id: '1', 
    title: 'Mirada Compasiva', 
    iconName: 'Eye',
    description: 'A través de tus historias, desafiamos al EGO y revelamos las verdades invisibles hasta ahora; con empatía y comprensión.'
  },
  { 
    id: '2', 
    title: 'Soberanía Emocional', 
    iconName: 'Crown',
    description: 'Re significamos el origen del conflicto, desde el único lugar posible: tú mismo. Dejas de ser el resultado de tu pasado para convertirte en el arquitecto de tu futuro.'
  },
  { 
    id: '3', 
    title: 'Integración del Poder', 
    iconName: 'Power',
    description: 'Cuando aceptas los recursos que se mantenían en tu “sombra”, te amplificas como individuo y accedes al equilibrío interno que tanto anhelas.'
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
  },
  {
      id: 5,
      name: "Diana A.",
      role: "Consultante",
      image: "https://i.ibb.co/mVCVFPKH/Whats-App-Image-2025-12-09-at-15-18-16.jpg",
      quote: "Entré sin saber qué esperar y salí con una claridad increíble. Me sentí escuchada y contenida. Pepe te ayuda a mirar tu historia desde otra perspectiva y soltar lo que ya no corresponde cargar. Definitivamente sí te transforma.",
      impact: "Claridad Reveladora"
  }
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(Section.HERO);

  const [symptom, setSymptom] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const [decoderResult, setDecoderResult] = useState<{
    title: string; core: string; hook: string; whatsappUrl: string; badge: string;
  } | null>(null);
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const handleScroll = () => {
        const scrollY = window.scrollY;
        setIsScrolled(scrollY > 20);
        setShowScrollTop(scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
        }
      });
    };
    const observerOptions = { root: null, rootMargin: '-20% 0px -50% 0px', threshold: 0 };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    Object.values(Section).forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Adjusted offset for mobile/desktop
      const offset = isMobile ? 100 : 260; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleDecode = () => {
    if (!symptom.trim()) return;
    setIsDecoding(true);
    const lowerInput = symptom.toLowerCase();
    
    let title = "Fuga de Energía";
    let core = "Esta situación no es el problema real, es el síntoma de una incoherencia interna. Tu cerebro está gastando recursos vitales intentando sostener una 'verdad' que ya no te sirve.";
    let hook = "Tu biología te está pidiendo a gritos una actualización. ¿Vas a seguir ignorando la señal o vas a tomar el control?";
    let waConflict = "Incoherencia Vital";
    let badge = "Análisis Prioritario";

    if (lowerInput.match(/ansiedad|estres|estrés|miedo|pánico|futuro|preocupaci|nervio/)) {
      title = "Ilusión de Control";
      core = "La ansiedad es tu mente mintiéndote, diciéndote que estás en peligro para mantenerte pequeño. No es protección, es una cárcel mental que tú mismo has construido.";
      hook = "La paz no se encuentra controlando el exterior, sino dominando tu interior. Rompe el ciclo ahora.";
      waConflict = "Desactivar Ansiedad";
      badge = "Sistema en Alerta";
    } 
    else if (lowerInput.match(/pareja|amor|relacion|novi|espos|soledad|celos|infidelidad|separaci/)) {
      title = "Resonancia Inversa";
      core = "Nadie te hace nada; todo te lo haces a ti mismo a través del otro. Tu pareja es el espejo exacto de cómo te tratas a ti mismo en tu inconsciente.";
      hook = "Deja de mendigar afuera lo que te niegas adentro. Conviértete en la persona que quieres atraer.";
      waConflict = "Sanar Vínculos";
      badge = "Patrón Repetitivo";
    } 
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
      setDecoderResult({ title, core, hook, whatsappUrl, badge });
    }, 1200);
  };

  const renderIcon = (name: string) => {
    switch(name) {
      case 'Eye': return <Eye className="w-10 h-10 text-[#00D1C1]" />;
      case 'Crown': return <Crown className="w-10 h-10 text-[#00D1C1]" />;
      case 'Power': return <Zap className="w-10 h-10 text-[#00D1C1]" />;
      default: return <Activity className="w-10 h-10 text-[#00D1C1]" />;
    }
  };

  const WHATSAPP_MESSAGE = encodeURIComponent("Hola Pepe, estoy listo para asumir mi responsabilidad y transformar mi realidad. Solicito disponibilidad para sesión.");

  return (
    <div className="relative min-h-screen text-slate-900 selection:bg-cyan-500/30 selection:text-cyan-900 overflow-x-hidden font-sans bg-slate-50 w-full">
      
      {/* IMMERSIVE BACKGROUND */}
      {isMobile ? (
        <div className="fixed inset-0 -z-10 bg-slate-50">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-slate-900/5 to-cyan-900/5 animate-pulse-slow"></div>
        </div>
      ) : (
        <FluidBackground />
      )}
      
      {/* CONTACT CTA FAB */}
      <motion.a 
        href="https://wa.me/523331155895" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[70] bg-[#25D366] text-white p-4 md:p-6 rounded-full shadow-[0_15px_40px_rgba(37,211,102,0.4)] flex items-center justify-center group"
      >
        <div className="absolute inset-0 rounded-full border border-[#25D366] animate-ping opacity-30"></div>
        <MessageCircle className="w-8 h-8 md:w-10 md:h-10 fill-current relative z-10" />
      </motion.a>

      {/* BACK TO TOP */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Volver arriba"
            className="fixed bottom-6 left-6 md:bottom-12 md:left-12 z-[70] bg-white/80 backdrop-blur-3xl border border-slate-200 text-slate-900 p-4 md:p-6 rounded-full shadow-lg hover:bg-slate-900 hover:text-white transition-all"
          >
            <ArrowUp className="w-6 h-6 md:w-8 md:h-8" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* PLASMORPHIC NAV BAR - UPDATED DESIGN & LOGO SIZE FIX */}
      <nav 
        className="fixed top-0 left-0 right-0 z-[100] h-24 md:h-64 flex items-center transition-all duration-500 w-full overflow-hidden"
      >
        {/* PLASMORPHIC EFFECT LAYER - ULTRA GLASSMORPHIC */}
        <div className="absolute inset-0 z-0 overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border-b border-white/5">
           {/* Deep Dark Teal Glass Base - MORE TRANSPARENT & HIGHER BLUR */}
           <div className="absolute inset-0 bg-[#001210]/60 backdrop-blur-[40px] backdrop-saturate-150"></div>
           
           {/* CORNER GLOWS ONLY - Softer and more integrated */}
           <div className="absolute top-0 left-0 w-[50%] h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(0,209,193,0.15),_transparent_70%)] animate-pulse-slow"></div>
           <div className="absolute top-0 right-0 w-[50%] h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(0,209,193,0.15),_transparent_70%)] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
           
           {/* Iridescent Sheen / Noise */}
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"></div>
           
           {/* Inner Glow Border - Simulating glass edge light */}
           <div className="absolute inset-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),_inset_0_-1px_0_0_rgba(255,255,255,0.05)]"></div>
           
           {/* Bottom Light Beam */}
           <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00D1C1]/30 to-transparent"></div>
        </div>

        {/* Progress Line */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] md:h-[3px] bg-gradient-to-r from-[#00D1C1] via-white to-[#00D1C1] origin-left z-50 shadow-[0_0_20px_#00D1C1]"
          style={{ scaleX }}
        />

        <div className="max-w-[1800px] mx-auto px-4 md:px-12 h-full flex items-center justify-between w-full relative z-20">
          
          {/* Spacer to balance the menu icon on the right, keeping logo centered visually */}
          <div className="w-12 md:w-16 hidden md:block"></div>

          {/* LOGO - CENTERED AND UNCUT - OPTIMIZED CLARITY */}
          <div 
             className="group cursor-pointer relative flex items-center justify-center h-full py-1 flex-grow"
             onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
               <Logo light={true} className="h-[85%] md:h-[90%] w-auto relative z-10" />
          </div>

          {/* UPGRADED MENU ICON - GLASS BUTTON WITH ANIMATED LINES */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="group relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center gap-1.5 transition-all duration-300 hover:scale-110 hover:border-[#00D1C1]/50 shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_rgba(0,209,193,0.3)] z-30 overflow-hidden"
            aria-label="Abrir menú"
          >
            {/* Inner Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00D1C1]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Animated Hamburger Lines */}
            <span className="w-5 md:w-8 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-4 md:group-hover:w-6 group-hover:bg-[#00D1C1] group-hover:translate-x-1"></span>
            <span className="w-5 md:w-8 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:bg-[#00D1C1]"></span>
            <span className="w-5 md:w-8 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-4 md:group-hover:w-6 group-hover:bg-[#00D1C1] group-hover:-translate-x-1"></span>
          </button>

        </div>
      </nav>

      {/* HERO SECTION - REFINED FOR MOBILE SPACE */}
      <header id={Section.HERO} className="relative min-h-screen flex flex-col lg:flex-row items-center bg-slate-50 pt-28 lg:pt-56 overflow-hidden w-full">
        <div className="w-full lg:w-[50%] relative z-20 flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-40 py-8 lg:py-0 lg:max-w-4xl lg:mx-auto lg:ml-0">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex items-center gap-4 mb-6 lg:mb-10"
          >
            <div className="relative flex h-3 w-3 md:h-4 md:w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-[#00D1C1] shadow-lg"></span>
            </div>
            <span className="text-black font-mono text-[10px] md:text-xs lg:text-[11px] uppercase tracking-[0.4em] font-black border-b-2 border-cyan-500/30 pb-2">
              Acompañamiento de Alto Nivel
            </span>
          </motion.div>

          <h1 className="flex flex-col text-slate-900 leading-[0.85] mb-8 lg:mb-10 xl:mb-12 select-none relative z-10 w-full">
            <motion.span 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-black text-[14vw] lg:text-5xl xl:text-6xl tracking-[-0.08em] uppercase text-slate-900"
            >
              TRANS
            </motion.span>
            
            <motion.span 
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-black text-[14vw] lg:text-5xl xl:text-6xl tracking-[-0.08em] uppercase text-slate-900 hover:text-cyan-700 cursor-default -mt-2 lg:-mt-2 ml-2 lg:ml-0 transition-colors"
            >
              FORMAR
            </motion.span>
            
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="font-serif-display italic font-light text-[3rem] md:text-[5.5rem] lg:text-4xl text-[#00D1C1] leading-none -mt-3 lg:-mt-1 ml-2 text-glow"
            >
              tu realidad.
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="text-lg md:text-2xl lg:text-lg xl:text-xl font-light text-slate-600 max-w-xl leading-relaxed mb-10 lg:mb-12 border-l-4 md:border-l-8 border-[#00D1C1] pl-6 md:pl-10 pr-2"
          >
            Tu paz comienza cuando cambia tu forma de ver el mundo. Acompañamiento de Alto Nivel en Bioneuroemoción® para desactivar conflictos y recuperar tu paz.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 w-full sm:w-auto z-20">
            <motion.button 
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.open(`https://wa.me/523331155895?text=${WHATSAPP_MESSAGE}`, '_blank')}
              className="bg-slate-900 text-white w-full sm:w-auto px-8 py-5 lg:px-10 lg:py-5 rounded-full text-[12px] md:text-[14px] lg:text-[12px] font-black tracking-[0.2em] uppercase hover:bg-cyan-950 transition-all shadow-xl border-2 border-cyan-500/40 flex items-center justify-center gap-4 group"
            >
              SOLICITAR ACOMPAÑAMIENTO
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection(Section.DECODIFICADOR)}
              className="group w-full sm:w-auto px-8 py-5 lg:px-10 lg:py-5 rounded-full bg-white border-2 border-slate-100 text-slate-900 text-[12px] md:text-[14px] lg:text-[12px] font-black tracking-[0.2em] uppercase hover:border-[#00D1C1] transition-all shadow-sm"
            >
              ESPEJO EMOCIONAL
            </motion.button>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="w-full lg:w-[50%] h-[50vh] md:h-[60vh] lg:h-[75vh] relative flex flex-col justify-end p-4 md:p-12 lg:pr-32 lg:py-12 mt-8 lg:mt-0">
           <motion.div
             initial={{ scale: 0.98, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 2, ease: "easeOut" }}
             className="relative w-full h-full rounded-[2rem] lg:rounded-[4rem] overflow-hidden shadow-2xl"
           >
             <motion.div
                className="w-full h-full"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 3, ease: "easeOut" }}
             >
                <img 
                  src="https://i.ibb.co/8yTTcFQ/Whats-App-Image-2025-12-01-at-16-26-55.jpg" 
                  alt="Pepe Pérez Portrait" 
                  className="w-full h-full object-cover object-top"
                />
             </motion.div>
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
             
             <motion.div 
               initial={{ opacity: 0, y: 60 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 2, duration: 1.5, type: "spring", stiffness: 100 }}
               className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 max-w-[85%] sm:max-w-sm z-30"
            >
              <div className="bg-slate-900/50 backdrop-blur-2xl border-2 border-white/20 p-6 md:p-12 lg:p-8 rounded-[2rem] shadow-2xl transition-all duration-700 hover:scale-105">
                 <div className="relative mb-4 md:mb-6">
                    <h3 className="font-heading font-black text-3xl md:text-5xl lg:text-3xl text-white tracking-tighter leading-none mb-2 uppercase">MASTER</h3>
                    <p className="font-serif-display italic text-[#00D1C1] text-lg md:text-3xl lg:text-xl">en Bioneuroemoción®</p>
                 </div>
                 <div className="flex items-center gap-4 md:gap-6 pt-4 md:pt-6 border-t border-white/10">
                    <div className="w-10 h-10 md:w-16 md:h-16 lg:w-10 lg:h-10 rounded-2xl bg-[#00D1C1] flex items-center justify-center shadow-lg"><Award className="w-5 h-5 md:w-8 md:h-8 lg:w-5 lg:h-5 text-white" /></div>
                    <div>
                      <p className="text-[9px] md:text-[10px] lg:text-[9px] uppercase tracking-widest text-white/60 font-black mb-1">CERTIFICADO POR</p>
                      <p className="text-white font-black text-xs md:text-sm lg:text-[11px] tracking-wide">Enric Corbera Institute</p>
                    </div>
                 </div>
              </div>
            </motion.div>
           </motion.div>
        </div>
      </header>

      {/* ABOUT SECTION - REFINED MOBILE LAYOUT */}
      <motion.section 
        id={Section.SOBRE_MI} 
        className="py-20 md:py-60 lg:py-48 bg-white relative overflow-hidden w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 grid md:grid-cols-12 gap-12 md:gap-16 lg:gap-24 items-center">
          <div className="md:col-span-7 space-y-8 md:space-y-12">
            <h2 className="text-5xl md:text-7xl lg:text-5xl xl:text-6xl font-heading font-black text-slate-900 leading-[0.8] tracking-tighter uppercase break-words">
              Acompañante en <br/>
              <span className="font-serif-display italic text-[#00D1C1] font-normal lowercase">Bioneuroemoción</span>
            </h2>
            <div className="space-y-6 md:space-y-10 text-lg md:text-3xl lg:text-lg xl:text-xl text-slate-600 font-light leading-relaxed max-w-4xl">
              <p>
                Soy <strong className="text-slate-900 font-bold">Pepe Pérez</strong>. A lo largo de mi vida, he confirmado que detrás de cada estrés, conflicto o síntoma, hay una historia que espera ser escuchada y una verdad no comprendida.
              </p>
              <p>
                Mi propósito es acompañar a las personas en ese proceso de toma de conciencia que transforma el dolor en comprensión, la confusión en claridad y la experiencia en crecimiento; devolviéndote el poder absoluto sobre tu vida.
              </p>
            </div>
          </div>
          <div className="md:col-span-5 relative group mt-8 md:mt-0">
             <div className="absolute -inset-4 md:-inset-6 border-4 border-cyan-100/30 rounded-[2rem] md:rounded-[3rem] opacity-0 group-hover:opacity-100 transition-all duration-1500 scale-105 group-hover:scale-100"></div>
             <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden shadow-2xl rounded-[2rem] md:rounded-[3rem]">
               <img 
                src="https://i.ibb.co/vxjh2yXt/Whats-App-Image-2025-12-01-at-16-26-56.jpg" 
                alt="Consulta" 
                className="w-full h-full object-cover transition-all duration-2000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent flex items-end p-8 md:p-16 lg:p-12">
                <div>
                   <Quote className="text-[#00D1C1] mb-6 md:mb-10 w-12 h-12 md:w-24 md:h-24 lg:w-12 lg:h-12" />
                   <p className="font-serif-display italic text-xl md:text-5xl lg:text-3xl xl:text-4xl text-white leading-tight mb-8 md:mb-12 drop-shadow-2xl">
                    "Todo lo que nos irrita de los demás nos puede llevar a un entendimiento de nosotros mismos."
                   </p>
                   <div className="flex items-center gap-4 md:gap-8">
                      <div className="w-10 md:w-16 h-[3px] bg-[#00D1C1]"></div>
                      <p className="text-[10px] md:text-[14px] font-black tracking-[0.4em] uppercase text-[#00D1C1]">Carl G. Jung</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* DECODER SECTION - MOBILE READY */}
      <section id={Section.DECODIFICADOR} className="relative py-20 md:py-60 lg:py-48 bg-slate-950 text-white overflow-hidden flex items-center justify-center w-full">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,209,193,0.1),_transparent_80%)] animate-pulse-slow"></div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-32 lg:mb-32"
          >
            <div className="inline-flex items-center gap-4 py-3 px-8 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-3xl mb-8 md:mb-12">
              <span className="w-3 h-3 md:w-4 md:h-4 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="text-cyan-400 text-[9px] md:text-[12px] font-black tracking-[0.5em] uppercase">Tecnología de Consciencia</span>
            </div>
            <h2 className="text-4xl md:text-9xl lg:text-5xl xl:text-6xl font-heading font-black mb-8 md:mb-12 text-white tracking-tighter leading-none uppercase">
              ESPEJO <span className="font-serif-display italic font-light text-[#00D1C1] lowercase">Emocional</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-3xl lg:text-xl font-light max-w-4xl mx-auto leading-relaxed">
              ¿Qué situación o emoción te quita la paz hoy? Escríbela y descubre su sentido biológico oculto.
            </p>
          </motion.div>

          <div className="relative mx-auto max-w-5xl">
            <div className="bg-slate-900/50 backdrop-blur-3xl border border-white/10 p-6 md:p-32 lg:p-20 rounded-[2rem] md:rounded-[6rem] shadow-2xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!decoderResult ? (
                  <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto">
                    <input 
                      type="text" 
                      value={symptom}
                      onChange={(e) => setSymptom(e.target.value)}
                      placeholder="ESCRIBE AQUÍ TU CONFLICTO..."
                      className="w-full bg-transparent border-b-2 md:border-b-4 border-slate-800 p-4 md:p-16 lg:p-10 text-xl md:text-7xl lg:text-4xl text-center text-white placeholder-slate-900 focus:outline-none focus:border-[#00D1C1] transition-all font-heading font-black uppercase tracking-tight caret-[#00D1C1]"
                    />
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDecode}
                      disabled={isDecoding || !symptom}
                      className={`mt-12 md:mt-32 lg:mt-20 w-full py-6 md:py-12 lg:py-8 rounded-[1.5rem] md:rounded-[2rem] font-black text-xs md:text-base uppercase tracking-[0.4em] transition-all relative overflow-hidden shadow-2xl ${
                        isDecoding ? 'bg-slate-800 text-slate-500' : 'bg-[#00D1C1] text-white hover:bg-cyan-500'
                      }`}
                    >
                      {isDecoding ? 'ANALIZANDO FRECUENCIA...' : 'INICIAR ESCANEO NEURAL'}
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                    <div className="mb-8 md:mb-12 inline-flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-[1.5rem] bg-slate-800/60 border-2 border-cyan-500/40">
                       <Brain size={32} className="text-cyan-400 md:w-12 md:h-12" />
                       <div className="text-left border-l-2 border-cyan-500/30 pl-4 md:pl-8">
                         <p className="text-cyan-400 text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] mb-1 md:mb-2">PROTOCOLO ACTIVO</p>
                         <p className="text-white text-base md:text-xl lg:text-lg font-black uppercase tracking-widest">{decoderResult.badge}</p>
                       </div>
                    </div>
                    <h4 className="text-3xl md:text-8xl lg:text-5xl xl:text-6xl text-white font-heading font-black tracking-tight mb-8 md:mb-12 leading-none uppercase">{decoderResult.title}</h4>
                    <p className="text-slate-300 text-lg md:text-4xl lg:text-xl font-light leading-relaxed mb-10 md:mb-16 max-w-5xl mx-auto">{decoderResult.core}</p>
                    <div className="bg-cyan-900/30 p-8 md:p-24 lg:p-12 rounded-[2rem] md:rounded-[3rem] border-2 border-cyan-500/40 mb-10 md:mb-20">
                       <p className="text-cyan-300 text-xl md:text-4xl lg:text-2xl font-serif-display italic leading-relaxed">"{decoderResult.hook}"</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center">
                       <button onClick={() => window.open(decoderResult.whatsappUrl, '_blank')} className="bg-[#25D366] text-white px-8 py-6 md:px-12 md:py-8 lg:px-10 lg:py-6 rounded-[1.5rem] md:rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs md:text-base lg:text-xs flex items-center justify-center gap-4 md:gap-6 shadow-xl hover:scale-105 transition-transform w-full md:w-auto">
                        <MessageCircle className="w-6 h-6 fill-current" /> AGENDAR SESIÓN
                      </button>
                      <button onClick={() => { setDecoderResult(null); setSymptom(''); }} className="px-8 py-6 md:px-12 md:py-8 text-slate-500 hover:text-white transition-colors uppercase text-[10px] md:text-[12px] font-black tracking-[0.6em] w-full md:w-auto">Nueva Decodificación</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* METHODOLOGY SECTION - OPTIMIZED GRID */}
      <section id={Section.METODOLOGIA} className="py-20 md:py-60 lg:py-48 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative bg-slate-50 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-56 lg:mb-24 gap-8 md:gap-12 relative z-10">
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-4 md:gap-8">
              <span className="h-[3px] w-12 md:w-16 bg-[#00D1C1]"></span>
              <span className="text-cyan-600 font-mono text-[10px] md:text-xs uppercase tracking-[0.6em] font-black">EL ALGORITMO DEL CAMBIO</span>
            </div>
            <h2 className="text-5xl md:text-[6rem] lg:text-5xl xl:text-6xl font-heading font-black text-slate-900 tracking-tighter leading-[0.8] uppercase">
              METODO <br/>
              <span className="text-[#00D1C1]">LOGÍA</span>
            </h2>
          </div>
          <p className="max-w-xl text-right text-slate-500 font-light text-lg md:text-3xl lg:text-lg xl:text-xl leading-relaxed bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border-2 border-slate-100">
            Un sistema de 3 fases diseñado para desmantelar el conflicto biológico y reconstruir la coherencia emocional desde la raíz.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 relative z-10">
          {METHODOLOGY.map((step, index) => (
            <motion.div 
              key={step.id} 
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="relative bg-white p-8 md:p-12 lg:p-10 xl:p-12 rounded-[2.5rem] md:rounded-[4rem] border-2 border-slate-100 shadow-xl hover:shadow-[0_40px_100px_-20px_rgba(0,209,193,0.3)] group transition-all duration-1000 overflow-hidden"
            >
              <span className="absolute -top-6 -right-6 md:-top-12 md:-right-12 text-[8rem] md:text-[10rem] lg:text-[6rem] font-heading font-black text-slate-50 group-hover:text-cyan-50 transition-colors z-0 pointer-events-none opacity-60">0{index + 1}</span>
              <div className="relative z-10 w-16 h-16 md:w-24 md:h-24 lg:w-16 lg:h-16 bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mb-8 md:mb-12 shadow-inner group-hover:scale-110 transition-all">
                <div className="group-hover:text-[#00D1C1] transition-colors text-slate-300 transform scale-75 md:scale-100">{renderIcon(step.iconName)}</div>
              </div>
              <div className="relative z-10 space-y-6 md:space-y-10">
                <h3 className="text-2xl md:text-4xl lg:text-2xl xl:text-3xl font-heading font-black text-slate-900 group-hover:text-cyan-900 transition-colors uppercase leading-tight">{step.title}</h3>
                <p className="text-base md:text-xl lg:text-base text-slate-500 font-light leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id={Section.TESTIMONIOS} className="py-20 md:py-60 lg:py-48 bg-white relative overflow-hidden w-full">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16 md:mb-44 lg:mb-24">
            <h2 className="text-5xl md:text-[6rem] lg:text-5xl xl:text-6xl font-heading font-black text-slate-900 tracking-tighter leading-none text-center md:text-left uppercase">
              HISTORIAS <span className="font-serif-display italic font-light text-[#00D1C1] lowercase">Reales</span>
            </h2>
            <div className="flex items-center gap-4 md:gap-8 px-6 md:px-10 py-3 md:py-5 rounded-full border-4 border-cyan-100 bg-cyan-50/50 shadow-md">
              <Star className="w-6 h-6 md:w-8 md:h-8 text-[#00D1C1] fill-current" />
              <span className="text-[10px] md:text-[12px] font-black tracking-[0.4em] uppercase text-cyan-800">CASOS VERIFICADOS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8 lg:gap-12 xl:gap-16">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 1.2 }}
                className="group relative bg-slate-50 p-8 md:p-12 lg:p-10 rounded-[2.5rem] md:rounded-[4rem] border-2 border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-1500 flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-6 right-6 md:top-12 md:right-12 opacity-5 group-hover:opacity-20 transition-opacity">
                  <Quote size={60} className="text-[#00D1C1] md:w-20 md:h-20 lg:w-10 lg:h-10" />
                </div>
                
                <div className="relative z-10 space-y-8 md:space-y-12 lg:space-y-6">
                  <div className="flex items-center gap-6 md:gap-8">
                    <div className="relative flex-shrink-0">
                      <div className="absolute -inset-2 md:-inset-3 rounded-full bg-gradient-to-tr from-[#00D1C1] to-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity duration-1500"></div>
                      <img src={t.image} alt={t.name} className="relative w-16 h-16 md:w-32 md:h-32 lg:w-20 lg:h-20 rounded-full object-cover border-4 md:border-8 border-white shadow-2xl" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-xl md:text-3xl lg:text-xl xl:text-2xl tracking-tight mb-2 uppercase leading-none">{t.name}</h4>
                      <p className="text-[10px] md:text-[12px] text-slate-400 font-black uppercase tracking-[0.5em]">{t.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 font-light italic leading-relaxed text-lg md:text-2xl lg:text-lg xl:text-xl">
                    "{t.quote}"
                  </p>
                </div>

                <div className="relative z-10 mt-10 md:mt-16 lg:mt-8 pt-8 md:pt-12 lg:pt-6 border-t-4 border-slate-100 flex items-center justify-between">
                   <div className="flex items-center gap-4 md:gap-6">
                     <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#00D1C1] animate-pulse"></div>
                     <span className="text-xs md:text-sm font-black tracking-[0.3em] uppercase text-[#00D1C1]">{t.impact}</span>
                   </div>
                   <div className="flex gap-1 md:gap-2">
                      {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-cyan-400 fill-current md:w-6 md:h-6 lg:w-4 lg:h-4" />)}
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION WITH SPECIFIC BACKGROUND AND GLASSMORPHISM */}
      <footer id={Section.CONTACTO} className="relative pt-20 md:pt-60 lg:pt-32 pb-12 md:pb-24 lg:pb-16 rounded-t-[3rem] md:rounded-t-[10rem] mt-24 md:mt-32 overflow-hidden w-full">
        {/* REQUESTED BACKGROUND IMAGE LAYER */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://i.ibb.co/pBt3KYKy/3333.png")' }}
        />
        {/* GLASSMORPHIC OVERLAY LAYER */}
        <div className="absolute inset-0 z-10 bg-slate-950/80 backdrop-blur-[24px]" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 grid lg:grid-cols-2 gap-16 md:gap-48 lg:gap-32 relative z-20 text-white">
          <div className="space-y-12 md:space-y-20 lg:space-y-10 flex flex-col justify-center items-start">
            {/* FOOTER LOGO - CENTERED AND BIG */}
            <div className="w-full flex justify-center lg:justify-start py-6 md:py-12">
               <Logo light className="h-20 md:h-80 lg:h-40 w-auto" />
            </div>
            <p className="text-slate-300 max-w-2xl text-xl md:text-4xl lg:text-xl xl:text-2xl font-light leading-relaxed text-center lg:text-left">
              Si cambias tu percepción, cambias tu realidad. Agenda tu sesión y comienza el cambio consciente hacia tu plenitud hoy mismo.
            </p>
            <div className="flex gap-8 md:gap-12 w-full justify-center lg:justify-start">
               <a href="#" className="w-16 h-16 md:w-20 md:h-20 lg:w-14 lg:h-14 rounded-[1.5rem] md:rounded-[2rem] border-2 border-white/10 flex items-center justify-center hover:bg-[#00D1C1] hover:text-white transition-all text-slate-500 hover:scale-110"><Instagram size={32} className="md:w-10 md:h-10 lg:w-6 lg:h-6" /></a>
               <a href="#" className="w-16 h-16 md:w-20 md:h-20 lg:w-14 lg:h-14 rounded-[1.5rem] md:rounded-[2rem] border-2 border-white/10 flex items-center justify-center hover:bg-cyan-600 hover:text-white transition-all text-slate-500 hover:scale-110"><Linkedin size={32} className="md:w-10 md:h-10 lg:w-6 lg:h-6" /></a>
            </div>
          </div>

          <div className="relative group bg-white/5 backdrop-blur-3xl border-2 border-white/10 p-8 md:p-32 lg:p-16 rounded-[3rem] md:rounded-[5rem] hover:border-[#00D1C1]/60 hover:shadow-2xl transition-all duration-1500 overflow-hidden">
            <div className="relative z-10 space-y-12 md:space-y-20 lg:space-y-10">
              <div className="flex items-center gap-6 md:gap-10">
                <div className="w-16 h-16 md:w-32 md:h-32 lg:w-20 lg:h-20 rounded-[1.5rem] md:rounded-[2.5rem] bg-gradient-to-br from-[#00D1C1] to-cyan-700 flex items-center justify-center shadow-xl flex-shrink-0"><Zap size={32} className="text-white md:w-12 md:h-12 lg:w-8 lg:h-8 md:scale-150" /></div>
                <div>
                  <h4 className="text-2xl md:text-6xl lg:text-4xl font-heading font-black text-white tracking-tight mb-2 md:mb-4 uppercase leading-none">Canal Privado</h4>
                  <p className="text-cyan-400 text-[10px] md:text-xl lg:text-sm font-black uppercase tracking-[0.5em]">ACOMPAÑAMIENTO DIRECTO</p>
                </div>
              </div>
              <div className="space-y-8 md:space-y-12 lg:space-y-6 text-lg md:text-5xl lg:text-2xl xl:text-3xl text-slate-100 font-light">
                <a href="mailto:asesoria@pepeperez.mx" className="block hover:text-[#00D1C1] transition-colors border-b-2 border-white/5 pb-4 md:pb-8 lg:pb-3 leading-none truncate">asesoria@pepeperez.mx</a>
                <div className="block hover:text-[#00D1C1] transition-colors border-b-2 border-white/5 pb-4 md:pb-8 lg:pb-3 leading-none">+52 333 115 5895</div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02, y: -8 }} 
                whileTap={{ scale: 0.98 }} 
                onClick={() => window.open('https://wa.me/523331155895', '_blank')} 
                className="mt-10 md:mt-16 lg:mt-10 w-full rounded-[2rem] md:rounded-[3rem] bg-[#00D1C1] text-white font-black py-6 md:py-14 lg:py-8 uppercase tracking-[0.3em] md:tracking-[0.5em] text-xs md:text-2xl lg:text-lg shadow-2xl transition-all"
              >
                INICIAR PROTOCOLO
              </motion.button>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 mt-16 md:mt-32 pt-8 md:pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between text-[10px] md:text-[14px] text-slate-500 uppercase tracking-[0.4em] md:tracking-[0.6em] font-black gap-8 md:gap-16 relative z-20">
          <p>© 2025 PEPE PÉREZ. TODOS LOS DERECHOS RESERVADOS.</p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            <p className="hover:text-white transition-colors cursor-pointer">BIONEUROEMOCIÓN® CERTIFIED</p>
            <p className="hover:text-white transition-colors cursor-pointer">POLÍTICA DE PRIVACIDAD</p>
          </div>
        </div>
      </footer>

      {/* MOBILE NAV OVERLAY - REDESIGNED FOR DARK THEME - UPDATED BACKGROUND */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[120] bg-[#001E1C] flex flex-col p-6 md:p-10 lg:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12 md:mb-24 border-b border-white/10 pb-6">
               <Logo light className="h-16 md:h-24" />
               <button onClick={() => setMobileMenuOpen(false)} className="p-4 md:p-6 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><X size={32} className="text-white md:w-12 md:h-12" /></button>
            </div>
            <div className="flex flex-col gap-8 md:gap-12">
              {[
                { label: 'Sobre Mí', id: Section.SOBRE_MI },
                { label: 'Metodología', id: Section.METODOLOGIA },
                { label: 'Espejo Emocional', id: Section.DECODIFICADOR },
                { label: 'Testimonios', id: Section.TESTIMONIOS },
                { label: 'Contacto', id: Section.CONTACTO },
              ].map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-4xl md:text-5xl font-heading font-black text-slate-200 hover:text-[#00D1C1] transition-colors text-left tracking-tighter uppercase leading-none"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
            <div className="mt-auto pt-12 md:pt-24 pb-8">
               <button 
                  onClick={() => window.open('https://wa.me/523331155895', '_blank')}
                  className="w-full bg-[#00D1C1] text-white py-8 md:py-10 rounded-[2rem] font-black uppercase tracking-[0.3em] text-lg md:text-xl shadow-2xl hover:bg-cyan-600 transition-colors"
               >
                 SOLICITAR SESIÓN
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
