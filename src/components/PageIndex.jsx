import { useEffect, useState } from "react";

const FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2";

/** Compensa la cabecera fija (4rem) y, en móvil, la barra de secciones. */
export const ANCLA = "scroll-mt-[8.5rem] lg:scroll-mt-24";

/**
 * Marca en el índice la sección que se está leyendo.
 * `ids` debe ser un array estable (constante de módulo), no uno creado en el render.
 */
export function usePageIndex(ids) {
  const [activa, setActiva] = useState(ids[0]);

  useEffect(() => {
    let pendiente = false;

    function calcular() {
      pendiente = false;
      const doc = document.documentElement;

      // Al final del documento gana siempre la última sección: ya no queda
      // recorrido para que entre en la banda de lectura, y con un observador
      // se quedaba marcada la penúltima para siempre.
      if (window.scrollY + window.innerHeight >= doc.scrollHeight - 4) {
        setActiva(ids[ids.length - 1]);
        return;
      }

      // Si no, la última cuyo inicio ya pasó por debajo de la cabecera fija.
      let actual = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) actual = id;
      }
      setActiva(actual);
    }

    function alScroll() {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(calcular);
    }

    calcular();
    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
    };
  }, [ids]);

  return activa;
}

/** Índice lateral fijo. `children` cuelga debajo, para la ayuda de cada página. */
export function PageIndexRail({ secciones, activa, children }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 py-20">
        <nav aria-label="Índice de la página">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gray-500">
            En esta página
          </p>
          <ul className="mt-4 border-l border-navy-900/10">
            {secciones.map((s) => {
              const esActiva = activa === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={esActiva ? "true" : undefined}
                    className={`-ml-px flex rounded-r-sm border-l-2 py-2 pl-4 text-sm transition-colors duration-200 ease-brand ${FOCUS} ${
                      esActiva
                        ? "border-sky-400 font-semibold text-navy-950"
                        : "border-transparent text-gray-500 hover:border-navy-900/20 hover:text-navy-900"
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {children && <div className="mt-10 border-t border-navy-900/10 pt-6">{children}</div>}
      </div>
    </aside>
  );
}

/** El mismo índice en móvil: fichas fijas bajo la cabecera. */
export function PageIndexBar({ secciones, activa }) {
  return (
    <nav
      aria-label="Secciones de esta página"
      className="sticky top-16 z-30 border-b border-navy-900/10 bg-white/95 backdrop-blur-sm lg:hidden"
    >
      <ul className="flex gap-1 overflow-x-auto px-4 py-2 sm:px-6">
        {secciones.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={activa === s.id ? "true" : undefined}
              className={`inline-flex h-10 items-center whitespace-nowrap rounded-lg px-3.5 text-sm font-semibold transition-colors duration-200 ease-brand ${FOCUS} ${
                activa === s.id ? "bg-navy-50 text-navy-900" : "text-gray-500 hover:text-navy-900"
              }`}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
