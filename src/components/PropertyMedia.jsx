import PropertyIcon from "./PropertyIcon";

const PALETTES = {
  Terreno: "from-emerald-700 to-emerald-900",
  Apartamento: "from-navy-600 to-navy-900",
  Comercial: "from-sky-600 to-sky-900",
  Industrial: "from-slate-600 to-slate-900",
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
