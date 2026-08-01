function DashboardCards() {
    return (

        <div className="cards">

            <div className="card fire">
                <h2>🔥 Fires</h2>
                <h1>0</h1>
            </div>

            <div className="card flood">
                <h2>🌊 Floods</h2>
                <h1>0</h1>
            </div>

            <div className="card resource">
                <h2>🚑 Resources</h2>
                <h1>0</h1>
            </div>

            <div className="card critical">
                <h2>⚠ Critical</h2>
                <h1>0</h1>
            </div>

        </div>

    );
}

export default DashboardCards;