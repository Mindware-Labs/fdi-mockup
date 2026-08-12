import { lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import PropertyMedia from "../components/PropertyMedia";
import PropertyCard from "../components/PropertyCard";
import StatusBadge from "../components/StatusBadge";
import { PROPERTIES, formatArea, formatPrice } from "../data/properties";
import NotFound from "./NotFound";

// Mapbox GL pesa ~500 kB gzip: se descarga solo al abrir la ficha de un inmueble.
const MiniMap = lazy(() => import("../components/MiniMap"));

const DOCS = [
  "Certificado de Título (referencial)",
  "Ficha Técnica del Inmueble (PDF)",
  "Plano Catastral (PDF)",
];

export default function PropertyDetail() {
  const { id } = useParams();
  const property = PROPERTIES.find((p) => p.id === id);

  if (!property) return <NotFound />;

  const similares = PROPERTIES.filter(
    (p) => p.id !== property.id && (p.tipo === property.tipo || p.provincia === property.provincia)
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2 flex-wrap">
        <Link to="/" className="hover:text-navy-700">Inicio</Link>
        <span>/</span>
        <Link to="/inmuebles" className="hover:text-navy-700">Inmuebles</Link>
        <span>/</span>
        <span className="text-gray-700">{property.titulo}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative rounded-2xl overflow-hidden">
            <PropertyMedia tipo={property.tipo} className="h-72 sm:h-96" iconClassName="w-20 h-20" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-white/95 text-navy-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                {property.tipo}
              </span>
              {property.tourVirtual && (
                <span className="bg-orange-400 text-navy-950 text-xs font-semibold px-3 py-1.5 rounded-full">
                  Tour Virtual disponible
                </span>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-3xl font-bold text-navy-950">{property.titulo}</h1>
                <p className="text-gray-500 mt-2 flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21Z" />
                    <circle cx="12" cy="9.5" r="2.3" />
                  </svg>
                  {property.ciudad}, {property.provincia}
                </p>
              </div>
              <StatusBadge estado={property.estado} />
            </div>

            <p className="mt-6 text-gray-600 leading-relaxed">{property.descripcion}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <DataItem label="Parcela" value={property.parcela} />
            <DataItem label="Distrito Catastral" value={property.dc} />
            <DataItem label="Tamaño" value={formatArea(property.tamano)} />
            <DataItem label="Provincia" value={property.provincia} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-4">Ubicación</h2>
            <Suspense fallback={<div className="h-[320px] rounded-xl bg-navy-50 border border-navy-100" />}>
              <MiniMap property={property} />
            </Suspense>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-4">Documentos relacionados</h2>
            <ul className="space-y-2">
              {DOCS.map((doc) => (
                <li
                  key={doc}
                  className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-navy-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                    <path d="M14 2v6h6" />
                  </svg>
                  {doc}
                  <span className="ml-auto text-xs text-gray-400">Disponible en detalle final</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-28">
            <p className="text-sm text-gray-500 mb-1">Precio</p>
            <p className="text-2xl font-bold text-navy-950 mb-6">{formatPrice(property.precio)}</p>

            <div className="space-y-3">
              <a
                href="/como-comprar#formularios"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-orange-400 shadow-[0_1px_3px_rgba(0,23,51,0.12)] hover:-translate-y-0.5 hover:bg-orange-500 hover:shadow-[0_10px_24px_-6px_rgba(245,130,32,0.5)] active:translate-y-0 active:shadow-[0_2px_6px_rgba(0,23,51,0.15)] text-navy-950 font-semibold text-sm px-5 py-3 transition-[transform,box-shadow,background-color] duration-200"
              >
                Hacer una oferta
              </a>
              <Link
                to="/contacto"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-navy-800 text-navy-800 hover:bg-navy-50 font-semibold text-sm px-5 py-3 transition-colors"
              >
                Solicitar información
              </Link>
              <a
                href={`https://wa.me/18099604580?text=${encodeURIComponent(`Hola, estoy interesado en el inmueble ${property.titulo} (Parcela ${property.parcela}).`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-semibold text-sm px-5 py-3 transition-colors"
              >
                Consultar por WhatsApp
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 text-sm text-gray-500">
              <p>¿Prefieres hablar con alguien?</p>
              <a href="tel:8099604580" className="text-navy-800 font-semibold text-base">
                (809) 960-4580
              </a>
            </div>
          </div>
        </div>
      </div>

      {similares.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-navy-950 mb-6">Propiedades similares</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similares.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DataItem({ label, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="font-semibold text-navy-900 text-sm">{value}</p>
    </div>
  );
}
