import PropertyIcon from "./PropertyIcon";

// Placeholder decorativo, no codificación de dato: el tipo va siempre rotulado en
// la ficha. Por eso los cuatro degradados salen solo de la paleta del brandbook
// (Azul Marino, Azul Profundo, Celeste y Gris Institucional) y no de colores
// ajenos a la marca; basta con que se distingan entre sí.
const PALETTES = {
  Terreno: "from-navy-500 to-navy-800",
  Apartamento: "from-sky-600 to-sky-900",
  Comercial: "from-navy-800 to-navy-950",
  Industrial: "from-mist-500 to-mist-800",
};

export default function PropertyMedia({ tipo, className = "", iconClassName = "w-12 h-12" }) {
  const palette = PALETTES[tipo] || PALETTES.Terreno;
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${palette} text-white/90 ${className}`}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,.5) 0, transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,.3) 0, transparent 40%)",
        }}
      />
      <PropertyIcon tipo={tipo} className={`${iconClassName} relative`} />
    </div>
  );
}
