/**
 * Botón institucional, según la página 11 del brandbook ("Aplicaciones digitales
 * · botones y elementos de interfaz"): esquina redondeada de 8 px, etiqueta en
 * negrita y dos jerarquías —celeste #67AEE4 para el llamado a la acción y una
 * placa navy para el resto—. El brandbook además reserva explícitamente el
 * celeste para "acentos, la curva del símbolo y llamados a la acción".
 *
 * Única desviación respecto a la muestra impresa: la etiqueta sobre el celeste
 * va en Azul Profundo, no en blanco. Blanco sobre #67AEE4 da 2.4:1 de contraste
 * y no llega ni al mínimo de texto grande de la WCAG; el azul da 7.1:1 y deja el
 * color de marca intacto. Para volver a la muestra literal basta cambiar
 * `text-navy-950` por `text-white` en `primary`.
 */

const BASE =
  "group inline-flex items-center justify-center gap-2.5 rounded-lg border font-semibold tracking-[0.01em] whitespace-nowrap outline-none transition-[transform,box-shadow,background-color,border-color] duration-200 ease-brand focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0";

// Alturas fijas: todas superan los 44 px de área táctil recomendada.
const SIZES = {
  sm: "h-11 px-5 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

const SOMBRA_CLARA =
  "shadow-[0_1px_2px_rgba(7,26,58,0.16)] hover:shadow-[0_14px_30px_-12px_rgba(7,26,58,0.5)] active:shadow-[0_1px_2px_rgba(7,26,58,0.2)]";
const SOMBRA_CELESTE =
  "shadow-[0_1px_2px_rgba(7,26,58,0.2)] hover:shadow-[0_14px_30px_-10px_rgba(103,174,228,0.6)] active:shadow-[0_1px_2px_rgba(7,26,58,0.24)]";

function variantClasses(variant, onDark) {
  switch (variant) {
    // Llamado a la acción. Celeste de marca, sin excepción de tono.
    case "primary":
      return `border-transparent bg-sky-400 text-navy-950 hover:bg-sky-300 active:bg-sky-500 ${SOMBRA_CELESTE}`;

    // Placa navy. En fondo oscuro sube de tono para despegarse del fondo, que es
    // justo lo que hace la muestra del brandbook sobre su banner navy.
    case "secondary":
      return onDark
        ? `border-transparent bg-navy-600 text-white hover:bg-navy-500 active:bg-navy-700 ${SOMBRA_CLARA}`
        : `border-transparent bg-navy-800 text-white hover:bg-navy-900 active:bg-navy-950 ${SOMBRA_CLARA}`;

    // Superficie clara con filete. No está en el brandbook: es para los controles
    // que flotan sobre el mapa, donde una placa llena taparía la cartografía.
    case "quiet":
      return onDark
        ? "border-white/30 bg-white/10 text-white hover:border-white/50 hover:bg-white/20 active:bg-white/10"
        : `border-navy-900/12 bg-white text-navy-900 hover:border-navy-900/20 hover:bg-mist-50 active:bg-mist-100 ${SOMBRA_CLARA}`;

    default:
      return "";
  }
}

export default function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  onDark = false,
  icon: Icon,
  iconWeight = "bold",
  fullWidth = false,
  className = "",
  children,
  ...props
}) {
  const anillo = onDark
    ? "focus-visible:ring-white focus-visible:ring-offset-navy-950"
    : "focus-visible:ring-sky-400 focus-visible:ring-offset-white";

  if (Component === "button" && props.type === undefined) props.type = "button";

  return (
    <Component
      className={`${BASE} ${SIZES[size]} ${variantClasses(variant, onDark)} ${anillo} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {children}
      {Icon && (
        <Icon
          size={size === "lg" ? 17 : 15}
          weight={iconWeight}
          aria-hidden="true"
          className="shrink-0 transition-transform duration-300 ease-brand motion-safe:group-hover:translate-x-1"
        />
      )}
    </Component>
  );
}
