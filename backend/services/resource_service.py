from backend.database import SessionLocal
from backend.models import Resource


def recommend_resource(disaster_type):

    db = SessionLocal()

    print("Incoming Disaster:", disaster_type)

    # Mapping should match database values
    mapping = {

        "Fire": "Fire",

        "Flood": "Flood",

        "Earthquake": "Flood",

        "Cyclone": "Flood",

        "Landslide": "Flood",

        "Accident": "Medical"

    }

    resource_type = mapping.get(disaster_type)

    print("Searching Resource Type:", resource_type)

    if resource_type is None:

        db.close()

        return None

    resource = db.query(Resource).filter(

        Resource.resource_type == resource_type,

        Resource.status == "Available"

    ).first()

    print("Database Result:", resource)

    if resource is None:

        db.close()

        return None

    result = {

        "resource_name": resource.resource_name,

        "resource_type": resource.resource_type,

        "status": resource.status,

        "phone": resource.phone

    }

    db.close()

    return result