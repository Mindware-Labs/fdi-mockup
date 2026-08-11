import { useState } from "react";

const STEPS = [
  {
    n: 1,
    title: "Selección del inmueble",
    text: "Explora el catálogo o el mapa nacional de propiedades del FDI y elige el inmueble de tu interés.",
  },
  {
    n: 2,
    title: "Verificación KYC",
    text: "Completa el checklist de documentos KYC y el formulario de tercero (persona física o jurídica) correspondiente.",
  },
  {
    n: 3,
    title: "Formulario de oferta de compra",
    text: "Presenta el formulario oficial de oferta de compra del inmueble seleccionado ante el FDI.",
  },
  {
    n: 4,
    title: "Evaluación del fideicomiso",
    text: "El FDI evalúa la oferta recibida, verificando la documentación y las condiciones de la propuesta.",
  },
  {
    n: 5,
    title: "Firma y formalización",
    text: "Una vez aprobada la oferta, se procede a la firma de los documentos y la formalización de la venta.",
  },
];

const DOCUMENTS = [
  {
    name: "Checklist documentos KYC ofertas FDI",
    ext: "XLSX",
    desc: "Lista de verificación de los documentos requeridos para el proceso de conocimiento del cliente (KYC).",
  },
  {
    name: "FR-002 Tercero Persona Física",
    ext: "XLS",
    desc: "Formulario de registro para oferentes que participan como personas físicas.",
  },
  {
    name: "FR-003 Tercero Persona Jurídica",
    ext: "XLS",
    desc: "Formulario de registro para oferentes que participan como personas jurídicas (empresas).",
  },
  {
    name: "Formulario Oferta Compra Inmueble FDI",
    ext: "PDF",
    desc: "Formulario oficial para formalizar una oferta de compra sobre un inmueble del fideicomiso.",
  },
  {
    name: "Formulario Registro Intermediario Inmobiliario FDI",
    ext: "PDF",
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

export default function ComoComprar() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div>
      <section className="bg-navy-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-gold-400 font-semibold text-sm uppercase tracking-wide mb-3">Proceso de comercialización</p>
          <h1 className="text-4xl font-bold text-white mb-4">¿Cómo Comprar un Inmueble?</h1>
          <p className="text-navy-200 max-w-2xl mx-auto">
            Conoce el proceso de comercialización de inmuebles del Fondo de
            Desarrollo de Infraestructuras, desde la selección hasta el cierre.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative">
          <div className="hidden sm:block absolute left-6 top-6 bottom-6 w-px bg-navy-200" />
          <ol className="space-y-8">
            {STEPS.map((s) => (
              <li key={s.n} className="relative flex gap-5">
                <span className="shrink-0 w-12 h-12 rounded-full bg-navy-800 text-white font-bold flex items-center justify-center relative z-10">
                  {s.n}
                </span>
                <div className="bg-white border border-gray-200 rounded-xl p-5 flex-1">
                  <h3 className="font-semibold text-navy-950 mb-1.5">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-navy-950 mb-4">Marco legal</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            El Fondo de Desarrollo de Infraestructuras (FDI) fue constituido mediante
            el <strong>Decreto 581-23</strong>, emitido por el Presidente Luis
            Abinader en noviembre de 2023. Esta iniciativa fue posteriormente
            respaldada por el <strong>Congreso Nacional en noviembre de 2024</strong>,
            en cumplimiento de la Constitución de la República Dominicana.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Los interesados pueden obtener información registral detallada de los
            inmuebles en la <strong>Sala de Consultas de la Jurisdicción Inmobiliaria</strong>,
            de acceso público y gratuito.
          </p>
        </div>
      </section>

      <section id="formularios" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-navy-950 mb-2">Formularios y descargas</h2>
        <p className="text-gray-500 mb-8">
          Descarga los formularios oficiales necesarios para participar en el proceso de comercialización.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DOCUMENTS.map((doc) => (
            <div key={doc.name} className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4">
              <span className="shrink-0 w-11 h-11 rounded-lg bg-navy-50 text-navy-600 flex items-center justify-center font-bold text-xs">
                {doc.ext}
              </span>
              <div>
                <h4 className="font-semibold text-navy-900 text-sm mb-1">{doc.name}</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{doc.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" />
                  </svg>
                  Descargar
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="bg-navy-50 border-t border-navy-100 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-navy-950 mb-8">Preguntas frecuentes</h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={f.q} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-medium text-navy-900 text-sm">{f.q}</span>
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-5 h-5 text-navy-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
