
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

// Optimized Logo Component with maximum presence and controlled spacing
const Logo: React.FC<{ light?: boolean; className?: string }> = ({ light = false, className = "h-20 md:h-32" }) => (
  <div className="flex items-center justify-center select-none py-2">
    <img 
      src="https://i.ibb.co/HpTq9sWd/full-trimmed-transparent-customcolor-7.png" 
      alt="Pepe Pérez Logo" 
      className={`${className} w-auto object-contain transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${light ? 'brightness-0 invert opacity-100' : 'drop-shadow-[0_15px_30px_rgba(0,209,193,0.3)]'}`} 
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
      // Consistent offset based on the large persistent header
      const offset = isMobile ? 140 : 220; 
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
    <div className="relative min-h-screen text-slate-900 selection:bg-cyan-500/30 selection:text-cyan-900 overflow-x-hidden font-sans bg-slate-50">
      
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
        className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[70] bg-[#25D366] text-white p-4 md:p-6 rounded-full shadow-[0_20px_60px_rgba(37,211,102,0.4)] flex items-center justify-center group"
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
            className="fixed bottom-6 left-6 md:bottom-12 md:left-12 z-[70] bg-white/90 backdrop-blur-2xl border border-slate-200 text-slate-900 p-4 md:p-6 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.1)] hover:bg-slate-900 hover:text-white transition-all"
          >
            <ArrowUp className="w-6 h-6 md:w-8 md:h-8" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* PERMANENT MASSIVE GLASS-MORPHIC NAV */}
      <nav 
        className="fixed top-0 left-0 right-0 z-[100] bg-white/60 backdrop-blur-[24px] border-b border-white/20 h-32 md:h-48 flex items-center shadow-lg transition-all duration-500"
      >
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-400 origin-left z-50"
          style={{ scaleX }}
        />

        <div className="max-w-[1700px] mx-auto px-6 md:px-12 h-full flex items-center justify-between w-full">
          {/* MAXIMIZED LOGO PRESENCE WITH DEDICATED SPACE */}
          <div 
            className="group cursor-pointer transition-transform duration-700 hover:scale-110 flex-shrink-0" 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            <Logo className="h-20 md:h-40" />
          </div>
          
          {/* Desktop Links with Breathing Room */}
          <div className="hidden xl:flex items-center gap-12 2xl:gap-24 text-[13px] font-black tracking-[0.35em] text-slate-900 uppercase">
            {[
              { label: 'Sobre Mí', id: Section.SOBRE_MI },
              { label: 'Metodología', id: Section.METODOLOGIA },
              { label: 'Espejo', id: Section.DECODIFICADOR },
              { label: 'Testimonios', id: Section.TESTIMONIOS },
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button 
                  key={item.label} 
                  onClick={() => scrollToSection(item.id)}
                  className="relative py-4 group"
                >
                  <span className={`relative z-10 transition-colors duration-500 ${isActive ? 'text-cyan-700' : 'group-hover:text-cyan-700'}`}>
                    {item.label}
                  </span>
                  <span className={`absolute bottom-0 left-0 w-full h-[4px] bg-[#00D1C1] transition-transform duration-700 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </button>
              );
            })}
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection(Section.CONTACTO)}
            className="hidden xl:inline-flex items-center gap-4 bg-slate-900 text-white rounded-full font-black tracking-[0.25em] hover:bg-[#00D1C1] shadow-[0_15px_40px_rgba(0,209,193,0.3)] hover:shadow-[0_20px_60px_rgba(0,209,193,0.6)] transition-all duration-700 px-12 py-5 text-xs"
          >
            AGENDAR CITA
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button 
            className="xl:hidden text-slate-900 z-50 p-4 hover:bg-slate-100/50 rounded-full transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú"
          >
             {mobileMenuOpen ? <X size={36} /> : <Menu size={36} />}
          </button>
        </div>
      </nav>

      {/* HERO SECTION - REFINED FOR MASSIVE NAV OFFSET */}
      <header id={Section.HERO} className="relative min-h-screen flex flex-col lg:flex-row items-center scroll-mt-0 overflow-hidden bg-slate-50 pt-32 md:pt-48">
        <div className="w-full lg:w-[50%] relative z-20 flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-32 py-12 lg:py-0">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex items-center gap-4 mb-8 lg:mb-12"
          >
            <div className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#00D1C1] shadow-[0_0_20px_rgba(0,209,193,0.8)]"></span>
            </div>
            <span className="text-cyan-800 font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] font-black border-b-2 border-cyan-500/30 pb-2">
              Acompañamiento Emocional
            </span>
          </motion.div>

          <h1 className="flex flex-col text-slate-900 leading-[0.8] mb-10 lg:mb-16 select-none relative z-10">
            <motion.span 
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-black text-[15vw] lg:text-[7rem] xl:text-[8.5rem] tracking-[-0.08em] uppercase text-slate-900"
            >
              TRANS
            </motion.span>
            
            <motion.span 
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-black text-[15vw] lg:text-[7rem] xl:text-[8.5rem] tracking-[-0.08em] uppercase text-slate-900 hover:text-cyan-700 cursor-default -mt-2 lg:-mt-6 ml-2 lg:ml-4 transition-colors"
            >
              FORMAR
            </motion.span>
            
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="font-serif-display italic font-light text-[3rem] lg:text-[5rem] text-[#00D1C1] leading-none -mt-4 lg:-mt-8 ml-2 text-glow"
            >
              tu realidad.
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="text-lg md:text-2xl lg:text-3xl font-light text-slate-600 max-w-2xl leading-relaxed mb-12 lg:mb-16 border-l-4 md:border-l-8 border-[#00D1C1] pl-6 md:pl-10"
          >
            Tu paz comienza cuando cambia tu forma de ver el mundo. Acompañamiento de Alto Nivel en Bioneuroemoción® para desactivar conflictos y recuperar tu paz.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 w-full sm:w-auto mb-12 lg:mb-0 z-20">
            <motion.button 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.open(`https://wa.me/523331155895?text=${WHATSAPP_MESSAGE}`, '_blank')}
              className="bg-slate-900 text-white px-10 py-5 lg:px-12 lg:py-6 rounded-full text-[13px] font-black tracking-[0.25em] uppercase hover:bg-cyan-950 transition-all shadow-[0_20px_50px_rgba(0,209,193,0.35)] hover:shadow-[0_25px_80px_rgba(0,209,193,0.7)] border-2 border-cyan-500/40 flex items-center justify-center gap-4 group"
            >
              SOLICITAR ACOMPAÑAMIENTO
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </motion.button>
            
            <motion.button 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection(Section.DECODIFICADOR)}
              className="group px-10 py-5 lg:px-12 lg:py-6 rounded-full bg-white border-2 border-slate-100 text-slate-900 text-[13px] font-black tracking-[0.25em] uppercase hover:border-[#00D1C1] transition-all shadow-[0_15px_35px_rgba(0,0,0,0.05)]"
            >
              ESPEJO EMOCIONAL
            </motion.button>
          </div>
        </div>

        {/* HERO IMAGE CONTAINER - OPTIMIZED FOR FULL VISIBILITY */}
        <div className="w-full lg:w-[50%] h-[60vh] md:h-[70vh] lg:h-[calc(100vh-48px)] relative flex flex-col justify-end p-4 md:p-8 lg:pr-12 lg:py-12">
           <motion.div
             initial={{ scale: 0.97, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 1.8, ease: "easeOut" }}
             className="relative w-full h-full rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden shadow-2xl"
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
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none"></div>
             
             <motion.div 
               initial={{ opacity: 0, y: 60 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.8, duration: 1.2, type: "spring", stiffness: 100 }}
               className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-sm z-30"
            >
              <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/20 p-6 md:p-10 rounded-[2rem] shadow-[0_30px_70px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-105">
                 <div className="relative mb-6">
                    <h3 className="font-heading font-black text-3xl md:text-4xl text-white tracking-tighter leading-none mb-2">MASTER</h3>
                    <p className="font-serif-display italic text-[#00D1C1] text-xl md:text-2xl">en Bioneuroemoción®</p>
                 </div>
                 <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#00D1C1] flex items-center justify-center shadow-lg"><Award className="w-6 h-6 md:w-8 md:h-8 text-white" /></div>
                    <div>
                      <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/60 font-black mb-1">CERTIFICADO POR</p>
                      <p className="text-white font-black text-xs md:text-sm tracking-wide leading-tight">Enric Corbera Institute</p>
                    </div>
                 </div>
              </div>
            </motion.div>
           </motion.div>
        </div>
      </header>

      {/* ABOUT SECTION */}
      <motion.section 
        id={Section.SOBRE_MI} 
        className="py-24 md:py-48 lg:py-64 bg-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 grid md:grid-cols-12 gap-16 md:gap-24 items-center">
          <div className="md:col-span-7 space-y-10">
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-heading font-black text-slate-900 leading-[0.85] tracking-tighter uppercase">
              Acompañante en <br/>
              <span className="font-serif-display italic text-[#00D1C1] font-normal lowercase">Bioneuroemoción</span>
            </h2>
            <div className="space-y-8 text-lg md:text-2xl text-slate-600 font-light leading-relaxed max-w-3xl">
              <p>
                Soy <strong className="text-slate-900 font-bold">Pepe Pérez</strong>. A lo largo de mi vida, he confirmado que detrás de cada estrés, conflicto o síntoma, hay una historia que espera ser escuchada y una verdad no comprendida.
              </p>
              <p>
                Mi propósito es acompañar a las personas en ese proceso de toma de conciencia que transforma el dolor en comprensión, la confusión en claridad y la experiencia en crecimiento; devolviéndote el poder absoluto sobre tu vida.
              </p>
            </div>
          </div>
          <div className="md:col-span-5 relative group">
             <div className="absolute -inset-6 border-2 border-cyan-100/50 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"></div>
             <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden shadow-2xl rounded-[3rem]">
               <img 
                src="https://i.ibb.co/vxjh2yXt/Whats-App-Image-2025-12-01-at-16-26-56.jpg" 
                alt="Consulta" 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/30 to-transparent flex items-end p-8 md:p-12">
                <div className="relative z-10">
                   <Quote className="text-[#00D1C1] mb-6 w-12 h-12 md:w-16 md:h-16" />
                   <p className="font-serif-display italic text-2xl md:text-3xl lg:text-4xl text-white leading-snug mb-8 drop-shadow-lg">
                    "Todo lo que nos irrita de los demás nos puede llevar a un entendimiento de nosotros mismos."
                   </p>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-[2px] bg-[#00D1C1]"></div>
                      <p className="text-[10px] md:text-[11px] font-black tracking-[0.3em] uppercase text-[#00D1C1]">Carl G. Jung</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* DECODER SECTION */}
      <section id={Section.DECODIFICADOR} className="relative py-24 md:py-48 lg:py-64 bg-slate-950 text-white overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,209,193,0.1),_transparent_75%)] animate-pulse-slow"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-32"
          >
            <div className="inline-flex items-center gap-3 py-2 px-6 rounded-full border border-cyan-500/40 bg-cyan-950/40 backdrop-blur-3xl mb-10">
              <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="text-cyan-400 text-[10px] md:text-[11px] font-black tracking-[0.4em] uppercase">Tecnología de Consciencia</span>
            </div>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-heading font-black mb-8 text-white tracking-tighter leading-none uppercase">
              ESPEJO <span className="font-serif-display italic font-light text-[#00D1C1] lowercase">Emocional</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
              ¿Qué situación o emoción te quita la paz hoy? Escríbela y descubre su sentido biológico oculto.
            </p>
          </motion.div>

          <div className="relative mx-auto max-w-5xl">
            <div className="bg-slate-900/30 backdrop-blur-3xl border border-white/10 p-8 md:p-20 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.4)] relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!decoderResult ? (
                  <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
                    <input 
                      type="text" 
                      value={symptom}
                      onChange={(e) => setSymptom(e.target.value)}
                      placeholder="ESCRIBE AQUÍ TU CONFLICTO..."
                      className="w-full bg-transparent border-b-2 border-slate-800 p-4 md:p-8 text-2xl md:text-6xl text-center text-white placeholder-slate-900 focus:outline-none focus:border-[#00D1C1] transition-all font-heading font-black uppercase tracking-tight caret-[#00D1C1]"
                    />
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDecode}
                      disabled={isDecoding || !symptom}
                      className={`mt-12 md:mt-20 w-full py-6 md:py-8 rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.3em] transition-all relative overflow-hidden shadow-[0_15px_45px_rgba(0,209,193,0.5)] ${
                        isDecoding ? 'bg-slate-800 text-slate-500' : 'bg-[#00D1C1] text-white hover:bg-cyan-500'
                      }`}
                    >
                      {isDecoding ? 'ANALIZANDO FRECUENCIA...' : 'INICIAR ESCANEO NEURAL'}
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                    <div className="mb-10 inline-flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-cyan-500/30">
                       <Brain size={40} className="text-cyan-400" />
                       <div className="text-left border-l border-cyan-500/30 pl-4">
                         <p className="text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-1">PROTOCOLO ACTIVO</p>
                         <p className="text-white text-xs font-bold uppercase tracking-widest">{decoderResult.badge}</p>
                       </div>
                    </div>
                    <h4 className="text-3xl md:text-6xl text-white font-heading font-black tracking-tight mb-8 leading-none uppercase">{decoderResult.title}</h4>
                    <p className="text-slate-300 text-lg md:text-2xl font-light leading-relaxed mb-10 max-w-2xl mx-auto">{decoderResult.core}</p>
                    <div className="bg-cyan-900/20 p-8 rounded-[2rem] border border-cyan-500/20 mb-12">
                       <p className="text-cyan-300 text-xl md:text-3xl font-serif-display italic leading-relaxed">"{decoderResult.hook}"</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                       <button onClick={() => window.open(decoderResult.whatsappUrl, '_blank')} className="bg-[#25D366] text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] md:text-xs flex items-center justify-center gap-4 shadow-[0_15px_45px_rgba(37,211,102,0.3)] hover:scale-105 transition-transform">
                        <MessageCircle className="w-5 h-5 fill-current" /> AGENDAR SESIÓN
                      </button>
                      <button onClick={() => { setDecoderResult(null); setSymptom(''); }} className="px-8 py-5 text-slate-500 hover:text-white transition-colors uppercase text-[10px] md:text-xs font-black tracking-[0.3em]">Nueva Consulta</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* METHODOLOGY SECTION */}
      <section id={Section.METODOLOGIA} className="py-24 md:py-48 lg:py-64 max-w-[1500px] mx-auto px-6 md:px-10 relative bg-slate-50">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 md:mb-40 gap-12 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <span className="h-[2px] w-12 bg-[#00D1C1]"></span>
              <span className="text-cyan-600 font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] font-black">BLUEPRINT</span>
            </div>
            <h2 className="text-6xl md:text-9xl font-heading font-black text-slate-900 tracking-tighter leading-[0.8] uppercase">
              METODO <br/>
              <span className="text-[#00D1C1]">LOGÍA</span>
            </h2>
          </div>
          <p className="max-w-md text-right text-slate-500 font-light text-lg md:text-xl leading-relaxed bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            Un sistema de 3 fases diseñado para desmantelar el conflicto biológico y reconstruir la coherencia emocional desde la raíz.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 md:gap-16 relative z-10">
          {METHODOLOGY.map((step, index) => (
            <motion.div 
              key={step.id} 
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="relative bg-white p-10 lg:p-14 rounded-[3rem] border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,209,193,0.15)] group transition-all duration-700"
            >
              <span className="absolute -top-6 -right-6 text-9xl md:text-[12rem] font-heading font-black text-slate-50 group-hover:text-cyan-50 transition-colors z-0 pointer-events-none opacity-40">0{index + 1}</span>
              <div className="relative z-10 w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-10 shadow-inner group-hover:scale-110 transition-all">
                <div className="group-hover:text-[#00D1C1] transition-colors text-slate-300">{renderIcon(step.iconName)}</div>
              </div>
              <div className="relative z-10 space-y-6">
                <h3 className="text-2xl md:text-4xl font-heading font-black text-slate-900 group-hover:text-cyan-900 transition-colors uppercase leading-tight">{step.title}</h3>
                <p className="text-base md:text-lg lg:text-xl text-slate-500 font-light leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id={Section.TESTIMONIOS} className="py-24 md:py-48 lg:py-64 bg-white relative overflow-hidden">
        <div className="max-w-[1500px] mx-auto px-6 md:px-10 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20 md:mb-32">
            <h2 className="text-6xl md:text-9xl font-heading font-black text-slate-900 tracking-tighter leading-none text-center md:text-left uppercase">
              HISTORIAS <span className="font-serif-display italic font-light text-[#00D1C1] lowercase">Reales</span>
            </h2>
            <div className="flex items-center gap-4 px-6 py-2.5 rounded-full border-2 border-cyan-100 bg-cyan-50/30">
              <Star className="w-5 h-5 text-[#00D1C1] fill-current" />
              <span className="text-[10px] md:text-xs font-black tracking-[0.4em] uppercase text-cyan-800">CASOS VERIFICADOS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="group relative bg-slate-50 p-10 lg:p-14 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,209,193,0.15)] transition-all duration-1000 flex flex-col justify-between"
              >
                <div className="absolute top-8 right-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Quote size={60} className="text-[#00D1C1]" />
                </div>
                
                <div className="relative z-10 space-y-10">
                  <div className="flex items-center gap-6">
                    <div className="relative flex-shrink-0">
                      <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#00D1C1] to-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <img src={t.image} alt={t.name} className="relative w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white shadow-md" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-xl md:text-2xl tracking-tight mb-1 uppercase">{t.name}</h4>
                      <p className="text-[9px] md:text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">{t.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 font-light italic leading-relaxed text-lg md:text-xl lg:text-2xl">
                    "{t.quote}"
                  </p>
                </div>

                <div className="relative z-10 mt-12 pt-8 border-t-2 border-slate-100 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="w-2.5 h-2.5 rounded-full bg-[#00D1C1] animate-pulse"></div>
                     <span className="text-[10px] md:text-xs font-black tracking-widest uppercase text-[#00D1C1]">{t.impact}</span>
                   </div>
                   <div className="flex gap-1.5">
                      {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-cyan-400 fill-current" />)}
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id={Section.CONTACTO} className="bg-slate-950 text-white pt-32 pb-12 rounded-t-[4rem] lg:rounded-t-[6rem] mt-24 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(0,209,193,0.05),_transparent_40%)]"></div>
        <div className="max-w-[1500px] mx-auto px-8 md:px-12 grid lg:grid-cols-2 gap-20 lg:gap-40 relative z-10">
          <div className="space-y-12">
            <div className="transform origin-left scale-125 md:scale-150 transition-transform duration-700 py-6">
               <Logo light className="h-24 md:h-40" />
            </div>
            <p className="text-slate-400 max-w-lg text-xl md:text-2xl font-light leading-relaxed">
              Si cambias tu percepción, cambias tu realidad. Agenda tu sesión y comienza el cambio consciente hacia tu plenitud hoy mismo.
            </p>
            <div className="flex gap-8">
               <a href="#" className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-[#00D1C1] hover:text-white transition-all text-slate-500 hover:scale-110"><Instagram size={24} /></a>
               <a href="#" className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-cyan-600 hover:text-white transition-all text-slate-500 hover:scale-110"><Linkedin size={24} /></a>
            </div>
          </div>

          <div className="relative group bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-10 lg:p-20 rounded-[4rem] hover:border-[#00D1C1]/50 hover:shadow-[0_0_120px_-30px_rgba(0,209,193,0.4)] transition-all duration-700">
            <div className="relative z-10 space-y-12">
              <div className="flex items-center gap-8">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-[#00D1C1] to-cyan-700 flex items-center justify-center shadow-2xl flex-shrink-0"><Zap size={36} className="text-white" /></div>
                <div>
                  <h4 className="text-3xl md:text-4xl font-heading font-black text-white tracking-tight mb-2 uppercase">Canal Privado</h4>
                  <p className="text-cyan-400 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">ACOMPAÑAMIENTO DIRECTO</p>
                </div>
              </div>
              <div className="space-y-6 text-xl md:text-2xl text-slate-300 font-light">
                <a href="mailto:asesoria@pepeperez.mx" className="block hover:text-[#00D1C1] transition-colors">asesoria@pepeperez.mx</a>
                <div className="block hover:text-[#00D1C1] transition-colors">+52 333 115 5895</div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02, y: -5 }} 
                whileTap={{ scale: 0.98 }} 
                onClick={() => window.open('https://wa.me/523331155895', '_blank')} 
                className="mt-12 w-full rounded-2xl bg-[#00D1C1] text-white font-black py-6 lg:py-8 uppercase tracking-[0.4em] text-xs md:text-sm shadow-[0_15px_45px_rgba(0,209,193,0.4)] hover:shadow-[0_25px_80px_rgba(0,209,193,0.8)] transition-all"
              >
                INICIAR PROTOCOLO
              </motion.button>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1500px] mx-auto px-8 md:px-12 mt-24 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between text-[10px] md:text-[11px] text-slate-600 uppercase tracking-[0.4em] font-black gap-8">
          <p>© 2025 PEPE PÉREZ. TODOS LOS DERECHOS RESERVADOS.</p>
          <div className="flex gap-10">
            <p className="hover:text-white transition-colors cursor-pointer">BIONEUROEMOCIÓN® CERTIFIED</p>
            <p className="hover:text-white transition-colors cursor-pointer">POLÍTICA DE PRIVACIDAD</p>
          </div>
        </div>
      </footer>

      {/* MOBILE NAV OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[120] bg-white flex flex-col p-10 lg:hidden"
          >
            <div className="flex justify-between items-center mb-16">
               <Logo className="h-16 md:h-24" />
               <button onClick={() => setMobileMenuOpen(false)} className="p-4 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-10">
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
                  className="text-4xl font-heading font-black text-slate-900 text-left tracking-tighter uppercase leading-none"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
            <div className="mt-auto pt-16">
               <button 
                  onClick={() => window.open('https://wa.me/523331155895', '_blank')}
                  className="w-full bg-slate-900 text-white py-6 md:py-8 rounded-3xl font-black uppercase tracking-[0.3em] text-sm shadow-2xl"
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
