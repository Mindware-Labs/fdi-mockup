import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Buildings,
  Clock,
  EnvelopeSimple,
  MapPin,
  Phone,
} from "@phosphor-icons/react";
import ScrollReveal from "../components/ScrollReveal";
import { CORREO, HORARIO, OFICINA_LINEAS, TELEFONO } from "../data/contacto";

// Mapbox GL pesa ~500 kB gzip: se descarga solo al abrir esta página, no en cada
// carga del sitio (esta era la única página que lo importaba de forma estática).
const OfficeMap = lazy(() => import("../components/OfficeMap"));

const FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2";

const CANALES = [
  {
    id: "telefono",
    icon: Phone,
    label: "Teléfono",
    valor: TELEFONO.texto,
    href: TELEFONO.href,
    nota: HORARIO,
  },
  {
    id: "correo",
    icon: EnvelopeSimple,
    label: "Correo",
    valor: CORREO.texto,
    href: CORREO.href,
    nota: "Para envíos de documentación",
  },
];

const ATAJOS = [
  { to: "/como-comprar", titulo: "Requisitos y proceso de compra", texto: "Los cinco pasos y los formularios de cada uno." },
  { to: "/inmuebles", titulo: "Catálogo de inmuebles", texto: "Ficha completa de cada propiedad publicada." },
  { to: "/sobre-el-fondo", titulo: "Sobre el fideicomiso", texto: "Marco normativo, gobernanza y derechos de terceros." },
];

export default function Contacto() {
  return (
    <div className="bg-white">
      {/* No hay backend que reciba un formulario, así que el contacto es directo:
          teléfono y correo reales, sin nada que simule un envío que no llega a
          ningún lado. */}
      <section className="bg-navy-950">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-20 sm:px-6 sm:pt-24 lg:px-8">
          <span aria-hidden="true" className="block h-px w-12 bg-sky-400" />
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-[-0.025em] text-balance text-white sm:text-5xl">
            Contacto
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-200">
            Por estos canales puedes solicitar información sobre un inmueble o sobre el
            proceso de compra.
          </p>

          <ul className="mt-12 grid gap-px border-t border-white/15 sm:grid-cols-2">
            {CANALES.map(({ id, icon: Icon, label, valor, href, nota }) => (
              <li key={id}>
                <a
                  href={href}
                  className={`group flex h-full flex-col justify-between gap-4 py-7 pr-6 transition-colors duration-300 ease-brand hover:bg-white/[0.04] sm:px-6 sm:first:pl-0 ${FOCUS} focus-visible:ring-offset-navy-950`}
                >
                  <span>
                    <span className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-sky-300">
                      <Icon size={15} weight="fill" aria-hidden="true" />
                      {label}
                    </span>
                    <span className="mt-3 flex items-center gap-2 text-xl font-semibold text-white">
                      {valor}
                      <ArrowRight
                        size={16}
                        weight="bold"
                        aria-hidden="true"
                        className="shrink-0 text-sky-400 opacity-0 transition-[opacity,transform] duration-300 ease-brand group-hover:opacity-100 motion-safe:group-hover:translate-x-1"
                      />
                    </span>
                  </span>
                  <span className="text-sm leading-relaxed text-navy-300">{nota}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Antes iban en dos columnas: el mapa hacía esa mitad mucho más alta que la
          otra y dejaba un vacío evidente junto a los atajos. En filas a todo el
          ancho, cada bloque ocupa solo el alto que su propio contenido necesita. */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <section aria-labelledby="oficina-titulo">
          <ScrollReveal>
            <h2
              id="oficina-titulo"
              className="text-sm font-semibold uppercase tracking-[0.12em] text-navy-900"
            >
              Oficina y horario
            </h2>
            <dl className="mt-5 grid gap-x-6 gap-y-6 border-t border-navy-900/10 pt-6 sm:grid-cols-3">
              <div className="flex gap-3.5">
                <MapPin
                  size={18}
                  weight="fill"
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-navy-500"
                />
                <div>
                  <dt className="text-sm text-gray-500">Oficina</dt>
                  <dd className="mt-1 font-medium leading-relaxed text-navy-950">
                    {OFICINA_LINEAS.map((linea) => (
                      <span key={linea} className="block">
                        {linea}
                      </span>
                    ))}
                  </dd>
                </div>
              </div>
              <div className="flex gap-3.5">
                <Clock
                  size={18}
                  weight="fill"
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-navy-500"
                />
                <div>
                  <dt className="text-sm text-gray-500">Horario de atención</dt>
                  <dd className="mt-1 font-medium text-navy-950">{HORARIO}</dd>
                </div>
              </div>
              <div className="flex gap-3.5">
                <Buildings
                  size={18}
                  weight="fill"
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-navy-500"
                />
                <div>
                  <dt className="text-sm text-gray-500">Administración fiduciaria</dt>
                  <dd className="mt-1 font-medium text-navy-950">Fiduciaria Reservas</dd>
                </div>
              </div>
            </dl>

            <div className="mt-8">
              <Suspense
                fallback={
                  <div
                    className="h-[320px] animate-pulse border border-navy-900/10 bg-navy-50"
                    aria-hidden="true"
                  />
                }
              >
                <OfficeMap height="320px" />
              </Suspense>
            </div>
          </ScrollReveal>
        </section>

        <section aria-labelledby="atajos-titulo" className="mt-16 border-t border-navy-900/10 pt-16">
          <ScrollReveal>
            <h2
              id="atajos-titulo"
              className="text-sm font-semibold uppercase tracking-[0.12em] text-navy-900"
            >
              Antes de escribir
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
              Buena parte de las consultas ya están respondidas en el portal.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {ATAJOS.map((atajo) => (
                <li key={atajo.to}>
                  <Link
                    to={atajo.to}
                    className={`group flex h-full flex-col border border-navy-900/10 bg-white p-5 transition-[transform,box-shadow,border-color] duration-500 ease-brand hover:border-navy-900/[0.04] hover:shadow-[0_2px_4px_-2px_rgba(7,26,58,0.12),0_18px_38px_-24px_rgba(7,26,58,0.55)] motion-safe:hover:-translate-y-0.5 ${FOCUS}`}
                  >
                    <span className="flex items-center justify-between gap-3 font-semibold text-navy-950">
                      {atajo.titulo}
                      <ArrowRight
                        size={15}
                        weight="bold"
                        aria-hidden="true"
                        className="shrink-0 text-navy-500 transition-transform duration-300 ease-brand motion-safe:group-hover:translate-x-1"
                      />
                    </span>
                    <span className="mt-1.5 text-sm leading-relaxed text-gray-600">
                      {atajo.texto}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
