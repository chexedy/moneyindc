export type CandidateProps = {
    id: number | null;
    state: string;
    district: string | null;
    closeCandidate: () => void;
}

export type CandidateInfoProps = {
    id: number;
    name: string;
    state: string;
    district: string | null;
    party: "D" | "R" | "I" | string;
    office: "SENATE" | "HOUSE" | string;
    setCurrentID: (id: number) => void;
};