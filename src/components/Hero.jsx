import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";

const EASE = [0.21, 0.47, 0.32, 0.98];

// Entrada al cargar (no al hacer scroll): el hero ya está en pantalla.
const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// `border` en ambos botones (transparente en el sólido) para que midan igual:
// sin él, el fantasma queda 2 px más alto que el celeste.
const CTA_BASE =
  "group inline-flex items-center justify-center gap-2.5 border px-7 py-4 text-sm font-semibold tracking-[0.01em] outline-none transition-[transform,box-shadow,background-color,border-color] duration-200 ease-brand focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // Un solo variant para todos los bloques: mismo gesto, distinto turno.
  const item = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    // `-mt-16` mete el hero por debajo del header transparente (h-16) sin sacarlo
    // del flujo; `pt-16` devuelve ese espacio al contenido.
    <section className="relative isolate -mt-16 overflow-hidden bg-navy-950">
      {/* El PNG original pesaba 2.1 MB y es el elemento LCP: se sirve en WebP con
          JPEG de respaldo y en dos anchos, con el preload declarado en index.html. */}
      <picture>
        <source
          type="image/webp"
          srcSet="/aerea-1100.webp 1100w, /aerea-1983.webp 1983w"
          sizes="100vw"
        />
        <img
          src="/aerea-1983.jpg"
          srcSet="/aerea-1100.jpg 1100w, /aerea-1983.jpg 1983w"
          sizes="100vw"
          alt=""
          width="1983"
          height="793"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>

      {/* Cuatro capas: un tinte plano en Azul Profundo que lleva la foto al color
          institucional, y tres velos direccionales —lateral para el texto, superior
          para que el header transparente sea legible, inferior para cerrar la banda. */}
      <div className="absolute inset-0 bg-navy-900/55" />
      <div className="hero-scrim-x absolute inset-0" />
      <div className="hero-scrim-top absolute inset-x-0 top-0 h-40" />
      <div className="hero-scrim-bottom absolute inset-0" />

      <motion.div
        variants={STAGGER}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8"
      >
        {/* El aire se recorta en pantallas bajas (móvil apaisado) para que los
            botones no queden a dos pantallas de distancia del titular. */}
        <div className="pt-16 pb-20 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-36 [@media(max-height:640px)]:pt-10 [@media(max-height:640px)]:pb-14">
          <motion.h1
            variants={item}
            className="max-w-4xl text-[2.6rem] font-bold leading-[1.05] tracking-[-0.025em] text-balance text-white sm:text-6xl lg:text-[4.15rem]"
          >
            Invierte en el desarrollo de infraestructuras de República Dominicana
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-lg leading-relaxed text-navy-200 sm:text-xl"
          >
            El FDI comercializa terrenos, apartamentos y locales comerciales a nivel
            nacional. Cada venta financia obras de infraestructura del Estado dominicano.
          </motion.p>

          <motion.div variants={item} className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              to="/inmuebles"
              className={`${CTA_BASE} border-transparent bg-sky-400 text-navy-950 shadow-[0_1px_3px_rgba(0,0,0,0.25)] hover:bg-sky-500 hover:shadow-[0_14px_30px_-8px_rgba(103,174,228,0.55)] active:bg-sky-600 active:shadow-[0_2px_6px_rgba(0,0,0,0.3)] focus-visible:ring-white motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0`}
            >
              Explorar inmuebles
              <ArrowRight
                size={16}
                weight="bold"
                aria-hidden="true"
                className="transition-transform duration-200 ease-brand motion-safe:group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/como-comprar"
              className={`${CTA_BASE} border-white/25 text-white hover:border-white/45 hover:bg-white/10 active:bg-white/5 focus-visible:ring-sky-400 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0`}
            >
              ¿Cómo comprar?
            </Link>
          </motion.div>

          {/* Credenciales del fondo: dato, no rótulo. Cierra el bloque con la base
              legal y la fiduciaria que lo administra. */}
          <motion.p variants={item} className="mt-10 max-w-lg text-sm leading-relaxed text-navy-300">
            Fideicomiso público constituido mediante el Decreto 581-23 y administrado
            en conjunto con Fiduciaria Reservas.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
