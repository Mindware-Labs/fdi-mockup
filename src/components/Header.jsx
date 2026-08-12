import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";

// Rutas cuyo primer bloque es una banda oscura a sangre: ahí el header flota
// encima, sin fondo, y solo se vuelve sólido al pasar de largo.
const RUTAS_CON_HERO_OSCURO = new Set(["/"]);

const NAV = [
  { to: "/", label: "Inicio", end: true },
  { to: "/inmuebles", label: "Inmuebles" },
  { to: "/mapa", label: "Mapa" },
  { to: "/como-comprar", label: "¿Cómo Comprar?" },
  { to: "/sobre-el-fondo", label: "Sobre el Fondo" },
  { to: "/contacto", label: "Contacto" },
];

const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2";

function PhoneLink({ className = "", ringOffsetClass = "focus-visible:ring-offset-white" }) {
  return (
    <a
      href="tel:8099604580"
      className={`inline-flex items-center gap-2 rounded-sm transition-colors ${FOCUS_RING} ${ringOffsetClass} ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
      </svg>
      (809) 960-4580
    </a>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const sobreHero = RUTAS_CON_HERO_OSCURO.has(pathname);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef(null);
  const hamburgerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sobreHero]);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll("a[href], button:not([disabled])");
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      hamburgerRef.current?.focus();
    };
  }, [open]);

  // Modo "flotante": solo mientras el hero oscuro sigue detrás del header.
  const flotante = sobreHero && !scrolled;
  const ringOffset = flotante
    ? "focus-visible:ring-offset-navy-950"
    : "focus-visible:ring-offset-white";

  return (
    <>
      {/* Testigo fuera de flujo: marca hasta dónde el header puede seguir flotando.
          En el resto de las rutas basta 1 px, que es cuando aparece la sombra. */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className={`absolute top-0 left-0 w-px ${sobreHero ? "h-[260px]" : "h-px"}`}
      />
      <header
        className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-brand ${
          flotante
            ? "bg-transparent border-transparent"
            : "bg-white border-navy-900/10"
        } ${
          scrolled ? "shadow-[0_1px_3px_rgba(7,19,34,0.06),0_6px_16px_-8px_rgba(7,19,34,0.12)]" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo variant={flotante ? "light" : "dark"} />

            <nav className="hidden lg:flex items-center gap-8">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `relative inline-block py-2 text-sm rounded-sm transition-colors duration-200 after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-sky-400 after:origin-center after:transition-transform after:duration-200 ${FOCUS_RING} ${ringOffset} ${
                      isActive ? "font-semibold after:scale-x-100" : "font-medium after:scale-x-0 hover:after:scale-x-100"
                    } ${
                      flotante
                        ? isActive
                          ? "text-white"
                          : "text-white/75 hover:text-white"
                        : isActive
                          ? "text-navy-900"
                          : "text-navy-600 hover:text-navy-900"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <NavLink
                to="/inmuebles"
                className={`inline-flex items-center gap-2 rounded-md border font-semibold text-sm tracking-[0.01em] px-5 py-2.5 transition-[transform,background-color,box-shadow,border-color] duration-200 ease-brand motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 ${FOCUS_RING} ${ringOffset} ${
                  flotante
                    ? "border-white/30 text-white hover:border-white/50 hover:bg-white/12 active:bg-white/5"
                    : "border-transparent bg-navy-800 text-white shadow-[0_1px_3px_rgba(0,23,51,0.12)] hover:bg-navy-900 hover:shadow-[0_10px_24px_-6px_rgba(0,23,51,0.4)] active:bg-navy-950 active:shadow-[0_2px_6px_rgba(0,23,51,0.2)]"
                }`}
              >
                Buscar Inmuebles
              </NavLink>
            </div>

            <button
              ref={hamburgerRef}
              onClick={() => setOpen(true)}
              className={`lg:hidden p-2 -mr-2 rounded-md transition-colors duration-150 ${FOCUS_RING} ${ringOffset} ${
                flotante
                  ? "text-white hover:bg-white/12"
                  : "text-navy-800 hover:bg-navy-50 hover:text-navy-900"
              }`}
              aria-label="Abrir menú"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={!open}
        >
          <div className="absolute inset-0 bg-navy-950/60" onClick={() => setOpen(false)} />
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            ref={panelRef}
            className={`absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-[-8px_0_30px_-6px_rgba(11,29,51,0.25)] p-6 flex flex-col transition-transform duration-300 ease-out ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between mb-8">
              <Logo />
              <button
                ref={closeButtonRef}
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className={`p-2.5 rounded-md text-navy-800 hover:bg-navy-50 hover:text-navy-900 transition-colors duration-150 ${FOCUS_RING} focus-visible:ring-offset-white`}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `pr-3 py-3 text-base rounded-r-md transition-colors duration-150 ${FOCUS_RING} focus-visible:ring-offset-white ${
                      isActive
                        ? "pl-[14px] text-navy-900 font-semibold border-l-2 border-sky-400 bg-navy-50/60"
                        : "pl-4 text-navy-700 font-medium hover:bg-navy-50/60 hover:text-navy-900"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-auto pt-6 border-t border-navy-900/10">
              <p className="text-xs text-navy-500 mb-2">¿Necesitas ayuda?</p>
              <PhoneLink className="text-navy-800 font-semibold text-lg" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
