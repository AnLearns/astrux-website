import swisseph as swe
from datetime import datetime

swe.set_ephe_path(".")

ZODIAC_SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
]

PLANETS = {
    "Sun": swe.SUN,
    "Moon": swe.MOON,
    "Mars": swe.MARS,
    "Mercury": swe.MERCURY,
    "Jupiter": swe.JUPITER,
    "Venus": swe.VENUS,
    "Saturn": swe.SATURN,
    "Rahu": swe.MEAN_NODE,
    "Ketu": None
}

SIGN_LORDS = {
    "Aries": "Mars",
    "Taurus": "Venus",
    "Gemini": "Mercury",
    "Cancer": "Moon",
    "Leo": "Sun",
    "Virgo": "Mercury",
    "Libra": "Venus",
    "Scorpio": "Mars",
    "Sagittarius": "Jupiter",
    "Capricorn": "Saturn",
    "Aquarius": "Saturn",
    "Pisces": "Jupiter"
}

SIGN_ELEMENTS = {
    "Aries": "Fire", "Taurus": "Earth", "Gemini": "Air", "Cancer": "Water",
    "Leo": "Fire", "Virgo": "Earth", "Libra": "Air", "Scorpio": "Water",
    "Sagittarius": "Fire", "Capricorn": "Earth", "Aquarius": "Air", "Pisces": "Water"
}

SIGN_MODALITIES = {
    "Aries": "Cardinal", "Taurus": "Fixed", "Gemini": "Mutable", "Cancer": "Cardinal",
    "Leo": "Fixed", "Virgo": "Mutable", "Libra": "Cardinal", "Scorpio": "Fixed",
    "Sagittarius": "Mutable", "Capricorn": "Cardinal", "Aquarius": "Fixed", "Pisces": "Mutable"
}


def get_current_transits(date: str = None, time: str = None) -> dict:
    """
    Get current planetary positions (transits)
    If no date/time provided, uses current moment
    """
    if date and time:
        dt = datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M")
    else:
        dt = datetime.now()
    
    jd = swe.julday(dt.year, dt.month, dt.day, dt.hour + dt.minute / 60.0)
    
    transits = {}
    
    for name, planet_id in PLANETS.items():
        if name == "Ketu":
            rahu_pos, _ = swe.calc_ut(jd, swe.MEAN_NODE)
            ketu_degree = (rahu_pos[0] + 180) % 360
            sign_index = int(ketu_degree / 30)
            transits["Ketu"] = {
                "degree": round(ketu_degree, 2),
                "sign": ZODIAC_SIGNS[sign_index],
                "sign_degree": round(ketu_degree % 30, 2)
            }
        else:
            pos, _ = swe.calc_ut(jd, planet_id)
            degree = pos[0]
            sign_index = int(degree / 30)
            transits[name] = {
                "degree": round(degree, 2),
                "sign": ZODIAC_SIGNS[sign_index],
                "sign_degree": round(degree % 30, 2)
            }
    
    return transits


def get_sign_info(sign: str) -> dict:
    """
    Get information about a zodiac sign
    """
    return {
        "name": sign,
        "lord": SIGN_LORDS.get(sign, "Unknown"),
        "element": SIGN_ELEMENTS.get(sign, "Unknown"),
        "modality": SIGN_MODALITIES.get(sign, "Unknown")
    }


def get_planet_sign_position(planet_degree: float) -> dict:
    """
    Get sign and position within sign for a planet
    """
    sign_index = int(planet_degree / 30) % 12
    sign = ZODIAC_SIGNS[sign_index]
    sign_degree = planet_degree % 30
    
    return {
        "sign": sign,
        "sign_index": sign_index,
        "degree_in_sign": round(sign_degree, 2),
        "lord": SIGN_LORDS.get(sign, "Unknown")
    }


def is_retrograde(jd: float, planet_id: int) -> bool:
    """
    Check if a planet is retrograde
    """
    pos, ret = swe.calc_ut(jd, planet_id)
    return ret[3] < 0


def get_zodiac_sign_from_degree(degree: float) -> str:
    """
    Get zodiac sign from absolute degree
    """
    sign_index = int(degree / 30) % 12
    return ZODIAC_SIGNS[sign_index]
