import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import api from "../services/api";

import "leaflet/dist/leaflet.css";

// ------------------------
// Custom Icons
// ------------------------

const fireIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const floodIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const earthquakeIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const defaultIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

// ------------------------

function getIcon(type) {

    if (!type) return defaultIcon;

    const disaster = type.toLowerCase();

    if (disaster.includes("fire"))
        return fireIcon;

    if (disaster.includes("flood"))
        return floodIcon;

    if (disaster.includes("earthquake"))
        return earthquakeIcon;

    return defaultIcon;
}

// ------------------------

function MapComponent() {

    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetchReports();
    }, []);

    async function fetchReports() {

        try {

            const response = await api.get("/reports");

            console.log("Reports:", response.data);

            setReports(response.data);

        }

        catch (error) {

            console.error(error);

        }

    }

    return (

        <div style={{ height: "500px", width: "100%" }}>

            <MapContainer

                center={[11.0168, 76.9558]}
                zoom={11}
                style={{ height: "100%", width: "100%" }}

            >

                <TileLayer

                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                />

                {

                    reports.map((report) => {

                        if (
                            report.latitude == null ||
                            report.longitude == null
                        ) {
                            return null;
                        }

                        return (

                            <Marker

                                key={report.id}
                                position={[report.latitude, report.longitude]}
                                icon={getIcon(report.disaster_type)}

                            >

                                <Popup>

                                    <h3>{report.disaster_type}</h3>

                                    <p>

                                        <b>Location:</b> {report.location}

                                    </p>

                                    <p>

                                        <b>Severity:</b> {report.severity}

                                    </p>

                                    <p>

                                        <b>Priority:</b> {report.priority}

                                    </p>

                                    <p>

                                        <b>Confidence:</b>{" "}
                                        {(report.confidence * 100).toFixed(1)}%

                                    </p>

                                    <p>

                                        {report.description}

                                    </p>

                                    {

                                        report.resource_name &&

                                        <>

                                            <hr />

                                            <b>Recommended Resource</b>

                                            <br />

                                            {report.resource_name}

                                            <br />

                                            {report.resource_type}

                                        </>

                                    }

                                </Popup>

                            </Marker>

                        );

                    })

                }

            </MapContainer>

        </div>

    );

}

export default MapComponent;