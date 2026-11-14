import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Users, GraduationCap, Award, ArrowRight } from "lucide-react";
import Gallery from "../gallery";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { COMPANY } from "../data/company";
import { fadeUp, stagger } from "../utils/motion";

export default function Home() {
  return (
    <Layout>
      <SEO
        title="Corporate Training, BFSI Capability & Student Development"
        description="Bumble Bee Corporate Solutions LLP designs experiential corporate training, BFSI domain mastery, and academic employability programs that turn knowledge into measurable, real-world performance."
        path="/"
      />
      <Hero />
      <OverviewTeasers />
      <Gallery />
      <ClosingCTA />
    </Layout>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section id="hero" className="min-h-screen relative flex items-center pt-24 pb-20 overflow-hidden bg-[#030712]">

      {/* Dynamic Background with Glowing Orbs & Subtle Imagery */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-yellow-500/10 blur-[7.5rem]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-600/10 blur-[7.5rem]"
        />

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000&q=80')" }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/60 via-[#030712]/75 to-[#030712]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(3,7,18,0.85),transparent)]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="space-y-8 text-center"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 backdrop-blur-md shadow-[0_0_0.9375rem_rgba(250,204,21,0.1)]">
              <Building2 size={16} className="text-yellow-400" />
              <span className="text-sm font-semibold tracking-wide text-yellow-400 uppercase">{COMPANY.tagline}</span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]"
          >
            Bridging Knowledge <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600">
              and Execution
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Empowering talent from classroom to boardroom through experiential training interventions that translate technical knowledge into measurable performance.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform"
            >
              Explore Solutions
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 backdrop-blur-md transition-colors"
            >
              Consult With Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- OVERVIEW TEASERS ---------------- */
function OverviewTeasers() {
  const cards = [
    {
      to: "/about",
      icon: <Building2 size={26} />,
      color: "from-yellow-400 to-yellow-600",
      title: "About Us",
      blurb: COMPANY.aboutbb,
    },
    {
      to: "/services",
      icon: <Users size={26} />,
      color: "from-blue-400 to-blue-600",
      title: "Services",
      blurb: "Corporate learning, academic enablement, and our Centre of Excellence — three pillars, one bridge between knowledge and execution.",
    },
    {
      to: "/industries",
      icon: <GraduationCap size={26} />,
      color: "from-emerald-400 to-emerald-600",
      title: "Industries We Serve",
      blurb: "Deep BFSI specialization, plus enterprises, schools, and colleges across India.",
    },
    {
      to: "/leadership",
      icon: <Award size={26} />,
      color: "from-purple-400 to-purple-600",
      title: "Leadership",
      blurb: "22+ years of frontline BFSI leadership behind every program we design.",
    },
  ];

  return (
    <section className="py-24 bg-[#030712] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
            Who We Are & What We Do
          </motion.div>
          <motion.h2 initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} className="text-4xl md:text-5xl font-black tracking-tight">
            Capability Development, <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">End to End</span>
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.to}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={c.to}
                className="group block h-full p-7 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
              >
                <div className={`w-12 h-12 mb-5 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-black shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {c.icon}
                </div>
                <h3 className="font-bold text-xl text-white mb-2">{c.title}</h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed mb-5">{c.blurb}</p>
                <div className="flex items-center gap-2 text-sm font-semibold text-yellow-400">
                  Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CLOSING CTA ---------------- */
function ClosingCTA() {
  return (
    <section className="py-24 bg-[#010308] text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80%] h-[18.75rem] bg-gradient-to-b from-yellow-500/10 to-transparent blur-[6.25rem] rounded-full"></div>
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.h2 className="text-4xl md:text-5xl font-black tracking-tight" initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}>
          Ready to Bridge <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Knowledge and Execution?</span>
        </motion.h2>
        <motion.p className="text-lg text-slate-400 font-light mt-6 max-w-2xl mx-auto" initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}>
          Reach out for program design, academic partnerships, or Centre of Excellence collaborations.
        </motion.p>
        <motion.div className="mt-10 flex justify-center" initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}>
          <Link to="/contact" className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold shadow-[0_0_1.25rem_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all">
            Get in Touch
            <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-colors">
              <ArrowRight size={16} />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
