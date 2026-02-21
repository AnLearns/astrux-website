
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { KundliChart } from "@/components/astrology/KundliChart" // We just created this
import { CalendarIcon, Clock, MapPin, Download, Share2 } from "lucide-react"

export default function KundliPage() {
    const [step, setStep] = useState<"form" | "result">("form")
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // Simulate generation delay
        setTimeout(() => {
            setLoading(false)
            setStep("result")
            window.scrollTo(0, 0)
        }, 1500)
    }

    return (
        <div className="min-h-screen container mx-auto px-6 py-10">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-4xl font-heading font-bold">
                        {step === "form" ? "Generate Your Janampatri" : "Your Vedic Horoscope"}
                    </h1>
                    <p className="text-muted-foreground">
                        {step === "form"
                            ? "Enter your birth details to unlock the secrets of your life path, career, and relationships."
                            : "Here is your detailed birth chart and planetary positions based on Vedic Astrology."}
                    </p>
                </div>

                {step === "form" && (
                    <div className="bg-card border border-border rounded-xl p-8 shadow-sm max-w-2xl mx-auto">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" placeholder="Enter your name" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <select className="flex h-12 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground transition-all duration-300 hover:bg-accent/10" id="gender">
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dob">Date of Birth</Label>
                                    <div className="relative">
                                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input id="dob" type="date" className="pl-10" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tob">Time of Birth</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input id="tob" type="time" className="pl-10" required />
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="place">Place of Birth</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input id="place" placeholder="City, State, Country" className="pl-10" required />
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" size="lg" className="w-full" disabled={loading}>
                                {loading ? "Calculating..." : "Generate Kundli"}
                            </Button>
                        </form>
                    </div>
                )}

                {step === "result" && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                                <Share2 className="w-4 h-4 mr-2" /> Share
                            </Button>
                            <Button variant="default" size="sm">
                                <Download className="w-4 h-4 mr-2" /> Download PDF
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            {/* Chart Visual */}
                            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                                <h3 className="text-xl font-heading font-semibold mb-4 text-center">Lagna Chart (Birth Chart)</h3>
                                <KundliChart />
                            </div>

                            {/* Planetary Table */}
                            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                                <h3 className="text-xl font-heading font-semibold mb-4">Planetary Positions</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-secondary/50 text-muted-foreground font-medium border-b border-border">
                                            <tr>
                                                <th className="px-4 py-3">Planet</th>
                                                <th className="px-4 py-3">Sign</th>
                                                <th className="px-4 py-3">Degree</th>
                                                <th className="px-4 py-3">House</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/50">
                                            {[
                                                { p: "Sun", s: "Leo", d: "14° 30'", h: "5" },
                                                { p: "Moon", s: "Taurus", d: "02° 15'", h: "2" },
                                                { p: "Mars", s: "Aries", d: "28° 10'", h: "1" },
                                                { p: "Mercury", s: "Virgo", d: "10° 45'", h: "6" },
                                                { p: "Jupiter", s: "Pisces", d: "05° 20'", h: "12" },
                                                { p: "Venus", s: "Libra", d: "18° 05'", h: "7" },
                                                { p: "Saturn", s: "Aquarius", d: "09° 55'", h: "11" },
                                                { p: "Rahu", s: "Gemini", d: "12° 00'", h: "3" },
                                                { p: "Ketu", s: "Sagittarius", d: "12° 00'", h: "9" },
                                            ].map((row) => (
                                                <tr key={row.p} className="hover:bg-accent/5">
                                                    <td className="px-4 py-3 font-medium text-foreground">{row.p}</td>
                                                    <td className="px-4 py-3 text-muted-foreground">{row.s}</td>
                                                    <td className="px-4 py-3 text-muted-foreground">{row.d}</td>
                                                    <td className="px-4 py-3 text-muted-foreground">{row.h}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Analysis Section */}
                        <div className="bg-secondary/20 rounded-xl p-8 space-y-6">
                            <h2 className="text-2xl font-heading font-bold">Key Insights</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InsightCard title="Personality" content="You have a strong sense of self (Sun in Leo). You are charismatic, generous, and a natural born leader." />
                                <InsightCard title="Career" content="Mars in Aries indicates a competitive drive. You would excel in military, engineering, or entrepreneurship." />
                                <InsightCard title="Relationships" content="Venus in Libra gives you a charming and balanced approach to love. You value harmony above all." />
                                <InsightCard title="Health" content="Saturn's aspect suggests you should take care of your joints and bones. Regular yoga is recommended." />
                            </div>
                        </div>

                        <div className="flex justify-center pt-8">
                            <Button variant="outline" onClick={() => setStep("form")}>Generate Another Kundli</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function InsightCard({ title, content }: { title: string, content: string }) {
    return (
        <div className="bg-background border border-border p-6 rounded-lg">
            <h4 className="font-semibold text-primary mb-2 text-lg">{title}</h4>
            <p className="text-muted-foreground leading-relaxed">{content}</p>
        </div>
    )
}
