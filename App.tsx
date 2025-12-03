/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { Menu, X, Brain, Ear, Sparkles, MessageCircle, Activity, Dna, ScanLine, Atom, ArrowRight, Quote, Instagram, Linkedin, ArrowUp, Fingerprint } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import AIChat from './components/AIChat';
import CustomCursor from './components/CustomCursor';
import { Section, MethodologyStep } from './types';

// Methodology Data
const METHODOLOGY: MethodologyStep[] = [
  { 
    id: '1', 
    title: 'Escucha Consciente', 
    subtitle: 'El Espacio Seguro',
    iconName: 'Ear',
    description: 'Un entorno libre de juicios donde puedes expresar lo que sientes. Identificamos los patrones de pensamiento y creencias que limitan tu bienestar.'
  },
  { 
    id: '2', 
    title: 'Comprensión Profunda', 
    subtitle: 'Resonancia Emocional',
    iconName: 'Brain',
    description: 'Descubrimos para qué estás viviendo esta situación. Todo conflicto externo es un reflejo de un estado interno que pide ser atendido.'
  },
  { 
    id: '3', 
    title: 'Transformación', 
    subtitle: 'Coherencia Interior',
    iconName: 'Sparkles',
    description: 'Al cambiar tu percepción del evento, cambia tu experiencia de vida. Pasas de la reacción automática a la respuesta consciente y la paz.'
  },
];

// Testimonials Data
const TESTIMONIALS = [
  {
    id: 1,
    name: "J.P. Rojo",
    role: "Empresario",
    image: "https://i.ibb.co/7JBhKpFx/Whats-App-Image-2025-11-19-at-15-29-30.jpg",
    quote: "Pepe me mostró el ángulo preciso para ver lo que me inquietaba desde otra perspectiva. Transformé ese conflicto en nuevas herramientas y visiones para mejorar mi vida. Poco a poco, expando esta nueva visión."
  },
  {
    id: 2,
    name: "Roberto Almazán",
    role: "Arquitecto",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    quote: "Escéptico al principio, pero la claridad mental que obtuve fue inmediata. Entender mis proyecciones me devolvió la tranquilidad en mi entorno laboral."
  },
  {
    id: 3,
    name: "Sofia K.",
    role: "Artista Visual",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
    quote: "Más que una consulta, es un despertar. Dejé de sentirme víctima de las circunstancias para convertirme en responsable de mi experiencia emocional."
  }
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Mobile Menu Parallax
  const menuMouseX = useMotionValue(0);
  const menuMouseY = useMotionValue(0);
  
  // Scroll Progress Bar Logic
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Parallax effects
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroImageScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  
  // Decoder State
  const [symptom, setSymptom] = useState('');
  const [decoderResult, setDecoderResult] = useState<{
    title: string;
    core: string;
    hook: string;
    whatsappUrl: string;
  } | null>(null);
  const [isDecoding, setIsDecoding] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalized coordinates -1 to 1
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    menuMouseX.set(x);
    menuMouseY.set(y);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    
    // Increased timeout to 50ms to ensure menu close animation allows proper reflow on mobile devices
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        // Use getBoundingClientRect for absolute precision relative to current view
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - 100; // 100px offset for sticky header

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  const handleDecode = () => {
    if (!symptom.trim()) return;
    setIsDecoding(true);
    
    const lowerInput = symptom.toLowerCase();
    
    // Default Neuromarketing Response (Emotional Accompaniment)
    let title = "Incoherencia Emocional";
    let core = "Lo que vives afuera es un reflejo de tu estado interior. Estás experimentando una desconexión entre lo que sientes, lo que piensas y lo que haces. Esta disonancia es lo que te quita la paz.";
    let hook = "Tu paz comienza cuando dejas de luchar contra la realidad. Vamos a encontrar el origen de esta incoherencia.";
    let waConflict = "Gestión Emocional";

    // Logic Refactored for Situations/Emotions
    if (lowerInput.match(/ansiedad|estres|estrés|miedo|pánico|futuro|preocupaci|nervio/)) {
      title = "Exceso de Futuro";
      core = "La ansiedad no es más que la mente intentando controlar lo incontrolable. Indica una desconexión con el presente y una desconfianza profunda en tus propios recursos para afrontar lo que venga. Estás viviendo escenarios que aún no existen.";
      hook = "El control es una ilusión que agota tu energía. En sesión, aprenderemos a soltar la necesidad de certeza para recuperar tu calma.";
      waConflict = "Gestión de Ansiedad";
    } else if (lowerInput.match(/pareja|amor|relacion|novi|espos|soledad|celos|infidelidad|separaci/)) {
      title = "Espejo Relacional";
      core = "Tu pareja (o la falta de ella) es tu espejo más fiel. Lo que te molesta, duele o juzgas del otro, es una parte de ti mismo que no has integrado. El conflicto no está en la relación, sino en la expectativa que has proyectado sobre ella.";
      hook = "Deja de esperar que el otro cambie para que tú seas feliz. Recupera tu poder personal transformando tu percepción del vínculo.";
      waConflict = "Conflicto de Pareja";
    } else if (lowerInput.match(/trabajo|dinero|jefe|éxito|fracaso|profesi|abundancia|econom/)) {
      title = "Valor Personal";
      core = "Tu realidad profesional y económica es una proyección directa de tu autoconcepto. Si sientes estancamiento o injusticia afuera, es probable que internamente no te estés dando el valor o el reconocimiento que mereces. El dinero es energía de intercambio.";
      hook = "No trabajes más duro, trabaja en tu merecimiento. Redefinamos tu relación contigo mismo para que tu entorno profesional responda.";
      waConflict = "Bloqueo Profesional/Económico";
    } else if (lowerInput.match(/familia|madre|padre|herman|hijo|hogar|casa/)) {
      title = "Lealtades Invisibles";
      core = "A menudo repetimos patrones o cargamos emociones que no nos pertenecen por amor ciego al clan familiar. El conflicto presente puede ser una lealtad a una historia no resuelta de tus padres o ancestros.";
      hook = "Honrar a tu familia no significa repetir sus historias. Puedes amarles y, al mismo tiempo, permitirte un destino diferente y libre.";
      waConflict = "Conflicto Familiar";
    } else if (lowerInput.match(/tristeza|depresi|apah|duelo|llanto|pena|melancol/)) {
      title = "El Llamado Interior";
      core = "La tristeza no es un error, es una función necesaria. Te obliga a detenerte, a ir hacia adentro y a soltar lo que ya no sirve. Es el dolor por una percepción de pérdida o de vacío que pide ser llenado con presencia propia.";
      hook = "No huyas de la tristeza, escúchala. Ella tiene la llave de tu próxima etapa de crecimiento si te permites transitarla acompañado.";
      waConflict = "Proceso de Duelo/Tristeza";
    } else if (lowerInput.match(/culpa|remordimiento|vergüenza|juicio|error/)) {
      title = "El Juez Interno";
      core = "La culpa es ira dirigida hacia uno mismo. Vives bajo la tiranía de un 'debería' que no estás cumpliendo. Este juicio constante te impide tomar responsabilidad y te mantiene en un ciclo de castigo inconsciente.";
      hook = "El perdón no es un acto moral, es un acto de liberación. Cambiemos el juicio por comprensión para que puedas avanzar ligero.";
      waConflict = "Liberación de Culpa";
    } else if (lowerInput.match(/rabia|ira|enojo|furia|rencor|odio/)) {
      title = "Límites No Puestos";
      core = "La rabia es la emoción que surge para defender tu integridad. Si la sientes constantemente, es porque no has sabido poner límites claros o expresar tus necesidades a tiempo. Te has traicionado a ti mismo por complacer o evitar conflictos.";
      hook = "La paz no es ausencia de conflicto, es fidelidad a uno mismo. Aprendamos a usar esa energía para construir límites sanos, no muros.";
      waConflict = "Gestión de la Ira";
    }

    const waMessage = encodeURIComponent(`Hola Pepe, utilicé el Espejo Emocional y mi tema es *${symptom.toUpperCase()}*. Me resonó el concepto de *${waConflict.toUpperCase()}*. Me gustaría solicitar acompañamiento para profundizar en esto. ¿Tienes disponibilidad?`);
    const whatsappUrl = `https://wa.me/523331155895?text=${waMessage}`;

    setTimeout(() => {
      setIsDecoding(false);
      setDecoderResult({
        title,
        core,
        hook,
        whatsappUrl
      });
    }, 1800);
  };

  const renderIcon = (name: string) => {
    switch(name) {
      case 'Ear': return <Ear className="w-10 h-10 text-emerald-500" />;
      case 'Brain': return <Brain className="w-10 h-10 text-emerald-500" />;
      case 'Sparkles': return <Sparkles className="w-10 h-10 text-emerald-500" />;
      default: return <Activity className="w-10 h-10 text-emerald-500" />;
    }
  };

  const WHATSAPP_MESSAGE = encodeURIComponent("Hola Pepe, me gustaría agendar una sesión de Acompañamiento Emocional. Mi preferencia de fecha y hora es: ");

  return (
    <div className="relative min-h-screen text-slate-900 selection:bg-emerald-500/30 selection:text-emerald-900 overflow-x-hidden font-sans">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* WHATSAPP FAB - Floating Pulse */}
      <a 
        href="https://wa.me/523331155895" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-6 md:right-8 z-[70] bg-[#25D366] text-white p-4 rounded-full glow-emerald hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      >
        <div className="absolute inset-0 rounded-full border border-[#25D366] animate-ping opacity-50"></div>
        <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
        <MessageCircle className="w-7 h-7 fill-current relative z-10" />
      </a>

      {/* SCROLL TO TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 left-6 md:left-8 z-[70] bg-white/10 backdrop-blur-md border border-emerald-500/30 text-emerald-600 p-4 rounded-full glow-emerald hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] group"
          >
            <ArrowUp className="w-6 h-6 group-hover:animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* DYNAMIC SCROLL HEADER */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-3xl border-b border-emerald-900/5 h-20 shadow-[0_4px_30px_-5px_rgba(0,0,0,0.03)]' 
            : 'bg-transparent border-b border-transparent h-28'
        }`}
      >
        {/* Scroll Progress Bar */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 origin-left z-50"
          style={{ scaleX }}
        />

        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
          {/* ULTRA LOGO - High Ticket Refinement */}
          <div className="flex items-center gap-6 group cursor-pointer z-50" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className={`relative flex items-center justify-center transition-all duration-500 ${isScrolled ? 'w-10 h-10' : 'w-12 h-12'}`}>
               <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-600 animate-[spin_12s_linear_infinite] opacity-80">
                 <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
                 <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center">
                 <Atom className={`text-slate-900 group-hover:text-emerald-600 transition-colors duration-500 ${isScrolled ? 'w-5 h-5' : 'w-6 h-6'}`} />
               </div>
               <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981] animate-pulse border-2 border-white"></div>
            </div>
            
            {/* Typography Lockup - Monolith & Signature */}
            <div className="flex items-center gap-1 relative pl-2 border-l border-emerald-500/20">
              {/* PEPE - The Structural Monolith */}
              <span className={`font-heading font-black leading-none tracking-[-0.05em] uppercase transition-all duration-500 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-700 drop-shadow-sm ${isScrolled ? 'text-2xl' : 'text-3xl'}`}>
                PEPE
              </span>
              
              {/* Pérez - The Fluid Signature */}
              <span className={`font-serif-display italic font-light text-emerald-600 transition-all duration-500 relative z-10 ${isScrolled ? 'text-xl' : 'text-3xl'} -ml-1`}>
                Pérez
                {/* Bio-Spark Accent */}
                <span className="absolute -top-1 -right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-12 text-sm font-bold tracking-wide text-slate-900 uppercase">
            {[
              { label: 'Sobre Mí', id: Section.SOBRE_MI },
              { label: 'Metodología', id: Section.METODOLOGIA },
              { label: 'Espejo Emocional', id: Section.DECODIFICADOR },
            ].map((item) => (
              <button 
                key={item.label} 
                onClick={() => scrollToSection(item.id)}
                className="relative hover:text-emerald-700 transition-colors py-2 group overflow-hidden"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-500 transform -translate-x-1/2 group-hover:w-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => scrollToSection(Section.CONTACTO)}
            className={`hidden md:inline-flex items-center gap-2 bg-slate-900 text-white rounded-full font-black tracking-widest hover:bg-emerald-700 transition-all glow-emerald hover:-translate-y-1 hover:shadow-[0_10px_20px_-5px_rgba(16,185,129,0.4)] ${isScrolled ? 'px-6 py-2.5 text-[0.65rem]' : 'px-8 py-3 text-xs'}`}
          >
            AGENDAR
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-slate-900 z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay with Parallax */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ type: "spring", damping: 25, stiffness: 100 }}
            className="fixed inset-0 z-[90] bg-slate-50/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 md:hidden overflow-hidden"
            onMouseMove={handleMenuMouseMove}
          >
            {/* Parallax Background Layers */}
            <motion.div 
              className="absolute top-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"
              style={{
                x: useTransform(menuMouseX, (val) => val * -20),
                y: useTransform(menuMouseY, (val) => val * -20),
              }}
            />
             <motion.div 
              className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-teal-400/20 rounded-full blur-[80px] pointer-events-none mix-blend-multiply"
              style={{
                x: useTransform(menuMouseX, (val) => val * -30),
                y: useTransform(menuMouseY, (val) => val * -30),
              }}
            />
            
            {/* Content with subtle opposite parallax for depth */}
            <motion.div
              className="flex flex-col items-center gap-8 relative z-10"
              style={{
                x: useTransform(menuMouseX, (val) => val * 10),
                y: useTransform(menuMouseY, (val) => val * 10),
              }}
            >
              {[
                { label: 'Sobre Mí', id: Section.SOBRE_MI },
                { label: 'Metodología', id: Section.METODOLOGIA },
                { label: 'Espejo Emocional', id: Section.DECODIFICADOR },
                { label: 'Contacto', id: Section.CONTACTO },
              ].map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-5xl font-heading font-bold text-slate-900 hover:text-emerald-600 transition-colors tracking-tighter"
                  whileHover={{ scale: 1.05, x: 10 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION - TYPOGRAPHY MASTERPIECE */}
      <header id={Section.HERO} className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden scroll-mt-32">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-emerald-300/10 blur-[150px] rounded-full mix-blend-multiply animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-slate-300/20 blur-[150px] rounded-full mix-blend-multiply"></div>

        <div className="max-w-[1400px] mx-auto w-full px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Text Content */}
          <motion.div 
            style={{ y: heroTextY }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="order-2 lg:order-1 flex flex-col items-start"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-700 font-mono text-xs uppercase tracking-[0.2em] font-bold">Acompañamiento Emocional</span>
            </div>
            
            <h1 className="flex flex-col text-slate-900 leading-[0.8] mb-12 select-none relative z-20 max-w-full break-words">
              <span className="font-heading font-black text-[15vw] lg:text-[8.5rem] tracking-tighter uppercase text-slate-900 mix-blend-darken relative">
                TRANS
                <span className="absolute -z-10 text-stroke-light text-slate-200 left-1 top-1 blur-[1px]">TRANS</span>
              </span>
              <span className="font-heading font-black text-[15vw] lg:text-[8.5rem] tracking-tighter uppercase text-transparent text-stroke-heavy hover:text-slate-900 transition-colors duration-700 -mt-2 lg:-mt-6">
                FORMAR
              </span>
              <span className="font-serif-display italic font-light text-[3.5rem] lg:text-[5.5rem] text-emerald-600 -mt-2 lg:-mt-8 ml-2 opacity-90 leading-tight">
                tu percepción
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl font-light text-slate-600 max-w-lg leading-relaxed mb-14 pl-6 border-l-4 border-emerald-500/30">
              Tu paz comienza cuando cambia tu forma de ver el mundo. Acompañamiento profesional en Bioneuroemoción® para gestionar conflictos y recuperar tu bienestar.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <button 
                onClick={() => window.open(`https://wa.me/523331155895?text=${WHATSAPP_MESSAGE}`, '_blank')}
                className="bg-slate-900 text-white px-12 py-6 rounded-full text-sm font-black tracking-widest uppercase hover:bg-emerald-900 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_60px_-12px_rgba(6,78,59,0.6)]"
              >
                <span className="relative z-10 flex items-center gap-2">Solicitar Acompañamiento <ArrowRight className="w-4 h-4" /></span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-800 to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
              <button 
                onClick={() => scrollToSection(Section.DECODIFICADOR)}
                className="group relative px-12 py-6 rounded-full bg-white border border-slate-200 text-slate-900 text-sm font-black tracking-widest uppercase hover:border-emerald-500 transition-all overflow-hidden hover:shadow-lg"
              >
                <span className="relative z-10 group-hover:text-emerald-700 transition-colors">Espejo Emocional</span>
              </button>
            </div>
          </motion.div>

          {/* Image Content - Creative Mask */}
          <motion.div 
            style={{ scale: heroImageScale }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="order-1 lg:order-2 relative h-[60vh] lg:h-[85vh] w-full flex justify-end group"
          >
            {/* Abstract Elements behind image */}
            <div className="absolute top-10 right-10 w-[95%] h-[95%] border border-emerald-900/5 rounded-[0_100px_0_100px] z-0 transition-transform duration-700 group-hover:translate-x-4 group-hover:-translate-y-4"></div>
            
            <div className="relative h-full w-[90%] rounded-[0_120px_0_120px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] z-10 bg-slate-200">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/30 mix-blend-multiply z-10 pointer-events-none"></div>
              <img 
                src="https://i.ibb.co/8yTTcFQ/Whats-App-Image-2025-12-01-at-16-26-55.jpg" 
                alt="Pepe Pérez" 
                className="h-full w-full object-cover object-top hover:scale-105 transition-transform duration-[1.5s]" 
              />
              
              {/* Floating Badge */}
              <div className="absolute bottom-12 left-0 bg-white/80 backdrop-blur-xl pl-8 pr-10 py-6 rounded-r-2xl border-y border-r border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.05)] z-20">
                <div className="flex items-center gap-3 mb-1">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800">Agenda Abierta</span>
                </div>
                <p className="font-heading font-bold text-xl text-slate-900 leading-none">Sesiones Disponibles</p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ABOUT SECTION - Clean & Editorial */}
      <motion.section 
        id={Section.SOBRE_MI} 
        className="py-32 md:py-48 bg-white relative overflow-hidden scroll-mt-32"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-slate-50 to-transparent -z-0"></div>
        
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-12 gap-16 items-center relative z-10">
          <div className="md:col-span-5 relative group">
             {/* Decorative Frame */}
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-slate-100 rounded-none z-0 group-hover:border-emerald-200 transition-colors duration-500"></div>
            
            <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden shadow-2xl z-10">
               <img 
                src="https://i.ibb.co/vxjh2yXt/Whats-App-Image-2025-12-01-at-16-26-56.jpg" 
                alt="Consulta" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-emerald-900/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
          
          <div className="md:col-span-7">
            <h2 className="text-6xl md:text-8xl font-heading font-bold text-slate-900 mb-8 leading-[0.9] tracking-tighter break-words">
              Consultor en <br/>
              <span className="font-serif-display italic text-emerald-700 font-normal text-5xl md:text-7xl">Bioneuroemoción®</span>
            </h2>
            
            <div className="space-y-8 text-xl text-slate-700 font-light leading-8">
              <p>
                <span className="text-7xl float-left mr-4 mt-[-15px] font-heading font-black text-emerald-800 opacity-20">M</span>
                i nombre es <strong className="text-slate-900 font-bold">Pepe Pérez</strong>. Mi labor es acompañarte a explorar tu universo emocional para que tomes conciencia de "para qué" estás viviendo tus conflictos actuales.
              </p>
              <p>
                Certificado por el <strong className="text-slate-900 border-b-2 border-emerald-300 hover:bg-emerald-50 transition-colors">Enric Corbera Institute</strong>, facilito un proceso de autoindagación que te permite cambiar la percepción de lo que vives, pasando del estrés a la coherencia emocional.
              </p>
              
              <div className="pt-12">
                 <div className="flex items-center gap-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
                    <Dna className="w-8 h-8 text-emerald-500 animate-pulse" />
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
                 </div>
                 <p className="text-center font-serif-display italic text-3xl text-slate-900 mt-8">
                  "Todo lo que nos irrita de los demás nos puede llevar a un entendimiento de nosotros mismos."
                 </p>
                 <p className="text-center text-xs font-black tracking-[0.2em] uppercase text-emerald-600 mt-4">— Carl G. Jung</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* DECODER SECTION - Ultra Future UI */}
      <section id={Section.DECODIFICADOR} className="relative py-32 md:py-48 bg-slate-950 text-white overflow-hidden min-h-[90vh] flex items-center justify-center scroll-mt-32" data-hover="true">
        {/* Animated Background Layers - Precision Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.05),_transparent_70%)] animate-pulse" style={{ animationDuration: '8s' }}></div>
        
        {/* 3D Perspective Grid Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-[linear-gradient(to_bottom,transparent_0%,rgba(16,185,129,0.05)_100%)] transform perspective-[1000px] rotate-x-[60deg] origin-bottom pointer-events-none">
          <div className="absolute inset-0 bg-[size:4rem_4rem] bg-[linear-gradient(to_right,rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.05)_1px,transparent_1px)]" style={{ backgroundPosition: 'center' }}></div>
        </div>

        {/* Ambient Glow Orbs */}
        <div className="absolute top-[-20%] left-[30%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] bg-teal-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-20 w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="text-center mb-16"
          >
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="inline-flex items-center gap-3 py-2 px-5 rounded-full border border-emerald-500/30 bg-emerald-950/50 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              <ScanLine className="w-4 h-4 text-emerald-400 animate-spin-slow" />
              <span className="text-emerald-400 text-xs font-bold tracking-[0.2em] uppercase">Herramienta Interactiva</span>
            </motion.div>
            
            <motion.h2 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="text-6xl md:text-8xl font-heading font-black mb-6 text-white tracking-tighter cursor-default relative inline-block break-words max-w-full"
              whileHover={{
                textShadow: [
                  "0 0 10px rgba(16, 185, 129, 0.2)",
                  "0 0 40px rgba(16, 185, 129, 0.6)",
                  "0 0 10px rgba(16, 185, 129, 0.2)"
                ],
                transition: { duration: 1.5, repeat: Infinity }
              }}
            >
              ESPEJO <span className="text-stroke-light font-serif-display italic font-light text-emerald-300 block md:inline">Emocional</span>
            </motion.h2>
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-slate-400 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed"
            >
              ¿QUÉ SITUACIÓN O EMOCIÓN TE QUITA LA PAZ HOY?
            </motion.p>
          </motion.div>

          {/* HUD Interface & Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mx-auto max-w-4xl"
          >
            {/* Holographic HUD Corner Brackets */}
            <div className="absolute -top-6 -left-6 w-16 h-16 border-l-4 border-t-4 border-emerald-500/40 rounded-tl-sm opacity-80"></div>
            <div className="absolute -top-6 -right-6 w-16 h-16 border-r-4 border-t-4 border-emerald-500/40 rounded-tr-sm opacity-80"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 border-l-4 border-b-4 border-emerald-500/40 rounded-bl-sm opacity-80"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 border-r-4 border-b-4 border-emerald-500/40 rounded-br-sm opacity-80"></div>
            
            <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-16 shadow-[0_0_80px_-20px_rgba(16,185,129,0.2)] hover:border-emerald-500/50 hover:shadow-[0_0_60px_-15px_rgba(16,185,129,0.2)] relative overflow-hidden group transition-all duration-500">
              
              {/* Continuous Scanner Beam */}
              <motion.div 
                 className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none z-0"
                 animate={{ top: ['-30%', '130%'] }}
                 transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />

              <AnimatePresence mode="wait">
                {!decoderResult ? (
                  <motion.div 
                    key="input-mode"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 max-w-2xl mx-auto"
                  >
                    <div className="mb-14 text-center">
                      <div className="flex justify-center mb-10">
                         <div className="px-4 py-1 border border-emerald-900/50 bg-emerald-950/30 text-emerald-600 font-mono text-[10px] tracking-[0.3em] uppercase">
                            Input Required
                         </div>
                      </div>
                      
                      <div className="relative group">
                        {/* High-Tech Input */}
                        <input 
                          type="text" 
                          value={symptom}
                          onChange={(e) => setSymptom(e.target.value)}
                          placeholder="CONFLICTOS DE PAREJA, ANSIEDAD, TRABAJO..."
                          className="w-full bg-transparent border-b-2 border-slate-800 p-6 text-3xl md:text-5xl text-center text-white placeholder-slate-700 focus:outline-none focus:border-emerald-400 transition-all duration-300 font-heading font-black uppercase tracking-tight relative z-10 caret-emerald-500"
                        />
                        {/* Glowing Underline Glow */}
                        <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-emerald-400 shadow-[0_0_30px_#34d399] transition-all duration-500 group-focus-within:w-full group-focus-within:left-0 transform"></div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={handleDecode}
                      disabled={isDecoding || !symptom}
                      className={`w-full py-8 rounded-xl font-black text-lg uppercase tracking-[0.2em] transition-all relative overflow-hidden group/btn border border-emerald-500/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] ${
                        isDecoding ? 'bg-slate-900 text-emerald-500/50 cursor-wait' : 'bg-emerald-900/20 text-white hover:bg-emerald-600 hover:border-emerald-400 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]'
                      }`}
                    >
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                      <span className="relative z-10 flex items-center justify-center gap-4">
                        {isDecoding ? (
                           <span className="flex items-center gap-3 font-mono text-sm">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-sm animate-ping"></span>
                              [ REFLEXIONANDO ]
                           </span>
                        ) : (
                           <>
                             <ScanLine className="w-6 h-6" />
                             ANALIZAR SENTIDO
                           </>
                        )}
                      </span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="result-mode"
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    className="relative z-10 text-center"
                  >
                    {/* Holographic Header */}
                    <div className="flex flex-col items-center justify-center mb-10">
                      <div className="w-24 h-24 relative mb-6">
                         <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping blur-xl"></div>
                         <div className="relative w-full h-full bg-slate-900 rounded-full flex items-center justify-center border-2 border-emerald-400/50 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                            <Brain className="w-10 h-10 text-emerald-400" />
                         </div>
                      </div>
                      
                      <div className="inline-block px-6 py-2 rounded-sm border-x border-emerald-500/30 bg-emerald-900/20 backdrop-blur-md">
                         <h3 className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">
                           Reflexión Generada
                         </h3>
                      </div>
                    </div>
                    
                    {/* Data Display Card - Tech Slate Style */}
                    <div className="mb-12 p-10 border border-slate-700 bg-slate-900/40 backdrop-blur-2xl rounded-2xl text-left relative overflow-hidden shadow-[0_0_50px_-10px_rgba(16,185,129,0.15)] hover:border-emerald-400/40 transition-colors">
                       {/* Tech Decorations */}
                       <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                         <Activity className="w-40 h-40 text-emerald-500" />
                       </div>
                       
                       <div className="flex justify-between items-start mb-6">
                          <h4 className="text-3xl md:text-5xl text-white font-heading font-black tracking-tight drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                            {decoderResult.title}
                          </h4>
                          {/* Fake Graph Bars */}
                          <div className="hidden md:flex gap-1 items-end h-10">
                             <div className="w-1 bg-emerald-500/30 h-[40%]"></div>
                             <div className="w-1 bg-emerald-500/50 h-[70%]"></div>
                             <div className="w-1 bg-emerald-500 h-[100%]"></div>
                             <div className="w-1 bg-emerald-500/50 h-[60%]"></div>
                          </div>
                       </div>
                       
                       <div className="grid md:grid-cols-[1fr_auto] gap-8">
                         <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed relative z-10 border-l-2 border-emerald-500 pl-6">
                          {decoderResult.core}
                         </p>
                       </div>
                       
                       <div className="mt-8 bg-emerald-950/30 p-6 rounded-lg border-l-4 border-emerald-400 relative overflow-hidden">
                         <div className="absolute inset-0 bg-emerald-400/5 animate-pulse"></div>
                         <p className="text-emerald-300 text-xl md:text-2xl font-serif-display italic mb-0 relative z-10">
                           "{decoderResult.hook}"
                         </p>
                       </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                       <button 
                        onClick={() => window.open(decoderResult.whatsappUrl, '_blank')}
                        className="w-full md:w-auto bg-[#25D366] text-white px-10 py-5 rounded-sm font-black uppercase tracking-widest hover:bg-emerald-500 transition-all glow-emerald hover:scale-105 hover:shadow-[0_0_50px_rgba(37,211,102,0.4)] flex items-center justify-center gap-3 group relative overflow-hidden clip-path-slant"
                      >
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                        <MessageCircle className="w-5 h-5 fill-current" />
                        <span>SOLICITAR ACOMPAÑAMIENTO</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button 
                        onClick={() => { setDecoderResult(null); setSymptom(''); }}
                        className="px-10 py-4 text-slate-500 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest border-b border-transparent hover:border-emerald-500"
                      >
                        [ NUEVA CONSULTA ]
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* METHODOLOGY SECTION */}
      <motion.section 
        id={Section.METODOLOGIA} 
        className="py-32 md:py-48 max-w-[1400px] mx-auto px-6 bg-slate-50 scroll-mt-32"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-slate-200 pb-12">
          <div>
            <span className="text-emerald-600 font-mono text-xs uppercase tracking-[0.3em] font-bold">El Proceso</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black mt-4 text-slate-900 tracking-tighter break-words">
              Metodo<span className="text-stroke-heavy text-slate-900 hover:text-emerald-900 transition-colors">logía</span>
            </h2>
          </div>
          <p className="max-w-md text-slate-600 text-right mt-8 md:mt-0 font-normal text-lg">
            Un camino estructurado hacia tu libertad emocional, basado en la toma de conciencia y la gestión de la percepción.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {METHODOLOGY.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -15 }}
              data-hover="true"
              className="bg-white/80 backdrop-blur-2xl p-12 rounded-[2.5rem] border border-white/40 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-12px_rgba(6,182,212,0.15)] hover:border-cyan-500/30 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 font-heading text-9xl font-black text-slate-900 group-hover:text-emerald-500 transition-colors">
                 0{index + 1}
              </div>

              <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-12 group-hover:bg-emerald-600 transition-colors duration-500 group-hover:shadow-[0_10px_30px_rgba(16,185,129,0.3)] border border-slate-100">
                <div className="group-hover:text-white transition-colors duration-500 group-hover:scale-110 transform">
                   {renderIcon(step.iconName)}
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-heading font-black mb-3 text-slate-900 tracking-tight">{step.title}</h3>
              <p className="text-emerald-600 font-serif-display italic text-lg mb-8">{step.subtitle}</p>
              
              <p className="text-base md:text-lg text-slate-600 font-light leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* TESTIMONIALS SECTION */}
      <motion.section 
        id={Section.TESTIMONIOS}
        className="py-32 md:py-48 bg-white relative overflow-hidden scroll-mt-32"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-slate-50/50 -skew-y-2 transform origin-top-left scale-110 z-0"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <span className="text-emerald-600 font-mono text-xs uppercase tracking-[0.3em] font-bold">Historias Reales</span>
            <h2 className="text-5xl md:text-7xl font-heading font-black mt-4 text-slate-900 tracking-tighter">
              Transformación <span className="font-serif-display italic text-emerald-600 font-normal">Vivida</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white/60 backdrop-blur-xl p-10 rounded-3xl border border-white/50 hover:border-emerald-500/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_-12px_rgba(99,102,241,0.15)] transition-all duration-300 group flex flex-col hover:-translate-y-2"
              >
                <div className="mb-8 text-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                  <Quote size={40} className="fill-current" />
                </div>
                
                <p className="text-slate-800 text-2xl font-serif-display font-medium leading-relaxed italic mb-8 flex-grow">
                  "{t.quote}"
                </p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500/20 group-hover:border-emerald-500 transition-colors">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-base tracking-wide leading-none mb-1">{t.name}</h4>
                    <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FOOTER SECTION */}
      <motion.footer 
        id={Section.CONTACTO} 
        className="relative bg-slate-950 text-white rounded-t-[2.5rem] md:rounded-t-[4rem] overflow-hidden mt-12 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.3)] scroll-mt-32"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        {/* Header Image */}
        <div className="w-full relative z-0">
           <img 
            src="https://i.ibb.co/1Yn4S0dp/Iconic-photo-blue-202512021416.jpg" 
            alt="Iconic Vision" 
            className="w-full h-auto md:h-[600px] object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-20 relative z-10">
          <div>
            <div className="mb-12 relative group cursor-default">
              {/* ULTRA PREMIUM FOOTER LOGO - The Masterpiece */}
               <h3 className="font-heading text-[6rem] md:text-[9rem] font-black tracking-tighter text-transparent text-stroke-light leading-[0.8] select-none opacity-50 transition-all duration-500 group-hover:opacity-100 group-hover:text-stroke-emerald">
                 PEPE
               </h3>
               <span className="absolute top-[45%] left-12 md:left-24 font-serif-display italic text-5xl md:text-7xl text-emerald-500 font-light mix-blend-plus-lighter drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                 Pérez
               </span>
            </div>
            
            <p className="text-slate-300 max-w-md mb-12 text-2xl font-light leading-relaxed">
              Si cambias tu percepción, cambias tu realidad. Agenda tu sesión y comienza el cambio.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-white/10 border border-white/10 flex items-center justify-center group hover:bg-emerald-600 hover:border-emerald-500 transition-all duration-300 backdrop-blur-md">
                 <Instagram className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors" />
               </a>
               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-white/10 border border-white/10 flex items-center justify-center group hover:bg-[#0077b5] hover:border-[#0077b5] transition-all duration-300 backdrop-blur-md">
                 <Linkedin className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors" />
               </a>
            </div>
          </div>

          <div className="bg-slate-800/20 backdrop-blur-2xl p-12 rounded-[2.5rem] border border-white/10 hover:border-emerald-500/30 transition-colors shadow-[0_0_40px_-10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_60px_-10px_rgba(6,182,212,0.2)]">
            <h4 className="text-3xl font-serif-display italic mb-10 text-emerald-400">Contacto Directo</h4>
            <div className="space-y-8 text-slate-200 text-lg">
              <a href="mailto:asesoria@pepeperez.mx" className="flex items-center gap-6 hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-full bg-slate-900/80 flex items-center justify-center group-hover:bg-emerald-500 transition-colors border border-slate-700 group-hover:border-emerald-500">
                  <span className="text-emerald-500 group-hover:text-white font-bold">@</span>
                </div>
                <span className="font-heading tracking-wide">asesoria@pepeperez.mx</span>
              </a>
              <p className="flex items-center gap-6">
                 <div className="w-12 h-12 rounded-full bg-slate-900/80 flex items-center justify-center border border-slate-700">
                  <span className="text-emerald-500 font-bold">Ph</span>
                </div>
                <span className="font-heading tracking-wide">+52 333 115 5895</span>
              </p>
            </div>
            
            <motion.button 
              onClick={() => window.open('https://wa.me/523331155895', '_blank')}
              className="mt-12 w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black py-6 rounded-2xl transition-all shadow-[0_10px_30px_-5px_rgba(16,185,129,0.3)] uppercase tracking-widest text-sm hover:-translate-y-1 hover:shadow-[0_20px_40px_-5px_rgba(16,185,129,0.5)]"
              whileInView={{ 
                scale: [1, 1.02, 1],
                boxShadow: [
                  "0 10px 30px -5px rgba(16,185,129,0.3)",
                  "0 0 50px rgba(16,185,129,0.6)",
                  "0 10px 30px -5px rgba(16,185,129,0.3)"
                ]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Contactar por WhatsApp
            </motion.button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between text-xs text-slate-400 uppercase tracking-widest font-bold pb-12">
          <p>© 2025 Pepe Pérez.</p>
          <p>Bioneuroemoción® is a registered trademark.</p>
        </div>
      </motion.footer>
      
      {/* Arrow Right Icon for usage in buttons */}
      <div className="hidden">
         <ArrowRight />
      </div>
    </div>
  );
};

export default App;