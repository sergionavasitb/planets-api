# 🪐 Planets API v2.0

API REST completa del Sistema Solar con **modelos 3D GLB**, datos científicos y fotos reales.

## Instalación

```bash
npm install
npm start
# → http://localhost:3000
```

## Estructura del proyecto

```
planets-api/
├── server.js        ← API principal
├── package.json
├── README.md
└── models/          ← 12 archivos GLB
    ├── mercurio.glb
    ├── venus_.glb
    ├── tierra.glb
    ├── marte.glb
    ├── jupiter.glb
    ├── saturno.glb
    ├── uranus.glb
    ├── neptune.glb
    ├── pluto.glb
    ├── moon.glb
    ├── sun.glb
    └── galaxia.glb
```

## Endpoints principales

| Ruta | Descripción |
|------|-------------|
| `GET /v1/bodies` | Todos los cuerpos (planetas + Sol + Luna + Plutón + Galaxia) |
| `GET /v1/bodies/:id` | Datos completos + model_url del GLB |
| `GET /v1/bodies/:id/model` | Redirige directamente al .glb |
| `GET /v1/planets` | Solo los 8 planetas |
| `GET /v1/planets/:id` | Datos de un planeta |
| `GET /v1/search?name=marte` | Búsqueda por nombre |
| `GET /v1/compare?a=earth&b=mars` | Comparar dos cuerpos |
| `GET /v1/stats` | Estadísticas generales |
| `GET /models/tierra.glb` | Archivo GLB directo |

## IDs válidos

`sun` `mercury` `venus` `earth` `moon` `mars` `jupiter` `saturn` `uranus` `neptune` `pluto` `milky_way`

## Usar el GLB en Three.js

```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const loader = new GLTFLoader();
loader.load('https://tu-api.railway.app/models/tierra.glb', (gltf) => {
  scene.add(gltf.scene);
});
```

## Usar con model-viewer (HTML)

```html
<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
<model-viewer src="https://tu-api.railway.app/models/tierra.glb" auto-rotate camera-controls></model-viewer>
```

## Deploy

1. Sube todo a GitHub **incluyendo la carpeta `models/`**
2. Conecta en [railway.app](https://railway.app) o [render.com](https://render.com)
3. Start command: `node server.js`

> ⚠️ Los GLB son pesados. Si alguno supera 100MB usa [Git LFS](https://git-lfs.github.com/).
