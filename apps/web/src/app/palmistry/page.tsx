"use client"

import { useState } from "react"
import { getPalmistryReading, PalmistryData } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Hand, Loader2, Sparkles, Star, Fingerprint, Activity, Zap, Compass, Moon, Heart } from "lucide-react"
import { GradientText } from "@/components/ui/gradient-text"
import { cn } from "@/lib/utils"

export default function PalmistryPage() {
    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [dominantHand, setDominantHand] = useState("right")
    const [reading, setReading] = useState<PalmistryData | null>(null)
    const [loading, setLoading] = useState(false)
    const [scanningPhase, setScanningPhase] = useState<number>(0)
    const [error, setError] = useState<string | null>(null)

    async function handleScan() {
        setLoading(true)
        setError(null)
        setScanningPhase(1)

        // Simulate a multi-phase scanning process for dramatic effect
        setTimeout(() => setScanningPhase(2), 1500)
        setTimeout(() => setScanningPhase(3), 3000)

        try {
            // we simulate some wait time before actually fetching so the animation shows
            await new Promise(r => setTimeout(r, 4500))
            const data = await getPalmistryReading(name, gender, dominantHand)
            setReading(data)
        } catch (err) {
            setError("Failed to generate reading. Please ensure the API is running or try again later.")
            console.error(err)
        } finally {
            setLoading(false)
            setScanningPhase(0)
        }
    }

    return (
        <div className="min-h-screen bg-background pb-20 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl" />
            <div className="absolute inset-0 cosmic-bg opacity-30 z-0" />

            {/* Header */}
            <div className="relative z-40 bg-background/80 backdrop-blur-md border-b border-border py-4 sticky top-16 shadow-sm">
                <div className="container mx-auto px-6">
                    <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
                        <Hand className="w-6 h-6 text-purple-400" />
                        <GradientText gradient="cosmic">Mystic Palm Reader</GradientText>
                    </h1>
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
                {/* Introduction / Input Section */}
                {!reading && !loading && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-center space-y-4 mb-8">
                            <h2 className="text-3xl md:text-5xl font-heading font-bold">Unveil the Secrets of Your Hand</h2>
                            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
                                Your dominant hand records your destiny. Let our cosmic scanner interpret the intricate lines of your life, heart, head, and fate.
                            </p>
                        </div>

                        <div className="bg-card/60 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-xl max-w-xl mx-auto space-y-6 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-indigo-500/5 group-hover:opacity-100 transition-opacity" />

                            <div className="space-y-4 relative z-10">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Your Name (Optional)</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="w-full bg-background/50 border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Dominant Hand</label>
                                        <select
                                            value={dominantHand}
                                            onChange={(e) => setDominantHand(e.target.value)}
                                            className="w-full bg-background/50 border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all appearance-none"
                                        >
                                            <option value="right">Right Hand</option>
                                            <option value="left">Left Hand</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Gender (Optional)</label>
                                        <select
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="w-full bg-background/50 border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all appearance-none"
                                        >
                                            <option value="">Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={handleScan}
                                size="lg"
                                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl py-6 text-lg shadow-lg hover:shadow-purple-500/25 transition-all group-hover:scale-[1.02] relative z-10 font-bold"
                            >
                                <Fingerprint className="w-5 h-5 mr-2 animate-pulse" />
                                Initiate Palm Scan
                            </Button>

                            {error && (
                                <p className="text-red-400 text-sm text-center mt-4 bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Loading / Scanning Animation */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 min-h-[50vh] space-y-8 relative">
                        {/* Huge mystical glowing hand effect */}
                        <div className="relative w-48 h-48 flex items-center justify-center">
                            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                            <Hand className="w-32 h-32 text-purple-400/50 absolute drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />

                            {/* Scanning laser line logic */}
                            <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-scan" style={{ top: '0%' }} />
                        </div>

                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 animate-pulse">
                                {scanningPhase === 1 && "Mapping Major Lines..."}
                                {scanningPhase === 2 && "Analyzing Mounts & Fate..."}
                                {scanningPhase === 3 && "Synthesizing Cosmic Data..."}
                                {scanningPhase === 0 && "Connecting to Astral Plane..."}
                            </h3>
                            <p className="text-muted-foreground flex items-center justify-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" /> Do not break the connection
                            </p>
                        </div>
                    </div>
                )}

                {/* Results Section */}
                {!loading && reading && (
                    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
                        {/* Header Summary */}
                        <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-background border border-purple-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-center">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Sparkles className="w-32 h-32" />
                            </div>
                            <div className="relative z-10 space-y-4">
                                <h2 className="text-3xl font-heading font-bold text-white">
                                    {reading.name ? `${reading.name}&apos;s Reading` : 'Your Celestial Reading'}
                                </h2>
                                <p className="text-purple-200/80 uppercase tracking-widest text-sm font-semibold mb-6 flex items-center justify-center gap-2">
                                    <Star className="w-4 h-4" /> Analyzed {reading.dominant_hand} hand
                                </p>
                                <div className="bg-black/20 p-6 rounded-2xl backdrop-blur-md border border-white/5 inline-block text-left text-purple-100 leading-relaxed text-lg max-w-2xl">
                                    {reading.reading.summary}
                                </div>
                            </div>
                        </div>

                        {/* Detailed Lines Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ReadingCard
                                title="Life Line"
                                icon={<Activity className="w-6 h-6 text-green-400" />}
                                content={reading.reading.life_line}
                                gradient="from-green-500/10 to-emerald-500/5"
                                borderColor="border-green-500/20"
                            />
                            <ReadingCard
                                title="Heart Line"
                                icon={<Heart className="w-6 h-6 text-rose-400" />}
                                content={reading.reading.heart_line}
                                gradient="from-rose-500/10 to-pink-500/5"
                                borderColor="border-rose-500/20"
                            />
                            <ReadingCard
                                title="Head Line"
                                icon={<Zap className="w-6 h-6 text-amber-400" />}
                                content={reading.reading.head_line}
                                gradient="from-amber-500/10 to-yellow-500/5"
                                borderColor="border-amber-500/20"
                            />
                            <ReadingCard
                                title="Fate Line"
                                icon={<Compass className="w-6 h-6 text-blue-400" />}
                                content={reading.reading.fate_line}
                                gradient="from-blue-500/10 to-cyan-500/5"
                                borderColor="border-blue-500/20"
                            />
                        </div>

                        <div className="text-center pt-8">
                            <Button
                                onClick={() => setReading(null)}
                                variant="outline"
                                size="lg"
                                className="border-purple-500/30 hover:bg-purple-500/10 rounded-xl"
                            >
                                <Moon className="w-4 h-4 mr-2" /> Read Another Palm
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function ReadingCard({ title, icon, content, gradient, borderColor }: { title: string, icon: React.ReactNode, content: string, gradient: string, borderColor: string }) {
    return (
        <div className={cn("bg-card/40 backdrop-blur-md border rounded-2xl p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300", borderColor)}>
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-100 transition-opacity duration-500", gradient)} />
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-background/80 p-2 rounded-lg shadow-inner">
                        {icon}
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-foreground">{title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{content}</p>
            </div>
        </div>
    )
}
