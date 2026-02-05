import swisseph as swe
from datetime import datetime

# Set ephemeris path (current directory is fine)
swe.set_ephe_path(".")

PLANETS = {
    "Sun": swe.SUN,
    "Moon": swe.MOON,
    "Mars": swe.MARS,
    "Mercury": swe.MERCURY,
    "Jupiter": swe.JUPITER,
    "Venus": swe.VENUS,
    "Saturn": swe.SATURN,
}


def get_planets(date: str, time: str, latitude: float, longitude: float) -> dict:
    """
    Calculate planetary longitudes using Swiss Ephemeris
    """

    # Parse datetime
    dt = datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M")

    # Julian Day
    jd = swe.julday(
        dt.year,
        dt.month,
        dt.day,
        dt.hour + dt.minute / 60.0
    )

    # Set observer location
    swe.set_topo(longitude, latitude, 0)

    planets = {}
    for name, planet_id in PLANETS.items():
        position, _ = swe.calc_ut(jd, planet_id)
        planets[name] = round(position[0], 2)

    return planets
