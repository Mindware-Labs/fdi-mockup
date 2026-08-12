import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CaretDown, DownloadSimple } from "@phosphor-icons/react";
import ScrollReveal from "../components/ScrollReveal";

const STEPS = [
  {
    n: "01",
    title: "Selección del inmueble",
    text: "Explora el catálogo o el mapa nacional de propiedades del FDI y elige el inmueble de tu interés.",
  },
  {
    n: "02",
    title: "Verificación KYC",
    text: "Completa el checklist de documentos KYC y el formulario de tercero, según participes como persona física o jurídica.",
  },
  {
    n: "03",
    title: "Formulario de oferta de compra",
    text: "Presenta el formulario oficial de oferta de compra del inmueble seleccionado ante el FDI.",
  },
  {
    n: "04",
    title: "Evaluación del fideicomiso",
    text: "El FDI evalúa la oferta recibida, verificando la documentación y las condiciones de la propuesta.",
  },
  {
    n: "05",
    title: "Firma y formalización",
    text: "Una vez aprobada la oferta, se procede a la firma de los documentos y la formalización de la venta.",
  },
];

// `file`: ruta pública del documento. Mientras sea null la fila se muestra sin
// acción de descarga, para no ofrecer un enlace que no resuelve.
const DOCUMENTS = [
  {
    name: "Checklist documentos KYC ofertas FDI",
    ext: "XLSX",
    file: null,
    desc: "Lista de verificación de los documentos requeridos para el proceso de conocimiento del cliente (KYC).",
  },
  {
    name: "FR-002 Tercero Persona Física",
    ext: "XLS",
    file: null,
    desc: "Formulario de registro para oferentes que participan como personas físicas.",
  },
  {
    name: "FR-003 Tercero Persona Jurídica",
    ext: "XLS",
    file: null,
    desc: "Formulario de registro para oferentes que participan como personas jurídicas.",
  },
  {
    name: "Formulario Oferta Compra Inmueble FDI",
    ext: "PDF",
    file: null,
    desc: "Formulario oficial para formalizar una oferta de compra sobre un inmueble del fideicomiso.",
  },
  {
    name: "Formulario Registro Intermediario Inmobiliario FDI",
    ext: "PDF",
    file: null,
    desc: "Formulario de registro para intermediarios inmobiliarios que deseen participar en el proceso.",
  },
];

const FAQS = [
  {
    q: "¿Quién puede ofertar por un inmueble del FDI?",
    a: "Tanto personas físicas como jurídicas pueden participar en el proceso de comercialización, cumpliendo con los requisitos KYC establecidos por el fideicomiso.",
  },
  {
    q: "¿Dónde puedo consultar información registral de los inmuebles?",
    a: "Los interesados pueden obtener información detallada en la Sala de Consultas de la Jurisdicción Inmobiliaria, de acceso público y gratuito.",
  },
  {
    q: "¿Se respetan derechos adquiridos previamente por terceros?",
    a: "Sí. En todos los casos se respetan los derechos legítimos de terceros que hayan sido adquiridos conforme a la ley antes de la constitución del fideicomiso.",
  },
  {
    q: "¿Cuánto tiempo toma el proceso de evaluación de una oferta?",
    a: "El tiempo varía según la complejidad del inmueble y la documentación presentada. El equipo del FDI se pondrá en contacto para dar seguimiento a cada oferta.",
  },
  {
    q: "¿Puedo usar un intermediario inmobiliario?",
    a: "Sí, siempre que esté debidamente registrado mediante el Formulario de Registro de Intermediario Inmobiliario del FDI.",
  },
];

const JUMPS = [
  { href: "#proceso", label: "El proceso" },
  { href: "#formularios", label: "Formularios" },
  { href: "#faq", label: "Preguntas frecuentes" },
];

const FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2";

export default function ComoComprar() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div>
      {/* Portada */}
      <section className="bg-navy-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-14 sm:pt-24 sm:pb-16">
          <div className="h-px w-12 bg-sky-400" />
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] max-w-3xl">
            ¿Cómo comprar un inmueble?
          </h1>
          <p className="mt-6 text-lg text-navy-200 leading-relaxed max-w-2xl">
            El proceso de comercialización del FDI es público y documentado, desde la
            selección del inmueble hasta la formalización de la venta.
          </p>

          <nav
            aria-label="Secciones de esta página"
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6"
          >
            {JUMPS.map((j) => (
              <a
                key={j.href}
                href={j.href}
                className={`rounded-sm text-sm font-semibold text-navy-200 transition-colors duration-200 hover:text-white focus-visible:ring-offset-navy-950 ${FOCUS}`}
              >
                {j.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="bg-white border-b border-navy-900/10">
        {/* El proceso: registro numerado */}
        <section
          id="proceso"
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 scroll-mt-24"
        >
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-navy-950 tracking-tight">
              El proceso, paso a paso
            </h2>

            <ol className="mt-10 border-b border-navy-900/10">
              {STEPS.map((s) => (
                <li
                  key={s.n}
                  className="grid grid-cols-[3rem_1fr] sm:grid-cols-[6rem_1fr] border-t border-navy-900/10 py-7"
                >
                  <span className="text-lg font-bold tabular-nums text-sky-700 leading-snug">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-navy-950 leading-snug">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-gray-600 leading-relaxed max-w-2xl">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </section>

        {/* Antes de ofertar */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 border-t border-navy-900/10">
          <ScrollReveal as="div" className="grid gap-8 lg:grid-cols-[13rem_1fr] lg:gap-16">
            <h2 className="text-sm font-semibold text-navy-900">Antes de ofertar</h2>
            <div>
              <p className="text-xl text-navy-900 leading-relaxed max-w-2xl">
                Puedes verificar la situación registral de cualquier inmueble antes de
                presentar una oferta.
              </p>
              <p className="mt-6 text-gray-600 leading-relaxed max-w-2xl">
                La información registral detallada está disponible en la Sala de
                Consultas de la Jurisdicción Inmobiliaria, de acceso público y gratuito.
                En todos los casos se respetan los derechos legítimos de terceros
                adquiridos conforme a la ley con anterioridad a la constitución del
                fideicomiso.
              </p>
              <Link
                to="/sobre-el-fondo"
                className={`group mt-8 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-navy-800 transition-colors duration-200 hover:text-navy-950 focus-visible:ring-offset-white ${FOCUS}`}
              >
                Ver el marco legal del fideicomiso
                <ArrowRight
                  size={16}
                  weight="bold"
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* Formularios */}
        <section
          id="formularios"
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 border-t border-navy-900/10 scroll-mt-24"
        >
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-navy-950 tracking-tight">
              Formularios y documentos
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed max-w-2xl">
              Documentos oficiales requeridos en el proceso de comercialización de
              inmuebles del fideicomiso.
            </p>

            <ul className="mt-10 border-b border-navy-900/10">
              {DOCUMENTS.map((doc) => (
                <li
                  key={doc.name}
                  className="grid grid-cols-1 gap-x-6 gap-y-3 border-t border-navy-900/10 py-6 sm:grid-cols-[4.5rem_1fr_auto] sm:items-start"
                >
                  <span className="justify-self-start border border-navy-100 bg-navy-50 px-2.5 py-1 text-xs font-semibold tracking-wide text-navy-700">
                    {doc.ext}
                  </span>
                  <div>
                    <h3 className="font-semibold text-navy-950">{doc.name}</h3>
                    <p className="mt-1.5 text-sm text-gray-600 leading-relaxed max-w-xl">
                      {doc.desc}
                    </p>
                  </div>
                  {doc.file && (
                    <a
                      href={doc.file}
                      download
                      className={`inline-flex items-center gap-2 self-center justify-self-start rounded-sm text-sm font-semibold text-navy-800 transition-colors duration-200 hover:text-navy-950 focus-visible:ring-offset-white ${FOCUS}`}
                    >
                      <DownloadSimple size={16} weight="bold" aria-hidden="true" />
                      Descargar
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </section>

        {/* Preguntas frecuentes */}
        <section
          id="faq"
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 border-t border-navy-900/10 scroll-mt-24"
        >
          <ScrollReveal>
          <h2 className="text-2xl font-bold text-navy-950 tracking-tight">
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
                      className={`flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-200 hover:text-navy-600 focus-visible:ring-offset-white ${FOCUS}`}
                    >
                      <span className="font-semibold text-navy-950">{f.q}</span>
                      <CaretDown
                        size={18}
                        weight="bold"
                        aria-hidden="true"
                        className={`shrink-0 text-navy-500 transition-transform duration-200 ${
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
                    className="pb-6 text-gray-600 leading-relaxed max-w-2xl"
                  >
                    {f.a}
                  </dd>
                </div>
              );
            })}
          </dl>
          </ScrollReveal>
        </section>

        {/* Cierre: banda navy, eco del ritmo navy/blanco que marca las transiciones de la página */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
          <ScrollReveal as="div" className="grid bg-navy-950 lg:grid-cols-[1fr_auto] lg:items-stretch">
            <div className="p-8 sm:p-10 lg:py-10">
              <h2 className="text-lg font-semibold text-white leading-snug">¿Tienes dudas del proceso?</h2>
              <p className="mt-3 text-sm text-navy-300 leading-relaxed max-w-xl">
                El equipo del FDI da seguimiento a cada consulta y a cada oferta
                presentada sobre los inmuebles del fideicomiso.
              </p>
            </div>
            <div className="flex items-center border-t border-white/10 p-8 sm:p-10 lg:border-t-0 lg:border-l lg:border-white/10">
              <Link
                to="/contacto"
                className="group inline-flex items-center justify-center gap-2.5 bg-sky-400 px-6 py-3.5 text-sm font-semibold text-navy-950 shadow-[0_1px_3px_rgba(0,0,0,0.2)] whitespace-nowrap transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-sky-500 hover:shadow-[0_10px_24px_-6px_rgba(103,174,228,0.5)] active:translate-y-0 active:bg-sky-600 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
              >
                Contactar al FDI
                <ArrowRight
                  size={16}
                  weight="bold"
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
