import "./About.css";

export default function About() {
    return (
        <div className="about">
            <div className="title">
                <h1>About</h1>
            </div>

            <div className="body">
                <p>
                    This project provides a visual and educational overview of publicly available political campaign finance data in the United States. It is designed to help users explore how corporate and organizational campaign funding intersects with elected offices at the federal level.
                    <br />
                    <br />
                    This project provides a visual and educational overview of publicly available political campaign finance data in the United States. It is designed to help users explore how corporate and organizational campaign funding intersects with elected offices at the federal level.
                    <br />
                    <br />
                    All information displayed on this site is derived from official government sources, primarily the Federal Election Commission (FEC). The data is presented in an accessible, map-based format to promote transparency and public understanding of campaign finance disclosures.
                </p>
            </div>

            <div className="title">
                <h1>Using the Site</h1>
            </div>

            <div className="body">
                <p>
                    Users can interact with the map to explore campaign finance data by location and office. Clicking on a state reveals information about its U.S. Senators, while selecting a congressional district displays data for its Representative. Selecting the White House shows information related to the President and Vice President.
                    <br />
                    <br />
                    Each official is assigned a letter grade based on reported corporate and PAC campaign contributions, scaled relative to the power of their office. These scores are intended to provide context and comparison, not judgment.
                    <br />
                    <br />
                    Additional views allow users to explore contributing organizations and see how funding is distributed across offices and regions.
                </p>
            </div>

            <div className="title">
                <h1>Legal</h1>
            </div>

            <div className="body">
                <p>
                    All scores, summaries, and classifications shown on this site are independently generated using publicly reported campaign finance data filed with the Federal Election Commission. They do not allege wrongdoing, illegality, or unethical behavior by any individual or organization. Campaign contributions are legal under U.S. law and are a standard part of the electoral process.
                    <br />
                    <br />
                    Data is displayed as reported by candidates, committees, and organizations at the time of filing. While efforts are made to keep information accurate and up to date, this site does not guarantee completeness, real-time accuracy, or suitability for legal use. Users should consult official government records for verification or formal research.
                    <br />
                    <br />
                    This project is provided for informational and educational purposes only. It does not constitute political advocacy, legal advice, or endorsement of any candidate or policy.
                </p>
            </div>

            <div className="title">
                <h1>Data</h1>
            </div>

            <div className="body">
                <p>
                    All data is sourced from the <a href="https://www.fec.gov/" target="_blank">Federal Election Commission (FEC)</a> and <a href="https://www.indepthgov.com/" target="_blank">InDepthGov</a>.
                    <br />
                    <br />
                    Data was last updated on:
                </p>
            </div>

            <div className="title">
                <h1>Contact</h1>
            </div>

            <div className="body">
                <p>
                    For questions, feedback, or media inquiries, please make an issue on the site's <a href="https://github.com/chexedy/uslobbying" target="_blank">GitHub</a>. Please be clear and concise about the problem, and I will look into the issue ASAP.
                </p>
            </div>
        </div>
    )
}