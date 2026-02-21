from pydantic import BaseModel

class BirthData(BaseModel):
    date: str
    time: str
    latitude: float
    longitude: float
