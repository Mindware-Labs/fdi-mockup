import { STATUS } from "../data/properties";

export default function StatusBadge({ estado, className = "" }) {
  const s = STATUS[estado] || STATUS.desarrollo;
  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold ${s.classes} ${className}`}>
      {s.label}
    </span>
  );
}
