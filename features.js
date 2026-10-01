// ============================================================
// MI CAMPO INTELIGENTE — Features: Auth, Dashboard, Marketplace
// ============================================================

(function() {
    'use strict';

    // ======================== AUTH STATE ========================
    const DEFAULT_FARMER = {
        name: 'Juan Pérez',
        email: 'juan@ejemplo.com',
        location: 'San Martín Texmelucan, Puebla',
        type: 'agricultor',
        avatar: '👨‍🌾'
    };

    let currentUser = null;

    // ======================== FARMER CROPS DATA ========================
    const FARMER_CROPS = [
        {
            id: 1,
            name: 'Maíz Amarillo',
            variety: 'DK-4018',
            icon: '🌽',
            thumbBg: 'linear-gradient(135deg, #F59E0B, #D97706)',
            plantingDate: '2026-03-10',
            harvestDate: '2026-06-12',
            totalDays: 94,
            elapsedDays: 80,
            surface: 2.5,
            yieldPerHa: 8.5,
            pricePerTon: 8400,
            status: 'growing',
            statusLabel: 'En desarrollo',
            description: 'El maíz amarillo se encuentra en etapa de llenado de grano. Mantén el riego y monitoreo para asegurar una buena cosecha.',
            drone: {
                lastScan: '2026-05-28',
                ndvi: 0.78,
                healthScore: 85,
                soilHumidity: 62,
                temperature: 24,
                pestRisk: 'Bajo',
                irrigationStatus: 'Óptimo',
                nitrogenLevel: 'Adecuado',
                ndviHistory: [
                    { week: 'Sem 1', value: 0.35 }, { week: 'Sem 2', value: 0.42 },
                    { week: 'Sem 3', value: 0.51 }, { week: 'Sem 4', value: 0.58 },
                    { week: 'Sem 5', value: 0.65 }, { week: 'Sem 6', value: 0.71 },
                    { week: 'Sem 7', value: 0.75 }, { week: 'Sem 8', value: 0.78 }
                ],
                alerts: [
                    { type: 'success', text: '✅ Salud del cultivo: Óptima' },
                    { type: 'info', text: 'ℹ️ Próximo riego programado: 30 May 2026' },
                    { type: 'info', text: '📡 Último escaneo del dron: 28 May 2026' }
                ]
            }
        },
        {
            id: 2,
            name: 'Aguacate Hass',
            variety: 'Hass Méndez',
            icon: '🥑',
            thumbBg: 'linear-gradient(135deg, #4A8C5C, #2D6B3F)',
            plantingDate: '2025-10-15',
            harvestDate: '2026-08-25',
            totalDays: 314,
            elapsedDays: 226,
            surface: 1.8,
            yieldPerHa: 12,
            pricePerTon: 44000,
            status: 'growing',
            statusLabel: 'En desarrollo',
            description: 'El aguacate Hass se encuentra en etapa de desarrollo de fruto. La floración fue exitosa y se observa buen cuajado.',
            drone: {
                lastScan: '2026-05-27',
                ndvi: 0.82,
                healthScore: 92,
                soilHumidity: 55,
                temperature: 22,
                pestRisk: 'Bajo',
                irrigationStatus: 'Óptimo',
                nitrogenLevel: 'Alto',
                ndviHistory: [
                    { week: 'Sem 1', value: 0.70 }, { week: 'Sem 2', value: 0.72 },
                    { week: 'Sem 3', value: 0.74 }, { week: 'Sem 4', value: 0.76 },
                    { week: 'Sem 5', value: 0.78 }, { week: 'Sem 6', value: 0.80 },
                    { week: 'Sem 7', value: 0.81 }, { week: 'Sem 8', value: 0.82 }
                ],
                alerts: [
                    { type: 'success', text: '✅ Cultivo en excelente estado' },
                    { type: 'warning', text: '⚠️ Monitorear trips del aguacate esta semana' },
                    { type: 'info', text: '📡 Último escaneo del dron: 27 May 2026' }
                ]
            }
        },
        {
            id: 3,
            name: 'Tomate Saladette',
            variety: 'El Cid F1',
            icon: '🍅',
            thumbBg: 'linear-gradient(135deg, #EF4444, #DC2626)',
            plantingDate: '2026-02-20',
            harvestDate: '2026-06-05',
            totalDays: 105,
            elapsedDays: 98,
            surface: 0.8,
            yieldPerHa: 45,
            pricePerTon: 18750,
            status: 'ready',
            statusLabel: 'Listo para cosecha',
            description: 'El tomate saladette ha alcanzado madurez fisiológica. Se recomienda iniciar la cosecha escalonada para maximizar calidad.',
            drone: {
                lastScan: '2026-05-28',
                ndvi: 0.65,
                healthScore: 78,
                soilHumidity: 48,
                temperature: 26,
                pestRisk: 'Medio',
                irrigationStatus: 'Reducir',
                nitrogenLevel: 'Medio',
                ndviHistory: [
                    { week: 'Sem 1', value: 0.72 }, { week: 'Sem 2', value: 0.75 },
                    { week: 'Sem 3', value: 0.78 }, { week: 'Sem 4', value: 0.76 },
                    { week: 'Sem 5', value: 0.73 }, { week: 'Sem 6', value: 0.70 },
                    { week: 'Sem 7', value: 0.67 }, { week: 'Sem 8', value: 0.65 }
                ],
                alerts: [
                    { type: 'warning', text: '⚠️ Riesgo medio de plagas: monitorear mosca blanca' },
                    { type: 'success', text: '✅ Frutos en madurez óptima para cosecha' },
                    { type: 'info', text: '💧 Reducir riego — etapa de maduración' }
                ]
            }
        },
        {
            id: 4,
            name: 'Frijol Negro',
            variety: 'Negro Jamapa',
            icon: '🫘',
            thumbBg: 'linear-gradient(135deg, #78350F, #451A03)',
            plantingDate: '2026-04-01',
            harvestDate: '2026-07-15',
            totalDays: 105,
            elapsedDays: 58,
            surface: 3.0,
            yieldPerHa: 1.8,
            pricePerTon: 30000,
            status: 'growing',
            statusLabel: 'En floración',
            description: 'El frijol negro se encuentra en etapa de floración. Es importante mantener la humedad y vigilar la presencia de trips y áfidos.',
            drone: {
                lastScan: '2026-05-28',
                ndvi: 0.68,
                healthScore: 80,
                soilHumidity: 58,
                temperature: 23,
                pestRisk: 'Bajo',
                irrigationStatus: 'Óptimo',
                nitrogenLevel: 'Adecuado',
                ndviHistory: [
                    { week: 'Sem 1', value: 0.20 }, { week: 'Sem 2', value: 0.30 },
                    { week: 'Sem 3', value: 0.40 }, { week: 'Sem 4', value: 0.50 },
                    { week: 'Sem 5', value: 0.58 }, { week: 'Sem 6', value: 0.63 },
                    { week: 'Sem 7', value: 0.66 }, { week: 'Sem 8', value: 0.68 }
                ],
                alerts: [
                    { type: 'success', text: '✅ Floración activa — buen cuajado observado' },
                    { type: 'info', text: 'ℹ️ Aplicar fertilizante foliar esta semana' },
                    { type: 'info', text: '📡 Último escaneo del dron: 28 May 2026' }
                ]
            }
        },
        {
            id: 5,
            name: 'Rosa Tallo Largo',
            variety: 'Freedom Red',
            icon: '🌹',
            thumbBg: 'linear-gradient(135deg, #EC4899, #BE185D)',
            plantingDate: '2026-01-10',
            harvestDate: '2026-06-10',
            totalDays: 151,
            elapsedDays: 139,
            surface: 0.5,
            yieldPerHa: null,
            pricePerTon: null,
            estimatedEarnings: 125000,
            status: 'growing',
            statusLabel: 'En producción continua',
            description: 'Producción continua en invernadero. Se cosechan tallos diariamente. Calidad premium para exportación.',
            drone: {
                lastScan: '2026-05-28',
                ndvi: 0.85,
                healthScore: 95,
                soilHumidity: 70,
                temperature: 20,
                pestRisk: 'Bajo',
                irrigationStatus: 'Óptimo',
                nitrogenLevel: 'Óptimo',
                ndviHistory: [
                    { week: 'Sem 1', value: 0.80 }, { week: 'Sem 2', value: 0.82 },
                    { week: 'Sem 3', value: 0.83 }, { week: 'Sem 4', value: 0.84 },
                    { week: 'Sem 5', value: 0.84 }, { week: 'Sem 6', value: 0.85 },
                    { week: 'Sem 7', value: 0.85 }, { week: 'Sem 8', value: 0.85 }
                ],
                alerts: [
                    { type: 'success', text: '✅ Invernadero en condiciones ideales' },
                    { type: 'success', text: '✅ Calidad de tallo: Premium' },
                    { type: 'info', text: '📦 76 gruesas cosechadas esta semana' }
                ]
            }
        }
    ];

    // ======================== MARKETPLACE DATA ========================
    const MARKETPLACE_PRODUCTS = [
        {
                    id: 1, name: 'Maíz Blanco Premium', category: 'Granos', icon: 'img/maiz.png',
                    imgBg: 'linear-gradient(135deg, #FDE68A, #F59E0B)',
                    price: 420, unit: 'Bulto 50 kg', minOrderVal: 10, minOrderText: '10 bultos', available: 500,
                    seller: { name: 'Juan Pérez', location: 'San Martín Texmelucan, Puebla', avatar: '👨‍🌾', rating: 4.8, reviews: 24, totalSales: 156, memberSince: '2024' },
                    verified: true, organic: false, harvestDate: '2026-05-15',
                    passportImg: 'img/pasaporte-digital.jpg',
                    originCoords: [19.2842, -98.4347],
                    description: 'Maíz blanco de primera calidad, ideal para tortilla y masa. Grano limpio, uniforme, libre de plagas. Cultivado con prácticas sustentables en la región de Puebla.',
                    specs: { Humedad: '14%', Impurezas: '<1%', 'Grano dañado': '<2%', Aflatoxinas: '<2 ppb' },
                    reviewsList: [
                        { author: 'Alfonso G.', stars: 5, comment: 'Excelente calidad de maíz blanco, limpio y seco. Muy recomendado.', date: '2026-05-20' },
                        { author: 'Beatriz M.', stars: 4, comment: 'Buen grano, la entrega se hizo a tiempo en la Central de Abasto.', date: '2026-05-28' }
                    ]
                },
        {
                    id: 4, name: 'Frijol Negro Jamapa', category: 'Granos', icon: 'img/frijol.png',
                    imgBg: 'linear-gradient(135deg, #A3A3A3, #525252)',
                    price: 1500, unit: 'Bulto 50 kg', minOrderVal: 5, minOrderText: '5 bultos', available: 200,
                    seller: { name: 'Pedro López', location: 'Tehuacán, Puebla', avatar: '👨‍🌾', rating: 4.6, reviews: 18, totalSales: 98, memberSince: '2024' },
                    verified: true, organic: false, harvestDate: '2026-05-10',
                    passportImg: 'img/pasaporte-frijol.jpg',
                    originCoords: [18.4631, -97.3928],
                    description: 'Frijol negro variedad Jamapa, grano pequeño, brillante. Excelente sabor y textura al cocinar. Producto de la cosecha primavera-verano 2026.',
                    specs: { Variedad: 'Jamapa', Humedad: '<14%', Impurezas: '<1%', 'Tiempo cocción': '45-60 min' },
                    reviewsList: [
                        { author: 'Arturo L.', stars: 5, comment: 'Frijol de cocción rápida y sabor tradicional delicioso.', date: '2026-05-18' }
                    ]
                },
        {
                    id: 6, name: 'Amaranto Orgánico', category: 'Granos', icon: 'img/amaranto.png',
                    imgBg: 'linear-gradient(135deg, #FDE68A, #C8952E)',
                    price: 25000, unit: 'Tonelada', minOrderVal: 1, minOrderText: '1 tonelada', available: 8,
                    seller: { name: 'Carlos Hernández', location: 'Tochimilco, Puebla', avatar: '👨‍🌾', rating: 4.8, reviews: 31, totalSales: 78, memberSince: '2024' },
                    verified: true, organic: true, harvestDate: '2026-04-20',
                    passportImg: 'img/pasaporte-amaranto.jpg',
                    originCoords: [18.8914, -98.5721],
                    description: 'Amaranto orgánico certificado. Grano limpio, alto contenido proteico. Ideal para la industria alimentaria, exportación y productos de alegría.',
                    specs: { Proteína: '>15%', Humedad: '<12%', Certificación: 'Orgánico MX', Uso: 'Alimentario/Industrial' },
                    reviewsList: [
                        { author: 'Fernando H.', stars: 5, comment: 'Excelente amaranto orgánico, limpio y con excelente rendimiento para panificación.', date: '2026-05-02' }
                    ]
                },
        {
                    id: 5, name: 'Rosa Freedom Tallo Largo', category: 'Flores', icon: 'img/rosa.png',
                    imgBg: 'linear-gradient(135deg, #FDA4AF, #E11D48)',
                    price: 750, unit: 'Gruesa (12 docenas)', minOrderVal: 5, minOrderText: '5 gruesas', available: 80,
                    seller: { name: 'Ana Martínez', location: 'Villa Guerrero, Edo. Méx.', avatar: '👩‍🌾', rating: 4.9, reviews: 53, totalSales: 445, memberSince: '2022' },
                    verified: true, organic: false, harvestDate: '2026-05-28',
                    passportImg: 'img/pasaporte-rosa.jpg',
                    originCoords: [18.9619, -99.6397],
                    description: 'Rosa roja Freedom, tallo de 60-70cm, botón grande y firme. Ideal para arreglos florales, eventos y exportación. Vida en florero de 12-15 días.',
                    specs: { Variedad: 'Freedom', Tallo: '60-70 cm', Botón: 'Grande (5-6 cm)', 'Vida florero': '12-15 días' },
                    reviewsList: [
                        { author: 'Marta J.', stars: 5, comment: 'Los tallos son muy largos y los botones abren hermosos. La mejor calidad de Villa Guerrero.', date: '2026-05-31' }
                    ]
                },
        {
                    id: 2, name: 'Aguacate Hass Extra', category: 'Frutas', icon: 'img/aguacate.png',
                    imgBg: 'linear-gradient(135deg, #86EFAC, #22C55E)',
                    price: 44000, unit: 'Tonelada', minOrderVal: 1, minOrderText: '1 tonelada', available: 12,
                    seller: { name: 'María González', location: 'Uruapan, Michoacán', avatar: '👩‍🌾', rating: 4.9, reviews: 67, totalSales: 312, memberSince: '2023' },
                    verified: true, organic: true, harvestDate: '2026-05-20',
                    originCoords: [19.4124, -102.0518],
                    description: 'Aguacate Hass de exportación, calibre extra (170-220g). Maduración controlada, excelente contenido de aceite. Certificación orgánica USDA.',
                    specs: { Calibre: 'Extra (170-220g)', Aceite: '>23%', 'Materia seca': '>21%', Certificación: 'USDA Organic' },
                    reviewsList: [
                        { author: 'Ricardo T.', stars: 5, comment: 'Calidad inmejorable, cremoso y con excelente maduración.', date: '2026-05-25' },
                        { author: 'Clara S.', stars: 5, comment: 'Certificación orgánica comprobada. Un éxito para mi tienda gourmet.', date: '2026-06-02' }
                    ]
                },
        {
                    id: 3, name: 'Tomate Saladette Primera', category: 'Hortalizas', icon: 'img/tomate.png',
                    imgBg: 'linear-gradient(135deg, #FCA5A5, #EF4444)',
                    price: 378, unit: 'Caja 12 kg', minOrderVal: 20, minOrderText: '20 cajas', available: 45,
                    seller: { name: 'Roberto Sánchez', location: 'Culiacán, Sinaloa', avatar: '👨‍🌾', rating: 4.7, reviews: 42, totalSales: 289, memberSince: '2023' },
                    verified: true, organic: false, harvestDate: '2026-05-28',
                    originCoords: [24.8090, -107.3940],
                    description: 'Tomate saladette tipo roma, firme, color rojo uniforme. Ideal para restaurantes y distribuidores. Vida de anaquel de 10-14 días.',
                    specs: { Tamaño: 'Grande (>6cm)', Firmeza: 'Alta', Color: 'Rojo uniforme', 'Vida anaquel': '10-14 días' },
                    reviewsList: [
                        { author: 'Guillermo F.', stars: 4, comment: 'Tomate firme y con buen color. Solo dos cajas llegaron un poco maduras de más.', date: '2026-05-30' },
                        { author: 'Elena P.', stars: 5, comment: 'Excelente vida de anaquel, ideal para mis clientes de comedores.', date: '2026-06-03' }
                    ]
                },
        {
                    id: 7, name: 'Chile Poblano Fresco', category: 'Hortalizas', icon: 'img/chile.png',
                    imgBg: 'linear-gradient(135deg, #86EFAC, #15803D)',
                    price: 35, unit: 'kg', minOrderVal: 100, minOrderText: '100 kg', available: 2000,
                    seller: { name: 'Luis Ramírez', location: 'San Martín Texmelucan, Puebla', avatar: '👨‍🌾', rating: 4.5, reviews: 15, totalSales: 67, memberSince: '2025' },
                    verified: false, organic: false, harvestDate: '2026-05-25',
                    originCoords: [19.2842, -98.4347],
                    description: 'Chile poblano fresco, tamaño grande, color verde oscuro brillante. Ideal para chiles rellenos y rajas. Directamente del campo a tu negocio.',
                    specs: { Tamaño: 'Grande (>15cm)', Picor: 'Suave (1000-2000 SHU)', Color: 'Verde oscuro', Frescura: 'Cosecha del día' },
                    reviewsList: [
                        { author: 'Jaime V.', stars: 4, comment: 'Chiles muy grandes y con buen brillo. Justo lo que necesitaba para temporada.', date: '2026-05-28' }
                    ]
                },
        {
                    id: 8, name: 'Cempasúchil Premium', category: 'Flores', icon: 'img/cempasuchil.png',
                    imgBg: 'linear-gradient(135deg, #FDBA74, #EA580C)',
                    price: 180, unit: 'Manojo (20 tallos)', minOrderVal: 30, minOrderText: '30 manojos', available: 500,
                    seller: { name: 'Guadalupe Torres', location: 'Atlixco, Puebla', avatar: '👩‍🌾', rating: 4.7, reviews: 28, totalSales: 134, memberSince: '2023' },
                    verified: true, organic: true, harvestDate: '2026-05-28',
                    originCoords: [18.9036, -98.4328],
                    description: 'Flor de cempasúchil de tallo largo, color anaranjado intenso. Cultivo orgánico. Disponible para temporada de Día de Muertos y uso ornamental.',
                    specs: { Tallo: '50-60 cm', Flor: '8-10 cm diámetro', Color: 'Anaranjado intenso', Certificación: 'Orgánico' },
                    reviewsList: [
                        { author: 'Patricia R.', stars: 5, comment: 'Color vibrante y aroma muy potente. El año pasado fue un éxito.', date: '2026-05-30' }
                    ]
                },
        {
                    id: 9, name: 'Cebolla Blanca', category: 'Hortalizas', icon: 'img/cebolla.png',
                    imgBg: 'linear-gradient(135deg, #FEF3C7, #D97706)',
                    price: 22, unit: 'kg', minOrderVal: 200, minOrderText: '200 kg', available: 5000,
                    seller: { name: 'Francisco Díaz', location: 'Chiautla de Tapia, Puebla', avatar: '👨‍🌾', rating: 4.4, reviews: 12, totalSales: 45, memberSince: '2025' },
                    verified: false, organic: false, harvestDate: '2026-05-22',
                    originCoords: [18.3039, -98.6019],
                    description: 'Cebolla blanca jumbo, firme y de buen sabor. Ideal para restaurantes, fondas y comercio al mayoreo. Empaque en costal de 25 kg.',
                    specs: { Calibre: 'Jumbo (>8cm)', Firmeza: 'Alta', Cáscara: 'Blanca seca', Empaque: 'Costal 25 kg' },
                    reviewsList: [
                        { author: 'Óscar M.', stars: 4, comment: 'Buen tamaño de cebollas, bien secas. Relación calidad/precio justa.', date: '2026-05-25' }
                    ]
                },
        {
                    id: 10, name: 'Miel de Abeja Multifloral', category: 'Otros', icon: 'img/miel.png',
                    imgBg: 'linear-gradient(135deg, #FDE68A, #B45309)',
                    price: 250, unit: 'kg', minOrderVal: 20, minOrderText: '20 kg', available: 500,
                    seller: { name: 'Isabel Morales', location: 'Zacatlán, Puebla', avatar: '👩‍🌾', rating: 5.0, reviews: 38, totalSales: 210, memberSince: '2022' },
                    verified: true, organic: true, harvestDate: '2026-04-15',
                    originCoords: [19.7547, -97.9602],
                    description: 'Miel de abeja 100% pura, multifloral de la sierra norte de Puebla. Sin calentar, sin filtrar, conserva todas sus propiedades nutritivas y enzimáticas.',
                    specs: { Tipo: 'Multifloral', Humedad: '<18%', Color: 'Ámbar claro', Certificación: 'Libre de antibióticos' },
                    reviewsList: [
                        { author: 'Eduardo G.', stars: 5, comment: 'Excelente miel, sabor aromático delicioso. Se nota la pureza al instante.', date: '2026-04-28' },
                        { author: 'Verónica N.', stars: 5, comment: 'Viene muy bien envasada. La textura cristaliza de forma muy natural.', date: '2026-05-15' }
                    ]
                },
        {
            id: 11, name: 'Harina de Amaranto Orgánica', category: 'Sub Productos', icon: 'img/harina_amaranto.png',
            imgBg: 'linear-gradient(135deg, #FDE68A, #D97706)',
            price: 95, unit: 'kg', minOrderVal: 5, minOrderText: '5 kg', available: 350,
            seller: { name: 'Carlos Hernández', location: 'San Martín Texmelucan, Puebla', avatar: '👨‍🌾', rating: 4.8, reviews: 32, totalSales: 79, memberSince: '2024' },
            verified: true, organic: true, harvestDate: '2026-05-12',
            originCoords: [19.2842, -98.4347],
            description: 'Harina fina de amaranto 100% orgánico, obtenida mediante la molienda del grano entero. Alto contenido en proteínas y libre de gluten. Ideal para repostería saludable.',
            specs: { Proteína: '>14%', Humedad: '<10%', Gluten: 'Libre de Gluten', Certificación: 'Orgánico MX' },
            reviewsList: [
                { author: 'Valeria M.', stars: 5, comment: 'Excelente harina, muy fina y perfecta para mis galletas sin gluten.', date: '2026-05-12' }
            ],
            valueAddedMultiplier: '9.6x',
            vaRawPrice: '$18.00 MXN / kg (Grano)',
            vaIncrementPct: 860,
            vaAnalysisDesc: 'Procesar el grano de amaranto para convertirlo en harina orgánica envasada multiplica el valor comercial de la cosecha por 9.6 veces. Tras deducir costos de molienda y empaque, esto representa un incremento neto estimado del 860% en las ganancias del agricultor.'
        },
        {
            id: 12, name: 'Barras de Amaranto con Miel', category: 'Sub Productos', icon: 'img/barras_amaranto.png',
            imgBg: 'linear-gradient(135deg, #FEF3C7, #D97706)',
            price: 150, unit: 'Paquete de 10 piezas', minOrderVal: 5, minOrderText: '5 paquetes', available: 150,
            seller: { name: 'Carlos Hernández', location: 'San Martín Texmelucan, Puebla', avatar: '👨‍🌾', rating: 4.8, reviews: 32, totalSales: 79, memberSince: '2024' },
            verified: true, organic: true, harvestDate: '2026-05-15',
            originCoords: [19.2842, -98.4347],
            description: 'Barras energéticas de amaranto tostado compactadas con miel de abeja multifloral pura. Snack saludable, nutritivo y práctico. Libre de conservadores artificiales.',
            specs: { Contenido: '10 barras x 30g', Ingredientes: 'Amaranto, Miel pura', Calorías: '110 kcal / barra', Conservación: 'Lugar fresco y seco' },
            reviewsList: [
                { author: 'Andrés G.', stars: 5, comment: 'Sabor delicioso y muy natural. La miel no empalaga y da buena energía.', date: '2026-05-20' }
            ],
            valueAddedMultiplier: '5.2x',
            vaRawPrice: '$28.85 MXN (Materia Prima)',
            vaIncrementPct: 420,
            vaAnalysisDesc: 'La transformación del amaranto y miel en barras energéticas compactas genera un multiplicador de valor de 5.2x. Tras considerar los insumos adicionales, empaque y mano de obra local, el productor retiene un 420% de incremento neto en su margen final.'
        },
        {
            id: 13, name: 'Amaranto Tostado Natural', category: 'Sub Productos', icon: 'img/amaranto_tostado.png',
            imgBg: 'linear-gradient(135deg, #FDE68A, #C8952E)',
            price: 80, unit: 'Bolsa 500g', minOrderVal: 10, minOrderText: '10 bolsas', available: 400,
            seller: { name: 'Carlos Hernández', location: 'San Martín Texmelucan, Puebla', avatar: '👨‍🌾', rating: 4.8, reviews: 32, totalSales: 79, memberSince: '2024' },
            verified: true, organic: true, harvestDate: '2026-05-10',
            originCoords: [19.2842, -98.4347],
            description: 'Semilla de amaranto orgánico reventada al calor de forma tradicional. Grano inflado ligero, de sabor tostado suave. Ideal para ensaladas, yogures y repostería.',
            specs: { Presentación: 'Bolsa kraft 500g', Humedad: '<5%', Impurezas: 'Ninguna', Certificación: 'Orgánico MX' },
            reviewsList: [
                { author: 'Lucía S.', stars: 4, comment: 'Muy limpio y bien tostado. Excelente para desayunos.', date: '2026-05-18' }
            ],
            valueAddedMultiplier: '3.2x',
            vaRawPrice: '$25.00 MXN (Equivalente Grano)',
            vaIncrementPct: 220,
            vaAnalysisDesc: 'El reventado al calor tradicional del grano eleva el valor comercial de la cosecha 3.2 veces por kilogramo. Dado el bajísimo costo del procesamiento térmico, esto se traduce en un incremento de beneficio neto del 220% para el productor de origen.'
        },
        {
            id: 14, name: 'Agua de Rosas Destilada', category: 'Sub Productos', icon: 'img/agua_rosas.png',
            imgBg: 'linear-gradient(135deg, #FDF2F8, #F472B6)',
            price: 85, unit: 'Botella 250ml', minOrderVal: 5, minOrderText: '5 botellas', available: 200,
            seller: { name: 'Ana Martínez', location: 'San Martín Texmelucan, Puebla', avatar: '👩‍🌾', rating: 4.9, reviews: 55, totalSales: 447, memberSince: '2022' },
            verified: true, organic: true, harvestDate: '2026-06-01',
            originCoords: [19.2842, -98.4347],
            description: 'Tónico facial natural obtenido de la destilación al vapor de pétalos frescos de rosa variedad Freedom. Hidrata, tonifica y calma la piel. Sin alcohol ni perfumes añadidos.',
            specs: { Pureza: '100% Destilado', Variedad: 'Rosa Freedom', Envase: 'Vidrio ámbar con atomizador', Volumen: '250 ml' },
            reviewsList: [
                { author: 'Gabriela L.', stars: 5, comment: 'Deja la piel fresquísima y huele increíble a rosas reales, no a perfume químico.', date: '2026-06-01' }
            ],
            valueAddedMultiplier: '8.5x',
            vaRawPrice: '$10.00 MXN (Flores Frescas)',
            vaIncrementPct: 750,
            vaAnalysisDesc: 'La destilación al vapor para extraer agua de rosas de uso cosmético multiplica el valor comercial de las flores frescas por 8.5 veces. Una botella de 250ml se comercializa en $85 MXN, entregando un incremento neto del 750% en ganancias en comparación con la venta ornamental.'
        },
        {
            id: 15, name: 'Aceite Esencial de Rosa', category: 'Sub Productos', icon: 'img/aceite_rosa.png',
            imgBg: 'linear-gradient(135deg, #FCE7F3, #DB2777)',
            price: 320, unit: 'Frasco 10 ml', minOrderVal: 2, minOrderText: '2 frascos', available: 80,
            seller: { name: 'Ana Martínez', location: 'San Martín Texmelucan, Puebla', avatar: '👩‍🌾', rating: 4.9, reviews: 55, totalSales: 447, memberSince: '2022' },
            verified: true, organic: true, harvestDate: '2026-06-03',
            originCoords: [19.2842, -98.4347],
            description: 'Aceite esencial concentrado de rosas de primera presión, obtenido mediante destilación de miles de pétalos. Altamente valorado en aromaterapia y cosmética natural.',
            specs: { Concentración: '100% Puro', Extracción: 'Destilación al vapor', Variedad: 'Rosa Freedom', Envase: 'Frasco gotero 10 ml' },
            reviewsList: [
                { author: 'Sofía P.', stars: 5, comment: 'Un aroma exquisito y muy potente, con un par de gotas basta. Muy recomendado.', date: '2026-06-03' }
            ],
            valueAddedMultiplier: '~27x',
            vaRawPrice: '$11.80 MXN (Equivalente pétalos)',
            vaIncrementPct: 2600,
            vaAnalysisDesc: 'El aceite esencial es el subproducto de mayor valor añadido, multiplicando el retorno de la materia prima por aproximadamente 27 veces. Aunque requiere un gran volumen de pétalos para su extracción, un frasco gotero de 10ml se vende a $320 MXN, alcanzando un incremento de rentabilidad neta del 2600%.'
        },
        {
            id: 16, name: 'Papa Blanca Alpha', category: 'Hortalizas', icon: 'img/papa.png',
            imgBg: 'linear-gradient(135deg, #FEF3C7, #D97706)',
            price: 1750, unit: 'Arpilla 50 kg', minOrderVal: 2, minOrderText: '2 arpillas', available: 60,
            seller: { name: 'José Luis Morales', location: 'Los Mochis, Sinaloa', avatar: '👨‍🌾', rating: 4.8, reviews: 38, totalSales: 210, memberSince: '2023' },
            verified: true, organic: false, harvestDate: '2026-05-20',
            originCoords: [25.7904, -108.9917],
            description: 'Papa blanca variedad Alpha de primera calidad. Lavada, firme, libre de plagas. Ideal para freír, restaurantes y centrales de abasto (Datos SNIIM).',
            specs: { Variedad: 'Alpha', Calidad: 'Primera', Empaque: 'Arpilla 50 kg', Calibre: 'Grande' },
            reviewsList: [
                { author: 'Sergio M.', stars: 5, comment: 'Excelente papa Alpha, muy limpia y con excelente rendimiento para fritura.', date: '2026-05-28' }
            ]
        },
        {
            id: 17, name: 'Chile Serrano Seleccionado', category: 'Hortalizas', icon: 'img/chile.png',
            imgBg: 'linear-gradient(135deg, #DCFCE7, #16A34A)',
            price: 330, unit: 'Arpilla 30 kg', minOrderVal: 5, minOrderText: '5 arpillas', available: 40,
            seller: { name: 'Gonzalo Ramírez', location: 'Rioverde, San Luis Potosí', avatar: '👨‍🌾', rating: 4.7, reviews: 29, totalSales: 165, memberSince: '2024' },
            verified: true, organic: false, harvestDate: '2026-05-25',
            originCoords: [21.9324, -99.9984],
            description: 'Chile serrano verde de primera calidad. Firme, picor intenso y uniforme. Cosecha fresca con datos de mercado SNIIM.',
            specs: { Tipo: 'Serrano Verde', Calidad: 'Primera', Empaque: 'Arpilla 30 kg', Picor: 'Alto' },
            reviewsList: [
                { author: 'Ignacio R.', stars: 5, comment: 'Chile serrano fresco de excelente color y picor.', date: '2026-06-01' }
            ]
        }
    ];

    const CATEGORIES = ['Todos', 'Sub Productos', 'Granos', 'Hortalizas', 'Frutas', 'Flores', 'Otros'];

    let featuresState = {
        selectedCropId: null,
        selectedCategory: 'Todos',
        searchQuery: '',
        sortBy: 'relevance',
        droneChart: null,
        
        // E-commerce extensions
        cart: [],
        maxPriceFilter: 45000,
        organicFilter: false,
        verifiedFilter: false,
        isCartOpen: false,
        modalMap: null,
        selectedRatingInput: 5
    };

    // ======================== AUTH FUNCTIONS ========================

    function initAuth() {
        // Check localStorage for existing session
        const saved = localStorage.getItem('micampo_user');
        if (saved) {
            try {
                currentUser = JSON.parse(saved);
                updateNavForLoggedIn();
            } catch (e) {
                localStorage.removeItem('micampo_user');
            }
        }

        // Login button
        document.getElementById('nav-login-btn').addEventListener('click', () => showAuthModal('login'));

        // Close modal
        document.getElementById('auth-close').addEventListener('click', hideAuthModal);

        // Overlay click to close
        document.getElementById('auth-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) hideAuthModal();
        });

        // Tab switching
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.authTab;
                document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById('login-form').style.display = tabName === 'login' ? 'flex' : 'none';
                document.getElementById('register-form').style.display = tabName === 'register' ? 'flex' : 'none';
            });
        });

        // Switch links
        document.getElementById('switch-to-register').addEventListener('click', (e) => {
            e.preventDefault();
            showAuthModal('register');
        });
        document.getElementById('switch-to-login').addEventListener('click', (e) => {
            e.preventDefault();
            showAuthModal('login');
        });

        // Login form submit
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-user').value.trim();
            const pass = document.getElementById('login-pass').value;
            if (email && pass) {
                // Accept any credentials for demo
                const nameFromEmail = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                currentUser = {
                    ...DEFAULT_FARMER,
                    email: email,
                    name: nameFromEmail || DEFAULT_FARMER.name
                };
                localStorage.setItem('micampo_user', JSON.stringify(currentUser));
                updateNavForLoggedIn();
                hideAuthModal();
                // Auto-navigate to dashboard
                document.querySelector('.nav-link[data-page="micampo"]').click();
            }
        });

        // Register form submit
        document.getElementById('register-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const location = document.getElementById('reg-location').value.trim();
            const type = document.getElementById('reg-type').value;
            if (name && email) {
                currentUser = {
                    name,
                    email,
                    location: location || 'México',
                    type,
                    avatar: type === 'agricultor' ? '👨‍🌾' : '🛒'
                };
                localStorage.setItem('micampo_user', JSON.stringify(currentUser));
                updateNavForLoggedIn();
                hideAuthModal();
                document.querySelector('.nav-link[data-page="micampo"]').click();
            }
        });

        // Logout
        document.getElementById('nav-logout-btn').addEventListener('click', () => {
            currentUser = null;
            localStorage.removeItem('micampo_user');
            updateNavForLoggedOut();
            document.querySelector('.nav-link[data-page="inicio"]').click();
        });

        // Password toggle
        document.querySelectorAll('.toggle-pass').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.target;
                const input = document.getElementById(targetId);
                if (input) {
                    input.type = input.type === 'password' ? 'text' : 'password';
                    btn.textContent = input.type === 'password' ? '👁' : '🙈';
                }
            });
        });
    }

    function showAuthModal(tab) {
        document.getElementById('auth-overlay').style.display = 'flex';
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        const targetTab = document.querySelector('[data-auth-tab="' + tab + '"]');
        if (targetTab) targetTab.classList.add('active');
        document.getElementById('login-form').style.display = tab === 'login' ? 'flex' : 'none';
        document.getElementById('register-form').style.display = tab === 'register' ? 'flex' : 'none';
        document.body.style.overflow = 'hidden';
    }

    function hideAuthModal() {
        document.getElementById('auth-overlay').style.display = 'none';
        document.body.style.overflow = '';
    }

    function updateNavForLoggedIn() {
        document.getElementById('nav-login-btn').style.display = 'none';
        document.getElementById('nav-user').style.display = 'flex';
        document.getElementById('nav-username').textContent = currentUser.name.split(' ')[0];
        document.getElementById('nav-micampo').style.display = 'inline-flex';
    }

    function updateNavForLoggedOut() {
        document.getElementById('nav-login-btn').style.display = 'inline-flex';
        document.getElementById('nav-user').style.display = 'none';
        document.getElementById('nav-micampo').style.display = 'none';
    }

    // ======================== DASHBOARD FUNCTIONS ========================

    function renderDashboard() {
        if (!currentUser) return;

        // Welcome
        document.getElementById('dashboard-welcome').innerHTML = 
            '<h1>Hola, ' + currentUser.name + ' ' + (currentUser.avatar || '👋') + '</h1>' +
            '<p class="welcome-subtitle">Bienvenido de nuevo — aquí tienes el resumen de tu campo</p>';

        // Banner
        document.getElementById('dashboard-banner').innerHTML = 
            '<h2>Resumen de tu campo</h2>' +
            '<p>Todo en orden para una gran cosecha 🌱</p>' +
            '<span class="banner-icon">🌾</span>';

        // KPIs
        var activeCrops = FARMER_CROPS.filter(function(c) { return c.status !== 'harvested'; }).length;
        var readyCrops = FARMER_CROPS.filter(function(c) { return c.status === 'ready'; }).length;
        var totalEarnings = 0;
        FARMER_CROPS.forEach(function(c) {
            if (c.estimatedEarnings) {
                totalEarnings += c.estimatedEarnings;
            } else if (c.yieldPerHa && c.pricePerTon) {
                totalEarnings += (c.surface * c.yieldPerHa * c.pricePerTon / 1000);
            }
        });

        document.getElementById('dashboard-kpis').innerHTML = 
            '<div class="col-12 col-md-4 mb-3"><div class="dashboard-kpi-card h-100">' +
                '<div class="kpi-icon-wrap green">🌱</div>' +
                '<div class="kpi-info"><div class="kpi-number">' + activeCrops + '</div><div class="kpi-desc">Cultivos activos</div></div>' +
            '</div></div>' +
            '<div class="col-12 col-md-4 mb-3"><div class="dashboard-kpi-card h-100">' +
                '<div class="kpi-icon-wrap gold">⏰</div>' +
                '<div class="kpi-info"><div class="kpi-number">' + readyCrops + '</div><div class="kpi-desc">Próximos a cosechar</div></div>' +
            '</div></div>' +
            '<div class="col-12 col-md-4 mb-3"><div class="dashboard-kpi-card h-100">' +
                '<div class="kpi-icon-wrap blue">💰</div>' +
                '<div class="kpi-info"><div class="kpi-number">$' + Math.round(totalEarnings).toLocaleString('es-MX') + '</div><div class="kpi-desc">Ganancia estimada</div></div>' +
            '</div></div>';

        // Show crops list, hide detail
        document.getElementById('crops-section').style.display = 'block';
        document.getElementById('crop-detail-section').style.display = 'none';

        renderCropCards();

        // Back button
        document.getElementById('back-to-crops').onclick = function() {
            document.getElementById('crops-section').style.display = 'block';
            document.getElementById('crop-detail-section').style.display = 'none';
            if (featuresState.droneChart) {
                featuresState.droneChart.destroy();
                featuresState.droneChart = null;
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        // Add crop button
        document.getElementById('add-crop-btn').onclick = function() {
            alert('🌱 Funcionalidad próximamente: Agregar un nuevo cultivo con datos de siembra, variedad y ubicación GPS.');
        };
    }

    function renderCropCards() {
        var grid = document.getElementById('crops-grid');
        var html = '';

        FARMER_CROPS.forEach(function(crop) {
            var progress = Math.round((crop.elapsedDays / crop.totalDays) * 100);
            var earnings = crop.estimatedEarnings || (crop.surface * crop.yieldPerHa * crop.pricePerTon / 1000);
            var harvestDate = new Date(crop.harvestDate + 'T00:00:00');
            var harvestFormatted = harvestDate.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });

            var progressColor = '#4A8C5C';
            if (crop.status === 'ready') progressColor = '#C8952E';
            if (crop.status === 'harvested') progressColor = '#3B82F6';

            html += '<div class="col-12 col-xl-6 mb-3">' +
                '<div class="crop-card h-100" data-crop-id="' + crop.id + '">' +
                '<div class="crop-thumb" style="background:' + crop.thumbBg + '">' + crop.icon + '</div>' +
                '<div class="crop-info">' +
                    '<h4>' + crop.name + '</h4>' +
                    '<span class="crop-status ' + crop.status + '">' + crop.statusLabel + '</span>' +
                    '<div class="crop-progress-bar"><div class="crop-progress-fill" style="width:' + progress + '%;background:' + progressColor + '"></div></div>' +
                    '<div class="crop-progress-text"><span>Días transcurridos: ' + crop.elapsedDays + ' de ' + crop.totalDays + '</span><span>' + progress + '%</span></div>' +
                '</div>' +
                '<div class="crop-meta">' +
                    '<div class="meta-label">Cosecha estimada</div>' +
                    '<div class="meta-value">' + harvestFormatted + '</div>' +
                    '<div class="meta-label" style="margin-top:8px">Ganancia estimada</div>' +
                    '<div class="meta-earnings">$' + Math.round(earnings).toLocaleString('es-MX') + '</div>' +
                '</div>' +
                '</div>' +
            '</div>';
        });

        grid.innerHTML = html;

        // Click handlers
        grid.querySelectorAll('.crop-card').forEach(function(card) {
            card.addEventListener('click', function() {
                var cropId = parseInt(card.dataset.cropId);
                openCropDetail(cropId);
            });
        });
    }

    function openCropDetail(cropId) {
        var crop = null;
        for (var i = 0; i < FARMER_CROPS.length; i++) {
            if (FARMER_CROPS[i].id === cropId) { crop = FARMER_CROPS[i]; break; }
        }
        if (!crop) return;
        featuresState.selectedCropId = cropId;

        document.getElementById('crops-section').style.display = 'none';
        document.getElementById('crop-detail-section').style.display = 'block';

        var progress = Math.round((crop.elapsedDays / crop.totalDays) * 100);
        var earnings = crop.estimatedEarnings || (crop.surface * crop.yieldPerHa * crop.pricePerTon / 1000);
        var plantFormatted = new Date(crop.plantingDate + 'T00:00:00').toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
        var harvestFormatted = new Date(crop.harvestDate + 'T00:00:00').toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
        var drone = crop.drone;

        var content = document.getElementById('crop-detail-content');
        content.innerHTML = 
            '<div class="crop-detail-header">' +
                '<div class="crop-detail-thumb" style="background:' + crop.thumbBg + '">' + crop.icon + '</div>' +
                '<div class="crop-detail-title">' +
                    '<h2>' + crop.name + '</h2>' +
                    '<span class="crop-status ' + crop.status + '">' + crop.statusLabel + '</span>' +
                    '<p>Variedad: ' + crop.variety + ' · ' + (currentUser ? currentUser.location : '') + '</p>' +
                '</div>' +
            '</div>' +

            '<div class="crop-detail-progress">' +
                '<div class="progress-header"><span>Progreso del cultivo</span><strong>' + crop.elapsedDays + ' de ' + crop.totalDays + ' días (' + progress + '%)</strong></div>' +
                '<div class="progress-big-bar"><div class="progress-big-fill" style="width:' + progress + '%"></div></div>' +
            '</div>' +

            '<div class="crop-info-grid">' +
                '<div class="crop-info-item"><div class="info-icon">📅</div><div><div class="info-label">Fecha de siembra</div><div class="info-value">' + plantFormatted + '</div></div></div>' +
                '<div class="crop-info-item"><div class="info-icon">🌾</div><div><div class="info-label">Cosecha estimada</div><div class="info-value">' + harvestFormatted + '</div></div></div>' +
                '<div class="crop-info-item"><div class="info-icon">📐</div><div><div class="info-label">Superficie</div><div class="info-value">' + crop.surface + ' hectáreas</div></div></div>' +
                '<div class="crop-info-item"><div class="info-icon">📊</div><div><div class="info-label">Rendimiento estimado</div><div class="info-value">' + (crop.yieldPerHa ? crop.yieldPerHa + ' ton/ha' : 'N/A') + '</div></div></div>' +
            '</div>' +

            '<div class="crop-earnings-card">' +
                '<div class="earnings-label">💰 Ganancia Estimada</div>' +
                '<div class="earnings-value">$' + Math.round(earnings).toLocaleString('es-MX') + ' MXN</div>' +
            '</div>' +

            '<div class="crop-description"><h3>ℹ️ Información del Cultivo</h3><p>' + crop.description + '</p></div>' +

            // DRONE MONITORING SECTION
            '<div class="drone-section">' +
                '<h3>📡 Monitoreo por Dron Centinela <span class="drone-live-badge"><span class="live-dot"></span> Activo</span></h3>' +
                '<div class="row g-3 drone-grid">' +
                    buildDroneMetric('🌿', drone.ndvi.toFixed(2), 'Índice NDVI', drone.ndvi > 0.7 ? 'optimal' : drone.ndvi > 0.5 ? 'warning' : 'danger', drone.ndvi > 0.7 ? 'Saludable' : drone.ndvi > 0.5 ? 'Moderado' : 'Atención') +
                    buildDroneMetric('❤️', drone.healthScore + '%', 'Salud General', drone.healthScore >= 80 ? 'optimal' : drone.healthScore >= 60 ? 'warning' : 'danger', drone.healthScore >= 80 ? 'Óptimo' : drone.healthScore >= 60 ? 'Aceptable' : 'Crítico') +
                    buildDroneMetric('💧', drone.soilHumidity + '%', 'Humedad del Suelo', drone.irrigationStatus === 'Óptimo' ? 'optimal' : 'warning', drone.irrigationStatus) +
                    buildDroneMetric('🌡️', drone.temperature + '°C', 'Temperatura', (drone.temperature >= 18 && drone.temperature <= 28) ? 'optimal' : 'warning', (drone.temperature >= 18 && drone.temperature <= 28) ? 'Rango ideal' : 'Fuera de rango') +
                    buildDroneMetric('🐛', drone.pestRisk, 'Riesgo de Plagas', drone.pestRisk === 'Bajo' ? 'optimal' : drone.pestRisk === 'Medio' ? 'warning' : 'danger', drone.pestRisk === 'Bajo' ? 'Controlado' : 'Monitorear') +
                    buildDroneMetric('🧪', drone.nitrogenLevel, 'Nivel de Nitrógeno', (drone.nitrogenLevel === 'Adecuado' || drone.nitrogenLevel === 'Óptimo' || drone.nitrogenLevel === 'Alto') ? 'optimal' : 'warning', (drone.nitrogenLevel === 'Adecuado' || drone.nitrogenLevel === 'Óptimo' || drone.nitrogenLevel === 'Alto') ? 'OK' : 'Aplicar') +
                '</div>' +
                '<div class="drone-alerts"><h4>📋 Alertas y Recomendaciones</h4>' +
                    drone.alerts.map(function(a) { return '<div class="drone-alert-item ' + a.type + '">' + a.text + '</div>'; }).join('') +
                '</div>' +
                '<div class="drone-chart-wrapper"><h4 style="margin-bottom:12px;font-size:0.9rem;font-weight:700;">📈 Evolución NDVI (Últimas 8 semanas)</h4><canvas id="drone-ndvi-chart"></canvas></div>' +
            '</div>';

        // Render NDVI chart
        setTimeout(function() { renderDroneChart(drone); }, 100);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function buildDroneMetric(icon, value, label, statusClass, statusText) {
        return '<div class="col-6 col-md-4 mb-3">' +
            '<div class="drone-metric h-100">' +
                '<div class="drone-metric-icon">' + icon + '</div>' +
                '<div class="drone-metric-value">' + value + '</div>' +
                '<div class="drone-metric-label">' + label + '</div>' +
                '<span class="drone-metric-status ' + statusClass + '">' + statusText + '</span>' +
            '</div>' +
        '</div>';
    }

    function renderDroneChart(drone) {
        var canvas = document.getElementById('drone-ndvi-chart');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');

        if (featuresState.droneChart) {
            featuresState.droneChart.destroy();
        }

        var labels = drone.ndviHistory.map(function(d) { return d.week; });
        var values = drone.ndviHistory.map(function(d) { return d.value; });

        var gradient = ctx.createLinearGradient(0, 0, 0, 250);
        gradient.addColorStop(0, 'rgba(74, 140, 92, 0.3)');
        gradient.addColorStop(1, 'rgba(74, 140, 92, 0.02)');

        featuresState.droneChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'NDVI',
                    data: values,
                    borderColor: '#4A8C5C',
                    borderWidth: 2.5,
                    fill: true,
                    backgroundColor: gradient,
                    pointRadius: 5,
                    pointBackgroundColor: '#4A8C5C',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#FFFFFF',
                        titleColor: '#2D2A26',
                        bodyColor: '#7A7470',
                        borderColor: '#E8DFD0',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 10,
                        callbacks: {
                            label: function(context) { return 'NDVI: ' + context.parsed.y.toFixed(2); }
                        }
                    }
                },
                scales: {
                    x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 11 }, color: '#7A7470' } },
                    y: {
                        min: 0, max: 1,
                        grid: { color: '#F5EDE0' },
                        ticks: { font: { family: 'Inter', size: 11 }, color: '#7A7470', stepSize: 0.2 }
                    }
                }
            }
        });
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        var parts = dateStr.split('-');
        if (parts.length !== 3) return dateStr;
        var date = new Date(parts[0], parts[1] - 1, parts[2]);
        return date.toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });
    }

    // ======================== MARKETPLACE FUNCTIONS ========================

    function renderMarketplace() {
        // Hero stats
        var sellerNames = {};
        var regionNames = {};
        MARKETPLACE_PRODUCTS.forEach(function(p) {
            sellerNames[p.seller.name] = true;
            var parts = p.seller.location.split(', ');
            regionNames[parts[parts.length - 1]] = true;
        });
        document.getElementById('mp-total-products').textContent = MARKETPLACE_PRODUCTS.length;
        document.getElementById('mp-total-sellers').textContent = Object.keys(sellerNames).length;
        document.getElementById('mp-total-regions').textContent = Object.keys(regionNames).length;

        // Category pills
        var pillsContainer = document.getElementById('category-pills');
        pillsContainer.innerHTML = CATEGORIES.map(function(cat) {
            var prefix = cat === 'Todos' ? '🏷️ ' : '';
            return '<button class="category-pill ' + (cat === featuresState.selectedCategory ? 'active' : '') + '" data-category="' + cat + '">' + prefix + cat + '</button>';
        }).join('');

        pillsContainer.querySelectorAll('.category-pill').forEach(function(pill) {
            pill.addEventListener('click', function() {
                featuresState.selectedCategory = pill.dataset.category;
                renderMarketplace();
            });
        });

        // Search
        var searchInput = document.getElementById('marketplace-search');
        searchInput.value = featuresState.searchQuery;
        searchInput.oninput = function(e) {
            featuresState.searchQuery = e.target.value.toLowerCase();
            renderMarketplaceGrid();
        };

        // Sort
        var sortSelect = document.getElementById('marketplace-sort');
        sortSelect.value = featuresState.sortBy;
        sortSelect.onchange = function(e) {
            featuresState.sortBy = e.target.value;
            renderMarketplaceGrid();
        };

        // Toggle Cart Drawer
        var cartToggle = document.getElementById('cart-toggle-btn');
        var floatCartToggle = document.getElementById('cart-floating-btn');
        var closeCart = document.getElementById('cart-drawer-close');
        var cartOverlay = document.getElementById('cart-drawer-overlay');

        cartToggle.onclick = toggleCart;
        floatCartToggle.onclick = toggleCart;
        closeCart.onclick = toggleCart;
        cartOverlay.onclick = toggleCart;

        // Toggle Advanced Filters Panel
        var filterToggle = document.getElementById('filter-toggle-btn');
        var filtersPanel = document.getElementById('advanced-filters-panel');
        filterToggle.onclick = function() {
            filterToggle.classList.toggle('active');
            if (filtersPanel.style.display === 'none') {
                filtersPanel.style.display = 'block';
            } else {
                filtersPanel.style.display = 'none';
            }
        };

        // Range Price Filter
        var priceRange = document.getElementById('price-filter-range');
        var priceVal = document.getElementById('price-filter-val');
        priceRange.oninput = function(e) {
            var val = parseInt(e.target.value);
            featuresState.maxPriceFilter = val;
            priceVal.textContent = '$' + val.toLocaleString('es-MX');
            renderMarketplaceGrid();
        };

        // Organic Switch
        var organicSwitch = document.getElementById('filter-organic');
        organicSwitch.checked = featuresState.organicFilter;
        organicSwitch.onchange = function(e) {
            featuresState.organicFilter = e.target.checked;
            renderMarketplaceGrid();
        };

        // Verified Switch
        var verifiedSwitch = document.getElementById('filter-verified');
        verifiedSwitch.checked = featuresState.verifiedFilter;
        verifiedSwitch.onchange = function(e) {
            featuresState.verifiedFilter = e.target.checked;
            renderMarketplaceGrid();
        };

        // Checkout Button
        document.getElementById('btn-checkout').onclick = checkoutCart;
        document.getElementById('btn-success-close').onclick = function() {
            document.getElementById('checkout-success-overlay').style.display = 'none';
        };

        updateCartUI();
        renderMarketplaceGrid();
    }

    function renderMarketplaceGrid() {
        var products = MARKETPLACE_PRODUCTS.slice();

        // Filter by category
        if (featuresState.selectedCategory !== 'Todos') {
            products = products.filter(function(p) { return p.category === featuresState.selectedCategory; });
        }

        // Filter by search
        if (featuresState.searchQuery) {
            var q = featuresState.searchQuery;
            products = products.filter(function(p) {
                return p.name.toLowerCase().indexOf(q) !== -1 ||
                       p.seller.name.toLowerCase().indexOf(q) !== -1 ||
                       p.seller.location.toLowerCase().indexOf(q) !== -1 ||
                       p.category.toLowerCase().indexOf(q) !== -1;
            });
        }

        // Filter by Max Price
        products = products.filter(function(p) {
            return p.price <= featuresState.maxPriceFilter;
        });

        // Filter by Organic
        if (featuresState.organicFilter) {
            products = products.filter(function(p) { return p.organic; });
        }

        // Filter by Verified
        if (featuresState.verifiedFilter) {
            products = products.filter(function(p) { return p.seller.verified || p.verified; });
        }

        // Sort
        switch (featuresState.sortBy) {
            case 'price-asc': products.sort(function(a, b) { return a.price - b.price; }); break;
            case 'price-desc': products.sort(function(a, b) { return b.price - a.price; }); break;
            case 'rating': products.sort(function(a, b) { return b.seller.rating - a.seller.rating; }); break;
            case 'newest': products.sort(function(a, b) { return new Date(b.harvestDate) - new Date(a.harvestDate); }); break;
        }

        var grid = document.getElementById('marketplace-grid');

        if (products.length === 0) {
            grid.innerHTML = '<div class="mp-no-results"><div class="no-results-icon">🔍</div><p>No se encontraron productos con esos criterios</p></div>';
            return;
        }

        grid.innerHTML = products.map(function(p, idx) {
            var stars = '';
            for (var i = 0; i < Math.floor(p.seller.rating); i++) stars += '⭐';

            var stockText = 'Disponible';
            var stockClass = 'in-stock';
            if (p.available === 0) {
                stockText = 'Agotado';
                stockClass = 'out-of-stock';
            } else if (p.available <= 50) {
                stockText = 'Poco Stock';
                stockClass = 'low-stock';
            }

            var featuredBadge = '';
            if (p.id === 1) featuredBadge = '<span class="mp-featured-badge">🌟 Cosecha Premium</span>';
            else if (p.id === 4) featuredBadge = '<span class="mp-featured-badge">🫘 Calidad Especial</span>';
            else if (p.id === 6) featuredBadge = '<span class="mp-featured-badge">🌾 Orgullo Ancestral</span>';
            else if (p.id === 5) featuredBadge = '<span class="mp-featured-badge">🌹 Flor Exportación</span>';

            return '<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">' +
                '<div class="mp-product-card h-100" data-product-id="' + p.id + '" style="animation-delay:' + (idx * 60) + 'ms">' +
                '<div class="mp-product-img" style="background:' + p.imgBg + '">' +
                    featuredBadge +
                    '<img src="' + p.icon + '" alt="' + p.name + '">' +
                    (p.category !== 'Sub Productos' ? '<span class="mp-category-badge" ' + (featuredBadge ? 'style="top: 42px;"' : '') + '>' + p.category + '</span>' : '') +
                    (p.verified || p.seller.verified ? '<span class="mp-verified-badge" title="Productor Verificado">✓</span>' : '') +
                    (p.valueAddedMultiplier ? '<span class="value-added-badge" title="Multiplicador de Valor Agregado">' + p.valueAddedMultiplier + '</span>' : '') +
                    '<span class="stock-badge ' + stockClass + '" ' + (p.valueAddedMultiplier ? 'style="left: 12px; right: auto;"' : '') + '>' + stockText + '</span>' +
                '</div>' +
                '<div class="mp-product-body">' +
                    '<div class="mp-product-name">' + p.name + (p.organic ? ' <span style="color:#22C55E;font-size:0.75rem;">🌿 Orgánico</span>' : '') + '</div>' +
                    '<div class="mp-product-origin">📍 ' + p.seller.location + '</div>' +
                    '<div class="mp-product-price-row"><div>' +
                        '<span class="mp-product-price">$' + p.price.toLocaleString('es-MX') + '</span>' +
                        '<span class="mp-product-unit"> / ' + p.unit + '</span>' +
                    '</div></div>' +
                    '<div class="mp-product-min-order">Pedido mínimo: ' + p.minOrderText + '</div>' +
                    '<div class="mp-seller-row">' +
                        '<span class="mp-seller-avatar">' + p.seller.avatar + '</span>' +
                        '<span class="mp-seller-name">' + p.seller.name + '</span>' +
                        '<span class="mp-seller-rating">' + stars + ' <span>' + p.seller.rating + '</span></span>' +
                    '</div>' +
                    '<button class="mp-card-btn">Ver Detalles / Comprar</button>' +
                '</div>' +
                '</div>' +
            '</div>';
        }).join('');

        // Click handlers
        grid.querySelectorAll('.mp-product-card').forEach(function(card) {
            card.addEventListener('click', function(e) {
                var productId = parseInt(card.dataset.productId);
                openProductModal(productId);
            });
        });
    }

    function openProductModal(productId) {
        var product = null;
        for (var i = 0; i < MARKETPLACE_PRODUCTS.length; i++) {
            if (MARKETPLACE_PRODUCTS[i].id === productId) { product = MARKETPLACE_PRODUCTS[i]; break; }
        }
        if (!product) return;

        var modal = document.getElementById('product-modal');
        var overlay = document.getElementById('product-modal-overlay');

        var harvestFormatted = new Date(product.harvestDate + 'T00:00:00').toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });
        
        var stars = '';
        for (var i = 0; i < 5; i++) {
            stars += i < Math.floor(product.seller.rating) ? '★' : '☆';
        }

        var specsHtml = '';
        var specEntries = Object.entries(product.specs);
        for (var j = 0; j < specEntries.length; j++) {
            specsHtml += '<div class="modal-detail-item"><span class="detail-label">' + specEntries[j][0] + '</span><span class="detail-value">' + specEntries[j][1] + '</span></div>';
        }

        // Build reviews layout
        var reviewsHtml = '';
        product.reviewsList.forEach(function(r) {
            var reviewStars = '';
            for (var s = 0; s < 5; s++) reviewStars += s < r.stars ? '★' : '☆';
            reviewsHtml += '<div class="review-item">' +
                '<div class="review-header">' +
                    '<span class="review-author">' + r.author + '</span>' +
                    '<span class="review-stars">' + reviewStars + '</span>' +
                '</div>' +
                '<p class="review-comment">' + r.comment + '</p>' +
                '<div class="review-date">' + formatDate(r.date) + '</div>' +
            '</div>';
        });

        // Compute review stats
        var totalRating = 0;
        var starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        product.reviewsList.forEach(function(r) {
            totalRating += r.stars;
            var rounded = Math.round(r.stars);
            if (starCounts[rounded] !== undefined) starCounts[rounded]++;
        });
        var avgRating = product.reviewsList.length > 0 ? (totalRating / product.reviewsList.length).toFixed(1) : '0.0';
        var totalReviews = product.reviewsList.length;

        var ratingSummaryHtml = '';
        for (var star = 5; star >= 1; star--) {
            var pct = totalReviews > 0 ? (starCounts[star] / totalReviews * 100) : 0;
            ratingSummaryHtml += '<div class="rating-bar-row">' +
                '<span>' + star + '</span>' +
                '<div class="rating-bar-bg"><div class="rating-bar-fill" style="width:' + pct + '%"></div></div>' +
                '<span style="min-width:20px;text-align:right;">' + starCounts[star] + '</span>' +
            '</div>';
        }

        modal.innerHTML = 
            '<div class="modal-header-img" style="background:' + product.imgBg + '">' +
                '<img src="' + product.icon + '" alt="' + product.name + '" style="width:120px;height:120px;object-fit:cover;border-radius:16px;">' +
                '<button class="modal-close" id="modal-close-btn">&times;</button>' +
                (product.organic ? '<span class="mp-category-badge" style="position:absolute;bottom:12px;left:12px;background:rgba(255,255,255,0.95);font-size:0.8rem;font-weight:600;padding:6px 12px;border-radius:20px;color:#2D2A26;line-height:1;box-shadow:0 4px 12px rgba(0,0,0,0.1);z-index:10;text-transform:uppercase;letter-spacing:0.5px;">🌿 Orgánico Certificado</span>' : '') +
            '</div>' +
            '<div class="modal-body">' +
                '<h2 class="modal-title">' + product.name + '</h2>' +
                '<p class="modal-origin">📍 ' + product.seller.location + ' · Cosecha: ' + harvestFormatted + '</p>' +
                (product.passportImg ?
                    '<div class="passport-section">' +
                        '<h3 class="passport-title">📋 Pasaporte Digital de Calidad</h3>' +
                        '<div class="passport-img-wrapper">' +
                            '<a href="' + product.passportImg + '" target="_blank" title="Ver pasaporte en tamaño completo">' +
                                '<img src="' + product.passportImg + '" alt="Pasaporte Digital de Calidad" class="passport-img">' +
                            '</a>' +
                        '</div>' +
                    '</div>'
                : '') +
                (product.valueAddedMultiplier ?
                    '<div class="value-added-stats-card mb-4">' +
                        '<h3>📈 Análisis de Valor Agregado</h3>' +
                        '<div class="va-stats-grid">' +
                            '<div class="va-stat-item">' +
                                '<span class="va-stat-label">Materia Prima</span>' +
                                '<span class="va-stat-value">' + product.vaRawPrice + '</span>' +
                            '</div>' +
                            '<div class="va-stat-item arrow">➡️</div>' +
                            '<div class="va-stat-item highlight">' +
                                '<span class="va-stat-label">Multiplicador de Ingreso</span>' +
                                '<span class="va-stat-value">' + product.valueAddedMultiplier + '</span>' +
                            '</div>' +
                            '<div class="va-stat-item highlight green">' +
                                '<span class="va-stat-label">Incremento Neto Est.</span>' +
                                '<span class="va-stat-value">+' + product.vaIncrementPct + '%</span>' +
                            '</div>' +
                        '</div>' +
                        '<p class="va-stat-desc">' + product.vaAnalysisDesc + '</p>' +
                    '</div>'
                : '') +
                '<div class="modal-price-section">' +
                    '<div>' +
                        '<span class="modal-price">$' + product.price.toLocaleString('es-MX') + '</span>' +
                        '<span class="modal-price-unit"> / ' + product.unit + '</span>' +
                        '<div style="font-size:0.8rem;color:#7A7470;margin-top:4px;">Pedido mínimo: ' + product.minOrderText + ' · Disponible: ' + product.available + ' ' + product.unit.split(' ')[0] + '</div>' +
                    '</div>' +
                    '<div class="modal-add-to-cart-container">' +
                        '<div class="modal-qty-selector">' +
                            '<button class="modal-qty-btn" id="modal-qty-minus">-</button>' +
                            '<input type="text" class="modal-qty-val" id="modal-qty-val" value="' + product.minOrderVal + '" readonly>' +
                            '<button class="modal-qty-btn" id="modal-qty-plus">+</button>' +
                        '</div>' +
                        '<button class="modal-contact-btn" id="modal-add-to-cart-btn">Agregar al Carrito</button>' +
                    '</div>' +
                '</div>' +

                '<div class="row g-4 mb-4">' +
                    '<div class="col-12 col-md-6">' +
                        '<h3 style="font-size:0.95rem;font-weight:700;margin-bottom:12px;">📋 Especificaciones</h3>' +
                        '<div class="modal-details-grid">' + specsHtml + '</div>' +
                    '</div>' +
                    '<div class="col-12 col-md-6">' +
                        '<div class="modal-seller-section">' +
                            '<div class="modal-seller-header">' +
                                '<span class="modal-seller-avatar">' + product.seller.avatar + '</span>' +
                                '<div class="modal-seller-info">' +
                                    '<h4>' + product.seller.name + (product.verified || product.seller.verified ? ' ✅' : '') + '</h4>' +
                                    '<p>📍 ' + product.seller.location + ' · Miembro desde ' + product.seller.memberSince + '</p>' +
                                '</div>' +
                            '</div>' +
                            '<div class="modal-seller-stats">' +
                                '<div class="modal-seller-stat"><strong>★ ' + product.seller.rating + '</strong><span>Calificación</span></div>' +
                                '<div class="modal-seller-stat"><strong>' + product.seller.reviews + '</strong><span>Reseñas</span></div>' +
                                '<div class="modal-seller-stat"><strong>' + product.seller.totalSales + '</strong><span>Ventas</span></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                // Map Section
                '<div class="modal-map-container">' +
                    '<h3>📍 Localización del Rancho y Ruta Logística</h3>' +
                    '<div id="modal-map"></div>' +
                '</div>' +

                '<div class="modal-description mb-4">' +
                    '<h3>📝 Descripción del Producto</h3>' +
                    '<p>' + product.description + '</p>' +
                '</div>' +

                // Reviews Section
                '<div class="reviews-section">' +
                    '<h3>💬 Reseñas de Clientes</h3>' +
                    '<div class="rating-summary-box">' +
                        '<div class="average-rating-big">' +
                            '<div class="num">' + avgRating + '</div>' +
                            '<div class="stars">' + stars + '</div>' +
                            '<div class="count">' + totalReviews + ' reseñas</div>' +
                        '</div>' +
                        '<div class="rating-bars-container">' + ratingSummaryHtml + '</div>' +
                    '</div>' +
                    '<div class="reviews-list" id="modal-reviews-list">' + reviewsHtml + '</div>' +
                    
                    // Add Review Box
                    '<div class="add-review-box">' +
                        '<h4>Escribe una Reseña</h4>' +
                        '<div class="stars-rating-input" id="stars-rating-input">' +
                            '<span class="star-btn selected" data-value="1">★</span>' +
                            '<span class="star-btn selected" data-value="2">★</span>' +
                            '<span class="star-btn selected" data-value="3">★</span>' +
                            '<span class="star-btn selected" data-value="4">★</span>' +
                            '<span class="star-btn selected" data-value="5">★</span>' +
                        '</div>' +
                        '<textarea class="review-input" id="modal-review-comment" placeholder="Comparte tu experiencia con este productor..."></textarea>' +
                        '<button class="btn-submit-review" id="modal-review-submit-btn">Enviar Reseña</button>' +
                    '</div>' +
                '</div>' +
            '</div>';

        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Close button
        document.getElementById('modal-close-btn').addEventListener('click', closeProductModal);
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeProductModal();
        });

        // Quantity selector listeners
        var qtyInput = document.getElementById('modal-qty-val');
        var qtyMinus = document.getElementById('modal-qty-minus');
        var qtyPlus = document.getElementById('modal-qty-plus');

        qtyMinus.onclick = function() {
            var val = parseInt(qtyInput.value) || product.minOrderVal;
            if (val > product.minOrderVal) {
                qtyInput.value = val - 1;
            }
        };

        qtyPlus.onclick = function() {
            var val = parseInt(qtyInput.value) || product.minOrderVal;
            if (val < product.available) {
                qtyInput.value = val + 1;
            }
        };

        // Add to cart click
        document.getElementById('modal-add-to-cart-btn').onclick = function() {
            var qty = parseInt(qtyInput.value) || product.minOrderVal;
            addToCart(product.id, qty);
            closeProductModal();
            toggleCart();
        };

        // Star rating input listeners
        featuresState.selectedRatingInput = 5;
        var starBtns = document.querySelectorAll('#stars-rating-input .star-btn');
        starBtns.forEach(function(btn) {
            btn.onclick = function() {
                var rating = parseInt(btn.dataset.value);
                featuresState.selectedRatingInput = rating;
                starBtns.forEach(function(b) {
                    var v = parseInt(b.dataset.value);
                    if (v <= rating) {
                        b.classList.add('selected');
                    } else {
                        b.classList.remove('selected');
                    }
                });
            };
        });

        // Submit review click
        document.getElementById('modal-review-submit-btn').onclick = function() {
            var commentVal = document.getElementById('modal-review-comment').value.trim();
            if (!commentVal) {
                alert('Por favor escribe un comentario antes de enviar.');
                return;
            }
            var authorName = currentUser ? currentUser.name : 'Comprador Anónimo';
            submitReview(product.id, authorName, featuresState.selectedRatingInput, commentVal);
        };

        // Render Map
        setTimeout(function() {
            renderModalMap(product);
        }, 200);
    }

    function closeProductModal() {
        document.getElementById('product-modal-overlay').style.display = 'none';
        document.body.style.overflow = '';
        if (featuresState.modalMap) {
            featuresState.modalMap.remove();
            featuresState.modalMap = null;
        }
    }

    function renderModalMap(product) {
        if (featuresState.modalMap) {
            featuresState.modalMap.remove();
            featuresState.modalMap = null;
        }

        var destCoords = [19.3738, -99.0945]; // CEDA CDMX
        var origin = product.originCoords;

        featuresState.modalMap = L.map('modal-map', {
            center: origin,
            zoom: 6.5,
            zoomControl: true,
            attributionControl: false
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 18
        }).addTo(featuresState.modalMap);

        // Custom markers
        var farmIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background:#4A8C5C;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:14px;box-shadow:0 2px 8px rgba(74,140,92,0.4);border:2px solid white;">🚜</div>',
            iconSize: [28, 28], iconAnchor: [14, 14]
        });

        var destIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background:#C0392B;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:14px;box-shadow:0 2px 8px rgba(192,57,43,0.4);border:2px solid white;">🏪</div>',
            iconSize: [28, 28], iconAnchor: [14, 14]
        });

        L.marker(origin, { icon: farmIcon })
            .bindTooltip('<div class="small fw-bold">Origen: Rancho del productor</div>')
            .addTo(featuresState.modalMap);

        L.marker(destCoords, { icon: destIcon })
            .bindTooltip('<div class="small fw-bold">Destino: CEDA CDMX</div>')
            .addTo(featuresState.modalMap);

        // Draw dotted route
        var route = L.polyline([origin, destCoords], {
            color: '#C8952E',
            weight: 3,
            opacity: 0.8,
            dashArray: '8, 6'
        }).addTo(featuresState.modalMap);

        featuresState.modalMap.fitBounds([origin, destCoords], { padding: [30, 30] });

        // Calculate and add simulated distance tooltip
        var lat1 = origin[0], lon1 = origin[1];
        var lat2 = destCoords[0], lon2 = destCoords[1];
        var R = 6371; // km
        var dLat = (lat2 - lat1) * Math.PI / 180;
        var dLon = (lon2 - lon1) * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var dist = Math.round(R * c);

        route.bindTooltip('<div class="small fw-bold text-dark">Ruta: ~' + dist + ' km</div>', { sticky: true }).openTooltip();
        featuresState.modalMap.invalidateSize();
    }

    // ======================== CART LOGIC ========================

    function toggleCart() {
        var drawer = document.getElementById('cart-drawer');
        var overlay = document.getElementById('cart-drawer-overlay');
        featuresState.isCartOpen = !featuresState.isCartOpen;
        if (featuresState.isCartOpen) {
            drawer.classList.add('open');
            overlay.style.display = 'block';
        } else {
            drawer.classList.remove('open');
            overlay.style.display = 'none';
        }
    }

    function addToCart(productId, quantity) {
        var product = MARKETPLACE_PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        var existing = featuresState.cart.find(item => item.productId === productId);
        if (existing) {
            existing.quantity = Math.min(existing.quantity + quantity, product.available);
        } else {
            featuresState.cart.push({ productId: productId, quantity: quantity });
        }
        updateCartUI();
    }

    function updateCartQuantity(productId, change) {
        var product = MARKETPLACE_PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        var item = featuresState.cart.find(item => item.productId === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity < product.minOrderVal) {
                // If quantity drops below minimum order, remove from cart
                featuresState.cart = featuresState.cart.filter(i => i.productId !== productId);
            } else if (item.quantity > product.available) {
                item.quantity = product.available;
            }
        }
        updateCartUI();
    }

    function removeFromCart(productId) {
        featuresState.cart = featuresState.cart.filter(item => item.productId !== productId);
        updateCartUI();
    }

    function updateCartUI() {
        var cartBadge = document.getElementById('cart-badge');
        var cartBadgeFloat = document.getElementById('cart-badge-float');
        var floatBtn = document.getElementById('cart-floating-btn');
        var drawerBody = document.getElementById('cart-drawer-body');
        var drawerFooter = document.getElementById('cart-drawer-footer');

        var totalItems = featuresState.cart.reduce((sum, item) => sum + 1, 0);
        
        // Update badges
        cartBadge.textContent = totalItems;
        cartBadgeFloat.textContent = totalItems;

        if (totalItems > 0) {
            floatBtn.style.display = 'flex';
        } else {
            floatBtn.style.display = 'none';
            // Also close cart drawer if it is empty and open
            if (featuresState.isCartOpen && document.getElementById('cart-drawer').classList.contains('open')) {
                // Keep it open to show empty state, or let user close it
            }
        }

        if (totalItems === 0) {
            drawerBody.innerHTML = '<div class="cart-empty-message"><div class="cart-empty-icon">🛒</div><p>Tu carrito está vacío</p></div>';
            drawerFooter.style.display = 'none';
            return;
        }

        var subtotal = 0;
        var itemsHtml = '';

        featuresState.cart.forEach(function(item) {
            var p = MARKETPLACE_PRODUCTS.find(prod => prod.id === item.productId);
            if (!p) return;

            var itemCost = p.price * item.quantity;
            subtotal += itemCost;

            itemsHtml += '<div class="cart-item">' +
                '<div class="cart-item-img"><img src="' + p.icon + '" alt="' + p.name + '"></div>' +
                '<div class="cart-item-details">' +
                    '<div class="cart-item-name">' + p.name + '</div>' +
                    '<div class="cart-item-price">$' + p.price.toLocaleString('es-MX') + ' / ' + p.unit.split(' ')[0] + '</div>' +
                    '<div class="cart-item-quantity">' +
                        '<button class="cart-qty-btn modal-qty-btn-minus" onclick="window.updateCartQty(' + p.id + ', -1)">-</button>' +
                        '<span class="cart-qty-val">' + item.quantity + '</span>' +
                        '<button class="cart-qty-btn modal-qty-btn-plus" onclick="window.updateCartQty(' + p.id + ', 1)">+</button>' +
                    '</div>' +
                '</div>' +
                '<button class="cart-remove-btn" onclick="window.removeCartItem(' + p.id + ')" title="Quitar producto">×</button>' +
            '</div>';
        });

        // Set global hooks so inline onclick attributes work
        window.updateCartQty = function(id, change) {
            updateCartQuantity(id, change);
        };
        window.removeCartItem = function(id) {
            removeFromCart(id);
        };

        drawerBody.innerHTML = itemsHtml;
        drawerFooter.style.display = 'block';

        // Calculate simulated shipping cost based on distance and order size
        // e.g. base shipping $250 + $10 per unit
        var shipping = subtotal > 0 ? (250 + (featuresState.cart.reduce((sum, item) => sum + item.quantity, 0) * 1.5)) : 0;
        var total = subtotal + shipping;

        document.getElementById('cart-subtotal').textContent = '$' + subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 });
        document.getElementById('cart-shipping').textContent = '$' + shipping.toLocaleString('es-MX', { minimumFractionDigits: 2 });
        document.getElementById('cart-total').textContent = '$' + total.toLocaleString('es-MX', { minimumFractionDigits: 2 });
    }

    function checkoutCart() {
        if (featuresState.cart.length === 0) return;

        // Verify minimum order restrictions for all products before checking out
        for (var i = 0; i < featuresState.cart.length; i++) {
            var item = featuresState.cart[i];
            var prod = MARKETPLACE_PRODUCTS.find(p => p.id === item.productId);
            if (prod && item.quantity < prod.minOrderVal) {
                alert('No se cumple con el pedido mínimo de ' + prod.name + '. Debes pedir al menos ' + prod.minOrderText + '.');
                return;
            }
        }

        // Simular compra
        toggleCart();
        
        // Setup success modal fields
        var randomOrderId = '#MC-' + Math.floor(1000 + Math.random() * 9000);
        var deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 2 + Math.floor(Math.random() * 3)); // 2-5 days from now
        var deliveryFormatted = deliveryDate.toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });

        document.getElementById('success-order-id').textContent = randomOrderId;
        document.getElementById('success-delivery-date').textContent = deliveryFormatted;

        // Show overlay
        document.getElementById('checkout-success-overlay').style.display = 'flex';

        // Empty cart
        featuresState.cart = [];
        updateCartUI();
    }

    // ======================== REVIEWS LOGIC ========================

    function submitReview(productId, author, stars, comment) {
        var product = MARKETPLACE_PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        var newReview = {
            author: author,
            stars: stars,
            comment: comment,
            date: new Date().toISOString().split('T')[0]
        };

        product.reviewsList.unshift(newReview);
        
        // Recalculate average rating of product seller
        var total = 0;
        product.reviewsList.forEach(r => total += r.stars);
        var newAvg = parseFloat((total / product.reviewsList.length).toFixed(1));
        product.seller.rating = newAvg;
        product.seller.reviews = product.reviewsList.length;

        // Reopen / Refresh modal content
        openProductModal(productId);
        renderMarketplaceGrid(); // update stars in catalog
    }

    // ======================== PAGE CHANGE HOOKS ========================

    function hookIntoNavigation() {
        var pageIds = ['page-micampo', 'page-marketplace'];
        pageIds.forEach(function(pageId) {
            var el = document.getElementById(pageId);
            if (!el) return;
            var observer = new MutationObserver(function() {
                if (el.classList.contains('active')) {
                    if (pageId === 'page-micampo') {
                        if (!currentUser) {
                            showAuthModal('login');
                            setTimeout(function() {
                                document.querySelector('.nav-link[data-page="inicio"]').click();
                            }, 50);
                            return;
                        }
                        renderDashboard();
                    }
                    if (pageId === 'page-marketplace') {
                        renderMarketplace();
                    }
                }
            });
            observer.observe(el, { attributes: true, attributeFilter: ['class'] });
        });
    }

    // ======================== INIT ========================

    function initFeatures() {
        initAuth();
        hookIntoNavigation();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFeatures);
    } else {
        initFeatures();
    }

})();
