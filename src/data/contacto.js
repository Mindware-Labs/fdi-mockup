/**
 * Datos de contacto del fideicomiso, en un solo sitio.
 *
 * Antes estaban escritos a mano en siete archivos —pie de página, cabecera,
 * botón flotante, contacto, ficha de inmueble y los raíles de las dos páginas
 * institucionales—: diecisiete literales que había que cambiar uno a uno y de
 * los que era cuestión de tiempo que alguno se quedara viejo.
 *
 * El número se declara una vez en crudo; el texto que se ve y los enlaces
 * `tel:` y de WhatsApp se derivan de él.
 */

const TELEFONO_NACIONAL = "8099604580";
const TELEFONO_E164 = `1${TELEFONO_NACIONAL}`; // República Dominicana: +1

const formatearRD = (n) => `(${n.slice(0, 3)}) ${n.slice(3, 6)}-${n.slice(6)}`;

export const TELEFONO = {
  texto: formatearRD(TELEFONO_NACIONAL),
  href: `tel:${TELEFONO_NACIONAL}`,
};

export const WHATSAPP = {
  texto: formatearRD(TELEFONO_NACIONAL),
  href: `https://wa.me/${TELEFONO_E164}`,
  /** Mismo chat, con el mensaje ya escrito. */
  conMensaje: (mensaje) =>
    `https://wa.me/${TELEFONO_E164}?text=${encodeURIComponent(mensaje)}`,
};

export const CORREO = {
  texto: "info@fdi.com.do",
  href: "mailto:info@fdi.com.do",
};

export const HORARIO = "Lunes a viernes, 8:00am – 5:00pm";

/**
 * La coordenada sale de geocodificar la dirección con la API de Mapbox, no de
 * una estimación: la respuesta fue una coincidencia a nivel de número
 * ("Avenida Ingeniero Roberto Pastoriza 358, Santo Domingo de Guzmán,
 * Distrito Nacional"). Si el FDI confirma otra entrada al edificio, se ajusta
 * aquí y se propaga sola.
 */
export const OFICINA = {
  nombre: "Torre Roberto Pastoriza",
  calle: "Av. Roberto Pastoriza 358",
  ciudad: "Santo Domingo, RD 10127",
  lat: 18.469094,
  lng: -69.932304,
};

export const OFICINA_LINEAS = [OFICINA.nombre, OFICINA.calle, OFICINA.ciudad];

export const COMO_LLEGAR_URL = `https://www.google.com/maps/search/?api=1&query=${OFICINA.lat},${OFICINA.lng}`;
