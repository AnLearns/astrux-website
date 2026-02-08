
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle2, Heart, Home, Plane, Coins, Baby, ArrowRight, ArrowLeft, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

const EVENTS = [
    { title: "Marriage (Vivah)", icon: <Heart className="w-6 h-6 text-pink-500" /> },
    { title: "House Warming (Griha Pravesh)", icon: <Home className="w-6 h-6 text-orange-500" /> },
    { title: "Vehicle Purchase", icon: <Plane className="w-6 h-6 text-blue-500" /> },
    { title: "Business Opening", icon: <Coins className="w-6 h-6 text-yellow-500" /> },
    { title: "Naming Ceremony (Namkaran)", icon: <Baby className="w-6 h-6 text-green-500" /> },
]

export default function EventMuhuratPage() {
    const [step, setStep] = useState(1)
    const [selectedEvent, setSelectedEvent] = useState("")

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="bg-secondary/20 py-12 border-b border-border">
                <div className="container mx-auto px-6 text-center space-y-4">
                    <h1 className="text-4xl font-heading font-bold">Find Auspicious Dates</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Plan your important life events with the blessings of the cosmos.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-10 max-w-3xl">
                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-12 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-secondary -z-10" />
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-2",
                                step >= s
                                    ? "bg-primary border-primary text-primary-foreground"
                                    : "bg-card border-muted text-muted-foreground"
                            )}
                        >
                            {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                        </div>
                    ))}
                </div>

                {/* Steps Content */}
                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm min-h-[400px]">
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8">
                            <h2 className="text-2xl font-heading font-bold text-center">What are you planning?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {EVENTS.map((evt) => (
                                    <button
                                        key={evt.title}
                                        onClick={() => setSelectedEvent(evt.title)}
                                        className={cn(
                                            "flex items-center gap-4 p-4 rounded-xl border transition-all text-left group",
                                            selectedEvent === evt.title
                                                ? "bg-primary/5 border-primary ring-1 ring-primary"
                                                : "bg-background border-input hover:bg-accent hover:border-accent-foreground/50"
                                        )}
                                    >
                                        <div className="p-3 rounded-full bg-secondary group-hover:bg-white transiton-colors">
                                            {evt.icon}
                                        </div>
                                        <span className="font-semibold text-lg">{evt.title}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button size="lg" disabled={!selectedEvent} onClick={() => setStep(2)}>
                                    Next Step <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8">
                            <h2 className="text-2xl font-heading font-bold text-center">When do you want to {selectedEvent}?</h2>

                            <div className="flex flex-col items-center gap-6">
                                <div className="p-6 border border-border rounded-xl bg-secondary/20 w-full max-w-md text-center space-y-4">
                                    <label className="text-sm font-medium text-muted-foreground">Select Month Range</label>
                                    <select className="w-full p-4 rounded-lg bg-background border border-input text-lg font-medium shadow-sm outline-none focus:ring-2 focus:ring-primary">
                                        <option>May - June 2024</option>
                                        <option>July - August 2024</option>
                                        <option>September - October 2024</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-between pt-8">
                                <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                                </Button>
                                <Button size="lg" onClick={() => setStep(3)}>
                                    Find Dates <Calendar className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 text-center">
                            <h2 className="text-2xl font-heading font-bold">Best Dates for {selectedEvent}</h2>
                            <p className="text-muted-foreground">Based on planetary alignments and Nakshatras.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                {[
                                    { d: "May 12, 2024", t: "09:30 AM - 11:45 AM", q: "Excellent (Abhijit)" },
                                    { d: "May 19, 2024", t: "06:15 AM - 09:00 AM", q: "Good (Amrit)" },
                                    { d: "June 04, 2024", t: "10:00 AM - 01:20 PM", q: "Very Auspicious" },
                                    { d: "June 15, 2024", t: "02:45 PM - 05:30 PM", q: "Good" },
                                ].map((date, i) => (
                                    <div key={i} className="flex flex-col p-4 bg-secondary/10 border border-emerald-500/20 rounded-xl hover:shadow-md transition-all relative overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
                                        <h3 className="text-xl font-bold font-heading text-foreground">{date.d}</h3>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                            <Clock className="w-3 h-3" /> {date.t}
                                        </div>
                                        <span className="absolute top-4 right-4 text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                                            {date.q}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center pt-8 gap-4">
                                <Button variant="outline" onClick={() => setStep(1)}>Start Over</Button>
                                <Button variant="default">Save to Calendar</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
