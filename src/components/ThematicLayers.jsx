import { Layer, Source } from "react-map-gl/mapbox";
import { MAP_LAYERS, colorExpression, widthExpression } from "../data/mapLayers";

// Las capas de relleno se pintan antes que las de línea para que un ducto o una
// línea de transmisión nunca queden tapados por un polígono.
const ORDEN = { fill: 0, line: 1 };
const ORDENADAS = [...MAP_LAYERS].sort((a, b) => ORDEN[a.tipo] - ORDEN[b.tipo]);

/** Trazo discontinuo mientras la capa sea geometría de muestra. */
const DASH_MUESTRA = [2, 1.6];

export default function ThematicLayers({ activas, sources }) {
  return (
    <>
      {ORDENADAS.filter((layer) => activas.has(layer.id)).map((layer) => {
        const { data, esMuestra } = sources[layer.id] ?? {};
        if (!data) return null;

        const sourceId = `capa-${layer.id}`;
        const color = colorExpression(layer);
        const dash = esMuestra ? { "line-dasharray": DASH_MUESTRA } : {};

        // `source` va explícito en cada Layer: `Source` lo inyecta con
        // React.Children.map + cloneElement, que no entra en fragmentos, así que
        // los hijos se pasan como array plano y sin depender de esa inyección.
        const capas =
          layer.tipo === "fill"
            ? [
                <Layer
                  key="relleno"
                  id={`${sourceId}-fill`}
                  source={sourceId}
                  type="fill"
                  paint={{ "fill-color": color, "fill-opacity": 0.22 }}
                />,
                <Layer
                  key="borde"
                  id={`${sourceId}-borde`}
                  source={sourceId}
                  type="line"
                  paint={{ "line-color": color, "line-width": 1.4, "line-opacity": 0.85, ...dash }}
                />,
              ]
            : [
                <Layer
                  key="linea"
                  id={`${sourceId}-linea`}
                  source={sourceId}
                  type="line"
                  layout={{ "line-cap": "round", "line-join": "round" }}
                  paint={{
                    "line-color": color,
                    "line-width": widthExpression(layer),
                    "line-opacity": 0.9,
                    ...dash,
                  }}
                />,
              ];

        return (
          <Source key={layer.id} id={sourceId} type="geojson" data={data}>
            {capas}
          </Source>
        );
      })}
    </>
  );
}
