import { useEffect, useState } from "react";
import { MAP_LAYERS } from "../data/mapLayers";

const MANIFIESTO = "/capas/manifest.json";

const soloMuestra = () =>
  Object.fromEntries(
    MAP_LAYERS.map((layer) => [layer.id, { data: layer.muestra, esMuestra: true }]),
  );

/**
 * Resuelve la fuente de datos de cada capa temática.
 *
 * `/capas/manifest.json` declara qué capas ya tienen archivo oficial depositado;
 * solo esas se descargan. Se hace con manifiesto en vez de sondear los cinco
 * archivos porque el sondeo dejaba cinco 404 en la consola en cada carga, y
 * porque marcar una capa como oficial debe ser un acto deliberado.
 *
 * Si el archivo declarado falta o no es un FeatureCollection válido, esa capa
 * cae a la geometría de muestra en vez de quedarse vacía.
 */
export default function useThematicLayers() {
  const [sources, setSources] = useState(soloMuestra);

  useEffect(() => {
    const controller = new AbortController();

    async function leerJson(url) {
      const res = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: "application/geo+json, application/json" },
      });
      if (!res.ok) return null;
      // El dev server responde el index.html ante rutas inexistentes, así que no
      // basta con el 200: hay que comprobar la forma del documento.
      return res.json();
    }

    (async () => {
      let oficiales = [];
      try {
        const manifiesto = await leerJson(MANIFIESTO);
        if (Array.isArray(manifiesto?.oficiales)) oficiales = manifiesto.oficiales;
      } catch {
        return; // Sin manifiesto legible se queda todo en muestra.
      }

      const declaradas = MAP_LAYERS.filter((layer) => oficiales.includes(layer.id));
      await Promise.all(
        declaradas.map(async (layer) => {
          try {
            const geo = await leerJson(layer.archivo);
            if (geo?.type !== "FeatureCollection" || !Array.isArray(geo.features)) return;
            if (controller.signal.aborted) return;
            setSources((current) => ({
              ...current,
              [layer.id]: { data: geo, esMuestra: false },
            }));
          } catch {
            /* La capa se queda en muestra. */
          }
        }),
      );
    })();

    return () => controller.abort();
  }, []);

  return sources;
}
