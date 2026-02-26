const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface PanchangData {
    date: string;
    tithi: string;
    paksha: string;
    nakshatra: string;
    nakshatra_pada: number;
    yoga: string;
    karana: string;
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    rahu_kalam: string;
    yamagandam: string;
    gulika_kalam: string;
    ritu: string;
    vikram_samvat: number;
    shaka_samvat: number;
    sun_longitude: number;
    moon_longitude: number;
}

export interface PlanetData {
    degree: number;
    sign: string;
    sign_degree: number;
    retrograde: boolean;
    house?: number;
}

export interface HouseData {
    house: number;
    degree: number;
    sign: string;
    sign_degree: number;
}

export interface LagnaData {
    degree: number;
    sign: string;
    sign_index: number;
    sign_degree: number;
}

export interface KundliData {
    name?: string;
    birth_details: {
        date: string;
        time: string;
        latitude: number;
        longitude: number;
    };
    lagna: LagnaData;
    planets: Record<string, PlanetData>;
    houses: HouseData[];
    moon_nakshatra: string;
    nakshatra_pada: number;
    dasha: string;
}

export interface TransitData {
    [key: string]: {
        degree: number;
        sign: string;
        sign_degree: number;
    };
}

export interface HoroscopeData {
    sign: string;
    period: string;
    date: string;
    predictions: {
        overview: string;
        love: string;
        career: string;
        health: string;
        lucky_color: string;
        lucky_number: number;
        mood: string;
    };
    transits: TransitData;
}

export interface PalmistryData {
    name?: string;
    reading: {
        life_line: string;
        heart_line: string;
        head_line: string;
        fate_line: string;
        summary: string;
    };
    dominant_hand: string;
}

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE}${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: "An error occurred" }));
        throw new Error(error.detail || "API request failed");
    }

    return response.json();
}

export async function getPanchang(date: string, latitude: number, longitude: number): Promise<PanchangData> {
    return fetchAPI<PanchangData>("/panchang", {
        method: "POST",
        body: JSON.stringify({ date, latitude, longitude }),
    });
}

export async function getKundli(
    date: string,
    time: string,
    latitude: number,
    longitude: number,
    name?: string,
    gender?: string
): Promise<KundliData> {
    return fetchAPI<KundliData>("/kundli", {
        method: "POST",
        body: JSON.stringify({ date, time, latitude, longitude, name, gender }),
    });
}

export async function getTransits(date?: string, time?: string): Promise<{ date: string; transits: TransitData }> {
    const params = new URLSearchParams();
    if (date) params.append("date", date);
    if (time) params.append("time", time);
    const query = params.toString() ? `?${params.toString()}` : "";
    return fetchAPI<{ date: string; transits: TransitData }>(`/transits${query}`);
}

export async function getHoroscope(sign: string, period: string = "daily"): Promise<HoroscopeData> {
    return fetchAPI<HoroscopeData>(`/horoscope/${sign}?period=${period}`);
}

export async function getPalmistryReading(
    name?: string,
    gender?: string,
    dominant_hand: string = "right"
): Promise<PalmistryData> {
    return fetchAPI<PalmistryData>("/palmistry", {
        method: "POST",
        body: JSON.stringify({ name, gender, dominant_hand }),
    });
}

export const DEFAULT_LOCATION = {
    latitude: 28.6139,
    longitude: 77.2090,
    name: "New Delhi, India",
};

export const ZODIAC_SIGNS = [
    { id: "aries", name: "Aries", symbol: "♈", dates: "Mar 21 - Apr 19" },
    { id: "taurus", name: "Taurus", symbol: "♉", dates: "Apr 20 - May 20" },
    { id: "gemini", name: "Gemini", symbol: "♊", dates: "May 21 - Jun 20" },
    { id: "cancer", name: "Cancer", symbol: "♋", dates: "Jun 21 - Jul 22" },
    { id: "leo", name: "Leo", symbol: "♌", dates: "Jul 23 - Aug 22" },
    { id: "virgo", name: "Virgo", symbol: "♍", dates: "Aug 23 - Sep 22" },
    { id: "libra", name: "Libra", symbol: "♎", dates: "Sep 23 - Oct 22" },
    { id: "scorpio", name: "Scorpio", symbol: "♏", dates: "Oct 23 - Nov 21" },
    { id: "sagittarius", name: "Sagittarius", symbol: "♐", dates: "Nov 22 - Dec 21" },
    { id: "capricorn", name: "Capricorn", symbol: "♑", dates: "Dec 22 - Jan 19" },
    { id: "aquarius", name: "Aquarius", symbol: "♒", dates: "Jan 20 - Feb 18" },
    { id: "pisces", name: "Pisces", symbol: "♓", dates: "Feb 19 - Mar 20" },
];
