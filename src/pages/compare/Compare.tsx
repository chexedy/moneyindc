import "./Compare.css";
import { useSearchParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';

export default function Compare() {
    const [searchParams] = useSearchParams();

    const c1_raw = searchParams.get("c1");
    const c2_raw = searchParams.get("c2");

    const parseIdentifier = (raw: string | null) => {
        if (!raw) return { id: null, state: null, district: null };
        if (raw.includes("-")) {
            const [state, district] = raw.split("-");
            return { id: null, state, district };
        }
        return { id: raw, state: null, district: null };
    };

    const info1 = parseIdentifier(c1_raw);
    const info2 = parseIdentifier(c2_raw);

    const fetchProfile = async (identifier: string | null) => {
        if (!identifier) return null;
        const params = new URLSearchParams();
        const parsed = parseIdentifier(identifier);

        if (parsed.state && parsed.district) {
            params.set("state", parsed.state);
            params.set("district", parsed.district);
        } else {
            params.set("id", identifier);
        }

        const res = await fetch(`https://moneyindc.ayaan7m.workers.dev/getprofile?${params}`);
        return res.json();
    };

    const { data: data1, isLoading: load1, isError: err1 } = useQuery({
        queryKey: ["candidate", c1_raw],
        queryFn: () => fetchProfile(c1_raw),
        staleTime: Infinity,
        gcTime: Infinity,
        enabled: !!c1_raw,
    });

    const { data: data2, isLoading: load2, isError: err2 } = useQuery({
        queryKey: ["candidate", c2_raw],
        queryFn: () => fetchProfile(c2_raw),
        staleTime: Infinity,
        gcTime: Infinity,
        enabled: !!c2_raw,
    });

    if (load1 || load2) return <div className="compare-page"><div className="title"><h1>Loading...</h1></div></div>;

    if (err1 || err2 || !data1?.profile || !data2?.profile) {
        return (
            <div className="compare-page">
                <div className="title"><h1>Error loading candidates.</h1></div>
            </div>
        );
    }

    const p1 = data1.profile;
    const p2 = data2.profile;

    const getRole = (profile: any, urlInfo: any) => {
        const state = urlInfo.state || profile.state;
        let dist = urlInfo.district || profile.district;

        const displayDist = (dist === "00" || dist === 0) ? "01" : dist;
        return profile.office === "SENATE"
            ? `Senator for ${state}`
            : `Rep. for ${state}-${displayDist}`;
    };

    const val1 = p1.total_lobbying || 67000000;
    const val2 = p2.total_lobbying || 41000000;
    const winner = val1 < val2 ? p1.name : p2.name;

    return (
        <div className="compare-page">
            <div className="title">
                <h1>Head-to-Head</h1>
            </div>

            <div className="compare-grid">
                <div className="compare-card">
                    <div className="candidate-header">
                        <img
                            src={`https://unitedstates.github.io/images/congress/450x550/${p1.bioguide_id}.jpg`}
                            className="candidate-image"
                            alt={p1.name}
                            onError={(e) => e.currentTarget.src = "images/noportrait.png"}
                        />
                        <div className="candidate-bio">
                            <h2 className="candidate-name">{p1.name}</h2>
                            <div className="candidate-role">{getRole(p1, info1)}</div>
                            <div className="candidate-party">{p1.party}</div>
                            <div className="candidate-year">Cycle: {p1.latest_cycle}</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <h3>Total Lobbying</h3>
                        <p className="stat-amount">${val1.toLocaleString()}</p>
                    </div>
                </div>

                <div className="vs-zone">
                    <img src="images/vs.png" alt="VS" className="vs-logo-fixed" />
                </div>

                <div className="compare-card">
                    <div className="candidate-header">
                        <img
                            src={`https://unitedstates.github.io/images/congress/450x550/${p2.bioguide_id}.jpg`}
                            className="candidate-image"
                            alt={p2.name}
                            onError={(e) => e.currentTarget.src = "images/noportrait.png"}
                        />
                        <div className="candidate-bio">
                            <h2 className="candidate-name">{p2.name}</h2>
                            <div className="candidate-role">{getRole(p2, info2)}</div>
                            <div className="candidate-party">{p2.party}</div>
                            <div className="candidate-year">Cycle: {p2.latest_cycle}</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <h3>Total Lobbying</h3>
                        <p className="stat-amount">${val2.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <div className="body verdict-footer">
                <h1>The Verdict</h1>
                <p><strong>{winner}</strong> takes less corporate money.</p>
            </div>
        </div>
    );
}