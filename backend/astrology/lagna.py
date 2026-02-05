import swisseph as swe
from datetime import datetime

swe.set_ephe_path(".")


def get_lagna(date: str, time: str, latitude: float, longitude: float) -> float:
    """
    Calculate Ascendant (Lagna) degree
    """

    dt = datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M")

    jd = swe.julday(
        dt.year,
        dt.month,
        dt.day,
        dt.hour + dt.minute / 60.0
    )

    # Houses calculation
    houses, ascmc = swe.houses(jd, latitude, longitude)

    lagna_degree = round(ascmc[0], 2)
    return lagna_degree
