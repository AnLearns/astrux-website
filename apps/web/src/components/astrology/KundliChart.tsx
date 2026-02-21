
"use client"

import React from 'react';

// Simplified North Indian Chart (Diamond Style)
export function KundliChart({ planets = [] }: { planets?: any[] }) {
    return (
        <div className="relative w-full aspect-square max-w-md mx-auto bg-card border border-primary/20 p-1">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-primary/30 stroke-[0.5] text-[3px] fill-foreground font-medium">
                {/* Outer Border */}
                <rect x="0" y="0" width="100" height="100" fill="none" strokeWidth="1" />

                {/* Diagonals */}
                <line x1="0" y1="0" x2="100" y2="100" />
                <line x1="100" y1="0" x2="0" y2="100" />

                {/* Diamond Borders (Midpoints) */}
                <line x1="50" y1="0" x2="100" y2="50" />
                <line x1="100" y1="50" x2="50" y2="100" />
                <line x1="50" y1="100" x2="0" y2="50" />
                <line x1="0" y1="50" x2="50" y2="0" />

                {/* House Numbers (Static for example) */}
                <text x="50" y="15" textAnchor="middle" className="text-[2.5px] opacity-70">1</text>
                <text x="25" y="15" textAnchor="middle" className="text-[2.5px] opacity-70">2</text>
                <text x="10" y="25" textAnchor="middle" className="text-[2.5px] opacity-70">3</text>
                <text x="25" y="50" textAnchor="middle" className="text-[2.5px] opacity-70">4</text>
                <text x="10" y="75" textAnchor="middle" className="text-[2.5px] opacity-70">5</text>
                <text x="25" y="85" textAnchor="middle" className="text-[2.5px] opacity-70">6</text>
                <text x="50" y="85" textAnchor="middle" className="text-[2.5px] opacity-70">7</text>
                <text x="75" y="85" textAnchor="middle" className="text-[2.5px] opacity-70">8</text>
                <text x="90" y="75" textAnchor="middle" className="text-[2.5px] opacity-70">9</text>
                <text x="75" y="50" textAnchor="middle" className="text-[2.5px] opacity-70">10</text>
                <text x="90" y="25" textAnchor="middle" className="text-[2.5px] opacity-70">11</text>
                <text x="75" y="15" textAnchor="middle" className="text-[2.5px] opacity-70">12</text>

                {/* Planets Placement - Mock positions for visual demo */}
                <text x="50" y="25" textAnchor="middle" className="fill-primary font-bold">Lagna</text>
                <text x="15" y="45" textAnchor="middle" className="fill-primary">Su, Me</text>
                <text x="85" y="45" textAnchor="middle" className="fill-primary">Mo</text>
                <text x="50" y="75" textAnchor="middle" className="fill-primary">Ju</text>
                <text x="25" y="25" textAnchor="middle" className="fill-primary">Ve</text>
                <text x="75" y="75" textAnchor="middle" className="fill-primary">Sa, Ra</text>
            </svg>
        </div>
    )
}
