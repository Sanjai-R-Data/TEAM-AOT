from backend.database import SessionLocal
from backend.models import Incident


def save_incident(report):

    db = SessionLocal()

    existing = db.query(Incident).filter(
        Incident.description == report["description"],
        Incident.location == report["location"]
    ).first()


    if existing:
        db.close()
        return False
    incident = Incident(

        source=report["source"],

        title=report["title"],

        description=report["description"],

        disaster_type=report["disaster_type"],

        confidence=report["confidence"],

        location=report["location"],

        latitude=report["latitude"],

        longitude=report["longitude"],

        severity=report["severity"],

        priority=report["priority"],

        severity_score=report["severity_score"],

        resource_name=(
            report["recommended_resource"]["resource_name"]
            if report["recommended_resource"] else None
        ),

        resource_type=(
            report["recommended_resource"]["resource_type"]
            if report["recommended_resource"] else None
        ),

        published_at=report["published_at"],

        url=report["url"]

    )

    db.add(incident)
    db.commit()
    db.close()

    return True

def get_all_incidents():

    db = SessionLocal()

    reports = db.query(Incident).all()

    data = []

    for incident in reports:

        data.append({
            "id": incident.id,
            "source": incident.source,
            "title": incident.title,
            "description": incident.description,
            "disaster_type": incident.disaster_type,
            "confidence": incident.confidence,
            "location": incident.location,
            "severity": incident.severity,
            "priority": incident.priority,
            "severity_score": incident.severity_score,
            "latitude": incident.latitude,

            "longitude": incident.longitude,
            "resource_name": incident.resource_name,

            "resource_type": incident.resource_type,
            "published_at": incident.published_at,
            "url": incident.url
        })

    db.close()

    return data