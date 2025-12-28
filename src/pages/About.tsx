import "./About.css";

export default function About() {
    return (
        <div className="about">
            <div className="title">
                <h1>About</h1>
            </div>

            <div className="body">
                <p>
                    This project provides a visual and educational overview of publicly available political campaign finance data in the United States. The information displayed is derived from official government sources, including the Federal Election Commission (FEC), and is presented for transparency, research, and informational purposes only.
                    <br />
                    <br />
                    The scores and summaries shown on this site are independently generated classifications based solely on reported contribution totals and filing data. They do not allege wrongdoing, illegality, or unethical behavior by any individual or organization. Campaign contributions are legal under U.S. law and are a common part of the electoral process.
                    <br />
                    <br />
                    All data is displayed as reported by candidates, committees, and organizations at the time of filing. While efforts are made to keep information current and accurate, this site does not guarantee completeness or real-time accuracy. Users are encouraged to consult original government records for official or legal use.
                    <br />
                    <br />
                    This project is non-partisan, unaffiliated with any political party, candidate, or government agency, and is intended to promote public understanding of campaign finance disclosures through accessible visualization.
                    <br />
                    <br />
                    Whether this system serves voters at all, rather than those with the most money to spend, is increasingly questioned.
                </p>
            </div>
        </div>
    )
}