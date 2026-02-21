
"use client"

import { useState } from "react"
import { Calendar, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const FESTIVALS = [
    { date: "Apr 09", name: "Chaitra Navratri Starts", type: "Festival", region: "All India" },
    { date: "Apr 09", name: "Gudi Padwa", type: "Festival", region: "Maharashtra" },
    { date: "Apr 09", name: "Ugadi", type: "Festival", region: "South India" },
    { date: "Apr 13", name: "Baisakhi", type: "Festival", region: "North India" },
    { date: "Apr 17", name: "Ram Navami", type: "Festival", region: "All India" },
    { date: "Apr 23", name: "Hanuman Jayanti", type: "Festival", region: "All India" },
    { date: "May 10", name: "Akshaya Tritiya", type: "Festival", region: "All India" },
    { date: "May 23", name: "Buddha Purnima", type: "Festival", region: "All India" },
    { date: "Jun 19", name: "Nirjala Ekadashi", type: "Vrat", region: "North India" },
    { date: "Jul 07", name: "Jagannath Rath Yatra", type: "Festival", region: "Odisha" },
]

export default function FestivalPage() {
    const [filter, setFilter] = useState("All")

    const filteredFestivals = filter === "All"
        ? FESTIVALS
        : FESTIVALS.filter(f => f.type === filter || f.region === filter)

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="bg-secondary/20 py-12 border-b border-border">
                <div className="container mx-auto px-6 text-center space-y-4">
                    <h1 className="text-4xl font-heading font-bold">Hindu Festival Calendar</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Stay updated with upcoming Vrats, Festivals, and Auspicious Days.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-10 max-w-4xl">
                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-8 items-center">
                    <Filter className="w-5 h-5 text-muted-foreground mr-2" />
                    {["All", "Festival", "Vrat", "North India", "South India"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                                filter === f
                                    ? "bg-primary text-white border-primary"
                                    : "bg-card border-border hover:bg-accent"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="space-y-4">
                    {filteredFestivals.map((festival, idx) => (
                        <div key={idx} className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-md transition-all group">
                            <div className="flex items-center gap-6">
                                <div className="bg-secondary/50 text-foreground font-bold font-heading text-center p-4 rounded-lg min-w-[80px] group-hover:bg-primary group-hover:text-white transition-colors">
                                    <div className="text-xl leading-none mb-1">{festival.date.split(" ")[1]}</div>
                                    <div className="text-xs uppercase tracking-wider">{festival.date.split(" ")[0]}</div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold font-heading">{festival.name}</h3>
                                    <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                                        <span className="bg-secondary px-2 py-0.5 rounded">{festival.type}</span>
                                        <span className="bg-secondary px-2 py-0.5 rounded">{festival.region}</span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="shrink-0 text-muted-foreground group-hover:text-primary">
                                Read Rituals
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
