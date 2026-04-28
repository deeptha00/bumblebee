// App.jsx
import emailjs from "emailjs-com";
import React, { useState } from "react";
import Gallery from '../gallery';

import { motion } from "framer-motion";
import {
  Users,
  Building2,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  CheckCircle,
  Users2,
  Award,
  ArrowRight,
  Play
} from "lucide-react";
import logo from "../assets/bumblebee-logo.jpg"; // <- put your logo here

// ---------- Animation variants ----------
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardHover = { scale: 1.03, y: -6, transition: { duration: 0.25 } };

// ---------- Content (pulled from uploaded docs) ----------
const COMPANY = {
  name: "Bumble Bee Corporate Solutions Private Limited",
  short: "BumbleBee",
  tagline: "Redefining learning empowering world",
  aboutbb: "Bumble Bee is where learning meets opportunity. From corporate training to recruitment and student development, we shape careers and strengthen organizations for the future.",
  about:
    "Bumble Bee is a specialized Corporate Training and Human Resource Recruitment Consultancy committed to empowering organizations with the right people and the right skills. With strong expertise in the Banking and Financial Services Industry (BFSI) and diverse other sectors, we bridge the gap between talent development and talent acquisition, enabling businesses to achieve sustainable growth.",
  vision:
    "To be a trusted partner in nurturing people and organizations, helping them grow and succeed in today’s dynamic world by transforming learning into meaningful action.",
  missionPoints: [
    "Design and deliver impactful corporate training programs that enhance skills, leadership, and performance.",
    "Provide recruitment solutions that connect businesses with the right talent for long-term success.",
    "Foster a culture of continuous learning and growth for both organizations and professionals.",
    "Prepare students for higher studies and career readiness, equipping them with essential life and professional skills.",
  ],
  services: {
    corporateTraining: [
      "Leadership Development Programs",
      "Sales & Marketing Excellence Training",
      "Soft Skills & Communication Skills",
      "BFSI Domain-Specific Training",
      "Team Building & Motivation Workshops",
    ],
    recruitment: [
      "Executive Search & Leadership Hiring",
      "Middle & Entry-Level Recruitment",
      "Domain-Specific Hiring (Banking, Insurance, Finance, NBFC, Pharma, etc.)",
      "Contract & Project-Based Staffing",
    ],
    studentPrograms: [
      "Personality Development & Communication Skills",
      "Interview & Group Discussion Preparation",
      "Career Readiness & Employability Skills",
      "Orientation Programs for Higher Education",
      "Financial Literacy & Applied Economics Basics",
    ],
  },
  challenges: [
    {
      title: "Low Productivity & Employee Engagement",
      solution:
        "Customised training programs to enhance motivation, accountability, and skills development, ensuring employees perform at their peak.",
    },
    {
      title: "Leadership Gaps & Ineffective Management",
      solution:
        "Equip managers and leaders with skills in decision-making, team management, strategic leadership, coaching, and effective communication.",
    },
    {
      title: "Struggles in Sales Performance & Customer Conversions",
      solution:
        "Training on sales psychology, negotiation, client relationship management and objection handling to boost conversions.",
    },
    {
      title: "Lack of Industry-Specific Training in BFSI",
      solution:
        "22+ years of BFSI expertise to deliver specialized training covering compliance, regulatory needs and performance standards.",
    },
    {
      title: "Ineffective Digital Training & Employee Upskilling",
      solution:
        "Modern digital-first training solutions that fit into corporate learning ecosystems, for remote and in-person skill development.",
    },
    {
      title: "High Employee Turnover Due to Lack of Growth Opportunities",
      solution:
        "Programs designed to retain talent by investing in professional development and clear career progression.",
    },
  ],
  industries: [
    "Banking & Financial Services (BFSI)",
    "Technology & ITES",
    "Startups & Enterprises",
    "MSMEs & Corporates",
    "Professional Education Institutions",
  ],
  contact: {
    phones: ["8848554879", "9946558352"],
    email: "jiju.k@bumblebeeindia.com",
    address:
      "1st floor, Pootholi Building, Behind Rajendra Nursing Home, Ashokapuram, Calicut 673001",
    website: "www.bumblebeeindia.com",
  },
  testimonials: [
    { quote: "Bumble Bee helped us transform frontline sales capability with measurable results.", name: "ICICI Bank" },
    { quote: "Their recruitment expertise is unmatched — quality hires, fast turnaround.", name: "RenewBuy" },
  ],
  leaders: [
    {
      name: "Jiju K",
      title: "Chief Executive Officer",
      image: "/leaders/jiju.jpeg",
      summary:
        "A seasoned corporate training professional with 22+ years in the Banking and Financial Services Industry (BFSI). Experienced across ICICI Bank, Aditya Birla Capital, HDFC Bank, TATA AIA Life, Edelweiss Life Insurance and Canara HSBC.",
      highlights: [
        "MBA (Finance) – Bharathiyar University Coimbatore",
        "AIII (Associate of Insurance Institute of India)",
        "500+ workshops conducted",
        "Train-the-Trainer certified",
        "Pan-India training awards & industry accolades",
      ],
    },
    {
      name: "Rakesh Roshan R",
      title: "CFO & Co-Founder",
      image: "/leaders/rakesh.jpeg",
      summary:
        "Extensive experience across banking, life insurance, and health insurance. Former roles include Branch Operations and senior positions in RenewBuy & Care Health Insurance.",
      highlights: [
        "Science Graduate – Calicut University",
        "Proven track record in sales & business development",
        "International exposure & branch leadership experience",
      ],
    },
  ],
};

// ---------- App ----------
const scrollToSection = (e, id) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Home() {
  return (
    <div className="antialiased">
      <Topbar />
      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <KeyChallenges />
        <Services />
        <UpcomingWorkshop />
        <Industries />
        <Leadership />
        {/* <Testimonials /> */}
        <Gallery />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- TOPBAR / NAV ---------------- */
function Topbar() {
  return (
    <><header className="fixed w-full z-50 top-0 bg-transparent">
      <div className="backdrop-blur-md bg-black/30 border-b border-white/6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#hero" onClick={(e) => scrollToSection(e, "hero")} className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg overflow-hidden shadow-md bg-white p-1">
              <img src={logo} alt="BumbleBee Corporate Solutions Logo" className="w-full h-full object-contain" />
            </div>
            <div className="text-white font-semibold leading-tight">
              <div className="text-base">{COMPANY.short} </div>
              <div className="text-xs text-slate-300 -mt-0.5">Corporate Solutions LLP</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6 text-sm text-slate-200">
            <a href="#about" onClick={(e) => scrollToSection(e, "about")} className="hover:text-yellow-400 transition">About</a>
            <a href="#services" onClick={(e) => scrollToSection(e, "services")} className="hover:text-yellow-400 transition">Services</a>
            <a href="#industries" onClick={(e) => scrollToSection(e, "industries")} className="hover:text-yellow-400 transition">Industries</a>
            <a href="#leadership" onClick={(e) => scrollToSection(e, "leadership")} className="hover:text-yellow-400 transition">Leadership</a>
            <a href="/#/workshop" className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-bold animate-pulse">Live Workshop</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, "contact")} className="hover:text-yellow-400 transition">Contact</a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="ml-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 text-black font-semibold shadow"
            >
              Let's Talk
            </a>
          </nav>
        </div>
      </div>
    </header>
    </>
  );/* ---------------- HERO ---------------- */
  function Hero() {
    return (
      <section id="hero" className="min-h-screen relative flex items-center pt-20">
        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-[0.35]"
          >
            {/* Using a high-quality free corporate/office video for the background */}
            <source src="https://cdn.pixabay.com/video/2021/08/19/85638-590629738_large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#07131a] via-black/40 to-black/60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Main Corporate Message */}
          <motion.div
            className="space-y-8 text-white"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <Building2 size={16} className="text-yellow-400" />
                <span className="text-sm font-semibold tracking-wider uppercase text-yellow-400">Corporate Training Experts</span>
              </div>
            </motion.div>

            <motion.h1
              className="font-extrabold leading-[1.1] text-5xl md:text-7xl tracking-tight"
              variants={fadeUp}
            >
              Transforming <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">
                Talent into Impact
              </span>
            </motion.h1>

            <motion.p className="text-slate-300 text-lg md:text-xl max-w-lg leading-relaxed font-light" variants={fadeUp}>
              {COMPANY.aboutbb}
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-4">
              <a
                href="#services"
                onClick={(e) => scrollToSection(e, "services")}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/20 transition-all"
              >
                Our Services
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - The Workshop Highlight */}
          <motion.div
            className="w-full relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          >
            {/* Highlight glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-[2.5rem] blur-xl opacity-30 animate-pulse"></div>

            <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden">
              {/* Tag */}
              <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-black px-4 py-1.5 uppercase tracking-widest rounded-bl-xl">
                Frequent Event
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-yellow-400 font-bold tracking-widest text-sm mb-2 uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    Live Workshop Series
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                    Personal Finance: <br /> <span className="text-slate-300 italic font-serif">The Untold Story</span>
                  </h3>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed">
                  Join our exclusive, frequently held masterclass on bridging the gap between financial knowing and financial doing.
                </p>

                <div className="flex items-center gap-4 py-4 border-y border-white/10">
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Format</div>
                    <div className="text-white font-bold flex items-center gap-2">
                      <Play size={16} className="text-yellow-400" /> Online Interactive
                    </div>
                  </div>
                  <div className="w-px h-10 bg-white/10"></div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Next Session</div>
                    <div className="text-white font-bold">9th May, 2026</div>
                  </div>
                </div>

                <a
                  href="/#/workshop"
                  className="w-full inline-flex justify-center items-center gap-2 px-8 py-5 rounded-2xl bg-yellow-400 text-black font-black text-lg hover:bg-yellow-300 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Reserve Your Spot Now
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ---------------- ABOUT ---------------- */
  function About() {
    return (
      <section id="about" className="py-20 bg-gradient-to-b from-[#07131a] to-[#031017] text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 className="text-3xl md:text-4xl font-bold" variants={fadeUp}>About Bumble Bee</motion.h2>
            <motion.p className="text-slate-300" variants={fadeUp}>
              {COMPANY.about}
            </motion.p>

            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={stagger}>
              {COMPANY.missionPoints.map((m) => (
                <motion.div key={m} variants={fadeUp} className="p-4 bg-white/4 rounded-lg border border-white/6">
                  <div className="text-yellow-300 mb-2"><CheckCircle size={18} /></div>
                  <div className="text-sm text-slate-200">{m}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" className="rounded-3xl overflow-hidden border border-white/6 p-2">
            <img src={logo} alt="company visual" className="w-full h-full object-contain rounded-xl" />
          </motion.div>
        </div>
      </section>
    );
  }

  /* ---------------- KEY CHALLENGES ---------------- */
  function KeyChallenges() {
    return (
      <section id="challenges" className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" initial="hidden" whileInView="show" variants={fadeUp}>Key Challenges We Solve</motion.h2>
          <motion.p className="text-slate-300 mb-8" initial="hidden" whileInView="show" variants={fadeUp}>
            Practical, measurable solutions designed from years of domain experience to address real workforce problems.
          </motion.p>

          <motion.div className="grid md:grid-cols-3 gap-6" initial="hidden" whileInView="show" variants={stagger} viewport={{ once: true }}>
            {COMPANY.challenges.map((c) => (
              <motion.div
                key={c.title}
                className="p-6 bg-gradient-to-br from-white/4 to-white/2 rounded-xl border border-white/6"
                whileHover={cardHover}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-yellow-400/20 flex items-center justify-center text-yellow-300">
                    <Users2 size={20} />
                  </div>
                  <h4 className="font-semibold text-lg">{c.title}</h4>
                </div>
                <p className="mt-3 text-slate-200 text-sm">{c.solution}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  /* ---------------- SERVICES ---------------- */
  function Services() {
    return (
      <section id="services" className="py-20 bg-gradient-to-b from-[#031017] to-[#021012] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" initial="hidden" whileInView="show" variants={fadeUp}>Our Services</motion.h2>
          <motion.p className="text-slate-300 mb-8" initial="hidden" whileInView="show" variants={fadeUp}>
            We combine corporate experience, data-driven methods and applied learning to enable organisations and students.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div className="p-8 rounded-2xl bg-gradient-to-br from-[#07131a] to-[#041018] border border-white/6 shadow" whileHover={cardHover}>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-400/10 rounded-lg text-yellow-300"><Users size={28} /></div>
                <div>
                  <h3 className="text-xl font-semibold">Corporate Training</h3>
                  <div className="text-slate-300 text-sm mt-2">Tailored training for leadership, sales and domain-specific capability.</div>
                </div>
              </div>
              <ul className="mt-4 text-slate-300 text-sm space-y-2">
                {COMPANY.services.corporateTraining.map((s) => <li key={s}>• {s}</li>)}
              </ul>
            </motion.div>

            <motion.div className="p-8 rounded-2xl bg-gradient-to-br from-[#07131a] to-[#041018] border border-white/6 shadow" whileHover={cardHover}>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-400/10 rounded-lg text-yellow-300"><Building2 size={28} /></div>
                <div>
                  <h3 className="text-xl font-semibold">Recruitment Consultancy</h3>
                  <div className="text-slate-300 text-sm mt-2">End-to-end hiring for executive, mid and entry level roles.</div>
                </div>
              </div>
              <ul className="mt-4 text-slate-300 text-sm space-y-2">
                {COMPANY.services.recruitment.map((s) => <li key={s}>• {s}</li>)}
              </ul>
            </motion.div>

            <motion.div className="p-8 rounded-2xl bg-gradient-to-br from-[#07131a] to-[#041018] border border-white/6 shadow" whileHover={cardHover}>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-400/10 rounded-lg text-yellow-300"><GraduationCap size={28} /></div>
                <div>
                  <h3 className="text-xl font-semibold">Student Development</h3>
                  <div className="text-slate-300 text-sm mt-2">Programs to prepare students for higher studies and employability.</div>
                </div>
              </div>
              <ul className="mt-4 text-slate-300 text-sm space-y-2">
                {COMPANY.services.studentPrograms.map((s) => <li key={s}>• {s}</li>)}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- UPCOMING WORKSHOP ---------------- */
  function UpcomingWorkshop() {
    return (
      <section id="workshop-cta" className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <motion.div
              className="md:max-w-xl"
              initial="hidden"
              whileInView="show"
              variants={fadeUp}
            >
              <div className="inline-block px-3 py-1 rounded-full bg-black/10 text-sm font-bold mb-4 uppercase tracking-wider">Limited Seats Available</div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Personal Finance: <br />
                <span className="italic opacity-80 text-3xl md:text-4xl block mt-2">The Untold Story of Behavior</span>
              </h2>
              <p className="text-lg font-medium mb-8 opacity-80">
                Join Jiju K’s exclusive masterclass on bridging the gap between financial knowing and financial doing. Learn the behavioral hacks to fix lifestyle inflation and master your wealth.
              </p>
              <div className="flex gap-4 mb-8">
                <div className="px-4 py-2 rounded-xl bg-black/5 border border-black/10">
                  <div className="text-[10px] uppercase font-bold opacity-50">Date</div>
                  <div className="font-bold">9th May 2026</div>
                </div>
                <div className="px-4 py-2 rounded-xl bg-black/5 border border-black/10">
                  <div className="text-[10px] uppercase font-bold opacity-50">Time</div>
                  <div className="font-bold">10:00 AM - 11:30 AM</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/#/workshop"
                  className="px-8 py-4 rounded-full bg-black text-white font-black text-lg hover:scale-105 transition transform active:scale-95 shadow-xl"
                >
                  Book My Seat — ₹199
                </a>
                <div className="flex items-center gap-2 text-sm font-bold">
                  <Users size={18} />
                  <span>87/100 Seats Filled</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute -inset-4 bg-black/10 blur-2xl rounded-full" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-4 border-black/5 shadow-2xl rotate-3">
                <img src="/images/jiju.jpeg" alt="Jiju K" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black text-white">
                  <div className="font-bold">Jiju K</div>
                  <div className="text-xs opacity-70">BFSI Expert & CEO</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }


  /* ---------------- INDUSTRIES ---------------- */
  function Industries() {
    return (
      <section id="industries" className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" initial="hidden" whileInView="show" variants={fadeUp}>Industries We Serve</motion.h2>
          <motion.p className="text-slate-300 mb-8" initial="hidden" whileInView="show" variants={fadeUp}>
            Focused domain expertise for measurable results.
          </motion.p>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {COMPANY.industries.map((ind) => (
              <motion.div
                key={ind}
                className="min-w-[260px] p-6 rounded-xl bg-gradient-to-br from-white/4 to-white/2 border border-white/6"
                whileHover={cardHover}
              >
                <h4 className="font-semibold text-lg">{ind}</h4>
                <p className="mt-2 text-slate-300 text-sm">
                  Custom solutions tailored for this sector, leveraging BFSI experience and modern delivery methods.
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  /* ---------------- LEADERSHIP ---------------- */
  function Leadership() {
    return (
      <section id="leadership" className="py-20 bg-gradient-to-b from-[#031017] to-[#021012] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" initial="hidden" whileInView="show" variants={fadeUp}>Leadership & Promoters</motion.h2>
          <motion.div className="grid md:grid-cols-2 gap-6" initial="hidden" whileInView="show" variants={stagger} viewport={{ once: true }}>
            {COMPANY.leaders.map((l) => (
              <motion.div key={l.name} className="p-6 rounded-xl bg-black/60 border border-white/6" whileHover={cardHover}>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-300">
                    <Award size={26} />
                  </div>
                  <div>
                    <img
                      src={l.image}
                      alt={l.name}
                      className="w-20 h-20 rounded-full object-cover mb-4"
                    />
                    <h3 className="text-xl font-bold">{l.name}</h3>
                    <div className="text-yellow-300 text-sm">{l.title}</div>
                    <p className="mt-3 text-slate-300 text-sm">{l.summary}</p>
                    <ul className="mt-3 text-slate-300 text-sm list-disc list-inside space-y-1">
                      {l.highlights.map((h) => <li key={h}>{h}</li>)}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  /* ---------------- TESTIMONIALS ---------------- */
  // function Testimonials() {
  //   return (
  //     <section id="testimonials" className="py-20 bg-black text-white">
  //       <div className="max-w-6xl mx-auto px-6">
  //         <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" initial="hidden" whileInView="show" variants={fadeUp}>Testimonials & Case Snippets</motion.h2>

  //         <div className="grid md:grid-cols-2 gap-6 mt-8">
  //           {COMPANY.testimonials.map((t, i) => (
  //             <motion.blockquote key={i} className="p-6 rounded-xl bg-gradient-to-br from-white/4 to-white/2 border border-white/6" initial="hidden" whileInView="show" variants={fadeUp}>
  //               <p className="text-slate-200">“{t.quote}”</p>
  //               <footer className="mt-4 text-yellow-300 font-semibold">— {t.name}</footer>
  //             </motion.blockquote>
  //           ))}
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }

  /* ---------------- CAREERS ---------------- */
  function Careers() {
    return (
      <section id="careers" className="py-20 bg-gradient-to-b from-[#07131a] to-[#031017] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2 className="text-3xl md:text-4xl font-bold" initial="hidden" whileInView="show" variants={fadeUp}>Careers — Join Our Hive</motion.h2>
          <motion.p className="text-slate-300 mt-4 max-w-2xl mx-auto" initial="hidden" whileInView="show" variants={fadeUp}>
            Join our team of passionate trainers, recruiters, and strategists shaping the workforce of tomorrow. We value learning, impact, and real-world outcomes.
          </motion.p>

          <motion.div className="mt-8 flex justify-center" initial="hidden" whileInView="show" variants={fadeUp}>
            <a href="#contact" onClick={(e) => scrollToSection(e, "contact")} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold shadow">Explore Opportunities <Briefcase size={16} /></a>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ---------------- CONTACT ---------------- */
  function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setStatus("Sending...");

      emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: "bbcllpindia@gmail.com", // fixed recipient
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_ID
        )
        .then(
          () => {
            setStatus("Message sent successfully ✅");
            if (window.fbq) {
              window.fbq('track', 'Contact');
            }
            setFormData({ name: "", email: "", message: "" });
          },
          () => {
            setStatus("Failed to send ❌. Please try again.");
          }
        );
    };

    return (
      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-slate-300 mb-6">
              Reach out for program design, recruitment partnerships, or student development collaborations.
            </p>

            <ContactLine icon={<Phone />} label="Phone" value={COMPANY.contact.phones.join(" / ")} />
            <ContactLine icon={<Mail />} label="Email" value={COMPANY.contact.email} />
            <ContactLine icon={<MapPin />} label="Address" value={COMPANY.contact.address} />
            <ContactLine icon={<Briefcase />} label="Website" value={COMPANY.contact.website} />
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-white/4 to-white/2 border border-white/6">
            <h4 className="font-semibold text-lg mb-4">Send an enquiry</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded bg-transparent border border-white/10 text-white placeholder:text-slate-400"
                placeholder="Your name"
                required
              />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded bg-transparent border border-white/10 text-white placeholder:text-slate-400"
                placeholder="Email"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 rounded bg-transparent border border-white/10 text-white placeholder:text-slate-400"
                rows="5"
                placeholder="Tell us about your requirement"
                required
              />
              <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 rounded bg-yellow-400 text-black font-semibold">
                Send Enquiry
              </button>
            </form>
            {status && <p className="mt-4 text-sm text-slate-300">{status}</p>}
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- FOOTER ---------------- */
  function Footer() {
    return (
      <footer className="bg-[#03080a] text-slate-400 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded overflow-hidden bg-white p-1">
              <img src={logo} alt="logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="text-white font-semibold">{COMPANY.name}</div>
              <div className="text-xs">Training • Recruitment • Student Programs</div>
            </div>
          </div>

          <div className="text-sm text-slate-400">© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</div>
        </div>
      </footer>
    );
  }

  /* ---------------- SMALL COMPONENTS ---------------- */
  function InfoStat({ label, value }) {
    return (
      <div>
        <div className="text-sm text-slate-300">{label}</div>
        <div className="text-lg font-semibold text-white">{value}</div>
      </div>
    );
  }

  function ContactLine({ icon, label, value }) {
    return (
      <div className="flex items-start gap-3">
        <div className="text-yellow-300 p-2 rounded bg-yellow-400/6">
          {icon}
        </div>
        <div>
          <div className="text-sm text-slate-300">{label}</div>
          <div className="text-white">{value}</div>
        </div>
      </div>
    );
  }

  function ArrowIcon() {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" className="inline-block" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    );
  }
}