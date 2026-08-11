import { Link } from "react-router-dom";

export default function Logo({ variant = "dark", className = "" }) {
  const mark = (
    <img
      src="/LOGO-FDI.png"
      alt=""
      width="200"
      height="100"
      className="h-10 md:h-11 w-auto shrink-0"
    />
  );

  return (
    <Link
      to="/"
      aria-label="FDI — Fondo de Desarrollo de Infraestructuras, ir al inicio"
      className={`inline-flex items-center shrink-0 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${className}`}
    >
      {variant === "light" ? (
        <span className="inline-flex bg-white rounded-md p-2">{mark}</span>
      ) : (
        mark
      )}
    </Link>
  );
}
