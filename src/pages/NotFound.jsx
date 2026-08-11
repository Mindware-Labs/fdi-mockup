import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <p className="text-gold-500 font-bold text-6xl mb-4">404</p>
      <h1 className="text-2xl font-bold text-navy-950 mb-3">Página no encontrada</h1>
      <p className="text-gray-500 mb-8">El contenido que buscas no existe o fue movido.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-lg bg-navy-800 hover:bg-navy-900 text-white font-semibold text-sm px-6 py-3 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
