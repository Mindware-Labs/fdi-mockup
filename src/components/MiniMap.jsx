import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { pinIcon } from "./leafletIcons";

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

  return (
    <div style={{ height }} className="rounded-xl overflow-hidden border border-gray-200">
      <MapContainer
        center={[property.lat, property.lng]}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[property.lat, property.lng]} icon={pinIcon(property.tipo)}>
          <Popup>{property.titulo}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
