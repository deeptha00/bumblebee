import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, BarChart3, Tag, CheckCircle, Users, ArrowLeft, ArrowRight } from "lucide-react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { useCompany } from "../context/companyContextCore";
import { fadeUp, stagger } from "../utils/motion";

export default function CourseDetail() {
  const COMPANY = useCompany();
  const { slug } = useParams();
  const course = COMPANY.courses.find((c) => c.slug === slug);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <Layout>
      <SEO
        title={`${course.title} — Bumble Bee Centre of Excellence`}
        description={course.description}
        path={`/courses/${course.slug}`}
        image={course.image}
      />
      <section className="pt-32 pb-24 bg-[#030712] text-white relative overflow-hidden">
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[80%] h-[25rem] bg-gradient-to-r from-yellow-500/10 via-yellow-600/5 to-transparent rounded-full blur-[6.25rem] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-yellow-400 transition-colors mb-8">
              <ArrowLeft size={16} /> Back to Courses
            </Link>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={stagger} className="grid lg:grid-cols-2 gap-10 items-start mb-16">
            <motion.div variants={fadeUp} className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              {course.image ? (
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-yellow-500/20 via-[#111] to-black" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-yellow-400 text-xs font-bold uppercase tracking-widest border border-yellow-400/30">
                <Tag size={12} /> {course.category}
              </span>
            </motion.div>

            <div>
              <motion.div variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-yellow-400 tracking-widest uppercase mb-4">
                Bumble Bee Centre of Excellence
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl font-black mb-4 tracking-tight leading-tight">
                {course.title}
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-slate-400 font-light leading-relaxed mb-6">
                {course.description}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-8">
                {course.duration && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-slate-300">
                    <Clock size={15} className="text-yellow-400" /> {course.duration}
                  </div>
                )}
                {course.level && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-slate-300">
                    <BarChart3 size={15} className="text-yellow-400" /> {course.level}
                  </div>
                )}
                {course.format && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-slate-300">
                    {course.format}
                  </div>
                )}
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-4">
                {course.price && <span className="text-2xl font-black text-yellow-400">{course.price}</span>}
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-400 text-black font-bold hover:scale-105 transition-transform"
                >
                  Notify Me When Live <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {course.audience?.length > 0 && (
            <motion.div initial="hidden" whileInView="show" variants={stagger} viewport={{ once: true }} className="max-w-3xl mb-12">
              <motion.h2 variants={fadeUp} className="text-2xl font-bold mb-6 tracking-tight">Who It's For</motion.h2>
              <motion.div variants={stagger} className="grid gap-4">
                {course.audience.map((a) => (
                  <motion.div key={a} variants={fadeUp} className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="mt-1 flex-shrink-0 text-yellow-400 bg-yellow-500/10 p-1.5 rounded-full"><Users size={14} /></div>
                    <div className="text-sm text-slate-300 leading-relaxed font-medium">{a}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {course.outcomes?.length > 0 && (
          <motion.div initial="hidden" whileInView="show" variants={stagger} viewport={{ once: true }} className="max-w-3xl">
              <motion.h2 variants={fadeUp} className="text-2xl font-bold mb-6 tracking-tight">What You'll Learn</motion.h2>
              <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-4">
                {course.outcomes.map((o) => (
                  <motion.div key={o} variants={fadeUp} className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="mt-1 flex-shrink-0 text-yellow-400 bg-yellow-500/10 p-1.5 rounded-full"><CheckCircle size={14} /></div>
                    <div className="text-sm text-slate-300 leading-relaxed font-medium">{o}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
}
