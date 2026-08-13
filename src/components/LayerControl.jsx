import { useEffect, useRef, useState } from "react";
import { CaretDown, StackSimple, X } from "@phosphor-icons/react";
import Button from "./Button";
import { MAP_LAYERS } from "../data/mapLayers";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2";

/** Muestra del trazo/relleno con el que se pinta cada entrada de la leyenda. */
function Swatch({ color, ancho, redondo = false }) {
  if (redondo) {
    return (
      <span
        aria-hidden="true"
        className="mt-1 h-3 w-3 shrink-0 rounded-sm border"
        style={{ backgroundColor: `${color}44`, borderColor: color }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="mt-2 w-6 shrink-0 rounded-full"
      style={{ backgroundColor: color, height: Math.max(2, ancho ?? 2) }}
    />
  );
}

/**
 * Panel de capas del mapa. Cada entrada enciende o apaga una capa temática y
 * declara si lo que se está pintando es el archivo oficial o la muestra.
 */
export default function LayerControl({ abierto, onAbrir, activas, onToggle, onTodas, sources }) {
  const panelRef = useRef(null);
  const botonRef = useRef(null);

  useEffect(() => {
    if (!abierto) return;

    function alPulsarFuera(event) {
      if (panelRef.current?.contains(event.target) || botonRef.current?.contains(event.target)) return;
      onAbrir(false);
    }
    function alTeclear(event) {
      if (event.key === "Escape") {
        onAbrir(false);
        botonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", alPulsarFuera);
    document.addEventListener("keydown", alTeclear);
    return () => {
      document.removeEventListener("pointerdown", alPulsarFuera);
      document.removeEventListener("keydown", alTeclear);
    };
  }, [abierto, onAbrir]);

  const hayMuestra = MAP_LAYERS.some(
    (layer) => activas.has(layer.id) && sources[layer.id]?.esMuestra,
  );

  return (
    <>
      <Button
        ref={botonRef}
        onClick={() => onAbrir(!abierto)}
        aria-expanded={abierto}
        aria-controls="panel-capas"
        variant="quiet"
        className="touch-manipulation shadow-[0_8px_24px_rgba(11,29,51,0.16)]"
      >
        <StackSimple aria-hidden="true" className="h-5 w-5 shrink-0" />
        Capas
        {activas.size > 0 && (
          <span className="ml-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-navy-800 px-1.5 text-xs font-bold tabular-nums text-white">
            {activas.size}
          </span>
        )}
      </Button>

      {abierto && (
        <div
          id="panel-capas"
          ref={panelRef}
          role="group"
          aria-label="Capas del mapa"
          className="mt-2 flex min-h-0 w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_18px_50px_rgba(11,29,51,0.22)]"
        >
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-200 px-4 py-3">
            <h2 className="text-sm font-semibold text-navy-950">Capas del mapa</h2>
            <button
              type="button"
              onClick={() => onAbrir(false)}
              aria-label="Cerrar panel de capas"
              className={`-mr-1.5 rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-navy-900 ${FOCUS}`}
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>

          <div className="min-h-24 flex-1 overflow-y-auto">
            <ul className="divide-y divide-gray-100">
              {MAP_LAYERS.map((layer) => {
                const activa = activas.has(layer.id);
                const esMuestra = sources[layer.id]?.esMuestra;

                return (
                  <li key={layer.id}>
                    <label className="flex cursor-pointer gap-3 px-4 py-3.5 transition-colors hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={activa}
                        onChange={() => onToggle(layer.id)}
                        className={`mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-sm accent-navy-700 ${FOCUS}`}
                      />
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span
                            aria-hidden="true"
                            className="h-2.5 w-2.5 shrink-0 rounded-sm"
                            style={{ backgroundColor: layer.color }}
                          />
                          <span className="text-sm font-semibold text-navy-950">{layer.label}</span>
                          {esMuestra && (
                            <span
                              title="Geometría esquemática: aún no se ha cargado el archivo oficial del FDI."
                              className="rounded-sm bg-amber-100 px-1.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-amber-800"
                            >
                              Muestra
                            </span>
                          )}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-gray-600">
                          {layer.descripcion}
                        </span>
                        <span className="mt-1 block text-xs text-gray-500">
                          Fuente: {layer.fuente}
                        </span>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-gray-200 px-4 py-3">
            <button
              type="button"
              onClick={() => onTodas(activas.size === MAP_LAYERS.length ? "ninguna" : "todas")}
              className={`rounded-md text-sm font-semibold text-navy-700 underline-offset-4 hover:text-navy-950 hover:underline ${FOCUS}`}
            >
              {activas.size === MAP_LAYERS.length ? "Quitar todas" : "Activar todas"}
            </button>
            <p className="text-xs tabular-nums text-gray-500">
              {activas.size} de {MAP_LAYERS.length}
            </p>
          </div>

          {hayMuestra && (
            <p className="shrink-0 border-t border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
              Las capas marcadas como <strong className="font-semibold">muestra</strong> se dibujan
              con trazo discontinuo y geometría esquemática. Se sustituyen solas al recibir del FDI
              los archivos oficiales.
            </p>
          )}
        </div>
      )}
    </>
  );
}

/**
 * Leyenda del mapa: solo las capas encendidas, en el orden del catálogo.
 * Se puede plegar porque a pantalla completa tapa el suroeste de la isla, que es
 * justo donde hay inventario (Pedernales, Barahona).
 */
export function LayerLegend({ activas, sources, className = "" }) {
  const [plegada, setPlegada] = useState(false);
  const visibles = MAP_LAYERS.filter((layer) => activas.has(layer.id));
  if (visibles.length === 0) return null;

  return (
    <div
      className={`w-[min(15rem,calc(100vw-2.5rem))] overflow-hidden rounded-xl border border-gray-200 bg-white/95 shadow-[0_10px_30px_rgba(11,29,51,0.16)] backdrop-blur-sm ${className}`}
    >
      <h2>
        <button
          type="button"
          onClick={() => setPlegada((valor) => !valor)}
          aria-expanded={!plegada}
          aria-controls="leyenda-capas"
          className={`flex w-full items-center justify-between gap-2 px-3.5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-navy-900 transition-colors hover:bg-gray-50 ${
            plegada ? "" : "border-b border-gray-200"
          } ${FOCUS}`}
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
        className="max-h-[min(18rem,34dvh)] divide-y divide-gray-100 overflow-y-auto"
      >
        {visibles.map((layer) => (
          <div key={layer.id} className="px-3.5 py-2.5">
            <dt className="flex items-center gap-1.5 text-xs font-semibold text-navy-900">
              {layer.label}
              {sources[layer.id]?.esMuestra && (
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.08em] text-amber-700">
                  muestra
                </span>
              )}
            </dt>
            <dd className="mt-1.5 space-y-1">
              {layer.leyenda.map((entrada) => (
                <span key={entrada.label} className="flex items-start gap-2 text-xs text-gray-700">
                  <Swatch {...entrada} redondo={layer.tipo === "fill"} />
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
