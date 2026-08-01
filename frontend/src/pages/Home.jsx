import DashboardCards from "../components/DashboardCards";
import MapComponent from "../components/MapComponent";
import IncidentTable from "../components/IncidentTable";

import "../styles/dashboard.css";

function Home() {
  return (
    <div className="dashboard">

      <h1 className="title">
        AI Disaster Response Coordinator
      </h1>

      <DashboardCards />

      <div className="map-section">
        <MapComponent />
      </div>

      <div className="table-section">
        <IncidentTable />
      </div>

    </div>
  );
}

export default Home;