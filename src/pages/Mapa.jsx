import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl/mapbox";
import {
  ArrowRight,
  Buildings,
  Info,
  MagnifyingGlass,
  MapPin,
  SlidersHorizontal,
  X,
} from "@phosphor-icons/react";
import "mapbox-gl/dist/mapbox-gl.css";
import PropertyMapMarker, { TYPE_COLORS } from "../components/PropertyMapMarker";
import MapTokenNotice from "../components/MapTokenNotice";
import { MAPBOX_TOKEN, MAP_STYLE, DEFAULT_CENTER, boundsFromPoints } from "../components/mapConfig";
import { PROPERTIES, STATUS, TYPES, formatArea } from "../data/properties";

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

    map.fitBounds(boundsFromPoints(properties), { padding: 48, maxZoom: 10, duration: 700 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapReady, fitRequest, properties, selectedProperty]);
}

function ResultItem({ property, selected, onSelect }) {
  return (
    <article
      className={`group rounded-xl border bg-white transition-[border-color,box-shadow,transform] duration-200 ${
        selected
          ? "border-navy-500 shadow-[0_10px_30px_rgba(11,29,51,0.12)]"
          : "border-gray-200 hover:border-navy-200 hover:shadow-[0_8px_24px_rgba(11,29,51,0.08)]"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className="w-full touch-manipulation rounded-xl p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2 active:scale-[0.99]"
      >
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-600">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: TYPE_COLORS[property.tipo] }}
              />
              <span>{property.tipo}</span>
              <span aria-hidden="true" className="h-3 w-px bg-gray-200" />
              <span>{STATUS[property.estado]?.label}</span>
            </div>
            <h2 className="text-pretty font-semibold leading-snug text-navy-950">
              {property.titulo}
            </h2>
          </div>
          <MapPin
            aria-hidden="true"
            weight={selected ? "fill" : "regular"}
            className={`mt-0.5 h-5 w-5 shrink-0 ${selected ? "text-navy-600" : "text-gray-400"}`}
          />
        </div>
        <p className="mt-2 line-clamp-1 text-sm text-gray-600">
          {property.ciudad}, {property.provincia}
        </p>
        <p className="mt-1 text-sm font-semibold tabular-nums text-navy-800">
          {formatArea(property.tamano)}
        </p>
      </button>
      <div className="mx-4 border-t border-gray-100 py-3">
        <Link
          to={`/inmuebles/${property.id}`}
          className="inline-flex touch-manipulation items-center gap-1.5 rounded-md text-sm font-semibold text-navy-700 underline-offset-4 hover:text-navy-950 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
        >
          Ver detalles
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export default function Mapa() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fitRequest, setFitRequest] = useState(0);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef(null);

  const query = searchParams.get("q") ?? "";
  const selectedId = searchParams.get("seleccion");
  const typeParam = searchParams.get("tipos");
  const activeTypes = useMemo(() => {
    if (!typeParam) return new Set(TYPES);
    if (typeParam === "ninguno") return new Set();
    return new Set(typeParam.split(",").filter((type) => TYPES.includes(type)));
  }, [typeParam]);

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

  useMapViewport(mapRef, mapReady, { properties: visible, selectedProperty, fitRequest });

  function updateParams(changes) {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      Object.entries(changes).forEach(([key, value]) => {
        if (value) next.set(key, value);
        else next.delete(key);
      });
      return next;
    }, { replace: true });
  }

  function toggleType(type) {
    const next = new Set(activeTypes);
    if (next.has(type)) next.delete(type);
    else next.add(type);

    const nextValue = next.size === TYPES.length
      ? null
      : next.size === 0
        ? "ninguno"
        : TYPES.filter((item) => next.has(item)).join(",");

    updateParams({ tipos: nextValue, seleccion: null });
  }

  function clearFilters() {
    setSearchParams({}, { replace: true });
    setFitRequest((request) => request + 1);
  }

  function fitVisibleProperties() {
    updateParams({ seleccion: null });
    setFitRequest((request) => request + 1);
  }

  return (
    <div className="bg-gray-50">
      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <header className="mb-7 max-w-3xl">
          <h1 className="text-pretty text-3xl font-bold tracking-[-0.025em] text-navy-950 sm:text-4xl">
            Explora las propiedades en el mapa
          </h1>
          <p className="mt-3 max-w-[65ch] text-pretty leading-relaxed text-gray-600">
            Consulta la ubicación referencial de los inmuebles del fideicomiso y filtra el inventario por tipo o localidad.
          </p>
        </header>

        <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_8px_30px_rgba(11,29,51,0.05)] lg:flex-row lg:items-center">
          <label className="group relative block min-w-0 flex-1">
            <span className="sr-only">Buscar por propiedad, localidad o parcela</span>
            <MagnifyingGlass
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-focus-within:text-navy-600"
            />
            <input
              type="search"
              name="map-search"
              value={query}
              onChange={(event) => updateParams({ q: event.target.value || null, seleccion: null })}
              autoComplete="off"
              placeholder="Ej.: Santiago, apartamento o parcela 215…"
              className="h-[60px] w-full rounded-md border border-gray-300 bg-white pl-12 pr-12 text-base text-navy-950 placeholder:text-gray-400 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => updateParams({ q: null, seleccion: null })}
                aria-label="Limpiar búsqueda"
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 touch-manipulation items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            )}
          </label>

          <div className="flex flex-wrap items-center gap-2" aria-label="Filtrar por tipo de inmueble">
            {TYPES.map((type) => {
              const active = activeTypes.has(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  aria-pressed={active}
                  className={`inline-flex h-[60px] touch-manipulation items-center justify-center gap-2 rounded-md border px-6 text-base font-semibold whitespace-nowrap transition-[background-color,border-color,color,transform] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2 ${
                    active
                      ? "border-navy-200 bg-navy-50 text-navy-900 hover:border-navy-300"
                      : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300 hover:text-gray-800"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-2.5 w-2.5 rounded-full ${active ? "opacity-100" : "opacity-40"}`}
                    style={{ backgroundColor: TYPE_COLORS[type] }}
                  />
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_18px_50px_rgba(11,29,51,0.08)] lg:grid-cols-[390px_minmax(0,1fr)]">
          <aside className="order-2 flex min-h-0 flex-col border-t border-gray-200 bg-gray-50/70 lg:order-1 lg:h-[680px] lg:border-r lg:border-t-0" aria-label="Resultados del mapa">
            <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3.5 sm:px-5">
              <div className="flex min-w-0 items-center gap-2.5">
                <Buildings aria-hidden="true" className="h-5 w-5 shrink-0 text-navy-600" />
                <p className="truncate text-sm font-semibold text-navy-950" aria-live="polite">
                  {visible.length} {visible.length === 1 ? "propiedad encontrada" : "propiedades encontradas"}
                </p>
              </div>
              {(query || activeTypes.size !== TYPES.length) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="shrink-0 rounded-md text-sm font-semibold text-navy-700 underline-offset-4 hover:text-navy-950 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            {visible.length > 0 ? (
              <div
                className="grid max-h-[520px] gap-3 overflow-y-auto p-3 sm:p-4 lg:max-h-none lg:flex-1"
                role="region"
                aria-label="Listado de propiedades encontradas"
                tabIndex="0"
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
              <div className="flex flex-1 flex-col items-center justify-center px-6 py-14 text-center">
                <SlidersHorizontal aria-hidden="true" className="h-10 w-10 text-navy-300" />
                <h2 className="mt-4 font-semibold text-navy-950">No hay propiedades con esos filtros</h2>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-600">
                  Prueba otra localidad o activa más tipos de inmueble.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 inline-flex h-[60px] items-center justify-center rounded-md bg-navy-800 px-7 text-base font-semibold whitespace-nowrap text-white shadow-[0_1px_3px_rgba(0,23,51,0.12)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-navy-950 hover:shadow-[0_10px_24px_-6px_rgba(0,23,51,0.4)] active:translate-y-0 active:scale-[0.98] active:shadow-[0_2px_6px_rgba(0,23,51,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
                >
                  Mostrar todas
                </button>
              </div>
            )}
          </aside>

          <div
            className="relative order-1 h-[58dvh] min-h-[440px] bg-navy-50 lg:order-2 lg:h-[680px]"
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
                  anchor="bottom"
                  offset={30}
                  closeOnClick={false}
                  onClose={() => updateParams({ seleccion: null })}
                  className="fdi-map-popup"
                >
                  <div className="min-w-0 text-sm">
                    <p className="text-pretty font-semibold leading-snug text-navy-950">{selectedProperty.titulo}</p>
                    <p className="mt-1 text-gray-600">{selectedProperty.ciudad}, {selectedProperty.provincia}</p>
                    <p className="mt-1 font-semibold tabular-nums text-navy-800">{formatArea(selectedProperty.tamano)}</p>
                    <Link
                      to={`/inmuebles/${selectedProperty.id}`}
                      className="mt-3 inline-flex items-center gap-1.5 font-semibold text-navy-700 hover:text-navy-950 hover:underline"
                    >
                      Ver detalles <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </div>
                </Popup>
              )}
            </Map>
            )}

            <button
              type="button"
              onClick={fitVisibleProperties}
              disabled={visible.length === 0}
              className="absolute right-3 top-3 z-[400] inline-flex h-[60px] touch-manipulation items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-7 text-base font-semibold whitespace-nowrap text-navy-900 shadow-[0_8px_24px_rgba(11,29,51,0.16)] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <MapPin aria-hidden="true" className="h-4 w-4" />
              Ver todas
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-navy-100 bg-navy-50 p-4 sm:p-5">
          <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-navy-600" />
          <p className="max-w-[75ch] text-sm leading-relaxed text-navy-800">
            El mapa muestra ubicaciones aproximadas con fines de consulta. Las coordenadas y delimitaciones definitivas dependen de los procesos catastrales y registrales correspondientes.
          </p>
        </div>
      </section>
    </div>
  );
}
