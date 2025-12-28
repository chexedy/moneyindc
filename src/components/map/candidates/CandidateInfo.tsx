import "./Candidate.css";

type CandidateInfoProps = {
    name: string;
    party: "D" | "R" | "I" | string;
    position: string;
    picture: string;
};

// This is the tiny candidate card that appears in the holder for areas with multiple candidates
export default function CandidateInfo({
    name,
    party,
    position,
    picture,
}: CandidateInfoProps) {
    return (
        <div className="candidate-info">
            <img
                className="candidate-info__img"
                src={picture}
                alt={name}
            />

            <div className="candidate-info__text">
                <div className="candidate-info__name">
                    {name}
                </div>

                <div className="candidate-info__meta">
                    {position} ({party})
                </div>
            </div>
        </div>
    );
}
