import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
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

const TABS = [
  { key: "general", label: "General & Brand", icon: LayoutDashboard, Component: GeneralSection },
  { key: "contact", label: "Contact Details", icon: Phone, Component: ContactSection },
  { key: "services", label: "Services", icon: Briefcase, Component: ServicesSection },
  { key: "courses", label: "Courses", icon: GraduationCap, Component: CoursesSection },
  { key: "challenges", label: "Challenges", icon: ShieldAlert, Component: ChallengesSection },
  { key: "industries", label: "Industries", icon: Globe2, Component: IndustriesSection },
  { key: "testimonials", label: "Testimonials", icon: Quote, Component: TestimonialsSection },
  { key: "leaders", label: "Leadership", icon: Users, Component: LeadersSection },
];

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
      setStatus({ type: "success", message: "Changes saved. The live site will reflect these on next page load." });
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        <Loader2 className="animate-spin mr-2" size={18} /> Loading content…
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-red-600">
        Could not load site content. Is the backend server running?
      </div>
    );
  }

  const ActiveComponent = TABS.find((t) => t.key === activeTab)?.Component;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-100">
          <img
            src={content.logoUrl || logo}
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover border border-slate-200"
          />
          <div>
            <div className="text-sm font-bold text-slate-800 leading-tight">{content.short || "Bumble Bee"}</div>
            <div className="text-xs text-slate-400">Admin Panel</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-yellow-50 text-slate-900 border-r-2 border-yellow-400"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <Icon size={17} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 border border-slate-200"
          >
            <ExternalLink size={14} /> View site
          </a>
          <button
            onClick={handleLogout}
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 border border-red-100"
          >
            <LogOut size={14} /> Log out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-slate-800">Website Content Editor</h1>
            <p className="text-xs text-slate-400">Edit any section, then click Save to publish changes.</p>
          </div>
          <div className="flex items-center gap-3">
            {status && (
              <div
                className={`flex items-center gap-1.5 text-sm font-medium ${
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-yellow-400 text-slate-900 font-bold text-sm hover:bg-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </header>

        <div className="p-8 max-w-3xl">{ActiveComponent && <ActiveComponent content={content} update={update} />}</div>
      </main>
    </div>
  );
}
