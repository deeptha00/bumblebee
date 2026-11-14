import React from "react";
import { motion } from "framer-motion";
import { Users, GraduationCap, Award, TrendingUp, Building2, Settings, CheckCircle } from "lucide-react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { COMPANY } from "../data/company";
import { fadeUp, stagger } from "../utils/motion";

export default function Services() {
  return (
    <Layout>
      <SEO
        title="Corporate Training & Academic Enablement Services"
        description="Explore Bumble Bee's three core practice areas: Corporate Learning & Enterprise Capability, Academic & Institutional Enablement, and the Bumble Bee Centre of Excellence — plus the real workforce challenges we solve."
        path="/services"
      />
      <ServicesSection />
      <KeyChallenges />
    </Layout>
  );
}

/* ---------------- SERVICES ---------------- */
function ServicesSection() {
  return (
    <section className="pt-32 pb-24 relative bg-[#030712] text-white overflow-hidden">
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[80%] h-[31.25rem] bg-gradient-to-r from-yellow-500/10 via-yellow-600/5 to-transparent rounded-full blur-[6.25rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial="hidden" whileInView="show" variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-yellow-500 tracking-widest uppercase mb-4 shadow-[0_0_0.9375rem_rgba(234,179,8,0.1)]">
            Our Expertise
          </motion.div>
          <motion.h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight" initial="hidden" whileInView="show" variants={fadeUp}>
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Solutions</span>
          </motion.h1>
          <motion.p className="text-lg text-slate-400 font-light" initial="hidden" whileInView="show" variants={fadeUp}>
            Combining corporate experience, data-driven methods, and applied learning to enable organizations and students to thrive.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-yellow-500/30 transition-all duration-500 flex flex-col h-full shadow-2xl"
            whileHover={{ y: -10 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-3xl rounded-full group-hover:bg-yellow-500/20 transition-colors duration-500"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 mb-8 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black shadow-lg group-hover:shadow-[0_0_1.875rem_rgba(250,204,21,0.5)] group-hover:scale-110 transition-all duration-300">
                <Users size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-4 tracking-tight">Corporate Learning & Enterprise Capability</h2>
              <p className="text-slate-400 text-sm leading-relaxed font-light mb-8">Solving operational bottlenecks, sharpening competitive execution, and fostering resilient leadership — with deep BFSI specialization.</p>
              <ul className="mt-auto space-y-3">
                {COMPANY.services.corporateLearning.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-slate-300">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0"></div>
                    <span className="leading-snug">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-500 flex flex-col h-full shadow-2xl"
            whileHover={{ y: -10 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-colors duration-500"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 mb-8 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-lg group-hover:shadow-[0_0_1.875rem_rgba(37,99,235,0.5)] group-hover:scale-110 transition-all duration-300">
                <GraduationCap size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-4 tracking-tight">Academic & Institutional Enablement</h2>
              <p className="text-slate-400 text-sm leading-relaxed font-light mb-8">Partnering with schools, colleges, and professional institutions to cultivate self-aware, career-ready graduates.</p>
              <ul className="mt-auto space-y-3">
                {COMPANY.services.academicEnablement.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-slate-300">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                    <span className="leading-snug">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-500 flex flex-col h-full shadow-2xl"
            whileHover={{ y: -10 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full group-hover:bg-emerald-500/20 transition-colors duration-500"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 mb-8 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-lg group-hover:shadow-[0_0_1.875rem_rgba(16,185,129,0.5)] group-hover:scale-110 transition-all duration-300">
                <Award size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-4 tracking-tight">Bumble Bee Centre of Excellence</h2>
              <p className="text-slate-400 text-sm leading-relaxed font-light mb-8">A dedicated digital knowledge hub delivering continuous, self-paced upskilling for students, faculty, and industry professionals.</p>
              <ul className="mt-auto space-y-3">
                {COMPANY.services.centreOfExcellence.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-slate-300">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"></div>
                    <span className="leading-snug">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- KEY CHALLENGES ---------------- */
function KeyChallenges() {
  return (
    <section className="py-24 bg-[#010308] text-white relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial="hidden" whileInView="show" variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
            Real World Problems
          </motion.div>
          <motion.h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight" initial="hidden" whileInView="show" variants={fadeUp}>
            Challenges We <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Solve</span>
          </motion.h2>
          <motion.p className="text-lg text-slate-400 font-light" initial="hidden" whileInView="show" variants={fadeUp}>
            Practical, measurable solutions designed from years of domain experience to address real workforce friction.
          </motion.p>
        </div>

        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="show" variants={stagger} viewport={{ once: true, margin: "-50px" }}>
          {COMPANY.challenges.map((c, i) => {
            const icons = [TrendingUp, Award, Users, Building2, Settings, CheckCircle];
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={c.title}
                className="group relative p-[0.0625rem] rounded-3xl bg-gradient-to-b from-white/10 to-white/5 hover:from-yellow-400/30 hover:to-white/10 transition-colors duration-500 overflow-hidden"
                variants={fadeUp}
                whileHover={{ y: -6 }}
              >
                <div className="absolute inset-0 bg-[#0a0a0a]"></div>
                <div className="absolute -inset-24 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>

                <div className="relative h-full p-8 rounded-3xl bg-black/40 backdrop-blur-md flex flex-col z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-yellow-400 mb-6 group-hover:scale-110 group-hover:bg-yellow-400/10 group-hover:shadow-[0_0_1.25rem_rgba(250,204,21,0.25)] transition-all duration-300 shadow-lg">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-xl text-white mb-3 leading-snug">{c.title}</h3>
                  <p className="mt-auto text-slate-400 text-sm leading-relaxed font-light">{c.solution}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
