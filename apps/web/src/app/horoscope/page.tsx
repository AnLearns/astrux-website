"use client"

import { useState, useEffect } from "react"
import { getHoroscope, HoroscopeData, ZODIAC_SIGNS } from "@/lib/api"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export default function HoroscopePage() {
    const [selectedSign, setSelectedSign] = useState(ZODIAC_SIGNS[0])
    const [activeTab, setActiveTab] = useState("Daily")
    const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchHoroscope()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSign, activeTab])

    async function fetchHoroscope() {
        setLoading(true)
        setError(null)
        try {
            const period = activeTab.toLowerCase()
            const data = await getHoroscope(selectedSign.name, period)
            setHoroscope(data)
        } catch (err) {
            setError("Failed to fetch horoscope. Please ensure the API server is running.")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="bg-secondary/30 py-12 border-b border-border">
                <div className="container mx-auto px-6 text-center space-y-4">
                    <h1 className="text-4xl font-heading font-bold">Horoscope Forecasts</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Choose your zodiac sign to reveal what the stars have in store for you today, this week, and beyond.
                    </p>
                </div>

                <div className="container mx-auto px-6 mt-10">
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x justify-start md:justify-center">
                        {ZODIAC_SIGNS.map((sign) => (
                            <button
                                key={sign.id}
                                onClick={() => setSelectedSign(sign)}
                                className={cn(
                                    "flex flex-col items-center gap-2 min-w-[80px] p-4 rounded-xl transition-all border snap-center",
                                    selectedSign.name === sign.name
                                        ? "bg-primary/10 border-primary shadow-sm scale-110"
                                        : "bg-card border-border hover:bg-accent/50 opacity-70 hover:opacity-100"
                                )}
                            >
                                <span className="text-3xl">{sign.symbol}</span>
                                <span className="text-sm font-medium">{sign.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-10 max-w-4xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                    <div>
                        <h2 className="text-3xl font-heading font-bold flex items-center gap-3">
                            <span className="text-4xl text-primary">{selectedSign.symbol}</span>
                            {selectedSign.name}
                        </h2>
                        <p className="text-muted-foreground">{selectedSign.dates}</p>
                    </div>

                    <div className="flex p-1 bg-secondary rounded-lg">
                        {["Daily", "Weekly", "Monthly", "Yearly"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium rounded-md transition-all",
                                    activeTab === tab
                                        ? "bg-background text-primary shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-2 text-muted-foreground">Reading the stars...</span>
                    </div>
                )}

                {error && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
                        <p className="text-destructive">{error}</p>
                    </div>
                )}

                {!loading && !error && horoscope && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-card glass p-8 rounded-2xl border border-border md:col-span-2 shadow-lg">
                            <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                                {activeTab} Overview
                            </h3>
                            <p className="text-lg leading-relaxed text-foreground/90">
                                {horoscope.predictions.overview}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-4 text-sm">
                                <div className="bg-secondary/50 px-4 py-2 rounded-full">
                                    <span className="text-muted-foreground">Mood:</span>{" "}
                                    <span className="font-medium">{horoscope.predictions.mood}</span>
                                </div>
                                <div className="bg-secondary/50 px-4 py-2 rounded-full">
                                    <span className="text-muted-foreground">Lucky Color:</span>{" "}
                                    <span className="font-medium">{horoscope.predictions.lucky_color}</span>
                                </div>
                                <div className="bg-secondary/50 px-4 py-2 rounded-full">
                                    <span className="text-muted-foreground">Lucky Number:</span>{" "}
                                    <span className="font-medium">{horoscope.predictions.lucky_number}</span>
                                </div>
                            </div>
                        </div>

                        <CategoryCard
                            title="Love & Relationships"
                            icon="❤️"
                            content={horoscope.predictions.love}
                        />
                        <CategoryCard
                            title="Career & Finance"
                            icon="💼"
                            content={horoscope.predictions.career}
                        />
                        <CategoryCard
                            title="Health & Wellness"
                            icon="🌿"
                            content={horoscope.predictions.health}
                        />
                        <CategoryCard
                            title="Current Transits"
                            icon="🪐"
                            content={`Sun in ${horoscope.transits.Sun?.sign}, Moon in ${horoscope.transits.Moon?.sign}. Jupiter in ${horoscope.transits.Jupiter?.sign}, Saturn in ${horoscope.transits.Saturn?.sign}.`}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

function CategoryCard({ title, icon, content }: { title: string, icon: string, content: string }) {
    return (
        <div className="bg-card border border-border p-6 rounded-xl hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{icon}</span>
                <h4 className="font-heading font-semibold text-lg">{title}</h4>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{content}</p>
        </div>
    )
}
