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
}


def get_planets(date: str, time: str, latitude: float, longitude: float) -> dict:
    """
    Calculate planetary longitudes using Swiss Ephemeris
    Returns all planets including Rahu and Ketu
    """
    dt = datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M")
    
    jd = swe.julday(
        dt.year,
        dt.month,
        dt.day,
        dt.hour + dt.minute / 60.0
    )
    
    swe.set_topo(longitude, latitude, 0)
    
    planets = {}
    
    for name, planet_id in PLANETS.items():
        position, ret = swe.calc_ut(jd, planet_id)
        degree = position[0]
        sign_index = int(degree / 30)
        retrograde = ret[3] < 0
        
        planets[name] = {
            "degree": round(degree, 2),
            "sign": ZODIAC_SIGNS[sign_index],
            "sign_degree": round(degree % 30, 2),
            "retrograde": retrograde
        }
    
    rahu_degree = planets["Rahu"]["degree"]
    ketu_degree = (rahu_degree + 180) % 360
    ketu_sign_index = int(ketu_degree / 30)
    
    planets["Ketu"] = {
        "degree": round(ketu_degree, 2),
        "sign": ZODIAC_SIGNS[ketu_sign_index],
        "sign_degree": round(ketu_degree % 30, 2),
        "retrograde": True
    }
    
    return planets


def get_planet_positions_with_houses(date: str, time: str, latitude: float, longitude: float) -> dict:
    """
    Calculate planetary positions with house placements
    """
    from astrology.houses import get_house_cusps, get_planet_house, get_lagna
    
    planets = get_planets(date, time, latitude, longitude)
    cusps = get_house_cusps(date, time, latitude, longitude)
    lagna = get_lagna(date, time, latitude, longitude)
    
    for name, data in planets.items():
        house = get_planet_house(data["degree"], cusps)
        planets[name]["house"] = house
    
    return {
        "planets": planets,
        "lagna": lagna,
        "houses": cusps
    }
