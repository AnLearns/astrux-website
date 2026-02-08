
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Star, PartyPopper, ArrowRight, MapPin, Sparkles, ScrollText } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col gap-20 pb-20">
            {/* HERO SECTION */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background z-0" />
                <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

                <div className="container relative z-10 px-6 text-center space-y-8 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                        Unlocking <br />
                        <span className="text-primary bg-clip-text">Cosmic Energy</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        Discover your path with precise Panchang, Kundli, and Horoscope readings based on ancient Vedic calculations.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <div className="relative group">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <input
                                type="text"
                                placeholder="New Delhi, India"
                                className="pl-9 pr-4 py-3 rounded-full bg-background border border-input focus:ring-2 focus:ring-primary focus:border-transparent outline-none w-64 shadow-sm"
                            />
                        </div>
                        <Link href="/panchang">
                            <Button variant="premium" size="lg" className="rounded-full px-8 text-base shadow-lg hover:shadow-primary/25 transition-all hover:scale-105">
                                <Sparkles className="mr-2 w-4 h-4" /> View Today's Panchang
                            </Button>
                        </Link>
                        <Link href="/kundli">
                            <Button variant="outline" size="lg" className="rounded-full px-8 text-base border-primary/20 hover:bg-primary/5 hover:text-primary transition-all">
                                <ScrollText className="mr-2 w-4 h-4" /> Generate Kundli
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* QUICK CARDS SECTION */}
            <section className="container px-6 -mt-20 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <QuickCard
                        title="Today's Panchang"
                        desc="Tithi, Nakshatra, Yoga"
                        icon={<Calendar className="w-6 h-6 text-orange-500" />}
                        href="/panchang"
                        delay={0}
                    />
                    <QuickCard
                        title="Auspicious Muhurat"
                        desc="Shubh, Choghadiya, Rahu Kalam"
                        icon={<Clock className="w-6 h-6 text-purple-500" />}
                        href="/muhurat"
                        delay={100}
                    />
                    <QuickCard
                        title="Daily Horoscope"
                        desc="Predictions for your sign"
                        icon={<Star className="w-6 h-6 text-blue-500" />}
                        href="/horoscope"
                        delay={200}
                    />
                    <QuickCard
                        title="Festivals Today"
                        desc="Upcoming Vrats & Events"
                        icon={<PartyPopper className="w-6 h-6 text-red-500" />}
                        href="/festivals"
                        delay={300}
                    />
                </div>
            </section>

            {/* POPULAR TOOLS */}
            <section className="container px-6 py-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold">Popular Astrology Tools</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to navigate your spiritual journey, simplified.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ToolCard
                        title="Free Kundli Generator"
                        description="Create your detailed birth chart (Janampatri) instantly. Understand your planetary positions and doshas."
                        cta="Create Kundli"
                        href="/kundli"
                        image="/kundli-chart.png" // Placeholder
                    />
                    <ToolCard
                        title="Event Planner (Muhurat)"
                        description="Find the most auspicious dates for marriage, griha pravesh, vehicle purchase, and more."
                        cta="Find Dates"
                        href="/event-muhurat"
                        image="/muhurat-calendar.png"
                    />
                    <ToolCard
                        title="Matchmaking (Gun Milan)"
                        description="Check compatibility for marriage based on Vedic Ashtakoot Guna Milan system."
                        cta="Check Signs"
                        href="/matchmaking" // We can redirect to kundli for now if not separate
                        image="/matchmaking.png"
                    />
                </div>
            </section>

            {/* TRUST SECTION */}
            <section className="bg-secondary/30 py-24">
                <div className="container px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold">Why Trust Astrux?</h2>
                            <div className="space-y-4">
                                <TrustItem title="Precise Calculations" desc="We use NASA-grade ephemeris data corrected for ayanamsa for pinpoint accuracy." />
                                <TrustItem title="Ancient Wisdom, Modern UI" desc="No clutter, no confusion. Just pure vedic insights presented clearly." />
                                <TrustItem title="Privacy First" desc="Your birth details are stored locally or securely encrypted. We never sell your data." />
                            </div>
                            <div className="pt-4">
                                <Button variant="outline">Read Our Story</Button>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center p-10 relative overflow-hidden ring-1 ring-border">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                                <div className="relative z-10 text-center space-y-4">
                                    <span className="text-6xl font-heading font-bold text-foreground">100%</span>
                                    <p className="text-xl text-muted-foreground">Vedic Accuracy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function QuickCard({ title, desc, icon, href, delay }: { title: string, desc: string, icon: React.ReactNode, href: string, delay: number }) {
    return (
        <Link
            href={href}
            className="glass p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group border border-border bg-card/50"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-background border border-border group-hover:bg-secondary transition-colors">
                    {icon}
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
            </div>
            <h3 className="font-heading font-bold text-lg mb-1 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
        </Link>
    )
}

function ToolCard({ title, description, cta, href }: { title: string, description: string, cta: string, href: string, image?: string }) {
    return (
        <div className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="h-48 bg-gradient-to-br from-secondary to-muted w-full relative overflow-hidden">
                {/* Abstract pattern placeholder */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-foreground to-transparent" />
                <div className="absolute bottom-0 right-0 p-8 opacity-20 transform translate-x-10 translate-y-10 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-500">
                    <Sparkles className="w-32 h-32" />
                </div>
            </div>
            <div className="p-6 space-y-4">
                <h3 className="text-xl font-heading font-bold">{title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                <Link href={href}>
                    <Button variant="link" className="p-0 h-auto font-semibold text-primary group-hover:gap-2 transition-all">
                        {cta} <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

function TrustItem({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="flex gap-4">
            <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
            <div>
                <h4 className="font-semibold text-foreground">{title}</h4>
                <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
        </div>
    )
}
