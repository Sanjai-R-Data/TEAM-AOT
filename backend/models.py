from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from datetime import datetime


class Base(DeclarativeBase):
    pass


class Incident(Base):

    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)

    source = Column(String(50))

    title = Column(Text)

    description = Column(Text)

    disaster_type = Column(String(100))

    confidence = Column(Float)

    location = Column(String(255))

    latitude = Column(Float)

    longitude = Column(Float)

    severity = Column(String(50))

    priority = Column(String(50))

    severity_score = Column(Integer)

    resource_name = Column(String(100))

    resource_type = Column(String(50))

    published_at = Column(String(100))

    url = Column(Text)

    created_at = Column(DateTime, default=datetime.utcnow)

class Resource(Base):

    __tablename__ = "resources"

    id = Column(Integer, primary_key=True)

    resource_name = Column(String)

    resource_type = Column(String)

    latitude = Column(Float)

    longitude = Column(Float)

    status = Column(String)

    phone = Column(String)