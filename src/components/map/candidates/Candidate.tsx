import "./Candidate.css";
import type { CandidateProps } from "../../../data/props";
import { useQuery } from '@tanstack/react-query';

// This is the actual Candidate component with their information
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
                <div className="candidate-header">
                    <h2>Loading Candidate...</h2>
                </div>

                <button className="close-button" onClick={closeCandidate}>
                    Close Profile
                </button>
            </div>
        );
    }

    if (isError || data.error || !data) {
        return (
            <div className="candidate-profile">
                <div className="candidate-header">
                    <h2>Error loading candidate data. <br />Refresh and try again, contact me on <a href="https://github.com/chexedy/moneyindc" target="_blank">GitHub</a> if it continues to fail.</h2>
                </div>

                <button className="close-button" onClick={closeCandidate}>
                    Close Profile
                </button>
            </div>
        );
    }

    const {
        name,
        party,
        office,
        bioguide_id,
        fec_id,
    } = data.profile;

    if (district === "00") {
        district = "01";
    }

    return (
        <div className="candidate-profile">
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

                    {office === "SENATE" && (
                        <div className="candidate-role">
                            Senator for {state}
                        </div>
                    )}

                    {office === "HOUSE" && (
                        <div className="candidate-role">
                            Rep. for {state}-{district}
                        </div>
                    )}

                    <div className="candidate-party">{party}</div>
                </div>
            </div>

            <h6 className="candidate-id">BioGuide ID: {bioguide_id} | FEC ID: {fec_id}</h6>

            <button className="close-button" onClick={closeCandidate}>
                Close Profile
            </button>
        </div>
    )
}