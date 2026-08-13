import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Buildings,
  CheckCircle,
  Clock,
  EnvelopeSimple,
  MapPin,
  Phone,
  WhatsappLogo,
} from "@phosphor-icons/react";
import Button from "../components/Button";
import ScrollReveal from "../components/ScrollReveal";

const FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2";
const CAMPO =
  "h-12 w-full rounded-lg border border-navy-900/12 bg-white px-3.5 text-sm text-navy-950 placeholder:text-gray-400 transition-colors focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-sky-400/30";

const CANALES = [
  {
    id: "telefono",
    icon: Phone,
    label: "Teléfono",
    valor: "(809) 960-4580",
    href: "tel:8099604580",
    nota: "Lunes a viernes, 8:00am – 5:00pm",
  },
  {
    id: "whatsapp",
    icon: WhatsappLogo,
    label: "WhatsApp",
    valor: "(809) 960-4580",
    href: "https://wa.me/18099604580",
    externo: true,
    nota: "Para consultas rápidas sobre un inmueble",
  },
  {
    id: "correo",
    icon: EnvelopeSimple,
    label: "Correo",
    valor: "info@fdi.com.do",
    href: "mailto:info@fdi.com.do",
    nota: "Para envíos de documentación",
  },
];

// Cada tipo de consulta apunta a la página que ya la responde: mucha gente
// escribe por algo que está publicado, y esperar respuesta es peor que leerlo.
const CONSULTAS = [
  {
    value: "inmueble",
    label: "Información sobre un inmueble",
    ayuda: {
      texto: "Cada ficha del catálogo publica parcela, distrito catastral, superficie y ubicación.",
      to: "/inmuebles",
      cta: "Ver el catálogo",
    },
  },
  {
    value: "oferta",
    label: "Proceso de oferta de compra",
    ayuda: {
      texto: "El proceso está explicado paso a paso, con los formularios de cada etapa.",
      to: "/como-comprar",
      cta: "Ver el proceso",
    },
  },
  {
    value: "intermediario",
    label: "Registro de intermediario",
    ayuda: {
      texto: "Los intermediarios se registran con un formulario propio antes de participar.",
      to: "/como-comprar#doc-intermediario",
      cta: "Ver el formulario",
    },
  },
  { value: "otro", label: "Otro", ayuda: null },
];

const ATAJOS = [
  { to: "/como-comprar", titulo: "Requisitos y proceso de compra", texto: "Los cinco pasos y los formularios de cada uno." },
  { to: "/inmuebles", titulo: "Catálogo de inmuebles", texto: "Ficha completa de cada propiedad publicada." },
  { to: "/sobre-el-fondo", titulo: "Sobre el fideicomiso", texto: "Marco normativo, gobernanza y derechos de terceros." },
];

function Campo({ id, label, obligatorio = false, children, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-navy-900">
        {label}
        {obligatorio && (
          <span aria-hidden="true" className="ml-0.5 text-sky-700">
            *
          </span>
        )}
      </label>
      <div className="mt-1.5">
        {children ?? <input id={id} required={obligatorio} className={CAMPO} {...props} />}
      </div>
    </div>
  );
}

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [consulta, setConsulta] = useState(CONSULTAS[0].value);
  const confirmacionRef = useRef(null);

  const ayuda = CONSULTAS.find((c) => c.value === consulta)?.ayuda;

  // El foco tiene que ir a la confirmación: si no, quien navega con teclado o
  // con lector de pantalla se queda en un formulario que ya no existe. Va en un
  // efecto y no en el manejador porque ahí la confirmación aún no está montada.
  useEffect(() => {
    if (enviado) confirmacionRef.current?.focus();
  }, [enviado]);

  function handleSubmit(event) {
    event.preventDefault();
    setEnviado(true);
  }

  return (
    <div className="bg-white">
      {/* Portada con los canales directos: en un fideicomiso la mayoría prefiere
          llamar antes que rellenar nada, así que van primero y son pulsables. */}
      <section className="bg-navy-950">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-20 sm:px-6 sm:pt-24 lg:px-8">
          <span aria-hidden="true" className="block h-px w-12 bg-sky-400" />
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-[-0.025em] text-balance text-white sm:text-5xl">
            Contacto
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-200">
            ¿Preguntas sobre un inmueble o sobre el proceso de compra? Estos son los canales
            del fideicomiso.
          </p>

          <ul className="mt-12 grid gap-px border-t border-white/15 sm:grid-cols-3">
            {CANALES.map(({ id, icon: Icon, label, valor, href, externo, nota }) => (
              <li key={id}>
                <a
                  href={href}
                  {...(externo ? { target: "_blank", rel: "noreferrer" } : {})}
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
                      {externo && <span className="sr-only">(abre en una ventana nueva)</span>}
                    </span>
                  </span>
                  <span className="text-sm leading-relaxed text-navy-300">{nota}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
          {/* FORMULARIO */}
          <section aria-labelledby="formulario-titulo">
            <ScrollReveal>
              <h2
                id="formulario-titulo"
                className="text-2xl font-bold tracking-[-0.02em] text-navy-950 sm:text-3xl"
              >
                Escríbenos
              </h2>
              <p className="mt-3 max-w-xl leading-relaxed text-gray-600">
                Para consultas que no resuelven las páginas del portal. Respondemos en
                horario laborable.
              </p>

              {enviado ? (
                <div
                  ref={confirmacionRef}
                  tabIndex={-1}
                  role="status"
                  className="mt-10 border border-navy-900/10 bg-mist-50 p-8 outline-none sm:p-10"
                >
                  <CheckCircle
                    size={40}
                    weight="duotone"
                    aria-hidden="true"
                    className="text-sky-600"
                  />
                  <h3 className="mt-5 text-lg font-semibold text-navy-950">
                    Consulta registrada
                  </h3>
                  <p className="mt-2 max-w-md leading-relaxed text-gray-600">
                    Gracias por escribir. El equipo del FDI da seguimiento a cada consulta en
                    horario laborable.
                  </p>
                  <p className="mt-6 border-t border-navy-900/10 pt-5 text-sm leading-relaxed text-gray-600">
                    <strong className="font-semibold text-navy-950">
                      Este formulario es una demostración
                    </strong>{" "}
                    y todavía no está conectado a un buzón. Para una consulta real, llama al{" "}
                    <a href="tel:8099604580" className={`font-semibold text-navy-800 underline underline-offset-4 ${FOCUS}`}>
                      (809) 960-4580
                    </a>{" "}
                    o escribe a{" "}
                    <a href="mailto:info@fdi.com.do" className={`font-semibold text-navy-800 underline underline-offset-4 ${FOCUS}`}>
                      info@fdi.com.do
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Campo
                      id="nombre"
                      name="nombre"
                      label="Nombre completo"
                      type="text"
                      autoComplete="name"
                      placeholder="Tu nombre"
                      obligatorio
                    />
                    <Campo
                      id="correo"
                      name="correo"
                      label="Correo electrónico"
                      type="email"
                      autoComplete="email"
                      placeholder="tu@correo.com"
                      obligatorio
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Campo
                      id="telefono"
                      name="telefono"
                      label="Teléfono"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(809) 000-0000"
                    />
                    <Campo id="tipo" label="Tipo de consulta">
                      <select
                        id="tipo"
                        name="tipo"
                        value={consulta}
                        onChange={(event) => setConsulta(event.target.value)}
                        className={CAMPO}
                      >
                        {CONSULTAS.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </Campo>
                  </div>

                  {ayuda && (
                    <p
                      aria-live="polite"
                      className="flex flex-wrap items-baseline gap-x-2 gap-y-1 border-l border-sky-400 bg-sky-50/60 py-3 pl-4 pr-3 text-sm leading-relaxed text-navy-900"
                    >
                      {ayuda.texto}
                      <Link
                        to={ayuda.to}
                        className={`group inline-flex items-center gap-1.5 rounded-sm font-semibold text-navy-800 transition-colors hover:text-navy-950 ${FOCUS}`}
                      >
                        {ayuda.cta}
                        <ArrowRight
                          size={13}
                          weight="bold"
                          aria-hidden="true"
                          className="transition-transform duration-300 ease-brand motion-safe:group-hover:translate-x-1"
                        />
                      </Link>
                    </p>
                  )}

                  <Campo id="mensaje" label="Mensaje" obligatorio>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      required
                      rows={6}
                      placeholder="Cuéntanos en qué podemos ayudarte…"
                      className={`${CAMPO} h-auto resize-y py-3 leading-relaxed`}
                    />
                  </Campo>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
                    <Button type="submit" variant="primary">
                      Enviar mensaje
                    </Button>
                    <p className="text-sm text-gray-500">
                      <span aria-hidden="true" className="text-sky-700">
                        *
                      </span>{" "}
                      Campos obligatorios
                    </p>
                  </div>

                  <p className="border-t border-navy-900/10 pt-5 text-sm leading-relaxed text-gray-500">
                    Formulario de demostración: aún no está conectado a un buzón del
                    fideicomiso.
                  </p>
                </form>
              )}
            </ScrollReveal>
          </section>

          {/* INFORMACIÓN PRÁCTICA */}
          <div className="space-y-12">
            <section aria-labelledby="oficina-titulo">
              <ScrollReveal>
                <h2
                  id="oficina-titulo"
                  className="text-sm font-semibold uppercase tracking-[0.12em] text-navy-900"
                >
                  Oficina y horario
                </h2>
                <dl className="mt-5 border-t border-navy-900/10">
                  <div className="flex gap-3.5 border-b border-navy-900/10 py-5">
                    <MapPin
                      size={18}
                      weight="fill"
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-navy-500"
                    />
                    <div>
                      <dt className="text-sm text-gray-500">Oficina</dt>
                      <dd className="mt-1 font-medium text-navy-950">
                        Santo Domingo, República Dominicana
                      </dd>
                    </div>
                  </div>
                  <div className="flex gap-3.5 border-b border-navy-900/10 py-5">
                    <Clock
                      size={18}
                      weight="fill"
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-navy-500"
                    />
                    <div>
                      <dt className="text-sm text-gray-500">Horario de atención</dt>
                      <dd className="mt-1 font-medium text-navy-950">
                        Lunes a viernes, 8:00am – 5:00pm
                      </dd>
                    </div>
                  </div>
                  <div className="flex gap-3.5 border-b border-navy-900/10 py-5">
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
              </ScrollReveal>
            </section>

            <section aria-labelledby="atajos-titulo">
              <ScrollReveal>
                <h2
                  id="atajos-titulo"
                  className="text-sm font-semibold uppercase tracking-[0.12em] text-navy-900"
                >
                  Antes de escribir
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Buena parte de las consultas ya están respondidas en el portal.
                </p>
                <ul className="mt-5 space-y-3">
                  {ATAJOS.map((atajo) => (
                    <li key={atajo.to}>
                      <Link
                        to={atajo.to}
                        className={`group flex flex-col border border-navy-900/10 bg-white p-5 transition-[transform,box-shadow,border-color] duration-500 ease-brand hover:border-navy-900/[0.04] hover:shadow-[0_2px_4px_-2px_rgba(7,26,58,0.12),0_18px_38px_-24px_rgba(7,26,58,0.55)] motion-safe:hover:-translate-y-0.5 ${FOCUS}`}
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
      </div>
    </div>
  );
}
