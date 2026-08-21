import { EnvelopeSimple, Phone } from "@phosphor-icons/react";
import BackButton from "./BackButton";
import { CORREO, HORARIO, TELEFONO } from "../data/contacto";

const FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2";

const CANALES = [
  { icon: Phone, label: "Teléfono", valor: TELEFONO.texto, href: TELEFONO.href, nota: HORARIO },
  { icon: EnvelopeSimple, label: "Correo", valor: CORREO.texto, href: CORREO.href, nota: "Para envíos de documentación" },
];

/** No hay backend que reciba un formulario, así que "solicitar información" son
    los canales reales del fondo: sustituye a la tarjeta de precio de la ficha,
    igual que `OfferRequirements`. `onVolver` la cierra. */
export default function RequestInfo({ property, onVolver }) {
  return (
    <div>
      <BackButton onClick={onVolver} />

      <h2 className="mt-4 text-lg font-semibold text-navy-950">Solicitar información</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
        Sobre {property.titulo} (Parcela {property.parcela}). Escríbenos o llámanos por estos
        medios para solicitar más información.
      </p>

      <ul className="mt-6 space-y-4">
        {CANALES.map(({ icon: Icon, label, valor, href, nota }) => (
          <li key={label} className="flex gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-navy-900/12 bg-mist-50">
              <Icon size={16} weight="bold" aria-hidden="true" className="text-navy-700" />
            </span>
            <div>
              <p className="text-xs text-gray-500">{label}</p>
              <a
                href={href}
                className={`text-sm font-semibold text-navy-900 transition-colors hover:text-navy-950 ${FOCUS}`}
              >
                {valor}
              </a>
              <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{nota}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
