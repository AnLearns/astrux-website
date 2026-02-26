import swisseph as swe
from datetime import datetime, timedelta
import math

swe.set_ephe_path(".")

NAKSHATRAS = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
    "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
    "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
    "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta",
    "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
]

TITHIS = [
    "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi",
    "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi",
    "Chaturdashi", "Purnima", "Amavasya"
]

YOGAS = [
    "Vishkambha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda",
    "Sukarma", "Dhriti", "Shula", "Ganda", "Vriddhi", "Dhruva", "Vyaghata",
    "Harshana", "Vajra", "Siddhi", "Vyatipata", "Variyan", "Parigha", "Shiva",
    "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma", "Indra", "Vaidhriti"
]

KARANAS = [
    "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti",
    "Shakuni", "Chatushpada", "Naga", "Kimstughna"
]

RITUS = ["Vasant", "Grishma", "Varsha", "Sharad", "Hemant", "Shishir"]


def get_sunrise_sunset(jd: float, latitude: float, longitude: float) -> tuple:
    """
    Calculate sunrise and sunset times for a given Julian Day and location
    """
    try:
        sunrise = swe.rise_trans(jd, swe.SUN, lon=longitude, lat=latitude, rsmi=swe.CALC_RISE)[1]
        sunset = swe.rise_trans(jd, swe.SUN, lon=longitude, lat=latitude, rsmi=swe.CALC_SET)[1]
        return sunrise, sunset
    except:
        return None, None


def get_moonrise_moonset(jd: float, latitude: float, longitude: float) -> tuple:
    """
    Calculate moonrise and moonset times
    """
    try:
        moonrise = swe.rise_trans(jd, swe.MOON, lon=longitude, lat=latitude, rsmi=swe.CALC_RISE)[1]
        moonset = swe.rise_trans(jd, swe.MOON, lon=longitude, lat=latitude, rsmi=swe.CALC_SET)[1]
        return moonrise, moonset
    except:
        return None, None


def jd_to_time(jd: float) -> str:
    """
    Convert Julian Day to HH:MM AM/PM format
    """
    if jd is None:
        return "N/A"
    
    jd_day = int(jd) + 0.5
    jd_time = jd - int(jd) + 0.5
    
    hours = (jd_time * 24) % 24
    hour = int(hours)
    minute = int((hours - hour) * 60)
    
    period = "AM" if hour < 12 else "PM"
    hour = hour if hour <= 12 else hour - 12
    hour = 12 if hour == 0 else hour
    
    return f"{hour}:{minute:02d} {period}"


def get_tithi(sun_lon: float, moon_lon: float) -> tuple:
    """
    Calculate Tithi based on Sun and Moon longitude
    Returns (tithi_name, paksha)
    """
    diff = (moon_lon - sun_lon) % 360
    tithi_index = int(diff / 12)
    paksha = "Shukla" if tithi_index < 15 else "Krishna"
    
    if paksha == "Krishna":
        tithi_index = tithi_index - 15 if tithi_index > 15 else tithi_index
    
    if tithi_index >= 15:
        tithi_index = 15
    elif tithi_index < 0:
        tithi_index = 0
    
    if tithi_index == 14 and paksha == "Shukla":
        return "Purnima", paksha
    elif tithi_index == 14 and paksha == "Krishna":
        return "Amavasya", paksha
    
    return TITHIS[tithi_index], paksha


def get_nakshatra(moon_lon: float) -> tuple:
    """
    Calculate Nakshatra and Pada from Moon longitude
    Returns (nakshatra_name, pada)
    """
    nakshatra_length = 360 / 27
    index = int(moon_lon / nakshatra_length) % 27
    pada = int((moon_lon % nakshatra_length) / (nakshatra_length / 4)) + 1
    return NAKSHATRAS[index], pada


def get_yoga(sun_lon: float, moon_lon: float) -> str:
    """
    Calculate Yoga based on Sun and Moon longitude
    """
    combined = (sun_lon + moon_lon) % 360
    yoga_length = 360 / 27
    index = int(combined / yoga_length) % 27
    return YOGAS[index]


def get_karana(sun_lon: float, moon_lon: float) -> str:
    """
    Calculate Karana based on Sun and Moon longitude
    """
    diff = (moon_lon - sun_lon) % 360
    karana_length = 6
    total_karanas = int(diff / karana_length) % 60
    
    if total_karanas < 57:
        karana_index = total_karanas % 7
    else:
        karana_index = 7 + (total_karanas - 57)
    
    if karana_index >= len(KARANAS):
        karana_index = karana_index % len(KARANAS)
    
    return KARANAS[karana_index]


def get_rahu_kalam(date: datetime, sunrise: float, sunset: float) -> str:
    """
    Calculate Rahu Kalam based on weekday and sunrise/sunset
    """
    day_of_week = date.weekday()
    
    rahu_factors = [8, 2, 7, 5, 6, 4, 3]
    
    if sunrise is None or sunset is None:
        day_parts = [
            "6:00 AM - 7:30 AM",
            "7:30 AM - 9:00 AM", 
            "9:00 AM - 10:30 AM",
            "10:30 AM - 12:00 PM",
            "12:00 PM - 1:30 PM",
            "1:30 PM - 3:00 PM",
            "3:00 PM - 4:30 PM",
            "4:30 PM - 6:00 PM"
        ]
        return day_parts[rahu_factors[day_of_week] - 1]
    
    day_length = sunset - sunrise
    part_length = day_length / 8
    
    rahu_start = sunrise + (rahu_factors[day_of_week] - 1) * part_length
    rahu_end = rahu_start + part_length
    
    return f"{jd_to_time(rahu_start)} - {jd_to_time(rahu_end)}"


def get_yamagandam(date: datetime, sunrise: float, sunset: float) -> str:
    """
    Calculate Yamagandam based on weekday
    """
    day_of_week = date.weekday()
    yamaganda_factors = [5, 4, 3, 2, 1, 7, 6]
    
    if sunrise is None or sunset is None:
        day_parts = [
            "6:00 AM - 7:30 AM",
            "7:30 AM - 9:00 AM", 
            "9:00 AM - 10:30 AM",
            "10:30 AM - 12:00 PM",
            "12:00 PM - 1:30 PM",
            "1:30 PM - 3:00 PM",
            "3:00 PM - 4:30 PM",
            "4:30 PM - 6:00 PM"
        ]
        return day_parts[yamaganda_factors[day_of_week] - 1]
    
    day_length = sunset - sunrise
    part_length = day_length / 8
    
    yama_start = sunrise + (yamaganda_factors[day_of_week] - 1) * part_length
    yama_end = yama_start + part_length
    
    return f"{jd_to_time(yama_start)} - {jd_to_time(yama_end)}"


def get_gulika_kalam(date: datetime, sunrise: float, sunset: float) -> str:
    """
    Calculate Gulika Kalam based on weekday
    """
    day_of_week = date.weekday()
    gulika_factors = [7, 6, 5, 4, 3, 2, 1]
    
    if sunrise is None or sunset is None:
        day_parts = [
            "6:00 AM - 7:30 AM",
            "7:30 AM - 9:00 AM", 
            "9:00 AM - 10:30 AM",
            "10:30 AM - 12:00 PM",
            "12:00 PM - 1:30 PM",
            "1:30 PM - 3:00 PM",
            "3:00 PM - 4:30 PM",
            "4:30 PM - 6:00 PM"
        ]
        return day_parts[gulika_factors[day_of_week] - 1]
    
    day_length = sunset - sunrise
    part_length = day_length / 8
    
    gulika_start = sunrise + (gulika_factors[day_of_week] - 1) * part_length
    gulika_end = gulika_start + part_length
    
    return f"{jd_to_time(gulika_start)} - {jd_to_time(gulika_end)}"


def get_ritu(month: int) -> str:
    """
    Get Ritu (season) based on Hindu lunar month
    """
    ritu_map = {
        0: "Vasant", 1: "Vasant",
        2: "Grishma", 3: "Grishma",
        4: "Varsha", 5: "Varsha",
        6: "Sharad", 7: "Sharad",
        8: "Hemant", 9: "Hemant",
        10: "Shishir", 11: "Shishir"
    }
    return ritu_map.get(month, "Vasant")


def get_samvat(year: int, month: int) -> tuple:
    """
    Calculate Vikram Samvat and Shaka Samvat
    These are approximations
    """
    vikram_samvat = year + 57
    shaka_samvat = year - 78
    
    if month < 4:
        vikram_samvat -= 1
        shaka_samvat -= 1
    
    return vikram_samvat, shaka_samvat


def get_panchang(date: str, latitude: float, longitude: float) -> dict:
    """
    Get complete Panchang for a given date and location
    """
    dt = datetime.strptime(date, "%Y-%m-%d")
    
    jd = swe.julday(dt.year, dt.month, dt.day, 12.0)
    
    jd_sunrise, jd_sunset = get_sunrise_sunset(jd, latitude, longitude)
    jd_moonrise, jd_moonset = get_moonrise_moonset(jd, latitude, longitude)
    
    sun_pos, _ = swe.calc_ut(jd, swe.SUN)
    moon_pos, _ = swe.calc_ut(jd, swe.MOON)
    
    sun_lon = sun_pos[0]
    moon_lon = moon_pos[0]
    
    tithi, paksha = get_tithi(sun_lon, moon_lon)
    nakshatra, pada = get_nakshatra(moon_lon)
    yoga = get_yoga(sun_lon, moon_lon)
    karana = get_karana(sun_lon, moon_lon)
    
    vikram_samvat, shaka_samvat = get_samvat(dt.year, dt.month)
    
    return {
        "date": date,
        "tithi": tithi,
        "paksha": paksha,
        "nakshatra": nakshatra,
        "nakshatra_pada": pada,
        "yoga": yoga,
        "karana": karana,
        "sunrise": jd_to_time(jd_sunrise),
        "sunset": jd_to_time(jd_sunset),
        "moonrise": jd_to_time(jd_moonrise),
        "moonset": jd_to_time(jd_moonset),
        "rahu_kalam": get_rahu_kalam(dt, jd_sunrise, jd_sunset),
        "yamagandam": get_yamagandam(dt, jd_sunrise, jd_sunset),
        "gulika_kalam": get_gulika_kalam(dt, jd_sunrise, jd_sunset),
        "ritu": get_ritu(dt.month),
        "vikram_samvat": vikram_samvat,
        "shaka_samvat": shaka_samvat,
        "sun_longitude": round(sun_lon, 2),
        "moon_longitude": round(moon_lon, 2)
    }
