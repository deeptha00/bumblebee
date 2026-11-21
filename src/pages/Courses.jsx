import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, BarChart3, Tag, ArrowRight, Users, Briefcase, GraduationCap, LayoutGrid } from "lucide-react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { useCompany } from "../context/companyContextCore";
import { fadeUp, stagger } from "../utils/motion";

const TOGGLES = [
  { key: "All", label: "All Programs", icon: LayoutGrid },
  { key: "Corporate", label: "Corporate", icon: Briefcase },
  { key: "Students & Public", label: "Students, Public & Investors", icon: GraduationCap },
];

export default function Courses() {
  const COMPANY = useCompany();
  const [segment, setSegment] = useState("All");
  const allCourses = COMPANY.courses || [];
  const courses = allCourses.filter(
    (c) => segment === "All" || !c.segments || c.segments.includes(segment)
  );

  return (
    <Layout>
      <SEO
        title="Courses — Bumble Bee Centre of Excellence"
        description="Browse self-paced and blended certification courses from the Bumble Bee Centre of Excellence — BFSI mastery, consultative sales, managerial fundamentals, and more."
        path="/courses"
      />
      <section className="pt-32 pb-24 bg-[#030712] text-white relative overflow-hidden">
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[80%] h-[25rem] bg-gradient-to-r from-yellow-500/10 via-yellow-600/5 to-transparent rounded-full blur-[6.25rem] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-yellow-400 tracking-widest uppercase mb-4">
              Bumble Bee Centre of Excellence
            </motion.div>
            <motion.h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight" initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}>
              Courses & <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Certifications</span>
            </motion.h1>
            <motion.p className="text-lg text-slate-400 font-light" initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}>
              Self-paced and blended short-term certifications designed to build job-ready competencies — more programs are added regularly.
            </motion.p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {TOGGLES.map((t) => {
              const Icon = t.icon;
              const active = segment === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setSegment(t.key)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border transition-colors ${
                    active
                      ? "bg-yellow-400 text-black border-yellow-400"
                      : "bg-white/5 text-slate-300 border-white/10 hover:border-yellow-400/40"
                  }`}
                >
                  <Icon size={15} />
                  {t.label}
                </button>
              );
            })}
          </div>

          <motion.div
            key={segment}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="show"
            variants={stagger}
          >
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </motion.div>

          {courses.length === 0 && (
            <p className="text-center text-slate-500 py-16">No courses in this category yet.</p>
          )}

          <motion.p
            initial="hidden"
            whileInView="show"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-center text-sm text-slate-500 font-light mt-16"
          >
            These courses are launching soon on the Bumble Bee Centre of Excellence. Reach out via our <Link to="/contact" className="text-yellow-400 hover:underline">contact page</Link> to be notified first.
          </motion.p>
        </div>
      </section>
    </Layout>
  );
}

function CourseCard({ course }) {
  return (
    <motion.div variants={fadeUp} whileHover={{ y: -6 }}>
      <Link
        to={`/courses/${course.slug}`}
        className="group relative block p-[0.0625rem] rounded-3xl bg-gradient-to-b from-white/10 to-white/5 hover:from-yellow-400/30 hover:to-white/10 transition-colors duration-500 overflow-hidden h-full"
      >
        <div className="absolute inset-0 bg-[#0a0a0a]"></div>
        <div className="absolute -inset-24 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>

        <div className="relative h-full rounded-3xl bg-black/40 backdrop-blur-md flex flex-col z-10">
          <div className="relative aspect-[16/10] overflow-hidden rounded-t-3xl">
            {course.image ? (
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-yellow-500/20 via-[#111] to-black" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[0.65rem] font-bold uppercase tracking-widest border border-white/20">
              <Tag size={11} /> {course.category}
            </span>
            {course.price && (
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-yellow-400 text-black text-xs font-bold">{course.price}</span>
            )}
          </div>

          <div className="p-7 flex flex-col flex-1">
            <h3 className="font-bold text-xl text-white mb-2 leading-snug">{course.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light mb-6">
              {course.description || course.subtitle}
            </p>

            {course.audience?.length > 0 && (
              <div className="mt-auto flex items-start gap-1.5 text-xs text-slate-500 font-medium pt-4 border-t border-white/5">
                <Users size={13} className="mt-0.5 flex-shrink-0" /> <span>{course.audience.join(" · ")}</span>
              </div>
            )}
            {(course.duration || course.level) && (
              <div className="mt-auto flex items-center gap-4 text-xs text-slate-500 font-medium pt-4 border-t border-white/5">
                {course.duration && <span className="flex items-center gap-1.5"><Clock size={13} /> {course.duration}</span>}
                {course.level && <span className="flex items-center gap-1.5"><BarChart3 size={13} /> {course.level}</span>}
              </div>
            )}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{course.format}</span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-yellow-400">
                View Course <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
