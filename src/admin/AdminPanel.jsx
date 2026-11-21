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
    accent: "blue",
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
    accent: "violet",
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
  yellow: {
    dot: "bg-yellow-400",
    activeBg: "bg-yellow-50",
    activeText: "text-yellow-800",
    activeIcon: "bg-yellow-400 text-slate-900",
    idleIcon: "bg-yellow-50 text-yellow-600",
  },
  blue: {
    dot: "bg-blue-400",
    activeBg: "bg-blue-50",
    activeText: "text-blue-800",
    activeIcon: "bg-blue-400 text-white",
    idleIcon: "bg-blue-50 text-blue-600",
  },
  violet: {
    dot: "bg-violet-400",
    activeBg: "bg-violet-50",
    activeText: "text-violet-800",
    activeIcon: "bg-violet-400 text-white",
    idleIcon: "bg-violet-50 text-violet-600",
  },
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
      <div className="h-screen flex items-center justify-center bg-slate-50 text-slate-500 gap-2">
        <Loader2 className="animate-spin" size={18} /> Loading content…
      </div>
    );
  }

  if (!content) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 text-red-600 px-6 text-center">
        Could not load site content. Is the backend server running?
      </div>
    );
  }

  const activeMeta = ALL_TABS.find((t) => t.key === activeTab);
  const ActiveComponent = activeMeta?.Component;

  return (
    <div className="h-screen flex bg-slate-100 overflow-hidden">
      {/* Sidebar — fixed to viewport height, scrolls independently */}
      <aside className="w-72 h-screen flex flex-col bg-white border-r border-slate-200 shrink-0">
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-100 shrink-0">
          <img
            src={content.logoUrl || logo}
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
          />
          <div className="min-w-0">
            <div className="text-sm font-bold text-slate-800 leading-tight truncate">
              {content.short || "Bumble Bee"}
            </div>
            <div className="text-xs text-slate-400">Admin Panel</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {GROUPS.map((group) => {
            const colors = ACCENTS[group.accent];
            return (
              <div key={group.label}>
                <div className="flex items-center gap-2 px-2 mb-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
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
                        className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-left transition-colors ${
                          active ? colors.activeBg : "hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            active ? colors.activeIcon : colors.idleIcon
                          }`}
                        >
                          <Icon size={15} />
                        </span>
                        <span className="min-w-0">
                          <div
                            className={`text-sm font-semibold leading-tight truncate ${
                              active ? colors.activeText : "text-slate-700"
                            }`}
                          >
                            {tab.label}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">{tab.blurb}</div>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-100 space-y-1.5 shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 border border-slate-200 transition-colors"
          >
            <ExternalLink size={14} /> View live site
          </a>
          <button
            onClick={handleLogout}
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 border border-red-100 transition-colors"
          >
            <LogOut size={14} /> Log out
          </button>
        </div>
      </aside>

      {/* Main content — scrolls independently of the sidebar */}
      <main className="flex-1 h-screen flex flex-col min-w-0">
        <header className="shrink-0 bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-base font-bold text-slate-800 truncate">{activeMeta?.label}</h1>
            <p className="text-xs text-slate-400 truncate">{activeMeta?.blurb}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {status && (
              <div
                className={`hidden sm:flex items-center gap-1.5 text-sm font-medium ${
                  status.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {status.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                {status.message}
              </div>
            )}
            <button
              onClick={handleSave}
              disabled={saving || !dirty}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-yellow-400 text-slate-900 font-bold text-sm hover:bg-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? "Saving…" : "Save Changes"}
              {dirty && !saving && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />
              )}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-3xl">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              {ActiveComponent && <ActiveComponent content={content} update={update} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
