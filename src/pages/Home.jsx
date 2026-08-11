import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import { PROPERTIES } from "../data/properties";
import { PROVINCES } from "../data/provinces";

const STEPS = [
  {
    n: "01",
    title: "Selecciona el inmueble",
    text: "Explora el catálogo o el mapa nacional y elige la propiedad de tu interés.",
  },
  {
    n: "02",
    title: "Verificación KYC",
    text: "Completa el checklist de documentos y el formulario según seas persona física o jurídica.",
  },
  {
    n: "03",
    title: "Formulario de oferta",
    text: "Presenta tu oferta de compra formal ante el FDI para su evaluación.",
  },
  {
    n: "04",
    title: "Evaluación y cierre",
    text: "El fideicomiso evalúa la oferta y se procede a la firma y formalización.",
  },
];

export default function Home() {
  const destacados = PROPERTIES.filter((p) => p.destacado).slice(0, 6);
  const totalM2 = PROPERTIES.reduce((acc, p) => acc + (p.tamano || 0), 0);
  const provinciasConInventario = new Set(PROPERTIES.map((p) => p.provincia)).size;

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-950 overflow-hidden">
        <img
          src="/catalogo-inmuebles-aerea.png"
          alt=""
          width="1983"
          height="793"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,19,34,0.98)_0%,rgba(7,19,34,0.91)_38%,rgba(7,19,34,0.42)_68%,rgba(7,19,34,0.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,19,34,0.72)_0%,transparent_48%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 sm:pt-24 sm:pb-36">
          <p className="text-gold-400 font-semibold tracking-wide text-sm uppercase mb-4">
            Fideicomiso público · Decreto 581-23
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Invierte en el desarrollo de infraestructuras de República Dominicana
          </h1>
          <p className="mt-5 text-navy-200 text-lg max-w-2xl">
            El FDI comercializa terrenos, apartamentos y locales comerciales a nivel
            nacional para financiar proyectos de infraestructura del Estado dominicano.
          </p>
        </div>

      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <Stat value={`${PROPERTIES.length}+`} label="Inmuebles en cartera" />
          <Stat value={provinciasConInventario} label="Provincias con inventario" />
          <Stat value={PROVINCES.length} label="Provincias a nivel nacional" />
          <Stat value={`${Math.round(totalM2 / 1_000_000).toLocaleString("es-DO")} M`} label="m² en gestión" />
        </div>
      </section>

      {/* Sobre el Fondo */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-navy-500 font-semibold text-sm uppercase tracking-wide mb-3">Sobre el Fondo</p>
            <h2 className="text-3xl font-bold text-navy-950 mb-5">
              Fondo de Desarrollo de Infraestructuras
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              El Fondo de Desarrollo de Infraestructuras (FDI) es un fideicomiso que
              procura ser una fuente alterna de financiamiento para el desarrollo de
              infraestructuras del país, constituido mediante el Decreto 581-23 emitido
              por el Presidente Luis Abinader en noviembre de 2023.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              En todos los casos se respetan los derechos legítimos de terceros que
              hayan sido adquiridos previamente conforme a la ley.
            </p>
            <Link
              to="/sobre-el-fondo"
              className="inline-flex items-center gap-2 text-navy-800 font-semibold hover:text-navy-600 transition-colors"
            >
              Conoce más sobre el fondo
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InfoCard title="Base legal" text="Decreto 581-23 y ley aprobada por el Congreso Nacional en noviembre de 2024." />
            <InfoCard title="Administración" text="Fideicomiso administrado en conjunto con Fiduciaria Reservas." />
            <InfoCard title="Alcance" text="Inventario de inmuebles distribuido en las 32 provincias del país." />
            <InfoCard title="Transparencia" text="Proceso de comercialización público, con formularios y requisitos accesibles." />
          </div>
        </div>
      </section>

      {/* Propiedades destacadas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-navy-500 font-semibold text-sm uppercase tracking-wide mb-2">Catálogo</p>
            <h2 className="text-3xl font-bold text-navy-950">Inmuebles destacados</h2>
          </div>
          <Link to="/inmuebles" className="hidden sm:inline-flex text-navy-800 font-semibold hover:text-navy-600 transition-colors">
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destacados.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
        <div className="mt-8 sm:hidden">
          <Link to="/inmuebles" className="inline-flex text-navy-800 font-semibold hover:text-navy-600 transition-colors">
            Ver todos →
          </Link>
        </div>
      </section>

      {/* Proceso */}
      <section className="bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-gold-400 font-semibold text-sm uppercase tracking-wide mb-2">Proceso</p>
              <h2 className="text-3xl font-bold text-white">¿Cómo comprar un inmueble?</h2>
            </div>
            <Link to="/como-comprar" className="hidden sm:inline-flex text-gold-300 font-semibold hover:text-gold-200 transition-colors">
              Ver proceso completo →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div key={s.n} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <span className="text-gold-400 font-bold text-2xl">{s.n}</span>
                <h3 className="text-white font-semibold mt-3 mb-2">{s.title}</h3>
                <p className="text-navy-300 text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mapa preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-2xl bg-navy-50 border border-navy-100 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-navy-500 font-semibold text-sm uppercase tracking-wide mb-2">Cobertura nacional</p>
            <h2 className="text-3xl font-bold text-navy-950 mb-4">Explora las propiedades en el mapa</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Visualiza la ubicación exacta de cada inmueble disponible a nivel
              nacional, incluyendo las zonas no deslindadas catastral y
              registralmente dentro de las parcelas.
            </p>
            <Link
              to="/mapa"
              className="inline-flex items-center gap-2 rounded-lg bg-navy-800 hover:bg-navy-900 text-white font-semibold text-sm px-5 py-3 transition-colors"
            >
              Ver mapa completo
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="aspect-video rounded-xl bg-navy-900 flex items-center justify-center text-navy-400 border border-navy-200">
            <svg viewBox="0 0 24 24" className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M9 20l-6-3V4l6 3m0 13 6-3m-6 3V7m6 10 6 3V6l-6-3m0 17V4m0 3L9 4" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-3xl sm:text-4xl font-bold text-navy-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function InfoCard({ title, text }) {
  return (
    <div className="bg-navy-50 rounded-xl p-5 border border-navy-100">
      <h4 className="font-semibold text-navy-900 text-sm mb-2">{title}</h4>
      <p className="text-xs text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}
