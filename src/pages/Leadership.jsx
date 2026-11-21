import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { useCompany } from "../context/companyContextCore";
import { fadeUp, stagger } from "../utils/motion";

export default function Leadership() {
  const COMPANY = useCompany();
  return (
    <Layout>
      <SEO
        title="Leadership & Promoters"
        description="Meet the leadership behind Bumble Bee Corporate Solutions LLP — 22+ years of frontline BFSI expertise driving every corporate training and academic enablement program we design."
        path="/leadership"
      />
      <section className="pt-32 pb-24 bg-[#010308] text-white relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div initial="hidden" whileInView="show" variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
              The Architects
            </motion.div>
            <motion.h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight" initial="hidden" whileInView="show" variants={fadeUp}>
              Leadership & <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Promoters</span>
            </motion.h1>
          </div>

          <motion.div className="grid md:grid-cols-2 gap-8 lg:gap-12" initial="hidden" whileInView="show" variants={stagger} viewport={{ once: true }}>
            {COMPANY.leaders.map((l) => (
              <motion.div key={l.name} variants={fadeUp} className="group p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 blur-3xl rounded-full pointer-events-none"></div>

                <div className="flex flex-col sm:flex-row gap-8 items-start relative z-10">
                  <div className="flex-shrink-0 relative">
                    <div className="absolute -inset-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <img
                      src={l.image}
                      alt={l.name}
                      className="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover border-2 border-white/10 relative z-10 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-xl bg-yellow-400 text-black flex items-center justify-center shadow-lg z-20">
                      <Award size={20} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight">{l.name}</h2>
                    <div className="text-yellow-400 text-sm font-bold tracking-wider uppercase mt-1 mb-4">{l.title}</div>
                    <p className="text-slate-400 font-light leading-relaxed mb-6">{l.summary}</p>
                    <ul className="space-y-2">
                      {l.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-slate-300 font-medium">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0"></div>
                          <span className="leading-snug">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
