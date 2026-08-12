import { Link } from "react-router-dom";

export default function Logo({ variant = "dark", className = "" }) {
  const ringOffset =
    variant === "light" ? "focus-visible:ring-offset-navy-950" : "focus-visible:ring-offset-white";
  const src = variant === "light" ? "/LOGO-FDI-WHITE-fixed.png" : "/LOGO-FDI-fixed.png";

  return (
    <Link
      to="/"
      aria-label="FDI, Fondo de Desarrollo de Infraestructuras. Ir al inicio"
      className={`inline-flex items-center shrink-0 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 ${ringOffset} ${className}`}
    >
      <img src={src} alt="" width="736" height="480" className="h-10 md:h-11 w-auto shrink-0" />
    </Link>
  );
}
