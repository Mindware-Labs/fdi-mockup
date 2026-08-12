import { Link } from "react-router-dom";

// Dimensiones intrínsecas reales de cada archivo. Antes iban invertidas (736×480
// sobre un PNG que es 480×736), así que el navegador reservaba una caja apaisada
// y la cabecera daba un salto al cargar el logotipo.
//
// Los archivos originales (480 px de ancho, 115 y 91 kB) se servían enteros para
// pintar 44 px de alto: aquí se usan las copias a 176 px —4× el tamaño de pantalla,
// suficiente para cualquier densidad— y las dos juntas bajan de 206 a 26 kB.
// Los originales siguen en /public por si se necesitan a mayor tamaño.
const VARIANTS = {
  dark: { src: "/LOGO-FDI-176.png", width: 115, height: 176 },
  light: { src: "/LOGO-FDI-WHITE-176.png", width: 114, height: 176 },
};

export default function Logo({ variant = "dark", className = "" }) {
  const ringOffset =
    variant === "light" ? "focus-visible:ring-offset-navy-950" : "focus-visible:ring-offset-white";
  const { src, width, height } = VARIANTS[variant] ?? VARIANTS.dark;

  return (
    <Link
      to="/"
      aria-label="FDI, Fondo de Desarrollo de Infraestructuras. Ir al inicio"
      className={`inline-flex items-center shrink-0 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 ${ringOffset} ${className}`}
    >
      <img
        src={src}
        alt=""
        width={width}
        height={height}
        className="h-10 md:h-11 w-auto shrink-0"
      />
    </Link>
  );
}
