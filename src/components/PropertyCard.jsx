import { Link } from "react-router-dom";
import { MapPin } from "@phosphor-icons/react";
import PropertyMedia from "./PropertyMedia";
import StatusBadge from "./StatusBadge";
import { formatArea, formatPrice } from "../data/properties";

const TAG = "px-2.5 py-1 text-xs font-semibold";

export default function PropertyCard({ property, view = "grid" }) {
  const isList = view === "list";

  return (
    <Link
      to={`/inmuebles/${property.id}`}
      className={`group bg-white border border-navy-900/10 hover:border-navy-900/30 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 ${
        isList ? "flex flex-col sm:flex-row" : "flex flex-col"
      }`}
    >
      <PropertyMedia
        tipo={property.tipo}
        className={isList ? "h-44 shrink-0 sm:h-auto sm:w-64" : "h-48"}
      />

      <div className="flex flex-1 flex-col p-5">
        {/* Absorbe el espacio libre para que la tira de datos quede siempre al fondo */}
        <div className="flex-1">
          {/* Identificación: tipo a la izquierda, estado anclado a la derecha */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`${TAG} border border-navy-100 bg-navy-50 text-navy-700`}>
              {property.tipo}
            </span>
            {property.tourVirtual && (
              <span className={`${TAG} border border-sky-200 bg-sky-50 text-sky-800`}>
                Tour virtual
              </span>
            )}
            <StatusBadge estado={property.estado} className="ml-auto" />
          </div>

          <h3 className="mt-4 font-semibold text-navy-950 leading-snug transition-colors group-hover:text-navy-600">
            {property.titulo}
          </h3>

          <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
            <MapPin size={15} weight="fill" aria-hidden="true" className="shrink-0 text-navy-400" />
            {property.ciudad}, {property.provincia}
          </p>

          <p className="mt-1.5 font-mono text-xs text-gray-500">
            Parcela {property.parcela} · DC {property.dc}
          </p>

          {!isList && (
            <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-2">
              {property.descripcion}
            </p>
          )}
        </div>

        {/* Las dos cifras de decisión, rotuladas y separadas por filete */}
        <div className="mt-5 grid grid-cols-2 divide-x divide-navy-900/10 border-t border-navy-900/10 pt-4">
          <div className="pr-4">
            <p className="text-xs text-gray-500">Superficie</p>
            <p className="mt-1 text-sm font-semibold tabular-nums text-navy-900">
              {formatArea(property.tamano)}
            </p>
          </div>
          <div className="pl-4">
            <p className="text-xs text-gray-500">Precio</p>
            <p className="mt-1 text-sm font-semibold text-sky-700">
              {formatPrice(property.precio)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
