import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import ProvinceCombobox from "../components/ProvinceCombobox";
import SelectField from "../components/SelectField";
import { PROPERTIES, TYPES, STATUS } from "../data/properties";
import { PROVINCES } from "../data/provinces";

const PAGE_SIZE = 9;

const ESTADO_OPTIONS = [
  { value: "", label: "Todos los estados" },
  ...Object.entries(STATUS).map(([key, s]) => ({ value: key, label: s.label })),
];

export default function Inmuebles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const q = searchParams.get("q") || "";
  const tipo = searchParams.get("tipo") || "";
  const provincia = searchParams.get("provincia") || "";
  const estado = searchParams.get("estado") || "";

  function updateFilter(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
    setPage(1);
  }

  function clearFilters() {
    setSearchParams({});
    setPage(1);
  }

  const filtered = useMemo(() => {
    return PROPERTIES.filter((p) => {
      if (tipo && p.tipo !== tipo) return false;
      if (provincia && p.provincia !== provincia) return false;
      if (estado && p.estado !== estado) return false;
      if (q) {
        const haystack = `${p.titulo} ${p.ciudad} ${p.provincia} ${p.parcela} ${p.descripcion}`.toLowerCase();
        if (!haystack.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [q, tipo, provincia, estado]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeFilterCount = [tipo, provincia, estado, q].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-950">Catálogo de Inmuebles</h1>
        <p className="text-gray-500 mt-2">
          {filtered.length} inmueble{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Tipo tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <TypeTab active={!tipo} onClick={() => updateFilter("tipo", "")}>Todos</TypeTab>
        {TYPES.map((t) => (
          <TypeTab key={t} active={tipo === t} onClick={() => updateFilter("tipo", t)}>{t}</TypeTab>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Filters sidebar */}
        <aside className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-5 sticky top-28">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-navy-900">Filtros</h3>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-xs font-medium text-navy-600 hover:text-navy-800">
                  Limpiar todo
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Buscar</label>
              <input
                type="text"
                value={q}
                onChange={(e) => updateFilter("q", e.target.value)}
                placeholder="Parcela, dirección, ciudad..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-navy-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Provincia</label>
              <ProvinceCombobox
                provinces={PROVINCES}
                value={provincia}
                onChange={(value) => updateFilter("provincia", value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Estado del inmueble</label>
              <SelectField
                options={ESTADO_OPTIONS}
                value={estado}
                onChange={(value) => updateFilter("estado", value)}
                placeholder="Todos los estados"
              />
            </div>

            <div className="bg-navy-50 rounded-lg p-3.5 text-xs text-navy-700 leading-relaxed">
              El precio de la mayoría de los inmuebles del fideicomiso se define
              durante el proceso de oferta. Consulta el detalle de cada propiedad.
            </div>
          </div>
        </aside>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              className="lg:hidden inline-flex h-11 items-center gap-2 rounded-lg border border-navy-900/12 bg-white px-5 text-sm font-semibold text-navy-800 transition-colors duration-200 ease-brand outline-none hover:border-navy-900/25 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M6 12h12M9 18h6" />
              </svg>
              Filtros {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>

            <div className="ml-auto inline-flex overflow-hidden rounded-lg border border-navy-900/12">
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-pressed={view === "grid"}
                className={`inline-flex h-11 items-center px-4 text-sm transition-colors duration-200 ease-brand outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-inset ${view === "grid" ? "bg-navy-800 text-white" : "bg-white text-gray-500 hover:text-navy-900"}`}
                aria-label="Vista de cuadrícula"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                aria-pressed={view === "list"}
                className={`inline-flex h-11 items-center border-l border-navy-900/12 px-4 text-sm transition-colors duration-200 ease-brand outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-inset ${view === "list" ? "bg-navy-800 text-white" : "bg-white text-gray-500 hover:text-navy-900"}`}
                aria-label="Vista de lista"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              </button>
            </div>
          </div>

          {paged.length === 0 ? (
            <div className="text-center py-20 bg-white border border-gray-200 rounded-xl">
              <p className="text-lg font-semibold text-navy-900 mb-2">No se encontraron inmuebles</p>
              <p className="text-gray-500 text-sm mb-4">Intenta ajustar o limpiar los filtros de búsqueda.</p>
              <button onClick={clearFilters} className="text-navy-700 font-semibold text-sm hover:text-navy-900">
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-5"}>
              {paged.map((p) => (
                <PropertyCard key={p.id} property={p} view={view} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  type="button"
                  aria-current={n === page ? "page" : undefined}
                  className={`h-11 w-11 rounded-lg text-sm font-semibold tabular-nums transition-colors duration-200 ease-brand outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 ${
                    n === page
                      ? "bg-navy-800 text-white"
                      : "bg-white border border-navy-900/12 text-gray-600 hover:border-navy-900/25 hover:text-navy-900"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Filtro de tipo: mismo radio y misma altura táctil que el resto del sistema.
// Es un conmutador, no un llamado a la acción, así que conserva su estado activo
// en placa navy en lugar de pasar por el componente Button.
function TypeTab({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex h-11 items-center rounded-lg border px-5 text-sm font-semibold transition-colors duration-200 ease-brand outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 ${
        active
          ? "bg-navy-800 border-navy-800 text-white"
          : "bg-white border-navy-900/12 text-gray-600 hover:border-navy-900/25 hover:text-navy-900"
      }`}
    >
      {children}
    </button>
  );
}
