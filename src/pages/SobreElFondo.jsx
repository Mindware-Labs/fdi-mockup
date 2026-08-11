const PILLARS = [
  {
    title: "Misión",
    text: "Constituir una fuente alterna de financiamiento para el desarrollo de infraestructuras públicas de la República Dominicana.",
  },
  {
    title: "Base legal",
    text: "Fideicomiso constituido mediante el Decreto 581-23, emitido por el Presidente Luis Abinader en noviembre de 2023.",
  },
  {
    title: "Respaldo legislativo",
    text: "Iniciativa aprobada por el Congreso Nacional en noviembre de 2024, en cumplimiento de la Constitución de la República.",
  },
  {
    title: "Gobernanza",
    text: "Administrado en conjunto con Fiduciaria Reservas, bajo los principios de transparencia del sistema fiduciario dominicano.",
  },
];

export default function SobreElFondo() {
  return (
    <div>
      <section className="bg-navy-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-gold-400 font-semibold text-sm uppercase tracking-wide mb-3">Sobre el Fondo</p>
          <h1 className="text-4xl font-bold text-white mb-5 max-w-2xl">
            Fondo de Desarrollo de Infraestructuras
          </h1>
          <p className="text-navy-200 max-w-2xl leading-relaxed">
            El Fondo de Desarrollo de Infraestructuras (FDI) es un fideicomiso que
            procura ser una fuente alterna de financiamiento para el desarrollo de
            infraestructuras del país, a través de la comercialización de un
            portafolio de inmuebles a nivel nacional.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PILLARS.map((p) => (
            <div key={p.title} className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-navy-900 mb-2">{p.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-navy-950 mb-4">Respeto a derechos de terceros</h2>
          <p className="text-gray-600 leading-relaxed">
            En todos los casos se respetan los derechos legítimos de terceros que
            hayan sido adquiridos y que se encuentren debidamente amparados
            conforme a la legislación dominicana vigente, previo a la
            constitución e inventario del fideicomiso.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-navy-950 mb-4">Transparencia</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          El proceso de comercialización de inmuebles del FDI es público y se
          rige por formularios y requisitos disponibles para cualquier
          interesado, incluyendo procesos de verificación KYC para personas
          físicas y jurídicas.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MiniStat label="Sala de Consultas" value="Jurisdicción Inmobiliaria" />
          <MiniStat label="Proceso" value="Público y documentado" />
          <MiniStat label="Administración" value="Fiduciaria Reservas" />
        </div>
      </section>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="bg-navy-50 border border-navy-100 rounded-xl p-5 text-center">
      <p className="text-xs text-navy-500 uppercase tracking-wide mb-1">{label}</p>
      <p className="font-semibold text-navy-900">{value}</p>
    </div>
  );
}
