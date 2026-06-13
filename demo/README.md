# Pyrion — demo de dashboard de eficiencia (`/demo`)

Página de demostración **independiente del lander**, pensada para que Oscar y
Gonza la revisen antes de enlazarla públicamente. Se sirve junto con el sitio
(GitHub Pages) pero **no hay ningún link desde `index.html`**: sólo se llega con
la URL directa `https://www.pyrion.com.ar/demo/`.

`index.html` es **autocontenido** (Plotly se carga vía CDN; el resto —estilos,
logo, datos— va embebido). No depende de `app.js` / `styles.css` del lander.

## Qué muestra

Análisis de eficiencia energética sobre un caso real (Facultad de Cs. Químicas,
UNC). Diagnóstico en lenguaje llano, estimación ilustrativa de ahorro, perfiles
de carga, factor de potencia (cos φ) y una sección de **metodología y supuestos**
que separa explícitamente lo que es dato real de lo que es modelo preliminar.

- **Datos reales:** demanda medida cada 15 min (medidor EPEC DIGA00015218, 2023),
  tarifa oficial EPEC T3 (ERSeP 25/2026, jun-2026) y precios spot del MEM (CAMMESA).
- **Modelo preliminar:** el ahorro estimado proviene del optimizador STORM (en
  desarrollo); está rotulado como **ilustrativo y sujeto a validación** en un
  banner superior, en la sección de supuestos y al pie.

## Cómo se regenera

No se edita a mano. Lo genera un script en el repo de investigación
(`pyrion/consultora/dashboard_proto/build_dashboard.py`):

```bash
# desde pyrion/ con el venv activo (./.venv/bin/python)
python consultora/dashboard_proto/build_dashboard.py
# escribe web/pyrion-website/demo/index.html
```

Parámetros útiles: `--empresa "Nombre"`, `--scale 3 --tariff mt` (caso ×3),
`--fx 1450` (tipo de cambio ARS/USD para la columna en USD),
`--storm-low-usd / --storm-high-usd` (rango de costo optimizado).

## Ver localmente

```bash
cd web/pyrion-website && python -m http.server 8000
# abrir http://localhost:8000/demo/
```

## Deploy / revisión

Se publica solo con el resto del repo (GitHub Pages). Como no está enlazado, es
efectivamente privado-por-URL: compartir el link con Oscar/Gonza para feedback.
Cuando esté aprobado, recién ahí se decide enlazarlo desde el lander.

## Pendiente (documentado, para después)

- **"Subí tu CSV y miralo":** generalizar el dashboard para que una empresa cargue
  su propio CSV de medidor (kW 15 min + factor de potencia) y obtenga el mismo
  análisis en el navegador. Implica mover el cómputo a cliente (JS) o a un endpoint,
  y un parser de formatos de medidor. Hoy el dashboard es estático (un caso por
  archivo generado). Dejado para una iteración posterior.
