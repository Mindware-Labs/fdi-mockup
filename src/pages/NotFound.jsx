import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <p className="text-orange-500 font-bold text-6xl mb-4">404</p>
      <h1 className="text-2xl font-bold text-navy-950 mb-3">Página no encontrada</h1>
      <p className="text-gray-500 mb-8">El contenido que buscas no existe o fue movido.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-lg bg-navy-800 shadow-[0_1px_3px_rgba(0,23,51,0.12)] hover:-translate-y-0.5 hover:bg-navy-900 hover:shadow-[0_10px_24px_-6px_rgba(0,23,51,0.4)] active:translate-y-0 active:shadow-[0_2px_6px_rgba(0,23,51,0.2)] text-white font-semibold text-sm px-6 py-3 transition-[transform,box-shadow,background-color] duration-200"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
