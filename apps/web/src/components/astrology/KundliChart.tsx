"use client"

import React from 'react';

interface PlanetPosition {
    degree: number;
    sign: string;
    sign_degree: number;
    retrograde: boolean;
    house: number;
}

interface KundliChartProps {
    planets?: Record<string, PlanetPosition>;
    lagnaSign?: string;
}

const PLANET_SHORT: Record<string, string> = {
    Sun: "Su",
    Moon: "Mo",
    Mars: "Ma",
    Mercury: "Me",
    Jupiter: "Ju",
    Venus: "Ve",
    Saturn: "Sa",
    Rahu: "Ra",
    Ketu: "Ke",
};

export function KundliChart({ planets, lagnaSign }: KundliChartProps) {
    const housePlanets: Record<number, string[]> = {};
    
    for (let i = 1; i <= 12; i++) {
        housePlanets[i] = [];
    }
    
    if (planets) {
        Object.entries(planets).forEach(([name, data]) => {
            const house = data.house || 1;
            const short = PLANET_SHORT[name] || name.substring(0, 2);
            const label = data.retrograde ? `${short}(R)` : short;
            housePlanets[house].push(label);
        });
    }
    
    const houseCoords: Record<number, { x: number; y: number; textAnchor: string }> = {
        1: { x: 50, y: 20, textAnchor: "middle" },
        2: { x: 25, y: 20, textAnchor: "middle" },
        3: { x: 10, y: 30, textAnchor: "middle" },
        4: { x: 25, y: 50, textAnchor: "middle" },
        5: { x: 10, y: 70, textAnchor: "middle" },
        6: { x: 25, y: 80, textAnchor: "middle" },
        7: { x: 50, y: 80, textAnchor: "middle" },
        8: { x: 75, y: 80, textAnchor: "middle" },
        9: { x: 90, y: 70, textAnchor: "middle" },
        10: { x: 75, y: 50, textAnchor: "middle" },
        11: { x: 90, y: 30, textAnchor: "middle" },
        12: { x: 75, y: 20, textAnchor: "middle" },
    };

    return (
        <div className="relative w-full aspect-square max-w-md mx-auto bg-card border border-primary/20 p-1">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-primary/30 stroke-[0.5] text-[3px] fill-foreground font-medium">
                <rect x="0" y="0" width="100" height="100" fill="none" strokeWidth="1" />

                <line x1="0" y1="0" x2="100" y2="100" />
                <line x1="100" y1="0" x2="0" y2="100" />

                <line x1="50" y1="0" x2="100" y2="50" />
                <line x1="100" y1="50" x2="50" y2="100" />
                <line x1="50" y1="100" x2="0" y2="50" />
                <line x1="0" y1="50" x2="50" y2="0" />

                {Object.entries(houseCoords).map(([house, coords]) => (
                    <text
                        key={house}
                        x={coords.x}
                        y={house === "1" ? coords.y - 5 : coords.y}
                        textAnchor={coords.textAnchor}
                        className="text-[2.5px] opacity-50 fill-muted-foreground"
                    >
                        {house}
                    </text>
                ))}

                {Object.entries(housePlanets).map(([house, planetList]) => {
                    const coords = houseCoords[parseInt(house)];
                    const yOffset = house === "1" ? 5 : 0;
                    return (
                        <text
                            key={`planets-${house}`}
                            x={coords.x}
                            y={coords.y + yOffset}
                            textAnchor={coords.textAnchor}
                            className="fill-primary font-bold text-[2.5px]"
                        >
                            {planetList.join(" ")}
                        </text>
                    );
                })}

                {lagnaSign && (
                    <text
                        x={50}
                        y={25}
                        textAnchor="middle"
                        className="fill-amber-400 font-bold text-[3px]"
                    >
                        Lagna ({lagnaSign})
                    </text>
                )}
            </svg>
        </div>
    );
}
