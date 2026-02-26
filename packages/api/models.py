from pydantic import BaseModel  
from typing import Optional  
  
  
class BirthData(BaseModel):  
    date: str  
    time: str  
    latitude: float  
    longitude: float  
  
  
class PanchangRequest(BaseModel):  
    date: str  
    latitude: float  
    longitude: float  
  
  
class KundliRequest(BaseModel):  
    name: Optional[str] = None  
    date: str  
    time: str  
    latitude: float  
    longitude: float  
    gender: Optional[str] = None  
  
  
class HoroscopeRequest(BaseModel):  
    sign: str  
    period: str = "daily"  
    latitude: float = 28.6139  
    longitude: float = 77.2090  
  
  
class PalmistryRequest(BaseModel):  
    name: Optional[str] = None  
    gender: Optional[str] = None  
    dominant_hand: str = "right"
