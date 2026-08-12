export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

// Estilo claro y editorial: deja que los pines navy/celeste de la marca sean el foco.
export const MAP_STYLE = "mapbox://styles/mapbox/light-v11";

export const DEFAULT_CENTER = { longitude: -70.4, latitude: 18.9, zoom: 8 };

/** [[west, south], [east, north]] a partir de una lista de propiedades con lat/lng. */
export function boundsFromPoints(points) {
  const lngs = points.map((p) => p.lng);
  const lats = points.map((p) => p.lat);
  return [
    [Math.min(...lngs), Math.min(...lats)],
    [Math.max(...lngs), Math.max(...lats)],
  ];
}
