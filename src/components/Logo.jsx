import { Link } from "react-router-dom";

export default function Logo({ variant = "dark", className = "" }) {
  const ringOffset =
    variant === "light" ? "focus-visible:ring-offset-navy-950" : "focus-visible:ring-offset-white";
  const src = variant === "light" ? "/LOGO-FDI-WHITE.png" : "/LOGO-FDI.png";

  return (
    <Link
      to="/"
      aria-label="FDI, Fondo de Desarrollo de Infraestructuras. Ir al inicio"
      className={`inline-flex items-center shrink-0 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 ${ringOffset} ${className}`}
    >
      <img src={src} alt="" width="200" height="311" className="h-10 md:h-11 w-auto shrink-0" />
    </Link>
  );
}
