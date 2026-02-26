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
            <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border py-4 shadow-sm">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <h1 className="text-2xl font-heading font-bold text-foreground">Daily Panchang</h1>

                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="pl-9 pr-4 py-2 rounded-md border border-input bg-background/50 hover:bg-background focus:ring-1 focus:ring-primary w-48 text-sm outline-none transition-all"
                            />
                        </div>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] justify-start text-left font-normal border-input hover:bg-accent hover:text-accent-foreground",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 z-50 bg-background border border-border rounded-lg shadow-xl" align="end">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(d) => d && setDate(d)}
                                    initialFocus
                                    className="bg-card glass"
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-10 space-y-10">
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-2 text-muted-foreground">Calculating panchang...</span>
                    </div>
                )}

                {error && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
                        <p className="text-destructive">{error}</p>
                        <Button onClick={fetchPanchang} variant="outline" className="mt-4">
                            Try Again
                        </Button>
                    </div>
                )}

                {!loading && !error && panchang && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <PanchangCard
                                    title="Tithi"
                                    value={`${panchang.tithi} ${panchang.paksha} Paksha`}
                                    description="The lunar day. Crucial for auspicious beginnings."
                                    icon={<Moon className="w-5 h-5 text-primary" />}
                                    highlight
                                />
                                <PanchangCard
                                    title="Nakshatra"
                                    value={`${panchang.nakshatra} (Pada ${panchang.nakshatra_pada})`}
                                    description="The lunar mansion. Determines daily energy."
                                    icon={<StarIcon />}
                                    highlight
                                />
                            </div>

                            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                                <div className="bg-secondary/30 px-6 py-4 border-b border-border">
                                    <h3 className="font-heading font-semibold text-lg">Detailed Panchang</h3>
                                </div>
                                <div className="divide-y divide-border/50">
                                    <DetailRow label="Yoga" value={panchang.yoga} />
                                    <DetailRow label="Karana" value={panchang.karana} />
                                    <DetailRow label="Paksha" value={panchang.paksha} />
                                    <DetailRow label="Ritu (Season)" value={panchang.ritu} />
                                    <DetailRow label="Vikram Samvat" value={panchang.vikram_samvat.toString()} />
                                    <DetailRow label="Shaka Samvat" value={panchang.shaka_samvat.toString()} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <CloudSun className="w-24 h-24" />
                                </div>
                                <h3 className="font-heading font-semibold text-lg mb-6 relative z-10">Celestial Timings</h3>

                                <div className="space-y-6 relative z-10">
                                    <TimingRow label="Sunrise" time={panchang.sunrise} icon={<Sunrise className="w-5 h-5 text-orange-400" />} />
                                    <TimingRow label="Sunset" time={panchang.sunset} icon={<Sunset className="w-5 h-5 text-orange-300" />} />
                                    <TimingRow label="Moonrise" time={panchang.moonrise} icon={<Moon className="w-5 h-5 text-sky-300" />} />
                                    <TimingRow label="Moonset" time={panchang.moonset} icon={<Moon className="w-5 h-5 text-slate-400" />} />
                                </div>
                            </div>

                            <div className="bg-card border border-border rounded-2xl p-6">
                                <h3 className="font-heading font-semibold text-lg mb-4 text-red-500/80">Inauspicious Periods</h3>
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

function PanchangCard({ title, value, description, icon, highlight }: { title: string, value: string, description: string, icon: React.ReactNode, highlight?: boolean }) {
    return (
        <div className={cn(
            "rounded-xl border p-6 transition-all duration-300 hover:shadow-md",
            highlight ? "bg-card border-primary/20 bg-gradient-to-br from-primary/5 to-transparent" : "bg-card border-border"
        )}>
            <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</span>
                {icon}
            </div>
            <div className="text-2xl font-bold font-heading text-foreground mb-2">{value}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        </div>
    )
}

function DetailRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex justify-between items-center px-6 py-4 hover:bg-secondary/20 transition-colors">
            <span className="text-muted-foreground font-medium">{label}</span>
            <span className="text-foreground font-semibold">{value}</span>
        </div>
    )
}

function TimingRow({ label, time, icon }: { label: string, time: string, icon: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                    {icon}
                </div>
                <span className="font-medium text-slate-200">{label}</span>
            </div>
            <span className="font-bold text-white tracking-wide">{time}</span>
        </div>
    )
}

function TimingBox({ label, time, color }: { label: string, time: string, color: "red" | "amber" | "orange" }) {
    return (
        <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30 border border-border/50">
            <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", {
                    "bg-red-500": color === "red",
                    "bg-amber-500": color === "amber",
                    "bg-orange-500": color === "orange",
                })} />
                <span className="text-sm font-medium text-foreground">{label}</span>
            </div>
            <span className="text-sm font-bold text-muted-foreground font-mono">{time}</span>
        </div>
    )
}

function StarIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )
}
