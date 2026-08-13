# Capas cartográficas — qué debe entregar el FDI

El mapa de `/mapa` ya tiene el mecanismo de capas terminado: filtros, pintado por
categoría, leyenda y estado en la URL. Lo único que falta son **los datos reales**.

Mientras no estén, cada capa se dibuja con una geometría esquemática que la
interfaz rotula como **«muestra»** y traza en discontinuo, para que nadie
confunda el maquetado con cartografía oficial.

## Cómo se activan los datos reales

Dos pasos, sin tocar código:

1. Dejar el archivo en esta carpeta con el nombre exacto de la tabla.
2. Añadir el `id` de esa capa al array `oficiales` de [`manifest.json`](manifest.json).

Al cargar, el mapa lee el manifiesto, descarga solo lo declarado, comprueba que
sea un `FeatureCollection` válido y sustituye la muestra. Si el archivo falta o
viene mal formado, esa capa vuelve sola a la muestra en vez de quedarse vacía.

| `id` | Archivo esperado | Capa | Geometría | Organismo que la publica |
|---|---|---|---|---|
| `areas-protegidas` | `areas-protegidas.geojson` | Áreas protegidas y especiales | Polygon / MultiPolygon | Ministerio de Medio Ambiente y Recursos Naturales |
| `transmision` | `lineas-transmision.geojson` | Líneas de transmisión eléctrica | LineString / MultiLineString | ETED |
| `mineria` | `concesiones-mineras.geojson` | Concesiones de explotación minera | Polygon / MultiPolygon | Ministerio de Energía y Minas · DGM |
| `hidrocarburos` | `gasoductos-oleoductos.geojson` | Gasoductos y oleoductos | LineString / MultiLineString | Ministerio de Energía y Minas |
| `energia` | `concesiones-energeticas.geojson` | Concesiones energéticas definitivas | Polygon / MultiPolygon | Comisión Nacional de Energía |

Ejemplo de `manifest.json` con dos capas ya recibidas:

```json
{ "oficiales": ["transmision", "hidrocarburos"] }
```

## Formato

- **GeoJSON** (`.geojson`), un `FeatureCollection` por archivo.
- **EPSG:4326** (WGS 84), coordenadas en grados decimales y orden `[longitud, latitud]`.
  Si el FDI lo entrega en Shapefile, KML o EPSG:32619 (UTM 19N), se convierte al
  recibirlo; conviene pedir de una vez el sistema de referencia por escrito.
- Sin `Z` ni valores `null` en las coordenadas.
- Recomendable simplificar la geometría a ~10 m de tolerancia: son capas de
  consulta visual, no de medición, y el peso del archivo se nota al cargar.

## Atributos que usa el mapa

Solo dos capas necesitan un atributo concreto, porque de él sale el color:

**`lineas-transmision.geojson`** → `kv` (número): `69`, `138`, `230` o `345`.

```json
{ "type": "Feature",
  "properties": { "nombre": "Palamara – Bonao", "kv": 345 },
  "geometry": { "type": "LineString", "coordinates": [[-69.95, 18.50], [-70.41, 18.94]] } }
```

**`concesiones-energeticas.geojson`** → `fuente` (texto), exactamente uno de:
`Eólica`, `Solar fotovoltaica`, `Minihidráulica`, `Biomasa`, `RSU`.

```json
{ "type": "Feature",
  "properties": { "nombre": "Parque eólico Matafongo", "fuente": "Eólica" },
  "geometry": { "type": "Polygon", "coordinates": [[[-70.49, 18.20], "…"]] } }
```

Las otras tres capas se pintan de un solo color y no dependen de ningún atributo.
En todas conviene incluir `nombre` (texto), que es lo que se mostrará al pinchar
una geometría cuando se añada esa interacción.

Cualquier atributo adicional que traigan los archivos (expediente, resolución,
vigencia, titular) se conserva sin estorbar, y son buenos candidatos para la
ficha emergente de la siguiente iteración.

## Qué pedirle al FDI, en una línea

> Los cinco archivos de la tabla en GeoJSON EPSG:4326, con el atributo `kv` en
> transmisión y `fuente` en concesiones energéticas, más la fecha de corte de
> cada capa y quién la publica, para poder citarla en el mapa.

## Ajustar el catálogo

Nombres, colores, descripciones, leyendas y la geometría de muestra viven en un
único sitio: [`web/src/data/mapLayers.js`](../../src/data/mapLayers.js). Añadir
una sexta capa es añadir una entrada a ese array.
