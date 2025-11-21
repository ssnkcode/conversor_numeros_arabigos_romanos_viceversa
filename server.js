const express = require('express');
const cors = require('cors');
const RomanConverter = require('./romanConverter');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json());

// Middleware de logging para debugging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Ruta: Arábigo a Romano
app.get('/a2r', (req, res) => {
    try {
        const arabicParam = req.query.arabic;
        const arabic = parseInt(arabicParam);
        
        // Validar que sea solo números
        if (arabicParam && !/^-?\d+$/.test(arabicParam)) {
            return res.status(400).json({
                error: 'Parámetro "arabic" inválido',
                message: 'El parámetro "arabic" debe ser un número entero válido'
            });
        }
        
        if (!req.query.arabic || isNaN(arabic)) {
            return res.status(400).json({
                error: 'Parámetro "arabic" ausente o inválido',
                message: 'El parámetro "arabic" debe ser un número entero entre 1 y 3999'
            });
        }

        if (!RomanConverter.isValidArabic(arabic)) {
            return res.status(400).json({
                error: 'Número arábigo fuera de rango',
                message: 'El número debe estar entre 1 y 3999 inclusive'
            });
        }

        const roman = RomanConverter.arabicToRoman(arabic);
        
        res.status(200).json({
            arabic: arabic,
            roman: roman
        });

    } catch (error) {
        console.error('Error en /a2r:', error);
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error inesperado'
        });
    }
});

// Ruta: Romano a Arábigo
app.get('/r2a', (req, res) => {
    try {
        const roman = req.query.roman;
        
        if (!roman || typeof roman !== 'string') {
            return res.status(400).json({
                error: 'Parámetro "roman" ausente o inválido',
                message: 'El parámetro "roman" debe ser una cadena de texto válida'
            });
        }

        if (!RomanConverter.isValidRoman(roman)) {
            return res.status(400).json({
                error: 'Número romano inválido',
                message: 'El número romano debe ser válido y estar entre I y MMMCMXCIX (1-3999)'
            });
        }

        const arabic = RomanConverter.romanToArabic(roman);
        
        if (arabic === null) {
            return res.status(400).json({
                error: 'Conversión fallida',
                message: 'No se pudo convertir el número romano a arábigo'
            });
        }

        res.status(200).json({
            roman: roman.toUpperCase(),
            arabic: arabic
        });

    } catch (error) {
        console.error('Error en /r2a:', error);
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error inesperado'
        });
    }
});

// Ruta de salud (health check)
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'API de conversión de números romanos funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// Ruta 404 para manejar rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        message: `La ruta ${req.originalUrl} no existe en este servidor`
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log('📊 Endpoints disponibles:');
    console.log(`   GET /a2r?arabic=123 → Convierte arábigo a romano`);
    console.log(`   GET /r2a?roman=CXXIII → Convierte romano a arábigo`);
    console.log(`   GET /health → Verifica el estado del servidor`);
});

module.exports = app;
