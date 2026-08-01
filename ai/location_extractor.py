import pandas as pd

locations = pd.read_csv("data/locations.csv")


def extract_location(text):

    text = text.lower()

    for location in locations["location"]:

        if location.lower() in text:

            return location

    return None