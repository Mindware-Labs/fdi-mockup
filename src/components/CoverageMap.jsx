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
      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-2xl">
          <div className="h-px w-12 bg-sky-400" />
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
            Explora las propiedades en el mapa
          </h2>
          <p className="mt-3 leading-relaxed text-gray-600">
            Visualiza la ubicación exacta de cada inmueble a nivel nacional, incluyendo
            las zonas no deslindadas catastral y registralmente dentro de las parcelas.
            El inventario se distribuye en {provincias} de las {PROVINCES.length}{" "}
            provincias del país.
          </p>
        </div>
        <Link
          to="/mapa"
          className="group inline-flex items-center justify-center gap-2.5 self-start whitespace-nowrap bg-navy-800 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_1px_3px_rgba(0,23,51,0.12)] outline-none transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-navy-900 hover:shadow-[0_10px_24px_-6px_rgba(0,23,51,0.4)] active:translate-y-0 active:bg-navy-950 active:shadow-[0_2px_6px_rgba(0,23,51,0.2)] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 lg:self-end"
        >
          Ver mapa completo
          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Altura fija y compacta: el montaje diferido no desplaza el layout, y el mapa
          ya es interactivo (clic en un pin abre su ficha), así que no hace falta que sea grande. */}
      <div ref={ref} className="relative h-[260px] border-t border-navy-900/10 bg-navy-50 sm:h-[340px]">
        {inView && (
          <Suspense fallback={null}>
            <CoverageMapCanvas properties={LOCATED} bounds={bounds} />
          </Suspense>
        )}
      </div>

      <ul className="flex flex-wrap gap-x-8 gap-y-3 border-t border-navy-900/10 px-6 py-4 sm:px-8">
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
