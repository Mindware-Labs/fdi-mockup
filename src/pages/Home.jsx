import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import Benefits from "../components/Benefits";
import CoverageMap from "../components/CoverageMap";
import FundOverview from "../components/FundOverview";
import Hero from "../components/Hero";
import InstitutionalBacking from "../components/InstitutionalBacking";
import PropertyCard from "../components/PropertyCard";
import ScrollReveal from "../components/ScrollReveal";
import SectionHeading from "../components/SectionHeading";
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

export default function Home() {
  const destacados = PROPERTIES.filter((p) => p.destacado).slice(0, 6);

  return (
    // El recorrido alterna fondos —navy, blanco, gris institucional— para que cada
    // sección se lea como un bloque cerrado sin necesidad de marcos ni sombras.
    <div>
      <Hero />

      <Benefits />

      {/* Propiedades destacadas */}
      <section
        aria-labelledby="destacados-titulo"
        className="border-y border-navy-900/10 bg-mist-100"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <ScrollReveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="destacados-titulo" title="Inmuebles destacados" />
            <Link
              to="/inmuebles"
              className="group inline-flex items-center gap-2 rounded-sm pb-1 text-sm font-semibold text-navy-800 outline-none transition-colors duration-200 hover:text-navy-950 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
            >
              Ver todo el catálogo
              <ArrowRight
                size={16}
                weight="bold"
                aria-hidden="true"
                className="transition-transform duration-200 ease-brand motion-safe:group-hover:translate-x-1"
              />
            </Link>
          </ScrollReveal>

          <motion.div
            variants={GRID_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {destacados.map((p) => (
              <motion.div key={p.id} variants={CARD_VARIANTS} className="grid h-full">
                <PropertyCard property={p} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <InstitutionalBacking />

      <FundOverview />

      {/* Cobertura nacional */}
      <section aria-labelledby="cobertura-titulo" className="bg-mist-100">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <ScrollReveal>
            <CoverageMap />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
