/**
 * Motivo de marca: la "curva de crecimiento" del isotipo FDI, aislada y llevada a
 * escala de fondo. El brandbook describe el símbolo como "edificaciones en ascenso
 * y una curva de crecimiento"; aquí se reutiliza solo la curva, en celeste y a muy
 * baja opacidad, como textura de las bandas oscuras.
 *
 * Decorativo: no aporta información, va siempre `aria-hidden`.
 */
export default function GrowthCurve({ className = "", id = "growth-curve" }) {
  const gradientId = `${id}-fade`;

  return (
    <svg
      viewBox="0 0 640 400"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-sky-400)" stopOpacity="0" />
          <stop offset="55%" stopColor="var(--color-sky-400)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--color-sky-300)" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Trazo ancho: el cuerpo de la curva, se desvanece hacia el origen */}
      <path
        d="M-40 424 C 196 414 372 300 452 168 C 502 84 546 22 604 -40"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="78"
        strokeLinecap="round"
      />
      {/* Filete paralelo: el mismo gesto en hairline, para dar borde a la curva */}
      <path
        d="M-40 356 C 182 346 340 246 414 126 C 458 54 496 -6 548 -64"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
      />
    </svg>
  );
}
