import { motion, useReducedMotion } from "motion/react";

// Curva de easing premium, discreta: entra rápido y se asienta suave, sin rebote.
const EASE = [0.21, 0.47, 0.32, 0.98];

/**
 * Envoltorio de entrada al hacer scroll: fundido + leve ascenso, una sola vez.
 * Deliberadamente sutil (offset y duración pequeños) para no competir con el contenido.
 * Respeta prefers-reduced-motion desactivando el movimiento (deja solo el fundido).
 */
export default function ScrollReveal({
  children,
  as = "div",
  y = 16,
  duration = 0.6,
  delay = 0,
  margin = "0px",
  once = true,
  className = "",
}) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin }}
      transition={{
        duration: prefersReducedMotion ? 0.3 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
