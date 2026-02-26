
"use client"

import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PremiumPage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero */}
            <section className="relative py-20 bg-secondary/10 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2" />

                <div className="container mx-auto px-6 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-sm font-semibold mb-4">
                        <Sparkles className="w-4 h-4" /> Astrux Premium
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground">
                        Unlock Your Full <span className="text-primary bg-clip-text">Cosmic Potential</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Get advanced planetary insights, unlimited Kundli matching, and ad-free experience.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-6 -mt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Free Tier */}
                    <PricingCard
                        title="Seeker"
                        price="Free"
                        desc="For daily guidance"
                        features={[
                            "Daily Horoscope",
                            "Basic Panchang",
                            "Simple Kundli Generation",
                            "Festival Calendar"
                        ]}
                    />

                    {/* Premium Tier */}
                    <PricingCard
                        title="Enlightened"
                        price="₹199"
                        period="/month"
                        desc="Complete analysis"
                        features={[
                            "Everything in Seeker",
                            "Detailed 50-page Kundli PDF",
                            "In-depth Dasha Analysis",
                            "Unlimited Gun Milan (Matching)",
                            "Ad-free Experience"
                        ]}
                        popular
                        highlight
                    />

                    {/* Pro Tier - Consultation */}
                    <PricingCard
                        title="Consultation"
                        price="₹999"
                        period="/session"
                        desc="Talk to an Astrologer"
                        features={[
                            "Audio/Video Call (30 mins)",
                            "Detailed Problem Analysis",
                            "Remedies & Gemstones",
                            "Follow-up Question (1)"
                        ]}
                    />
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto mt-24 space-y-8">
                    <h2 className="text-3xl font-heading font-bold text-center">Frequently Asked Questions</h2>
                    <div className="grid gap-6">
                        <FaqItem q="Is the payment secure?" a="Yes, we use razorpay/stripe for 100% secure transactions." />
                        <FaqItem q="Can I cancel anytime?" a="Yes, subscription can be cancelled anytime from settings." />
                    </div>
                </div>
            </div>
        </div>
    )
}

function PricingCard({ title, price, period = "", desc, features, popular, highlight }: { title: string, price: string, period?: string, desc: string, features: string[], popular?: boolean, highlight?: boolean }) {
    return (
        <div className={cn(
            "relative p-8 rounded-2xl border flex flex-col transition-all duration-300",
            highlight
                ? "bg-card border-primary/50 shadow-2xl scale-105 ring-1 ring-primary/20"
                : "bg-background border-border hover:shadow-lg"
        )}>
            {popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    Most Popular
                </div>
            )}

            <div className="mb-6 space-y-2">
                <h3 className="text-xl font-medium text-muted-foreground">{title}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold font-heading text-foreground">{price}</span>
                    <span className="text-sm text-muted-foreground">{period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{desc}</p>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm text-foreground/80">
                        <Check className="w-5 h-5 text-green-500 shrink-0" />
                        <span>{feat}</span>
                    </li>
                ))}
            </ul>

            <Button
                className="w-full"
                variant={highlight ? "default" : "outline"}
                size="lg"
            >
                {highlight ? "Get Premium" : "Get Started"}
            </Button>
        </div>
    )
}

function FaqItem({ q, a }: { q: string, a: string }) {
    return (
        <div className="p-6 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-lg mb-2">{q}</h4>
            <p className="text-muted-foreground leading-relaxed">{a}</p>
        </div>
    )
}
