from fastapi import FastAPI
from models import BirthData
from astrology.planets import get_planets
from astrology.nakshatra import get_nakshatra
from astrology.dasha import get_dasha
from astrology.predictions import generate_predictions
from datetime import datetime
from astrology.planets import get_planets
from astrology.lagna import get_lagna
import swisseph as swe
from fastapi.middleware.cors import CORSMiddleware




app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/full-chart")
def full_chart(data: BirthData):
    dt = datetime.strptime(f"{data.date} {data.time}", "%Y-%m-%d %H:%M")
    jd = swe.julday(dt.year, dt.month, dt.day, dt.hour + dt.minute / 60)

    planets = get_planets(data.date, data.time, data.latitude, data.longitude)
    moon_deg = planets["Moon"]

    nakshatra, pada = get_nakshatra(moon_deg)
    dasha = get_dasha(moon_deg)
    predictions = generate_predictions(None, moon_deg)

    return {
        "planets": planets,
        "moon_nakshatra": nakshatra,
        "pada": pada,
        "dasha": dasha,
        "predictions": predictions
    }
