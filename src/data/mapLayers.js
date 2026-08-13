// ─────────────────────────────────────────────────────────────────────────────
// Catálogo de capas temáticas del mapa nacional.
//
// ⚠️ LA GEOMETRÍA DE ESTE ARCHIVO ES ESQUEMÁTICA. Existe para que el mecanismo
// completo —filtros, pintado, leyenda— esté terminado y se pueda revisar en la
// propuesta. NO es cartografía oficial y el mapa la rotula como "muestra".
//
// Para pasar a datos reales no hay que tocar código: basta con dejar el archivo
// que entregue el FDI en `web/public/capas/` con el nombre declarado en
// `archivo`. Al cargar, el mapa lo detecta, valida que sea un FeatureCollection
// y sustituye la muestra. El contrato de cada archivo (formato, sistema de
// coordenadas y atributos esperados) está en `web/public/capas/README.md`.
// ─────────────────────────────────────────────────────────────────────────────

const fc = (features) => ({ type: "FeatureCollection", features });

const linea = (properties, coordinates) => ({
  type: "Feature",
  properties,
  geometry: { type: "LineString", coordinates },
});

/** Rectángulo centrado en [lng, lat] con ancho/alto en grados. Solo para la muestra. */
const area = (properties, [lng, lat], ancho, alto = ancho) => {
  const [dx, dy] = [ancho / 2, alto / 2];
  return {
    type: "Feature",
    properties,
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [lng - dx, lat - dy],
          [lng + dx, lat - dy],
          [lng + dx, lat + dy],
          [lng - dx, lat + dy],
          [lng - dx, lat - dy],
        ],
      ],
    },
  };
};

// Colores de las capas. Son codificación de dato sobre cartografía, no marca:
// se mantienen los del visor actual del FDI para que quien ya usa el mapa
// reconozca la leyenda, en vez de forzarlos a la paleta institucional.
const KV = { 69: "#4aa3dd", 138: "#e0a92b", 230: "#7b6ce0", 345: "#3f9a5c" };
const ENERGIA = {
  Eólica: "#4aa3dd",
  "Solar fotovoltaica": "#e8c860",
  Minihidráulica: "#57c4d8",
  Biomasa: "#8dc98a",
  RSU: "#e9a45f",
};

// `organismo`: quién publica la capa. No se muestra en la interfaz; sirve para
// saber a quién reclamar cada archivo (ver public/capas/README.md). Se llama así
// y no `fuente` porque en la capa de energía `fuente` ya es la propiedad de cada
// entidad —Eólica, Solar…— de la que sale su color.
export const MAP_LAYERS = [
  {
    id: "areas-protegidas",
    archivo: "/capas/areas-protegidas.geojson",
    label: "Áreas protegidas y especiales",
    descripcion:
      "Parques nacionales, reservas y demás áreas con régimen especial que condicionan el uso del suelo.",
    organismo: "Ministerio de Medio Ambiente y Recursos Naturales",
    tipo: "fill",
    color: "#3f9a5c",
    leyenda: [{ label: "Área protegida o especial", color: "#3f9a5c" }],
    muestra: fc([
      area({ nombre: "Los Haitises" }, [-69.55, 19.03], 0.42, 0.24),
      area({ nombre: "Sierra de Bahoruco" }, [-71.53, 18.24], 0.5, 0.26),
      area({ nombre: "Jaragua" }, [-71.5, 17.86], 0.46, 0.22),
      area({ nombre: "Valle Nuevo" }, [-70.6, 18.79], 0.3, 0.22),
      area({ nombre: "Montecristi" }, [-71.6, 19.85], 0.34, 0.18),
    ]),
  },
  {
    id: "transmision",
    archivo: "/capas/lineas-transmision.geojson",
    label: "Líneas de transmisión eléctrica",
    descripcion:
      "Trazado del sistema de transmisión por nivel de tensión. Determina la cercanía de un inmueble a la red.",
    organismo: "ETED · Empresa de Transmisión Eléctrica Dominicana",
    tipo: "line",
    color: "#7b6ce0",
    claveColor: "kv",
    leyenda: [
      { label: "69 kV", color: KV[69], ancho: 1.5 },
      { label: "138 kV", color: KV[138], ancho: 2 },
      { label: "230 kV", color: KV[230], ancho: 2.6 },
      { label: "345 kV", color: KV[345], ancho: 3.2 },
    ],
    muestra: fc([
      linea({ nombre: "Palamara – Bonao – Santiago", kv: 345 }, [
        [-69.95, 18.5],
        [-70.2, 18.72],
        [-70.41, 18.94],
        [-70.55, 19.18],
        [-70.7, 19.45],
      ]),
      linea({ nombre: "Santo Domingo – Higüey", kv: 230 }, [
        [-69.93, 18.47],
        [-69.6, 18.45],
        [-69.3, 18.46],
        [-68.97, 18.43],
        [-68.71, 18.62],
      ]),
      linea({ nombre: "Santiago – Puerto Plata", kv: 230 }, [
        [-70.7, 19.45],
        [-70.7, 19.62],
        [-70.69, 19.79],
      ]),
      linea({ nombre: "San Juan – Azua – Barahona", kv: 138 }, [
        [-71.23, 18.81],
        [-70.95, 18.62],
        [-70.73, 18.45],
        [-70.95, 18.3],
        [-71.1, 18.21],
      ]),
      linea({ nombre: "La Vega – San Francisco de Macorís", kv: 69 }, [
        [-70.53, 19.22],
        [-70.4, 19.27],
        [-70.25, 19.3],
      ]),
      linea({ nombre: "Nagua – Samaná", kv: 69 }, [
        [-69.85, 19.38],
        [-69.6, 19.3],
        [-69.33, 19.21],
      ]),
    ]),
  },
  {
    id: "mineria",
    archivo: "/capas/concesiones-mineras.geojson",
    label: "Concesiones de explotación minera",
    descripcion:
      "Polígonos con derechos mineros vigentes. Un inmueble dentro de una concesión tiene el subsuelo comprometido.",
    organismo: "Ministerio de Energía y Minas · Dirección General de Minería",
    tipo: "fill",
    color: "#c07a2a",
    leyenda: [{ label: "Concesión minera vigente", color: "#c07a2a" }],
    muestra: fc([
      area({ nombre: "Pueblo Viejo" }, [-70.16, 18.93], 0.24, 0.16),
      area({ nombre: "Bonao" }, [-70.44, 18.88], 0.2, 0.14),
      area({ nombre: "Maimón" }, [-70.3, 18.99], 0.16, 0.1),
      area({ nombre: "Montecristi" }, [-71.38, 19.68], 0.22, 0.14),
    ]),
  },
  {
    id: "hidrocarburos",
    archivo: "/capas/gasoductos-oleoductos.geojson",
    label: "Gasoductos y oleoductos",
    descripcion:
      "Trazado de ductos de gas natural y derivados, con sus servidumbres de paso asociadas.",
    organismo: "Ministerio de Energía y Minas",
    tipo: "line",
    // Magenta, no violeta: el trazado costero corre pegado al de 230 kV y con dos
    // púrpuras vecinos no se distinguía cuál era cuál.
    color: "#d4489a",
    leyenda: [{ label: "Gasoducto u oleoducto", color: "#d4489a", ancho: 2.6 }],
    muestra: fc([
      linea({ nombre: "Andrés – Los Mina" }, [
        [-69.61, 18.44],
        [-69.75, 18.47],
        [-69.86, 18.5],
      ]),
      linea({ nombre: "Andrés – San Pedro de Macorís" }, [
        [-69.61, 18.44],
        [-69.45, 18.44],
        [-69.3, 18.45],
      ]),
    ]),
  },
  {
    id: "energia",
    archivo: "/capas/concesiones-energeticas.geojson",
    label: "Concesiones energéticas definitivas",
    descripcion:
      "Concesiones definitivas de generación por fuente. Señalan zonas con proyectos energéticos ya adjudicados.",
    organismo: "Comisión Nacional de Energía",
    tipo: "fill",
    color: "#4aa3dd",
    claveColor: "fuente",
    leyenda: Object.entries(ENERGIA).map(([label, color]) => ({ label, color })),
    muestra: fc([
      area({ nombre: "Parque eólico Pedernales", fuente: "Eólica" }, [-71.6, 18.1], 0.16),
      area({ nombre: "Parque eólico Matafongo", fuente: "Eólica" }, [-70.42, 18.27], 0.14),
      area({ nombre: "Parque eólico Montecristi", fuente: "Eólica" }, [-71.55, 19.8], 0.14),
      area({ nombre: "Solar Azua", fuente: "Solar fotovoltaica" }, [-70.82, 18.51], 0.14),
      area({ nombre: "Solar Baní", fuente: "Solar fotovoltaica" }, [-70.28, 18.36], 0.12),
      area({ nombre: "Minihidráulica Jarabacoa", fuente: "Minihidráulica" }, [-70.63, 19.12], 0.1),
      area({ nombre: "Biomasa Barahona", fuente: "Biomasa" }, [-71.08, 18.27], 0.12),
      area({ nombre: "RSU Santo Domingo Norte", fuente: "RSU" }, [-69.92, 18.62], 0.1),
    ]),
  },
];

/** Expresión Mapbox de color: categórica si la capa declara `claveColor`, plana si no. */
export function colorExpression(layer) {
  if (!layer.claveColor) return layer.color;
  const casos = layer.leyenda.flatMap(({ label, color }) => [
    layer.id === "transmision" ? Number(label.replace(/\D/g, "")) : label,
    color,
  ]);
  return ["match", ["get", layer.claveColor], ...casos, layer.color];
}

/** Grosor por nivel de tensión; el resto de capas de línea usan un grosor fijo. */
export function widthExpression(layer) {
  if (layer.id !== "transmision") return layer.leyenda[0]?.ancho ?? 2;
  return [
    "match",
    ["get", "kv"],
    345, 3.2,
    230, 2.6,
    138, 2,
    69, 1.5,
    1.5,
  ];
}
