import "./Data.css";

export default function Data() {
    return (
        <div className="data">
            <div className="title">
                <h1>Overall Data</h1>
            </div>

            <div className="body">
                <h3>Entire Congress Overview</h3>
                <p>
                    This data goes back to 2021, as it is the oldest year current office holders began their term. <br /> These are placeholders, the actual data is coming soon!
                </p>

                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-label">Total Spent</span>
                        <span className="stat-value">$6.7B</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Lobbying Total</span>
                        <span className="stat-value">$4.1B</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Dark Money</span>
                        <span className="stat-value">$69M+</span>
                    </div>
                </div>
            </div>

            <div className="body">
                <h3>Top Industry Influence</h3>
                <p>Visualization of corporate spending by sector (Real Estate, Pharma, Tech).</p>
                <div className="data-placeholder-box">
                    <p className="sofia-pro-italic">Charts and Graphs coming soon...</p>
                </div>
            </div>
        </div>
    );
}