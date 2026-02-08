"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ArrowRight, Star, Moon, Sun, Sparkles } from "lucide-react"

export default function Home() {
    return (
        <div className="min-h-screen bg-[#05010d] text-white selection:bg-purple-500/30">
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#05010d] to-[#05010d]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse" />
                    </div>

                    <div className="container relative z-10 px-6 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-300 text-sm mb-8 animate-in fade-in slide-in-from-bottom-5">
                            <Sparkles className="h-4 w-4" />
                            <span>Personalized Astrology for Modern Life</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-purple-100 to-purple-400 animate-in fade-in slide-in-from-bottom-6 duration-700">
                            Unlocking Your <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">Cosmic Blueprint</span>
                        </h1>

                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-7 duration-1000">
                            Discover your true self through the stars. Get personalized horoscopes, birth chart readings, and daily insights to guide your journey.
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            <Link href="/onboarding">
                                <Button size="lg" className="group">
                                    Get Your Free Horoscope
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/booking">
                                <Button size="lg" variant="secondary" className="group">
                                    Book a Consultation
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Services Overview */}
                <section id="services" className="py-24 bg-[#0b0516]">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Cosmic Services</h2>
                            <p className="text-zinc-400 max-w-xl mx-auto">
                                Explore our premium astrology services designed to bring clarity and guidance to your life path.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Service 1 */}
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all hover:bg-white/10 group">
                                <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Star className="h-6 w-6 text-purple-400" />
                                </div>
                                <h3 className="text-xl font-heading font-bold mb-3">Birth Chart Readings</h3>
                                <p className="text-zinc-400 leading-relaxed mb-6">
                                    Deep dive into your natal chart to understand your strengths, challenges, and potential.
                                </p>
                                <Link href="/booking" className="text-purple-400 font-medium hover:text-purple-300 inline-flex items-center">
                                    Book Now <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div>

                            {/* Service 2 */}
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all hover:bg-white/10 group">
                                <div className="h-12 w-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Moon className="h-6 w-6 text-pink-400" />
                                </div>
                                <h3 className="text-xl font-heading font-bold mb-3">Synastry & Compatibility</h3>
                                <p className="text-zinc-400 leading-relaxed mb-6">
                                    Understand the dynamics of your relationships through astrological compatibility analysis.
                                </p>
                                <Link href="/booking" className="text-pink-400 font-medium hover:text-pink-300 inline-flex items-center">
                                    Book Now <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div>

                            {/* Service 3 */}
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all hover:bg-white/10 group">
                                <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Sun className="h-6 w-6 text-amber-400" />
                                </div>
                                <h3 className="text-xl font-heading font-bold mb-3">Career & Finance</h3>
                                <p className="text-zinc-400 leading-relaxed mb-6">
                                    Align your career path with your cosmic potential and identify favorable timing.
                                </p>
                                <Link href="/booking" className="text-amber-400 font-medium hover:text-amber-300 inline-flex items-center">
                                    Book Now <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials / Trust */}
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-purple-900/5" />
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-3xl p-12 text-center border border-white/10 backdrop-blur-sm">
                            <Sparkles className="h-8 w-8 text-yellow-400 mx-auto mb-6" />
                            <blockquote className="text-2xl md:text-3xl font-heading font-medium leading-relaxed mb-8 max-w-4xl mx-auto">
                                &quot;Astrux gave me the clarity I needed during a major life transition. The reading was incredibly accurate and empowering.&quot;
                            </blockquote>
                            <div className="flex flex-col items-center">
                                <div className="font-bold text-white">Sarah Jenkins</div>
                                <div className="text-purple-300 text-sm">Marketing Executive</div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
