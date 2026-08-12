import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import CoverageMap from "../components/CoverageMap";
import FundOverview from "../components/FundOverview";
import PropertyCard from "../components/PropertyCard";
import ScrollReveal from "../components/ScrollReveal";
import { PROPERTIES } from "../data/properties";

// Grid de destacados: entrada escalonada y discreta, tarjeta por tarjeta.
const GRID_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
};

const HERO_BUTTON =
  "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm sm:text-base font-semibold whitespace-nowrap shadow-[0_4px_14px_rgba(0,0,0,0.18)] transition-[transform,box-shadow,background-color] duration-200 outline-none hover:scale-105 hover:shadow-[0_14px_32px_-4px_rgba(0,0,0,0.4)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950";

const STEPS = [
  {
    n: "01",
    title: "Selecciona el inmueble",
    text: "Explora el catálogo o el mapa nacional y elige la propiedad de tu interés.",
  },
  {
    n: "02",
    title: "Verificación KYC",
    text: "Completa el checklist de documentos y el formulario según seas persona física o jurídica.",
  },
  {
    n: "03",
    title: "Formulario de oferta",
    text: "Presenta tu oferta de compra formal ante el FDI para su evaluación.",
  },
  {
    n: "04",
    title: "Evaluación y cierre",
    text: "El fideicomiso evalúa la oferta y se procede a la firma y formalización.",
  },
];

export default function Home() {
  const destacados = PROPERTIES.filter((p) => p.destacado).slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-950 overflow-hidden">
        <img
          src="/catalogo-inmuebles-aerea.png"
          alt=""
          width="1983"
          height="793"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,19,34,0.98)_0%,rgba(7,19,34,0.91)_38%,rgba(7,19,34,0.42)_68%,rgba(7,19,34,0.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,19,34,0.72)_0%,transparent_48%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-24">
          <p className="text-orange-400 font-semibold tracking-wide text-sm uppercase mb-4">
            Fideicomiso público · Decreto 581-23
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Invierte en el desarrollo de infraestructuras de República Dominicana
          </h1>
          <p className="mt-5 text-navy-200 text-lg max-w-2xl">
            El FDI comercializa terrenos, apartamentos y locales comerciales a nivel
            nacional para financiar proyectos de infraestructura del Estado dominicano.
          </p>

          {/* Trío de botones del brandbook: Buscar Inmuebles (navy) · ¿Cómo Comprar? (naranja) · Ver Mapa (celeste) */}
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Link to="/inmuebles" className={`${HERO_BUTTON} bg-navy-800 hover:bg-navy-900 active:bg-navy-950 text-white`}>
              Buscar Inmuebles
            </Link>
            <Link to="/como-comprar" className={`${HERO_BUTTON} bg-orange-400 hover:bg-orange-500 active:bg-orange-600 text-navy-950`}>
              ¿Cómo Comprar?
            </Link>
            <Link to="/mapa" className={`${HERO_BUTTON} bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-navy-950`}>
              Ver Mapa
            </Link>
          </div>
        </div>

      </section>

      <div className="pb-16 sm:pb-20">
        <FundOverview />
      </div>

      {/* Propiedades destacadas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ScrollReveal className="flex flex-wrap items-end justify-between gap-4 border-b border-navy-900/10 pb-6">
          <div>
            <div className="h-px w-12 bg-orange-400" />
            <h2 className="mt-5 text-3xl font-bold text-navy-950 tracking-tight">
              Inmuebles destacados
            </h2>
          </div>
          <Link
            to="/inmuebles"
            className="group inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-navy-800 outline-none transition-colors duration-200 hover:text-navy-950 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
          >
            Ver todo el catálogo
            <ArrowRight
              size={16}
              weight="bold"
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </ScrollReveal>
        <motion.div
          variants={GRID_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {destacados.map((p) => (
            <motion.div key={p.id} variants={CARD_VARIANTS} className="grid h-full">
              <PropertyCard property={p} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Proceso: secuencia vertical, encabezado y acceso en la columna izquierda */}
      <section className="bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 grid gap-12 lg:grid-cols-[minmax(0,21rem)_1fr] lg:gap-20">
          <ScrollReveal>
            <div className="h-px w-12 bg-orange-400" />
            <h2 className="mt-5 text-3xl font-bold text-white tracking-tight leading-tight">
              ¿Cómo comprar un inmueble?
            </h2>
            <p className="mt-5 text-navy-200 leading-relaxed">
              El proceso de comercialización es público y documentado. Cada etapa cuenta
              con formularios y requisitos disponibles para cualquier interesado.
            </p>
            <Link
              to="/como-comprar"
              className="group mt-8 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-orange-300 outline-none transition-colors duration-200 hover:text-orange-200 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
            >
              Ver proceso completo
              <ArrowRight
                size={16}
                weight="bold"
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </ScrollReveal>

          <ScrollReveal as="ol" delay={0.1}>
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-white/10 mt-6 pt-6 first:border-t-0 first:mt-0 first:pt-0"
              >
                <span className="text-lg font-bold tabular-nums text-orange-400 leading-snug">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white leading-snug">{s.title}</h3>
                  <p className="mt-2 text-sm text-navy-300 leading-relaxed max-w-xl">{s.text}</p>
                </div>
              </li>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Cobertura nacional */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <ScrollReveal>
          <CoverageMap />
        </ScrollReveal>
      </section>
    </div>
  );
}
