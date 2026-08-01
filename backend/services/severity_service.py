HIGH = {
    "dead": 5,
    "death": 5,
    "trapped": 4,
    "collapsed": 5,
    "explosion": 5,
    "critical": 4,
    "severe": 3,
    "multiple injured": 4
}

MEDIUM = {
    "injured": 2,
    "damage": 2,
    "flooded": 2,
    "fire": 2,
    "blocked": 1,
    "rescue": 1
}

LOW = {
    "waterlogging": 1,
    "traffic": 1,
    "minor": 1,
    "small fire": 1
}


def calculate_score(text):

    text = text.lower()

    score = 0

    for word, value in HIGH.items():
        if word in text:
            score += value

    for word, value in MEDIUM.items():
        if word in text:
            score += value

    for word, value in LOW.items():
        if word in text:
            score += value

    if score >= 6:
        severity = "High"
    elif score >= 3:
        severity = "Medium"
    else:
        severity = "Low"

    if severity == "High":
        priority = "Critical"
    elif severity == "Medium":
        priority = "Moderate"
    else:
        priority = "Low"

    return {
        "severity": severity,
        "priority": priority,
        "score": score
    }