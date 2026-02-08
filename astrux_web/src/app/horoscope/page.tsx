
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const ZODIACS = [
    { name: "Aries", icon: "♈", dates: "Mar 21 - Apr 19" },
    { name: "Taurus", icon: "♉", dates: "Apr 20 - May 20" },
    { name: "Gemini", icon: "♊", dates: "May 21 - Jun 20" },
    { name: "Cancer", icon: "♋", dates: "Jun 21 - Jul 22" },
    { name: "Leo", icon: "♌", dates: "Jul 23 - Aug 22" },
    { name: "Virgo", icon: "♍", dates: "Aug 23 - Sep 22" },
    { name: "Libra", icon: "♎", dates: "Sep 23 - Oct 22" },
    { name: "Scorpio", icon: "♏", dates: "Oct 23 - Nov 21" },
    { name: "Sagittarius", icon: "♐", dates: "Nov 22 - Dec 21" },
    { name: "Capricorn", icon: "♑", dates: "Dec 22 - Jan 19" },
    { name: "Aquarius", icon: "♒", dates: "Jan 20 - Feb 18" },
    { name: "Pisces", icon: "♓", dates: "Feb 19 - Mar 20" },
]

export default function HoroscopePage() {
    const [selectedSign, setSelectedSign] = useState(ZODIACS[0])
    const [activeTab, setActiveTab] = useState("Daily")

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="bg-secondary/30 py-12 border-b border-border">
                <div className="container mx-auto px-6 text-center space-y-4">
                    <h1 className="text-4xl font-heading font-bold">Horoscope Forecasts</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Choose your zodiac sign to reveal what the stars have in store for you today, this week, and beyond.
                    </p>
                </div>

                {/* Zodiac Scroll Bar */}
                <div className="container mx-auto px-6 mt-10">
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x justify-start md:justify-center">
                        {ZODIACS.map((sign) => (
                            <button
                                key={sign.name}
                                onClick={() => setSelectedSign(sign)}
                                className={cn(
                                    "flex flex-col items-center gap-2 min-w-[80px] p-4 rounded-xl transition-all border snap-center",
                                    selectedSign.name === sign.name
                                        ? "bg-primary/10 border-primary shadow-sm scale-110"
                                        : "bg-card border-border hover:bg-accent/50 opacity-70 hover:opacity-100"
                                )}
                            >
                                <span className="text-3xl">{sign.icon}</span>
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
                            <span className="text-4xl text-primary">{selectedSign.icon}</span>
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

                {/* Content Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Main Prediction */}
                    <div className="bg-card glass p-8 rounded-2xl border border-border md:col-span-2 shadow-lg">
                        <h3 className="text-xl font-heading font-bold mb-4 text-primary">Overview for {activeTab}</h3>
                        <p className="text-lg leading-relaxed text-foreground/90">
                            {/* Dummy Content Generator */}
                            This is a time of significant opportunities for {selectedSign.name}. The planetary alignment in your charts suggests
                            that you should focus on communication and clarity. Whatever you have been planning for the last few weeks is about
                            to come to fruition. Be patient but persistent.
                        </p>
                    </div>

                    <CategoryCard
                        title="Love & Relationships"
                        icon="❤️"
                        content={`Your emotional world is lighting up this ${activeTab.toLowerCase()}. Venus is favoring honest conversations.`}
                    />
                    <CategoryCard
                        title="Career & Finance"
                        icon="💼"
                        content={`A new project or opportunity may present itself. Be ready to seize the moment, especially regarding finances.`}
                    />
                    <CategoryCard
                        title="Health & Wellness"
                        icon="🌿"
                        content={`Focus on mental clarity. Meditation or a short walk could do wonders for your anxiety levels.`}
                    />
                    <CategoryCard
                        title="Travel & Luck"
                        icon="✈️"
                        content={`Lucky color: ${selectedSign.name === 'Leo' ? 'Gold' : 'Blue'}. Best direction: East. Good time for short trips.`}
                    />
                </div>
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
