import { Link } from "react-router-dom";
import PropertyMedia from "./PropertyMedia";
import StatusBadge from "./StatusBadge";
import { formatArea, formatPrice } from "../data/properties";

export default function PropertyCard({ property, view = "grid" }) {
  const isList = view === "list";

  return (
    <Link
      to={`/inmuebles/${property.id}`}
      className={`group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 ${
        isList ? "flex flex-col sm:flex-row" : "flex flex-col"
      }`}
    >
      <div className={`relative ${isList ? "sm:w-64 shrink-0" : "w-full"}`}>
        <PropertyMedia tipo={property.tipo} className={isList ? "h-44 sm:h-full" : "h-48"} />
        <span className="absolute top-3 left-3 bg-white/95 text-navy-800 text-xs font-semibold px-2.5 py-1 rounded-full">
          {property.tipo}
        </span>
        {property.tourVirtual && (
          <span className="absolute top-3 right-3 bg-gold-400 text-navy-950 text-xs font-semibold px-2.5 py-1 rounded-full">
            Tour Virtual
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-navy-900 leading-snug group-hover:text-navy-600 transition-colors">
            {property.titulo}
          </h3>
          <StatusBadge estado={property.estado} className="shrink-0" />
        </div>

        <p className="text-sm text-gray-500 flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21Z" />
            <circle cx="12" cy="9.5" r="2.3" />
          </svg>
          {property.ciudad}, {property.provincia}
        </p>

        <p className="text-xs text-gray-400 font-mono">
          Parcela: {property.parcela} · DC: {property.dc}
        </p>

        {!isList && (
          <p className="text-sm text-gray-600 line-clamp-2">{property.descripcion}</p>
        )}

        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm font-semibold text-navy-800">{formatArea(property.tamano)}</span>
          <span className="text-sm font-semibold text-gold-600">{formatPrice(property.precio)}</span>
        </div>
      </div>
    </Link>
  );
}
