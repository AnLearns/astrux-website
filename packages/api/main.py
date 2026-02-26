from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import BirthData, PanchangRequest, KundliRequest, PalmistryRequest
import random
from astrology.planets import get_planets, get_planet_positions_with_houses
from astrology.panchang import get_panchang
from astrology.nakshatra import get_nakshatra
from astrology.dasha import get_dasha
from astrology.lagna import get_lagna
from astrology.houses import get_house_cusps, get_planet_house
from astrology.transits import get_current_transits, ZODIAC_SIGNS
import swisseph as swe
from datetime import datetime, timedelta

app = FastAPI(title="Astrux API", description="Vedic Astrology API powered by Swiss Ephemeris")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Astrux API - Vedic Astrology", "version": "1.0.0"}


@app.post("/panchang")
def panchang(data: PanchangRequest):
    """
    Get complete Panchang for a given date and location
    """
    try:
        result = get_panchang(data.date, data.latitude, data.longitude)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/kundli")
def kundli(data: KundliRequest):
    """
    Generate complete Kundli (birth chart) with planetary positions and houses
    """
    try:
        chart_data = get_planet_positions_with_houses(
            data.date, data.time, data.latitude, data.longitude
        )
        
        moon_deg = chart_data["planets"]["Moon"]["degree"]
        nakshatra, pada = get_nakshatra(moon_deg)
        dasha = get_dasha(moon_deg)
        
        return {
            "name": data.name,
            "birth_details": {
                "date": data.date,
                "time": data.time,
                "latitude": data.latitude,
                "longitude": data.longitude
            },
            "lagna": chart_data["lagna"],
            "planets": chart_data["planets"],
            "houses": chart_data["houses"],
            "moon_nakshatra": nakshatra,
            "nakshatra_pada": pada,
            "dasha": dasha
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/full-chart")
def full_chart(data: BirthData):
    """
    Legacy endpoint - Get full chart data
    """
    dt = datetime.strptime(f"{data.date} {data.time}", "%Y-%m-%d %H:%M")
    jd = swe.julday(dt.year, dt.month, dt.day, dt.hour + dt.minute / 60)

    planets = get_planets(data.date, data.time, data.latitude, data.longitude)
    moon_deg = planets["Moon"]["degree"]

    nakshatra, pada = get_nakshatra(moon_deg)
    dasha = get_dasha(moon_deg)

    return {
        "planets": planets,
        "moon_nakshatra": nakshatra,
        "pada": pada,
        "dasha": dasha
    }


@app.get("/transits")
def transits(date: str = None, time: str = None):
    """
    Get current planetary transits
    """
    try:
        result = get_current_transits(date, time)
        return {"date": date or datetime.now().strftime("%Y-%m-%d"), "transits": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/horoscope/{sign}")
def horoscope(sign: str, period: str = "daily"):
    """
    Get horoscope for a zodiac sign based on current transits
    """
    sign = sign.capitalize()
    if sign not in ZODIAC_SIGNS:
        raise HTTPException(status_code=400, detail=f"Invalid zodiac sign. Valid signs: {ZODIAC_SIGNS}")
    
    try:
        transits = get_current_transits()
        
        predictions = generate_transit_predictions(sign, transits, period)
        
        return {
            "sign": sign,
            "period": period,
            "date": datetime.now().strftime("%Y-%m-%d"),
            "predictions": predictions,
            "transits": transits
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def generate_transit_predictions(sign: str, transits: dict, period: str) -> dict:
    """
    Generate predictions based on planetary transits relative to the sign
    """
    sign_index = ZODIAC_SIGNS.index(sign)
    
    predictions = {
        "overview": "",
        "love": "",
        "career": "",
        "health": "",
        "lucky_color": "",
        "lucky_number": 0,
        "mood": ""
    }
    
    sun_sign = transits["Sun"]["sign"]
    moon_sign = transits["Moon"]["sign"]
    jupiter_sign = transits["Jupiter"]["sign"]
    saturn_sign = transits["Saturn"]["sign"]
    
    sun_aspect = ZODIAC_SIGNS.index(sun_sign) - sign_index
    moon_aspect = ZODIAC_SIGNS.index(moon_sign) - sign_index
    jupiter_aspect = ZODIAC_SIGNS.index(jupiter_sign) - sign_index
    saturn_aspect = ZODIAC_SIGNS.index(saturn_sign) - sign_index
    
    if sun_aspect == 0:
        predictions["overview"] = f"The Sun is in your sign, {sign}! This brings vitality, confidence, and attention your way. It's an excellent time for new beginnings and self-expression."
        predictions["mood"] = "Energetic"
        predictions["lucky_color"] = "Gold"
    elif sun_aspect == 6 or sun_aspect == -6:
        predictions["overview"] = f"The Sun is opposing your sign, which may create some tension or challenges. Balance and compromise are key during this period."
        predictions["mood"] = "Reflective"
        predictions["lucky_color"] = "White"
    else:
        predictions["overview"] = f"With the Sun in {sun_sign}, focus on areas related to that house in your chart. This is a stable period for steady progress."
        predictions["mood"] = "Balanced"
        predictions["lucky_color"] = get_lucky_color(sign)
    
    if jupiter_aspect == 0 or abs(jupiter_aspect) == 4 or abs(jupiter_aspect) == 8:
        predictions["career"] = f"Jupiter's position in {jupiter_sign} brings expansion and growth opportunities. Career prospects look promising with potential for recognition or advancement."
    else:
        predictions["career"] = "Focus on building foundations and consolidating your position. Patience will yield results in due time."
    
    if moon_sign == sign:
        predictions["love"] = "The Moon in your sign heightens your emotional sensitivity and intuition. Relationships may feel more intense today. Trust your instincts in matters of the heart."
    else:
        predictions["love"] = f"With the Moon in {moon_sign}, emotional energy flows differently. Be open to understanding your partner's perspective. Communication is highlighted."
    
    if saturn_aspect == 0 or abs(saturn_aspect) == 4 or abs(saturn_aspect) == 8:
        predictions["health"] = f"Saturn's influence from {saturn_sign} suggests taking extra care of your health. Maintain regular routines and avoid overexertion. Rest and discipline are your allies."
    else:
        predictions["health"] = "Your health prospects are stable. Regular exercise and mindful eating will maintain your well-being. Listen to your body's signals."
    
    predictions["lucky_number"] = get_lucky_number(sign, transits["Moon"]["sign_degree"])
    
    if period == "weekly":
        predictions["overview"] = f"For this week: {predictions['overview']} The planetary movements suggest gradual progress throughout the week."
    elif period == "monthly":
        predictions["overview"] = f"For this month: {predictions['overview']} Major themes include personal growth and relationship dynamics."
    elif period == "yearly":
        predictions["overview"] = f"For this year: {predictions['overview']} Jupiter and Saturn transits will shape major life areas. Prepare for transformative experiences."
    
    return predictions


@app.post("/palmistry")
def palmistry(data: PalmistryRequest):
    """
    Generate a simulated palmistry reading
    """
    try:
        # Mock data for palmistry reading
        life_lines = [
            "Your Life Line indicates a journey filled with robust vitality. You possess a deep reservoir of energy that helps you overcome obstacles with resilience.",
            "A beautifully curving Life Line suggests a life rich with diverse experiences and emotional depth. You naturally attract harmonious relationships.",
            "Your strong Life Line points to a stable and grounded existence. You are a pillar of strength for those around you, deeply rooted in your values.",
            "A dynamic Life Line reveals an adventurous spirit. You thrive on change and are always ready to embrace the unknown with enthusiasm."
        ]
        
        heart_lines = [
            "Your Heart Line reveals a compassionate and giving nature. You love deeply and are profoundly empathetic to the feelings of others.",
            "A clear Heart Line indicates emotional balance and sincerity. You approach relationships with honesty and a desire for meaningful connection.",
            "Your winding Heart Line suggests a complex emotional landscape. You experience feelings intensely and value profound, transformative love.",
            "A strong Heart Line points to romantic idealism. You believe in true love and often wear your heart on your sleeve, inspiring others with your devotion."
        ]
        
        head_lines = [
            "Your Head Line shows a sharp, analytical mind. You excel at problem-solving and approach challenges with logic and clarity.",
            "A sweeping Head Line indicates immense creativity and imagination. You think outside the box and are drawn to artistic or innovative pursuits.",
            "Your distinct Head Line points to a practical and focused intellect. You are goal-oriented and possess excellent concentration.",
            "A branching Head Line reveals a multifaceted intellect. You are adaptable, quick-witted, and have a thirst for diverse knowledge."
        ]
        
        fate_lines = [
            "Your Fate Line suggests a strong sense of purpose. You are driven to achieve your goals and often find yourself in leadership roles.",
            "A subtle Fate Line indicates a fluid life path. You are adaptable and open to where the universe may guide you, enjoying the journey over the destination.",
            "Your clear Fate Line points to a destined trajectory. You have a profound inner knowing of your life's mission and the determination to fulfill it.",
            "A multi-layered Fate Line reveals a life of diverse careers or deep passions. You successfully juggle multiple interests and find fulfillment in variety."
        ]

        summary = "Your palm reveals a highly balanced individual with a unique blend of intellectual curiosity and emotional depth. The cosmic energies suggest that trusting your intuition will guide you towards your highest potential."

        return {
            "name": data.name,
            "reading": {
                "life_line": random.choice(life_lines),
                "heart_line": random.choice(heart_lines),
                "head_line": random.choice(head_lines),
                "fate_line": random.choice(fate_lines),
                "summary": summary
            },
            "dominant_hand": data.dominant_hand
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



def get_lucky_color(sign: str) -> str:
    colors = {
        "Aries": "Red",
        "Taurus": "Green",
        "Gemini": "Yellow",
        "Cancer": "Silver",
        "Leo": "Orange",
        "Virgo": "Navy Blue",
        "Libra": "Pink",
        "Scorpio": "Maroon",
        "Sagittarius": "Purple",
        "Capricorn": "Black",
        "Aquarius": "Electric Blue",
        "Pisces": "Sea Green"
    }
    return colors.get(sign, "White")


def get_lucky_number(sign: str, moon_degree: float) -> int:
    base_numbers = {
        "Aries": 9,
        "Taurus": 6,
        "Gemini": 5,
        "Cancer": 2,
        "Leo": 1,
        "Virgo": 5,
        "Libra": 6,
        "Scorpio": 8,
        "Sagittarius": 3,
        "Capricorn": 8,
        "Aquarius": 4,
        "Pisces": 7
    }
    base = base_numbers.get(sign, 1)
    modifier = int(moon_degree / 10)
    return (base + modifier) % 99 + 1
