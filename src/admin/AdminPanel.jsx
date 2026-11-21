import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Phone,
  Briefcase,
  GraduationCap,
  ShieldAlert,
  Globe2,
  Quote,
  Users,
  LogOut,
  Save,
  ExternalLink,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import logo from "../assets/bumblebee-logo.jpg";
import { fetchContent, saveContent, clearToken } from "./adminApi";

import GeneralSection from "./sections/GeneralSection";
import ContactSection from "./sections/ContactSection";
import ServicesSection from "./sections/ServicesSection";
import CoursesSection from "./sections/CoursesSection";
import ChallengesSection from "./sections/ChallengesSection";
import IndustriesSection from "./sections/IndustriesSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import LeadersSection from "./sections/LeadersSection";

const GROUPS = [
  {
    label: "Brand & Basics",
    accent: "yellow",
    tabs: [
      {
        key: "general",
        label: "General & Brand",
        blurb: "Logo, name, tagline, about & vision",
        icon: Sparkles,
        Component: GeneralSection,
      },
      {
        key: "contact",
        label: "Contact Details",
        blurb: "Phone, email, address & website",
        icon: Phone,
        Component: ContactSection,
      },
    ],
  },
  {
    label: "What You Offer",
    accent: "sky",
    tabs: [
      {
        key: "services",
        label: "Services",
        blurb: "Your three practice areas",
        icon: Briefcase,
        Component: ServicesSection,
      },
      {
        key: "courses",
        label: "Courses",
        blurb: "Add, edit, or remove courses",
        icon: GraduationCap,
        Component: CoursesSection,
      },
    ],
  },
  {
    label: "Proof & People",
    accent: "rose",
    tabs: [
      {
        key: "challenges",
        label: "Challenges We Solve",
        blurb: "Business problems & solutions",
        icon: ShieldAlert,
        Component: ChallengesSection,
      },
      {
        key: "industries",
        label: "Industries",
        blurb: "Sectors you serve",
        icon: Globe2,
        Component: IndustriesSection,
      },
      {
        key: "testimonials",
        label: "Testimonials",
        blurb: "Client quotes",
        icon: Quote,
        Component: TestimonialsSection,
      },
      {
        key: "leaders",
        label: "Leadership",
        blurb: "Team photos & bios",
        icon: Users,
        Component: LeadersSection,
      },
    ],
  },
];

const ACCENTS = {
  yellow: { dot: "bg-yellow-400", chipText: "text-yellow-300" },
  sky: { dot: "bg-sky-400", chipText: "text-sky-300" },
  rose: { dot: "bg-rose-400", chipText: "text-rose-300" },
};

const ALL_TABS = GROUPS.flatMap((g) => g.tabs.map((t) => ({ ...t, accent: g.accent })));

export default function AdminPanel() {
  const [content, setContent] = useState(null);
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', message }
  const [dirty, setDirty] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContent()
      .then((data) => setContent(data))
      .catch(() => setStatus({ type: "error", message: "Could not load site content from the server." }))
      .finally(() => setLoading(false));
  }, []);

  function update(key, value) {
    setContent((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
    setStatus(null);
  }

  async function handleSave() {
    setSaving(true);
    setStatus(null);
    try {
      await saveContent(content);
      setStatus({ type: "success", message: "Saved! Changes are live." });
      setDirty(false);
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to save changes." });
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    clearToken();
    navigate("/admin/login", { replace: true });
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#030712] text-slate-400 gap-2">
        <Loader2 className="animate-spin" size={18} /> Loading content…
      </div>
    );
  }

  if (!content) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#030712] text-red-400 px-6 text-center">
        Could not load site content. Is the backend server running?
      </div>
    );
  }

  const activeMeta = ALL_TABS.find((t) => t.key === activeTab);
  const ActiveComponent = activeMeta?.Component;
  const activeColors = ACCENTS[activeMeta?.accent] || ACCENTS.yellow;

  return (
    <div className="h-screen flex bg-slate-100 overflow-hidden">
      {/* Sidebar — fixed to viewport height, dark brand treatment, scrolls independently */}
      <aside className="relative w-72 h-screen flex flex-col bg-[#030712] shrink-0 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-56 h-56 bg-yellow-500/10 rounded-full blur-[5rem] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-56 h-40 bg-blue-500/5 rounded-full blur-[5rem] pointer-events-none" />

        <div className="relative flex items-center gap-3 px-5 py-6 border-b border-white/5 shrink-0">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-yellow-400/30 blur-md" />
            <img
              src={content.logoUrl || logo}
              alt="Logo"
              className="relative w-11 h-11 rounded-full object-cover ring-2 ring-yellow-400/40 bg-white"
            />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-white leading-tight truncate">
              {content.short || "Bumble Bee"}
            </div>
            <div className="text-[11px] text-yellow-400/80 font-medium tracking-wide uppercase">Admin Studio</div>
          </div>
        </div>

        <nav className="admin-scroll relative flex-1 overflow-y-auto py-5 px-3 space-y-6">
          {GROUPS.map((group) => {
            const colors = ACCENTS[group.accent];
            return (
              <div key={group.label}>
                <div className="flex items-center gap-2 px-2.5 mb-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-slate-500">
                    {group.label}
                  </span>
                </div>
                <div className="space-y-1">
                  {group.tabs.map((tab) => {
                    const Icon = tab.icon;
                    const active = tab.key === activeTab;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`relative w-full flex items-center gap-3 pl-3.5 pr-2.5 py-2.5 rounded-xl text-left transition-colors ${
                          active ? "bg-slate-800/80" : "hover:bg-white/5"
                        }`}
                      >
                        {active && (
                          <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-yellow-400" />
                        )}
                        <span
                          className={`relative w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            active
                              ? "bg-gradient-to-br from-yellow-300 to-yellow-500 text-slate-900 shadow-[0_0_0.5rem_rgba(250,204,21,0.4)]"
                              : "bg-white/5 text-slate-400"
                          }`}
                        >
                          <Icon size={16} strokeWidth={2.25} />
                        </span>
                        <span className="min-w-0">
                          <div
                            className={`text-sm font-bold leading-tight truncate ${
                              active ? "text-white" : "text-slate-300"
                            }`}
                          >
                            {tab.label}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">{tab.blurb}</div>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="relative p-3 border-t border-white/5 space-y-1.5 shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-300 hover:bg-white/5 border border-white/10 transition-colors"
          >
            <ExternalLink size={14} /> View live site
          </a>
          <button
            onClick={handleLogout}
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-400/10 border border-rose-400/20 transition-colors"
          >
            <LogOut size={14} /> Log out
          </button>
        </div>
      </aside>

      {/* Main content — scrolls independently of the sidebar */}
      <main className="flex-1 h-screen flex flex-col min-w-0">
        <header className="shrink-0 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-5 flex items-center justify-between gap-4">
          <div className="min-w-0 flex items-center gap-3">
            <span
              className={`hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900 border border-slate-800 ${activeColors.chipText}`}
            >
              {GROUPS.find((g) => g.accent === activeMeta?.accent)?.label}
            </span>
            <div className="min-w-0">
              <h1 className="text-xl font-black text-slate-900 tracking-tight truncate">{activeMeta?.label}</h1>
              <p className="text-xs text-slate-400 truncate">{activeMeta?.blurb}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {status && (
              <div
                className={`hidden md:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
                  status.type === "success" ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50"
                }`}
              >
                {status.type === "success" ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                {status.message}
              </div>
            )}
            <button
              onClick={handleSave}
              disabled={saving || !dirty}
              className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-black text-sm shadow-[0_8px_24px_-8px_rgba(250,204,21,0.6)] hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:shadow-none transition-all"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? "Saving…" : "Save Changes"}
              {dirty && !saving && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 border-2 border-white animate-pulse" />
              )}
            </button>
          </div>
        </header>

        <div className="admin-scroll flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 to-slate-100">
          <div className="p-8 max-w-3xl">
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.25)] p-6 sm:p-9">
              {ActiveComponent && <ActiveComponent content={content} update={update} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
