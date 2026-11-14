import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { fadeUp } from "../utils/motion";

export default function Careers() {
  return (
    <Layout>
      <SEO
        title="Careers — Join Our Hive"
        description="Join Bumble Bee Corporate Solutions LLP's team of passionate trainers, facilitators, and content strategists shaping the workforce of tomorrow."
        path="/careers"
      />
      <section className="pt-32 pb-24 bg-[#030712] text-white relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="w-[80%] h-[18.75rem] bg-gradient-to-b from-yellow-500/10 to-transparent blur-[6.25rem] rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial="hidden" whileInView="show" variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
            Join Our Hive
          </motion.div>
          <motion.h1 className="text-4xl md:text-5xl font-black tracking-tight" initial="hidden" whileInView="show" variants={fadeUp}>
            Shape the Workforce of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Tomorrow</span>
          </motion.h1>
          <motion.p className="text-lg text-slate-400 font-light mt-6 max-w-2xl mx-auto" initial="hidden" whileInView="show" variants={fadeUp}>
            Join our elite team of passionate trainers, facilitators, and content strategists. We value continuous learning, measurable impact, and real-world outcomes.
          </motion.p>

          <motion.div className="mt-10 flex justify-center" initial="hidden" whileInView="show" variants={fadeUp}>
            <Link to="/contact" className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold shadow-[0_0_1.25rem_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all">
              Explore Opportunities
              <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                <Briefcase size={16} />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
