import React from "react";
import { Link } from "react-router-dom";
import { COMPANY } from "../data/company";
import logo from "../assets/bumblebee-logo.jpg";

export default function Footer() {
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
              <div className="text-xs text-slate-500 uppercase tracking-widest font-medium mt-1">Capability • Execution • Impact</div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link to="/services" className="text-sm text-slate-400 hover:text-white transition-colors">Services</Link>
            <Link to="/leadership" className="text-sm text-slate-400 hover:text-white transition-colors">Leadership</Link>
            <Link to="/contact" className="text-sm text-slate-400 hover:text-white transition-colors">Contact</Link>
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
