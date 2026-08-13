import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { ArrowSquareOut, Buildings } from "@phosphor-icons/react";
import MapTokenNotice from "./MapTokenNotice";
import { MAPBOX_TOKEN, MAP_STYLE } from "./mapConfig";
import { COMO_LLEGAR_URL, OFICINA, OFICINA_LINEAS } from "../data/contacto";

export default function OfficeMap({ height = "260px" }) {
  return (
    <figure className="overflow-hidden border border-navy-900/10">
      <div style={{ height }} className="relative bg-navy-50">
        {!MAPBOX_TOKEN ? (
          <MapTokenNotice className="absolute inset-0" />
        ) : (
          <Map
            mapboxAccessToken={MAPBOX_TOKEN}
            mapStyle={MAP_STYLE}
            initialViewState={{ longitude: OFICINA.lng, latitude: OFICINA.lat, zoom: 15.4 }}
            // Gestos cooperativos: dentro de una página que se desplaza, el mapa
            // no debe secuestrar la rueda ni el arrastre de un dedo.
            cooperativeGestures
            style={{ height: "100%", width: "100%" }}
          >
            <NavigationControl position="top-right" showCompass={false} />
            <Marker longitude={OFICINA.lng} latitude={OFICINA.lat} anchor="bottom">
              <span aria-hidden="true" className="flex flex-col items-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-navy-800 shadow-[0_6px_16px_rgba(7,26,58,0.4)]">
                  <Buildings size={17} weight="fill" className="text-white" />
                </span>
                <span className="-mt-px h-2.5 w-0.5 rounded-full bg-white shadow-[0_2px_4px_rgba(7,26,58,0.3)]" />
              </span>
              <span className="sr-only">{OFICINA_LINEAS.join(", ")}</span>
            </Marker>
          </Map>
        )}
      </div>

      <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-navy-900/10 bg-mist-50 px-4 py-3">
        <span className="text-xs leading-relaxed text-gray-600">
          Ubicación aproximada de la oficina.
        </span>
        <a
          href={COMO_LLEGAR_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-navy-800 transition-colors hover:text-navy-950 outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
        >
          Cómo llegar
          <ArrowSquareOut size={14} weight="bold" aria-hidden="true" />
          <span className="sr-only">(abre en una ventana nueva)</span>
        </a>
      </figcaption>
    </figure>
  );
}
