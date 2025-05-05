import { useState, useRef, useEffect, useContext } from 'react';
import { ActiveCityContext } from '../App';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { PrecipitationLayer } from "@maptiler/weather";


export default function Map() {
    maptilersdk.config.apiKey = import.meta.env.VITE_MAP_KEY;

    const { activeCity } = useContext(ActiveCityContext)!;
    const [coord, setCoord] = useState({ lng: 0, lat: 0})
    const mapContainer = useRef<any>(null);
    const map = useRef<any>(null);

    const layer = new PrecipitationLayer();

    const zoom = 11;
    
    useEffect(() => {
        if (activeCity !== null && activeCity.latitude !== 0 && activeCity.longitude !== 0) {
            setCoord({ lng: activeCity.longitude, lat: activeCity.latitude });
        }
    }, [activeCity]);

    useEffect(() => {
        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.DATAVIZ.DEFAULT,
            center: [coord.lng, coord.lat],
            zoom: zoom
        });

        map.current.on('load', () => {
            map.current.addLayer(layer);
        });

    }, [coord, zoom]);

    return (
        <div className="overflow-hidden rounded-lg">
            <div className="relative w-full h-screen max-h-64 mb-[-35px]">
                <div className="relative w-full h-full"  ref={mapContainer}></div>
            </div>
        </div>
    );
}