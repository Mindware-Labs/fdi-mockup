export const TYPE_COLORS = {
  Terreno: "#0e7a53",
  Apartamento: "#204a7c",
  Comercial: "#a86a1a",
  Industrial: "#475569",
};

/** Pin de mapa: cuadrado rotado -45° con la punta hacia abajo (anchor="bottom" en el Marker). */
export default function PropertyMapMarker({ tipo, selected = false }) {
  const color = TYPE_COLORS[tipo] || TYPE_COLORS.Terreno;
  const size = selected ? 34 : 28;

  return (
    <div
      style={{ width: size, height: size }}
      className="cursor-pointer transition-transform duration-150 ease-out hover:scale-110"
    >
      <div
        style={{
          transform: "rotate(-45deg)",
          background: color,
          boxShadow: selected
            ? "0 8px 20px rgba(7,19,34,0.36)"
            : "0 5px 14px rgba(7,19,34,0.28)",
        }}
        className="relative h-full w-full rounded-tl-full rounded-tr-full rounded-br-full border-[3px] border-white"
      >
        <span
          aria-hidden="true"
          className="absolute rounded-full bg-white/90"
          style={{ inset: "28%" }}
        />
      </div>
    </div>
  );
}
