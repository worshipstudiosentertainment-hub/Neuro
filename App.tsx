
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { Menu, X, Brain, Ear, Sparkles, MessageCircle, Activity, Dna, ScanLine, Atom, ArrowRight, Quote, Instagram, Linkedin } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import AIChat from './components/AIChat';
import CustomCursor from './components/CustomCursor';
import { Section, MethodologyStep } from './types';

// Methodology Data
const METHODOLOGY: MethodologyStep[] = [
  { 
    id: '1', 
    title: 'Escucha Consciente', 
    subtitle: 'El Origen',
    iconName: 'Ear',
    description: 'Un espacio seguro donde las palabras revelan lo que el cuerpo calla. Identificamos los patrones inconscientes que rigen tu realidad actual.'
  },
  { 
    id: '2', 
    title: 'Comprensión Profunda', 
    subtitle: 'El Sentido Biológico',
    iconName: 'Brain',
    description: 'Desciframos la lógica biológica detrás de tu síntoma o conflicto. Entender el "para qué" es el primer paso para desactivar el programa.'
  },
  { 
    id: '3', 
    title: 'Transformación', 
    subtitle: 'La Nueva Mirada',
    iconName: 'Sparkles',
    description: 'Reescribimos la percepción del evento traumático. Al cambiar tu mirada interior, tu biología y tu entorno responden con coherencia.'
  },
];

// Testimonials Data
const TESTIMONIALS = [
  {
    id: 1,
    name: "Mariana Velázquez",
    role: "CEO & Fundadora",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
    quote: "Llegué buscando alivio para una gastritis crónica y encontré la raíz de mi estrés laboral. La claridad que te da Pepe es quirúrgica."
  },
  {
    id: 2,
    name: "Roberto Almazán",
    role: "Arquitecto",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    quote: "Escéptico al principio, pero los resultados hablan. Entender la lógica biológica de mi cuerpo me devolvió la tranquilidad."
  },
  {
    id: 3,
    name: "Sofia K.",
    role: "Artista Visual",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
    quote: "Más que una terapia, es un despertar. Dejé de ser víctima de mis síntomas para convertirme en maestra de mi biología."
  }
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
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
  const [decoderResult, setDecoderResult] = useState<string | null>(null);
  const [isDecoding, setIsDecoding] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    
    // Small timeout to ensure menu close animation starts/layout stabilizes
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        // Use getBoundingClientRect for absolute precision relative to current view
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - 100;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 10);
  };

  const handleDecode = () => {
    if (!symptom.trim()) return;
    setIsDecoding(true);
    
    const lowerSymptom = symptom.toLowerCase();
    
    // Default analysis
    let analysis = "Tu biología está gestionando una carga emocional que la mente consciente ha ignorado. El síntoma es la respuesta de adaptación a un estrés vivido en soledad.";
    let hookQuestion = "¿Qué situación inesperada viviste recientemente que te dejó sin recursos para reaccionar?";

    // Advanced Regex Matching
    if (lowerSymptom.match(/cabeza|migraña|cefalea|cerebro|mente/)) {
      analysis = "Conflicto de desvalorización intelectual. Sucede cuando 'calentamos' la mente buscando una salida racional a un problema emocional, o cuando nos juzgamos duramente.";
      hookQuestion = "¿Estás controlando cada detalle para evitar un error, o te criticas despiadadamente por una decisión tomada?";
    } else if (lowerSymptom.match(/est[oó]mago|panza|digest|indigest|acidez|gastritis|reflujo|v[oó]mito/)) {
      analysis = "Conflicto de 'bocado indigesto'. Has tenido que aceptar ('tragar') una situación, palabra o acción que consideras inaceptable, tóxica o injusta.";
      hookQuestion = "¿Qué 'sapo' te has tenido que tragar recientemente en tu entorno familiar o laboral para evitar una guerra mayor?";
    } else if (lowerSymptom.match(/h[ií]gado|bilis|colesterol|grasa|hepat/)) {
      analysis = "Miedo profundo a la carencia. El hígado es el laboratorio del cuerpo; acumula reservas cuando el inconsciente percibe que 'faltará' alimento, dinero o fe.";
      hookQuestion = "¿Te preocupa obsesivamente la estabilidad económica de tu familia o sientes que te falta el sustento esencial?";
    } else if (lowerSymptom.match(/garganta|tos|laringe|faringe|tiroides|voz|ahogo|anginas/)) {
      analysis = "Conflicto de la 'presa atrapada'. Palabras que se quedaron en el umbral, gritos ahogados, o la imposibilidad de atrapar (o escupir) algo vital.";
      hookQuestion = "¿Qué es eso tan importante que no te atreviste a decir, o que dijiste y ahora te arrepientes profundamente?";
    } else if (lowerSymptom.match(/pulm[oó]n|respir|aire|asma|bronqui|neumo/)) {
      analysis = "Amenaza en el territorio o miedo arcaico a morir. Sentir que alguien nos asfixia, nos invade o nos quita el aire vital.";
      hookQuestion = "¿Quién está invadiendo tu espacio personal de forma que sientes que te falta el aire para ser tú mismo?";
    } else if (lowerSymptom.match(/ri[ñn][oó]n|orina|cistitis|l[ií]quido|renal|calculo/)) {
      analysis = "Conflicto de liquidez y referentes. Sentirse como 'pez fuera del agua', desmoronado, sin puntos de apoyo firmes, o miedo a perderlo todo.";
      hookQuestion = "¿Te has sentido solo ante el peligro, abandonado a tu suerte o has perdido tus puntos de referencia vitales?";
    } else if (lowerSymptom.match(/piel|dermis|eczem|alergia|urticaria|grano|acn[eé]|psoriasis|ronchas/)) {
      analysis = "Conflicto de separación o contacto impuesto. La piel duele donde nos falta una caricia deseada, o donde hemos recibido un contacto desagradable.";
      hookQuestion = "¿A quién extrañas tocar desesperadamente, o de quién te gustaría separarte pero convives a diario obligadamente?";
    } else if (lowerSymptom.match(/hueso|articul|rodilla|hombro|codo|artritis|osteoporo|reuma|cadera|columna/)) {
      analysis = "Desvalorización profunda del ser. 'No valgo', 'no soy capaz', 'no puedo soportar esta carga'. El hueso se afecta cuando perdemos valor ante nuestros propios ojos.";
      hookQuestion = "¿En qué pilar fundamental de tu vida sientes que te estás desmoronando o que no eres capaz de 'dar la talla'?";
    } else if (lowerSymptom.match(/músculo|fibro|calambre|tendi|contractura|pierna|brazo/)) {
      analysis = "Impotencia en la acción. La energía para luchar o huir se ha bloqueado. 'Quiero golpear y no puedo', 'quiero irme y debo quedarme'.";
      hookQuestion = "¿Hacia dónde te impulsa tu instinto biológico, pero tu mente racional te frena en seco?";
    } else if (lowerSymptom.match(/coraz[oó]n|taquicardia|presi[oó]n|hipertensi[oó]n|sangre|cardi/)) {
      analysis = "Desvalorización por amor o territorio. El corazón bombea la vida (sangre/familia). Conflictos de 'quiero que alguien vuelva a casa' o 'quiero defender mi territorio'.";
      hookQuestion = "¿Por quién te duele el corazón, o qué miembro de la familia te está exigiendo un esfuerzo sobrehumano para mantener la unión?";
    } else if (lowerSymptom.match(/ojo|vis|ver|mio|astigmat|lentes|ciego/)) {
      analysis = "Miedo en la nuca (peligro por detrás) o negación visual. 'No quiero ver lo que pasa en mi casa', o 'tengo miedo de perder de vista a alguien'.";
      hookQuestion = "¿Qué realidad dolorosa tienes delante de tus narices y prefieres ignorar para no sufrir?";
    } else if (lowerSymptom.match(/o[ií]do|sorder|zumbido|tinnitus|vertigo|v[eé]rtigo|escuchar/)) {
      analysis = "Conflicto de audición. 'No puedo creer lo que oigo'. Palabras tóxicas, críticas constantes, o un silencio sepulcral donde debería haber una voz.";
      hookQuestion = "¿Qué frase hiriente se repite en tu cabeza, o qué 'te quiero' estás esperando y nunca llega?";
    } else if (lowerSymptom.match(/diente|muela|boca|mand[ií]bula|enc[ií]a/)) {
      analysis = "Conflicto de agresividad contenida. No poder 'mostrar los dientes'. Dificultad para atrapar lo que es tuyo o defenderte de una agresión.";
      hookQuestion = "¿A quién tienes ganas de morder (defenderte) pero te obligas a sonreír por educación o sumisión?";
    } else if (lowerSymptom.match(/mujer|ovario|utero|menstru|regla|seno|mama|vagina|candid/)) {
      analysis = "Conflicto de identidad femenina, pérdida o nido. Problemas en la relación con la pareja, los hijos o la propia feminidad/sexualidad.";
      hookQuestion = "¿Sientes que tu rol de mujer o madre está en entredicho, o has vivido un conflicto de separación con un hijo o pareja?";
    } else if (lowerSymptom.match(/hombre|test[ií]culo|prostata|pr[óo]stata|pene|erecci[oó]n/)) {
      analysis = "Conflicto de identidad masculina, potencia o territorio. Miedo a no ser suficiente hombre para proteger el clan o satisfacer a la pareja.";
      hookQuestion = "¿En qué situación sientes que has perdido tu poder o que no eres respetado como la autoridad en tu territorio?";
    }

    setTimeout(() => {
      setIsDecoding(false);
      setDecoderResult(`${analysis}\n\n${hookQuestion}\n\nIMPORTANTE: Esta pista es solo el comienzo. Para desactivar el programa biológico, debemos viajar al momento exacto del trauma en una sesión personalizada.`);
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
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full glow-emerald hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      >
        <div className="absolute inset-0 rounded-full border border-[#25D366] animate-ping opacity-50"></div>
        <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
        <MessageCircle className="w-7 h-7 fill-current relative z-10" />
      </a>

      {/* DYNAMIC SCROLL HEADER */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
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
          {/* ULTRA LOGO */}
          <div className="flex items-center gap-4 group cursor-pointer z-50" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className={`relative flex items-center justify-center transition-all duration-500 ${isScrolled ? 'w-10 h-10' : 'w-14 h-14'}`}>
               <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-600 animate-[spin_12s_linear_infinite] opacity-80">
                 <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
                 <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center">
                 <Atom className={`text-slate-900 group-hover:text-emerald-600 transition-colors duration-500 ${isScrolled ? 'w-5 h-5' : 'w-7 h-7'}`} />
               </div>
               <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981] animate-pulse border-2 border-white"></div>
            </div>
            
            <div className="flex flex-col">
              <span className={`font-heading font-black leading-none text-slate-900 tracking-tighter uppercase transition-all duration-500 ${isScrolled ? 'text-lg' : 'text-2xl'}`}>
                José Alberto
              </span>
              <span className={`font-serif-display tracking-[0.2em] text-emerald-700 italic font-medium transition-all duration-500 ${isScrolled ? 'text-xs' : 'text-sm'}`}>
                Pérez Franco
              </span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-12 text-sm font-bold tracking-wide text-slate-600 uppercase">
            {[
              { label: 'Sobre Mí', id: Section.SOBRE_MI },
              { label: 'Metodología', id: Section.METODOLOGIA },
              { label: 'Decodificador', id: Section.DECODIFICADOR },
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ type: "spring", damping: 25, stiffness: 100 }}
            className="fixed inset-0 z-40 bg-slate-50/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {[
              { label: 'Sobre Mí', id: Section.SOBRE_MI },
              { label: 'Metodología', id: Section.METODOLOGIA },
              { label: 'Decodificador', id: Section.DECODIFICADOR },
              { label: 'Contacto', id: Section.CONTACTO },
            ].map((item, i) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className="text-5xl font-heading font-bold text-slate-800 hover:text-emerald-600 transition-colors tracking-tighter"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION - TYPOGRAPHY MASTERPIECE */}
      <header id={Section.HERO} className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
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
              <span className="text-emerald-700 font-mono text-xs uppercase tracking-[0.4em] font-bold">Conciencia Biológica</span>
            </div>
            
            <h1 className="flex flex-col text-slate-900 leading-[0.8] mb-12 select-none relative z-20">
              <span className="font-heading font-black text-[15vw] lg:text-[8.5rem] tracking-tighter uppercase text-slate-900 mix-blend-darken relative">
                TRANS
                <span className="absolute -z-10 text-stroke-light text-slate-200 left-1 top-1 blur-[1px]">TRANS</span>
              </span>
              <span className="font-heading font-black text-[15vw] lg:text-[8.5rem] tracking-tighter uppercase text-transparent text-stroke-heavy hover:text-slate-900 transition-colors duration-700 -mt-2 lg:-mt-6">
                FORMAR
              </span>
              <span className="font-serif-display italic font-light text-[3.5rem] lg:text-[5.5rem] text-emerald-600 -mt-2 lg:-mt-8 ml-2 opacity-90 leading-tight">
                tu mirada interior
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed mb-14 font-light pl-6 border-l-4 border-emerald-500/30">
              Acompañamiento profesional de vanguardia para descifrar el mensaje biológico de tus síntomas y recuperar tu paz emocional.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <button 
                onClick={() => scrollToSection(Section.CONTACTO)}
                className="bg-slate-900 text-white px-12 py-6 rounded-full text-sm font-black tracking-widest uppercase hover:bg-emerald-700 transition-all glow-emerald hover:-translate-y-1 relative overflow-hidden group shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-2">Agendar Sesión <ArrowRight className="w-4 h-4" /></span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button 
                onClick={() => scrollToSection(Section.DECODIFICADOR)}
                className="group relative px-12 py-6 rounded-full bg-white border border-slate-200 text-slate-900 text-sm font-black tracking-widest uppercase hover:border-emerald-500 transition-all overflow-hidden hover:shadow-lg"
              >
                <span className="relative z-10 group-hover:text-emerald-700 transition-colors">Decodificador</span>
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
                src="https://i.ibb.co/3ymrcJsT/Subject-disruptive-ultra-202511291228.jpg" 
                alt="José Alberto Pérez Franco" 
                className="h-full w-full object-cover object-top hover:scale-105 transition-transform duration-[1.5s]" 
              />
              
              {/* Floating Badge */}
              <div className="absolute bottom-12 left-0 bg-white/80 backdrop-blur-xl pl-8 pr-10 py-6 rounded-r-2xl border-y border-r border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.05)] z-20">
                <div className="flex items-center gap-3 mb-1">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800">Status Online</span>
                </div>
                <p className="font-heading font-bold text-xl text-slate-900 leading-none">Consultas Disponibles</p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ABOUT SECTION - Clean & Editorial */}
      <motion.section 
        id={Section.SOBRE_MI} 
        className="py-32 bg-white relative overflow-hidden"
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
                src="https://i.ibb.co/yBPjjHsY/Create-a-new-202511301931.jpg" 
                alt="Consulta" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-emerald-900/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
          
          <div className="md:col-span-7">
            <h2 className="text-6xl md:text-8xl font-heading font-bold text-slate-900 mb-8 leading-[0.9] tracking-tighter">
              Máster en <br/>
              <span className="font-serif-display italic text-emerald-700 font-normal text-5xl md:text-7xl">Bioneuroemoción®</span>
            </h2>
            
            <div className="space-y-8 text-lg text-slate-600 font-light leading-relaxed">
              <p>
                <span className="text-7xl float-left mr-4 mt-[-15px] font-heading font-black text-emerald-800 opacity-20">M</span>
                i nombre es <strong className="text-slate-900 font-bold">José Alberto Pérez Franco</strong>. Mi labor no es curarte, sino acompañarte a que tomes conciencia de "para qué" tu cuerpo ha generado un síntoma.
              </p>
              <p>
                Certificado por el <strong className="text-slate-900 border-b-2 border-emerald-300 hover:bg-emerald-50 transition-colors">Enric Corbera Institute</strong>, utilizo una metodología de vanguardia que integra conocimientos de biología, psicología y epigenética conductual para desactivar programas inconscientes.
              </p>
              
              <div className="pt-12">
                 <div className="flex items-center gap-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
                    <Dna className="w-8 h-8 text-emerald-500 animate-pulse" />
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
                 </div>
                 <p className="text-center font-serif-display italic text-3xl text-slate-800 mt-8">
                  "La enfermedad es el esfuerzo que hace la naturaleza para sanar al hombre."
                 </p>
                 <p className="text-center text-xs font-black tracking-[0.2em] uppercase text-emerald-600 mt-4">— Carl G. Jung</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* DECODER SECTION - Ultra Future UI */}
      <section id={Section.DECODIFICADOR} className="py-32 bg-slate-950 text-white relative overflow-hidden" data-hover="true">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Ambient Glows */}
        <div className="absolute top-[-20%] left-[30%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] bg-teal-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full border border-emerald-500/30 bg-emerald-900/20 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <ScanLine className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">Bio-Scanner v2.0</span>
            </div>
            
            <motion.h2 
              className="text-5xl md:text-7xl font-heading font-black mb-6 text-white tracking-tighter cursor-default relative inline-block"
              whileHover={{
                textShadow: [
                  "0 0 10px rgba(16, 185, 129, 0.2)",
                  "0 0 40px rgba(16, 185, 129, 0.6)",
                  "0 0 10px rgba(16, 185, 129, 0.2)"
                ],
                transition: { duration: 1.5, repeat: Infinity }
              }}
            >
              DECODIFICADOR <span className="text-stroke-light font-serif-display italic font-light text-emerald-300">Emocional</span>
            </motion.h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto font-light leading-relaxed">
              El cuerpo es el teatro de la conciencia. Ingresa tu síntoma para revelar la lógica oculta detrás del dolor.
            </p>
          </motion.div>

          {/* Ultra Glass Card */}
          <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-8 md:p-16 rounded-[2rem] shadow-[0_0_100px_-20px_rgba(16,185,129,0.1)] relative overflow-hidden group hover:border-emerald-500/30 transition-colors duration-500">
            {/* Laser Line Animation */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-[2s] ease-in-out"></div>
            <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 group-hover:left-full transition-all duration-[2s] ease-in-out"></div>

            {!decoderResult ? (
              <div className="relative z-10 max-w-2xl mx-auto">
                <div className="mb-12 text-center">
                  <label className="block text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-6">¿Qué síntoma te pesa hoy?</label>
                  <div className="relative group">
                    <input 
                      type="text" 
                      value={symptom}
                      onChange={(e) => setSymptom(e.target.value)}
                      placeholder="Ej. Migraña, Rodilla, Ansiedad..."
                      className="w-full bg-slate-950/50 border-b-2 border-slate-700 rounded-none p-6 text-3xl text-center text-white placeholder-slate-700 focus:outline-none focus:border-emerald-500 transition-all font-heading font-bold uppercase tracking-tight"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-500 group-hover:w-full"></div>
                  </div>
                </div>
                
                <button 
                  onClick={handleDecode}
                  disabled={isDecoding || !symptom}
                  className={`w-full py-6 rounded-xl font-black text-lg uppercase tracking-widest transition-all relative overflow-hidden group/btn ${
                    isDecoding ? 'bg-slate-800 cursor-wait text-slate-500' : 'bg-emerald-600 text-white hover:bg-emerald-500 glow-emerald'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isDecoding ? <span className="animate-pulse">Procesando Datos Biológicos...</span> : <>Analizar Sentido Biológico <Sparkles className="w-5 h-5" /></>}
                  </span>
                </button>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                className="relative z-10 text-center"
              >
                <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.2)] animate-pulse">
                  <Brain className="w-12 h-12 text-emerald-400" />
                </div>
                
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-8">Análisis Completado</h3>
                
                <div className="mb-12 p-8 border border-emerald-500/20 bg-emerald-900/10 rounded-2xl text-left relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-2 opacity-20">
                     <Activity className="w-24 h-24 text-emerald-500" />
                   </div>
                   <p className="text-xl md:text-3xl text-white font-serif-display italic leading-relaxed mb-8 relative z-10">
                    "{decoderResult.split('\n\n')[0]}"
                   </p>
                   <p className="text-emerald-300 text-lg font-bold font-heading mb-8 relative z-10 pl-6 border-l-2 border-emerald-500">
                     {decoderResult.split('\n\n')[1]}
                   </p>
                   {decoderResult.split('\n\n')[2] && (
                     <p className="text-xs text-slate-500 uppercase tracking-widest pt-6 border-t border-white/5 font-bold">
                       {decoderResult.split('\n\n')[2]}
                     </p>
                   )}
                </div>

                <div className="flex flex-col md:flex-row gap-6 justify-center">
                   <button 
                    onClick={() => scrollToSection(Section.CONTACTO)}
                    className="bg-emerald-500 text-slate-900 px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white transition-all glow-emerald hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.6)]"
                  >
                    Sanar en Sesión
                  </button>
                  <button 
                    onClick={() => { setDecoderResult(null); setSymptom(''); }}
                    className="px-10 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors uppercase text-xs font-bold tracking-widest hover:border-emerald-500/50"
                  >
                    Nueva Consulta
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* METHODOLOGY SECTION */}
      <motion.section 
        id={Section.METODOLOGIA} 
        className="py-40 max-w-[1400px] mx-auto px-6 bg-slate-50"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-slate-200 pb-12">
          <div>
            <span className="text-emerald-600 font-mono text-xs uppercase tracking-[0.3em] font-bold">El Proceso</span>
            <h2 className="text-6xl md:text-8xl font-heading font-black mt-4 text-slate-900 tracking-tighter">
              Metodo<span className="text-stroke-heavy text-slate-900 hover:text-emerald-900 transition-colors">logía</span>
            </h2>
          </div>
          <p className="max-w-md text-slate-500 text-right mt-8 md:mt-0 font-light text-lg">
            Un camino estructurado hacia tu libertad emocional, basado en la precisión biológica y la compasión humana.
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
              className="bg-white p-12 rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.15)] transition-all duration-500 group relative overflow-hidden border border-slate-100"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 font-heading text-9xl font-black text-slate-900 group-hover:text-emerald-500 transition-colors">
                 0{index + 1}
              </div>

              <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-12 group-hover:bg-emerald-600 transition-colors duration-500 group-hover:shadow-[0_10px_30px_rgba(16,185,129,0.3)] border border-slate-100">
                <div className="group-hover:text-white transition-colors duration-500 group-hover:scale-110 transform">
                   {renderIcon(step.iconName)}
                </div>
              </div>
              
              <h3 className="text-3xl font-heading font-bold mb-3 text-slate-900">{step.title}</h3>
              <p className="text-emerald-600 font-serif-display italic text-xl mb-8">{step.subtitle}</p>
              
              <p className="text-slate-600 leading-relaxed font-light text-lg">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* TESTIMONIALS SECTION */}
      <motion.section 
        id={Section.TESTIMONIOS}
        className="py-32 bg-white relative overflow-hidden"
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="bg-white p-10 rounded-3xl border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.1)] transition-all duration-300 group flex flex-col"
              >
                <div className="mb-8 text-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                  <Quote size={40} className="fill-current" />
                </div>
                
                <p className="text-slate-600 text-lg font-light leading-relaxed italic mb-8 flex-grow">
                  "{t.quote}"
                </p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500/20 group-hover:border-emerald-500 transition-colors">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-lg leading-none">{t.name}</h4>
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
        className="bg-slate-950 text-white pt-32 pb-16 rounded-t-[4rem] relative overflow-hidden mt-12 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.3)]"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
        
        {/* Footer Glow */}
        <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-600/20 blur-[150px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 relative z-10">
          <div>
            <div className="mb-12">
              <span className="font-serif-display italic text-4xl text-emerald-500 opacity-80">José Alberto</span>
              <h3 className="font-heading text-6xl md:text-7xl font-black tracking-tighter text-white mt-2 ultra-gradient-text">Pérez Franco</h3>
            </div>
            
            <p className="text-slate-400 max-w-md mb-12 text-xl font-light leading-relaxed">
              Tu biología responde a tu conciencia. Si cambias tu percepción, cambias tu realidad. Agenda tu sesión y comienza el cambio.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group hover:bg-emerald-600 hover:border-emerald-500 transition-all duration-300">
                 <Instagram className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
               </a>
               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group hover:bg-[#0077b5] hover:border-[#0077b5] transition-all duration-300">
                 <Linkedin className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
               </a>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-12 rounded-[2.5rem] border border-white/10 hover:border-emerald-500/30 transition-colors shadow-2xl">
            <h4 className="text-3xl font-serif-display italic mb-10 text-emerald-400">Contacto Directo</h4>
            <div className="space-y-8 text-slate-300 text-lg">
              <a href="mailto:asesoria@pepeperez.mx" className="flex items-center gap-6 hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center group-hover:bg-emerald-500 transition-colors border border-slate-700 group-hover:border-emerald-500">
                  <span className="text-emerald-500 group-hover:text-white font-bold">@</span>
                </div>
                <span className="font-heading tracking-wide">asesoria@pepeperez.mx</span>
              </a>
              <p className="flex items-center gap-6">
                 <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                  <span className="text-emerald-500 font-bold">Ph</span>
                </div>
                <span className="font-heading tracking-wide">+52 333 115 5895</span>
              </p>
            </div>
            
            <button 
              onClick={() => window.open('https://wa.me/523331155895', '_blank')}
              className="mt-12 w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black py-6 rounded-2xl transition-all shadow-[0_10px_30px_-5px_rgba(16,185,129,0.3)] uppercase tracking-widest text-sm hover:-translate-y-1 hover:shadow-[0_20px_40px_-5px_rgba(16,185,129,0.5)]"
            >
              Contactar por WhatsApp
            </button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between text-xs text-slate-600 uppercase tracking-widest font-bold">
          <p>© 2025 José Alberto Pérez Franco.</p>
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
