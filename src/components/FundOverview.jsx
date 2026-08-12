import { Link } from "react-router-dom";
import { ArrowRight, Bank, MapTrifold, Scales, SealCheck } from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";

const MILESTONES = [
  {
    period: "Noviembre 2023",
    title: "Constitución del fideicomiso",
    text: "El Decreto 581-23, emitido por el Presidente Luis Abinader, crea el FDI como fuente alterna de financiamiento para la infraestructura pública.",
  },
  {
    period: "Noviembre 2024",
    title: "Respaldo legislativo",
    text: "El Congreso Nacional aprueba la iniciativa, en cumplimiento de lo establecido en la Constitución de la República.",
  },
  {
    period: "En curso",
    title: "Comercialización del inventario",
    text: "Publicación y venta del portafolio de inmuebles, con los recursos destinados al desarrollo de infraestructuras del Estado.",
  },
];

const FACTS = [
  {
    icon: Scales,
    title: "Base legal",
    text: "Decreto 581-23 del Poder Ejecutivo, respaldado por la ley aprobada en el Congreso Nacional.",
  },
  {
    icon: Bank,
    title: "Administración",
    text: "Fideicomiso administrado en conjunto con Fiduciaria Reservas, bajo el marco fiduciario dominicano.",
  },
  {
    icon: MapTrifold,
    title: "Alcance",
    text: "Portafolio de terrenos, apartamentos y locales comerciales distribuido a nivel nacional.",
  },
  {
    icon: SealCheck,
    title: "Transparencia",
    text: "Proceso de comercialización público, con formularios, requisitos y verificación KYC accesibles.",
  },
];

// Arranca a ras del hero: el canto navy contra blanco es la separación.
export default function FundOverview() {
  return (
    <section aria-labelledby="fondo-titulo" className="bg-white border-b border-navy-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        {/* Encabezado editorial: apilado, medida controlada */}
        <ScrollReveal className="max-w-3xl">
          <div className="h-px w-12 bg-orange-400" />
          <h2
            id="fondo-titulo"
            className="mt-5 text-3xl sm:text-4xl font-bold text-navy-950 tracking-tight leading-tight"
          >
            Fondo de Desarrollo de Infraestructuras
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-navy-800 leading-relaxed">
            Un fideicomiso público creado para constituir una fuente alterna de
            financiamiento del desarrollo de infraestructuras de la República Dominicana.
          </p>
          <p className="mt-5 text-gray-600 leading-relaxed">
            El FDI recibe en administración un inventario de inmuebles del Estado y lo
            comercializa de forma pública y documentada. Los recursos obtenidos se
            destinan a financiar obras de infraestructura a nivel nacional.
          </p>
        </ScrollReveal>

        {/* Recorrido institucional: eje horizontal continuo en escritorio */}
        <ScrollReveal className="mt-16 sm:mt-20">
          <h3 className="text-sm font-semibold text-navy-900">Recorrido institucional</h3>
          <ol className="mt-6 grid gap-10 sm:grid-cols-3 sm:gap-0">
            {MILESTONES.map((m) => (
              <li
                key={m.title}
                className="relative border-t border-navy-900/15 pt-7 sm:pr-8 lg:pr-12"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-0.5 w-10 bg-orange-400"
                />
                <p className="text-sm font-semibold text-orange-700">{m.period}</p>
                <p className="mt-3 font-semibold text-navy-950">{m.title}</p>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{m.text}</p>
              </li>
            ))}
          </ol>
        </ScrollReveal>

        {/* Ficha institucional: lista de definición con filetes, no tarjetas */}
        <ScrollReveal as="dl" className="mt-16 sm:mt-20 grid sm:grid-cols-2 border-t border-navy-900/10">
          {FACTS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex gap-4 py-7 border-b border-navy-900/10 sm:odd:border-r sm:odd:border-navy-900/10 sm:odd:pr-10 sm:even:pl-10"
            >
              <Icon
                size={22}
                weight="duotone"
                aria-hidden="true"
                className="text-navy-600 shrink-0 mt-0.5"
              />
              <div>
                <dt className="font-semibold text-navy-950">{title}</dt>
                <dd className="mt-1.5 text-sm text-gray-600 leading-relaxed">{text}</dd>
              </div>
            </div>
          ))}
        </ScrollReveal>

        {/* Cierre de sección: aviso legal y acceso, escuadrados y separados por filete */}
        <ScrollReveal className="mt-16 grid border border-navy-100 bg-navy-50 lg:grid-cols-[1fr_22rem] lg:items-stretch">
          <div className="p-8 sm:p-10 sm:grid sm:grid-cols-[13rem_1fr] sm:gap-8 sm:items-baseline">
            <h3 className="font-semibold text-navy-950">Respeto a derechos de terceros</h3>
            <p className="mt-2.5 text-sm text-gray-600 leading-relaxed sm:mt-0">
              En todos los casos se respetan los derechos legítimos de terceros que hayan
              sido adquiridos previamente y que se encuentren debidamente amparados
              conforme a la legislación dominicana vigente.
            </p>
          </div>

          <div className="flex items-center border-t border-navy-100 p-8 sm:p-10 lg:border-t-0 lg:border-l">
            <Link
              to="/sobre-el-fondo"
              className="group inline-flex w-full items-center justify-center gap-2.5 bg-navy-800 shadow-[0_1px_3px_rgba(0,23,51,0.12)] hover:-translate-y-0.5 hover:bg-navy-900 hover:shadow-[0_10px_24px_-6px_rgba(0,23,51,0.4)] active:translate-y-0 active:bg-navy-950 active:shadow-[0_2px_6px_rgba(0,23,51,0.2)] text-white font-semibold text-sm px-6 py-3.5 whitespace-nowrap transition-[transform,box-shadow,background-color] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-50"
            >
              Conoce más sobre el fondo
              <ArrowRight
                size={16}
                weight="bold"
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
