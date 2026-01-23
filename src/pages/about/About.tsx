import "./About.css";
import { useQuery } from '@tanstack/react-query';
import { convertSQLTimetoText } from '../../helpers/functions';

export default function About() {
    const {
        data: lastUpdatedData,
        isSuccess: isUpdateSuccess,
        isLoading: isUpdateLoading,
        isError: isUpdateError,
    } = useQuery({
        queryKey: ['last_updated'],
        staleTime: Infinity,
        queryFn: async () => {
            const response = await fetch('https://moneyindc.ayaan7m.workers.dev/dataupdates');
            const json = await response.json();
            return json.data;
        }
    });

    const {
        data: sectorData,
        isSuccess: isSectorSuccess,
        isLoading: isSectorLoading,
        isError: isSectorError,
    } = useQuery({
        queryKey: ['sectorandindustry'],
        staleTime: Infinity,
        queryFn: async () => {
            const response = await fetch('https://moneyindc.ayaan7m.workers.dev/sectorandindustry');
            const json = await response.json();
            return json.data;
        }
    });

    interface data_updates {
        last_updated: string;
        description: string;
    }

    interface sector_industry {
        sector_name: string;
        industries: string;
    }

    return (
        <div className="about">
            <div className="title">
                <h1>About the Project</h1>
            </div>

            <div className="body">
                <img src="images/logo_rect.png" alt="Site Logo" style={{ maxWidth: '300px', marginBottom: '20px' }} />
                <p>
                    Every year, billions of dollars flow into U.S. elections. While the government publishes every transaction, the raw data is still "flat". It tells you <i>who</i> gave, but not necessarily <i>what industry</i> they represent.
                    <br /><br />
                    This project provides a visual and educational overview of campaign finance and lobbying activity. By bridging official records with a transparent classification engine, we help users explore how organizational funding intersects with federal office.
                </p>
            </div>

            <div className="title">
                <h1>Using the Site</h1>
            </div>

            <div className="body">
                <p>
                    Users can interact with the map to explore finance data by location. Clicking a state reveals its <b>U.S. Senators</b>, while congressional districts display <b>House Representatives</b>.
                </p>
                <ul>
                    {/*<li><b>Scores & Grades:</b> Officials are assigned a letter grade based on reported corporate and PAC contributions, scaled relative to the power of their office.</li> */}
                    <li><b>Organization Profiles:</b> Explore specific lobbying firms and corporations to see their total political footprint.</li>
                    <li><b>Sector Breakdown:</b> See exactly which industries (Defense, Tech, Healthcare) are funding specific candidates.</li>
                </ul>
            </div>

            <div className="title">
                <h1>The Methodology</h1>
            </div>

            <div className="body">
                <p>
                    Accuracy is our priority. We apply a <b>Hierarchical Linkage Engine</b> to turn raw reports into insights:
                </p>
                <ol>
                    <li><b>LD-203 & LD-2 Integration:</b> We match Lobbying Contribution reports with Lobbying Activity filings.</li>
                    <li><b>Issue Code Mapping:</b> We use official Senate issue codes (e.g., <i>DEF</i>, <i>PHA</i>) to categorize firms into broad sectors.</li>
                    <li><b>Candidate Mapping:</b> We sync with the <i>@unitedstates</i> project to link FEC IDs to Bioguide IDs, ensuring data follows a politician across their career.</li>
                </ol>

                <br />

                <h3>Sectors and Industries</h3>
                <p>To make the data scannable, we group specific lobbying codes into the following broad sectors:</p>

                <details className="sector-details">
                    <summary> View Sector Definitions </summary>
                    {isSectorError && <p>Error loading sector data.</p>}
                    {isSectorLoading && <p>Loading sectors...</p>}
                    {isSectorSuccess && sectorData.map((item: sector_industry) => (
                        <details key={item.sector_name} className="sub-details">
                            <summary><b>{item.sector_name}</b></summary>
                            <ul>
                                {item.industries.split(', ').map((industry: string) => (
                                    <li key={industry}>{industry}</li>
                                ))}
                            </ul>
                        </details>
                    ))}
                </details>
            </div>

            <div className="title">
                <h1>Legal & Disclaimers</h1>
            </div>

            <div className="body">
                <p>
                    All classifications are independently generated using publicly reported data. They do not allege wrongdoing, illegality, or unethical behavior. Campaign contributions are legal and standard in the U.S. electoral process.
                    <br /><br />
                    Data is sourced from the <b>Federal Election Commission (FEC)</b> and the <b>Secretary of the Senate</b>. While we strive for accuracy, this site does not guarantee real-time completeness. Users should consult official records for formal research.
                </p>
            </div>

            <div className="title">
                <h1>System Status</h1>
            </div>

            <div className="body">
                <h3>Last Data Refresh:</h3>
                {isUpdateLoading && <p>Loading refresh status...</p>}
                {isUpdateError && <p>Error fetching update logs.</p>}
                {isUpdateSuccess && (
                    <ul>
                        {lastUpdatedData.map((table: data_updates) => (
                            <li key={table.description}>
                                <b>{table.description}:</b> {convertSQLTimetoText(table.last_updated)}
                            </li>
                        ))}
                    </ul>
                )}
                <p><small>Timestamps are displayed in your local timezone.</small></p>

                <br />
                <h3>Contact</h3>
                <p>
                    For feedback or inquiries, please open an issue on the project's <a href="https://github.com/chexedy/moneyindc" target="_blank" rel="noreferrer">GitHub</a>.
                    <br /><br />
                    &copy; {new Date().getFullYear()} chexedy incorporated (Real)
                </p>
            </div>
        </div>
    );
}