import Map, { Marker, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import PropertyMapMarker from "./PropertyMapMarker";
import MapTokenNotice from "./MapTokenNotice";
import { MAPBOX_TOKEN, MAP_STYLE } from "./mapConfig";

export default function MiniMap({ property, height = "320px" }) {
  if (!property.lat || !property.lng) {
    return (
      <div
        style={{ height }}
        className="rounded-xl bg-navy-50 border border-navy-100 flex items-center justify-center text-sm text-navy-400"
      >
        Ubicación exacta no disponible
      </div>
    );
  }

  if (!MAPBOX_TOKEN) {
    return <MapTokenNotice style={{ height }} className="rounded-xl border border-navy-100" />;
  }

  return (
    <div style={{ height }} className="rounded-xl overflow-hidden border border-gray-200">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle={MAP_STYLE}
        initialViewState={{ longitude: property.lng, latitude: property.lat, zoom: 12 }}
        scrollZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <Marker longitude={property.lng} latitude={property.lat} anchor="bottom">
          <PropertyMapMarker tipo={property.tipo} />
        </Marker>
        <Popup
          longitude={property.lng}
          latitude={property.lat}
          anchor="bottom"
          offset={30}
          closeButton={false}
          closeOnClick={false}
          className="fdi-map-popup"
        >
          {property.titulo}
        </Popup>
      </Map>
    </div>
  );
}
