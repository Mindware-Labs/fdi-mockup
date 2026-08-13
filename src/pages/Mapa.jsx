import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl/mapbox";
import {
  ArrowRight,
  Info,
  MagnifyingGlass,
  MapPin,
  SlidersHorizontal,
  StackSimple,
  X,
} from "@phosphor-icons/react";
import "mapbox-gl/dist/mapbox-gl.css";
import PropertyMapMarker, { TYPE_COLORS } from "../components/PropertyMapMarker";
import MapTokenNotice from "../components/MapTokenNotice";
import Button from "../components/Button";
import LayerPanel, { LayerLegend } from "../components/LayerControl";
import ThematicLayers from "../components/ThematicLayers";
import useThematicLayers from "../components/useThematicLayers";
import { MAPBOX_TOKEN, MAP_STYLE, DEFAULT_CENTER, boundsFromPoints } from "../components/mapConfig";
import { MAP_LAYERS } from "../data/mapLayers";
import { PROPERTIES, STATUS, TYPES, formatArea } from "../data/properties";

const LAYER_IDS = MAP_LAYERS.map((layer) => layer.id);
const FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2";
const PESTANAS = [
  { id: "inmuebles", label: "Inmuebles" },
  { id: "capas", label: "Capas" },
];

/** Centra/ajusta el mapa cuando cambia la selección, el filtro o se pide "ver todas". */
function useMapViewport(mapRef, mapReady, { properties, selectedProperty, fitRequest }) {
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    if (selectedProperty) {
      map.flyTo({
        center: [selectedProperty.lng, selectedProperty.lat],
        zoom: Math.max(map.getZoom(), 12),
        duration: 700,
      });
      return;
    }

    if (properties.length === 0) return;
    if (properties.length === 1) {
      map.flyTo({ center: [properties[0].lng, properties[0].lat], zoom: 12, duration: 600 });
      return;
    }

    map.fitBounds(boundsFromPoints(properties), { padding: 64, maxZoom: 10, duration: 700 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapReady, fitRequest, properties, selectedProperty]);
}

function ResultItem({ property, selected, onSelect }) {
  return (
    <article
      className={`group relative overflow-hidden rounded-lg border bg-white transition-[border-color,box-shadow] duration-500 ease-brand ${
        selected
          ? "border-navy-900/[0.04] shadow-[0_2px_4px_-2px_rgba(7,26,58,0.12),0_18px_38px_-24px_rgba(7,26,58,0.55)]"
          : "border-navy-900/10 hover:border-navy-900/[0.04] hover:shadow-[0_2px_4px_-2px_rgba(7,26,58,0.12),0_18px_38px_-24px_rgba(7,26,58,0.55)]"
      }`}
    >
      {/* Marca de selección: filete navy a la izquierda. Es la única señal que no
          comparte con el hover, para que "seleccionado" y "bajo el cursor" nunca
          se confundan. */}
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-1 bg-navy-700 transition-opacity duration-300 ${
          selected ? "opacity-100" : "opacity-0"
        }`}
      />
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={`w-full touch-manipulation p-4 text-left ${FOCUS} focus-visible:ring-inset`}
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: TYPE_COLORS[property.tipo] }}
          />
          <span>{property.tipo}</span>
          <span aria-hidden="true" className="h-3 w-px bg-navy-900/15" />
          <span>{STATUS[property.estado]?.label}</span>
        </div>

        <h3 className="mt-2.5 text-pretty font-semibold leading-snug text-navy-950">
          {property.titulo}
        </h3>

        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-600">
          <MapPin size={14} weight="fill" aria-hidden="true" className="shrink-0 text-navy-400" />
          {property.ciudad}, {property.provincia}
        </p>

        <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-navy-900/10 pt-3">
          <p className="font-mono text-xs text-gray-500">
            Parcela {property.parcela} · DC {property.dc}
          </p>
          <p className="text-sm font-semibold tabular-nums text-navy-900">
            {formatArea(property.tamano)}
          </p>
        </div>
      </button>

      <div className="border-t border-navy-900/10 px-4 py-2.5">
        <Link
          to={`/inmuebles/${property.id}`}
          className={`group/link inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-navy-800 transition-colors hover:text-navy-950 ${FOCUS}`}
        >
          Ver detalles
          <ArrowRight
            size={14}
            weight="bold"
            aria-hidden="true"
            className="transition-transform duration-300 ease-brand motion-safe:group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}

export default function Mapa() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fitRequest, setFitRequest] = useState(0);
  const [mapReady, setMapReady] = useState(false);
  const [pestana, setPestana] = useState("inmuebles");
  const mapRef = useRef(null);
  const panelRef = useRef(null);
  const tablistRef = useRef(null);
  const layerSources = useThematicLayers();

  const query = searchParams.get("q") ?? "";
  const selectedId = searchParams.get("seleccion");
  const typeParam = searchParams.get("tipos");

  const activeTypes = useMemo(() => {
    if (!typeParam) return new Set(TYPES);
    if (typeParam === "ninguno") return new Set();
    return new Set(typeParam.split(",").filter((type) => TYPES.includes(type)));
  }, [typeParam]);

  // Las capas encendidas viajan en la URL: compartir el enlace comparte la vista.
  const layerParam = searchParams.get("capas");
  const activeLayers = useMemo(() => {
    if (!layerParam) return new Set();
    if (layerParam === "todas") return new Set(LAYER_IDS);
    return new Set(layerParam.split(",").filter((id) => LAYER_IDS.includes(id)));
  }, [layerParam]);

  const visible = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es-DO");
    return PROPERTIES.filter((property) => {
      if (!property.lat || !property.lng || !activeTypes.has(property.tipo)) return false;
      if (!normalizedQuery) return true;
      return [property.titulo, property.ciudad, property.provincia, property.parcela]
        .filter(Boolean)
        .some((value) => value.toLocaleLowerCase("es-DO").includes(normalizedQuery));
    });
  }, [activeTypes, query]);

  const selectedProperty = visible.find((property) => property.id === selectedId) ?? null;
  const filtrosActivos = query !== "" || activeTypes.size !== TYPES.length;

  useMapViewport(mapRef, mapReady, { properties: visible, selectedProperty, fitRequest });

  function updateParams(changes) {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current);
        Object.entries(changes).forEach(([key, value]) => {
          if (value) next.set(key, value);
          else next.delete(key);
        });
        return next;
      },
      { replace: true },
    );
  }

  function toggleType(type) {
    const next = new Set(activeTypes);
    if (next.has(type)) next.delete(type);
    else next.add(type);

    const nextValue =
      next.size === TYPES.length
        ? null
        : next.size === 0
          ? "ninguno"
          : TYPES.filter((item) => next.has(item)).join(",");

    updateParams({ tipos: nextValue, seleccion: null });
  }

  function serializeLayers(set) {
    if (set.size === 0) return null;
    if (set.size === LAYER_IDS.length) return "todas";
    return LAYER_IDS.filter((id) => set.has(id)).join(",");
  }

  function toggleLayer(id) {
    const next = new Set(activeLayers);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    updateParams({ capas: serializeLayers(next) });
  }

  function setAllLayers(modo) {
    updateParams({ capas: modo === "todas" ? "todas" : null });
  }

  // Limpia el filtrado del inventario, no las capas: son dos controles distintos.
  function clearFilters() {
    setSearchParams(layerParam ? { capas: layerParam } : {}, { replace: true });
    setFitRequest((request) => request + 1);
  }

  function fitVisibleProperties() {
    updateParams({ seleccion: null });
    setFitRequest((request) => request + 1);
  }

  /** Flechas para moverse entre pestañas, como espera un `tablist`. */
  function onTablistKeyDown(event) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const siguiente = pestana === "inmuebles" ? "capas" : "inmuebles";
    setPestana(siguiente);
    tablistRef.current?.querySelector(`#pestana-${siguiente}`)?.focus();
  }

  /**
   * En móvil el panel queda debajo del mapa: hay que llevarlo a la vista. En
   * escritorio ya está al lado, así que desplazar la página sería un salto
   * gratuito que además metería el mapa bajo la cabecera fija.
   */
  function abrirCapas() {
    setPestana("capas");
    const enEscritorio = window.matchMedia("(min-width: 1024px)").matches;
    requestAnimationFrame(() => {
      if (!enEscritorio) panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      tablistRef.current?.querySelector("#pestana-capas")?.focus();
    });
  }

  return (
    // Debajo de la cabecera (h-16) el mapa ocupa todo lo que queda de ventana.
    // En móvil el alto es libre: mapa arriba, panel debajo, y la página desplaza.
    <div className="flex flex-col bg-mist-100 lg:h-[calc(100dvh-4rem)] lg:overflow-hidden">
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* MAPA — primero en móvil para que sea lo primero que se ve */}
        <div
          className="relative order-1 h-[52dvh] min-h-[340px] bg-navy-50 lg:order-2 lg:h-auto lg:min-h-0 lg:flex-1"
          role="application"
          aria-label="Mapa de propiedades del fideicomiso"
        >
          {!MAPBOX_TOKEN && <MapTokenNotice className="absolute inset-0" />}
          {MAPBOX_TOKEN && (
            <Map
              ref={mapRef}
              mapboxAccessToken={MAPBOX_TOKEN}
              mapStyle={MAP_STYLE}
              initialViewState={DEFAULT_CENTER}
              onLoad={() => setMapReady(true)}
              style={{ height: "100%", width: "100%" }}
            >
              <NavigationControl position="top-left" showCompass={false} />
              <ThematicLayers activas={activeLayers} sources={layerSources} />
              {visible.map((property) => (
                <Marker
                  key={property.id}
                  longitude={property.lng}
                  latitude={property.lat}
                  anchor="bottom"
                  onClick={(event) => {
                    event.originalEvent.stopPropagation();
                    updateParams({ seleccion: property.id });
                  }}
                >
                  <PropertyMapMarker
                    tipo={property.tipo}
                    selected={selectedProperty?.id === property.id}
                  />
                </Marker>
              ))}
              {selectedProperty && (
                <Popup
                  longitude={selectedProperty.lng}
                  latitude={selectedProperty.lat}
                  offset={30}
                  closeOnClick={false}
                  onClose={() => updateParams({ seleccion: null })}
                  className="fdi-map-popup"
                >
                  <div className="min-w-0 text-sm">
                    <p className="text-pretty font-semibold leading-snug text-navy-950">
                      {selectedProperty.titulo}
                    </p>
                    <p className="mt-1 text-gray-600">
                      {selectedProperty.ciudad}, {selectedProperty.provincia}
                    </p>
                    <p className="mt-1 font-semibold tabular-nums text-navy-800">
                      {formatArea(selectedProperty.tamano)}
                    </p>
                    <Link
                      to={`/inmuebles/${selectedProperty.id}`}
                      className="mt-3 inline-flex items-center gap-1.5 font-semibold text-navy-700 hover:text-navy-950 hover:underline"
                    >
                      Ver detalles <ArrowRight size={14} weight="bold" aria-hidden="true" />
                    </Link>
                  </div>
                </Popup>
              )}
            </Map>
          )}

          <div className="pointer-events-none absolute right-3 top-3 z-[400] flex flex-col items-end gap-2 [&>*]:pointer-events-auto">
            <Button
              onClick={fitVisibleProperties}
              disabled={visible.length === 0}
              variant="quiet"
              size="sm"
              className="touch-manipulation shadow-[0_8px_24px_rgba(11,29,51,0.16)]"
            >
              <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
              Ver todas
            </Button>

            {/* Solo en móvil: en escritorio las capas ya están a un clic en el panel */}
            <Button
              onClick={abrirCapas}
              variant="quiet"
              size="sm"
              className="touch-manipulation shadow-[0_8px_24px_rgba(11,29,51,0.16)] lg:hidden"
            >
              <StackSimple aria-hidden="true" className="h-4 w-4 shrink-0" />
              Capas
              {activeLayers.size > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-navy-800 px-1.5 text-xs font-bold tabular-nums text-white">
                  {activeLayers.size}
                </span>
              )}
            </Button>
          </div>

          {/* Abajo a la derecha: con el panel a la izquierda, la isla se dibuja hacia
              el centro y ese vértice cae sobre mar abierto. A la izquierda tapaba
              Barahona y Pedernales, que es donde hay inventario. `bottom-8` deja
              libre la atribución obligatoria de Mapbox. */}
          <LayerLegend activas={activeLayers} className="absolute bottom-8 right-3 z-[390]" />
        </div>

        {/* PANEL LATERAL */}
        <aside
          ref={panelRef}
          className="order-2 flex w-full flex-col border-t border-navy-900/10 bg-white lg:order-1 lg:min-h-0 lg:w-[400px] lg:shrink-0 lg:border-r lg:border-t-0 xl:w-[440px]"
          aria-label="Controles y resultados del mapa"
        >
          <div className="shrink-0 border-b border-navy-900/10 px-4 py-4 sm:px-5">
            <h1 className="text-xl font-bold tracking-[-0.02em] text-navy-950">
              Propiedades a nivel nacional
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
              Ubicación referencial del inventario del fideicomiso, con las capas de
              infraestructura que condicionan cada parcela.
            </p>
          </div>

          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Secciones del panel"
            onKeyDown={onTablistKeyDown}
            className="flex shrink-0 border-b border-navy-900/10"
          >
            {PESTANAS.map(({ id, label }) => {
              const activa = pestana === id;
              const cuenta = id === "inmuebles" ? visible.length : activeLayers.size;
              return (
                <button
                  key={id}
                  id={`pestana-${id}`}
                  role="tab"
                  type="button"
                  aria-selected={activa}
                  aria-controls={`seccion-${id}`}
                  tabIndex={activa ? 0 : -1}
                  onClick={() => setPestana(id)}
                  className={`relative flex flex-1 items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold transition-colors duration-200 ease-brand ${FOCUS} focus-visible:ring-inset ${
                    activa ? "text-navy-950" : "text-gray-500 hover:text-navy-900"
                  }`}
                >
                  {label}
                  <span
                    className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold tabular-nums transition-colors duration-200 ${
                      activa ? "bg-navy-800 text-white" : "bg-mist-200 text-gray-600"
                    }`}
                  >
                    {cuenta}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-px h-0.5 bg-sky-400 transition-transform duration-300 ease-brand ${
                      activa ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* SECCIÓN INMUEBLES */}
          <div
            id="seccion-inmuebles"
            role="tabpanel"
            aria-labelledby="pestana-inmuebles"
            hidden={pestana !== "inmuebles"}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="shrink-0 space-y-3 border-b border-navy-900/10 p-4 sm:p-5">
              <label className="group relative block">
                <span className="sr-only">Buscar por propiedad, localidad o parcela</span>
                <MagnifyingGlass
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-focus-within:text-navy-600"
                />
                <input
                  type="search"
                  name="map-search"
                  value={query}
                  onChange={(event) =>
                    updateParams({ q: event.target.value || null, seleccion: null })
                  }
                  autoComplete="off"
                  placeholder="Santiago, apartamento, parcela 215…"
                  className="h-12 w-full rounded-lg border border-navy-900/12 bg-white pl-11 pr-11 text-sm text-navy-950 placeholder:text-gray-400 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => updateParams({ q: null, seleccion: null })}
                    aria-label="Limpiar búsqueda"
                    className={`absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 touch-manipulation items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-mist-100 hover:text-navy-900 ${FOCUS}`}
                  >
                    <X aria-hidden="true" className="h-4 w-4" />
                  </button>
                )}
              </label>

              <div className="flex flex-wrap gap-2" aria-label="Filtrar por tipo de inmueble">
                {TYPES.map((type) => {
                  const active = activeTypes.has(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleType(type)}
                      aria-pressed={active}
                      // Activo en tinte, no en placa llena: por defecto los cuatro
                      // tipos están encendidos y cuatro bloques navy seguidos
                      // ensombrecían el panel sin comunicar nada.
                      className={`inline-flex h-11 touch-manipulation items-center gap-2 rounded-lg border px-4 text-sm font-semibold transition-colors duration-200 ease-brand ${FOCUS} ${
                        active
                          ? "border-navy-300 bg-navy-50 text-navy-900 hover:border-navy-400"
                          : "border-navy-900/12 bg-white text-gray-500 hover:border-navy-900/25 hover:text-navy-900"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{
                          backgroundColor: TYPE_COLORS[type],
                          opacity: active ? 1 : 0.45,
                        }}
                      />
                      {type}
                    </button>
                  );
                })}
              </div>

              {filtrosActivos && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className={`rounded-sm text-sm font-semibold text-navy-700 underline-offset-4 transition-colors hover:text-navy-950 hover:underline ${FOCUS}`}
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            {visible.length > 0 ? (
              <div
                className="min-h-0 flex-1 space-y-3 p-4 sm:p-5 lg:overflow-y-auto"
                aria-live="polite"
              >
                {visible.map((property) => (
                  <ResultItem
                    key={property.id}
                    property={property}
                    selected={selectedProperty?.id === property.id}
                    onSelect={() => updateParams({ seleccion: property.id })}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
                <SlidersHorizontal aria-hidden="true" className="h-9 w-9 text-navy-300" />
                <h2 className="mt-4 font-semibold text-navy-950">
                  No hay propiedades con esos filtros
                </h2>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-600">
                  Prueba otra localidad o activa más tipos de inmueble.
                </p>
                <Button onClick={clearFilters} variant="secondary" size="sm" className="mt-5">
                  Mostrar todas
                </Button>
              </div>
            )}
          </div>

          {/* SECCIÓN CAPAS */}
          <div
            id="seccion-capas"
            role="tabpanel"
            aria-labelledby="pestana-capas"
            hidden={pestana !== "capas"}
            className="flex min-h-0 flex-1 flex-col"
          >
            <LayerPanel activas={activeLayers} onToggle={toggleLayer} onTodas={setAllLayers} />
          </div>

          <p className="flex shrink-0 gap-2.5 border-t border-navy-900/10 bg-mist-50 px-4 py-3 text-xs leading-relaxed text-gray-600 sm:px-5">
            <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-navy-500" />
            <span>
              Ubicaciones aproximadas con fines de consulta. Las delimitaciones definitivas
              dependen de los procesos catastrales y registrales correspondientes.
            </span>
          </p>
        </aside>
      </div>
    </div>
  );
}
