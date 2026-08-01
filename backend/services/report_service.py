from backend.services.social_service import get_social_reports
from backend.services.database_service import save_incident

from backend.services.severity_service import calculate_score
from backend.services.resource_service import recommend_resource

from ai.classifier import classify_report
from backend.services.map_service import get_coordinates


def sync_reports():

    reports = get_social_reports()

    inserted = 0

    for report in reports:

        text = report["description"]

        # AI Classification
        prediction = classify_report(text)

        report["disaster_type"] = prediction["disaster_type"]
        report["confidence"] = prediction["confidence"]

        # Dataset already contains location
        report["location"] = report["location"]

        # Severity
        severity = calculate_score(text)

        report["severity"] = severity["severity"]
        report["priority"] = severity["priority"]
        report["severity_score"] = severity["score"]

        # Resource Recommendation
        resource = recommend_resource(
            report["disaster_type"]
        )

        report["recommended_resource"] = resource
        coordinates = get_coordinates(report["location"])

        report["latitude"] = coordinates["latitude"]
        report["longitude"] = coordinates["longitude"]

        if save_incident(report):

            inserted += 1

    return {

        "status": "Success",

        "reports_inserted": inserted,

        "total_reports": len(reports)

    }


def get_all_reports():

    from backend.services.database_service import get_all_incidents

    return get_all_incidents()