import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <p className="text-sky-500 font-bold text-6xl mb-4">404</p>
      <h1 className="text-2xl font-bold text-navy-950 mb-3">Página no encontrada</h1>
      <p className="text-gray-500 mb-8">El contenido que buscas no existe o fue movido.</p>
      <Button as={Link} to="/" variant="secondary" icon={ArrowRight}>
        Volver al inicio
      </Button>
    </div>
  );
}
