import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";

/** Cabecera documental del fideicomiso. */
const IDENTITY = [
  { label: "Naturaleza", value: "Fideicomiso público" },
  { label: "Instrumento", value: "Decreto 581-23" },
  { label: "Constitución", value: "Noviembre 2023" },
  { label: "Administración", value: "Fiduciaria Reservas" },
];

const INSTRUMENTS = [
  {
    origin: "Noviembre 2023 · Poder Ejecutivo",
    title: "Decreto 581-23",
    text: "Instrumento emitido por el Presidente Luis Abinader que constituye el fideicomiso y define su finalidad: servir como fuente alterna de financiamiento para el desarrollo de infraestructuras del país.",
  },
  {
    origin: "Noviembre 2024 · Congreso Nacional",
    title: "Aprobación legislativa",
    text: "El Congreso Nacional aprueba la iniciativa, dotando al fideicomiso de respaldo de ley para su operación y para la comercialización de su inventario.",
  },
  {
    origin: "Marco superior",
    title: "Constitución de la República",
    text: "La actuación del fideicomiso se enmarca en lo establecido por la Constitución de la República Dominicana.",
  },
];

const GOVERNANCE = [
  { term: "Administración fiduciaria", definition: "Fiduciaria Reservas" },
  { term: "Proceso de comercialización", definition: "Público y documentado" },
  { term: "Verificación de contraparte", definition: "KYC para personas físicas y jurídicas" },
  { term: "Consulta registral", definition: "Sala de Consultas de la Jurisdicción Inmobiliaria" },
];

/** Columna de etiqueta a la izquierda, contenido a la derecha. */
function Spine({ label, children }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[13rem_1fr] lg:gap-16">
      <h2 className="text-sm font-semibold text-navy-900">{label}</h2>
      <div>{children}</div>
    </div>
  );
}

export default function SobreElFondo() {
  return (
    <div>
      {/* Portada */}
      <section className="relative bg-navy-950 overflow-hidden">
        <img
          src="/catalogo-inmuebles-aerea.png"
          alt=""
          aria-hidden="true"
          width="1983"
          height="793"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.14]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,34,0.6)_0%,rgba(7,19,34,0.92)_100%)]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-20">
          <div className="h-px w-12 bg-orange-400" />
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.08] max-w-3xl">
            Fondo de Desarrollo de Infraestructuras
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-navy-200 leading-relaxed max-w-2xl">
            Un fideicomiso del Estado dominicano que comercializa un portafolio de
            inmuebles a nivel nacional para financiar el desarrollo de infraestructuras
            públicas.
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

      <div className="bg-white border-b border-navy-900/10">
        {/* Propósito: remate de apertura, etiqueta apilada sobre la declaración */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <h2 className="text-sm font-semibold text-navy-900">Propósito</h2>
          <p className="mt-8 text-2xl sm:text-3xl font-medium text-navy-950 tracking-tight leading-snug max-w-4xl">
            Constituir una fuente alterna de financiamiento para el desarrollo de
            infraestructuras públicas de la República Dominicana.
          </p>
          <p className="mt-8 text-gray-600 leading-relaxed max-w-2xl">
            El fideicomiso recibe en administración un inventario de inmuebles del Estado
            y lo comercializa de forma pública. Los recursos obtenidos se destinan a
            financiar obras de infraestructura a nivel nacional, sin recurrir a las vías
            tradicionales de endeudamiento.
          </p>
        </section>

        {/* Marco normativo */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-t border-navy-900/10">
          <Spine label="Marco normativo">
            <ul>
              {INSTRUMENTS.map((item, i) => (
                <li
                  key={item.title}
                  className={i === 0 ? "" : "border-t border-navy-900/10 mt-9 pt-9"}
                >
                  <p className="text-sm font-semibold text-orange-700">{item.origin}</p>
                  <h3 className="mt-2.5 text-lg font-semibold text-navy-950">{item.title}</h3>
                  <p className="mt-2.5 text-gray-600 leading-relaxed max-w-2xl">{item.text}</p>
                </li>
              ))}
            </ul>
          </Spine>
        </section>

        {/* Gobernanza */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-t border-navy-900/10">
          <Spine label="Gobernanza">
            <p className="text-gray-600 leading-relaxed max-w-2xl">
              El FDI es administrado en conjunto con Fiduciaria Reservas, bajo los
              principios de transparencia que rigen el sistema fiduciario dominicano. El
              proceso de comercialización es público y se apoya en formularios y
              requisitos disponibles para cualquier interesado.
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
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-navy-950 rounded-sm outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Ver requisitos y proceso de compra
              <ArrowRight
                size={16}
                weight="bold"
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </Spine>
        </section>

        {/* Cierre: remate simétrico a la apertura */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-t border-navy-900/10">
          <h2 className="text-sm font-semibold text-navy-900">Derechos de terceros</h2>
          <p className="mt-8 text-2xl sm:text-3xl font-medium text-navy-950 tracking-tight leading-snug max-w-4xl">
            En todos los casos se respetan los derechos legítimos de terceros que hayan
            sido adquiridos y que se encuentren debidamente amparados conforme a la
            legislación dominicana vigente.
          </p>
          <p className="mt-8 text-gray-600 leading-relaxed max-w-2xl">
            Este principio aplica a los derechos constituidos con anterioridad a la
            constitución del fideicomiso y al levantamiento de su inventario de inmuebles.
          </p>
        </section>
      </div>
    </div>
  );
}
