import React, { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Briefcase, ArrowRight } from "lucide-react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { useCompany } from "../context/companyContextCore";
import { fadeUp, stagger } from "../utils/motion";

export default function Contact() {
  const COMPANY = useCompany();
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
          to_email: "bbcllpindia@gmail.com",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_ID
      )
      .then(
        () => {
          setStatus("Message sent successfully ✅");
          if (window.fbq) {
            window.fbq("track", "Contact");
          }
          setFormData({ name: "", email: "", message: "" });
        },
        () => {
          setStatus("Failed to send ❌. Please try again.");
        }
      );
  };

  return (
    <Layout>
      <SEO
        title="Contact Us — Calicut, Kerala"
        description="Reach Bumble Bee Corporate Solutions LLP for corporate training, academic partnerships, or Centre of Excellence collaborations. Based in Calicut, Kerala."
        path="/contact"
      />
      <section className="pt-32 pb-24 bg-[#010308] text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent opacity-50"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start relative z-10">
          <motion.div initial="hidden" whileInView="show" variants={stagger} viewport={{ once: true }}>
            <motion.div variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
              Connect With Us
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Collaborate</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 font-light mb-10 max-w-md">
              Reach out for corporate training interventions, academic partnerships, or Centre of Excellence collaborations.
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
              <h2 className="font-bold text-2xl mb-8 tracking-tight">Send an enquiry</h2>
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
    </Layout>
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
