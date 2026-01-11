import "./Map.css";

import maplibregl from "maplibre-gl";
import { useState, useEffect, useRef } from "react";
import { Candidate, CandidateHolder } from "./candidates";

export default function Map() {
    interface currentState {
        id: number | null;
        state: string;
        district: string | null;
    }

    const [isCandidateOpen, setCandidateOpen] = useState(false);
    const [isHolderOpen, setHolderOpen] = useState(false);
    const [current, setCurrent] = useState<currentState>({ id: null, state: "", district: null });

    const closeHolder = () => {
        setHolderOpen(false);
    }

    const closeCandidate = () => {
        setCandidateOpen(false);
    }

    const setCurrentID = (id: number) => {
        setCurrent({ id: id, state: current.state, district: current.district });
        setHolderOpen(false);

        setCandidateOpen(true);
        console.log("Set current ID to:", id);
    }

    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);

    useEffect(() => {
        if (mapRef.current) return;
        if (!mapContainer.current) return;

        const bounds = new maplibregl.LngLatBounds(
            [-187.382813, 4.915833],
            [-40.253906, 73.327858]
        );

        mapRef.current = new maplibregl.Map({
            container: mapContainer.current,
            center: [-97.800293, 39.520992],
            style: "https://tiles.openfreemap.org/styles/bright",
            maxBounds: bounds,
            minZoom: 4,
            attributionControl: false,
        });

        mapRef.current.on('load', () => {
            const map = mapRef.current;
            if (!map) return;

            map.getStyle().layers.forEach(layer => {
                if (layer.type === 'symbol') {
                    map.setLayoutProperty(layer.id, 'visibility', 'none');
                }

                const sourceLayer = (layer as any)['source-layer'];

                if (['transportation', 'transportation_name', 'poi'].includes(sourceLayer)) {
                    map.setLayoutProperty(layer.id, 'visibility', 'none');
                }
            });

            map.addSource('states', {
                type: 'geojson',
                data: '/geojson/states.geojson'
            });

            map.addSource('state_centers', {
                type: 'geojson',
                data: '/geojson/state_centers.geojson'
            })

            map.addLayer({
                id: 'states',
                type: 'fill',
                source: 'states',
                paint: {
                    'fill-opacity': 0,
                },
                maxzoom: 7,
            })

            map.addLayer({
                id: 'states-borders',
                type: 'line',
                source: 'states',
                paint: {
                    'line-color': '#222',
                    'line-width': 2.5,
                },
                maxzoom: 7,
            });

            map.addLayer({
                id: 'states-labels',
                type: 'symbol',
                source: 'state_centers',
                layout: {
                    'text-field': ['get', 'name'],
                    'text-size': 18,
                    'text-anchor': 'center',
                    'text-allow-overlap': false,

                },
                paint: {
                    'text-color': '#222',
                },
                maxzoom: 7,
            });

            map.addSource('districts', {
                type: 'geojson',
                data: '/geojson/districts.geojson'
            });

            map.addLayer({
                id: 'districts',
                type: 'fill',
                source: 'districts',
                paint: {
                    'fill-opacity': 0,
                },
                minzoom: 7,
            })

            map.addLayer({
                id: 'district-borders',
                type: 'line',
                source: 'districts',
                paint: {
                    'line-color': '#222',
                    'line-width': 2.5,
                },
                minzoom: 7,
            });

            map.addLayer({
                id: 'district-labels',
                type: 'symbol',
                source: 'districts',
                layout: {
                    'text-field': [
                        'concat',
                        ['slice', ['get', 'name'], 0, 2],
                        '-',
                        ['slice', ['get', 'name'], 2, 4]
                    ],
                    'text-size': 14,
                    'text-anchor': 'center',
                    'text-allow-overlap': false,
                },
                paint: {
                    'text-color': '#222',
                },
                minzoom: 7,
            });

            map.on('mouseenter', 'states', () => {
                map.getCanvas().style.cursor = 'pointer';
            });

            map.on('mouseleave', 'states', () => {
                map.getCanvas().style.cursor = '';
            });

            map.on('mouseenter', 'districts', () => {
                map.getCanvas().style.cursor = 'pointer';
            });

            map.on('mouseleave', 'districts', () => {
                map.getCanvas().style.cursor = '';
            });

            map.on('click', 'states', (e) => {
                console.log("Clicked state:", e.features?.[0].properties.name);

                setCandidateOpen(false);
                setHolderOpen(true);
                setCurrent({ id: null, state: e.features?.[0].properties.abbreviation, district: null });
            });

            map.on('click', 'districts', (e) => {
                console.log("Clicked district:", e.features?.[0].properties.id);

                setHolderOpen(false);
                setCandidateOpen(true);
                setCurrent({ id: null, state: e.features?.[0].properties.id.substring(0, 2), district: e.features?.[0].properties.id.substring(2) });
            });
        });
    }, []);

    return (
        <div>
            <div ref={mapContainer} className="map-container" />

            {isHolderOpen && (
                <CandidateHolder state={current.state} closeHolder={closeHolder} setCurrentID={setCurrentID} />
            )}

            {isCandidateOpen && (
                <Candidate id={current.id} state={current.state} district={current.district} closeCandidate={closeCandidate} />
            )}

            {/* <Candidate id={61} state="NJ" district={null} closeCandidate={closeCandidate} /> */}
        </div>
    )
}