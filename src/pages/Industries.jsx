import React from "react";
import { motion } from "framer-motion";
import { Building2, Briefcase, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { COMPANY } from "../data/company";
import { fadeUp } from "../utils/motion";

export default function Industries() {
  return (
    <Layout>
      <SEO
        title="Industries We Serve — BFSI, Enterprises, Schools & Colleges"
        description="Bumble Bee delivers focused domain expertise across Banking, Financial Services & Insurance (BFSI), enterprises, schools, and arts, science, engineering, management & commerce colleges."
        path="/industries"
      />
      <section className="pt-32 pb-24 bg-[#030712] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <motion.div initial="hidden" whileInView="show" variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
                Domain Expertise
              </motion.div>
              <motion.h1 className="text-4xl md:text-5xl font-black tracking-tight" initial="hidden" whileInView="show" variants={fadeUp}>
                Industries We <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Elevate</span>
              </motion.h1>
            </div>
            <motion.p className="text-lg text-slate-400 font-light max-w-sm md:text-right" initial="hidden" whileInView="show" variants={fadeUp}>
              Focused domain expertise ensuring measurable results tailored to your specific sector.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY.industries.map((ind, i) => {
              const icons = [Building2, Briefcase, BookOpen, GraduationCap];
              const colors = [
                { glow: "bg-yellow-500/10", hoverBg: "group-hover:bg-yellow-400", badge: "from-yellow-400 to-yellow-600" },
                { glow: "bg-blue-500/10", hoverBg: "group-hover:bg-blue-400", badge: "from-blue-400 to-blue-600" },
                { glow: "bg-emerald-500/10", hoverBg: "group-hover:bg-emerald-400", badge: "from-emerald-400 to-emerald-600" },
                { glow: "bg-purple-500/10", hoverBg: "group-hover:bg-purple-400", badge: "from-purple-400 to-purple-600" },
              ];
              const Icon = icons[i % icons.length];
              const c = colors[i % colors.length];
              return (
                <motion.div
                  key={ind}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="group p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-all duration-300 relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 ${c.glow} blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
                  <div className={`relative z-10 w-12 h-12 mb-5 rounded-2xl bg-gradient-to-br ${c.badge} flex items-center justify-center text-black shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} />
                  </div>
                  <h2 className="font-bold text-xl text-white mb-3 relative z-10">{ind}</h2>
                  <p className="text-slate-400 text-sm font-light leading-relaxed relative z-10">
                    Custom solutions tailored for this sector, leveraging BFSI experience and modern delivery methods.
                  </p>
                  <div className={`mt-8 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500 ${c.hoverBg} group-hover:text-black transition-colors relative z-10`}>
                    <ArrowRight size={16} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
