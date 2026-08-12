import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TYPE_COLORS } from "./PropertyMapMarker";
import { boundsFromPoints } from "./mapConfig";
import { PROPERTIES, TYPES } from "../data/properties";
import { PROVINCES } from "../data/provinces";

// Mapbox GL pesa ~500 kB gzip: se descarga solo cuando esta sección entra en viewport.
const CoverageMapCanvas = lazy(() => import("./CoverageMapCanvas"));

const LOCATED = PROPERTIES.filter((p) => p.lat && p.lng);

/** Monta el mapa solo cuando la sección entra en viewport: evita pedir teselas a quien nunca llega hasta aquí. */
function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

export default function CoverageMap() {
  const [ref, inView] = useInView();

  const bounds = useMemo(() => boundsFromPoints(LOCATED), []);
  const tiposPresentes = useMemo(
    () => TYPES.filter((t) => LOCATED.some((p) => p.tipo === t)),
    [],
  );
  const provincias = new Set(PROPERTIES.map((p) => p.provincia)).size;

  return (
    <div className="border border-navy-900/10 bg-white">
      <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-2xl">
          <div className="h-px w-12 bg-orange-400" />
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-navy-950">
            Explora las propiedades en el mapa
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            Visualiza la ubicación exacta de cada inmueble a nivel nacional, incluyendo
            las zonas no deslindadas catastral y registralmente dentro de las parcelas.
            El inventario se distribuye en {provincias} de las {PROVINCES.length}{" "}
            provincias del país.
          </p>
        </div>
        <Link
          to="/mapa"
          className="group inline-flex items-center justify-center gap-2.5 self-start whitespace-nowrap bg-navy-800 px-6 py-3.5 text-sm font-semibold text-white outline-none transition-colors duration-200 hover:bg-navy-900 active:bg-navy-950 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 lg:self-end"
        >
          Ver mapa completo
          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Altura reservada por proporción para que el montaje diferido no desplace el layout */}
      <div
        ref={ref}
        className="relative aspect-[4/3] border-t border-navy-900/10 bg-navy-50 sm:aspect-[21/9]"
      >
        {inView && (
          <Suspense fallback={null}>
            <CoverageMapCanvas properties={LOCATED} bounds={bounds} />
          </Suspense>
        )}

        {/* Toda la vista previa lleva al mapa completo. Deja libre una franja inferior
            para que la atribución de Mapbox/OSM (obligatoria) siga siendo clicable. */}
        <Link
          to="/mapa"
          aria-label="Ver el mapa completo de inmuebles"
          className="absolute inset-x-0 top-0 bottom-6 z-[500] outline-none transition-colors duration-200 hover:bg-navy-950/5 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-400"
        />
      </div>

      <ul className="flex flex-wrap gap-x-8 gap-y-3 border-t border-navy-900/10 px-8 py-5 sm:px-10">
        {tiposPresentes.map((tipo) => (
          <li key={tipo} className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 shrink-0"
              style={{ backgroundColor: TYPE_COLORS[tipo] }}
            />
            <span className="text-sm text-navy-800">{tipo}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
