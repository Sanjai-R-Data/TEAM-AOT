import pandas as pd


def get_coordinates(location):

    if not location:
        return {
            "latitude": None,
            "longitude": None
        }

    df = pd.read_csv("data/locations.csv")

    # Clean strings
    location = location.strip().lower()

    df["location"] = (
        df["location"]
        .astype(str)
        .str.strip()
        .str.lower()
    )

    # Exact Match
    result = df[df["location"] == location]

    # Partial Match
    if result.empty:

        result = df[
            df["location"].str.contains(location, na=False)
        ]

    # Reverse Partial Match
    if result.empty:

        result = df[
            df["location"].apply(
                lambda x: x in location
            )
        ]

    if result.empty:

        print("Location NOT FOUND:", location)

        return {
            "latitude": None,
            "longitude": None
        }

    print("Location FOUND:", result.iloc[0]["location"])

    return {
        "latitude": float(result.iloc[0]["latitude"]),
        "longitude": float(result.iloc[0]["longitude"])
    }