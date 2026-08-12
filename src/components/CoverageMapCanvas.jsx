import { useRef } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import PropertyMapMarker from "./PropertyMapMarker";
import MapTokenNotice from "./MapTokenNotice";
import { MAPBOX_TOKEN, MAP_STYLE, DEFAULT_CENTER } from "./mapConfig";

/** Se carga bajo demanda (import dinámico) desde CoverageMap: aquí vive el peso real de Mapbox GL. */
export default function CoverageMapCanvas({ properties, bounds }) {
  const mapRef = useRef(null);

  if (!MAPBOX_TOKEN) return <MapTokenNotice className="absolute inset-0" />;

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle={MAP_STYLE}
      initialViewState={DEFAULT_CENTER}
      onLoad={() => mapRef.current?.fitBounds(bounds, { padding: 36, duration: 0 })}
      scrollZoom={false}
      dragPan={false}
      dragRotate={false}
      doubleClickZoom={false}
      touchZoomRotate={false}
      touchPitch={false}
      keyboard={false}
      style={{ height: "100%", width: "100%" }}
    >
      {properties.map((p) => (
        <Marker key={p.id} longitude={p.lng} latitude={p.lat} anchor="bottom">
          <PropertyMapMarker tipo={p.tipo} />
        </Marker>
      ))}
    </Map>
  );
}
