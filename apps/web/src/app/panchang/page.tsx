"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { getPanchang, PanchangData, DEFAULT_LOCATION } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin, Sunrise, Sunset, Moon, CloudSun, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PanchangPage() {
    const [date, setDate] = useState<Date>(new Date())
    const [location, setLocation] = useState(DEFAULT_LOCATION.name)
    const [panchang, setPanchang] = useState<PanchangData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchPanchang()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date])

    async function fetchPanchang() {
        setLoading(true)
        setError(null)
        try {
            const data = await getPanchang(
                format(date, "yyyy-MM-dd"),
                DEFAULT_LOCATION.latitude,
                DEFAULT_LOCATION.longitude
            )
            setPanchang(data)
        } catch (err) {
            setError("Failed to fetch panchang data. Please ensure the API server is running.")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header Area */}
            <div className="bg-secondary/20 py-12 border-b border-border">
                <div className="container mx-auto px-6 text-center space-y-6">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">Daily Panchang</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Accurate Vedic celestial timings, Tithi, Nakshatra, and periods for your location.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto pt-4">
                        <div className="relative w-full sm:w-1/2">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-input bg-card/80 hover:bg-card focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm text-base"
                                placeholder="Enter location..."
                            />
                        </div>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full sm:w-1/2 justify-start text-left font-normal border-input bg-card/80 hover:bg-card rounded-xl py-6 shadow-sm text-base",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-3 h-5 w-5 text-muted-foreground" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 z-50 bg-background border border-border rounded-xl shadow-xl" align="center">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(d) => d && setDate(d)}
                                    initialFocus
                                    className="bg-card glass rounded-xl"
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        <span className="text-lg text-muted-foreground font-medium animate-pulse">Calculating celestial positions...</span>
                    </div>
                )}

                {error && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-8 text-center max-w-lg mx-auto shadow-sm">
                        <p className="text-destructive font-medium text-lg mb-4">{error}</p>
                        <Button onClick={fetchPanchang} variant="destructive" className="rounded-xl px-8">
                            Try Again
                        </Button>
                    </div>
                )}

                {!loading && !error && panchang && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content - Left */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <PanchangCard
                                    title="Tithi"
                                    value={`${panchang.tithi} ${panchang.paksha} Paksha`}
                                    description="The lunar day. Crucial for auspicious beginnings."
                                    icon={<Moon className="w-6 h-6" />}
                                />
                                <PanchangCard
                                    title="Nakshatra"
                                    value={`${panchang.nakshatra} (Pada ${panchang.nakshatra_pada})`}
                                    description="The lunar mansion. Determines daily energy."
                                    icon={<StarIcon />}
                                />
                            </div>

                            <div className="bg-card border border-border/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="bg-secondary/40 px-8 py-5 border-b border-border/60 flex items-center justify-between">
                                    <h3 className="font-heading font-bold text-xl text-foreground">Detailed Panchang</h3>
                                </div>
                                <div className="divide-y divide-border/40">
                                    <DetailRow label="Yoga" value={panchang.yoga} />
                                    <DetailRow label="Karana" value={panchang.karana} />
                                    <DetailRow label="Paksha" value={panchang.paksha} />
                                    <DetailRow label="Ritu (Season)" value={panchang.ritu} />
                                    <DetailRow label="Vikram Samvat" value={panchang.vikram_samvat.toString()} />
                                    <DetailRow label="Shaka Samvat" value={panchang.shaka_samvat.toString()} />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Right */}
                        <div className="space-y-8">
                            {/* Celestial Timings */}
                            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden ring-1 ring-white/10">
                                <div className="absolute -top-10 -right-10 p-4 opacity-10 pointer-events-none">
                                    <CloudSun className="w-48 h-48" />
                                </div>
                                <h3 className="font-heading font-bold text-2xl mb-8 relative z-10 flex items-center gap-2">
                                    <Sunrise className="w-6 h-6 text-indigo-400" />
                                    Celestial Timings
                                </h3>

                                <div className="space-y-6 relative z-10">
                                    <TimingRow label="Sunrise" time={panchang.sunrise} icon={<Sunrise className="w-5 h-5 text-amber-400" />} />
                                    <TimingRow label="Sunset" time={panchang.sunset} icon={<Sunset className="w-5 h-5 text-orange-400" />} />
                                    <TimingRow label="Moonrise" time={panchang.moonrise} icon={<Moon className="w-5 h-5 text-sky-300" />} />
                                    <TimingRow label="Moonset" time={panchang.moonset} icon={<Moon className="w-5 h-5 text-slate-400" />} />
                                </div>
                            </div>

                            {/* Inauspicious Periods */}
                            <div className="bg-card border border-border/60 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="font-heading font-bold text-xl mb-6 flex items-center gap-2 text-red-500/90">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    Inauspicious Periods
                                </h3>
                                <div className="space-y-4">
                                    <TimingBox label="Rahu Kalam" time={panchang.rahu_kalam} color="red" />
                                    <TimingBox label="Yamagandam" time={panchang.yamagandam} color="amber" />
                                    <TimingBox label="Gulika Kalam" time={panchang.gulika_kalam} color="orange" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function PanchangCard({ title, value, description, icon }: { title: string, value: string, description: string, icon: React.ReactNode }) {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 group">
            <div className="absolute -top-6 -right-6 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
                <div className="scale-[3]">{icon}</div>
            </div>
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 shadow-inner group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {icon}
                </div>
                <span className="text-sm font-bold tracking-widest text-muted-foreground uppercase">{title}</span>
            </div>
            <div className="text-3xl font-heading font-bold mb-3 text-foreground">{value}</div>
            <p className="text-sm text-muted-foreground/80 leading-relaxed font-medium">{description}</p>
        </div>
    )
}

function DetailRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-8 py-5 hover:bg-secondary/30 transition-colors gap-2">
            <span className="text-sm font-medium tracking-wide text-muted-foreground uppercase">{label}</span>
            <span className="font-bold text-foreground text-lg">{value}</span>
        </div>
    )
}

function TimingRow({ label, time, icon }: { label: string, time: string, icon: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-white/5 backdrop-blur-md shadow-inner border border-white/10 group-hover:bg-white/10 transition-colors">
                    {icon}
                </div>
                <span className="font-medium text-slate-200 text-base">{label}</span>
            </div>
            <span className="font-mono font-bold text-white tracking-widest text-base bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">{time}</span>
        </div>
    )
}

function TimingBox({ label, time, color }: { label: string, time: string, color: "red" | "amber" | "orange" }) {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-xl bg-secondary/20 border border-border/40 hover:bg-secondary/40 transition-colors gap-2">
            <div className="flex items-center gap-3">
                <div className={cn("w-2.5 h-2.5 rounded-full shadow-sm", {
                    "bg-red-500 shadow-red-500/40": color === "red",
                    "bg-amber-500 shadow-amber-500/40": color === "amber",
                    "bg-orange-500 shadow-orange-500/40": color === "orange",
                })} />
                <span className="text-sm font-bold text-foreground">{label}</span>
            </div>
            <span className="text-sm font-bold text-muted-foreground font-mono bg-background px-3 py-1.5 rounded-md border border-border/50 shadow-sm">{time}</span>
        </div>
    )
}

function StarIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )
}
