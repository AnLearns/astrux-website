
// src/lib/astrology.ts
import { format } from "date-fns";

export interface PanchangData {
    tithi: string;
    nakshatra: string;
    yoga: string;
    karana: string;
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    rahuKalam: string;
    yamagandam: string;
    gulikaKalam: string;
    paksha: "Shukla" | "Krishna";
    ritu: string; // Season
    vikramSamvat: number;
    shakaSamvat: number;
}

const NAKSHATRAS = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha", "Ardra",
    "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
    "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
    "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta",
    "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
];

const TITHIS = [
    "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shasthi",
    "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi",
    "Chaturdashi", "Purnima", "Amavasya"
];

const YOGAS = [
    "Vishkambha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda",
    "Sukarma", "Dhriti", "Shula", "Ganda", "Vriddhi", "Dhruva", "Vyaghata",
    "Harshana", "Vajra", "Siddhi", "Vyatipata", "Variyan", "Parigha", "Shiva",
    "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma", "Indra", "Vaidhriti"
];

const KARANAS = [
    "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti",
    "Shakuni", "Chatushpada", "Naga", "Kimstughna"
];

function pseudoRandom(seed: number) {
    let value = seed;
    return function () {
        value = (value * 9301 + 49297) % 233280;
        return value / 233280;
    };
}

export function getPanchang(date: Date, location: string): PanchangData {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const seed = day + month * 100 + year * 10000;
    const rand = pseudoRandom(seed);

    // Determine Tithi based on moon phase simulation (rough)
    const tithiIndex = Math.floor(rand() * 15);
    const isKrishna = rand() > 0.5;

    const nakshatraIndex = Math.floor(rand() * 27);
    const yogaIndex = Math.floor(rand() * 27);
    const karanaIndex = Math.floor(rand() * 11);

    // Sunrise/Sunset simulation based on rough seasonal time
    // Summer (Jun-Aug): Early sunrise, late sunset
    // Winter (Dec-Feb): Late sunrise, early sunset
    const isSummer = month >= 5 && month <= 7;
    const isWinter = month >= 11 || month <= 1;

    let sunriseHour = 6;
    let sunsetHour = 18;

    if (isSummer) { sunriseHour = 5; sunsetHour = 19; }
    else if (isWinter) { sunriseHour = 7; sunsetHour = 17; }

    // Add some randomness to minutes
    const sunriseMin = Math.floor(rand() * 30);
    const sunsetMin = Math.floor(rand() * 30);

    const sunrise = `${sunriseHour}:${sunriseMin.toString().padStart(2, '0')} AM`;
    const sunset = `${(sunsetHour - 12)}:${sunsetMin.toString().padStart(2, '0')} PM`;

    // Rahu Kalam (changes daily)
    // Simplified logic: rotates by weekday
    const dayOfWeek = date.getDay(); // 0 = Sun, 6 = Sat
    const rahuKalams = [
        "4:30 PM - 6:00 PM", // Sun
        "7:30 AM - 9:00 AM", // Mon
        "3:00 PM - 4:30 PM", // Tue
        "12:00 PM - 1:30 PM", // Wed
        "1:30 PM - 3:00 PM", // Thu
        "10:30 AM - 12:00 PM", // Fri
        "9:00 AM - 10:30 AM", // Sat
    ];

    return {
        tithi: `${TITHIS[tithiIndex]} ${isKrishna ? "Krishna Paksha" : "Shukla Paksha"}`,
        nakshatra: NAKSHATRAS[nakshatraIndex],
        yoga: YOGAS[yogaIndex],
        karana: KARANAS[karanaIndex],
        sunrise,
        sunset,
        moonrise: `${Math.floor(rand() * 12) + 1}:${Math.floor(rand() * 60).toString().padStart(2, '0')} PM`,
        moonset: `${Math.floor(rand() * 12) + 1}:${Math.floor(rand() * 60).toString().padStart(2, '0')} AM`,
        rahuKalam: rahuKalams[dayOfWeek],
        yamagandam: "10:43 AM - 12:15 PM",
        gulikaKalam: "1:45 PM - 3:15 PM",
        paksha: isKrishna ? "Krishna" : "Shukla",
        ritu: isSummer ? "Grishma" : isWinter ? "Shishir" : "Vasant",
        vikramSamvat: 2080 + (month > 3 ? 1 : 0),
        shakaSamvat: 1945 + (month > 3 ? 1 : 0),
    };
}
