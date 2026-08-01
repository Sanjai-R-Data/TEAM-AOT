import pandas as pd


def get_social_reports():

    df = pd.read_csv("data/social_reports.csv")

    reports = []

    for _, row in df.iterrows():

        reports.append({

            "source": row["source"],

            "title": None,

            "description": row["description"],

            "location": row["location"],

            "published_at": None,

            "url": None

        })

    return reports