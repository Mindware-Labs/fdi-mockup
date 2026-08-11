const ICONS = {
  Terreno: (
    <path d="M3 20h18M4 20V10l4-3 4 3v10M12 20V7l4-3 4 3v13M8 20v-4h2v4M16 20v-6h2v6" />
  ),
  Apartamento: (
    <path d="M4 21V6l8-3 8 3v15M9 21v-6h6v6M7 9h.01M11 9h.01M15 9h.01M17 9h.01M7 13h.01M11 13h.01M15 13h.01M17 13h.01" />
  ),
  Comercial: (
    <path d="M3 21h18M4 21V9l8-6 8 6v12M9 21v-5h6v5M8 12h1M11 12h1M14 12h1" />
  ),
  Industrial: (
    <path d="M3 21V11l4 3V11l4 3V11l4 3V6l4 3v12H3ZM7 21v-4h3v4" />
  ),
};

export default function PropertyIcon({ tipo, className = "w-10 h-10" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {ICONS[tipo] || ICONS.Terreno}
    </svg>
  );
}
