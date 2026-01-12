import "./About.css";
import { useQuery } from '@tanstack/react-query';

import { convertSQLTimetoText } from '../helpers/functions';

export default function About() {
    const {
        data: last_updated,
        isSuccess,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['last_updated'],
        staleTime: Infinity,
        queryFn: async () => {
            const response = await fetch('https://moneyindc.ayaan7m.workers.dev/dataupdates');
            return (await response.json());
        }
    });

    interface data_updates {
        last_updated: string;
        description: string;
    }

    return (
        <div className="about">
            <div className="title">
                <h1>About</h1>
            </div>

            <div className="body">
                <img src="images/logo_rect.png" alt="Site Logo"></img>

                <p>
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
                    All data is sourced from the <a href="https://www.fec.gov/" target="_blank">Federal Election Commission (FEC)</a> and the <a href="https://unitedstates.github.io/" target="_blank">@unitedstates</a> project. If anything candidate profile related (name, image, party, etc.) is missing or incorrect, it is likely an issue with the @unitedstates data, and you should contact them directly.
                    <br />
                    <br />
                </p>

                <h1>
                    Last Updated:
                </h1>

                <p>
                    {isLoading && <span> Loading...</span>}
                    {isError && <span> Error fetching data. Try again later.</span>}

                    {isSuccess && (
                        <ul>
                            {last_updated.data.map((table: data_updates) => (
                                <li> {table.description} - {convertSQLTimetoText(table.last_updated)}</li>
                            ))}
                        </ul>
                    )}

                    These are in your local timezone.
                </p>
            </div>

            <div className="title">
                <h1>Contact</h1>
            </div>

            <div className="body">
                <p>
                    For questions, feedback, or media inquiries, please make an issue on the site's <a href="https://github.com/chexedy/moneyindc" target="_blank">GitHub</a>. Please be clear and concise about the problem, and I will look into the issue ASAP.

                    <br />
                    <br />

                    &copy; chexedy incorporated (Real)
                </p>
            </div>
        </div>
    )
}