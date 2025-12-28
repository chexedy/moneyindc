import "./Scores.css";
import { SCORE_TIERS } from "../data/scores";

export default function Scores() {
    return (
        <div className="scores">
            <div className="title">
                <h1>Scores</h1>
            </div>

            <div className="body">
                <p>Scores reflect the level of financial influence on an elected official relative to the power of their office. Each official is assigned a letter grade from S to F based on the total amount of campaign money they have accepted as reported to the Federal Election Commission. An S indicates no reported contributions, while lower grades represent increasing levels of financial influence. Because different offices operate at different scales, scoring thresholds vary for Representatives, Senators, and the Executive branch to ensure fair comparisons. These scores measure reported campaign funding only and do not account for unreported or independent expenditures.</p>
            </div>

            <div className="score-table-wrapper">
                <table className="score-table">
                    <thead>
                        <tr>
                            <th>Score</th>
                            <th>House</th>
                            <th>Senate</th>
                            <th>Executive</th>
                        </tr>
                    </thead>

                    <tbody>
                        {SCORE_TIERS.map((tier) => (
                            <tr key={tier.score}>
                                <td>
                                    <span
                                        style={{
                                            backgroundColor: tier.color,
                                            padding: "4px 10px",
                                            borderRadius: "6px",
                                            fontWeight: 700,
                                        }}
                                    >
                                        {tier.score}
                                    </span>
                                </td>
                                <td>{tier.rep}</td>
                                <td>{tier.senate}</td>
                                <td>{tier.exec}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}