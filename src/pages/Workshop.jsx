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

    const handleRegister = (e) => {
        e.preventDefault();
        setStep("PAYMENT");
    };

    const handlePaymentSuccess = () => {
        setStep("SUCCESS");
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-yellow-400 selection:text-black font-sans">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-white p-1">
                            <img src={logo} alt="BumbleBee" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">BumbleBee <span className="text-yellow-400">Workshop</span></span>
                    </div>
                    <button
                        onClick={() => setStep("REGISTER")}
                        className="hidden md:block px-6 py-2.5 rounded-full bg-white text-black font-bold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                        Reserve Your Spot
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
                    <ThankYouPage key="success" />
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
            className="pt-32 pb-20"
        >
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 mb-32">
                <div className="text-center space-y-8">
                    <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-sm font-medium">
                        <Zap size={14} />
                        <span>Limited Capacity Workshop</span>
                    </motion.div>

                    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]">
                        "I know what to do. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">
                            But I don't know why I don't do it."
                        </span>
                    </motion.h1>

                    <motion.p variants={fadeUp} className="max-w-3xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed">
                        Does this sound like your financial life? You know you should save. You know you should invest.
                        But something always gets in the way. It's not a lack of discipline—it's a lack of <span className="text-white font-semibold">behavioral design</span>.
                    </motion.p>

                    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={onStart}
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-yellow-400 text-black font-extrabold text-lg flex items-center justify-center gap-2 hover:bg-yellow-300 transition-all transform hover:scale-105"
                        >
                            Join the Workshop
                            <ArrowRight size={20} />
                        </button>
                        <p className="text-slate-500 text-sm">Join Personal Finance: The Untold Story</p>
                    </motion.div>
                </div>
            </section>

            {/* Stats / Pie Chart Section */}
            <section className="py-24 bg-gradient-to-b from-transparent to-white/5 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div variants={fadeUp} className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            Stop Blaming Your Willpower. <br />
                            <span className="text-yellow-400">Fix Your System.</span>
                        </h2>
                        <p className="text-slate-400 text-lg">
                            The Untold Secret: <span className="text-white font-bold text-2xl ml-2">20% is the Math, 80% is the Mindset.</span>
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 transition-colors hover:bg-white/10">
                                <div className="p-3 rounded-xl bg-yellow-400/20 text-yellow-400"><PieIcon size={24} /></div>
                                <div>
                                    <h4 className="font-bold">20% Knowledge</h4>
                                    <p className="text-slate-400 text-sm">The spreadsheets and the calculations.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 transition-colors hover:bg-yellow-400/20">
                                <div className="p-3 rounded-xl bg-yellow-400 text-black"><Target size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-yellow-400">80% Behavior</h4>
                                    <p className="text-slate-200 text-sm">The emotional triggers and the subconscious habits.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeUp} className="relative group mx-auto lg:ml-auto max-w-lg">
                        <div className="absolute inset-0 bg-yellow-400/20 blur-[100px] rounded-full group-hover:bg-yellow-400/30 transition-all duration-700" />
                        <div className="relative h-full w-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                            <img
                                src="/images/knowing-doing.png"
                                alt="Knowing to Doing Bridge"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                                <div className="text-center w-full">
                                    <span className="text-4xl font-black text-yellow-400 block mb-2">Crossing the Bridge</span>
                                    <span className="text-sm font-bold uppercase tracking-widest text-slate-300">From Knowing to Doing</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Comparison Table Section */}
            <section className="py-32 max-w-7xl mx-auto px-6">
                <motion.div variants={fadeUp} className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Traditional Solutions Fail.</h2>
                    <p className="text-slate-400">We focus on the 80% that everyone else ignores.</p>
                </motion.div>

                <motion.div variants={fadeUp} className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 text-left">
                                <th className="py-6 px-4 text-slate-500 font-medium uppercase tracking-wider text-xs">The Frustration</th>
                                <th className="py-6 px-4 text-slate-500 font-medium uppercase tracking-wider text-xs">The "Old" Solution (Fails)</th>
                                <th className="py-6 px-4 text-yellow-400 font-bold uppercase tracking-wider text-xs bg-yellow-400/5">Our Approach</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[
                                { frustration: '"I know I should save..."', old: '"Just try harder."', new: 'We identify the emotional trigger that makes you spend.' },
                                { frustration: '"I know I should invest..."', old: '"Read this 50-page book."', new: 'We align your personality with your portfolio.' },
                                { frustration: '"I know I should budget..."', old: '"Use this complex app."', new: 'We fix the Lifestyle Inflation that makes budgeting impossible.' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="py-8 px-4 text-lg italic text-slate-300">{row.frustration}</td>
                                    <td className="py-8 px-4 text-slate-400">{row.old}</td>
                                    <td className="py-8 px-4 font-semibold bg-yellow-400/5 border-x border-yellow-400/10">{row.new}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </section>

            {/* Who is it for Section */}
            <section className="py-32 bg-yellow-400 text-black">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div variants={fadeUp}>
                            <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8">Who Is This For?</h2>
                            <p className="text-black/70 text-lg mb-12">
                                This isn't just another finance webinar with charts and math. It's for people who want to unlock their relationship with wealth.
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-4 p-4 rounded-2xl bg-black/5 border border-black/10 items-center">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-black shrink-0">
                                        <img src="/images/workshop-investor.png" alt="Investor" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold">Investors</h4>
                                        <p className="text-black/60 text-sm">Seeking peace of mind, not just returns.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 rounded-2xl bg-black/5 border border-black/10 items-center">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-black shrink-0">
                                        <img src="/images/workshop-professional.png" alt="Professional" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold">Finance Professionals</h4>
                                        <p className="text-black/60 text-sm">Understanding the "Human" side of finance.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 rounded-2xl bg-black/5 border border-black/10 items-center">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-black shrink-0">
                                        <img src="/images/workshop-student.png" alt="Student" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold">Students</h4>
                                        <p className="text-black/60 text-sm">Building a wealth-mindset early on.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div variants={fadeUp} className="bg-black rounded-[3rem] text-white overflow-hidden shadow-2xl relative">
                            <div className="aspect-video w-full overflow-hidden">
                                <img src="/images/workshop-group.png" alt="Modern Financial Workshop" className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity" />
                            </div>
                            <div className="p-10 space-y-6">
                                <h3 className="text-3xl font-extrabold">Ready to cross the bridge?</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Break the cycle of guilt",
                                        "Identify your emotional triggers",
                                        "Fix your Lifestyle Inflation",
                                        "Align personality with portfolio"
                                    ].map(item => (
                                        <li key={item} className="flex items-center gap-3 text-slate-300">
                                            <CheckCircle2 className="text-yellow-400" size={18} />
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={onStart}
                                    className="w-full py-4 rounded-2xl bg-yellow-400 text-black font-black text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 active:scale-95"
                                >
                                    Register Now
                                </button>
                                <div className="text-center pt-2">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
                                        <Users size={12} />
                                        <span>Limited to 100 participants</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Expert Section */}
            <section className="py-32 bg-[#080808]">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div variants={fadeUp} className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-yellow-400/20 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 aspect-[4/5] bg-[#111]">
                                <img
                                    src="/images/jiju.jpeg"
                                    alt="Jiju K"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/60 to-transparent text-center">
                                    <h3 className="text-2xl font-bold">Jiju K</h3>
                                    <p className="text-yellow-400 text-sm font-medium">Chief Executive Officer</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <motion.div variants={fadeUp} className="text-yellow-400 font-bold tracking-widest uppercase text-sm mb-4">The Expert Behind the "Untold Story"</motion.div>
                                <h2 className="text-4xl md:text-5xl font-black mb-6">Learn from an Industry Insider.</h2>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    JIJU’S JOURNEY SPANS TWO DECADES AT THE FOREFRONT OF INDIA’S LEADING FINANCIAL INSTITUTIONS.
                                    HE HAS HELD PIVOTAL ROLES AT <span className="text-white font-semibold">ICICI BANK, HDFC BANK, TATA AIA, AND ADITYA BIRLA CAPITAL</span>,
                                    GIVING HIM A UNIQUE "INSIDER’S VIEW" OF WHY EVEN THE MOST EDUCATED PROFESSIONALS STRUGGLE WITH THEIR PERSONAL WEALTH.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { icon: <TrendingUp />, title: "22+ Years Expertise", desc: "Veteran of the BFSI industry with deep domain knowledge." },
                                    { icon: <Zap />, title: "500+ Workshops", desc: "Transforming the financial mindsets of thousands globally." },
                                    { icon: <Award />, title: "Industry Accolades", desc: "Recipient of pan-India training awards for excellence." },
                                    { icon: <BookOpen />, title: "Academic Excellence", desc: "MBA Finance & Associate of Insurance Institute of India." }
                                ].map((item, i) => (
                                    <motion.div key={i} variants={fadeUp} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                                        <div className="text-yellow-400 mb-3">{item.icon}</div>
                                        <h4 className="font-bold mb-1">{item.title}</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div variants={fadeUp} className="p-6 rounded-2xl bg-yellow-400/5 border border-yellow-400/20 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-yellow-400 text-black flex items-center justify-center shrink-0">
                                    <CheckCircle2 />
                                </div>
                                <p className="text-sm font-medium text-slate-300">
                                    <span className="text-white font-bold">Certified Mentor:</span> A Train-the-Trainer certified professional dedicated to simplifying complex financial truths.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-40 relative overflow-hidden">
                <div className="absolute inset-0 bg-yellow-400/5 -z-10" />
                <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
                    <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-black tracking-tight">
                        Don't let your behavior <br />
                        <span className="text-yellow-400 italic font-serif">bankrupt</span> your future.
                    </motion.h2>

                    <motion.p variants={fadeUp} className="text-slate-400 text-xl max-w-2xl mx-auto">
                        Limited to 100 participants to ensure a high-quality Q&A session. Secure your spot now.
                    </motion.p>

                    <motion.div variants={fadeUp}>
                        <button
                            onClick={onStart}
                            className="px-12 py-6 rounded-full bg-white text-black font-black text-2xl hover:bg-yellow-400 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-white/10"
                        >
                            Claim My Spot Now
                        </button>
                    </motion.div>
                </div>
            </section>
        </motion.main>
    );
}

function RegistrationForm({ formData, setFormData, onSubmit, onBack }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        >
            <div className="relative w-full max-w-xl bg-[#111] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <button onClick={onBack} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition">
                    <X size={24} />
                </button>

                <div className="p-8 md:p-12">
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold mb-2">Reserve Your Spot</h2>
                        <p className="text-slate-400">Fill in your details to proceed to payment.</p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 ml-1">Full Name</label>
                            <input
                                required
                                type="text"
                                placeholder="John Doe"
                                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-yellow-400 outline-none transition-colors"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                            <input
                                required
                                type="email"
                                placeholder="john@example.com"
                                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-yellow-400 outline-none transition-colors"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 ml-1">WhatsApp Number</label>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 font-medium">+91</span>
                                <input
                                    required
                                    type="tel"
                                    placeholder="98765 43210"
                                    className="w-full pl-16 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-yellow-400 outline-none transition-colors"
                                    value={formData.whatsapp}
                                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-5 mt-4 rounded-2xl bg-yellow-400 text-black font-black text-lg hover:bg-yellow-300 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Continue to Payment
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
                    amount: 1, // Amount in INR
                    currency: "INR",
                    receipt: `receipt_${Date.now()}`
                })
            });

            const order = await response.json();

            if (!order.id) {
                throw new Error("Failed to create order");
            }

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_SDIsEZfHBDTF6a",
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
                            onSuccess();
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        >
            <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl text-center relative">
                <button onClick={onBack} disabled={loading} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition">
                    <X size={20} />
                </button>

                <div className="w-20 h-20 rounded-full bg-yellow-400/10 text-yellow-400 flex items-center justify-center mx-auto mb-8">
                    <TrendingUp size={40} />
                </div>

                <h2 className="text-3xl font-bold mb-4">Complete Payment</h2>
                <p className="text-slate-400 mb-8">Secure your seat for the workshop. <br /><span className="text-white font-bold text-2xl">₹1</span></p>

                <div className="space-y-4 mb-10">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-slate-400">Workshop Fee</span>
                        <span className="font-bold">₹1.00</span>
                    </div>
                </div>

                <button
                    onClick={handleRazorpay}
                    disabled={loading}
                    className="w-full py-5 rounded-2xl bg-yellow-400 text-black font-black text-lg flex items-center justify-center gap-3 hover:bg-yellow-300 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <div className="w-6 h-6 border-4 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                        <>Pay with Razorpay</>
                    )}
                </button>

                <p className="mt-6 text-xs text-slate-500">
                    Secure payments powered by Razorpay.
                </p>
            </div>
        </motion.div>
    );
}

function ThankYouPage() {
    return (
        <motion.main
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen pt-40 pb-20 flex items-center justify-center p-6"
        >
            <div className="max-w-2xl w-full text-center space-y-12">
                <div className="relative">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="w-32 h-32 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-8 border-4 border-green-500"
                    >
                        <CheckCircle2 size={64} />
                    </motion.div>
                    <div className="absolute inset-0 bg-green-500/20 blur-[80px] -z-10" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl font-black">You're In!</h1>
                    <p className="text-xl text-slate-400">Your registration for <span className="text-white font-bold italic">Personal Finance: The Untold Story</span> is successful.</p>
                </div>

                <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 space-y-8">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-green-400">Step Final: Join the Community</h3>
                        <p className="text-slate-300">Join our exclusive WhatsApp group for session link, reminders, and future updates.</p>
                    </div>

                    <a
                        href="https://chat.whatsapp.com/CN068wOTEha69FgqGipy7i?mode=gi_t" // USER should replace this
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-[#25D366] text-white font-black text-xl hover:scale-105 transition-all shadow-xl shadow-green-500/20"
                    >
                        <MessageCircle size={28} />
                        Join WhatsApp Group
                    </a>
                </div>

                <p className="text-slate-500">A confirmation email has also been sent to your inbox.</p>
            </div>
        </motion.main>
    );
}
