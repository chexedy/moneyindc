import "./CandidateOther.css";
import { CandidateInfo } from "../candidates";
import { useQuery } from '@tanstack/react-query';

export default function CandidateHolder({ state, closeHolder, setCurrentID }: { state: string; closeHolder: () => void; setCurrentID: (id: number) => void }) {
    const {
        data: candidates = [],
        isSuccess,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['state_candidates', state],
        staleTime: Infinity,
        queryFn: async () => {
            const response = await fetch(
                'https://moneyindc.ayaan7m.workers.dev/getmulticandidates?state=' + state
            );

            const raw = (await response.json()).row;
            const result = [];
            let i = 1;

            console.log("Raw candidates data:", raw);

            while (raw[`p${i}_name`]) {
                result.push({
                    id: raw[`p${i}_id`],
                    name: raw[`p${i}_name`],
                    district: raw[`p${i}_district`],
                    party: raw[`p${i}_party`],
                    office: raw[`p${i}_office`],
                });
                i++;
            }

            return result;
        },
    });

    return (
        <div className="candidate-holder">
            <h1>Select Politician</h1>

            <div className="candidate-list">
                {isLoading && <p>Loading candidates...</p>}
                {isError && <p>Error loading candidates.</p>}
                {isSuccess && candidates.length === 0 && <p>No candidates found for this state.</p>}

                {isSuccess && candidates.map((candidate: any) => (
                    <CandidateInfo
                        key={candidate.name}
                        id={candidate.id}
                        name={candidate.name}
                        state={state}
                        district={candidate.district}
                        party={candidate.party}
                        office={candidate.office}
                        setCurrentID={setCurrentID}
                    />
                ))}
            </div>

            <button className="close-button2" onClick={closeHolder}>
                Close List
            </button>
        </div>
    )
}