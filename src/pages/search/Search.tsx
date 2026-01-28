import "./Search.css";

export default function Search() {
    return (
        <div className="search">
            <div className="title">
                <h1>Search</h1>
            </div>

            <div className="body">
                <h3>Search Committees & PACs</h3>
                <p>Search various groups and see their financial influence.</p>

                <div className="search-wrapper">
                    <input
                        type="text"
                        placeholder="Search by name (e.g., AIPAC, Google, Lockheed Martin)"
                    />
                </div>

                <div className="update-notice">
                    <p className="sofia-pro-italic">
                        This feature will be made available soon. Stay tuned for updates!
                    </p>
                </div>
            </div>
        </div>
    );
}