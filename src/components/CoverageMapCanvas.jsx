import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import PropertyMapMarker from "./PropertyMapMarker";
import MapTokenNotice from "./MapTokenNotice";
import { MAPBOX_TOKEN, MAP_STYLE, DEFAULT_CENTER } from "./mapConfig";
import { formatArea } from "../data/properties";

/** Se carga bajo demanda (import dinámico) desde CoverageMap: aquí vive el peso real de Mapbox GL. */
export default function CoverageMapCanvas({ properties, bounds }) {
  const mapRef = useRef(null);
  const [selected, setSelected] = useState(null);

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
        <Marker
          key={p.id}
          longitude={p.lng}
          latitude={p.lat}
          anchor="bottom"
          onClick={(event) => {
            event.originalEvent.stopPropagation();
            setSelected(p);
          }}
        >
          <PropertyMapMarker tipo={p.tipo} selected={selected?.id === p.id} />
        </Marker>
      ))}

      {selected && (
        <Popup
          longitude={selected.lng}
          latitude={selected.lat}
          offset={30}
          closeOnClick={false}
          onClose={() => setSelected(null)}
          className="fdi-map-popup"
        >
          <div className="min-w-0 text-sm">
            <p className="text-pretty font-semibold leading-snug text-navy-950">{selected.titulo}</p>
            <p className="mt-1 text-gray-600">{selected.ciudad}, {selected.provincia}</p>
            <p className="mt-1 font-semibold tabular-nums text-navy-800">{formatArea(selected.tamano)}</p>
            <Link
              to={`/inmuebles/${selected.id}`}
              className="mt-3 inline-flex items-center gap-1.5 font-semibold text-navy-700 hover:text-navy-950 hover:underline"
            >
              Ver detalles <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </Popup>
      )}
    </Map>
  );
}
