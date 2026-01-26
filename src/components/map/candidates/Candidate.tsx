import "./Candidate.css";
import type { CandidateProps } from "../../../data/props";
import { useQuery } from '@tanstack/react-query';

export default function Candidate({
    id,
    state,
    district,
    closeCandidate,
}: CandidateProps) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["candidate", id ?? `${state}-${district}`],
        enabled: !!(id || (state && district !== null)),
        queryFn: async () => {
            const params = new URLSearchParams();
            if (id) params.set("id", id.toString());
            else {
                params.set("state", state);
                params.set("district", district!.toString());
            }
            const res = await fetch(`https://moneyindc.ayaan7m.workers.dev/getprofile?${params}`);
            return res.json();
        },
    });

    if (isLoading) {
        return (
            <div className="candidate-profile">
                <div className="candidate-header-row">
                    <div className="candidate-header"><h2>Loading Candidate...</h2></div>
                </div>
                <button className="close-button" onClick={closeCandidate}>Close Profile</button>
            </div>
        );
    }

    if (isError || data.error || !data) {
        return (
            <div className="candidate-profile">
                <div className="candidate-header-row">
                    <div className="candidate-header"><h2>Error loading candidate data.</h2></div>
                </div>
                <button className="close-button" onClick={closeCandidate}>Close Profile</button>
            </div>
        );
    }

    const { name, party, office, bioguide_id, fec_id, latest_cycle } = data.profile;
    const displayDistrict = district === "00" ? "01" : district;

    return (
        <div className="candidate-profile">
            <div className="candidate-header-row">
                <div className="candidate-header">
                    <img
                        src={`https://unitedstates.github.io/images/congress/450x550/${bioguide_id}.jpg`}
                        alt={`${name}'s Portrait`}
                        className="candidate-image"
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "images/noportrait.png";
                        }}
                    />
                    <div className="candidate-bio">
                        <h1 className="candidate-name">{name}</h1>
                        <div className="candidate-role">
                            {office === "SENATE" ? `Senator for ${state}` : `Rep. for ${state}-${displayDistrict}`}
                        </div>
                        <div className="candidate-party">{party}</div>
                        <div className="candidate-year">Latest Term: {latest_cycle}</div>
                    </div>
                </div>

                <div className="candidate-finance-summary">
                    <div className="stat-card">
                        <h3>Total Lobbying Activity</h3>
                        <p className="stat-amount">$67,000,000</p>
                    </div>
                </div>
            </div>

            <hr />

            <div className="candidate-sections-grid">
                <section className="finance-section">
                    <h3>Top 10 Donors</h3>
                    <div className="chart-container">
                        <div className="bar-wrapper full-width-bar"><span>Lockheed Martin</span> <span>$50,000</span></div>
                        <div className="bar-wrapper full-width-bar"><span>Northrop Grumman</span> <span>$42,000</span></div>
                        <div className="bar-wrapper full-width-bar"><span>Raytheon Technologies</span> <span>$38,000</span></div>
                        <div className="bar-wrapper full-width-bar"><span>Boeing Co</span> <span>$35,000</span></div>
                        <div className="bar-wrapper full-width-bar"><span>General Dynamics</span> <span>$30,000</span></div>
                    </div>
                </section>

                <section className="finance-section">
                    <h3>Top 10 Sectors</h3>
                    <div className="chart-container overflow-list">
                        <div className="bar-wrapper"><div className="bar-fill" style={{ width: '90%' }}><span>Defense</span> <span>24%</span></div></div>
                        <div className="bar-wrapper"><div className="bar-fill" style={{ width: '75%' }}><span>Healthcare</span> <span>18%</span></div></div>
                        <div className="bar-wrapper"><div className="bar-fill" style={{ width: '60%' }}><span>Finance</span> <span>12%</span></div></div>
                        <div className="bar-wrapper"><div className="bar-fill" style={{ width: '45%' }}><span>Energy</span> <span>9%</span></div></div>
                        <div className="bar-wrapper"><div className="bar-fill" style={{ width: '35%' }}><span>Agribusiness</span> <span>5%</span></div></div>
                    </div>
                </section>

                <section className="finance-section">
                    <h3>Lobbying Firms</h3>
                    <div className="chart-container overflow-list">
                        <div className="bar-wrapper full-width-bar"><span>Lawyers / Law Firms</span> <span>$00,000</span></div>
                        <div className="bar-wrapper full-width-bar"><span>Transportation</span> <span>$00,000</span></div>
                        <div className="bar-wrapper full-width-bar"><span>Construction</span> <span>$00,000</span></div>
                        <div className="bar-wrapper full-width-bar"><span>Communications</span> <span>$00,000</span></div>
                        <div className="bar-wrapper full-width-bar"><span>Education</span> <span>$00,000</span></div>
                        <div className="bar-wrapper full-width-bar"><span>Labor</span> <span>$00,000</span></div>
                    </div>
                </section>
            </div>

            <h6 className="candidate-id">BioGuide ID: {bioguide_id} | FEC ID: {fec_id}</h6>

            <button className="close-button" onClick={closeCandidate}>
                Close Profile
            </button>
        </div>
    );
}