import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowSquareOut,
  CaretDown,
  DownloadSimple,
  FileText,
  Phone,
} from "@phosphor-icons/react";
import Button from "../components/Button";
import ScrollReveal from "../components/ScrollReveal";
import { ANCLA, PageIndexBar, PageIndexRail, usePageIndex } from "../components/PageIndex";
import { TELEFONO } from "../data/contacto";
import { DOCUMENTS, GRUPOS, SALA_CONSULTAS_URL, STEPS } from "../data/proceso-compra";

const ENLACE_EXTERNO =
  "font-semibold text-navy-800 underline underline-offset-2 transition-colors hover:text-navy-950";

const SECCIONES = [
  { id: "proceso", label: "El proceso" },
  { id: "formularios", label: "Formularios" },
  { id: "faq", label: "Preguntas frecuentes" },
];
const IDS = SECCIONES.map((s) => s.id);

const FAQS = [
  {
    q: "¿Quién puede ofertar por un inmueble del FDI?",
    a: "Tanto personas físicas como jurídicas pueden participar en el proceso de comercialización, cumpliendo con los requisitos KYC establecidos por el fideicomiso.",
  },
  {
    q: "¿Dónde puedo consultar información registral de los inmuebles?",
    a: (
      <>
        En la{" "}
        <a href={SALA_CONSULTAS_URL} target="_blank" rel="noreferrer" className={ENLACE_EXTERNO}>
          Sala de Consultas de la Jurisdicción Inmobiliaria
        </a>
        , de acceso público y gratuito. Cada ficha del catálogo publica la parcela y el
        distrito catastral necesarios para la consulta.
      </>
    ),
  },
  {
    q: "¿Se respetan derechos adquiridos previamente por terceros?",
    a: "Sí. En todos los casos se respetan los derechos legítimos de terceros que hayan sido adquiridos conforme a la ley antes de la constitución del fideicomiso.",
  },
  {
    q: "¿Cuánto tiempo toma el proceso de evaluación de una oferta?",
    a: "Varía según la complejidad del inmueble y la documentación presentada. El FDI evalúa factibilidad y realiza debida diligencia antes de someter la oferta al Consejo Técnico del Fideicomiso, que toma la decisión definitiva, y da seguimiento directo a cada oferente.",
  },
];

const FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2";

function DocRow({ doc }) {
  return (
    <li
      id={`doc-${doc.id}`}
      className={`grid grid-cols-[3.5rem_1fr] gap-x-4 gap-y-3 border-t border-navy-900/10 py-5 sm:grid-cols-[3.5rem_1fr_auto] sm:items-center sm:gap-x-6 ${ANCLA}`}
    >
      <span className="justify-self-start rounded-md border border-navy-100 bg-navy-50 px-2 py-1 text-[0.7rem] font-bold tracking-wide text-navy-700">
        {doc.ext}
      </span>
      <div className="min-w-0">
        <h4 className="font-semibold leading-snug text-navy-950">{doc.name}</h4>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-gray-600">{doc.desc}</p>
      </div>
      <div className="col-start-2 sm:col-start-3">
        {doc.file ? (
          <a
            href={doc.file}
            download
            className={`inline-flex items-center gap-2 rounded-lg border border-navy-900/12 bg-white px-4 py-2.5 text-sm font-semibold text-navy-800 transition-[border-color,background-color] duration-200 ease-brand hover:border-navy-900/25 hover:bg-mist-50 ${FOCUS}`}
          >
            <DownloadSimple size={16} weight="bold" aria-hidden="true" />
            Descargar
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-mist-100 px-2.5 py-1.5 text-xs font-semibold text-gray-600">
            Por publicar
          </span>
        )}
      </div>
    </li>
  );
}

export default function ComoComprar() {
  const [openFaq, setOpenFaq] = useState(0);
  const activa = usePageIndex(IDS);

  const docPorId = Object.fromEntries(DOCUMENTS.map((doc) => [doc.id, doc]));

  return (
    <div className="bg-white">
      {/* Portada */}
      <section className="bg-navy-950">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
          <span aria-hidden="true" className="block h-px w-12 bg-sky-400" />
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-[-0.025em] text-balance text-white sm:text-5xl">
            ¿Cómo comprar un inmueble?
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-200">
            {STEPS.length} pasos y una regla igual para todos: la oferta se prepara con
            estos formularios y se entrega en formato físico en las oficinas de
            Fiduciaria Reservas, desde la selección del inmueble hasta la firma.
          </p>
        </div>
      </section>

      <PageIndexBar secciones={SECCIONES} activa={activa} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-16 lg:px-8 xl:gap-x-20">
        <PageIndexRail secciones={SECCIONES} activa={activa}>
          <p className="text-sm font-semibold text-navy-950">¿Dudas del proceso?</p>
          <a
            href={TELEFONO.href}
            className={`mt-2.5 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-navy-800 transition-colors hover:text-navy-950 ${FOCUS}`}
          >
            <Phone size={15} weight="fill" aria-hidden="true" className="text-navy-500" />
            {TELEFONO.texto}
          </a>
          <Link
            to="/contacto"
            className={`mt-2 block rounded-sm text-sm text-gray-600 underline-offset-4 transition-colors hover:text-navy-900 hover:underline ${FOCUS}`}
          >
            Escribir al fondo
          </Link>
        </PageIndexRail>

        <div className="min-w-0">
          {/* EL PROCESO */}
          <section id="proceso" className={`py-16 sm:py-20 lg:pt-20 ${ANCLA}`}>
            <ScrollReveal>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-navy-950 sm:text-3xl">
                El proceso, paso a paso
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-gray-600">
                Cada paso indica su formulario, con enlace directo a la ficha.
              </p>

              <ol className="mt-12">
                {STEPS.map((s, i) => (
                  <li
                    key={s.n}
                    className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-5 pb-10 last:pb-0 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-7"
                  >
                    {/* Hilo que une los pasos: la secuencia se ve, no se deduce */}
                    {i < STEPS.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-5 top-11 w-px bg-navy-900/12 sm:left-6 sm:top-13"
                      />
                    )}
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-navy-900/12 bg-white text-sm font-bold tabular-nums text-navy-800 sm:h-12 sm:w-12 sm:text-base">
                      {s.n}
                    </span>
                    <div className="pt-1.5 sm:pt-2.5">
                      <h3 className="text-lg font-semibold leading-snug text-navy-950">
                        {s.title}
                      </h3>
                      <p className="mt-2 max-w-2xl leading-relaxed text-gray-600">{s.text}</p>

                      {(s.docs.length > 0 || s.enlace) && (
                        <p className="mt-4 flex flex-wrap items-center gap-2">
                          {s.docs.map((id) => (
                            <a
                              key={id}
                              href={`#doc-${id}`}
                              className={`inline-flex items-center gap-1.5 rounded-md border border-navy-900/12 bg-white px-2.5 py-1.5 text-xs font-semibold text-navy-800 transition-[border-color,background-color] duration-200 ease-brand hover:border-navy-900/25 hover:bg-mist-50 ${FOCUS}`}
                            >
                              <FileText size={13} weight="bold" aria-hidden="true" />
                              {docPorId[id].corto}
                            </a>
                          ))}
                          {s.enlace && (
                            <a
                              href={s.enlace.href}
                              target="_blank"
                              rel="noreferrer"
                              className={`inline-flex items-center gap-1.5 rounded-md border border-navy-900/12 bg-white px-2.5 py-1.5 text-xs font-semibold text-navy-800 transition-[border-color,background-color] duration-200 ease-brand hover:border-navy-900/25 hover:bg-mist-50 ${FOCUS}`}
                            >
                              <ArrowSquareOut size={13} weight="bold" aria-hidden="true" />
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
            </ScrollReveal>
          </section>

          {/* FORMULARIOS */}
          <section
            id="formularios"
            className={`border-t border-navy-900/10 py-16 sm:py-20 ${ANCLA}`}
          >
            <ScrollReveal>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-navy-950 sm:text-3xl">
                Formularios y documentos
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-gray-600">
                Agrupados según quién debe presentarlos.
              </p>

              <div className="mt-10 space-y-12">
                {GRUPOS.map((grupo) => (
                  <div key={grupo.id}>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-navy-900">
                      {grupo.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-gray-600">{grupo.desc}</p>
                    <ul className="mt-5 border-b border-navy-900/10">
                      {DOCUMENTS.filter((doc) => doc.grupo === grupo.id).map((doc) => (
                        <DocRow key={doc.id} doc={doc} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </section>

          {/* PREGUNTAS FRECUENTES */}
          <section id="faq" className={`border-t border-navy-900/10 py-16 sm:py-20 ${ANCLA}`}>
            <ScrollReveal>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-navy-950 sm:text-3xl">
                Preguntas frecuentes
              </h2>

              <dl className="mt-10 border-b border-navy-900/10">
                {FAQS.map((f, i) => {
                  const abierta = openFaq === i;
                  return (
                    <div key={f.q} className="border-t border-navy-900/10">
                      <dt>
                        <button
                          type="button"
                          id={`faq-boton-${i}`}
                          aria-expanded={abierta}
                          aria-controls={`faq-panel-${i}`}
                          onClick={() => setOpenFaq(abierta ? -1 : i)}
                          className={`flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-200 hover:text-navy-600 ${FOCUS}`}
                        >
                          <span className="font-semibold text-navy-950">{f.q}</span>
                          <CaretDown
                            size={18}
                            weight="bold"
                            aria-hidden="true"
                            className={`shrink-0 text-navy-500 transition-transform duration-300 ease-brand ${
                              abierta ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </dt>
                      <dd
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-boton-${i}`}
                        hidden={!abierta}
                        className="max-w-2xl pb-6 leading-relaxed text-gray-600"
                      >
                        {f.a}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </ScrollReveal>
          </section>

          {/* CIERRE */}
          <section className="pb-20 sm:pb-24">
            <ScrollReveal
              as="div"
              className="grid bg-navy-950 lg:grid-cols-[1fr_auto] lg:items-stretch"
            >
              <div className="p-8 sm:p-10">
                <h2 className="text-lg font-semibold leading-snug text-white">
                  ¿Tienes dudas del proceso?
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-navy-300">
                  El equipo del FDI da seguimiento a cada consulta y a cada oferta presentada
                  sobre los inmuebles del fideicomiso.
                </p>
              </div>
              <div className="flex items-center border-t border-white/10 p-8 sm:p-10 lg:border-l lg:border-t-0">
                <Button as={Link} to="/contacto" variant="primary" onDark icon={ArrowRight}>
                  Contactar al FDI
                </Button>
              </div>
            </ScrollReveal>
          </section>
        </div>
      </div>
    </div>
  );
}
