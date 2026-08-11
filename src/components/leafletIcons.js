import L from "leaflet";

const COLORS = {
  Terreno: "#0e7a53",
  Apartamento: "#204a7c",
  Comercial: "#a86a1a",
  Industrial: "#475569",
};

export function pinIcon(tipo, selected = false) {
  const color = COLORS[tipo] || COLORS.Terreno;
  const size = selected ? 34 : 28;
  return L.divIcon({
    className: "property-map-marker",
    html: `<div class="property-map-marker__pin${selected ? " property-map-marker__pin--selected" : ""}" style="--marker-color:${color};--marker-size:${size}px"><span></span></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

export const TYPE_COLORS = COLORS;
