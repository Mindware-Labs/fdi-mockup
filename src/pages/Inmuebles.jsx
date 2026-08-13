import { useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { CaretLeft, CaretRight, FunnelSimple, X } from "@phosphor-icons/react";
import Button from "../components/Button";
import PropertyCard from "../components/PropertyCard";
import ProvinceCombobox from "../components/ProvinceCombobox";
import SelectField from "../components/SelectField";
import { PROPERTIES, TYPES, STATUS } from "../data/properties";
import { PROVINCES } from "../data/provinces";

const PAGE_SIZE = 9;
const FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2";

const ESTADO_OPTIONS = [
  { value: "", label: "Todos los estados" },
  ...Object.entries(STATUS).map(([key, s]) => ({ value: key, label: s.label })),
];

// Los valores desconocidos van siempre al final, en cualquier dirección: un
// inmueble sin superficie publicada no es "el más pequeño".
const ORDENES = [
  { value: "", label: "Orden del inventario" },
  { value: "superficie-desc", label: "Mayor superficie" },
  { value: "superficie-asc", label: "Menor superficie" },
  { value: "precio-asc", label: "Menor precio" },
];

function ordenar(lista, orden) {
  if (!orden) return lista;
  const [campo, direccion] = orden.split("-");
  const copia = [...lista];
  copia.sort((a, b) => {
    const va = a[campo === "superficie" ? "tamano" : "precio"];
    const vb = b[campo === "superficie" ? "tamano" : "precio"];
    if (!va && !vb) return 0;
    if (!va) return 1;
    if (!vb) return -1;
    return direccion === "asc" ? va - vb : vb - va;
  });
  return copia;
}

/** Números de página con elipsis: primera, última y la ventana alrededor de la actual. */
function paginasVisibles(actual, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const cerca = [actual - 1, actual, actual + 1].filter((n) => n > 1 && n < total);
  const paginas = [1, ...cerca, total];
  const salida = [];
  paginas.forEach((n, i) => {
    if (i > 0 && n - paginas[i - 1] > 1) salida.push("…");
    salida.push(n);
  });
  return salida;
}

export default function Inmuebles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const resultadosRef = useRef(null);

  const q = searchParams.get("q") || "";
  const tipo = searchParams.get("tipo") || "";
  const provincia = searchParams.get("provincia") || "";
  const estado = searchParams.get("estado") || "";
  const orden = searchParams.get("orden") || "";
  const vista = searchParams.get("vista") === "lista" ? "list" : "grid";
  const filtrosAbiertos = searchParams.get("filtros") === "1";

  /**
   * Todo el estado de la vista vive en la URL: compartir el enlace comparte lo
   * que se está viendo, incluida la página. Y siempre con `replace`, porque
   * teclear en el buscador no son doce pasos de navegación hacia atrás.
   */
  function updateParams(cambios, { reiniciarPagina = true } = {}) {
    const next = new URLSearchParams(searchParams);
    Object.entries(cambios).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    if (reiniciarPagina) next.delete("pagina");
    setSearchParams(next, { replace: true });
  }

  function clearFilters() {
    const next = new URLSearchParams();
    if (vista === "list") next.set("vista", "lista");
    if (orden) next.set("orden", orden);
    setSearchParams(next, { replace: true });
  }

  const filtered = useMemo(() => {
    const encontrados = PROPERTIES.filter((p) => {
      if (tipo && p.tipo !== tipo) return false;
      if (provincia && p.provincia !== provincia) return false;
      if (estado && p.estado !== estado) return false;
      if (q) {
        const haystack =
          `${p.titulo} ${p.ciudad} ${p.provincia} ${p.parcela} ${p.descripcion}`.toLowerCase();
        if (!haystack.includes(q.toLowerCase())) return false;
      }
      return true;
    });
    return ordenar(encontrados, orden);
  }, [q, tipo, provincia, estado, orden]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  // Acotada: al volver atrás con el historial la página podía quedar fuera de
  // rango y la lista aparecía vacía teniendo resultados.
  const page = Math.min(Math.max(1, Number(searchParams.get("pagina")) || 1), totalPages);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const chips = [
    q && { key: "q", label: `«${q}»`, quitar: () => updateParams({ q: null }) },
    tipo && { key: "tipo", label: tipo, quitar: () => updateParams({ tipo: null }) },
    provincia && {
      key: "provincia",
      label: `Provincia: ${provincia}`,
      quitar: () => updateParams({ provincia: null }),
    },
    estado && {
      key: "estado",
      label: `Estado: ${STATUS[estado]?.label ?? estado}`,
      quitar: () => updateParams({ estado: null }),
    },
  ].filter(Boolean);

  function irAPagina(n) {
    updateParams({ pagina: n > 1 ? String(n) : null }, { reiniciarPagina: false });
    resultadosRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <h1 className="text-3xl font-bold tracking-[-0.02em] text-navy-950 sm:text-4xl">
              Catálogo de inmuebles
            </h1>
            <p className="mt-2 text-gray-600" aria-live="polite">
              <span className="font-semibold tabular-nums text-navy-950">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "inmueble encontrado" : "inmuebles encontrados"}
              {totalPages > 1 && (
                <span className="text-gray-500">
                  {" · "}página {page} de {totalPages}
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <label htmlFor="orden" className="text-sm text-gray-600">
              Ordenar
            </label>
            <div className="w-52">
              <SelectField
                id="orden"
                options={ORDENES}
                value={orden}
                onChange={(value) => updateParams({ orden: value || null })}
                placeholder="Orden del inventario"
              />
            </div>
          </div>
        </header>

        {/* Filtro por tipo */}
        <div className="mt-8 flex flex-wrap gap-2">
          <TypeTab active={!tipo} onClick={() => updateParams({ tipo: null })}>
            Todos
          </TypeTab>
          {TYPES.map((t) => (
            <TypeTab key={t} active={tipo === t} onClick={() => updateParams({ tipo: t })}>
              {t}
            </TypeTab>
          ))}
        </div>

        {/* Filtros activos: lo aplicado, a la vista y quitable de uno en uno */}
        {chips.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500">Filtros activos:</span>
            {chips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={chip.quitar}
                className={`group inline-flex h-8 items-center gap-1.5 rounded-md border border-navy-900/12 bg-mist-50 pl-3 pr-2 text-sm font-medium text-navy-900 transition-colors duration-200 ease-brand hover:border-navy-900/25 hover:bg-mist-100 ${FOCUS}`}
              >
                {chip.label}
                <X
                  size={13}
                  weight="bold"
                  aria-hidden="true"
                  className="text-gray-500 transition-colors group-hover:text-navy-900"
                />
                <span className="sr-only">Quitar este filtro</span>
              </button>
            ))}
            <button
              type="button"
              onClick={clearFilters}
              className={`rounded-sm text-sm font-semibold text-navy-700 underline-offset-4 transition-colors hover:text-navy-950 hover:underline ${FOCUS}`}
            >
              Limpiar todo
            </button>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* PANEL DE FILTROS */}
          <aside
            id="panel-filtros"
            className={`${filtrosAbiertos ? "block" : "hidden"} lg:block`}
            aria-label="Filtros del catálogo"
          >
            <div className="space-y-5 border border-navy-900/10 bg-white p-5 lg:sticky lg:top-20">
              <h2 className="font-semibold text-navy-950">Filtros</h2>

              <div>
                <label htmlFor="buscar" className="block text-sm font-medium text-navy-900">
                  Buscar
                </label>
                <input
                  id="buscar"
                  type="search"
                  name="buscar"
                  value={q}
                  onChange={(e) => updateParams({ q: e.target.value || null })}
                  placeholder="Parcela, dirección, ciudad…"
                  autoComplete="off"
                  className="mt-1.5 h-11 w-full rounded-lg border border-navy-900/12 bg-white px-3.5 text-sm text-navy-950 placeholder:text-gray-400 transition-colors hover:border-navy-900/25 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                />
              </div>

              <div>
                <label htmlFor="provincia" className="block text-sm font-medium text-navy-900">
                  Provincia
                </label>
                <div className="mt-1.5">
                  <ProvinceCombobox
                    id="provincia"
                    provinces={PROVINCES}
                    value={provincia}
                    onChange={(value) => updateParams({ provincia: value || null })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-navy-900">
                  Estado del inmueble
                </label>
                <div className="mt-1.5">
                  <SelectField
                    id="estado"
                    options={ESTADO_OPTIONS}
                    value={estado}
                    onChange={(value) => updateParams({ estado: value || null })}
                    placeholder="Todos los estados"
                  />
                </div>
              </div>

              <p className="border-l border-sky-400 bg-sky-50/60 py-3 pl-4 pr-3 text-xs leading-relaxed text-navy-900">
                El precio de la mayoría de los inmuebles se define durante el proceso de oferta.
                Consulta el detalle de cada propiedad.
              </p>
            </div>
          </aside>

          {/* RESULTADOS */}
          <div ref={resultadosRef} className="scroll-mt-24">
            <div className="mb-5 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => updateParams({ filtros: filtrosAbiertos ? null : "1" }, { reiniciarPagina: false })}
                aria-expanded={filtrosAbiertos}
                aria-controls="panel-filtros"
                className={`inline-flex h-11 items-center gap-2 rounded-lg border border-navy-900/12 bg-white px-5 text-sm font-semibold text-navy-800 transition-colors duration-200 ease-brand hover:border-navy-900/25 lg:hidden ${FOCUS}`}
              >
                <FunnelSimple size={16} weight="bold" aria-hidden="true" />
                Filtros
                {chips.length > 0 && (
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-navy-800 px-1.5 text-xs font-bold tabular-nums text-white">
                    {chips.length}
                  </span>
                )}
              </button>

              <div className="ml-auto inline-flex overflow-hidden rounded-lg border border-navy-900/12">
                <ViewToggle
                  activa={vista === "grid"}
                  onClick={() => updateParams({ vista: null }, { reiniciarPagina: false })}
                  label="Vista de cuadrícula"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </ViewToggle>
                <ViewToggle
                  activa={vista === "list"}
                  onClick={() => updateParams({ vista: "lista" }, { reiniciarPagina: false })}
                  label="Vista de lista"
                  conBorde
                >
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </ViewToggle>
              </div>
            </div>

            {paged.length === 0 ? (
              <div className="border border-navy-900/10 bg-mist-50 px-6 py-20 text-center">
                <FunnelSimple
                  size={36}
                  weight="duotone"
                  aria-hidden="true"
                  className="mx-auto text-navy-300"
                />
                <h2 className="mt-4 text-lg font-semibold text-navy-950">
                  No hay inmuebles con estos filtros
                </h2>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-gray-600">
                  {chips.length > 0
                    ? "Prueba a quitar alguno de los filtros activos o a buscar en otra provincia."
                    : "El inventario publicado no contiene inmuebles en este momento."}
                </p>
                {chips.length > 0 && (
                  <Button onClick={clearFilters} variant="secondary" size="sm" className="mt-6">
                    Limpiar filtros
                  </Button>
                )}
              </div>
            ) : (
              <div
                className={
                  vista === "grid"
                    ? "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
                    : "flex flex-col gap-5"
                }
              >
                {paged.map((p) => (
                  <PropertyCard key={p.id} property={p} view={vista} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <nav
                aria-label="Paginación del catálogo"
                className="mt-10 flex items-center justify-center gap-2"
              >
                <PageButton
                  onClick={() => irAPagina(page - 1)}
                  disabled={page === 1}
                  label="Página anterior"
                >
                  <CaretLeft size={15} weight="bold" aria-hidden="true" />
                </PageButton>

                {paginasVisibles(page, totalPages).map((n, i) =>
                  n === "…" ? (
                    <span
                      key={`sep-${i}`}
                      aria-hidden="true"
                      className="px-1 text-sm text-gray-400"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={n}
                      type="button"
                      onClick={() => irAPagina(n)}
                      aria-current={n === page ? "page" : undefined}
                      aria-label={`Página ${n}`}
                      className={`h-11 w-11 rounded-lg text-sm font-semibold tabular-nums transition-colors duration-200 ease-brand ${FOCUS} ${
                        n === page
                          ? "bg-navy-800 text-white"
                          : "border border-navy-900/12 bg-white text-gray-600 hover:border-navy-900/25 hover:text-navy-900"
                      }`}
                    >
                      {n}
                    </button>
                  ),
                )}

                <PageButton
                  onClick={() => irAPagina(page + 1)}
                  disabled={page === totalPages}
                  label="Página siguiente"
                >
                  <CaretRight size={15} weight="bold" aria-hidden="true" />
                </PageButton>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PageButton({ onClick, disabled, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border border-navy-900/12 bg-white text-navy-800 transition-colors duration-200 ease-brand hover:border-navy-900/25 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-navy-900/12 ${FOCUS}`}
    >
      {children}
    </button>
  );
}

function ViewToggle({ activa, onClick, label, conBorde = false, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activa}
      aria-label={label}
      className={`inline-flex h-11 items-center px-4 transition-colors duration-200 ease-brand outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-inset ${
        conBorde ? "border-l border-navy-900/12" : ""
      } ${activa ? "bg-navy-800 text-white" : "bg-white text-gray-500 hover:text-navy-900"}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        {children}
      </svg>
    </button>
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
      className={`inline-flex h-11 items-center rounded-lg border px-5 text-sm font-semibold transition-colors duration-200 ease-brand ${FOCUS} ${
        active
          ? "border-navy-800 bg-navy-800 text-white"
          : "border-navy-900/12 bg-white text-gray-600 hover:border-navy-900/25 hover:text-navy-900"
      }`}
    >
      {children}
    </button>
  );
}
