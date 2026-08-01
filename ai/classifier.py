from ai.model_loader import classifier
from ai.labels import DISASTER_LABELS


def classify_report(text):

    result = classifier(
        text,
        candidate_labels=DISASTER_LABELS
    )

    return {
        "disaster_type": result["labels"][0],
        "confidence": round(result["scores"][0], 3)
    }