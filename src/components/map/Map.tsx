import "./Map.css";

import maplibregl from "maplibre-gl";
import { useEffect, useRef } from "react";

import Candidate from "./candidates/Candidate.tsx";

export default function Map() {
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

            map.addSource('districts', {
                type: 'geojson',
                data: '/geojson/districts.geojson'
            });

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
                        ['slice', ['get', 'id'], 0, 2],
                        '-',
                        ['slice', ['get', 'id'], 2, 4]
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
        });
    }, []);

    return (
        <div>
            <div ref={mapContainer} className="map-container" />

            <Candidate />
        </div>
    )
}