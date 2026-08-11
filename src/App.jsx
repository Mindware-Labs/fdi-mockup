import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Inmuebles from "./pages/Inmuebles";
import PropertyDetail from "./pages/PropertyDetail";
import Mapa from "./pages/Mapa";
import ComoComprar from "./pages/ComoComprar";
import SobreElFondo from "./pages/SobreElFondo";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/inmuebles" element={<Inmuebles />} />
        <Route path="/inmuebles/:id" element={<PropertyDetail />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/como-comprar" element={<ComoComprar />} />
        <Route path="/sobre-el-fondo" element={<SobreElFondo />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
