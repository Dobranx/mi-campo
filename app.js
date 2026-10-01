// ============================================================
// MI CAMPO INTELIGENTE — Main Application Logic
// ============================================================

(function() {
    'use strict';

    // ======================== CONSTANTS ========================
    const COORDS_SMT = [19.2842, -98.4347];
    const COORDS_CEDA = [19.3738, -99.0945];
    const RUTA_CARGA = [
        COORDS_SMT,
        [19.3351, -98.6258],
        [19.3090, -98.8988],
        [19.3516, -98.9959],
        COORDS_CEDA
    ];
    const GEOJSON_URL = 'https://raw.githubusercontent.com/angelnmara/geojson/master/mexicoHigh.json';

    // Region color mapping for Mexican states
    const REGION_COLORS = {
        'Baja California': '#E8C97A', 'Baja California Sur': '#E8C97A', 'Sonora': '#E8C97A', 'Sinaloa': '#E8C97A',
        'Chihuahua': '#C8952E', 'Coahuila': '#C8952E', 'Nuevo León': '#C8952E', 'Tamaulipas': '#C8952E', 'Durango': '#C8952E',
        'Aguascalientes': '#D4A054', 'Guanajuato': '#D4A054', 'Querétaro': '#D4A054', 'Hidalgo': '#D4A054', 'Tlaxcala': '#D4A054', 'Puebla': '#D4A054', 'México': '#D4A054', 'Ciudad de México': '#D4A054', 'Morelos': '#D4A054',
        'Jalisco': '#A67B2B', 'Colima': '#A67B2B', 'Michoacán': '#A67B2B', 'Nayarit': '#A67B2B', 'Zacatecas': '#A67B2B', 'San Luis Potosí': '#A67B2B',
        'Guerrero': '#8B6914', 'Oaxaca': '#8B6914', 'Chiapas': '#8B6914',
        'Veracruz': '#6E473B', 'Tabasco': '#6E473B', 'Campeche': '#6E473B', 'Yucatán': '#6E473B', 'Quintana Roo': '#6E473B'
    };

    // ======================== PRODUCTS DATA ========================
    const PRODUCTS = [
        {
            id: 'amaranto',
            name: 'Amaranto',
            icon: 'img/amaranto.png',
            unit: 'Tonelada',
            color: '#C8952E',
            chainOrigin: 18000,
            chainWholesale: null, // calculated from latest price
            chainRetailPerKg: 85,
            description: 'Grano ancestral de alto valor nutricional, cultivado principalmente en el altiplano central de México.',
            origin: 'Puebla, Tlaxcala, Morelos',
            season: 'Cosecha: Octubre — Diciembre',
            factors: 'Demanda internacional, cambio climático, incentivos gubernamentales'
        },
        {
            id: 'frijol',
            name: 'Frijol Negro',
            icon: 'img/frijol.png',
            unit: 'Bulto 50 kg',
            color: '#8B4513',
            chainOrigin: 1200,
            chainWholesale: null,
            chainRetailPerKg: 42,
            description: 'Leguminosa básica en la dieta mexicana. El frijol negro de Puebla es reconocido por su calidad.',
            origin: 'Puebla, Zacatecas, Durango',
            season: 'Cosecha: Sep — Nov (primavera-verano)',
            factors: 'Lluvias, demanda estacional, costos de transporte',
            data: [
                { fecha: '2026-05-11', precio: 1550.0 }, { fecha: '2026-05-12', precio: 1550.0 },
                { fecha: '2026-05-13', precio: 1550.0 }, { fecha: '2026-05-14', precio: 1580.0 },
                { fecha: '2026-05-15', precio: 1580.0 }, { fecha: '2026-05-18', precio: 1580.0 },
                { fecha: '2026-05-19', precio: 1600.0 }, { fecha: '2026-05-20', precio: 1600.0 },
                { fecha: '2026-05-21', precio: 1600.0 }, { fecha: '2026-05-22', precio: 1620.0 },
                { fecha: '2026-05-25', precio: 1620.0 }, { fecha: '2026-05-26', precio: 1620.0 },
                { fecha: '2026-05-27', precio: 1630.0 }, { fecha: '2026-05-28', precio: 1630.0 },
                { fecha: '2026-05-29', precio: 1640.0 }, { fecha: '2026-06-01', precio: 1640.0 },
                { fecha: '2026-06-02', precio: 1650.0 }, { fecha: '2026-06-03', precio: 1650.0 },
                { fecha: '2026-06-04', precio: 1650.0 }, { fecha: '2026-06-05', precio: 1660.0 },
                { fecha: '2026-06-08', precio: 1660.0 }, { fecha: '2026-06-09', precio: 1670.0 }
            ]
        },
        {
            id: 'tomate',
            name: 'Tomate Saladete',
            icon: 'img/tomate.png',
            unit: 'Caja 12 kg',
            color: '#EF4444',
            chainOrigin: 220,
            chainWholesale: null,
            chainRetailPerKg: 38,
            description: 'Variedad roma, firme y de excelente sabor. Principal hortaliza comercializada en centrales de abasto (Datos oficiales SNIIM CEDA CDMX).',
            origin: 'Puebla, Sinaloa, Jalisco',
            season: 'Producción todo el año (invernadero / campo)',
            factors: 'Clima, exportación a EE.UU., plagas, temporada de lluvias',
            data: [
                { fecha: '2026-05-11', precio: 560.0 }, { fecha: '2026-05-12', precio: 560.0 },
                { fecha: '2026-05-13', precio: 530.0 }, { fecha: '2026-05-14', precio: 520.0 },
                { fecha: '2026-05-15', precio: 520.0 }, { fecha: '2026-05-18', precio: 540.0 },
                { fecha: '2026-05-19', precio: 540.0 }, { fecha: '2026-05-20', precio: 530.0 },
                { fecha: '2026-05-21', precio: 520.0 }, { fecha: '2026-05-22', precio: 530.0 },
                { fecha: '2026-05-25', precio: 450.0 }, { fecha: '2026-05-26', precio: 420.0 },
                { fecha: '2026-05-27', precio: 420.0 }, { fecha: '2026-05-28', precio: 420.0 },
                { fecha: '2026-05-29', precio: 400.0 }, { fecha: '2026-06-01', precio: 350.0 },
                { fecha: '2026-06-02', precio: 350.0 }, { fecha: '2026-06-03', precio: 290.0 },
                { fecha: '2026-06-04', precio: 280.0 }, { fecha: '2026-06-05', precio: 270.0 },
                { fecha: '2026-06-08', precio: 310.0 }, { fecha: '2026-06-09', precio: 310.0 }
            ]
        },
        {
            id: 'cebolla',
            name: 'Cebolla Blanca',
            icon: 'img/cebolla.png',
            unit: 'Arpilla 30 kg',
            color: '#94A3B8',
            chainOrigin: 120,
            chainWholesale: null,
            chainRetailPerKg: 18,
            description: 'Hortaliza de altísima liquidez y volumen diario en el mercado mayorista CEDA CDMX. Variedad bola de primera calidad (SNIIM).',
            origin: 'Morelos, Puebla, Guanajuato',
            season: 'Producción continua todo el año',
            factors: 'Clima, lluvias, demanda en gastronomía y procesadores',
            data: [
                { fecha: '2026-05-11', precio: 180.0 }, { fecha: '2026-05-12', precio: 195.0 },
                { fecha: '2026-05-13', precio: 195.0 }, { fecha: '2026-05-14', precio: 195.0 },
                { fecha: '2026-05-15', precio: 195.0 }, { fecha: '2026-05-18', precio: 210.0 },
                { fecha: '2026-05-19', precio: 150.0 }, { fecha: '2026-05-20', precio: 150.0 },
                { fecha: '2026-05-21', precio: 150.0 }, { fecha: '2026-05-22', precio: 150.0 },
                { fecha: '2026-05-25', precio: 180.0 }, { fecha: '2026-05-26', precio: 180.0 },
                { fecha: '2026-05-27', precio: 180.0 }, { fecha: '2026-05-28', precio: 180.0 },
                { fecha: '2026-05-29', precio: 180.0 }, { fecha: '2026-06-01', precio: 150.0 },
                { fecha: '2026-06-02', precio: 150.0 }, { fecha: '2026-06-03', precio: 150.0 },
                { fecha: '2026-06-04', precio: 165.0 }, { fecha: '2026-06-05', precio: 150.0 },
                { fecha: '2026-06-08', precio: 300.0 }, { fecha: '2026-06-09', precio: 300.0 }
            ]
        },
        {
            id: 'chile_poblano',
            name: 'Chile Poblano',
            icon: 'img/chile.png',
            unit: 'Arpilla 20 kg',
            color: '#15803D',
            chainOrigin: 240,
            chainWholesale: null,
            chainRetailPerKg: 35,
            description: 'Chili clásico de alta liquidez comercial. Talla grande, firme, ideal para relleno y consumo nacional (Datos SNIIM CEDA CDMX).',
            origin: 'Puebla, Baja California, Sinaloa',
            season: 'Pico: Mayo — Octubre',
            factors: 'Lluvias de temporada, fiestas patrias, costos de flete',
            data: [
                { fecha: '2026-05-11', precio: 800.0 }, { fecha: '2026-05-12', precio: 800.0 },
                { fecha: '2026-05-13', precio: 660.0 }, { fecha: '2026-05-14', precio: 640.0 },
                { fecha: '2026-05-15', precio: 640.0 }, { fecha: '2026-05-18', precio: 640.0 },
                { fecha: '2026-05-19', precio: 640.0 }, { fecha: '2026-05-20', precio: 540.0 },
                { fecha: '2026-05-21', precio: 540.0 }, { fecha: '2026-05-22', precio: 540.0 },
                { fecha: '2026-05-25', precio: 440.0 }, { fecha: '2026-05-26', precio: 440.0 },
                { fecha: '2026-05-27', precio: 440.0 }, { fecha: '2026-05-28', precio: 440.0 },
                { fecha: '2026-05-29', precio: 440.0 }, { fecha: '2026-06-01', precio: 600.0 },
                { fecha: '2026-06-02', precio: 580.0 }, { fecha: '2026-06-03', precio: 320.0 },
                { fecha: '2026-06-04', precio: 320.0 }, { fecha: '2026-06-05', precio: 280.0 },
                { fecha: '2026-06-08', precio: 400.0 }, { fecha: '2026-06-09', precio: 400.0 }
            ]
        },
        {
            id: 'chile_serrano',
            name: 'Chile Serrano',
            icon: 'img/chile.png',
            unit: 'Arpilla 30 kg',
            color: '#16A34A',
            chainOrigin: 200,
            chainWholesale: null,
            chainRetailPerKg: 28,
            description: 'Verdura de alta rotación diaria y constante liquidez. Chile verde fresco de primera calidad (Datos SNIIM CEDA CDMX).',
            origin: 'San Luis Potosí, Tamaulipas, Sinaloa',
            season: 'Cosecha todo el año',
            factors: 'Clima, heladas, fluctuaciones de oferta estacional',
            data: [
                { fecha: '2026-05-11', precio: 660.0 }, { fecha: '2026-05-12', precio: 660.0 },
                { fecha: '2026-05-13', precio: 810.0 }, { fecha: '2026-05-14', precio: 810.0 },
                { fecha: '2026-05-15', precio: 810.0 }, { fecha: '2026-05-18', precio: 510.0 },
                { fecha: '2026-05-19', precio: 510.0 }, { fecha: '2026-05-20', precio: 390.0 },
                { fecha: '2026-05-21', precio: 420.0 }, { fecha: '2026-05-22', precio: 420.0 },
                { fecha: '2026-05-25', precio: 390.0 }, { fecha: '2026-05-26', precio: 390.0 },
                { fecha: '2026-05-27', precio: 330.0 }, { fecha: '2026-05-28', precio: 330.0 },
                { fecha: '2026-05-29', precio: 300.0 }, { fecha: '2026-06-01', precio: 390.0 },
                { fecha: '2026-06-02', precio: 360.0 }, { fecha: '2026-06-03', precio: 240.0 },
                { fecha: '2026-06-04', precio: 240.0 }, { fecha: '2026-06-05', precio: 300.0 },
                { fecha: '2026-06-08', precio: 330.0 }, { fecha: '2026-06-09', precio: 330.0 }
            ]
        },
        {
            id: 'papa',
            name: 'Papa Blanca (Alpha)',
            icon: 'img/papa.png',
            unit: 'Arpilla 50 kg',
            color: '#D97706',
            chainOrigin: 1100,
            chainWholesale: null,
            chainRetailPerKg: 45,
            description: 'Tuberculo de consumo masivo y máxima liquidez volumen en CEDA CDMX. Calidad de primera variedad Alpha (SNIIM).',
            origin: 'Sinaloa, Sonora, Puebla',
            season: 'Cosecha principal: Diciembre — Junio',
            factors: 'Almacenamiento en frío, fletes terrestres, importación de semilla',
            data: [
                { fecha: '2026-05-11', precio: 1450.0 }, { fecha: '2026-05-12', precio: 1450.0 },
                { fecha: '2026-05-13', precio: 1450.0 }, { fecha: '2026-05-14', precio: 1450.0 },
                { fecha: '2026-05-15', precio: 1450.0 }, { fecha: '2026-05-18', precio: 1600.0 },
                { fecha: '2026-05-19', precio: 1600.0 }, { fecha: '2026-05-20', precio: 1600.0 },
                { fecha: '2026-05-21', precio: 1600.0 }, { fecha: '2026-05-22', precio: 1600.0 },
                { fecha: '2026-05-25', precio: 1600.0 }, { fecha: '2026-05-26', precio: 1600.0 },
                { fecha: '2026-05-27', precio: 1600.0 }, { fecha: '2026-05-28', precio: 1600.0 },
                { fecha: '2026-05-29', precio: 1600.0 }, { fecha: '2026-06-01', precio: 1600.0 },
                { fecha: '2026-06-02', precio: 1600.0 }, { fecha: '2026-06-03', precio: 1750.0 },
                { fecha: '2026-06-04', precio: 1750.0 }, { fecha: '2026-06-05', precio: 1750.0 },
                { fecha: '2026-06-08', precio: 1750.0 }, { fecha: '2026-06-09', precio: 1750.0 }
            ]
        },
        {
            id: 'aguacate',
            name: 'Aguacate Hass',
            icon: 'img/aguacate.png',
            unit: 'Caja 9 kg',
            color: '#4A8C5C',
            chainOrigin: 280,
            chainWholesale: null,
            chainRetailPerKg: 75,
            description: 'Fruta / hortaliza de alto valor comercial y liquidez continua. Variedad Hass de exportación y mercado nacional (SNIIM CEDA CDMX).',
            origin: 'Michoacán, Jalisco, Estado de México',
            season: 'Producción continua todo el año (pico: Sep — Feb)',
            factors: 'Demanda de exportación EE.UU., floración, seguridad en franjas agrícolas',
            data: [
                { fecha: '2026-05-11', precio: 260.0 }, { fecha: '2026-05-12', precio: 280.0 },
                { fecha: '2026-05-13', precio: 280.0 }, { fecha: '2026-05-14', precio: 300.0 },
                { fecha: '2026-05-15', precio: 300.0 }, { fecha: '2026-05-18', precio: 320.0 },
                { fecha: '2026-05-19', precio: 320.0 }, { fecha: '2026-05-20', precio: 350.0 },
                { fecha: '2026-05-21', precio: 360.0 }, { fecha: '2026-05-22', precio: 380.0 },
                { fecha: '2026-05-25', precio: 400.0 }, { fecha: '2026-05-26', precio: 410.0 },
                { fecha: '2026-05-27', precio: 420.0 }, { fecha: '2026-05-28', precio: 420.0 },
                { fecha: '2026-05-29', precio: 420.0 }, { fecha: '2026-06-01', precio: 430.0 },
                { fecha: '2026-06-02', precio: 430.0 }, { fecha: '2026-06-03', precio: 430.0 },
                { fecha: '2026-06-04', precio: 430.0 }, { fecha: '2026-06-05', precio: 430.0 },
                { fecha: '2026-06-08', precio: 430.0 }, { fecha: '2026-06-09', precio: 430.0 }
            ]
        },
        {
            id: 'maiz',
            name: 'Maíz Blanco',
            icon: 'img/maiz.png',
            unit: 'Bulto 50 kg',
            color: '#F59E0B',
            chainOrigin: 360,
            chainWholesale: null,
            chainRetailPerKg: 12,
            description: 'Base de la alimentación mexicana. El maíz blanco se destina principalmente a tortilla y masa (Datos SNIIM CEDA CDMX).',
            origin: 'Sinaloa, Jalisco, Puebla',
            season: 'Cosecha PV: Nov — Ene; OI: May — Jul',
            factors: 'Política de precios de garantía, tipo de cambio, importaciones',
            data: [
                { fecha: '2026-05-11', precio: 470.0 }, { fecha: '2026-05-12', precio: 470.0 },
                { fecha: '2026-05-13', precio: 475.0 }, { fecha: '2026-05-14', precio: 475.0 },
                { fecha: '2026-05-15', precio: 475.0 }, { fecha: '2026-05-18', precio: 475.0 },
                { fecha: '2026-05-19', precio: 475.0 }, { fecha: '2026-05-20', precio: 475.0 },
                { fecha: '2026-05-21', precio: 475.0 }, { fecha: '2026-05-22', precio: 475.0 },
                { fecha: '2026-05-25', precio: 475.0 }, { fecha: '2026-05-26', precio: 475.0 },
                { fecha: '2026-05-27', precio: 475.0 }, { fecha: '2026-05-28', precio: 480.0 },
                { fecha: '2026-05-29', precio: 480.0 }, { fecha: '2026-06-01', precio: 480.0 },
                { fecha: '2026-06-02', precio: 480.0 }, { fecha: '2026-06-03', precio: 480.0 },
                { fecha: '2026-06-04', precio: 480.0 }, { fecha: '2026-06-05', precio: 485.0 },
                { fecha: '2026-06-08', precio: 485.0 }, { fecha: '2026-06-09', precio: 485.0 }
            ]
        },
        {
            id: 'rosa',
            name: 'Rosa Tallo Largo',
            icon: 'img/rosa.png',
            unit: 'Gruesa (12 doc)',
            color: '#EC4899',
            chainOrigin: 550,
            chainWholesale: null,
            chainRetailPerKg: null, // not applicable
            chainRetailUnit: 'Docena',
            chainRetailPrice: 180,
            description: 'Flor de corte premium. México es el principal exportador de flores en América Latina (Datos SNIIM Puebla CEDA CDMX).',
            origin: 'Estado de México, Puebla, Morelos',
            season: 'Todo el año (pico: Feb, May, Nov)',
            factors: 'Fechas festivas (14 Feb, 10 May), exportación, clima heladas',
            data: [
                { fecha: '2026-05-04', precio: 900.0 }, { fecha: '2026-05-06', precio: 1100.0 },
                { fecha: '2026-05-07', precio: 1000.0 }, { fecha: '2026-05-08', precio: 1100.0 },
                { fecha: '2026-05-11', precio: 1000.0 }, { fecha: '2026-05-12', precio: 1000.0 },
                { fecha: '2026-05-13', precio: 1000.0 }, { fecha: '2026-05-14', precio: 800.0 },
                { fecha: '2026-05-15', precio: 750.0 }, { fecha: '2026-05-18', precio: 700.0 },
                { fecha: '2026-05-19', precio: 450.0 }, { fecha: '2026-05-20', precio: 450.0 },
                { fecha: '2026-05-21', precio: 400.0 }, { fecha: '2026-05-22', precio: 400.0 },
                { fecha: '2026-05-25', precio: 450.0 }, { fecha: '2026-05-26', precio: 500.0 },
                { fecha: '2026-05-27', precio: 550.0 }, { fecha: '2026-05-28', precio: 450.0 },
                { fecha: '2026-05-29', precio: 400.0 }, { fecha: '2026-06-01', precio: 400.0 },
                { fecha: '2026-06-02', precio: 400.0 }, { fecha: '2026-06-03', precio: 450.0 },
                { fecha: '2026-06-04', precio: 550.0 }, { fecha: '2026-06-05', precio: 600.0 },
                { fecha: '2026-06-08', precio: 700.0 }, { fecha: '2026-06-09', precio: 700.0 }
            ]
        }
    ];

    // ======================== STATE ========================
    let state = {
        currentPage: 'inicio',
        mapPhase: 1,
        map: null,
        geojsonLayer: null,
        geojsonData: null,
        markersLayer: null,
        routeLayer: null,
        selectedProduct: null,
        mainChart: null,
        comparadorChart: null,
        sparklineCharts: {},
        seasonalChart: null
    };

    // ======================== SEEDED RANDOM (for amaranto GBM) ========================
    function mulberry32(seed) {
        return function() {
            seed |= 0; seed = seed + 0x6D2B79F5 | 0;
            let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
            t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };
    }

    function boxMuller(rng) {
        const u1 = rng();
        const u2 = rng();
        return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    }

    function getBusinessDays(startStr, endStr) {
        const days = [];
        let current = new Date(startStr + 'T00:00:00');
        const end = new Date(endStr + 'T00:00:00');
        while (current <= end) {
            const dow = current.getDay();
            if (dow !== 0 && dow !== 6) {
                days.push(new Date(current));
            }
            current.setDate(current.getDate() + 1);
        }
        return days;
    }

    function simulateAmaranto() {
        const days = getBusinessDays('2021-01-01', '2026-06-09');
        const N = days.length;
        const S0 = 20000, mu = 0.045, sigma = 0.12, dt = 1 / 252;
        const rng = mulberry32(42);

        let cumSum = 0;
        const data = [];
        for (let i = 0; i < N; i++) {
            const Z = boxMuller(rng);
            cumSum += Z * Math.sqrt(dt);
            const t = i * dt;
            const gbm = S0 * Math.exp((mu - 0.5 * sigma * sigma) * t + sigma * cumSum);
            const seasonality = 800 * Math.sin(2 * Math.PI * t + Math.PI / 4);
            const price = Math.round((gbm + seasonality) * 100) / 100;
            const yyyy = days[i].getFullYear();
            const mm = String(days[i].getMonth() + 1).padStart(2, '0');
            const dd = String(days[i].getDate()).padStart(2, '0');
            data.push({ fecha: `${yyyy}-${mm}-${dd}`, precio: price });
        }
        return data;
    }

    function extendProductData(product, targetEndStr) {
        if (!product.data || product.data.length === 0) return;
        
        const lastEntry = product.data[product.data.length - 1];
        const lastDateStr = lastEntry.fecha;
        let lastPrice = lastEntry.precio;
        
        const nextDays = getBusinessDays(lastDateStr, targetEndStr);
        if (nextDays.length > 0) {
            const firstDateStr = nextDays[0].toISOString().split('T')[0];
            if (firstDateStr === lastDateStr) {
                nextDays.shift();
            }
        }
        
        let seed = 0;
        for (let i = 0; i < product.id.length; i++) {
            seed += product.id.charCodeAt(i);
        }
        const rng = mulberry32(seed);
        
        nextDays.forEach(day => {
            const yyyy = day.getFullYear();
            const mm = String(day.getMonth() + 1).padStart(2, '0');
            const dd = String(day.getDate()).padStart(2, '0');
            const dateStr = `${yyyy}-${mm}-${dd}`;
            
            let priceChange = 0;
            
            if (product.id === 'frijol') {
                priceChange = (rng() - 0.45) * 15; 
                lastPrice = Math.round((lastPrice + priceChange) * 10) / 10;
            } else if (product.id === 'tomate') {
                priceChange = (rng() - 0.48) * 56;
                lastPrice = Math.round((lastPrice + priceChange) * 100) / 100;
                if (lastPrice < 210) lastPrice = 210 + rng() * 35;
                if (lastPrice > 560) lastPrice = 560 - rng() * 35;
            } else if (product.id === 'maiz') {
                priceChange = (rng() - 0.5) * 6;
                lastPrice = Math.round((lastPrice + priceChange) * 10) / 10;
                if (lastPrice < 380) lastPrice = 380 + rng() * 5;
                if (lastPrice > 450) lastPrice = 450 - rng() * 5;
            } else if (product.id === 'rosa') {
                const isMay = (day.getMonth() === 4);
                const dayOfMonth = day.getDate();
                if (isMay && dayOfMonth <= 12) {
                    const targetSpike = 1350 + rng() * 150;
                    const stepsLeft = 12 - dayOfMonth;
                    lastPrice = lastPrice + (targetSpike - lastPrice) / (stepsLeft + 1);
                } else if (isMay && dayOfMonth > 12) {
                    const targetBase = 720 + rng() * 60;
                    const stepsLeft = 32 - dayOfMonth;
                    lastPrice = lastPrice - (lastPrice - targetBase) / (stepsLeft + 1);
                } else {
                    priceChange = (rng() - 0.5) * 30;
                    lastPrice = lastPrice + priceChange;
                    if (lastPrice < 680) lastPrice = 680 + rng() * 20;
                    if (lastPrice > 900) lastPrice = 900 - rng() * 20;
                }
                lastPrice = Math.round(lastPrice / 10) * 10;
            }
            
            product.data.push({ fecha: dateStr, precio: lastPrice });
        });
    }

    // Generate amaranto data and attach to product
    PRODUCTS[0].data = simulateAmaranto();

    // Extend other products data to today (2026-06-09)
    PRODUCTS.slice(1).forEach(p => {
        extendProductData(p, '2026-06-09');
    });

    // Set chainWholesale from latest price for each product
    PRODUCTS.forEach(p => {
        if (p.data && p.data.length > 0) {
            p.chainWholesale = p.data[p.data.length - 1].precio;
        }
    });

    // ======================== UTILITIES ========================
    function formatCurrency(value, decimals = 2) {
        return '$' + value.toLocaleString('es-MX', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    }

    function formatDate(dateStr) {
        const d = new Date(dateStr + 'T00:00:00');
        return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
    }

    function formatShortDate(dateStr) {
        const d = new Date(dateStr + 'T00:00:00');
        return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
    }

    // ======================== NAVIGATION ========================
    function initNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                switchPage(page);
            });
        });
    }

    function switchPage(page) {
        state.currentPage = page;
        // Update nav links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[data-page="${page}"]`);
        if (activeLink) activeLink.classList.add('active');
        // Update pages
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const pageEl = document.getElementById(`page-${page}`);
        if (pageEl) pageEl.classList.add('active');
        // Re-render specific pages
        if (page === 'inicio' && state.map) {
            setTimeout(() => state.map.invalidateSize(), 100);
        }
        if (page === 'cotizaciones') {
            renderCotizOverview();
        }
        if (page === 'comparador') {
            renderComparador();
        }
        if (page === 'proyecciones') {
            renderProyecciones();
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ======================== CLOCK ========================
    function updateClock() {
        const clockEl = document.getElementById('current-time');
        if (!clockEl) return;
        const now = new Date();
        const timeStr = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        clockEl.textContent = timeStr;
    }

    // ======================== MAP ========================
    function initMap() {
        const isMobile = window.innerWidth <= 768;
        state.map = L.map('map', {
            center: [23.6345, -102.5528],
            zoom: isMobile ? 3.8 : 4.6,
            zoomSnap: 0.1,
            zoomControl: false,
            attributionControl: false
        });

        // Light warm tile
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap, © CARTO',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(state.map);

        L.control.zoom({ position: 'topleft' }).addTo(state.map);

        // Load GeoJSON
        fetch(GEOJSON_URL)
            .then(r => r.json())
            .then(data => {
                state.geojsonData = data;
                renderMapPhase1();
            })
            .catch(err => console.error('GeoJSON load error:', err));

        // Back button
        document.getElementById('map-back-btn').addEventListener('click', () => {
            if (state.mapPhase === 3) {
                setMapPhase(2);
            } else if (state.mapPhase === 2) {
                setMapPhase(1);
            }
        });

        // Search
        document.getElementById('map-search').addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            filterMapStates(query);
        });
    }

    function setMapPhase(phase) {
        state.mapPhase = phase;
        // Update stepper
        document.querySelectorAll('.stepper-bar .step').forEach(s => {
            const stepNum = parseInt(s.dataset.step);
            s.classList.remove('active', 'completed');
            if (stepNum < phase) s.classList.add('completed');
            if (stepNum === phase) s.classList.add('active');
        });
        // Back button
        document.getElementById('map-back-btn').style.display = phase > 1 ? 'inline-flex' : 'none';

        // Toggle municipal details
        const detailEl = document.getElementById('municipal-detail-section');
        if (detailEl) detailEl.style.display = phase === 3 ? 'block' : 'none';

        // Render phase
        if (phase === 1) renderMapPhase1();
        else if (phase === 2) renderMapPhase2();
        else if (phase === 3) renderMapPhase3();
    }

    function clearMapLayers() {
        if (state.geojsonLayer) { state.map.removeLayer(state.geojsonLayer); state.geojsonLayer = null; }
        if (state.markersLayer) { state.map.removeLayer(state.markersLayer); state.markersLayer = null; }
        if (state.routeLayer) { state.map.removeLayer(state.routeLayer); state.routeLayer = null; }
    }

    function renderMapPhase1() {
        clearMapLayers();
        state.map.setView([23.6345, -102.5528], window.innerWidth <= 768 ? 3.8 : 4.6, { animate: true });

        // Show legend, hide others
        document.getElementById('region-legend').style.display = 'block';
        document.getElementById('state-info-card').style.display = 'none';
        document.getElementById('municipality-info-card').style.display = 'none';
        document.getElementById('map-search').placeholder = 'Buscar estado...';

        if (!state.geojsonData) return;

        state.geojsonLayer = L.geoJSON(state.geojsonData, {
            style: (feature) => {
                const name = feature.properties.name || '';
                const color = REGION_COLORS[name] || '#D4A054';
                return {
                    fillColor: color,
                    color: '#FFFFFF',
                    weight: 1.5,
                    fillOpacity: 0.65
                };
            },
            onEachFeature: (feature, layer) => {
                const name = feature.properties.name || 'Estado';
                // Custom tooltip
                layer.bindTooltip(
                    `<div class="custom-tooltip">
                        <div class="tooltip-title">${name}</div>
                        <div class="tooltip-row">📍 Haz clic para explorar</div>
                    </div>`,
                    { className: 'clean-tooltip', sticky: true }
                );
                layer.on('click', () => {
                    setMapPhase(2);
                });
                layer.on('mouseover', () => {
                    layer.setStyle({ fillOpacity: 0.85, weight: 2.5, color: '#C8952E' });
                });
                layer.on('mouseout', () => {
                    layer.setStyle({ fillOpacity: 0.65, weight: 1.5, color: '#FFFFFF' });
                });
            }
        }).addTo(state.map);
    }

    function filterMapStates(query) {
        if (!state.geojsonLayer) return;
        state.geojsonLayer.eachLayer(layer => {
            const name = (layer.feature.properties.name || '').toLowerCase();
            if (query === '' || name.includes(query)) {
                layer.setStyle({ fillOpacity: 0.65 });
            } else {
                layer.setStyle({ fillOpacity: 0.1 });
            }
        });
    }

    function renderMapPhase2() {
        clearMapLayers();
        state.map.setView([19.0414, -98.2063], 8, { animate: true });

        // Show state info, hide legend
        document.getElementById('region-legend').style.display = 'none';
        document.getElementById('municipality-info-card').style.display = 'none';
        document.getElementById('map-search').placeholder = 'Buscar municipio...';

        const stateCard = document.getElementById('state-info-card');
        stateCard.style.display = 'block';
        stateCard.innerHTML = `
            <h3>Puebla</h3>
            <div class="info-row"><span class="label"></span> Capital: Puebla de Zaragoza</div>
            <div class="info-row"><span class="label"></span> Población: 6.6 millones</div>
            <div class="info-row"><span class="label"></span> Superficie: 34,290 km²</div>
            <div class="info-row"><span class="label"></span> Vocación: Agricultura e Industria</div>
        `;

        // Show Puebla polygon
        if (state.geojsonData) {
            const pueblaFeatures = state.geojsonData.features.filter(f => f.properties.name === 'Puebla');
            if (pueblaFeatures.length > 0) {
                state.geojsonLayer = L.geoJSON(
                    { type: 'FeatureCollection', features: pueblaFeatures },
                    {
                        style: () => ({ fillColor: '#D4A054', color: '#C8952E', weight: 2, fillOpacity: 0.25 })
                    }
                ).addTo(state.map);
            }
        }

        // San Martín Texmelucan marker
        const markerIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background:#C8952E;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:16px;box-shadow:0 3px 12px rgba(200,149,46,0.4);border:3px solid white;cursor:pointer;">🌱</div>',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });

        state.markersLayer = L.layerGroup();
        const marker = L.marker(COORDS_SMT, { icon: markerIcon })
            .bindTooltip(
                `<div class="custom-tooltip">
                    <div class="tooltip-title">San Martín Texmelucan</div>
                    <div class="tooltip-row"> Población: 155,738 hab.</div>
                    <div class="tooltip-row"> Superficie: 71.2 km²</div>
                    <div class="tooltip-row" style="margin-top:6px;color:#C8952E;font-weight:600;">Haz clic para seleccionar →</div>
                </div>`,
                { className: 'clean-tooltip' }
            )
            .on('click', () => {
                setMapPhase(3);
            });
        state.markersLayer.addLayer(marker).addTo(state.map);
    }

    function renderMapPhase3() {
        clearMapLayers();
        state.map.setView([19.3290, -98.7646], 10, { animate: true });

        // Show municipality info
        document.getElementById('region-legend').style.display = 'none';
        document.getElementById('state-info-card').style.display = 'none';
        const muniCard = document.getElementById('municipality-info-card');
        muniCard.style.display = 'block';
        muniCard.innerHTML = `
            <h3>San Martín Texmelucan</h3>
            <div class="info-row"><span class="label"></span> Puebla, México</div>
            <div class="info-row"><span class="label"></span> 155,738 habitantes</div>
            <div class="info-row"><span class="label"></span> Mercado: >$150M MXN/mes</div>
            <div class="info-row"><span class="label"></span> Distancia CEDA: ~85 km</div>
            <button class="btn-primary" onclick="document.querySelector('.nav-link[data-page=cotizaciones]').click()"> Ver Cotizaciones</button>
        `;

        // Markers
        state.markersLayer = L.layerGroup();

        const originIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background:#4A8C5C;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:18px;box-shadow:0 3px 12px rgba(74,140,92,0.4);border:3px solid white;">🚛</div>',
            iconSize: [36, 36], iconAnchor: [18, 18]
        });

        const destIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background:#C0392B;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:18px;box-shadow:0 3px 12px rgba(192,57,43,0.4);border:3px solid white;">🏪</div>',
            iconSize: [36, 36], iconAnchor: [18, 18]
        });

        L.marker(COORDS_SMT, { icon: originIcon })
            .bindTooltip('<div class="custom-tooltip"><div class="tooltip-title">San Martín Texmelucan</div><div class="tooltip-row">Nodo logístico agrícola (Origen)</div></div>', { className: 'clean-tooltip' })
            .addTo(state.markersLayer);

        L.marker(COORDS_CEDA, { icon: destIcon })
            .bindTooltip('<div class="custom-tooltip"><div class="tooltip-title">Central de Abasto, CDMX</div><div class="tooltip-row">Destino: CEDA CDMX</div></div>', { className: 'clean-tooltip' })
            .addTo(state.markersLayer);

        state.markersLayer.addTo(state.map);

        // Route
        state.routeLayer = L.polyline(RUTA_CARGA, {
            color: '#C8952E',
            weight: 4,
            opacity: 0.9,
            dashArray: '12, 8',
            lineCap: 'round'
        }).addTo(state.map);

        // Fit bounds
        state.map.fitBounds([COORDS_SMT, COORDS_CEDA], { padding: [60, 60] });

        // Render municipal detail below the map
        renderMunicipalDetail();
    }

    function renderMunicipalDetail() {
        // Check if detail already exists
        let detailEl = document.getElementById('municipal-detail-section');
        if (!detailEl) {
            detailEl = document.createElement('div');
            detailEl.id = 'municipal-detail-section';
            detailEl.className = 'municipal-detail animate-slideUp';
            document.getElementById('page-inicio').insertBefore(detailEl, document.querySelector('.stepper-bar'));
        }
        detailEl.innerHTML = `
            <div class="agricultural-profile">
                <h3> Perfil Agrícola</h3>
                <p>San Martín Texmelucan alberga el <strong>Tianguis de San Lucas Atoyatenco</strong>, considerado uno de los centros mayoristas al aire libre más grandes de América Latina. Destaca por la concentración y exportación regional de hortalizas (chile poblano, tomate, cebolla), legumbres y floricultura, siendo el puente logístico principal hacia la Ciudad de México y el sureste del país.</p>
            </div>
        `;
        detailEl.style.display = 'block';
    }

    // ======================== COTIZACIONES ========================
    function renderCotizOverview() {
        const container = document.getElementById('cotiz-overview');
        const detail = document.getElementById('cotiz-detail');
        container.style.display = 'flex';
        detail.style.display = 'none';
        document.getElementById('back-to-overview').style.display = 'none';

        container.innerHTML = '';
        PRODUCTS.forEach((product, idx) => {
            const data = product.data;
            const lastPrice = data[data.length - 1].precio;
            const prevPrice = data[data.length - 2].precio;
            const change = lastPrice - prevPrice;
            const changePct = ((change / prevPrice) * 100).toFixed(2);
            const isPositive = change >= 0;

            const col = document.createElement('div');
            col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-3 card-enter';
            col.style.animationDelay = `${idx * 80}ms`;

            const card = document.createElement('div');
            card.className = 'product-card h-100';
            card.innerHTML = `
                <div class="card-header">
                    <div class="product-icon" style="background:${product.color}15"><img src="${product.icon}" alt="${product.name}" style="width:36px;height:36px;object-fit:cover;border-radius:8px;"></div>
                </div>
                <div class="product-name">${product.name}</div>
                <div class="product-unit">${product.unit}</div>
                <div class="product-price">${formatCurrency(lastPrice)}</div>
                <div class="product-change ${isPositive ? 'positive' : 'negative'}">
                    ${isPositive ? '▲' : '▼'} ${formatCurrency(Math.abs(change))} (${isPositive ? '+' : ''}${changePct}%)
                </div>
                <div class="sparkline-container"><canvas id="spark-${product.id}"></canvas></div>
            `;
            card.addEventListener('click', () => openProductDetail(product.id));
            col.appendChild(card);
            container.appendChild(col);
        });

        // Render sparklines after DOM update
        requestAnimationFrame(() => {
            PRODUCTS.forEach(p => renderSparkline(p));
        });
    }

    function renderSparkline(product) {
        const canvas = document.getElementById(`spark-${product.id}`);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Destroy previous if exists
        if (state.sparklineCharts[product.id]) {
            state.sparklineCharts[product.id].destroy();
        }

        // Use last 15 data points
        const recentData = product.data.slice(-15);
        const labels = recentData.map(d => d.fecha);
        const values = recentData.map(d => d.precio);

        state.sparklineCharts[product.id] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    borderColor: product.color,
                    borderWidth: 2,
                    fill: true,
                    backgroundColor: product.color + '15',
                    pointRadius: 0,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                scales: {
                    x: { display: false },
                    y: { display: false }
                },
                elements: { line: { borderJoinStyle: 'round' } }
            }
        });
    }

    function openProductDetail(productId) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;
        state.selectedProduct = product;

        document.getElementById('cotiz-overview').style.display = 'none';
        const detail = document.getElementById('cotiz-detail');
        detail.style.display = 'block';
        detail.classList.add('animate-fadeIn');
        document.getElementById('back-to-overview').style.display = 'inline-flex';

        // Header
        document.getElementById('detail-header').innerHTML = `
            <div class="detail-product-icon" style="background:${product.color}15"><img src="${product.icon}" alt="${product.name}" style="width:44px;height:44px;object-fit:cover;border-radius:10px;"></div>
            <div>
                <div class="detail-product-name">${product.name}</div>
                <div class="detail-product-unit">${product.unit} · ${product.origin}</div>
            </div>
        `;

        // KPIs
        renderKPIs(product);

        // Chart
        renderMainChart(product, 'all');

        // Price chain
        renderPriceChain(product);

        // Table
        renderPriceTable(product);

        // Range buttons
        document.querySelectorAll('.range-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.range === 'all') btn.classList.add('active');
            btn.onclick = () => {
                document.querySelectorAll('.range-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderMainChart(product, btn.dataset.range);
            };
        });

        // Back button
        document.getElementById('back-to-overview').onclick = () => {
            detail.style.display = 'none';
            detail.classList.remove('animate-fadeIn');
            document.getElementById('back-to-overview').style.display = 'none';
            renderCotizOverview();
        };

        // Download CSV
        document.getElementById('download-csv').onclick = () => downloadCSV(product);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderKPIs(product) {
        const data = product.data;
        const latest = data[data.length - 1];
        const prev = data[data.length - 2];
        const change = latest.precio - prev.precio;
        const changePct = ((change / prev.precio) * 100).toFixed(2);
        const prices = data.map(d => d.precio);
        const avg30 = data.slice(-30).reduce((s, d) => s + d.precio, 0) / Math.min(30, data.length);
        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        const isPositive = change >= 0;

        document.getElementById('kpi-row').innerHTML = `
            <div class="col-6 col-md-4 col-lg mb-3">
                <div class="kpi-card highlight h-100">
                    <div class="kpi-label">Precio Actual</div>
                    <div class="kpi-value">${formatCurrency(latest.precio)}</div>
                    <div class="kpi-sub">${formatDate(latest.fecha)}</div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg mb-3">
                <div class="kpi-card h-100">
                    <div class="kpi-label">Variación Diaria</div>
                    <div class="kpi-value" style="color:${isPositive ? '#059669' : '#DC2626'}">${isPositive ? '+' : ''}${formatCurrency(change)}</div>
                    <div class="kpi-sub">${isPositive ? '+' : ''}${changePct}%</div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg mb-3">
                <div class="kpi-card h-100">
                    <div class="kpi-label">Promedio 30D</div>
                    <div class="kpi-value">${formatCurrency(avg30)}</div>
                    <div class="kpi-sub">Últimos 30 registros</div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg mb-3">
                <div class="kpi-card h-100">
                    <div class="kpi-label">Máximo</div>
                    <div class="kpi-value">${formatCurrency(maxPrice)}</div>
                    <div class="kpi-sub">Del período</div>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg mb-3">
                <div class="kpi-card h-100">
                    <div class="kpi-label">Mínimo</div>
                    <div class="kpi-value">${formatCurrency(minPrice)}</div>
                    <div class="kpi-sub">Del período</div>
                </div>
            </div>
        `;
    }

    function renderMainChart(product, range) {
        const canvas = document.getElementById('main-chart');
        const ctx = canvas.getContext('2d');

        if (state.mainChart) {
            state.mainChart.destroy();
        }

        let data = product.data;
        if (range !== 'all') {
            const n = parseInt(range);
            data = data.slice(-n);
        }

        const labels = data.map(d => formatShortDate(d.fecha));
        const values = data.map(d => d.precio);

        // Moving average (7-day)
        const ma7 = [];
        for (let i = 0; i < values.length; i++) {
            if (i < 6) { ma7.push(null); }
            else {
                const slice = values.slice(i - 6, i + 1);
                ma7.push(slice.reduce((a, b) => a + b, 0) / 7);
            }
        }

        const gradient = ctx.createLinearGradient(0, 0, 0, 380);
        gradient.addColorStop(0, product.color + '40');
        gradient.addColorStop(1, product.color + '05');

        state.mainChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Precio',
                        data: values,
                        borderColor: product.color,
                        borderWidth: 2.5,
                        fill: true,
                        backgroundColor: gradient,
                        pointRadius: data.length > 60 ? 0 : 3,
                        pointHoverRadius: 6,
                        pointBackgroundColor: product.color,
                        pointBorderColor: '#FFFFFF',
                        pointBorderWidth: 2,
                        tension: 0.3
                    },
                    {
                        label: 'Media Móvil 7D',
                        data: ma7,
                        borderColor: '#7A7470',
                        borderWidth: 1.5,
                        borderDash: [6, 4],
                        fill: false,
                        pointRadius: 0,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { intersect: false, mode: 'index' },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        align: 'end',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'line',
                            padding: 20,
                            font: { family: 'Inter', size: 12 }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#FFFFFF',
                        titleColor: '#2D2A26',
                        bodyColor: '#7A7470',
                        borderColor: '#E8DFD0',
                        borderWidth: 1,
                        padding: 14,
                        cornerRadius: 10,
                        titleFont: { family: 'Inter', size: 13, weight: '600' },
                        bodyFont: { family: 'Inter', size: 12 },
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                if (context.parsed.y === null) return '';
                                return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: {
                            font: { family: 'Inter', size: 11 },
                            color: '#7A7470',
                            maxTicksLimit: 12,
                            maxRotation: 0
                        }
                    },
                    y: {
                        grid: { color: '#F5EDE0' },
                        ticks: {
                            font: { family: 'Inter', size: 11 },
                            color: '#7A7470',
                            callback: (v) => formatCurrency(v, 0)
                        }
                    }
                }
            }
        });
    }

    function renderPriceChain(product) {
        const container = document.getElementById('price-chain');
        const origin = product.chainOrigin;
        const wholesale = product.chainWholesale;
        const isRosa = product.id === 'rosa';

        const retailPrice = isRosa ? product.chainRetailPrice : product.chainRetailPerKg;
        const retailUnit = isRosa ? product.chainRetailUnit : 'por Kg';

        const margin1 = wholesale > 0 ? (((wholesale - origin) / origin) * 100).toFixed(1) : '—';

        container.innerHTML = `
            <div class="chain-node origin">
                <div class="chain-icon"></div>
                <div class="chain-label">Origen</div>
                <div class="chain-sublabel">Agricultor</div>
                <div class="chain-price">${formatCurrency(origin)}</div>
                <div class="chain-unit">/ ${product.unit}</div>
            </div>
            <div class="chain-arrow">
                <div class="margin-label">+${margin1}%</div>
                <div class="arrow-visual">→ → →</div>
            </div>
            <div class="chain-node wholesale">
                <div class="chain-icon"></div>
                <div class="chain-label">Mayoreo</div>
                <div class="chain-sublabel">Central de Abasto</div>
                <div class="chain-price">${formatCurrency(wholesale)}</div>
                <div class="chain-unit">/ ${product.unit}</div>
            </div>
            <div class="chain-arrow">
                <div class="margin-label">Menudeo</div>
                <div class="arrow-visual">→ → →</div>
            </div>
            <div class="chain-node retail">
                <div class="chain-icon"></div>
                <div class="chain-label">Menudeo</div>
                <div class="chain-sublabel">Consumidor Final</div>
                <div class="chain-price">${formatCurrency(retailPrice)}</div>
                <div class="chain-unit">${retailUnit}</div>
            </div>
        `;
    }

    function renderPriceTable(product) {
        const tbody = document.getElementById('prices-tbody');
        const data = product.data.slice().reverse().slice(0, 15); // Last 15, newest first

        tbody.innerHTML = data.map((d, idx) => {
            const prev = idx < data.length - 1 ? data[idx + 1] : null;
            const change = prev ? d.precio - prev.precio : 0;
            const changePct = prev ? ((change / prev.precio) * 100).toFixed(2) : '0.00';
            const isPositive = change >= 0;
            const changeClass = change === 0 ? '' : (isPositive ? 'change-positive' : 'change-negative');
            return `
                <tr>
                    <td>${formatDate(d.fecha)}</td>
                    <td><strong>${formatCurrency(d.precio)}</strong></td>
                    <td class="${changeClass}">${change === 0 ? '—' : (isPositive ? '+' : '') + formatCurrency(change)}</td>
                    <td class="${changeClass}">${change === 0 ? '—' : (isPositive ? '+' : '') + changePct + '%'}</td>
                </tr>
            `;
        }).join('');
    }

    function downloadCSV(product) {
        const header = 'Fecha,Precio\n';
        const rows = product.data.map(d => `${d.fecha},${d.precio}`).join('\n');
        const csv = header + rows;
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${product.id}_precios.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // ======================== COMPARADOR ========================
    function renderComparador() {
        const controls = document.getElementById('comparador-controls');
        controls.innerHTML = '<p style="font-size:0.9rem;color:#7A7470;margin-bottom:8px;">Selecciona los productos a comparar:</p>';

        PRODUCTS.forEach(product => {
            const label = document.createElement('label');
            label.className = 'product-checkbox selected';
            label.innerHTML = `
                <input type="checkbox" value="${product.id}" checked>
                <span>${product.icon} ${product.name}</span>
            `;
            const checkbox = label.querySelector('input');
            checkbox.addEventListener('change', () => {
                label.classList.toggle('selected', checkbox.checked);
                updateComparadorChart();
            });
            controls.appendChild(label);
        });

        updateComparadorChart();
    }

    function updateComparadorChart() {
        const canvas = document.getElementById('comparador-chart');
        const ctx = canvas.getContext('2d');

        if (state.comparadorChart) {
            state.comparadorChart.destroy();
        }

        const selectedIds = Array.from(document.querySelectorAll('#comparador-controls input:checked')).map(cb => cb.value);
        const selectedProducts = PRODUCTS.filter(p => selectedIds.includes(p.id));

        if (selectedProducts.length === 0) {
            state.comparadorChart = new Chart(ctx, {
                type: 'line',
                data: { labels: [], datasets: [] },
                options: { responsive: true, maintainAspectRatio: false }
            });
            return;
        }

        // Normalize prices to percentage change from first value
        const datasets = selectedProducts.map(product => {
            const data = product.data.slice(-60); // Last 60 data points
            const basePrice = data[0].precio;
            const normalizedValues = data.map(d => ((d.precio - basePrice) / basePrice * 100));
            return {
                label: product.name,
                data: normalizedValues,
                borderColor: product.color,
                borderWidth: 2,
                fill: false,
                pointRadius: 0,
                tension: 0.3
            };
        });

        // Use labels from the product with most data points
        const longestProduct = selectedProducts.reduce((a, b) => a.data.length > b.data.length ? a : b);
        const labels = longestProduct.data.slice(-60).map(d => formatShortDate(d.fecha));

        state.comparadorChart = new Chart(ctx, {
            type: 'line',
            data: { labels, datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { intersect: false, mode: 'index' },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 20,
                            font: { family: 'Inter', size: 12 }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#FFFFFF',
                        titleColor: '#2D2A26',
                        bodyColor: '#7A7470',
                        borderColor: '#E8DFD0',
                        borderWidth: 1,
                        padding: 14,
                        cornerRadius: 10,
                        callbacks: {
                            label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y >= 0 ? '+' : ''}${ctx.parsed.y.toFixed(2)}%`
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { font: { family: 'Inter', size: 11 }, color: '#7A7470', maxTicksLimit: 10, maxRotation: 0 }
                    },
                    y: {
                        grid: { color: '#F5EDE0' },
                        ticks: {
                            font: { family: 'Inter', size: 11 },
                            color: '#7A7470',
                            callback: (v) => (v >= 0 ? '+' : '') + v.toFixed(1) + '%'
                        },
                        title: { display: true, text: '% Cambio relativo', font: { family: 'Inter', size: 12 }, color: '#7A7470' }
                    }
                }
            }
        });
    }

    // ======================== PROYECCIONES ========================
    function renderProyecciones() {
        // Render initial chart
        renderSeasonalChart();
        // Render initial technical sheet
        renderTechSheet();
        // Run initial simulation calculation
        updateProyeccionesSimulation();
    }

    function initProyecciones() {
        const traditionalSelect = document.getElementById('sim-traditional');
        const targetSelect = document.getElementById('sim-target');
        const hectaresRange = document.getElementById('sim-hectares-range');
        const hectaresNum = document.getElementById('sim-hectares');
        const percentRange = document.getElementById('sim-percent-range');
        const percentVal = document.getElementById('sim-percent-val');

        if (!traditionalSelect) return;

        // Sync hectares range -> input number
        hectaresRange.addEventListener('input', (e) => {
            hectaresNum.value = e.target.value;
            updateProyeccionesSimulation();
        });

        // Sync hectares input number -> range
        hectaresNum.addEventListener('input', (e) => {
            let val = parseInt(e.target.value) || 1;
            if (val < 1) val = 1;
            if (val > 100) val = 100;
            hectaresRange.value = Math.min(val, 50);
            updateProyeccionesSimulation();
        });

        // Sync percent range -> label
        percentRange.addEventListener('input', (e) => {
            percentVal.textContent = e.target.value + '%';
            updateProyeccionesSimulation();
        });

        // Change select inputs
        traditionalSelect.addEventListener('change', () => {
            updateProyeccionesSimulation();
            renderSeasonalChart();
        });

        targetSelect.addEventListener('change', () => {
            updateProyeccionesSimulation();
            renderSeasonalChart();
            renderTechSheet();
        });
    }

    function updateProyeccionesSimulation() {
        const traditionalSelect = document.getElementById('sim-traditional');
        const targetSelect = document.getElementById('sim-target');
        const hectaresNum = document.getElementById('sim-hectares');
        const percentRange = document.getElementById('sim-percent-range');

        if (!traditionalSelect) return;

        const tradCrop = traditionalSelect.value;
        const targetCrop = targetSelect.value;
        const hectares = parseFloat(hectaresNum.value) || 0;
        const percentDiv = parseFloat(percentRange.value) || 0;

        // Crop data constants
        const cropSpecs = {
            maiz: { name: 'Maíz Blanco', cost: 12000, yield: 6, price: 6050, icon: '' },
            frijol: { name: 'Frijol Negro', cost: 9500, yield: 1.5, price: 30000, icon: '' },
            amaranto: { name: 'Amaranto', cost: 15000, yield: 2, price: 31300, icon: '' },
            rosa: { name: 'Rosa Tallo Largo', cost: 120000, yield: 350, price: 800, icon: '' }
        };

        const trad = cropSpecs[tradCrop];
        const target = cropSpecs[targetCrop];

        // Hectares calculations
        const haDiv = hectares * (percentDiv / 100);
        const haTradRemaining = hectares - haDiv;

        // 100% Traditional Scenario
        const tradRevenue = hectares * trad.yield * trad.price;
        const tradCost = hectares * trad.cost;
        const tradProfit = tradRevenue - tradCost;

        // Diversified Scenario
        const divTradRevenue = haTradRemaining * trad.yield * trad.price;
        const divTradCost = haTradRemaining * trad.cost;

        const divTargetRevenue = haDiv * target.yield * target.price;
        const divTargetCost = haDiv * target.cost;

        const totalDivRevenue = divTradRevenue + divTargetRevenue;
        const totalDivCost = divTradCost + divTargetCost;
        const totalDivProfit = totalDivRevenue - totalDivCost;

        // Net Increase
        const netIncrease = totalDivProfit - tradProfit;
        const pctIncrease = tradProfit > 0 ? (netIncrease / tradProfit) * 100 : 0;

        // Margin
        const divMargin = totalDivRevenue > 0 ? (totalDivProfit / totalDivRevenue) * 100 : 0;

        // ROI
        let roiText = '';
        if (targetCrop === 'amaranto') {
            roiText = '1 Cosecha (~4-6 meses)';
        } else if (targetCrop === 'rosa') {
            roiText = '2 Cosechas (~1 año por instalación)';
        }

        // Update UI
        document.getElementById('res-trad-name').innerHTML = `100% ${trad.name}`;
        document.getElementById('res-trad-revenue').textContent = formatCurrency(tradRevenue, 0);
        document.getElementById('res-trad-cost').textContent = formatCurrency(tradCost, 0);
        
        const tradProfitEl = document.getElementById('res-trad-profit');
        tradProfitEl.textContent = formatCurrency(tradProfit, 0);
        if (tradProfit < 0) {
            tradProfitEl.className = 'text-danger fw-bold';
        } else {
            tradProfitEl.className = 'text-dark fw-bold';
        }

        document.getElementById('res-div-name').innerHTML = `${Math.round(100 - percentDiv)}% ${trad.name} / ${Math.round(percentDiv)}% ${target.name}`;
        document.getElementById('res-div-revenue').textContent = formatCurrency(totalDivRevenue, 0);
        document.getElementById('res-div-cost').textContent = formatCurrency(totalDivCost, 0);

        const divProfitEl = document.getElementById('res-div-profit');
        divProfitEl.textContent = formatCurrency(totalDivProfit, 0);
        if (totalDivProfit < 0) {
            divProfitEl.className = 'text-danger fw-bold';
        } else {
            divProfitEl.className = 'text-primary fw-bold';
        }

        // Net Increase display
        const incValEl = document.getElementById('res-increment-val');
        const incPctEl = document.getElementById('res-increment-pct');

        if (netIncrease >= 0) {
            incValEl.textContent = `+${formatCurrency(netIncrease, 0)}`;
            incValEl.className = 'display-6 fw-bold text-success mt-1';
            incPctEl.textContent = `+${pctIncrease.toFixed(1)}% de ganancia extra`;
            incPctEl.className = 'text-success fw-bold small';
        } else {
            incValEl.textContent = `${formatCurrency(netIncrease, 0)}`;
            incValEl.className = 'display-6 fw-bold text-danger mt-1';
            incPctEl.textContent = `${pctIncrease.toFixed(1)}% de ganancia (menor rentabilidad)`;
            incPctEl.className = 'text-danger fw-bold small';
        }

        document.getElementById('res-roi').textContent = roiText;
        document.getElementById('res-margin').textContent = `${divMargin.toFixed(1)}%`;
    }

    function renderSeasonalChart() {
        const canvas = document.getElementById('seasonal-chart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        if (state.seasonalChart) {
            state.seasonalChart.destroy();
        }

        const traditionalSelect = document.getElementById('sim-traditional');
        const targetSelect = document.getElementById('sim-target');
        if (!traditionalSelect) return;

        const tradCrop = traditionalSelect.value;
        const targetCrop = targetSelect.value;

        // Labels
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

        // Data curves
        const curves = {
            maiz: {
                name: 'Maíz Blanco',
                basePrice: 6050,
                multipliers: [0.95, 0.96, 0.98, 1.00, 1.02, 1.05, 1.06, 1.04, 1.02, 1.00, 0.97, 0.95],
                color: '#F59E0B'
            },
            frijol: {
                name: 'Frijol Negro',
                basePrice: 30000,
                multipliers: [0.96, 0.97, 0.99, 1.01, 1.03, 1.02, 1.01, 1.03, 1.04, 1.02, 0.98, 0.95],
                color: '#8B4513'
            },
            amaranto: {
                name: 'Amaranto',
                basePrice: 31300,
                multipliers: [0.96, 0.95, 0.97, 0.98, 0.99, 1.00, 1.01, 1.03, 1.08, 1.12, 1.15, 1.02],
                color: '#C8952E'
            },
            rosa: {
                name: 'Rosa Tallo Largo',
                basePrice: 800,
                multipliers: [0.85, 1.75, 0.90, 0.95, 1.85, 0.80, 0.82, 0.85, 0.90, 0.95, 1.25, 0.90],
                color: '#EC4899'
            }
        };

        const trad = curves[tradCrop];
        const target = curves[targetCrop];

        const tradValues = trad.multipliers.map(m => Math.round(trad.basePrice * m));
        const targetValues = target.multipliers.map(m => Math.round(target.basePrice * m));

        state.seasonalChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                        label: `${trad.name} ($/Ton)`,
                        data: tradValues,
                        borderColor: trad.color,
                        backgroundColor: trad.color + '15',
                        borderWidth: 2.5,
                        yAxisID: 'y',
                        tension: 0.35,
                        fill: false,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    },
                    {
                        label: targetCrop === 'rosa' ? `${target.name} ($/Gruesa)` : `${target.name} ($/Ton)`,
                        data: targetValues,
                        borderColor: target.color,
                        backgroundColor: target.color + '15',
                        borderWidth: 2.5,
                        yAxisID: 'y1',
                        tension: 0.35,
                        fill: false,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { intersect: false, mode: 'index' },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            font: { family: 'Inter', size: 11 }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#FFFFFF',
                        titleColor: '#2D2A26',
                        bodyColor: '#7A7470',
                        borderColor: '#E8DFD0',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 10,
                        titleFont: { family: 'Inter', size: 12, weight: '600' },
                        bodyFont: { family: 'Inter', size: 11 },
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${formatCurrency(context.parsed.y, 0)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { font: { family: 'Inter', size: 11 }, color: '#7A7470' }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            font: { family: 'Inter', size: 10 },
                            color: '#7A7470',
                            callback: (v) => formatCurrency(v, 0)
                        },
                        title: {
                            display: true,
                            text: 'Tradicional',
                            font: { family: 'Inter', size: 11, weight: '600' },
                            color: '#7A7470'
                        },
                        grid: { color: '#F5EDE0' }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        ticks: {
                            font: { family: 'Inter', size: 10 },
                            color: '#7A7470',
                            callback: (v) => formatCurrency(v, 0)
                        },
                        title: {
                            display: true,
                            text: targetCrop === 'rosa' ? 'Rosa ($/Gruesa)' : 'Amaranto ($/Ton)',
                            font: { family: 'Inter', size: 11, weight: '600' },
                            color: '#7A7470'
                        },
                        grid: { drawOnChartArea: false }
                    }
                }
            }
        });
    }

    function renderTechSheet() {
        const targetSelect = document.getElementById('sim-target');
        const sheetEl = document.getElementById('sim-tech-sheet');
        if (!targetSelect || !sheetEl) return;

        const targetCrop = targetSelect.value;

        if (targetCrop === 'amaranto') {
            sheetEl.innerHTML = `
                <div class="tech-item mb-3">
                    <div class="d-flex align-items-center mb-2">
                        <h4 class="h6 fw-bold mb-0 text-dark">Consumo de Agua</h4>
                    </div>
                    <p class="small text-secondary mb-0"><strong>Muy Bajo (Resistente a sequías)</strong>. Requiere de 350 a 450 mm de agua por ciclo. Excelente alternativa para agricultura de temporal en zonas semiáridas.</p>
                </div>
                <div class="tech-item mb-3 pt-2 border-top">
                    <div class="d-flex align-items-center mb-2">
                        <h4 class="h6 fw-bold mb-0 text-dark">Inversión Inicial</h4>
                    </div>
                    <p class="small text-secondary mb-0"><strong>Baja-Media (Aprox. $15,000 MXN/ha)</strong>. No requiere infraestructuras costosas. La semilla es económica y utiliza maquinaria agrícola convencional.</p>
                </div>
                <div class="tech-item mb-3 pt-2 border-top">
                    <div class="d-flex align-items-center mb-2">
                        <h4 class="h6 fw-bold mb-0 text-dark">Riesgo y Almacenaje</h4>
                    </div>
                    <p class="small text-secondary mb-0"><strong>Bajo</strong>. Al ser un grano seco, se puede almacenar hasta por dos años sin perder propiedades, permitiendo vender en el momento más oportuno.</p>
                </div>
                <div class="tech-item pt-2 border-top">
                    <div class="d-flex align-items-center mb-2">
                        <h4 class="h6 fw-bold mb-0 text-dark">Tip de Temporada</h4>
                    </div>
                    <p class="small text-secondary mb-0">Sembrar a inicios del temporal (Junio) para cosechar entre Noviembre y Diciembre, capturando la demanda estacional de dulces tradicionales.</p>
                </div>
            `;
        } else if (targetCrop === 'rosa') {
            sheetEl.innerHTML = `
                <div class="tech-item mb-3">
                    <div class="d-flex align-items-center mb-2">
                        <h4 class="h6 fw-bold mb-0 text-dark">Consumo de Agua</h4>
                    </div>
                    <p class="small text-secondary mb-0"><strong>Alto e Ininterrumpido</strong>. Requiere riego por goteo diario y fertirrigación controlada en invernadero. Es indispensable contar con pozo o red de riego estable.</p>
                </div>
                <div class="tech-item mb-3 pt-2 border-top">
                    <div class="d-flex align-items-center mb-2">
                        <h4 class="h6 fw-bold mb-0 text-dark">Inversión Inicial</h4>
                    </div>
                    <p class="small text-secondary mb-0"><strong>Muy Alta (Aprox. $120,000 MXN/ha inicial)</strong>. Requiere túneles/invernaderos, sistemas de fertirrigación tecnificada, calefactores y material vegetativo certificado.</p>
                </div>
                <div class="tech-item mb-3 pt-2 border-top">
                    <div class="d-flex align-items-center mb-2">
                        <h4 class="h6 fw-bold mb-0 text-dark">Riesgo y Almacenaje</h4>
                    </div>
                    <p class="small text-secondary mb-0"><strong>Muy Alto (Perecedero)</strong>. La flor cortada tiene una vida de anaquel de sólo 12 a 15 días. Requiere almacenamiento frío y transporte refrigerado rápido.</p>
                </div>
                <div class="tech-item pt-2 border-top">
                    <div class="d-flex align-items-center mb-2">
                        <h4 class="h6 fw-bold mb-0 text-dark">Tip de Temporada</h4>
                    </div>
                    <p class="small text-secondary mb-0">Planifica la poda con 70-80 días de anticipación para inducir la cosecha exacta en **San Valentín (Feb)** y **Día de las Madres (May)**, donde el precio puede dispararse más de 100%.</p>
                </div>
            `;
        }
    }

    // ======================== INITIALIZATION ========================
    function init() {
        initNavigation();
        initMap();
        updateClock();
        setInterval(updateClock, 1000);
        initProyecciones();

        // Back to overview button
        document.getElementById('back-to-overview').addEventListener('click', () => {
            document.getElementById('cotiz-detail').style.display = 'none';
            renderCotizOverview();
        });
    }

    // Start app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
