import { useState } from "react";
import Button from "../components/Button";

export default function Contacto() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <p className="text-navy-500 font-semibold text-sm uppercase tracking-wide mb-2">Contacto</p>
        <h1 className="text-4xl font-bold text-navy-950 mb-4">Hablemos</h1>
        <p className="text-gray-500 max-w-xl">
          ¿Tienes preguntas sobre un inmueble o el proceso de compra? Escríbenos y
          nuestro equipo te responderá a la brevedad.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
          {sent ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m5 13 4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-950 mb-2">¡Mensaje enviado!</h3>
              <p className="text-gray-500 text-sm">Gracias por contactarnos. Te responderemos a la brevedad.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Nombre completo" type="text" placeholder="Tu nombre" required />
                <Field label="Correo electrónico" type="email" placeholder="tu@correo.com" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Teléfono" type="tel" placeholder="(809) 000-0000" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Tipo de consulta</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-400">
                    <option>Información sobre un inmueble</option>
                    <option>Proceso de oferta de compra</option>
                    <option>Registro de intermediario</option>
                    <option>Otro</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Mensaje</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-400 resize-none"
                />
              </div>
              <Button type="submit" variant="primary">
                Enviar mensaje
              </Button>
            </form>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <ContactCard
            icon={
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
            }
            title="Teléfono"
            lines={["(809) 960-4580"]}
          />
          <ContactCard
            icon={<path d="M4 4h16v16H4zM22 6l-10 7L2 6" />}
            title="Correo"
            lines={["info@fdi.com.do"]}
          />
          <ContactCard
            icon={
              <>
                <path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21Z" />
                <circle cx="12" cy="9.5" r="2.3" />
              </>
            }
            title="Oficina"
            lines={["Santo Domingo, República Dominicana"]}
          />
          <ContactCard
            icon={
              <>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </>
            }
            title="Horario de atención"
            lines={["Lunes a viernes: 8:00am – 5:00pm"]}
          />
        </div>
      </div>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-400"
      />
    </div>
  );
}

function ContactCard({ icon, title, lines }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4">
      <span className="shrink-0 w-11 h-11 rounded-lg bg-navy-50 text-navy-700 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
          {icon}
        </svg>
      </span>
      <div>
        <h4 className="font-semibold text-navy-900 text-sm mb-1">{title}</h4>
        {lines.map((l) => (
          <p key={l} className="text-sm text-gray-500">{l}</p>
        ))}
      </div>
    </div>
  );
}
