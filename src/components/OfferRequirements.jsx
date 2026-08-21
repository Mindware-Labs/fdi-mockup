import { Link } from "react-router-dom";
import { ArrowRight, ArrowSquareOut, FileText } from "@phosphor-icons/react";
import BackButton from "./BackButton";
import { DOCUMENTS, REQUISITOS_OFERTA } from "../data/proceso-compra";

const FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2";

const docPorId = Object.fromEntries(DOCUMENTS.map((doc) => [doc.id, doc]));

/** Mismo proceso que "¿Cómo comprar?" (misma fuente de datos), en versión compacta:
    sustituye a la tarjeta de precio de la ficha del inmueble mientras está abierta,
    para que ofertar no obligue a salir de la página. `onVolver` la cierra. */
export default function OfferRequirements({ onVolver }) {
  return (
    <div>
      <BackButton onClick={onVolver} />

      <h2 className="mt-4 text-lg font-semibold text-navy-950">Requisitos para ofertar</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
        Los mismos pasos y formularios que rigen para cualquier inmueble del fondo.
      </p>

      <ol className="mt-6 space-y-5">
        {REQUISITOS_OFERTA.map((s) => (
          <li key={s.n} className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-navy-900/12 bg-mist-50 text-xs font-bold tabular-nums text-navy-800">
              {s.n}
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold leading-snug text-navy-950">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{s.text}</p>

              {(s.docs.length > 0 || s.enlace) && (
                <p className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  {s.docs.map((id) => (
                    <Link
                      key={id}
                      to={`/como-comprar#doc-${id}`}
                      className={`inline-flex items-center gap-1.5 rounded-md border border-navy-900/12 bg-white px-2 py-1 text-xs font-semibold text-navy-800 transition-[border-color,background-color] duration-200 ease-brand hover:border-navy-900/25 hover:bg-mist-50 ${FOCUS}`}
                    >
                      <FileText size={12} weight="bold" aria-hidden="true" />
                      {docPorId[id].corto}
                    </Link>
                  ))}
                  {s.enlace && (
                    <a
                      href={s.enlace.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1.5 rounded-md border border-navy-900/12 bg-white px-2 py-1 text-xs font-semibold text-navy-800 transition-[border-color,background-color] duration-200 ease-brand hover:border-navy-900/25 hover:bg-mist-50 ${FOCUS}`}
                    >
                      <ArrowSquareOut size={12} weight="bold" aria-hidden="true" />
                      {s.enlace.label}
                      <span className="sr-only">(abre en una ventana nueva)</span>
                    </a>
                  )}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>

      <Link
        to="/como-comprar"
        className={`mt-6 inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-navy-800 transition-colors duration-200 hover:text-navy-950 ${FOCUS}`}
      >
        Ver la guía completa
        <ArrowRight size={15} weight="bold" aria-hidden="true" />
      </Link>
    </div>
  );
}
