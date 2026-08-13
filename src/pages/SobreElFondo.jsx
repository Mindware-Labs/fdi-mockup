import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "@phosphor-icons/react";
import Button from "../components/Button";
import ScrollReveal from "../components/ScrollReveal";
import { ANCLA, PageIndexBar, PageIndexRail, usePageIndex } from "../components/PageIndex";

const SECCIONES = [
  { id: "proposito", label: "Propósito" },
  { id: "marco", label: "Marco normativo" },
  { id: "gobernanza", label: "Gobernanza" },
  { id: "derechos", label: "Derechos de terceros" },
];
const IDS = SECCIONES.map((s) => s.id);

/** Cabecera documental del fideicomiso. */
const IDENTITY = [
  { label: "Naturaleza", value: "Fideicomiso público" },
  { label: "Instrumento", value: "Decreto 581-23" },
  { label: "Constitución", value: "Noviembre 2023" },
  { label: "Administración", value: "Fiduciaria Reservas" },
];

// Los dos actos con fecha; la Constitución va aparte porque no es un tercer paso
// de la secuencia, sino el marco que la contiene.
const ACTOS = [
  {
    fecha: "Noviembre 2023",
    origen: "Poder Ejecutivo",
    title: "Decreto 581-23",
    text: "Instrumento emitido por el Presidente Luis Abinader que constituye el fideicomiso y define su finalidad: servir como fuente alterna de financiamiento para el desarrollo de infraestructuras del país.",
  },
  {
    fecha: "Noviembre 2024",
    origen: "Congreso Nacional",
    title: "Aprobación legislativa",
    text: "El Congreso Nacional aprueba la iniciativa, dotando al fideicomiso de respaldo de ley para su operación y para la comercialización de su inventario.",
  },
];

const GOVERNANCE = [
  { term: "Administración fiduciaria", definition: "Fiduciaria Reservas" },
  { term: "Proceso de comercialización", definition: "Público y documentado" },
  { term: "Verificación de contraparte", definition: "KYC para personas físicas y jurídicas" },
  { term: "Consulta registral", definition: "Sala de Consultas de la Jurisdicción Inmobiliaria" },
];

const FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2";
const H2 = "text-2xl font-bold tracking-[-0.02em] text-navy-950 sm:text-3xl";

export default function SobreElFondo() {
  const activa = usePageIndex(IDS);

  return (
    <div className="bg-white">
      {/* Portada */}
      <section className="relative overflow-hidden bg-navy-950">
        <img
          src="/aerea-1983.webp"
          alt=""
          aria-hidden="true"
          width="1983"
          height="793"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.14]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,34,0.6)_0%,rgba(7,19,34,0.92)_100%)]" />

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
          <span aria-hidden="true" className="block h-px w-12 bg-sky-400" />
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.025em] text-balance text-white sm:text-5xl lg:text-[3.25rem]">
            Fondo de Desarrollo de Infraestructuras
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-navy-200 sm:text-xl">
            Un fideicomiso del Estado dominicano que comercializa un portafolio de inmuebles a
            nivel nacional para financiar el desarrollo de infraestructuras públicas.
          </p>

          <dl className="mt-16 grid gap-x-8 gap-y-7 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {IDENTITY.map((item) => (
              <div key={item.label}>
                <dt className="text-sm text-navy-300">{item.label}</dt>
                <dd className="mt-1.5 font-semibold text-white">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <PageIndexBar secciones={SECCIONES} activa={activa} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-16 lg:px-8 xl:gap-x-20">
        <PageIndexRail secciones={SECCIONES} activa={activa}>
          <p className="text-sm font-semibold text-navy-950">¿Buscas un inmueble?</p>
          <Link
            to="/inmuebles"
            className={`mt-2.5 block rounded-sm text-sm font-semibold text-navy-800 underline-offset-4 transition-colors hover:text-navy-950 hover:underline ${FOCUS}`}
          >
            Ver el catálogo
          </Link>
          <a
            href="tel:8099604580"
            className={`mt-2 inline-flex items-center gap-2 rounded-sm text-sm text-gray-600 transition-colors hover:text-navy-900 ${FOCUS}`}
          >
            <Phone size={14} weight="fill" aria-hidden="true" className="text-navy-500" />
            (809) 960-4580
          </a>
        </PageIndexRail>

        <div className="min-w-0">
          {/* PROPÓSITO */}
          <section id="proposito" className={`py-16 sm:py-20 lg:pt-20 ${ANCLA}`}>
            <ScrollReveal>
              <h2 className={H2}>Propósito</h2>
              <p className="mt-7 max-w-3xl text-2xl font-medium leading-snug tracking-[-0.015em] text-navy-950 sm:text-3xl">
                Constituir una fuente alterna de financiamiento para el desarrollo de
                infraestructuras públicas de la República Dominicana.
              </p>
              <p className="mt-7 max-w-2xl leading-relaxed text-gray-600">
                El fideicomiso recibe en administración un inventario de inmuebles del Estado y
                lo comercializa de forma pública. Los recursos obtenidos se destinan a financiar
                obras de infraestructura a nivel nacional, sin recurrir a las vías tradicionales
                de endeudamiento.
              </p>
            </ScrollReveal>
          </section>

          {/* MARCO NORMATIVO */}
          <section
            id="marco"
            className={`border-t border-navy-900/10 py-16 sm:py-20 ${ANCLA}`}
          >
            <ScrollReveal>
              <h2 className={H2}>Marco normativo</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-gray-600">
                Dos actos con fecha constituyen el fideicomiso y lo respaldan; la Constitución
                enmarca ambos.
              </p>

              <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-10">
                {ACTOS.map((acto) => (
                  <div key={acto.title} className="border-t border-sky-400 pt-5">
                    <p className="text-sm font-semibold text-sky-700">{acto.fecha}</p>
                    <p className="mt-0.5 text-sm text-gray-500">{acto.origen}</p>
                    <h3 className="mt-3 text-lg font-semibold leading-snug text-navy-950">
                      {acto.title}
                    </h3>
                    <p className="mt-2.5 leading-relaxed text-gray-600">{acto.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 border-l border-navy-900/15 bg-mist-50 px-6 py-5">
                <h3 className="font-semibold text-navy-950">Constitución de la República</h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-gray-600">
                  La actuación del fideicomiso se enmarca en lo establecido por la Constitución
                  de la República Dominicana. No es un tercer paso del proceso: es el marco
                  superior al que responden los dos anteriores.
                </p>
              </div>
            </ScrollReveal>
          </section>

          {/* GOBERNANZA */}
          <section
            id="gobernanza"
            className={`border-t border-navy-900/10 py-16 sm:py-20 ${ANCLA}`}
          >
            <ScrollReveal>
              <h2 className={H2}>Gobernanza</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-gray-600">
                El FDI es administrado en conjunto con Fiduciaria Reservas, bajo los principios
                de transparencia que rigen el sistema fiduciario dominicano. El proceso de
                comercialización es público y se apoya en formularios y requisitos disponibles
                para cualquier interesado.
              </p>

              <dl className="mt-10 border-t border-navy-900/10">
                {GOVERNANCE.map((item) => (
                  <div
                    key={item.term}
                    className="grid gap-1 border-b border-navy-900/10 py-5 sm:grid-cols-[16rem_1fr] sm:gap-8"
                  >
                    <dt className="text-sm text-gray-500">{item.term}</dt>
                    <dd className="font-medium text-navy-900">{item.definition}</dd>
                  </div>
                ))}
              </dl>

              <Link
                to="/como-comprar"
                className={`group mt-8 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-navy-800 transition-colors duration-200 hover:text-navy-950 ${FOCUS}`}
              >
                Ver requisitos y proceso de compra
                <ArrowRight
                  size={15}
                  weight="bold"
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-brand motion-safe:group-hover:translate-x-1"
                />
              </Link>
            </ScrollReveal>
          </section>

          {/* DERECHOS DE TERCEROS */}
          <section
            id="derechos"
            className={`border-t border-navy-900/10 py-16 sm:py-20 ${ANCLA}`}
          >
            <ScrollReveal>
              <h2 className={H2}>Derechos de terceros</h2>
              <p className="mt-7 max-w-3xl text-2xl font-medium leading-snug tracking-[-0.015em] text-navy-950 sm:text-3xl">
                En todos los casos se respetan los derechos legítimos de terceros que hayan sido
                adquiridos y que se encuentren debidamente amparados conforme a la legislación
                dominicana vigente.
              </p>
              <p className="mt-7 max-w-2xl leading-relaxed text-gray-600">
                Este principio aplica a los derechos constituidos con anterioridad a la
                constitución del fideicomiso y al levantamiento de su inventario de inmuebles.
              </p>
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
                  El inventario está publicado
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-navy-300">
                  Terrenos, apartamentos, locales y naves industriales, cada uno con su parcela
                  y distrito catastral a la vista.
                </p>
              </div>
              <div className="flex items-center border-t border-white/10 p-8 sm:p-10 lg:border-l lg:border-t-0">
                <Button as={Link} to="/inmuebles" variant="primary" onDark icon={ArrowRight}>
                  Ver el catálogo
                </Button>
              </div>
            </ScrollReveal>
          </section>
        </div>
      </div>
    </div>
  );
}
