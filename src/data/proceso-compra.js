// Fuente única del proceso oficial de oferta (fdi.com.do/info): la usan tanto la
// página "¿Cómo comprar?" como el panel de requisitos en la ficha de cada inmueble,
// para que ambas vistas digan siempre lo mismo.

// Portal oficial del Registro Inmobiliario (Poder Judicial, dominio .gob.do), del
// que dependen las Salas/Unidades de Consulta de la Jurisdicción Inmobiliaria.
// Se enlaza el portal general y no una herramienta interna puntual (p. ej. su
// visor de parcelas) para que el enlace no se rompa si esa herramienta cambia.
export const SALA_CONSULTAS_URL = "https://ri.gob.do";

// `docs`: identificadores de los formularios que se presentan en ese paso. Enlazan
// con la ficha correspondiente más abajo, para no obligar a buscarla a mano.
// `enlace`: recurso externo del paso, si aplica.
export const STEPS = [
  {
    n: "01",
    title: "Selecciona el inmueble",
    text: "Explora el catálogo o el mapa nacional y elige el inmueble de tu interés. Cada ficha publica su parcela y distrito catastral.",
    docs: [],
  },
  {
    n: "02",
    title: "Verifica la situación registral (recomendado)",
    text: "Con la parcela y el distrito catastral de la ficha, consulta el estado del inmueble en la Sala de Consultas de la Jurisdicción Inmobiliaria: acceso público y gratuito.",
    docs: [],
    enlace: { label: "Ir a ri.gob.do", href: SALA_CONSULTAS_URL },
  },
  {
    n: "03",
    title: "Reúne tus documentos KYC",
    text: "Completa el checklist de documentos y el formulario de tercero que corresponda a tu figura: FR-002 si ofertas como persona física, FR-003 si ofertas como persona jurídica. Si un intermediario inmobiliario te representa, también debe registrarse con su propio formulario.",
    docs: ["kyc", "fr-002", "fr-003", "intermediario"],
  },
  {
    n: "04",
    title: "Completa el formulario de oferta de compra",
    text: "Es el formulario oficial de oferta sobre el inmueble seleccionado.",
    docs: ["oferta"],
  },
  {
    n: "05",
    title: "Entrega la oferta en Fiduciaria Reservas",
    text: "Todos los documentos se presentan en formato físico —no en línea— en Av. Roberto Pastoriza No. 358, piso 8, Piantini, Distrito Nacional.",
    docs: [],
  },
  {
    n: "06",
    title: "Evaluación y decisión final",
    text: "El FDI revisa la factibilidad de la oferta y realiza la debida diligencia de la documentación. De proceder, se somete al Consejo Técnico del Fideicomiso, cuya decisión es definitiva; aprobada, se firma y formaliza la venta.",
    docs: [],
  },
];

// Mismo proceso que STEPS, pero redactado para quien ya eligió el inmueble —se usa
// en el panel de "Requisitos para ofertar" de la ficha— y solo necesita saber qué
// le falta: sin el paso de selección (ya está en la ficha), en imperativo directo
// ("debes...") en vez del tono exploratorio de la guía general, y con el documento
// de cada paso a la vista en vez de una lista aparte al final. `docs`: ids de
// DOCUMENTS que corresponden a ese paso.
export const REQUISITOS_OFERTA = [
  {
    n: "01",
    title: "Verifica la situación registral (recomendado)",
    text: "Con la parcela y el distrito catastral de esta ficha, consulta el estado en la Sala de Consultas de la Jurisdicción Inmobiliaria: acceso público y gratuito.",
    docs: [],
    enlace: { label: "Ir a ri.gob.do", href: SALA_CONSULTAS_URL },
  },
  {
    n: "02",
    title: "Debes llenar tus documentos KYC",
    text: "El checklist de documentos, más el FR-002 si ofertas como persona física o el FR-003 si es persona jurídica.",
    docs: ["kyc", "fr-002", "fr-003", "intermediario"],
  },
  {
    n: "03",
    title: "Debes completar el formulario de oferta de compra",
    text: "Formulario oficial de oferta sobre este inmueble.",
    docs: ["oferta"],
  },
  {
    n: "04",
    title: "Debes entregarla en Fiduciaria Reservas",
    text: "En formato físico —no en línea— en Av. Roberto Pastoriza No. 358, piso 8, Piantini, Distrito Nacional.",
    docs: [],
  },
  {
    n: "05",
    title: "Evaluación y decisión final",
    text: "El FDI evalúa factibilidad y hace la debida diligencia; decide el Consejo Técnico del Fideicomiso.",
    docs: [],
  },
];

// `file`: ruta pública del documento. Mientras sea null la ficha se marca como
// pendiente en vez de ofrecer un enlace que no resuelve.
export const DOCUMENTS = [
  {
    id: "kyc",
    grupo: "todos",
    corto: "Checklist KYC",
    name: "Checklist documentos KYC ofertas FDI",
    ext: "XLSX",
    file: null,
    desc: "Lista de verificación de los documentos requeridos para el proceso de conocimiento del cliente.",
  },
  {
    id: "oferta",
    grupo: "todos",
    corto: "Oferta de compra",
    name: "Formulario Oferta Compra Inmueble FDI",
    ext: "PDF",
    file: null,
    desc: "Formulario oficial para formalizar una oferta de compra sobre un inmueble del fideicomiso.",
  },
  {
    id: "fr-002",
    grupo: "oferente",
    corto: "FR-002",
    name: "FR-002 Tercero Persona Física",
    ext: "XLS",
    file: null,
    desc: "Registro del oferente cuando participa a título personal.",
  },
  {
    id: "fr-003",
    grupo: "oferente",
    corto: "FR-003",
    name: "FR-003 Tercero Persona Jurídica",
    ext: "XLS",
    file: null,
    desc: "Registro del oferente cuando participa una empresa o entidad.",
  },
  {
    id: "intermediario",
    grupo: "intermediarios",
    corto: "Registro de intermediario",
    name: "Formulario Registro Intermediario Inmobiliario FDI",
    ext: "PDF",
    file: null,
    desc: "Registro previo del agente que representa a un comprador ante el fideicomiso.",
  },
];

export const GRUPOS = [
  {
    id: "todos",
    title: "En toda oferta",
    desc: "Se presentan siempre, sea quien sea el oferente.",
  },
  {
    id: "oferente",
    title: "Según quién oferta",
    desc: "Solo el que corresponda a tu figura; no ambos.",
  },
  {
    id: "intermediarios",
    title: "Si participa un intermediario",
    desc: "Únicamente cuando un agente inmobiliario representa al comprador.",
  },
];
