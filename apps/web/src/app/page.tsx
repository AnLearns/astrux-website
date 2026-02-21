
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { Calendar, Clock, Star, PartyPopper, ArrowRight, Sparkles, ScrollText, Heart } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col gap-20 pb-20">
            {/* HERO SECTION */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Animated Cosmic Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 via-background to-indigo-100/40 dark:from-purple-900/20 dark:via-background dark:to-indigo-900/20 z-0" />
                <div className="absolute inset-0 cosmic-bg z-0" />

                {/* Floating Orbs */}
                <div className="absolute top-20 right-20 w-96 h-96 bg-purple-400/30 dark:bg-purple-500/20 rounded-full blur-3xl animate-glow-pulse" />
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-400/30 dark:bg-indigo-500/20 rounded-full blur-3xl animate-float" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-300/20 dark:bg-violet-500/10 rounded-full blur-3xl" />

                <div className="container relative z-10 px-6 text-center space-y-8 max-w-5xl mx-auto">
                    <div className="space-y-6 flex flex-col items-center">
                        <h1 className="text-3xl sm:text-5xl md:text-7xl font-heading font-bold leading-tight tracking-tight text-center">
                            Unlock Your <br className="hidden sm:block" />
                            <GradientText gradient="cosmic" className="text-3xl sm:text-5xl md:text-7xl font-heading font-bold block mt-2">
                                Cosmic Destiny
                            </GradientText>
                        </h1>
                        <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-center px-4">
                            Journey through the stars with precise Vedic astrology. Discover your path with ancient wisdom and modern clarity.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                        <Link href="/kundli">
                            <Button variant="cosmic" size="xl" className="group">
                                <Sparkles className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                                Generate Free Kundli
                            </Button>
                        </Link>
                        <Link href="/panchang">
                            <Button variant="outline" size="xl" className="border-purple-400/30 hover:bg-purple-500/10 hover:border-purple-400">
                                <ScrollText className="mr-2 w-5 h-5" />
                                Today's Panchang
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="container px-4 md:px-6 py-12 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold">
                        Explore <GradientText gradient="cosmic">Cosmic Services</GradientText>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Comprehensive Vedic astrology tools grouped for your convenience.
                    </p>
                </div>

                <div className="space-y-16">
                    {/* Group 1: Daily Insights */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-border flex-1" />
                            <span className="text-lg font-heading font-semibold text-muted-foreground uppercase tracking-widest">Daily Insights</span>
                            <div className="h-px bg-border flex-1" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            <FeatureCard
                                title="Daily Panchang"
                                description="Accurate Tithi, Nakshatra, Yoga, and Karana for your location every day."
                                cta="View Panchang"
                                href="/panchang"
                                icon={<Calendar className="w-10 h-10" />}
                                gradient="from-orange-500/20 to-amber-500/20"
                            />
                            <FeatureCard
                                title="Daily Horoscope"
                                description="Personalized predictions for your zodiac sign to guide your day."
                                cta="Read Horoscope"
                                href="/horoscope"
                                icon={<Star className="w-10 h-10" />}
                                gradient="from-blue-500/20 to-cyan-500/20"
                            />
                            <FeatureCard
                                title="Festival Calendar"
                                description="Stay updated with upcoming Vrats, Purnima, Amavasya, and cultural events."
                                cta="See Festivals"
                                href="/festivals"
                                icon={<PartyPopper className="w-10 h-10" />}
                                gradient="from-pink-500/20 to-rose-500/20"
                            />
                        </div>
                    </div>

                    {/* Group 2: Vedic Services */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-border flex-1" />
                            <span className="text-lg font-heading font-semibold text-muted-foreground uppercase tracking-widest">Vedic Services</span>
                            <div className="h-px bg-border flex-1" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            <FeatureCard
                                title="Kundli Generator"
                                description="Create your detailed birth chart (Janampatri) with planetary positions and dosha analysis."
                                cta="Create Kundli"
                                href="/kundli"
                                icon={<ScrollText className="w-10 h-10" />}
                                gradient="from-purple-600/20 to-indigo-600/20"
                            />
                            <FeatureCard
                                title="Matchmaking"
                                description="Check compatibility for marriage based on the Vedic Ashtakoot Guna Milan system."
                                cta="Check Compatibility"
                                href="/matchmaking"
                                icon={<Heart className="w-10 h-10" />}
                                gradient="from-red-500/20 to-rose-500/20"
                            />
                            <FeatureCard
                                title="Muhurat Finder"
                                description="Find auspicious timings for important events, travel, and new beginnings."
                                cta="Find Muhurat"
                                href="/muhurat"
                                icon={<Clock className="w-10 h-10" />}
                                gradient="from-violet-500/20 to-purple-500/20"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ title, description, cta, href, icon, gradient }: { title: string, description: string, cta: string, href: string, icon: React.ReactNode, gradient: string }) {
    return (
        <div className="group rounded-3xl border border-border bg-card overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col">
            <div className={`h-40 bg-gradient-to-br ${gradient} w-full relative overflow-hidden flex items-center justify-center`}>
                <div className="absolute inset-0 cosmic-bg opacity-20" />
                <div className="relative z-10 text-primary group-hover:scale-110 transition-transform duration-500 drop-shadow-sm">
                    {icon}
                </div>
            </div>
            <div className="p-6 space-y-4 flex flex-col flex-1">
                <h3 className="text-xl font-heading font-bold">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{description}</p>
                <Link href={href} className="pt-2">
                    <Button variant="link" className="p-0 h-auto font-semibold text-primary group-hover:gap-2 transition-all">
                        {cta} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}
