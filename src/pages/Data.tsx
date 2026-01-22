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
            const response = await fetch('https://moneyindc.ayaan7m.workers.dev/sectorandindustry');
            return (await response.json());
        }
    });

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
                    Every year, billions of dollars flow into U.S. elections. While the <b>Federal Election Commission (FEC)</b> publishes every transaction, the raw data is "flat". It tells you <i>who</i> gave, but not
                    necessarily <i>what industry</i> they represent. This site bridges that gap
                    using a transparent, rules-based classification engine.
                </p>

                <br />

                <h1>How We Classify: The Waterfall</h1>
                <p>
                    To ensure accuracy, we apply a <b>Hierarchical Waterfall</b>. Every transaction passes through
                    the following logic stages:
                    <br /><br />
                    <ol>
                        <li><b>Direct Matching:</b> We match the exact FEC Committee ID against known corporate or labor PACs (e.g., Lockheed Martin).</li>
                        <li><b>Pattern Recognition:</b> We search for keywords in employer and committee names (e.g., "Goldman Sachs" matches Investment Banking).</li>
                        <li><b>Professional Mapping:</b> For individual donors, we look at reported occupations (e.g., "Attorney" matches Legal Services).</li>
                        <li><b>FEC Category Fallback:</b> If no specific rule exists, we use the FEC's "Interest Group" tags to assign a broad sector.</li>
                    </ol>
                </p>

                <br />

                <h1>What Is and Isn’t Included</h1>
                <p>
                    Intellectual honesty is our priority. You should know the following:
                    <ul>
                        <li><b>Direct Contributions:</b> Money given directly to a candidate's campaign or their Leadership PAC.</li>
                        <li><b>Dark Money:</b> 501(c)(4) groups are not required to disclose donors. This money appears as "Unclassified Advocacy" because the law allows it to stay hidden.</li>
                        <li><b>Conduits:</b> Platforms like ActBlue or WinRed act as "middlemen." We track the final recipient, but the original industry source can sometimes be obscured by the donor's self-reporting.</li>
                    </ul>
                </p>
            </div>

            <div className="title">
                <h1>Our Methodology</h1>
            </div>

            <div className="body">
                <h1>1. Candidate Data</h1>
                <p>
                    Candidate information is sourced from public congressional datasets and includes:
                    <ul>
                        <li>Name, Office, Party, and State</li>
                        <li><b>Bioguide ID</b> and <b>FEC ID</b></li>
                    </ul>
                    Every current member of Congress is stored. We map multiple FEC IDs to ensure
                    House and Senate careers are correctly linked to the same person.
                </p>

                <br />

                <h1>2. Sectors and Industries</h1>
                <p>
                    To make data easier to understand, industries are grouped into broader sectors.
                    <br /><br />
                    <details>
                        <summary> View Sectors and Industries </summary>
                        {isError && (<span> Error loading sector and industry data.</span>)}
                        {isLoading && <span> Loading sector and industry data...</span>}

                        {isSuccess && sectorandindustries.data.map((item: sector_industry) => (
                            <details key={item.sector_name} name="sectorandindustries">
                                <summary><b>{item.sector_name}</b></summary>
                                <ul>
                                    {item.industries.split(', ').map((industry: string) => (
                                        <li key={industry}>{industry}</li>
                                    ))}
                                </ul>
                            </details>
                        ))}
                    </details>
                </p>

                <br />

                <h1>3. Classification and Aggregation</h1>
                <p>
                    Once classified, data is aggregated to show total intake by sector.
                    Unmatched contributions remain "Unclassified" and are excluded from specific sector totals
                    to avoid misleading guesswork. This site prioritizes <b>transparency over assumptions.</b>
                </p>
            </div>
        </div>
    );
}