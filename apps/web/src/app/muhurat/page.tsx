
"use client"

import { useState } from "react"
import { Clock, ShieldCheck, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MuhuratPage() {
    const [activeType, setActiveType] = useState("Choghadiya")

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="bg-secondary/20 py-12 border-b border-border">
                <div className="container mx-auto px-6 text-center space-y-4">
                    <h1 className="text-4xl font-heading font-bold">Auspicious Timings</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Plan your day with Vedic time management. Avoid inauspicious Rahu Kalam and embrace the Shubh Muhurats.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-10">
                {/* Tabs */}
                <div className="flex flex-wrap gap-4 justify-center mb-12">
                    {["Choghadiya", "Rahu Kalam", "Hora", "Gowri Panchangam"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={cn(
                                "px-6 py-3 rounded-full text-sm font-medium transition-all border",
                                activeType === type
                                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                                    : "bg-card border-border hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {/* Timeline Visualization */}
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-2xl font-heading font-bold text-center mb-8">
                        Today&apos;s {activeType} (Apr 20, 2024)
                    </h2>

                    <div className="relative border-l-2 border-border ml-6 space-y-8">
                        {/* Mock Data for Timelines */}
                        <TimelineItem
                            time="06:00 AM - 07:30 AM"
                            name="Udveg (Bad)"
                            desc="Anxiety & Trouble. Avoid new beginnings."
                            status="bad"
                        />
                        <TimelineItem
                            time="07:30 AM - 09:00 AM"
                            name="Char (Neutral)"
                            desc="Variable. Good for travel."
                            status="neutral"
                        />
                        <TimelineItem
                            time="09:00 AM - 10:30 AM"
                            name="Labh (Good)"
                            desc="Profit & Gain. Excellent for business."
                            status="good"
                        />
                        <TimelineItem
                            time="10:30 AM - 12:00 PM"
                            name="Amrit (Best)"
                            desc="Nectar. Best for all auspicious works."
                            status="best"
                            isCurrent
                        />
                        <TimelineItem
                            time="12:00 PM - 01:30 PM"
                            name="Kaal (Bad)"
                            desc="Death/Loss. Strictly avoid."
                            status="bad"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function TimelineItem({ time, name, desc, status, isCurrent }: { time: string, name: string, desc: string, status: "good" | "best" | "bad" | "neutral", isCurrent?: boolean }) {
    return (
        <div className="relative pl-8">
            <div className={cn(
                "absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-background",
                status === "best" ? "bg-green-500" :
                    status === "good" ? "bg-emerald-400" :
                        status === "neutral" ? "bg-gray-400" : "bg-red-500"
            )} />

            <div className={cn(
                "p-5 rounded-xl border transition-all hover:translate-x-1",
                isCurrent ? "bg-secondary border-primary ring-1 ring-primary shadow-lg" : "bg-card border-border shadow-sm"
            )}>
                {isCurrent && (
                    <span className="absolute -top-3 right-4 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                        Current Time
                    </span>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-sm text-muted-foreground">{time}</span>
                    <div className="flex items-center gap-2">
                        {status === "best" && <ShieldCheck className="w-4 h-4 text-green-500" />}
                        {status === "bad" && <ShieldAlert className="w-4 h-4 text-red-500" />}
                        {status === "neutral" && <Clock className="w-4 h-4 text-gray-500" />}
                        <span className={cn(
                            "font-bold",
                            status === "best" ? "text-green-600 dark:text-green-400" :
                                status === "good" ? "text-emerald-600 dark:text-emerald-400" :
                                    status === "bad" ? "text-red-600 dark:text-red-400" : "text-muted-foreground"
                        )}>
                            {name}
                        </span>
                    </div>
                </div>
                <p className="text-sm text-foreground/80">{desc}</p>
            </div>
        </div>
    )
}
