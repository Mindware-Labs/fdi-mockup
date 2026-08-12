import GrowthCurve from "./GrowthCurve";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

// Prueba social de una institución: no testimonios, sino las instancias que
// respaldan el fideicomiso y el hecho verificable que aporta cada una.
const PILARES = [
  {
    entidad: "Poder Ejecutivo",
    meta: "Decreto 581-23 · Noviembre 2023",
    text: "Constituye el FDI como fuente alterna de financiamiento de la infraestructura pública.",
  },
  {
    entidad: "Congreso Nacional",
    meta: "Aprobación · Noviembre 2024",
    text: "Respalda la iniciativa en cumplimiento de lo establecido en la Constitución de la República.",
  },
  {
    entidad: "Fiduciaria Reservas",
    meta: "Administración fiduciaria",
    text: "Administra el fideicomiso bajo el marco fiduciario dominicano vigente.",
  },
  {
    entidad: "Jurisdicción Inmobiliaria",
    meta: "Sala de Consultas",
    text: "Permite verificar públicamente el estado registral de cada parcela publicada.",
  },
];

export default function InstitutionalBacking() {
  return (
    <section
      aria-labelledby="respaldo-titulo"
      className="relative isolate overflow-hidden bg-navy-950"
    >
      {/* La curva del isotipo, espejada y a baja opacidad, como textura de la banda */}
      <GrowthCurve
        id="respaldo-curve"
        className="pointer-events-none absolute -left-40 bottom-0 h-[150%] w-[75%] -scale-x-100 opacity-[0.09]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <ScrollReveal>
            <SectionHeading
              id="respaldo-titulo"
              tone="dark"
              title="Quién sostiene este fondo"
              lead="El FDI no es un portal de bienes raíces: es un fideicomiso público con base legal, administración fiduciaria y verificación registral abierta."
            />

            <figure className="mt-12 border-l border-sky-400 pl-6 sm:pl-8">
              <blockquote className="text-xl leading-relaxed text-white/90 sm:text-2xl sm:leading-relaxed">
                Un programa de comercialización organizada, pública y transparente de
                inmuebles del Estado, cuyas ventas generan fondos destinados al desarrollo
                de proyectos de infraestructura de alto impacto socioeconómico.
              </blockquote>
              <figcaption className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-sky-300">
                Definición institucional del FDI
              </figcaption>
            </figure>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-300">
              Instancias que lo respaldan
            </h3>
            <ul className="mt-6 border-t border-white/12">
              {PILARES.map(({ entidad, meta, text }) => (
                <li key={entidad} className="border-b border-white/12 py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <p className="font-semibold text-white">{entidad}</p>
                    <p className="text-sm text-sky-300">{meta}</p>
                  </div>
                  <p className="mt-2.5 max-w-prose text-sm leading-relaxed text-navy-300">{text}</p>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
