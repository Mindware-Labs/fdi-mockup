/**
 * Encabezado de sección único para toda la página: filete celeste (eco de la curva
 * del isotipo) + título + entradilla. Sin rótulo previo: el título carga solo, y
 * repetir la categoría encima de él solo restaba jerarquía.
 * Mantiene el mismo ritmo tipográfico en fondo claro y en fondo navy.
 */
export default function SectionHeading({
  title,
  lead,
  id,
  tone = "light",
  as: Tag = "h2",
  className = "",
}) {
  const dark = tone === "dark";

  return (
    <div className={className}>
      <span aria-hidden="true" className="block h-px w-12 bg-sky-400" />

      <Tag
        id={id}
        className={`mt-6 text-3xl font-bold leading-[1.15] tracking-[-0.02em] text-balance sm:text-4xl ${
          dark ? "text-white" : "text-navy-950"
        }`}
      >
        {title}
      </Tag>

      {lead && (
        <p
          className={`mt-5 max-w-2xl text-lg leading-relaxed ${
            dark ? "text-navy-200" : "text-gray-600"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
