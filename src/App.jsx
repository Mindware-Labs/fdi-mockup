import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import PropertyDetail from "./pages/PropertyDetail";
import ComoComprar from "./pages/ComoComprar";
import SobreElFondo from "./pages/SobreElFondo";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";

// Mapbox GL pesa ~500 kB gzip: se carga solo al entrar a /mapa, no en cada página del sitio.
const Mapa = lazy(() => import("./pages/Mapa"));
// Headless UI (selects de filtros) se carga solo al entrar al catálogo.
const Inmuebles = lazy(() => import("./pages/Inmuebles"));

function RouteFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gray-50">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy-200 border-t-navy-700" />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/inmuebles"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Inmuebles />
            </Suspense>
          }
        />
        <Route path="/inmuebles/:id" element={<PropertyDetail />} />
        <Route
          path="/mapa"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Mapa />
            </Suspense>
          }
        />
        <Route path="/como-comprar" element={<ComoComprar />} />
        <Route path="/sobre-el-fondo" element={<SobreElFondo />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
