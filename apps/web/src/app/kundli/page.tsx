"use client"

import { useState } from "react"
import { getKundli, KundliData, DEFAULT_LOCATION } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { KundliChart } from "@/components/astrology/KundliChart"
import { CalendarIcon, Clock, MapPin, Download, Share2, Loader2 } from "lucide-react"

export default function KundliPage() {
    const [step, setStep] = useState<"form" | "result">("form")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [kundliData, setKundliData] = useState<KundliData | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        gender: "Male",
        dob: "",
        tob: "",
        place: DEFAULT_LOCATION.name,
        latitude: DEFAULT_LOCATION.latitude,
        longitude: DEFAULT_LOCATION.longitude,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const data = await getKundli(
                formData.dob,
                formData.tob,
                formData.latitude,
                formData.longitude,
                formData.name,
                formData.gender
            )
            setKundliData(data)
            setStep("result")
            window.scrollTo(0, 0)
        } catch (err) {
            setError("Failed to generate kundli. Please ensure the API server is running.")
            console.error(err)
        } finally {
            setLoading(false)
        }
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

                {error && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
                        <p className="text-destructive">{error}</p>
                    </div>
                )}

                {step === "form" && (
                    <div className="bg-card border border-border rounded-xl p-8 shadow-sm max-w-2xl mx-auto">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <select
                                        className="flex h-12 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground transition-all duration-300 hover:bg-accent/10"
                                        id="gender"
                                        value={formData.gender}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    >
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dob">Date of Birth</Label>
                                    <div className="relative">
                                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="dob"
                                            type="date"
                                            className="pl-10"
                                            required
                                            value={formData.dob}
                                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tob">Time of Birth</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="tob"
                                            type="time"
                                            className="pl-10"
                                            required
                                            value={formData.tob}
                                            onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="place">Place of Birth</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="place"
                                            placeholder="City, State, Country"
                                            className="pl-10"
                                            required
                                            value={formData.place}
                                            onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Using coordinates: {formData.latitude}, {formData.longitude}
                                    </p>
                                </div>
                            </div>

                            <Button type="submit" size="lg" className="w-full" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Calculating...
                                    </>
                                ) : (
                                    "Generate Kundli"
                                )}
                            </Button>
                        </form>
                    </div>
                )}

                {step === "result" && kundliData && (
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
                            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                                <h3 className="text-xl font-heading font-semibold mb-4 text-center">
                                    Lagna Chart ({kundliData.lagna.sign})
                                </h3>
                                <KundliChart planets={kundliData.planets} lagnaSign={kundliData.lagna.sign} />
                            </div>

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
                                            {Object.entries(kundliData.planets).map(([name, data]) => (
                                                <tr key={name} className="hover:bg-accent/5">
                                                    <td className="px-4 py-3 font-medium text-foreground">
                                                        {name} {data.retrograde && "(R)"}
                                                    </td>
                                                    <td className="px-4 py-3 text-muted-foreground">{data.sign}</td>
                                                    <td className="px-4 py-3 text-muted-foreground">
                                                        {data.sign_degree.toFixed(2)}°
                                                    </td>
                                                    <td className="px-4 py-3 text-muted-foreground">{data.house}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="bg-secondary/20 rounded-xl p-8 space-y-6">
                            <h2 className="text-2xl font-heading font-bold">Key Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InsightCard
                                    title="Lagna (Ascendant)"
                                    content={`Your rising sign is ${kundliData.lagna.sign} at ${kundliData.lagna.sign_degree.toFixed(2)}°. This represents your outer personality and how others perceive you.`}
                                />
                                <InsightCard
                                    title="Moon Nakshatra"
                                    content={`Your Moon is in ${kundliData.moon_nakshatra} Nakshatra, Pada ${kundliData.nakshatra_pada}. This reveals your emotional nature and inner self.`}
                                />
                                <InsightCard
                                    title="Current Dasha"
                                    content={`You are currently in ${kundliData.dasha}. This period influences your current life themes and experiences.`}
                                />
                                <InsightCard
                                    title="Birth Details"
                                    content={`Born on ${kundliData.birth_details.date} at ${kundliData.birth_details.time} at coordinates ${kundliData.birth_details.latitude}, ${kundliData.birth_details.longitude}.`}
                                />
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
