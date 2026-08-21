import { ArrowLeft } from "@phosphor-icons/react";

const FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2";

/** Botón "Volver" para paneles que sustituyen contenido en el mismo lugar —p. ej.
    la tarjeta de precio de la ficha de un inmueble, al abrir "Hacer una oferta" o
    "Solicitar información"—, así el cierre es obvio sin salir de la página. */
export default function BackButton({ onClick, children = "Volver" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group -ml-2.5 inline-flex items-center gap-1.5 rounded-md border border-transparent py-1 pl-2.5 pr-3 text-sm font-semibold text-navy-600 transition-[color,background-color,border-color] duration-200 ease-brand hover:border-navy-900/12 hover:bg-mist-50 hover:text-navy-950 ${FOCUS}`}
    >
      <ArrowLeft
        size={15}
        weight="bold"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-300 ease-brand motion-safe:group-hover:-translate-x-1"
      />
      {children}
    </button>
  );
}
