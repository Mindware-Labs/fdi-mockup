import { MapTrifold } from "@phosphor-icons/react";

/** Se muestra en vez del mapa cuando falta VITE_MAPBOX_TOKEN (ver .env.example). */
export default function MapTokenNotice({ className = "", style }) {
  return (
    <div
      style={style}
      className={`flex flex-col items-center justify-center gap-2 bg-navy-50 px-6 py-10 text-center ${className}`}
    >
      <MapTrifold aria-hidden="true" className="h-8 w-8 text-navy-300" />
      <p className="max-w-xs text-sm font-semibold text-navy-800">
        Falta configurar el token de Mapbox
      </p>
      <p className="max-w-xs text-xs leading-relaxed text-navy-500">
        Copia <code>.env.example</code> a <code>.env.local</code> y agrega tu
        <code> VITE_MAPBOX_TOKEN</code>.
      </p>
    </div>
  );
}
