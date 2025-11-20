# Roman Numeral Converter API

Una API REST para convertir números arábigos a romanos y viceversa.

## Características

- Conversión de números arábigos (1-3999) a romanos
- Conversión de números romanos a arábigos (I-MMMCMXCIX)
- Validación de entrada
- Manejo de errores
- CORS habilitado

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar en desarrollo:
```bash
npm run dev
```

3. Ejecutar en producción:
```bash
npm start
```

## Endpoints

### GET /a2r?arabic=123
Convierte número arábigo a romano.

**Ejemplo de respuesta:**
```json
{
  "arabic": 123,
  "roman": "CXXIII"
}
```

### GET /r2a?roman=CXXIII
Convierte número romano a arábigo.

**Ejemplo de respuesta:**
```json
{
  "roman": "CXXIII",
  "arabic": 123
}
```

### GET /health
Verifica el estado del servidor.

## Tecnologías

- Node.js
- Express.js
- CORS
