def get_dasha(moon_deg):
    if moon_deg < 120:
        return "Venus Mahadasha"
    elif moon_deg < 240:
        return "Sun Mahadasha"
    else:
        return "Moon Mahadasha"
