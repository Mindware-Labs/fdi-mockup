import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Buildings, Certificate, ClipboardText, Headset } from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import { PROPERTIES } from "../data/properties";
import { PROVINCES } from "../data/provinces";

const provinciasConInventario = new Set(PROPERTIES.map((p) => p.provincia)).size;

// Cada tarjeta es una puerta de entrada real, no un enunciado suelto: la promesa
// y el sitio del portal donde se comprueba viajan juntas.
const BENEFICIOS = [
  {
    icon: Certificate,
    title: "Titularidad verificable",
    text: "Cada inmueble se publica con su parcela y distrito catastral, consultables en la Jurisdicción Inmobiliaria.",
    action: "Consultar el catálogo",
    to: "/inmuebles",
  },
  {
    icon: ClipboardText,
    title: "Proceso público",
    text: "Formularios oficiales, verificación KYC y las mismas condiciones para toda persona física o jurídica.",
    action: "Ver requisitos y formularios",
    to: "/como-comprar",
  },
  {
    icon: Buildings,
    title: "Cartera diversificada",
    text: `Terrenos, apartamentos, locales y naves industriales en ${provinciasConInventario} de las ${PROVINCES.length} provincias del país.`,
    action: "Ver el mapa nacional",
    to: "/mapa",
  },
  {
    icon: Headset,
    title: "Atención directa",
    text: "Un solo canal institucional para consultas y ofertas: teléfono, WhatsApp y correo del fondo.",
    action: "Escribir al fondo",
    to: "/contacto",
  },
];

const GRID_VARIANTS = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export default function Benefits() {
  return (
    <section aria-labelledby="beneficios-titulo" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            id="beneficios-titulo"
            title="Un inventario del Estado, con reglas claras"
            lead="El fondo publica su cartera con la identificación registral a la vista y un único procedimiento de compra, igual para todos los oferentes."
          />
        </ScrollReveal>

        <motion.ul
          variants={GRID_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {BENEFICIOS.map(({ icon: Icon, title, text, action, to }) => (
            <motion.li key={title} variants={CARD_VARIANTS} className="flex">
              <Link
                to={to}
                className="group relative flex flex-1 flex-col border border-navy-900/10 bg-white p-7 outline-none transition-[transform,box-shadow,border-color] duration-300 ease-brand hover:border-navy-900/25 hover:shadow-[0_18px_40px_-24px_rgba(7,26,58,0.5)] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 motion-safe:hover:-translate-y-1"
              >
                {/* Filete celeste que se despliega desde la izquierda al pasar el cursor */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-sky-400 transition-transform duration-500 ease-brand group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <Icon
                  size={26}
                  weight="duotone"
                  aria-hidden="true"
                  className="text-navy-600 transition-colors duration-300 group-hover:text-sky-600"
                />
                <h3 className="mt-6 font-semibold text-navy-950">{title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-gray-600">{text}</p>

                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-navy-800 transition-colors duration-200 group-hover:text-navy-950">
                  {action}
                  <ArrowRight
                    size={14}
                    weight="bold"
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-brand motion-safe:group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
