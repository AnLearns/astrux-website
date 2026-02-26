
"use client"

import { useState } from "react"
import { Play, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

const CATEGORIES = ["Aarti", "Chalisa", "Mantra", "Stotram"]
const SAMPLE_CONTENT = [
    { title: "Hanuman Chalisa", type: "Chalisa", duration: "10 min read", lang: "Hindi/Awadhi" },
    { title: "Ganesh Aarti", type: "Aarti", duration: "5 min read", lang: "Hindi" },
    { title: "Mahamrityunjaya Mantra", type: "Mantra", duration: "2 min chant", lang: "Sanskrit" },
    { title: "Shiv Tandav Stotram", type: "Stotram", duration: "15 min read", lang: "Sanskrit" },
    { title: "Durga Chalisa", type: "Chalisa", duration: "8 min read", lang: "Hindi" },
    { title: "Gayatri Mantra", type: "Mantra", duration: "5 min chant", lang: "Sanskrit" },
]

export default function DevotionalPage() {
    const [selectedCat, setSelectedCat] = useState("Aarti")

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="bg-secondary/20 py-12 border-b border-border">
                <div className="container mx-auto px-6 text-center space-y-4">
                    <h1 className="text-4xl font-heading font-bold">Devotional Library</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Connect with the divine through sacred hymns, mantras, and prayers.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">
                {/* Sidebar */}
                <div className="lg:w-64 flex-shrink-0 space-y-2">
                    <h3 className="font-heading font-bold text-lg mb-4 px-2">Categories</h3>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCat(cat)}
                            className={cn(
                                "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex justify-between items-center group",
                                selectedCat === cat
                                    ? "bg-primary/10 text-primary"
                                    : "hover:bg-accent hover:text-foreground text-muted-foreground"
                            )}
                        >
                            {cat}
                            <span className={cn("w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity", selectedCat === cat && "opacity-100")} />
                        </button>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SAMPLE_CONTENT.filter(c => c.type === selectedCat || selectedCat === "All").map((item, idx) => (
                        <div key={idx} className="bg-card border border-border p-6 rounded-xl hover:shadow-lg transition-all group cursor-pointer hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-secondary rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-mono bg-accent/50 px-2 py-1 rounded text-muted-foreground">{item.lang}</span>
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1"><ClockIcon /> {item.duration}</span>
                            </div>

                            <div className="mt-6 flex gap-2">
                                <button className="flex-1 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">Read</button>
                                <button className="p-2 rounded-md border border-input hover:bg-accent text-foreground transition-colors group/audio">
                                    <Play className="w-4 h-4 fill-current ml-0.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function ClockIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
    )
}
