import requests

BASE_URL = "https://api.gdeltproject.org/api/v2/doc/doc"


def get_gdelt_reports():

    params = {
        "query": "flood OR fire OR earthquake OR cyclone",
        "mode": "ArtList",
        "format": "json",
        "maxrecords": 20,
    }

    response = requests.get(BASE_URL, params=params)

    print("Status:", response.status_code)
    print(response.text[:500])   # Debug

    if response.status_code != 200:
        return []

    data = response.json()

    print(data.keys())           # Debug

    return data.get("articles", [])