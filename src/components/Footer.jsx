import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Logo variant="light" />
          <p className="mt-4 text-sm text-navy-300 leading-relaxed">
            Fideicomiso constituido mediante el Decreto 581-23, fuente alterna de
            financiamiento para el desarrollo de infraestructuras en República Dominicana.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Navegación</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-gold-300 transition-colors">Inicio</Link></li>
            <li><Link to="/inmuebles" className="hover:text-gold-300 transition-colors">Inmuebles</Link></li>
            <li><Link to="/mapa" className="hover:text-gold-300 transition-colors">Mapa</Link></li>
            <li><Link to="/como-comprar" className="hover:text-gold-300 transition-colors">¿Cómo Comprar?</Link></li>
            <li><Link to="/sobre-el-fondo" className="hover:text-gold-300 transition-colors">Sobre el Fondo</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Recursos</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/como-comprar#formularios" className="hover:text-gold-300 transition-colors">Formularios y descargas</Link></li>
            <li><Link to="/como-comprar#faq" className="hover:text-gold-300 transition-colors">Preguntas frecuentes</Link></li>
            <li>
              <a href="https://www.fiduciariareservas.com" target="_blank" rel="noreferrer" className="hover:text-gold-300 transition-colors">
                Fiduciaria Reservas ↗
              </a>
            </li>
            <li><Link to="/contacto" className="hover:text-gold-300 transition-colors">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Contacto</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="tel:8099604580" className="hover:text-gold-300 transition-colors font-semibold text-white">
                (809) 960-4580
              </a>
            </li>
            <li className="text-navy-300">info@fdi.com.do</li>
            <li className="text-navy-300">Santo Domingo, República Dominicana</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-navy-400">
          <p>Copyright © {year} FDI - Fondo de Desarrollo de Infraestructuras</p>
          <div className="flex gap-4">
            <span className="hover:text-gold-300 transition-colors cursor-pointer">Aviso Legal</span>
            <span className="hover:text-gold-300 transition-colors cursor-pointer">Política de Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
