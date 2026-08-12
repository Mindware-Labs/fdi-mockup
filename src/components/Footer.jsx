import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import Logo from "./Logo";

const FOCUS =
  "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950";
// `py-1` ensancha el área táctil de 19 a 27 px sin cambiar el ritmo vertical.
const LINK = `inline-flex items-center py-1 text-navy-200 transition-colors duration-200 hover:text-white ${FOCUS}`;
const CONTACT_LINK = `inline-flex items-center py-1 font-semibold text-white transition-colors duration-200 hover:text-sky-300 ${FOCUS}`;
// Filete vertical entre columnas en desktop: mismo lenguaje que FundOverview (sm:odd:border-r).
const DIVIDER = "lg:border-r lg:border-white/10 lg:pr-10";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/inmuebles", label: "Inmuebles" },
  { to: "/mapa", label: "Mapa" },
  { to: "/como-comprar", label: "¿Cómo comprar?" },
  { to: "/sobre-el-fondo", label: "Sobre el Fondo" },
  { to: "/contacto", label: "Contacto" },
];

const RESOURCES = [
  { to: "/como-comprar#formularios", label: "Formularios y documentos" },
  { to: "/como-comprar#faq", label: "Preguntas frecuentes" },
];

// `to`: ruta interna. Mientras la página no exista en App.jsx la entrada no se
// renderiza, para no dejar un enlace legal que no lleva a ninguna parte.
const LEGAL = [
  { to: null, label: "Aviso legal" },
  { to: null, label: "Política de cookies" },
];

function ColumnTitle({ children }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-navy-300">
      {children}
    </h2>
  );
}

function ContactIcon({ children, variant = "stroke", className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`mt-0.5 h-4 w-4 shrink-0 text-navy-500 ${className}`}
      fill={variant === "fill" ? "currentColor" : "none"}
      stroke={variant === "fill" ? "none" : "currentColor"}
      strokeWidth={variant === "fill" ? undefined : 2}
    >
      {children}
    </svg>
  );
}

function ContactRow({ icon, label, children }) {
  return (
    <div className="flex gap-3">
      {icon}
      <div>
        <dt className="text-navy-300">{label}</dt>
        <dd className="mt-0.5">{children}</dd>
      </div>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const legalDisponible = LEGAL.filter((item) => item.to);

  return (
    <footer className="bg-navy-950 text-navy-200">
      {/* Remate de marca: la misma curva de crecimiento del isotipo, en un filete. */}
      <div className="h-0.5 bg-gradient-to-r from-sky-400 via-sky-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_0.9fr_1.4fr] lg:gap-y-0">
        <div className={DIVIDER}>
          <Logo variant="light" />
          <p className="mt-5 text-sm text-navy-300 leading-relaxed max-w-xs">
            Fideicomiso constituido mediante el Decreto 581-23, fuente alterna de
            financiamiento para el desarrollo de infraestructuras en República Dominicana.
          </p>
          <a
            href="https://www.fiduciariareservas.com"
            target="_blank"
            rel="noreferrer"
            className={`mt-4 inline-flex items-center gap-1.5 text-xs text-navy-400 transition-colors duration-200 hover:text-sky-300 ${FOCUS}`}
          >
            Administrado en fideicomiso junto a Fiduciaria Reservas
            <ArrowUpRight size={12} weight="bold" aria-hidden="true" className="shrink-0" />
            <span className="sr-only">(abre en una ventana nueva)</span>
          </a>
        </div>

        <nav aria-labelledby="footer-navegacion" className={DIVIDER}>
          <ColumnTitle>
            <span id="footer-navegacion">Navegación</span>
          </ColumnTitle>
          <ul className="mt-5 space-y-2.5 text-sm">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={LINK}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-recursos" className={DIVIDER}>
          <ColumnTitle>
            <span id="footer-recursos">Recursos</span>
          </ColumnTitle>
          <ul className="mt-5 space-y-2.5 text-sm">
            {RESOURCES.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={LINK}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <ColumnTitle>Contacto</ColumnTitle>
          <dl className="mt-5 space-y-4 text-sm">
            <ContactRow
              label="Teléfono"
              icon={
                <ContactIcon>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
                </ContactIcon>
              }
            >
              <a href="tel:8099604580" className={CONTACT_LINK}>
                (809) 960-4580
              </a>
            </ContactRow>

            <ContactRow
              label="WhatsApp"
              icon={
                <ContactIcon variant="fill">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.44 1.32 4.94L2.05 22l5.29-1.38a9.9 9.9 0 0 0 4.7 1.2h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.37-.5.08-1.13.11-1.82-.11a16.6 16.6 0 0 1-1.66-.6c-2.92-1.26-4.83-4.19-4.98-4.39-.15-.2-1.2-1.59-1.2-3.03 0-1.44.75-2.15 1.02-2.44.27-.29.58-.36.78-.36l.56.01c.18 0 .42-.07.65.5.24.58.82 2.02.9 2.16.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.29.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.37 1.47.29.15.46.12.63-.07.17-.2.72-.84.92-1.13.19-.29.39-.24.65-.15.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.13.07.72-.17 1.4Z" />
                </ContactIcon>
              }
            >
              <a href="https://wa.me/18099604580" target="_blank" rel="noreferrer" className={CONTACT_LINK}>
                (809) 960-4580
                <span className="sr-only">, escribir por WhatsApp (abre en una ventana nueva)</span>
              </a>
            </ContactRow>

            <ContactRow
              label="Correo"
              icon={
                <ContactIcon>
                  <path d="M4 4h16v16H4zM22 6l-10 7L2 6" />
                </ContactIcon>
              }
            >
              <a href="mailto:info@fdi.com.do" className={CONTACT_LINK}>
                info@fdi.com.do
              </a>
            </ContactRow>

            <ContactRow
              label="Oficina"
              icon={
                <ContactIcon>
                  <path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21Z" />
                  <circle cx="12" cy="9.5" r="2.3" />
                </ContactIcon>
              }
            >
              <span className="text-white">Santo Domingo, República Dominicana</span>
            </ContactRow>

            <ContactRow
              label="Horario"
              icon={
                <ContactIcon>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </ContactIcon>
              }
            >
              <span className="text-white">Lunes a viernes, 8:00am – 5:00pm</span>
            </ContactRow>
          </dl>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-3 text-xs text-navy-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} FDI · Fondo de Desarrollo de Infraestructuras</p>
          {legalDisponible.length > 0 && (
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalDisponible.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className={LINK}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
