import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { COMPANY } from "../data/company";
import logo from "../assets/bumblebee-logo.jpg";

const NAV_LINKS = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/leadership", label: "Leadership" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

export default function Topbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `hover:text-yellow-400 transition ${isActive ? "text-yellow-400" : ""}`;

  return (
    <header className="fixed w-full z-50 top-0 bg-transparent">
      <div className="backdrop-blur-md bg-black/30 border-b border-white/6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 z-50">
            <div className="w-11 h-11 rounded-lg overflow-hidden shadow-md bg-white p-1">
              <img src={logo} alt="BumbleBee Corporate Solutions Logo" className="w-full h-full object-contain" />
            </div>
            <div className="text-white font-semibold leading-tight">
              <div className="text-base">{COMPANY.short} </div>
              <div className="text-xs text-slate-300 -mt-0.5">Corporate Solutions LLP</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm text-slate-200">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="ml-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 text-black font-semibold shadow"
            >
              Let's Talk
            </Link>
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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white font-bold hover:text-yellow-400 transition"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  );
}
