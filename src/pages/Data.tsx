import "./Data.css";
import { useQuery } from '@tanstack/react-query';

export default function Data() {
    const {
        data: sectorandindustries,
        isSuccess,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['sectorandindustry'],
        staleTime: Infinity,
        queryFn: async () => {
            const response = await fetch('https://uslobbying-api.ayaan7m.workers.dev/sectorandindustry');
            return (await response.json());
        }
    });

    console.log("Data last updated:", sectorandindustries);
    interface sector_industry {
        sector_name: string;
        industries: string;
    }

    return (
        <div className="data">
            <div className="title">
                <h1>Political Money in the US</h1>
            </div>

            <div className="body">
                <p>
                    Running for public office in the U.S. requires money. Candidates raise funds to pay for staff, advertising, travel, and outreach to voters. This system is known as <b>campaign finance</b>.

                    <br />
                    <br />

                    To create transparency, federal law requires campaigns to publicly report where their money comes from and how much they receive. These disclosures are collected and published by the <b>Federal Election Commission (FEC)</b>.
                </p>

                <br />

                <h1>Who Can Give Money</h1>

                <br />

                <p>
                    Campaigns can receive money from:

                    <br />

                    <ul>
                        <li><b>Individuals</b>, donating their own personal funds</li>
                        <li><b>Political committees (PACs)</b>, which pool donations and contribute to candidates</li>
                    </ul>

                    <br />

                    There are limits on how much can be given, and campaigns must regularly file detailed reports listing each contribution.
                </p>

                <br />

                <h1>What Is and Isn’t Included</h1>

                <br />

                <p>
                    Not all political spending goes directly to candidates.

                    <ul>
                        <li>Money <b>given to a campaign</b> is reported as a contribution.</li>
                        <li>Money <b>spent independently</b> to support or oppose candidates (such as outside advertising) is reported separately and is not controlled by the campaign.</li>
                        <li><b>Lobbying</b>, which involves influencing legislation rather than elections, is regulated under a different system. I plan to add it in the future.</li>
                    </ul>
                </p>

                <br />

                <h1>Why This Data Exists</h1>

                <br />

                <p>
                    These disclosure rules exist so the public can see <b>who is financially supporting elected officials</b>, helping voters better understand the financial forces surrounding government decision-making.
                </p>
            </div>

            <div className="title">
                <h1>Our Methodology</h1>
            </div>

            <div className="body">
                <h1>1. Candidate Data</h1>

                <p>
                    Candidate information is sourced from public congressional datasets and includes:

                    <br />

                    <ul>
                        <li>Name</li>
                        <li>Office (House or Senate)</li>
                        <li>State and District (if applicable)</li>
                        <li>Party</li>
                        <li>Latest Election Cycle</li>
                        <li><b>Bioguide ID</b> and <b>FEC ID</b></li>
                    </ul>

                    <br />

                    Every current Congress member is stored in the database. In the future, I might add past members and previous election cycles.
                </p>
            </div>

            <div className="body">
                <h1>2. FEC Candidate IDs</h1>

                <p>
                    Campaign finance data is published by the <b>FEC</b> and is indexed by <b>FEC Candidate ID</b>, not by name.
                    <br />
                    <br />
                    Some candidates have <b>multiple FEC IDs</b> over their career (for example, one for a House campaign and another for a Senate campaign). To avoid mixing data from different offices or time periods:

                    <br />

                    <ul>
                        <li>The candidate’s <b>current office</b> is determined from official term data</li>
                        <li>The FEC ID that matches the current office is selected</li>
                        <li>Only that FEC ID is used when fetching contribution data</li>
                    </ul>

                    <br />

                    This ensures contributions are attributed to the correct campaign.
                </p>
            </div>

            <div className="body">
                <h1>3. Contribution Data (Raw Ingest)</h1>

                <p>Contribution records are pulled directly from the <b>FEC API</b>, which publishes itemized donations reported by campaigns.
                    <br />
                    <br />
                    For each contribution, the following fields are stored exactly as reported:

                    <br />

                    <ul>
                        <li>Contributor name</li>
                        <li>Contributor employer</li>
                        <li>Contributor occupation</li>
                        <li>Contributing committee (if applicable)</li>
                        <li>Contribution amount</li>
                        <li>Contribution date</li>
                        <li>Election cycle</li>
                        <li>FEC transaction ID (used to prevent duplicates)</li>
                    </ul>

                    <br />

                    These records are stored in a table and are <b>never modified or deleted</b>, preserving the original data.
                </p>
            </div>

            <div className="body">
                <h1>4. Committees, Industries, and Sectors</h1>

                <p>
                    To make contribution data easier to understand, industries are grouped into broader sectors.

                    <br />
                    <br />

                    <details>
                        <summary> View Sectors and Industries </summary>
                        {isError && (<span> Error loading sector and industry data.</span>)}
                        {isLoading && <span> Loading sector and industry data...</span>}

                        {isSuccess && sectorandindustries.data.map((item: sector_industry) => (
                            <details name="sectorandindustries">
                                <summary><b>{item.sector_name}</b></summary>
                                <ul>
                                    {item.industries.split(', ').map((industry: string) => (
                                        <li>{industry}</li>
                                    ))}
                                </ul>
                            </details>
                        ))}
                    </details>

                    <br />

                    Each industry belongs to exactly one sector. This structure allows contributions to be viewed at different levels of detail.
                </p>
            </div>

            <div className="body">
                <h1>5. Classification Rules</h1>

                <p>
                    Raw contribution data does not include industry labels. To classify contributions, a rules-based system is applied.

                    <br />
                    <br />

                    Each rule specifies:

                    <ul>
                        <li>The field to match (<b>employer</b>, <b>occupation</b>, or <b>committee</b>)</li>
                        <li>A text pattern (e.g. “EXXON”, “LOCKHEED”)</li>
                        <li>The industry the contribution should be assigned to</li>
                        <li>A confidence level (<b>high</b>, <b>medium</b>, or <b>low</b>)</li>
                    </ul>

                    <br />

                    Examples:

                    <ul>
                        <li>Contributions from committees with names matching “LOCKHEED” are classified as <b>Defense Contractors</b></li>
                        <li>Contributions where the employer contains “EXXON” are classified as <b>Oil & Gas</b></li>
                    </ul>

                    <br />

                    Rules are designed to be:

                    <ul>
                        <li>Transparent</li>
                        <li>Reproducible</li>
                        <li>Easy to audit and update</li>
                    </ul>
                </p>
            </div>

            <div className="body">
                <h1>6. Contribution Classification</h1>

                <p>
                    Each raw contribution is evaluated against the classification rules.

                    <br />
                    <br />

                    If a match is found:

                    <br />

                    <ul>
                        <li>The contribution is linked to an industry and sector</li>
                        <li>A confidence level is assigned</li>
                        <li>The classification version is recorded</li>
                    </ul>

                    <br />

                    A contribution is classified at most once. Unmatched contributions remain unclassified and are excluded from sector totals.
                </p>
            </div>

            <div className="body">
                <h1>7. Aggregation and Totals</h1>

                <p>
                    Classified contributions are aggregated to produce totals such as:

                    <br />
                    <br />

                    <ul>
                        <li>Total contributions to a candidate by sector</li>
                        <li>Totals by election cycle</li>
                        <li>Comparisons across industries within a sector</li>
                    </ul>

                    <br />

                    These aggregated values are stored separately so the site can load quickly without recomputing totals on each request.
                </p>
            </div>

            <div className="body">
                <h1>8. Updates and Data Freshness</h1>

                <p>
                    Data is updated periodically by re-fetching:

                    <br />

                    <ul>
                        <li>Candidate status</li>
                        <li>FEC contribution records</li>
                        <li>Committee information</li>
                    </ul>

                    <br />

                    Each table records the last time it was updated. When data is refreshed:

                    <ul>
                        <li>New records are added</li>
                        <li>Existing records are preserved</li>
                        <li>Aggregated totals are recalculated</li>
                    </ul>
                </p>
            </div>

            <div className="body">
                <h1>9. Limitations and Caveats</h1>

                <p>
                    While every effort is made to ensure accuracy, there are important limitations:

                    <br />
                    <br />

                    <ul>
                        <li>Classification is based on reported employer, occupation, and committee names, which may be incomplete or inconsistent</li>
                        <li>Individual donors without identifiable employers or occupations may remain unclassified</li>
                        <li>Some industries may be under- or over-represented due to reporting practices</li>
                    </ul>

                    <br />

                    This site prioritizes transparency over guesswork. Unclear data is left unclassified rather than forced into a category.
                </p>
            </div>

            <div className="body">
                <h1>10. Open Methodology</h1>

                <p>
                    All classification logic is rule-based and documented. There are no proprietary scores or hidden weighting systems.

                    <br />
                    <br />

                    The goal is not to editorialize, but to make publicly available data easier to explore and understand.
                </p>
            </div>
        </div>
    );
}