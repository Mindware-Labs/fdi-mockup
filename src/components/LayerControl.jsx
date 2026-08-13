import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { MAP_LAYERS } from "../data/mapLayers";

const FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2";

/** Muestra del trazo o del relleno con que se pinta cada entrada de la leyenda. */
function Swatch({ color, ancho, relleno = false }) {
  if (relleno) {
    return (
      <span
        aria-hidden="true"
        className="mt-0.5 h-3 w-3 shrink-0 rounded-sm border"
        style={{ backgroundColor: `${color}44`, borderColor: color }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="mt-1.5 w-6 shrink-0 rounded-full"
      style={{ backgroundColor: color, height: Math.max(2, ancho ?? 2) }}
    />
  );
}

/**
 * Panel de capas acoplado en la barra lateral. Antes era un emergente sobre el
 * mapa: tapaba justo la cartografía que se quería consultar y obligaba a
 * cerrarlo para ver el efecto de cada casilla. Acoplado, se activa una capa y se
 * ve el resultado sin cerrar nada.
 */
export default function LayerPanel({ activas, onToggle, onTodas }) {
  const hayMuestra = MAP_LAYERS.some((layer) => activas.has(layer.id));

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-navy-900/10 px-4 py-3 sm:px-5">
        <p className="text-sm text-gray-600">
          <span className="font-semibold tabular-nums text-navy-950">{activas.size}</span> de{" "}
          {MAP_LAYERS.length} activas
        </p>
        <button
          type="button"
          onClick={() => onTodas(activas.size === MAP_LAYERS.length ? "ninguna" : "todas")}
          className={`rounded-sm text-sm font-semibold text-navy-700 underline-offset-4 transition-colors hover:text-navy-950 hover:underline ${FOCUS}`}
        >
          {activas.size === MAP_LAYERS.length ? "Quitar todas" : "Activar todas"}
        </button>
      </div>

      <ul className="min-h-0 flex-1 divide-y divide-navy-900/8 overflow-y-auto">
        {MAP_LAYERS.map((layer) => {
          const activa = activas.has(layer.id);
          return (
            <li key={layer.id}>
              <label
                className={`flex cursor-pointer gap-3.5 px-4 py-4 transition-colors duration-200 ease-brand sm:px-5 ${
                  activa ? "bg-sky-50/60" : "hover:bg-mist-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={activa}
                  onChange={() => onToggle(layer.id)}
                  className={`mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-sm accent-navy-700 ${FOCUS}`}
                />
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 shrink-0 rounded-sm"
                      style={{ backgroundColor: layer.color }}
                    />
                    <span className="text-sm font-semibold text-navy-950">{layer.label}</span>
                  </span>
                  <span className="mt-1.5 block text-xs leading-relaxed text-gray-600">
                    {layer.descripcion}
                  </span>
                  <span className="mt-1.5 block text-xs text-gray-500">
                    Fuente: {layer.fuente}
                  </span>

                  {/* La sub-leyenda solo aparece cuando la capa está encendida:
                      informa de lo que se está viendo, no de lo que podría verse. */}
                  {activa && layer.leyenda.length > 1 && (
                    <span className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                      {layer.leyenda.map((entrada) => (
                        <span
                          key={entrada.label}
                          className="flex items-start gap-1.5 text-xs text-gray-700"
                        >
                          <Swatch {...entrada} relleno={layer.tipo === "fill"} />
                          {entrada.label}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      {hayMuestra && (
        <p className="shrink-0 border-t border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900 sm:px-5">
          Las capas se dibujan con <strong className="font-semibold">trazo discontinuo</strong> y
          geometría esquemática. Se sustituyen solas al recibir del FDI los archivos oficiales.
        </p>
      )}
    </div>
  );
}

/**
 * Leyenda acoplada al mapa: solo las capas encendidas. Se pliega porque a
 * pantalla completa tapa el suroeste de la isla, que es donde hay inventario.
 */
export function LayerLegend({ activas, className = "" }) {
  // En móvil arranca plegada: sobre un mapa de media pantalla ocupaba la mitad
  // del ancho, y la sub-leyenda de cada capa ya está en la pestaña "Capas",
  // justo debajo. En escritorio sobra sitio, así que arranca abierta.
  const [plegada, setPlegada] = useState(
    () => typeof window !== "undefined" && !window.matchMedia("(min-width: 1024px)").matches,
  );
  const visibles = MAP_LAYERS.filter((layer) => activas.has(layer.id));
  if (visibles.length === 0) return null;

  return (
    <div
      className={`w-[min(14rem,calc(100vw-2.5rem))] overflow-hidden rounded-lg border border-navy-900/10 bg-white/95 shadow-[0_10px_30px_rgba(11,29,51,0.16)] backdrop-blur-sm ${className}`}
    >
      <h2>
        <button
          type="button"
          onClick={() => setPlegada((valor) => !valor)}
          aria-expanded={!plegada}
          aria-controls="leyenda-capas"
          className={`flex w-full items-center justify-between gap-2 px-3.5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-navy-900 transition-colors hover:bg-mist-50 ${
            plegada ? "" : "border-b border-navy-900/10"
          } ${FOCUS} focus-visible:ring-inset`}
        >
          Leyenda
          <CaretDown
            aria-hidden="true"
            weight="bold"
            className={`h-3.5 w-3.5 text-gray-500 transition-transform duration-200 ${
              plegada ? "-rotate-90" : ""
            }`}
          />
          <span className="sr-only">{plegada ? "Desplegar leyenda" : "Plegar leyenda"}</span>
        </button>
      </h2>
      <dl
        id="leyenda-capas"
        hidden={plegada}
        className="max-h-[min(16rem,32dvh)] divide-y divide-navy-900/8 overflow-y-auto"
      >
        {visibles.map((layer) => (
          <div key={layer.id} className="px-3.5 py-2.5">
            <dt className="text-xs font-semibold text-navy-900">{layer.label}</dt>
            <dd className="mt-1.5 space-y-1">
              {layer.leyenda.map((entrada) => (
                <span key={entrada.label} className="flex items-start gap-2 text-xs text-gray-700">
                  <Swatch {...entrada} relleno={layer.tipo === "fill"} />
                  {entrada.label}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
