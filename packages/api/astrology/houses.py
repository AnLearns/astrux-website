import swisseph as swe
from datetime import datetime

swe.set_ephe_path(".")

ZODIAC_SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
]


def get_lagna(date: str, time: str, latitude: float, longitude: float) -> dict:
    """
    Calculate Ascendant (Lagna) degree and sign
    """
    dt = datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M")
    jd = swe.julday(dt.year, dt.month, dt.day, dt.hour + dt.minute / 60.0)
    
    houses, ascmc = swe.houses(jd, latitude, longitude)
    lagna_degree = ascmc[0]
    lagna_sign_index = int(lagna_degree / 30)
    lagna_sign = ZODIAC_SIGNS[lagna_sign_index]
    
    return {
        "degree": round(lagna_degree, 2),
        "sign": lagna_sign,
        "sign_index": lagna_sign_index,
        "sign_degree": round(lagna_degree % 30, 2)
    }


def get_house_cusps(date: str, time: str, latitude: float, longitude: float) -> list:
    """
    Calculate all 12 house cusps
    """
    dt = datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M")
    jd = swe.julday(dt.year, dt.month, dt.day, dt.hour + dt.minute / 60.0)
    
    houses, ascmc = swe.houses(jd, latitude, longitude)
    
    cusps = []
    for i, cusp in enumerate(houses):
        sign_index = int(cusp / 30)
        cusps.append({
            "house": i + 1,
            "degree": round(cusp, 2),
            "sign": ZODIAC_SIGNS[sign_index],
            "sign_degree": round(cusp % 30, 2)
        })
    
    return cusps


def get_planet_house(planet_degree: float, cusps: list) -> int:
    """
    Determine which house a planet is in based on house cusps
    """
    for i in range(12):
        current_cusp = cusps[i]["degree"]
        next_cusp = cusps[(i + 1) % 12]["degree"]
        
        if current_cusp < next_cusp:
            if current_cusp <= planet_degree < next_cusp:
                return i + 1
        else:
            if planet_degree >= current_cusp or planet_degree < next_cusp:
                return i + 1
    
    return 1


def degree_to_sign_degree(degree: float) -> tuple:
    """
    Convert absolute degree to (sign_name, degree_in_sign)
    """
    sign_index = int(degree / 30) % 12
    sign_degree = degree % 30
    return ZODIAC_SIGNS[sign_index], round(sign_degree, 2)


def format_degree(degree: float) -> str:
    """
    Format degree as D° M' S"
    """
    d = int(degree)
    m = int((degree - d) * 60)
    s = int(((degree - d) * 60 - m) * 60)
    return f"{d}° {m:02d}' {s:02d}\""
