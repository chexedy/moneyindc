import "./CandidateOther.css";
import type { CandidateInfoProps } from "../../../data/props";
import { PARTIES, STATE_2CHAR } from "../../../data/info";

// This is the tiny candidate card that appears in the holder for areas with multiple candidates
export default function CandidateInfo({
    id,
    name,
    state,
    district,
    party,
    office,
    setCurrentID,
}: CandidateInfoProps) {
    const partyLabel =
        party in PARTIES
            ? PARTIES[party as keyof typeof PARTIES]
            : party;

    const stateLabel =
        state in STATE_2CHAR
            ? STATE_2CHAR[state as keyof typeof STATE_2CHAR]
            : state;

    return (
        <div className="candidate-info">
            <h2>{name}</h2>
            {(office == "SENATE") && (
                <h3>Senator ({partyLabel}) for {stateLabel}</h3>
            )}

            {(office == "HOUSE") && (
                <h3>Representative ({partyLabel}) for {state + "-" + district}</h3>
            )}

            <button onClick={() => setCurrentID(id)}>
                Select this Politician
            </button>
        </div>
    );
}