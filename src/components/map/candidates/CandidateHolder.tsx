import "./Candidate.css";
// import { CandidateInfo } from "../candidates";

export default function CandidateHolder() {
    return (
        <div className="candidate-holder">
            <h1>Select Politician</h1>

            <div className="candidate-list">
                {/* <CandidateInfo name="Cory A. Booker" state="NJ" district={null} party="Democrat" office="SENATE" />
                <CandidateInfo name="Andrew Kim" state="NJ" district={null} party="Democrat" office="SENATE" /> */}
            </div>

            <button className="close-button">
                Close List
            </button>
        </div>
    )
}