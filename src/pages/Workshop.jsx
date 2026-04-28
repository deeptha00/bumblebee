import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Target,
    Brain,
    Zap,
    ArrowRight,
    CheckCircle2,
    X,
    MessageCircle,
    ShieldCheck,
    TrendingUp,
    PieChart as PieIcon,
    GraduationCap,
    Award,
    BookOpen
} from "lucide-react";
import logo from "../assets/bumblebee-logo.jpg";

// ---------- Animation variants ----------
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
};

export default function Workshop() {
    const [step, setStep] = useState("LANDING"); // LANDING, REGISTER, PAYMENT, SUCCESS
    const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "" });
    const [serverAwake, setServerAwake] = useState(false);
    const [whatsappLink, setWhatsappLink] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    // Wake up the Render server as soon as the page loads
    React.useEffect(() => {
        const wakeServer = async () => {
            try {
                await fetch(import.meta.env.VITE_API_URL || 'http://localhost:5000');
                setServerAwake(true);
            } catch (err) {
                console.log("Server is still waking up...");
            }
        };
        wakeServer();
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsRegistering(true);
        // Track the InitiateCheckout event for Facebook ads
        if (window.fbq) {
            window.fbq('track', 'InitiateCheckout');
        }
        
        try {
            await fetch('https://formspree.io/f/xlgaqdgj', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    whatsapp: formData.whatsapp,
                    source: "BumbleBee Workshop Registration"
                })
            });
        } catch (error) {
            console.error("Formspree submission error:", error);
        }
        
        setIsRegistering(false);
        setStep("PAYMENT");
    };

    const handlePaymentSuccess = (link) => {
        if (link) setWhatsappLink(link);
        // Track the purchase event for Facebook ads
        if (window.fbq) {
            window.fbq('track', 'Purchase', {
                value: 199.00,
                currency: 'INR'
            });
        }
        setStep("SUCCESS");
    };

    return (
        <div className="min-h-screen bg-[#030712] text-white selection:bg-yellow-500 selection:text-black font-sans relative overflow-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-2xl bg-[#030712]/60 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-white p-1 shadow-[0_0_0.9375rem_rgba(255,255,255,0.1)]">
                            <img src={logo} alt="BumbleBee" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">BumbleBee <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">Workshop</span></span>
                    </div>
                    <button
                        onClick={() => {
                            if (window.fbq) window.fbq('track', 'Lead');
                            setStep("REGISTER");
                        }}
                        className="px-4 py-2 text-sm md:text-base md:px-6 md:py-2.5 rounded-full bg-yellow-400 text-black font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_1.25rem_rgba(250,204,21,0.2)]"
                    >
                        Reserve Spot
                    </button>
                </div>
            </nav>

            <AnimatePresence mode="wait">
                {step === "LANDING" && (
                    <LandingPage key="landing" onStart={() => setStep("REGISTER")} />
                )}

                {step === "REGISTER" && (
                    <RegistrationForm
                        key="register"
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleRegister}
                        onBack={() => setStep("LANDING")}
                        isRegistering={isRegistering}
                    />
                )}

                {step === "PAYMENT" && (
                    <PaymentStep
                        key="payment"
                        onSuccess={handlePaymentSuccess}
                        onBack={() => setStep("REGISTER")}
                        formData={formData}
                    />
                )}

                {step === "SUCCESS" && (
                    <ThankYouPage key="success" whatsappLink={whatsappLink} />
                )}
            </AnimatePresence>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 bg-black">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Bumble Bee Corporate Solutions Private Limited. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

function LandingPage({ onStart }) {
    return (
        <motion.main
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
            variants={stagger}
            className="pt-24 pb-20 relative"
        >
            {/* Dynamic Ambient Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-luminosity"
                >
                    <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/40 via-[#030712]/80 to-[#030712]"></div>
                
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }} 
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-yellow-500/10 blur-[7.5rem]"
                ></motion.div>
                <motion.div 
                    animate={{ scale: [1, 1.3, 1], x: [0, -50, 0], y: [0, 50, 0] }} 
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[20%] right-[10%] w-[40%] h-[60%] rounded-full bg-blue-600/10 blur-[7.5rem]"
                ></motion.div>
            </div>

            {/* Hero Section */}
            <section className="min-h-[85vh] max-w-7xl mx-auto px-6 relative z-10 flex items-center mb-16">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-10 items-center w-full">
                    
                    {/* Left Content - Messaging */}
                    <motion.div variants={fadeUp} className="lg:col-span-7 space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-sm font-bold tracking-widest uppercase shadow-[0_0_0.9375rem_rgba(250,204,21,0.1)]">
                            <Zap size={14} />
                            <span>Limited Capacity Workshop</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">
                            "I know what to do. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600">
                                But I don't know why I don't do it."
                            </span>
                        </h1>

                        <p className="max-w-2xl text-slate-300 text-lg md:text-xl leading-relaxed font-light mx-auto lg:mx-0">
                            Does this sound like your financial life? You know you should save. You know you should invest.
                            But something always gets in the way. It's not a lack of discipline—it's a lack of <span className="text-white font-medium">behavioral design</span>.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
                            <button
                                onClick={() => {
                                    if (window.fbq) window.fbq('track', 'Lead');
                                    onStart();
                                }}
                                className="w-full sm:w-auto px-10 py-5 rounded-full bg-yellow-400 text-black font-black text-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_0_1.875rem_rgba(250,204,21,0.3)]"
                            >
                                Claim My Spot <ArrowRight size={24} />
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Content - Floating Glass Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 1, type: "spring", stiffness: 50 }}
                        className="lg:col-span-5 w-full max-w-lg mx-auto lg:max-w-none"
                    >
                        <div className="relative group rounded-[2.5rem] p-[0.0625rem] bg-gradient-to-b from-white/20 to-white/5 hover:from-yellow-400/50 hover:to-white/10 transition-colors duration-500 shadow-2xl">
                            <div className="absolute inset-0 bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden">
                                <div className="absolute inset-0 bg-[url('/images/workshop-group.png')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000 mix-blend-luminosity"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/20"></div>
                            </div>
                            
                            <div className="relative p-8 md:p-10 flex flex-col h-full z-10 space-y-12">
                                <div className="flex justify-between items-start">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0a0a0a]/80 backdrop-blur-md text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30 shadow-lg">
                                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                                        Live Masterclass
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-yellow-400 backdrop-blur-md">
                                        <TrendingUp size={24} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <div className="text-yellow-400 font-bold tracking-widest text-sm mb-2 uppercase">Expert Workshop</div>
                                        <h3 className="text-3xl font-black text-white leading-tight">
                                            Personal Finance: <br />
                                            <span className="italic font-serif text-slate-300 font-medium">The Untold Story</span>
                                        </h3>
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Identify the emotional triggers holding back your wealth. Stop relying on willpower, and start building automated financial behaviors.
                                    </p>
                                </div>

                                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Date</span>
                                        <span className="text-white font-bold tracking-wide">9th May, 2026</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-1">
                                        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Time</span>
                                        <span className="text-yellow-400 font-bold tracking-wide">10:00 AM — 11:30 AM IST</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats / Pie Chart Section */}
            <section className="py-24 relative z-10">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div variants={fadeUp} className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
                            Stop Blaming Your Willpower. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Fix Your System.</span>
                        </h2>
                        <p className="text-slate-400 text-lg font-light">
                            The Untold Secret: <span className="text-white font-bold text-2xl ml-2 tracking-tight">20% is the Math, 80% is the Mindset.</span>
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors shadow-lg">
                                <div className="p-4 rounded-2xl bg-white/5 text-slate-400 shadow-inner"><PieIcon size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-lg">20% Knowledge</h4>
                                    <p className="text-slate-400 text-sm font-light mt-1">The spreadsheets and the calculations.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-5 rounded-3xl bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/15 transition-colors shadow-lg relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-black shadow-lg relative z-10"><Target size={24} /></div>
                                <div className="relative z-10">
                                    <h4 className="font-bold text-lg text-yellow-400">80% Behavior</h4>
                                    <p className="text-slate-300 text-sm font-light mt-1">The emotional triggers and the subconscious habits.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeUp} className="relative mx-auto lg:ml-auto w-full max-w-lg aspect-square">
                        <div className="absolute inset-0 bg-yellow-500/5 blur-[6.25rem] rounded-full pointer-events-none" />
                        <div className="relative h-full w-full rounded-[3rem] border border-white/10 shadow-2xl bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center p-10 relative">
                            {/* Abstract visualization */}
                            <div className="relative w-full aspect-square max-w-[18.75rem] mx-auto flex items-center justify-center">
                                {/* SVG Ring */}
                                <svg viewBox="0 0 300 300" className="w-full h-full transform -rotate-90 drop-shadow-[0_0_1.25rem_rgba(250,204,21,0.2)]">
                                    <circle cx="150" cy="150" r="120" stroke="rgba(255,255,255,0.05)" strokeWidth="24" fill="none" />
                                    <motion.circle 
                                        initial={{ strokeDasharray: "0 1000" }}
                                        whileInView={{ strokeDasharray: "603.18 1000" }} 
                                        transition={{ duration: 2, ease: "easeOut" }}
                                        cx="150" cy="150" r="120" 
                                        stroke="url(#yellowGradient)" 
                                        strokeWidth="24" 
                                        fill="none" 
                                        strokeLinecap="round" 
                                    />
                                    <defs>
                                        <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#FDE047" />
                                            <stop offset="50%" stopColor="#EAB308" />
                                            <stop offset="100%" stopColor="#A16207" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                {/* Inner Content */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 tracking-tighter">
                                        80%
                                    </div>
                                    <div className="text-slate-400 font-bold uppercase tracking-widest text-sm mt-1">Behavior</div>
                                </div>
                            </div>

                            {/* Floating 20% Badge */}
                            <motion.div 
                                animate={{ y: [-8, 8, -8] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-10 right-10 px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl flex items-center gap-4 z-10"
                            >
                                <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                                <div>
                                    <div className="text-white font-black text-xl leading-none">20%</div>
                                    <div className="text-slate-500 text-[0.625rem] font-bold uppercase tracking-widest mt-1">Math</div>
                                </div>
                            </motion.div>
                            
                            {/* Decorative Elements */}
                            <div className="absolute bottom-10 left-10 text-left">
                                <div className="w-10 h-1 bg-yellow-500/30 rounded-full mb-3"></div>
                                <div className="text-[0.625rem] text-slate-500 font-bold uppercase tracking-widest">Bridging the gap</div>
                                <div className="text-sm font-light text-slate-400 mt-1">From Knowing to Doing</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Comparison Table Section */}
            <section className="py-32 max-w-7xl mx-auto px-6 relative z-10">
                <motion.div variants={fadeUp} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Traditional Solutions <span className="text-slate-500">Fail.</span></h2>
                    <p className="text-slate-400 font-light text-lg">We focus on the 80% that everyone else ignores.</p>
                </motion.div>

                <motion.div variants={fadeUp} className="overflow-x-auto rounded-3xl bg-white/[0.02] border border-white/[0.05] p-1 shadow-2xl backdrop-blur-xl">
                    <table className="w-full border-collapse min-w-[40rem]">
                        <thead>
                            <tr className="border-b border-white/10 text-left bg-white/5">
                                <th className="py-6 px-6 text-slate-400 font-bold uppercase tracking-widest text-xs rounded-tl-2xl">The Frustration</th>
                                <th className="py-6 px-6 text-slate-400 font-bold uppercase tracking-widest text-xs">The "Old" Solution</th>
                                <th className="py-6 px-6 text-yellow-400 font-black uppercase tracking-widest text-xs bg-yellow-500/10 rounded-tr-2xl relative">
                                   <div className="absolute top-0 left-0 w-full h-px bg-yellow-400"></div>
                                   Our Approach
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[
                                { frustration: '"I know I should save..."', old: '"Just try harder."', new: 'We identify the emotional trigger that makes you spend.' },
                                { frustration: '"I know I should invest..."', old: '"Read this 50-page book."', new: 'We align your personality with your portfolio.' },
                                { frustration: '"I know I should budget..."', old: '"Use this complex app."', new: 'We fix the Lifestyle Inflation that makes budgeting impossible.' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="py-8 px-6 text-lg italic text-slate-300 font-serif">{row.frustration}</td>
                                    <td className="py-8 px-6 text-slate-500 font-light">{row.old}</td>
                                    <td className="py-8 px-6 font-semibold bg-yellow-500/5 group-hover:bg-yellow-500/10 transition-colors text-white border-l border-yellow-500/20">{row.new}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </section>

            {/* Who is it for Section */}
            <section className="py-32 relative z-10 bg-[#010308] border-y border-white/5">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBkPSJNMCAwaDR2MUgweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPgo8L3N2Zz4=')] opacity-50 mix-blend-overlay pointer-events-none"></div>
                <div className="absolute top-[20%] right-0 w-[40%] h-[60%] bg-gradient-to-l from-yellow-500/10 to-transparent blur-[7.5rem] pointer-events-none rounded-full"></div>
                
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div variants={fadeUp}>
                            <motion.div variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
                               The Audience
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8 tracking-tight">Who Is This <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">For?</span></h2>
                            <p className="text-slate-400 text-lg mb-12 font-light">
                                This isn't just another finance webinar with charts and math. It's for people who want to unlock their relationship with wealth.
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all items-center shadow-lg">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg shrink-0 border border-white/10">
                                        <img src="/images/workshop-investor.png" alt="Investor" className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold tracking-tight text-white">Investors</h4>
                                        <p className="text-slate-400 text-sm font-light mt-1">Seeking peace of mind, not just returns.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all items-center shadow-lg">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg shrink-0 border border-white/10">
                                        <img src="/images/workshop-professional.png" alt="Professional" className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold tracking-tight text-white">Professionals</h4>
                                        <p className="text-slate-400 text-sm font-light mt-1">Understanding the "Human" side of finance.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all items-center shadow-lg">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg shrink-0 border border-white/10">
                                        <img src="/images/workshop-student.png" alt="Student" className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold tracking-tight text-white">Students</h4>
                                        <p className="text-slate-400 text-sm font-light mt-1">Building a wealth-mindset early on.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        
                        <motion.div variants={fadeUp} className="bg-white/[0.02] border border-white/[0.05] rounded-[3rem] text-white overflow-hidden shadow-2xl relative backdrop-blur-2xl p-2">
                            <div className="rounded-[2.5rem] overflow-hidden bg-[#050505]">
                                <div className="aspect-video w-full overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10"></div>
                                    <img src="/images/workshop-group.png" alt="Modern Financial Workshop" className="w-full h-full object-cover opacity-50 mix-blend-luminosity" />
                                </div>
                                <div className="p-10 space-y-8 relative z-20 -mt-10">
                                    <h3 className="text-3xl font-black tracking-tight">Ready to cross the bridge?</h3>
                                    <ul className="space-y-4">
                                        {[
                                            "Break the cycle of guilt",
                                            "Identify your emotional triggers",
                                            "Fix your Lifestyle Inflation",
                                            "Align personality with portfolio"
                                        ].map(item => (
                                            <li key={item} className="flex items-start gap-3 text-slate-300 font-light">
                                                <CheckCircle2 className="text-yellow-400 mt-0.5 shrink-0" size={20} />
                                                <span className="text-[0.9375rem]">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => {
                                            if (window.fbq) window.fbq('track', 'Lead');
                                            onStart();
                                        }}
                                        className="w-full py-5 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_0_1.875rem_rgba(250,204,21,0.25)] flex justify-center items-center gap-2"
                                    >
                                        Register Now <ArrowRight size={20}/>
                                    </button>
                                    <div className="text-center pt-2">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-slate-300 text-xs font-bold border border-white/10 uppercase tracking-widest shadow-inner">
                                            <Users size={14} className="text-yellow-400" />
                                            <span>Limited to 100 participants</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Expert Section */}
            <section className="py-32 bg-[#030712] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div variants={fadeUp} className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-yellow-500/10 blur-3xl rounded-[3rem] group-hover:bg-yellow-500/20 transition-all duration-700 pointer-events-none" />
                            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 aspect-[4/5] bg-[#0a0a0a] shadow-2xl">
                                <img
                                    src="/images/jiju.jpeg"
                                    alt="Jiju K"
                                    className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                                    <h3 className="text-3xl font-black text-white tracking-tight">Jiju K</h3>
                                    <p className="text-yellow-400 text-sm font-bold uppercase tracking-widest mt-1">BFSI Expert & CEO</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <motion.div variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">The Architect</motion.div>
                                <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Learn from an Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Insider.</span></h2>
                                <p className="text-slate-400 text-lg leading-relaxed font-light">
                                    Jiju's journey spans two decades at the forefront of India's leading financial institutions.
                                    He has held pivotal roles at <span className="text-white font-medium">ICICI Bank, HDFC Bank, Tata AIA, and Aditya Birla Capital</span>,
                                    giving him a unique "insider's view" of why even the most educated professionals struggle with their personal wealth.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { icon: <TrendingUp size={20} />, title: "22+ Years Expertise", desc: "Veteran of the BFSI industry with deep domain knowledge." },
                                    { icon: <Zap size={20} />, title: "500+ Workshops", desc: "Transforming the financial mindsets of thousands globally." },
                                    { icon: <Award size={20} />, title: "Industry Accolades", desc: "Recipient of pan-India training awards for excellence." },
                                    { icon: <BookOpen size={20} />, title: "Academic Excellence", desc: "MBA Finance & Associate of Insurance Institute of India." }
                                ].map((item, i) => (
                                    <motion.div key={i} variants={fadeUp} className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] shadow-lg hover:bg-white/[0.04] transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 text-yellow-400 mb-4 flex items-center justify-center shadow-inner">{item.icon}</div>
                                        <h4 className="font-bold mb-2 tracking-tight">{item.title}</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed font-light">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div variants={fadeUp} className="p-6 rounded-3xl bg-yellow-500/10 border border-yellow-500/20 flex items-start sm:items-center gap-5 shadow-lg">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-black flex items-center justify-center shrink-0 shadow-lg">
                                    <CheckCircle2 size={24} />
                                </div>
                                <p className="text-sm font-light text-slate-300 leading-relaxed">
                                    <span className="text-white font-bold block mb-0.5">Certified Mentor</span> A Train-the-Trainer certified professional dedicated to simplifying complex financial truths.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-40 relative overflow-hidden bg-[#010308] border-t border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-[#010308] to-[#010308] -z-10" />
                <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
                    <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
                        Don't let your behavior <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 italic font-serif">bankrupt</span> your future.
                    </motion.h2>

                    <motion.p variants={fadeUp} className="text-slate-400 text-xl max-w-2xl mx-auto font-light">
                        Limited to <span className="text-white font-bold">100 participants</span> to ensure a high-quality Q&A session. Secure your spot now.
                    </motion.p>

                    <motion.div variants={fadeUp}>
                        <button
                            onClick={() => {
                                if (window.fbq) window.fbq('track', 'Lead');
                                onStart();
                            }}
                            className="px-12 py-6 rounded-full bg-white text-black font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_2.5rem_rgba(255,255,255,0.2)] flex items-center gap-3 mx-auto"
                        >
                            Claim My Spot Now <ArrowRight size={28} />
                        </button>
                    </motion.div>
                </div>
            </section>
        </motion.main>
    );
}

function RegistrationForm({ formData, setFormData, onSubmit, onBack, isRegistering }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
            <div className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="absolute -inset-4 bg-yellow-500/10 blur-[5rem] rounded-full pointer-events-none" />
                
                <button onClick={onBack} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition z-10">
                    <X size={24} />
                </button>

                <div className="p-8 md:p-12 relative z-10">
                    <div className="mb-10">
                        <h2 className="text-3xl font-black mb-2 tracking-tight">Reserve Your Spot</h2>
                        <div className="flex flex-wrap gap-4 mt-4">
                            <div className="px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-xs font-bold text-yellow-400 uppercase tracking-widest">📅 9th May</div>
                            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-300 uppercase tracking-widest">⏰ 10:00 AM - 11:30 AM</div>
                        </div>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                            <input
                                required
                                type="text"
                                placeholder="John Doe"
                                className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-yellow-500/50 focus:bg-white/[0.05] outline-none transition-all text-white placeholder:text-slate-600"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                            <input
                                required
                                type="email"
                                placeholder="john@example.com"
                                className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-yellow-500/50 focus:bg-white/[0.05] outline-none transition-all text-white placeholder:text-slate-600"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">WhatsApp Number</label>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 font-bold">+91</span>
                                <input
                                    required
                                    type="tel"
                                    placeholder="98765 43210"
                                    className="w-full pl-16 pr-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-yellow-500/50 focus:bg-white/[0.05] outline-none transition-all text-white placeholder:text-slate-600"
                                    value={formData.whatsapp}
                                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className="w-full py-5 mt-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_1.25rem_rgba(250,204,21,0.2)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isRegistering ? (
                                <div className="w-6 h-6 border-4 border-black/30 border-t-black rounded-full animate-spin" />
                            ) : (
                                "Continue to Payment"
                            )}
                        </button>
                    </form>

                    <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-xs uppercase tracking-widest font-bold">
                        <ShieldCheck size={14} />
                        <span>Secure Registration</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function PaymentStep({ onSuccess, onBack, formData }) {
    const [loading, setLoading] = useState(false);

    const handleRazorpay = async () => {
        setLoading(true);

        try {
            // 1. Create order on the server
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/create-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: 199, // Amount in INR
                    currency: "INR",
                    receipt: `receipt_${Date.now()}`
                })
            });

            const order = await response.json();

            if (!order.id) {
                throw new Error("Failed to create order");
            }

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "BumbleBee Workshop",
                description: "Personal Finance: The Untold Story",
                image: logo,
                order_id: order.id, // REAL Order ID from server
                handler: async function (response) {
                    try {
                        // 2. Verify payment on the server
                        const verifyRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/verify-payment`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });

                        const result = await verifyRes.json();

                        if (result.status === "success") {
                            setLoading(false);
                            onSuccess(result.whatsappLink);
                        } else {
                            alert("Payment verification failed! Please contact support.");
                            setLoading(false);
                        }
                    } catch (err) {
                        console.error("Verification error:", err);
                        alert("Error verifying payment.");
                        setLoading(false);
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.whatsapp,
                },
                notes: {
                    workshop: "Behavioral Finance"
                },
                theme: {
                    color: "#facc15",
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment initiation error:", error);
            alert("Could not start payment. Is the server running?");
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
            <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl text-center relative overflow-hidden">
                <div className="absolute -inset-4 bg-yellow-500/10 blur-[5rem] rounded-full pointer-events-none" />

                <button onClick={onBack} disabled={loading} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition z-10">
                    <X size={20} />
                </button>

                <div className="relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-black flex items-center justify-center mx-auto mb-8 shadow-lg">
                        <TrendingUp size={40} />
                    </div>

                    <h2 className="text-3xl font-black mb-4 tracking-tight">Complete Payment</h2>
                    <p className="text-slate-400 mb-8 font-light">Secure your seat for the workshop. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 font-black text-3xl">₹199</span></p>

                    <div className="space-y-4 mb-10">
                        <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/10 shadow-inner">
                            <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">Workshop Fee</span>
                            <span className="font-black text-xl text-white">₹199.00</span>
                        </div>
                    </div>

                    <button
                        onClick={handleRazorpay}
                        disabled={loading}
                        className="w-full py-5 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_1.25rem_rgba(250,204,21,0.2)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-4 border-black/30 border-t-black rounded-full animate-spin" />
                        ) : (
                            <>Pay with Razorpay</>
                        )}
                    </button>

                    <p className="mt-6 text-xs text-slate-500 uppercase tracking-widest font-bold">
                        Secure payments powered by Razorpay
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

function ThankYouPage({ whatsappLink }) {
    React.useEffect(() => {
        const redirect = setTimeout(() => {
            window.location.href = whatsappLink || "https://chat.whatsapp.com/JtQrGOQisE8DLlC5d5J6DG?mode=gi_t";
        }, 0);

        return () => clearTimeout(redirect);
    }, [whatsappLink]);

    return (
        <motion.main
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen pt-40 pb-20 flex items-center justify-center p-6 bg-[#030712] relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-[#030712] to-[#030712] -z-10" />
            
            <div className="max-w-2xl w-full text-center space-y-12 relative z-10">
                <div className="relative">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-green-400 to-green-600 text-black flex items-center justify-center mx-auto mb-8 shadow-[0_0_2.5rem_rgba(34,197,94,0.3)]"
                    >
                        <CheckCircle2 size={64} />
                    </motion.div>
                    <div className="absolute inset-0 bg-green-500/20 blur-[6.25rem] -z-10" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white">You're In!</h1>
                    <p className="text-xl text-slate-400 font-light">Your registration for <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 font-bold italic font-serif">Personal Finance: The Untold Story</span> is successful.</p>
                </div>

                <div className="p-10 md:p-12 rounded-[3rem] bg-white/[0.02] border border-white/[0.05] shadow-2xl space-y-8 relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute top-0 right-0 px-6 py-2 bg-gradient-to-r from-green-400 to-green-500 text-black text-[0.625rem] font-black uppercase tracking-widest rounded-bl-3xl">Action Required</div>

                    <div className="space-y-4 pt-4">
                        <h3 className="text-3xl font-black text-white tracking-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500">ALMOST</span> DONE!
                        </h3>
                        <p className="text-slate-400 text-lg leading-relaxed font-light">
                            Redirecting you to WhatsApp now... <br />
                            If you are not redirected, please click the button below.
                        </p>
                    </div>

                    <a
                        href={whatsappLink || "https://chat.whatsapp.com/HzILOikGaHh6UXsvdNCdcg"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-4 w-full px-10 py-6 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#1DA851] text-white font-black text-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_1.875rem_rgba(37,211,102,0.3)] group relative overflow-hidden"
                    >
                        <motion.div
                            className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                        />
                        <MessageCircle size={32} />
                        <span className="tracking-tight">Join WhatsApp Group</span>
                    </a>

                    <p className="text-green-500/80 text-xs font-bold uppercase tracking-widest bg-green-500/10 inline-block px-4 py-2 rounded-full border border-green-500/20">All further details will be shared here only</p>
                </div>

                <p className="text-slate-500 font-light">A confirmation email has also been sent to your inbox.</p>
            </div>
        </motion.main>
    );
}
