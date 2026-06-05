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
            id: 1, name: 'Maíz Blanco Premium', category: 'Granos', icon: '🌽',
            imgBg: 'linear-gradient(135deg, #FDE68A, #F59E0B)',
            price: 420, unit: 'Bulto 50 kg', minOrder: '10 bultos', available: '500 bultos',
            seller: { name: 'Juan Pérez', location: 'San Martín Texmelucan, Puebla', avatar: '👨‍🌾', rating: 4.8, reviews: 24, totalSales: 156, memberSince: '2024' },
            verified: true, organic: false, harvestDate: '2026-05-15',
            description: 'Maíz blanco de primera calidad, ideal para tortilla y masa. Grano limpio, uniforme, libre de plagas. Cultivado con prácticas sustentables en la región de Puebla.',
            specs: { Humedad: '14%', Impurezas: '<1%', 'Grano dañado': '<2%', Aflatoxinas: '<2 ppb' }
        },
        {
            id: 2, name: 'Aguacate Hass Extra', category: 'Frutas', icon: '🥑',
            imgBg: 'linear-gradient(135deg, #86EFAC, #22C55E)',
            price: 44000, unit: 'Tonelada', minOrder: '1 tonelada', available: '12 toneladas',
            seller: { name: 'María González', location: 'Uruapan, Michoacán', avatar: '👩‍🌾', rating: 4.9, reviews: 67, totalSales: 312, memberSince: '2023' },
            verified: true, organic: true, harvestDate: '2026-05-20',
            description: 'Aguacate Hass de exportación, calibre extra (170-220g). Maduración controlada, excelente contenido de aceite. Certificación orgánica USDA.',
            specs: { Calibre: 'Extra (170-220g)', Aceite: '>23%', 'Materia seca': '>21%', Certificación: 'USDA Organic' }
        },
        {
            id: 3, name: 'Tomate Saladette Primera', category: 'Hortalizas', icon: '🍅',
            imgBg: 'linear-gradient(135deg, #FCA5A5, #EF4444)',
            price: 378, unit: 'Caja 12 kg', minOrder: '20 cajas', available: '350 cajas',
            seller: { name: 'Roberto Sánchez', location: 'Culiacán, Sinaloa', avatar: '👨‍🌾', rating: 4.7, reviews: 42, totalSales: 289, memberSince: '2023' },
            verified: true, organic: false, harvestDate: '2026-05-28',
            description: 'Tomate saladette tipo roma, firme, color rojo uniforme. Ideal para restaurantes y distribuidores. Vida de anaquel de 10-14 días.',
            specs: { Tamaño: 'Grande (>6cm)', Firmeza: 'Alta', Color: 'Rojo uniforme', 'Vida anaquel': '10-14 días' }
        },
        {
            id: 4, name: 'Frijol Negro Jamapa', category: 'Granos', icon: '🫘',
            imgBg: 'linear-gradient(135deg, #A3A3A3, #525252)',
            price: 1500, unit: 'Bulto 50 kg', minOrder: '5 bultos', available: '200 bultos',
            seller: { name: 'Pedro López', location: 'Tehuacán, Puebla', avatar: '👨‍🌾', rating: 4.6, reviews: 18, totalSales: 98, memberSince: '2024' },
            verified: true, organic: false, harvestDate: '2026-05-10',
            description: 'Frijol negro variedad Jamapa, grano pequeño, brillante. Excelente sabor y textura al cocinar. Producto de la cosecha primavera-verano 2026.',
            specs: { Variedad: 'Jamapa', Humedad: '<14%', Impurezas: '<1%', 'Tiempo cocción': '45-60 min' }
        },
        {
            id: 5, name: 'Rosa Freedom Tallo Largo', category: 'Flores', icon: '🌹',
            imgBg: 'linear-gradient(135deg, #FDA4AF, #E11D48)',
            price: 750, unit: 'Gruesa (12 docenas)', minOrder: '5 gruesas', available: '80 gruesas',
            seller: { name: 'Ana Martínez', location: 'Villa Guerrero, Edo. Méx.', avatar: '👩‍🌾', rating: 4.9, reviews: 53, totalSales: 445, memberSince: '2022' },
            verified: true, organic: false, harvestDate: '2026-05-28',
            description: 'Rosa roja Freedom, tallo de 60-70cm, botón grande y firme. Ideal para arreglos florales, eventos y exportación. Vida en florero de 12-15 días.',
            specs: { Variedad: 'Freedom', Tallo: '60-70 cm', Botón: 'Grande (5-6 cm)', 'Vida florero': '12-15 días' }
        },
        {
            id: 6, name: 'Amaranto Orgánico', category: 'Granos', icon: '🌾',
            imgBg: 'linear-gradient(135deg, #FDE68A, #C8952E)',
            price: 25000, unit: 'Tonelada', minOrder: '500 kg', available: '8 toneladas',
            seller: { name: 'Carlos Hernández', location: 'Tochimilco, Puebla', avatar: '👨‍🌾', rating: 4.8, reviews: 31, totalSales: 78, memberSince: '2024' },
            verified: true, organic: true, harvestDate: '2026-04-20',
            description: 'Amaranto orgánico certificado. Grano limpio, alto contenido proteico. Ideal para la industria alimentaria, exportación y productos de alegría.',
            specs: { Proteína: '>15%', Humedad: '<12%', Certificación: 'Orgánico MX', Uso: 'Alimentario/Industrial' }
        },
        {
            id: 7, name: 'Chile Poblano Fresco', category: 'Hortalizas', icon: '🌶️',
            imgBg: 'linear-gradient(135deg, #86EFAC, #15803D)',
            price: 35, unit: 'kg', minOrder: '100 kg', available: '2,000 kg',
            seller: { name: 'Luis Ramírez', location: 'San Martín Texmelucan, Puebla', avatar: '👨‍🌾', rating: 4.5, reviews: 15, totalSales: 67, memberSince: '2025' },
            verified: false, organic: false, harvestDate: '2026-05-25',
            description: 'Chile poblano fresco, tamaño grande, color verde oscuro brillante. Ideal para chiles rellenos y rajas. Directamente del campo a tu negocio.',
            specs: { Tamaño: 'Grande (>15cm)', Picor: 'Suave (1000-2000 SHU)', Color: 'Verde oscuro', Frescura: 'Cosecha del día' }
        },
        {
            id: 8, name: 'Cempasúchil Premium', category: 'Flores', icon: '🏵️',
            imgBg: 'linear-gradient(135deg, #FDBA74, #EA580C)',
            price: 180, unit: 'Manojo (20 tallos)', minOrder: '50 manojos', available: '500 manojos',
            seller: { name: 'Guadalupe Torres', location: 'Atlixco, Puebla', avatar: '👩‍🌾', rating: 4.7, reviews: 28, totalSales: 134, memberSince: '2023' },
            verified: true, organic: true, harvestDate: '2026-05-28',
            description: 'Flor de cempasúchil de tallo largo, color anaranjado intenso. Cultivo orgánico. Disponible para temporada de Día de Muertos y uso ornamental.',
            specs: { Tallo: '50-60 cm', Flor: '8-10 cm diámetro', Color: 'Anaranjado intenso', Certificación: 'Orgánico' }
        },
        {
            id: 9, name: 'Cebolla Blanca', category: 'Hortalizas', icon: '🧅',
            imgBg: 'linear-gradient(135deg, #FEF3C7, #D97706)',
            price: 22, unit: 'kg', minOrder: '200 kg', available: '5,000 kg',
            seller: { name: 'Francisco Díaz', location: 'Chiautla de Tapia, Puebla', avatar: '👨‍🌾', rating: 4.4, reviews: 12, totalSales: 45, memberSince: '2025' },
            verified: false, organic: false, harvestDate: '2026-05-22',
            description: 'Cebolla blanca jumbo, firme y de buen sabor. Ideal para restaurantes, fondas y comercio al mayoreo. Empaque en costal de 25 kg.',
            specs: { Calibre: 'Jumbo (>8cm)', Firmeza: 'Alta', Cáscara: 'Blanca seca', Empaque: 'Costal 25 kg' }
        },
        {
            id: 10, name: 'Miel de Abeja Multifloral', category: 'Otros', icon: '🍯',
            imgBg: 'linear-gradient(135deg, #FDE68A, #B45309)',
            price: 250, unit: 'kg', minOrder: '20 kg', available: '500 kg',
            seller: { name: 'Isabel Morales', location: 'Zacatlán, Puebla', avatar: '👩‍🌾', rating: 5.0, reviews: 38, totalSales: 210, memberSince: '2022' },
            verified: true, organic: true, harvestDate: '2026-04-15',
            description: 'Miel de abeja 100% pura, multifloral de la sierra norte de Puebla. Sin calentar, sin filtrar, conserva todas sus propiedades nutritivas y enzimáticas.',
            specs: { Tipo: 'Multifloral', Humedad: '<18%', Color: 'Ámbar claro', Certificación: 'Libre de antibióticos' }
        }
    ];

    const CATEGORIES = ['Todos', 'Granos', 'Hortalizas', 'Frutas', 'Flores', 'Otros'];

    let featuresState = {
        selectedCropId: null,
        selectedCategory: 'Todos',
        searchQuery: '',
        sortBy: 'relevance',
        droneChart: null
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

            return '<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">' +
                '<div class="mp-product-card h-100" data-product-id="' + p.id + '" style="animation-delay:' + (idx * 60) + 'ms">' +
                '<div class="mp-product-img" style="background:' + p.imgBg + '">' +
                    p.icon +
                    '<span class="mp-category-badge">' + p.category + '</span>' +
                    (p.verified ? '<span class="mp-verified-badge">✓</span>' : '') +
                '</div>' +
                '<div class="mp-product-body">' +
                    '<div class="mp-product-name">' + p.name + (p.organic ? ' <span style="color:#22C55E;font-size:0.75rem;">🌿 Orgánico</span>' : '') + '</div>' +
                    '<div class="mp-product-origin">📍 ' + p.seller.location + '</div>' +
                    '<div class="mp-product-price-row"><div>' +
                        '<span class="mp-product-price">$' + p.price.toLocaleString('es-MX') + '</span>' +
                        '<span class="mp-product-unit"> / ' + p.unit + '</span>' +
                    '</div></div>' +
                    '<div class="mp-product-min-order">Pedido mínimo: ' + p.minOrder + '</div>' +
                    '<div class="mp-seller-row">' +
                        '<span class="mp-seller-avatar">' + p.seller.avatar + '</span>' +
                        '<span class="mp-seller-name">' + p.seller.name + '</span>' +
                        '<span class="mp-seller-rating">' + stars + ' <span>' + p.seller.rating + '</span></span>' +
                    '</div>' +
                '</div>' +
                '</div>' +
            '</div>';
        }).join('');

        // Click handlers
        grid.querySelectorAll('.mp-product-card').forEach(function(card) {
            card.addEventListener('click', function() {
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
        for (var i = 0; i < Math.floor(product.seller.rating); i++) stars += '⭐';

        var specsHtml = '';
        var specEntries = Object.entries(product.specs);
        for (var j = 0; j < specEntries.length; j++) {
            specsHtml += '<div class="modal-detail-item"><span class="detail-label">' + specEntries[j][0] + '</span><span class="detail-value">' + specEntries[j][1] + '</span></div>';
        }

        modal.innerHTML = 
            '<div class="modal-header-img" style="background:' + product.imgBg + '">' +
                product.icon +
                '<button class="modal-close" id="modal-close-btn">&times;</button>' +
                (product.organic ? '<span class="mp-category-badge" style="position:absolute;bottom:12px;left:12px;background:rgba(255,255,255,0.95)">🌿 Orgánico Certificado</span>' : '') +
            '</div>' +
            '<div class="modal-body">' +
                '<h2 class="modal-title">' + product.name + '</h2>' +
                '<p class="modal-origin">📍 ' + product.seller.location + ' · Cosecha: ' + harvestFormatted + '</p>' +

                '<div class="modal-price-section">' +
                    '<div>' +
                        '<span class="modal-price">$' + product.price.toLocaleString('es-MX') + '</span>' +
                        '<span class="modal-price-unit"> / ' + product.unit + '</span>' +
                        '<div style="font-size:0.8rem;color:#7A7470;margin-top:4px;">Pedido mínimo: ' + product.minOrder + ' · Disponible: ' + product.available + '</div>' +
                    '</div>' +
                    '<button class="modal-contact-btn">📞 Contactar Productor</button>' +
                '</div>' +

                '<h3 style="font-size:0.95rem;font-weight:700;margin-bottom:12px;">📋 Especificaciones</h3>' +
                '<div class="modal-details-grid">' + specsHtml + '</div>' +

                '<div class="modal-seller-section">' +
                    '<div class="modal-seller-header">' +
                        '<span class="modal-seller-avatar">' + product.seller.avatar + '</span>' +
                        '<div class="modal-seller-info">' +
                            '<h4>' + product.seller.name + (product.verified ? ' ✅' : '') + '</h4>' +
                            '<p>📍 ' + product.seller.location + ' · Miembro desde ' + product.seller.memberSince + '</p>' +
                        '</div>' +
                    '</div>' +
                    '<div class="modal-seller-stats">' +
                        '<div class="modal-seller-stat"><strong>' + stars + ' ' + product.seller.rating + '</strong><span>Calificación</span></div>' +
                        '<div class="modal-seller-stat"><strong>' + product.seller.reviews + '</strong><span>Reseñas</span></div>' +
                        '<div class="modal-seller-stat"><strong>' + product.seller.totalSales + '</strong><span>Ventas</span></div>' +
                    '</div>' +
                '</div>' +

                '<div class="modal-description">' +
                    '<h3>📝 Descripción del Producto</h3>' +
                    '<p>' + product.description + '</p>' +
                '</div>' +
            '</div>';

        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Close button
        document.getElementById('modal-close-btn').addEventListener('click', closeProductModal);
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeProductModal();
        });

        // Contact button
        modal.querySelector('.modal-contact-btn').addEventListener('click', function() {
            alert('📞 Contactando a ' + product.seller.name + '...\n\nEn una versión completa, aquí se abriría un chat o se mostraría el número de teléfono/WhatsApp del productor.');
        });
    }

    function closeProductModal() {
        document.getElementById('product-modal-overlay').style.display = 'none';
        document.body.style.overflow = '';
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
