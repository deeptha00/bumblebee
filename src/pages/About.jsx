import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Briefcase,
  Settings,
  Users2,
  Award,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Building2,
  ChevronsRight,
  ChevronsLeft,
  Sparkles,
} from "lucide-react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { useCompany } from "../context/companyContextCore";
import { fadeUp, stagger } from "../utils/motion";
import logo from "../assets/bumblebee-logo.jpg";

export default function About() {
  return (
    <Layout>
      <SEO
        title="About Us — Our Story & Methodology"
        description="Bumble Bee Corporate Solutions LLP bridges academic learning and industry execution. Discover our mission, vision, and the Transition Catalyst methodology behind our corporate and academic programs."
        path="/about"
      />
      <AboutSection />
      <TransitionCatalyst />
    </Layout>
  );
}

/* ---------------- ABOUT ---------------- */
function AboutSection() {
  const COMPANY = useCompany();
  return (
    <section className="pt-32 pb-24 relative bg-[#030712] overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-[31.25rem] bg-gradient-to-bl from-yellow-500/5 to-transparent rounded-bl-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-[31.25rem] bg-gradient-to-tr from-blue-500/5 to-transparent rounded-tr-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          className="space-y-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <div>
            <motion.div variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
              Who We Are
            </motion.div>
            <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight" variants={fadeUp}>
              Nurturing Potential, <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">Delivering Excellence.</span>
            </motion.h1>
          </div>

          <motion.p className="text-lg text-slate-400 font-light leading-relaxed border-l-2 border-yellow-500/50 pl-6" variants={fadeUp}>
            {COMPANY.about}
          </motion.p>

          <motion.p className="text-base text-slate-500 font-light leading-relaxed" variants={fadeUp}>
            <span className="text-slate-300 font-semibold">Our Vision: </span>{COMPANY.vision}
          </motion.p>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4" variants={stagger}>
            {COMPANY.missionPoints.map((m) => (
              <motion.div key={m} variants={fadeUp} className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
                <div className="mt-1 flex-shrink-0 text-yellow-500 bg-yellow-500/10 p-1.5 rounded-full"><CheckCircle size={14} /></div>
                <div className="text-sm text-slate-300 leading-relaxed font-medium">{m}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative h-full min-h-[25rem] flex items-center justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md aspect-square">
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/20 to-transparent rounded-[3rem] blur-2xl animate-pulse"></div>
            <div className="relative h-full w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden p-8 flex items-center justify-center transform transition-transform hover:scale-[1.02] duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 mix-blend-overlay"></div>
              <img src={COMPANY.logoUrl || logo} alt="BumbleBee Corporate Solutions" className="w-full h-full object-contain filter drop-shadow-[0_0_1.25rem_rgba(255,255,255,0.1)] relative z-10" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- TRANSITION CATALYST ---------------- */
const HANDLES = [
  {
    key: "corporate",
    label: "The Corporate Handle",
    left: { title: "Employee", icon: <Briefcase size={30} />, bg: [Briefcase, Settings, Users2, Settings, CheckCircle] },
    right: { title: "Domain Expert & Skilled Professional", icon: <Award size={30} />, bg: [CheckCircle, Settings, Award, Settings, TrendingUp] },
    subtitle: "The Transition Catalyst",
    tagline: "Transforming Employees into Industry-Ready Leaders",
  },
  {
    key: "academic",
    label: "The Academic Handle",
    left: { title: "Academic Learning", icon: <GraduationCap size={30} />, bg: [GraduationCap, BookOpen, GraduationCap, BookOpen, GraduationCap] },
    right: { title: "Industry", icon: <Building2 size={30} />, bg: [Settings, Building2, TrendingUp, Settings, Building2] },
    subtitle: "Our Focus & Expertise",
    tagline: "Transforming Budding Professionals into Real-World Professionals",
  },
];

function TransitionCatalyst() {
  const COMPANY = useCompany();
  const [active, setActive] = useState("corporate");
  const current = HANDLES.find((h) => h.key === active);

  const sideVariants = {
    hidden: (side) => ({ opacity: 0, x: side === "left" ? -90 : 90 }),
    show: (side) => ({ opacity: 1, x: 0, transition: { delay: side === "left" ? 0 : 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] } }),
    exit: (side) => ({ opacity: 0, x: side === "left" ? -90 : 90, transition: { duration: 0.35 } }),
  };

  const leftLabelVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const rightLabelVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { delay: 1.0, duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const glowVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    show: { opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.8 } },
    exit: { opacity: 0, scale: 0.6, transition: { duration: 0.3 } },
  };

  const beeVariants = {
    hidden: { opacity: 0, y: -140, scale: 0.4, rotate: -30 },
    show: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { delay: 1.1, duration: 0.6, type: "spring", stiffness: 140, damping: 13 } },
    exit: { opacity: 0, y: -60, scale: 0.5, transition: { duration: 0.25 } },
  };

  const brandVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { delay: 1.55, duration: 0.45 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { delay: 1.75, duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  const taglineVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { delay: 1.95, duration: 0.45 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  const arrowLeftVariants = {
    hidden: { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0, transition: { delay: 2.25, duration: 0.4, type: "spring", stiffness: 200 } },
    exit: { opacity: 0, x: -24, transition: { duration: 0.15 } },
  };

  const arrowRightVariants = {
    hidden: { opacity: 0, x: 24 },
    show: { opacity: 1, x: 0, transition: { delay: 2.25, duration: 0.4, type: "spring", stiffness: 200 } },
    exit: { opacity: 0, x: 24, transition: { duration: 0.15 } },
  };

  const BgIcons = ({ icons, side }) => {
    const positions = side === "left"
      ? ["top-8 right-16", "top-24 right-6", "bottom-28 right-10", "bottom-10 right-24", "top-1/2 right-2 -translate-y-1/2"]
      : ["top-8 left-16", "top-24 left-6", "bottom-28 left-10", "bottom-10 left-24", "top-1/2 left-2 -translate-y-1/2"];
    return icons.map((Icon, i) => (
      <motion.div
        key={i}
        className={`absolute ${positions[i]} text-white/10`}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
      >
        <Icon size={30} />
      </motion.div>
    ));
  };

  const Sparkle = ({ className, delay, size = 12 }) => (
    <motion.div
      className={`absolute text-yellow-300 pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 180] }}
      transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.4, delay, ease: "easeInOut" }}
    >
      <Sparkles size={size} />
    </motion.div>
  );

  return (
    <section className="py-24 bg-[#010308] text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-yellow-500/5 blur-[8rem] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
            <Sparkles size={12} className="text-yellow-400" /> The Transition Catalyst
          </motion.div>
          <motion.h2 initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            One Bridge, <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Two Worlds</span>
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} className="text-lg text-slate-400 font-light">
            Whether it's an employee or a student, Bumble Bee sits at the intersection of capability and real-world execution.
          </motion.p>
        </div>

        {/* Toggle */}
        <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-[0_0_1.875rem_rgba(0,0,0,0.3)]">
            {HANDLES.map((h) => (
              <motion.button
                key={h.key}
                onClick={() => setActive(h.key)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-colors duration-300 ${
                  active === h.key ? "text-black" : "text-slate-400 hover:text-white"
                }`}
              >
                {active === h.key && (
                  <motion.div
                    layoutId="handle-toggle-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-[0_0_0.9375rem_rgba(250,204,21,0.4)]"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {h.key === "corporate" ? <Briefcase size={14} /> : <GraduationCap size={14} />}
                  {h.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* The Wheel: left circle lands, right circle lands, bee flies in, then the brand text and arrows reveal */}
        <div className="relative flex items-center justify-center min-h-[26rem] sm:min-h-[30rem]">
          <AnimatePresence mode="wait" custom="left">
            <motion.div
              key={`left-${current.key}`}
              custom="left"
              variants={sideVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="relative z-0 w-64 h-64 sm:w-80 sm:h-80 -mr-6 sm:-mr-8 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full border-2 border-dashed border-amber-300/30 pointer-events-none"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6 rounded-full border border-amber-200/15 pointer-events-none"
              />

              <div
                className="relative w-full h-full rounded-full overflow-hidden flex flex-col items-center justify-center text-center p-6"
                style={{
                  background: "radial-gradient(circle at 35% 30%, #fde68a 0%, #f59e0b 45%, #b45309 100%)",
                  boxShadow: "0 0 3.75rem rgba(251,146,60,0.35), inset 0 0 2.5rem rgba(0,0,0,0.15)",
                }}
              >
                <BgIcons icons={current.left.bg} side="left" />

                <div className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full bg-gradient-to-br from-white/35 via-white/5 to-transparent blur-md pointer-events-none" />

                <motion.div
                  initial={{ x: "-160%" }}
                  animate={{ x: "220%" }}
                  transition={{ delay: 0.9, duration: 1.1, ease: "easeInOut" }}
                  className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none"
                />

                <motion.div variants={leftLabelVariants} initial="hidden" animate="show" exit="exit" className="relative z-10 flex flex-col items-center gap-3 -translate-x-10 sm:-translate-x-14">
                  <div className="text-[#1e293b]">{current.left.icon}</div>
                  <div className="font-black text-sm sm:text-base uppercase tracking-wide text-[#1e293b] max-w-[8rem]">{current.left.title}</div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait" custom="right">
            <motion.div
              key={`right-${current.key}`}
              custom="right"
              variants={sideVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="relative z-0 w-64 h-64 sm:w-80 sm:h-80 -ml-6 sm:-ml-8 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full border-2 border-dashed border-blue-300/30 pointer-events-none"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6 rounded-full border border-blue-200/15 pointer-events-none"
              />

              <div
                className="relative w-full h-full rounded-full overflow-hidden flex flex-col items-center justify-center text-center p-6"
                style={{
                  background: "radial-gradient(circle at 65% 30%, #60a5fa 0%, #1d4ed8 45%, #172554 100%)",
                  boxShadow: "0 0 3.75rem rgba(37,99,235,0.35), inset 0 0 2.5rem rgba(0,0,0,0.25)",
                }}
              >
                <BgIcons icons={current.right.bg} side="right" />

                <div className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 rounded-full bg-gradient-to-bl from-white/30 via-white/5 to-transparent blur-md pointer-events-none" />

                <motion.div
                  initial={{ x: "-220%" }}
                  animate={{ x: "160%" }}
                  transition={{ delay: 1.55, duration: 1.1, ease: "easeInOut" }}
                  className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none"
                />

                <motion.div variants={rightLabelVariants} initial="hidden" animate="show" exit="exit" className="relative z-10 flex flex-col items-center gap-3 translate-x-10 sm:translate-x-14">
                  <div className="text-white">{current.right.icon}</div>
                  <div className="font-black text-sm sm:text-base uppercase tracking-wide text-white max-w-[8rem]">{current.right.title}</div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Center column: glow, bee, brand text, and the converging arrows */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-2 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={`glow-${current.key}`}
                variants={glowVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-black/60 blur-xl"
              />
            </AnimatePresence>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`pulse-${current.key}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1.8 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full border border-yellow-400/50"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [0.35, 0, 0.35] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    className="absolute inset-0 rounded-full border border-yellow-400/30"
                  />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`bee-${current.key}`}
                  variants={beeVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-yellow-400/50 ring-1 ring-inset ring-black/30 shadow-[0_0_2.5rem_rgba(250,204,21,0.3)] flex items-center justify-center p-3"
                >
                  <img src={COMPANY.logoUrl || logo} alt="Bumble Bee" className="w-full h-full object-contain" />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div key={`sparkles-${current.key}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Sparkle className="-top-3 -right-3" delay={1.9} size={14} />
                  <Sparkle className="-bottom-2 -left-4" delay={2.3} size={11} />
                  <Sparkle className="top-1/2 -right-6" delay={2.7} size={10} />
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`brand-${current.key}`}
                variants={brandVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="relative mt-1.5 font-black text-sm sm:text-lg text-white tracking-tight drop-shadow-[0_0.125rem_0.375rem_rgba(0,0,0,0.9)]"
              >
                Bumble Bee
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`subtitle-${current.key}`}
                variants={subtitleVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="relative text-[0.55rem] sm:text-[0.65rem] font-bold text-yellow-400 uppercase tracking-widest drop-shadow-[0_0.0625rem_0.25rem_rgba(0,0,0,0.9)]"
              >
                {current.subtitle}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`tagline-${current.key}`}
                variants={taglineVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="relative mt-1.5 max-w-[8rem] sm:max-w-[9.5rem] text-center text-[0.55rem] sm:text-[0.65rem] font-bold text-white uppercase tracking-wide leading-snug drop-shadow-[0_0.0625rem_0.25rem_rgba(0,0,0,0.9)]"
              >
                {current.tagline}
              </motion.div>
            </AnimatePresence>

            <div className="relative mt-2 flex items-center gap-1">
              <AnimatePresence mode="wait">
                <motion.div key={`arrow-left-${current.key}`} variants={arrowLeftVariants} initial="hidden" animate="show" exit="exit" className="text-yellow-400">
                  <ChevronsRight size={18} />
                </motion.div>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.div key={`arrow-right-${current.key}`} variants={arrowRightVariants} initial="hidden" animate="show" exit="exit" className="text-blue-400">
                  <ChevronsLeft size={18} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
