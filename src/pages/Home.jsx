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
  Play,
  Menu,
  X
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 top-0 bg-transparent">
      <div className="backdrop-blur-md bg-black/30 border-b border-white/6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#hero" onClick={(e) => scrollToSection(e, "hero")} className="flex items-center gap-3 z-50">
            <div className="w-11 h-11 rounded-lg overflow-hidden shadow-md bg-white p-1">
              <img src={logo} alt="BumbleBee Corporate Solutions Logo" className="w-full h-full object-contain" />
            </div>
            <div className="text-white font-semibold leading-tight">
              <div className="text-base">{COMPANY.short} </div>
              <div className="text-xs text-slate-300 -mt-0.5">Corporate Solutions LLP</div>
            </div>
          </a>

          {/* Desktop Nav */}
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

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden z-50 text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-[#030712]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 pt-16 lg:hidden"
        >
            <a href="#about" onClick={(e) => { setIsOpen(false); scrollToSection(e, "about"); }} className="text-2xl text-white font-bold hover:text-yellow-400 transition">About</a>
            <a href="#services" onClick={(e) => { setIsOpen(false); scrollToSection(e, "services"); }} className="text-2xl text-white font-bold hover:text-yellow-400 transition">Services</a>
            <a href="#industries" onClick={(e) => { setIsOpen(false); scrollToSection(e, "industries"); }} className="text-2xl text-white font-bold hover:text-yellow-400 transition">Industries</a>
            <a href="#leadership" onClick={(e) => { setIsOpen(false); scrollToSection(e, "leadership"); }} className="text-2xl text-white font-bold hover:text-yellow-400 transition">Leadership</a>
            <a href="/#/workshop" onClick={() => setIsOpen(false)} className="text-xl text-red-400 font-bold animate-pulse">Live Workshop</a>
            <a href="#contact" onClick={(e) => { setIsOpen(false); scrollToSection(e, "contact"); }} className="text-2xl text-white font-bold hover:text-yellow-400 transition">Contact</a>
        </motion.div>
      )}
    </header>
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
         
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/40 via-[#030712]/80 to-[#030712]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-12 gap-16 lg:gap-10 items-center">
        
        {/* Left Content - Messaging */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="lg:col-span-6 space-y-8 text-center lg:text-left"
        >
          <motion.div variants={fadeUp} className="flex justify-center lg:justify-start">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 backdrop-blur-md shadow-[0_0_0.9375rem_rgba(250,204,21,0.1)]">
              <Building2 size={16} className="text-yellow-400" />
              <span className="text-sm font-semibold tracking-wide text-yellow-400 uppercase">Premium Corporate Training</span>
            </div>
          </motion.div>

          <motion.h1 
            variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]"
          >
            Empowering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600">
              Your Workforce
            </span>
          </motion.h1>

          <motion.p 
            variants={fadeUp}
            className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-lg mx-auto lg:mx-0"
          >
            We bridge the gap between talent development and organizational success through expert-led workshops and recruitment solutions.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
             <a
              href="#services"
              onClick={(e) => scrollToSection(e, "services")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform"
            >
              Explore Solutions
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 backdrop-blur-md transition-colors"
            >
              Consult With Us
            </a>
          </motion.div>
        </motion.div>

        {/* Right Content - Workshop Highlight Card */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1, type: "spring", stiffness: 50 }}
          className="lg:col-span-6 w-full max-w-lg mx-auto lg:max-w-none"
        >
          <div className="relative group rounded-3xl p-[0.0625rem] bg-gradient-to-b from-white/20 to-white/5 hover:from-yellow-400/50 hover:to-white/10 transition-colors duration-500 shadow-2xl">
            {/* Inner Card Background */}
            <div className="absolute inset-0 bg-[#0a0a0a] rounded-3xl overflow-hidden">
               {/* Decorative background image of Jiju */}
               <div className="absolute inset-0 bg-[url('/images/jiju.jpeg')] bg-cover bg-top opacity-90 group-hover:scale-105 transition-transform duration-1000"></div>
               {/* Darker gradient overlay to keep text readable without blurring the image */}
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/10"></div>
            </div>

            {/* Card Content */}
            <div className="relative p-8 md:p-10 rounded-3xl flex flex-col h-full z-10">
               
               {/* Top Badges */}
               <div className="flex items-start mb-16">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0a0a0a]/80 backdrop-blur-md text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30 shadow-lg">
                     <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                     Live Masterclass
                  </div>
               </div>

               {/* Text content */}
               <div className="mt-auto space-y-6">
                  <div>
                    <div className="text-yellow-400 font-bold tracking-widest text-sm mb-2 uppercase">Most Requested Session</div>
                    <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                       Personal Finance: <br />
                       <span className="italic font-serif text-slate-300 font-medium">The Untold Story</span>
                    </h3>
                  </div>
                  
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                     Bridge the gap between knowing what to do with your money and actually doing it. Join our exclusively curated, frequently held workshop.
                  </p>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md gap-4">
                     <div>
                        <div className="text-[0.625rem] text-slate-400 uppercase tracking-widest font-bold mb-1">Next Session</div>
                        <div className="text-white font-bold tracking-wide">9th May, 2026</div>
                     </div>
                     <div className="hidden sm:block w-px h-8 bg-white/10"></div>
                     <div>
                        <div className="text-[0.625rem] text-slate-400 uppercase tracking-widest font-bold mb-1">Format</div>
                        <div className="text-white font-bold flex items-center gap-1.5">
                           <Play size={14} className="text-yellow-400"/> Online
                        </div>
                     </div>
                  </div>

                  <a
                    href="/#/workshop"
                    className="w-full flex justify-center items-center gap-2 px-8 py-5 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_0_1.875rem_rgba(250,204,21,0.25)]"
                  >
                    Reserve Your Spot
                  </a>
               </div>
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
      <section id="about" className="py-24 relative bg-[#030712] overflow-hidden">
        {/* Decorative elements */}
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
               <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight" variants={fadeUp}>
                 Nurturing Potential, <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">Delivering Excellence.</span>
               </motion.h2>
            </div>
            
            <motion.p className="text-lg text-slate-400 font-light leading-relaxed border-l-2 border-yellow-500/50 pl-6" variants={fadeUp}>
              {COMPANY.about}
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
                {/* Glowing ring behind */}
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/20 to-transparent rounded-[3rem] blur-2xl animate-pulse"></div>
                {/* Glass container */}
                <div className="relative h-full w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden p-8 flex items-center justify-center transform transition-transform hover:scale-[1.02] duration-500">
                   <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 mix-blend-overlay"></div>
                   <img src={logo} alt="BumbleBee Corporate Solutions" className="w-full h-full object-contain filter drop-shadow-[0_0_1.25rem_rgba(255,255,255,0.1)] relative z-10" />
                </div>
             </div>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ---------------- KEY CHALLENGES ---------------- */
  function KeyChallenges() {
    return (
      <section id="challenges" className="py-24 bg-[#010308] text-white relative">
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
            {COMPANY.challenges.map((c, i) => (
              <motion.div
                key={c.title}
                className="group relative p-[0.0625rem] rounded-3xl bg-gradient-to-b from-white/10 to-white/5 hover:from-yellow-400/30 hover:to-white/10 transition-colors duration-500 overflow-hidden"
                variants={fadeUp}
              >
                 <div className="absolute inset-0 bg-[#0a0a0a]"></div>
                 <div className="absolute -inset-24 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>
                 
                 <div className="relative h-full p-8 rounded-3xl bg-black/40 backdrop-blur-md flex flex-col z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-yellow-400 mb-6 group-hover:scale-110 group-hover:bg-yellow-400/10 transition-all duration-300 shadow-lg">
                      <Users2 size={24} />
                    </div>
                    <h4 className="font-bold text-xl text-white mb-3 leading-snug">{c.title}</h4>
                    <p className="mt-auto text-slate-400 text-sm leading-relaxed font-light">{c.solution}</p>
                 </div>
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
      <section id="services" className="py-24 relative bg-[#030712] text-white overflow-hidden">
        {/* Glow */}
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[80%] h-[31.25rem] bg-gradient-to-r from-yellow-500/10 via-yellow-600/5 to-transparent rounded-full blur-[6.25rem] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <motion.div initial="hidden" whileInView="show" variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-yellow-500 tracking-widest uppercase mb-4 shadow-[0_0_0.9375rem_rgba(234,179,8,0.1)]">
                Our Expertise
             </motion.div>
             <motion.h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight" initial="hidden" whileInView="show" variants={fadeUp}>
                Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Solutions</span>
             </motion.h2>
             <motion.p className="text-lg text-slate-400 font-light" initial="hidden" whileInView="show" variants={fadeUp}>
               Combining corporate experience, data-driven methods, and applied learning to enable organizations and students to thrive.
             </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {/* Service 1 */}
            <motion.div className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-yellow-500/30 transition-all duration-500 flex flex-col h-full shadow-2xl" whileHover={{ y: -10 }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-3xl rounded-full group-hover:bg-yellow-500/20 transition-colors duration-500"></div>
              <div className="relative z-10">
                 <div className="w-14 h-14 mb-8 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black shadow-lg">
                   <Users size={28} />
                 </div>
                 <h3 className="text-2xl font-bold mb-4 tracking-tight">Corporate Training</h3>
                 <p className="text-slate-400 text-sm leading-relaxed font-light mb-8">Tailored training for leadership, sales, and domain-specific capability enhancement.</p>
                 <ul className="mt-auto space-y-3">
                   {COMPANY.services.corporateTraining.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-slate-300">
                         <div className="mt-1 w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0"></div>
                         <span className="leading-snug">{s}</span>
                      </li>
                   ))}
                 </ul>
              </div>
            </motion.div>

            {/* Service 2 */}
            <motion.div className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-500 flex flex-col h-full shadow-2xl" whileHover={{ y: -10 }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-colors duration-500"></div>
              <div className="relative z-10">
                 <div className="w-14 h-14 mb-8 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-lg">
                   <Building2 size={28} />
                 </div>
                 <h3 className="text-2xl font-bold mb-4 tracking-tight">Recruitment Consultancy</h3>
                 <p className="text-slate-400 text-sm leading-relaxed font-light mb-8">End-to-end hiring for executive, mid, and entry-level roles perfectly matched to your culture.</p>
                 <ul className="mt-auto space-y-3">
                   {COMPANY.services.recruitment.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-slate-300">
                         <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                         <span className="leading-snug">{s}</span>
                      </li>
                   ))}
                 </ul>
              </div>
            </motion.div>

            {/* Service 3 */}
            <motion.div className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-500 flex flex-col h-full shadow-2xl" whileHover={{ y: -10 }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full group-hover:bg-emerald-500/20 transition-colors duration-500"></div>
              <div className="relative z-10">
                 <div className="w-14 h-14 mb-8 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-lg">
                   <GraduationCap size={28} />
                 </div>
                 <h3 className="text-2xl font-bold mb-4 tracking-tight">Student Development</h3>
                 <p className="text-slate-400 text-sm leading-relaxed font-light mb-8">Specialized programs to prepare students for higher studies and immediate employability.</p>
                 <ul className="mt-auto space-y-3">
                   {COMPANY.services.studentPrograms.map((s) => (
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

  /* ---------------- UPCOMING WORKSHOP ---------------- */
  function UpcomingWorkshop() {
    return (
      <section id="workshop-cta" className="py-24 bg-[#010308] text-white relative overflow-hidden">
        {/* Dynamic Abstract Background */}
        <div className="absolute inset-0 z-0">
           <div className="absolute top-[10%] right-[10%] w-[40%] h-[80%] rounded-full bg-gradient-to-l from-yellow-500/20 to-transparent blur-[7.5rem]"></div>
           <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[50%] rounded-full bg-red-600/10 blur-[6.25rem]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="w-full bg-white/[0.02] border border-white/[0.05] rounded-[3rem] p-8 md:p-12 lg:p-16 backdrop-blur-3xl shadow-2xl overflow-hidden relative group">
             {/* Subtle scanline overlay */}
             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBkPSJNMCAwaDR2MUgweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPgo8L3N2Zz4=')] opacity-50 mix-blend-overlay pointer-events-none"></div>
             
             <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 relative z-10">
                <motion.div
                  className="lg:w-2/3 space-y-8"
                  initial="hidden"
                  whileInView="show"
                  variants={stagger}
                >
                  <motion.div variants={fadeUp} className="inline-flex items-center gap-2">
                     <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                     <span className="text-red-400 font-black tracking-widest uppercase text-xs">Seats Filling Fast</span>
                  </motion.div>
                  
                  <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                    Personal Finance: <br />
                    <span className="italic font-serif text-slate-300 font-medium">The Untold Story of Behavior</span>
                  </motion.h2>
                  
                  <motion.p variants={fadeUp} className="text-lg text-slate-400 font-light leading-relaxed max-w-xl">
                    A transformative masterclass bridging the gap between financial knowing and financial doing. Master the behavioral hacks to fix lifestyle inflation.
                  </motion.p>
                  
                  <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6">
                    <a
                      href="/#/workshop"
                      className="px-8 py-5 rounded-2xl bg-yellow-400 text-black font-black text-lg hover:scale-105 active:scale-95 transition-transform shadow-[0_0_1.875rem_rgba(250,204,21,0.2)] flex items-center gap-3"
                    >
                      Book My Seat — ₹199 <ArrowRight size={20} />
                    </a>
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
                      <div className="flex -space-x-3">
                         <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#010308] flex items-center justify-center text-[0.625rem]">+80</div>
                      </div>
                      <span>Professionals already registered</span>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="lg:w-1/3 w-full max-w-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-yellow-500/30 transition-colors duration-500">
                     <img src="/images/jiju.jpeg" alt="Jiju K" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                     <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                        <div className="font-black text-xl mb-1">Jiju K</div>
                        <div className="text-sm text-yellow-400 font-bold uppercase tracking-wider">BFSI Expert & CEO</div>
                     </div>
                  </div>
                </motion.div>
             </div>
          </div>
        </div>
      </section>
    );
  }


  /* ---------------- INDUSTRIES ---------------- */
  function Industries() {
    return (
      <section id="industries" className="py-24 bg-[#030712] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
             <div className="max-w-2xl">
                <motion.div initial="hidden" whileInView="show" variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
                   Domain Expertise
                </motion.div>
                <motion.h2 className="text-4xl md:text-5xl font-black tracking-tight" initial="hidden" whileInView="show" variants={fadeUp}>
                   Industries We <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Elevate</span>
                </motion.h2>
             </div>
             <motion.p className="text-lg text-slate-400 font-light max-w-sm md:text-right" initial="hidden" whileInView="show" variants={fadeUp}>
               Focused domain expertise ensuring measurable results tailored to your specific sector.
             </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY.industries.map((ind, i) => (
              <motion.div
                key={ind}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <h4 className="font-bold text-xl text-white mb-3 relative z-10">{ind}</h4>
                <p className="text-slate-400 text-sm font-light leading-relaxed relative z-10">
                  Custom solutions tailored for this sector, leveraging BFSI experience and modern delivery methods.
                </p>
                <div className="mt-8 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-yellow-400 group-hover:text-black transition-colors relative z-10">
                   <ArrowRight size={16} />
                </div>
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
      <section id="leadership" className="py-24 bg-[#010308] text-white relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <motion.div initial="hidden" whileInView="show" variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
                The Architects
             </motion.div>
             <motion.h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight" initial="hidden" whileInView="show" variants={fadeUp}>
                Leadership & <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Promoters</span>
             </motion.h2>
          </div>
          
          <motion.div className="grid md:grid-cols-2 gap-8 lg:gap-12" initial="hidden" whileInView="show" variants={stagger} viewport={{ once: true }}>
            {COMPANY.leaders.map((l) => (
              <motion.div key={l.name} className="group p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-500 relative overflow-hidden">
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
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight">{l.name}</h3>
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
      <section id="careers" className="py-24 bg-[#030712] text-white relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
           <div className="w-[80%] h-[18.75rem] bg-gradient-to-b from-yellow-500/10 to-transparent blur-[6.25rem] rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial="hidden" whileInView="show" variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
             Join Our Hive
          </motion.div>
          <motion.h2 className="text-4xl md:text-5xl font-black tracking-tight" initial="hidden" whileInView="show" variants={fadeUp}>
             Shape the Workforce of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Tomorrow</span>
          </motion.h2>
          <motion.p className="text-lg text-slate-400 font-light mt-6 max-w-2xl mx-auto" initial="hidden" whileInView="show" variants={fadeUp}>
            Join our elite team of passionate trainers, recruiters, and strategists. We value continuous learning, measurable impact, and real-world outcomes.
          </motion.p>

          <motion.div className="mt-10 flex justify-center" initial="hidden" whileInView="show" variants={fadeUp}>
            <a href="#contact" onClick={(e) => scrollToSection(e, "contact")} className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold shadow-[0_0_1.25rem_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all">
               Explore Opportunities 
               <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                  <Briefcase size={16} />
               </div>
            </a>
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
      <section id="contact" className="py-24 bg-[#010308] text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start relative z-10">
          <motion.div initial="hidden" whileInView="show" variants={stagger} viewport={{ once: true }}>
            <motion.div variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
               Connect With Us
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Collaborate</span></motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 font-light mb-10 max-w-md">
              Reach out for program design, recruitment partnerships, or student development collaborations.
            </motion.p>

            <motion.div variants={stagger} className="space-y-6">
               <ContactLine icon={<Phone />} label="Phone" value={COMPANY.contact.phones.join(" / ")} />
               <ContactLine icon={<Mail />} label="Email" value={COMPANY.contact.email} />
               <ContactLine icon={<MapPin />} label="Address" value={COMPANY.contact.address} />
               <ContactLine icon={<Briefcase />} label="Website" value={COMPANY.contact.website} />
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-700"></div>
            
            <div className="relative p-8 md:p-10 rounded-[2.5rem] bg-[#0a0a0a] border border-white/10 shadow-2xl">
              <h4 className="font-bold text-2xl mb-8 tracking-tight">Send an enquiry</h4>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                   <input
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-yellow-500/50 focus:bg-white/[0.05] transition-all text-white placeholder:text-slate-500 outline-none"
                     placeholder="Full Name"
                     required
                   />
                </div>
                <div>
                   <input
                     name="email"
                     type="email"
                     value={formData.email}
                     onChange={handleChange}
                     className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-yellow-500/50 focus:bg-white/[0.05] transition-all text-white placeholder:text-slate-500 outline-none"
                     placeholder="Business Email"
                     required
                   />
                </div>
                <div>
                   <textarea
                     name="message"
                     value={formData.message}
                     onChange={handleChange}
                     className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-yellow-500/50 focus:bg-white/[0.05] transition-all text-white placeholder:text-slate-500 outline-none resize-none"
                     rows="4"
                     placeholder="Tell us about your requirement..."
                     required
                   />
                </div>
                <button type="submit" className="w-full flex justify-center items-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_0_1.25rem_rgba(250,204,21,0.2)]">
                  Send Enquiry <ArrowRight size={18} />
                </button>
              </form>
              {status && <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-center text-slate-300 animate-fade-in">{status}</div>}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ---------------- FOOTER ---------------- */
  function Footer() {
    return (
      <footer className="bg-[#030712] border-t border-white/5 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl bg-white p-1.5 shadow-[0_0_0.9375rem_rgba(255,255,255,0.1)]">
                 <img src={logo} alt="logo" className="w-full h-full object-contain" />
               </div>
               <div>
                 <div className="text-white font-bold tracking-wide">{COMPANY.name}</div>
                 <div className="text-xs text-slate-500 uppercase tracking-widest font-medium mt-1">Training • Recruitment • Impact</div>
               </div>
             </div>
             
             <div className="flex gap-4">
                <a href="#services" className="text-sm text-slate-400 hover:text-white transition-colors">Services</a>
                <a href="#leadership" className="text-sm text-slate-400 hover:text-white transition-colors">Leadership</a>
                <a href="#contact" className="text-sm text-slate-400 hover:text-white transition-colors">Contact</a>
             </div>
           </div>
           
           <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>
           
           <div className="text-center text-sm text-slate-600">
              © {new Date().getFullYear()} {COMPANY.name}. All rights reserved. <br className="md:hidden" />
              <span className="hidden md:inline"> | </span> Empowering the workforce of tomorrow.
           </div>
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
      <div className="group flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-yellow-500/20 transition-all">
        <div className="text-yellow-400 p-3 rounded-xl bg-yellow-500/10 group-hover:scale-110 transition-transform shadow-inner">
          {icon}
        </div>
        <div>
          <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">{label}</div>
          <div className="text-white font-medium">{value}</div>
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