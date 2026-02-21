import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, TrendingUp, Users, Calendar } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export default function AstrologerLandingPage() {
    return (
        <div className="min-h-screen bg-[#05010d] text-white selection:bg-amber-500/30 font-sans">
            {/* Astrologer Nav (Simplified) */}
            <nav className="fixed top-0 w-full z-50 bg-[#05010d]/80 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="font-heading font-bold text-xl tracking-widest text-amber-100 flex items-center gap-2">
                        <Star className="text-amber-400 w-5 h-5" />
                        ASTRUX <span className="text-xs bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded ml-2">PRO</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/(astrologer)/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Log In</Link>
                        <Link href="/astrologer/onboarding">
                            <Button variant="default" className="bg-amber-500 hover:bg-amber-600 text-black">Apply Now</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="pt-24">
                {/* Hero */}
                <section className="py-20 text-center container mx-auto px-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/20 border border-amber-500/20 text-amber-300 text-sm mb-6">
                        <TrendingUp className="h-4 w-4" />
                        <span>Grow Your Practice</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400">
                        Expand Your Reach to <br /> seekers Worldwide
                    </h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg mb-10">
                        Join the premier platform for professional astrologers. Manage bookings, secure payments, and connect with clients seeking your guidance.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/astrologer/onboarding">
                            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold h-12 px-8">
                                Apply as an Astrologer <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Features */}
                <section className="py-20 bg-white/5 border-y border-white/5">
                    <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-2xl bg-[#0b0516] border border-white/10 hover:border-amber-500/30 transition-colors">
                            <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-amber-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Global Client Base</h3>
                            <p className="text-zinc-400">Get discovered by users actively seeking astrological guidance from around the world.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#0b0516] border border-white/10 hover:border-amber-500/30 transition-colors">
                            <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                                <Calendar className="w-6 h-6 text-amber-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Smart Scheduling</h3>
                            <p className="text-zinc-400">Set your availability and let our system handle time zone conversions and booking management.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#0b0516] border border-white/10 hover:border-amber-500/30 transition-colors">
                            <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                                <Star className="w-6 h-6 text-amber-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Build Your Brand</h3>
                            <p className="text-zinc-400">Showcase your expertise with a verified profile, reviews, and detailed service listings.</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
