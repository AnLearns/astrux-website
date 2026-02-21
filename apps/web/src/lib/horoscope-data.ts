export type ZodiacSign = {
    id: string;
    name: string;
    dateRange: string;
    element: "Fire" | "Earth" | "Air" | "Water";
    symbol: string;
    traits: string[];
};

export const zodiacSigns: ZodiacSign[] = [
    { id: "aries", name: "Aries", dateRange: "Mar 21 - Apr 19", element: "Fire", symbol: "♈", traits: ["Bold", "Ambitious", "Dynamic"] },
    { id: "taurus", name: "Taurus", dateRange: "Apr 20 - May 20", element: "Earth", symbol: "♉", traits: ["Reliable", "Patient", "Devoted"] },
    { id: "gemini", name: "Gemini", dateRange: "May 21 - Jun 20", element: "Air", symbol: "♊", traits: ["Versatile", "Expressive", "Curious"] },
    { id: "cancer", name: "Cancer", dateRange: "Jun 21 - Jul 22", element: "Water", symbol: "♋", traits: ["Intuitive", "Sentimental", "Compassionate"] },
    { id: "leo", name: "Leo", dateRange: "Jul 23 - Aug 22", element: "Fire", symbol: "♌", traits: ["Passionate", "Generous", "Warm-hearted"] },
    { id: "virgo", name: "Virgo", dateRange: "Aug 23 - Sep 22", element: "Earth", symbol: "♍", traits: ["Loyal", "Analytical", "Kind"] },
    { id: "libra", name: "Libra", dateRange: "Sep 23 - Oct 22", element: "Air", symbol: "♎", traits: ["Cooperative", "Diplomatic", "Gracious"] },
    { id: "scorpio", name: "Scorpio", dateRange: "Oct 23 - Nov 21", element: "Water", symbol: "♏", traits: ["Resourceful", "Brave", "Passionate"] },
    { id: "sagittarius", name: "Sagittarius", dateRange: "Nov 22 - Dec 21", element: "Fire", symbol: "♐", traits: ["Generous", "Idealistic", "Great sense of humor"] },
    { id: "capricorn", name: "Capricorn", dateRange: "Dec 22 - Jan 19", element: "Earth", symbol: "♑", traits: ["Responsible", "Disciplined", "Self-control"] },
    { id: "aquarius", name: "Aquarius", dateRange: "Jan 20 - Feb 18", element: "Air", symbol: "♒", traits: ["Progressive", "Original", "Independent"] },
    { id: "pisces", name: "Pisces", dateRange: "Feb 19 - Mar 20", element: "Water", symbol: "♓", traits: ["Artistic", "Compassionate", "Gentle"] },
];

export const getDailyHoroscope = (_signId: string) => {
    // Mock random daily horoscope
    const intros = ["Today is a day for", "The stars suggest you to", "Planetary alignments favor"];
    const actions = ["taking bold steps", "reflection and rest", "connecting with loved ones", "focusing on career goals"];
    const outcomes = ["leading to unexpected joy.", "bringing clarity to your path.", "enhancing your creative energy.", "solving a long-standing puzzle."];

    const random = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    return {
        date: new Date().toLocaleDateString(),
        text: `${random(intros)} ${random(actions)}, ${random(outcomes)} Trust your intuition as the Moon shifts phases.`,
        luckyNumber: Math.floor(Math.random() * 99) + 1,
        mood: ["Optimistic", "Reflective", "Energetic", "Calm"][Math.floor(Math.random() * 4)]
    };
};
