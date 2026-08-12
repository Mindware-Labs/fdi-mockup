import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

// Misma curva de easing "premium" que usa ScrollReveal, para que el sitio se sienta como un solo lenguaje de movimiento.
const EASE = [0.21, 0.47, 0.32, 0.98];

export default function Layout() {
  const { pathname } = useLocation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ScrollToTop />
      {/* Saltar la navegación: seis enlaces y un CTA separan el teclado del
          contenido en cada página (WCAG 2.4.1). */}
      {/* Se esconde desplazándolo fuera de pantalla, no con `sr-only`: así una sola
          utilidad controla la posición y no compite con `not-sr-only` al enfocar. */}
      <a
        href="#contenido"
        className="fixed left-4 top-4 z-[70] -translate-y-24 bg-navy-900 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(7,26,58,0.6)] outline-none transition-transform duration-200 ease-brand focus:translate-y-0 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
      >
        Saltar al contenido
      </a>
      <Header />
      {/* `tabIndex={-1}` deja que el foco aterrice aquí tras el salto; el contorno
          se retira porque encuadrar toda la página no informa de nada. */}
      <main id="contenido" tabIndex={-1} className="flex-1 outline-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -6 }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.32, ease: EASE }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
