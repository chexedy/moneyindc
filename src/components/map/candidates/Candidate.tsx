import "./Candidate.css";

// This is the actual Candidate component with their information
export default function Candidate() {
    return (
        <div className="candidate-holder">
            <h1>Candidate Profile</h1>

            <button className="close-button">
                Close Profile
            </button>
        </div>
    )
}