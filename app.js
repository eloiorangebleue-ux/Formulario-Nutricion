// Isaac Nutrición v4.1.0 - JavaScript FUNCIONAL
// EXPORTACIÓN GARANTIZADA - Versión Simplificada

// Base de datos de productos HSN
const PRODUCTOS_HSN = {
    proteinas: [
        {
            nombre: "Whey Protein Isolate",
            beneficios: ["Síntesis muscular", "Recuperación post-entreno"],
            cantidad: "25-30g",
            forma_toma: "Disolver en 250ml de agua",
            cuando_tomar: "Post-entreno (30min después)",
            objetivos: ["ganar_masa", "mantener_peso"],
            precio_aprox: "29.90€/kg"
        },
        {
            nombre: "Plant Protein",
            beneficios: ["Origen vegetal", "Fácil digestión"],
            cantidad: "25-30g",
            forma_toma: "Disolver en 250ml bebida vegetal",
            cuando_tomar: "Post-entreno o entre comidas",
            objetivos: ["ganar_masa", "perder_peso", "mantener_peso", "mejorar_salud"],
            precio_aprox: "34.90€/kg"
        }
    ],
    creatinas: [
        {
            nombre: "Creatine Monohydrate",
            beneficios: ["Fuerza explosiva", "Ganancia muscular"],
            cantidad: "3-5g",
            forma_toma: "Disolver en 200ml agua",
            cuando_tomar: "Post-entreno o cualquier momento",
            objetivos: ["ganar_masa"],
            precio_aprox: "12.90€/500g"
        }
    ],
    vitaminas: [
        {
            nombre: "Multivitamin + Minerals",
            beneficios: ["Salud general", "Sistema inmune"],
            cantidad: "2 cápsulas",
            forma_toma: "Con abundante agua y comida",
            cuando_tomar: "Con el desayuno",
            objetivos: ["ganar_masa", "perder_peso", "mantener_peso", "mejorar_salud"],
            precio_aprox: "19.90€/120 cáps"
        },
        {
            nombre: "Omega 3 1000mg",
            beneficios: ["Salud cardiovascular", "Antiinflamatorio"],
            cantidad: "2 cápsulas",
            forma_toma: "Con comida para mejor absorción",
            cuando_tomar: "Con almuerzo y cena",
            objetivos: ["ganar_masa", "perder_peso", "mantener_peso", "mejorar_salud"],
            precio_aprox: "21.90€/120 cáps"
        }
    ]
};

// Configuración básica
const CONFIG = {
    formulas: {
        tmb_hombre: (peso, altura, edad) => 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * edad),
        tmb_mujer: (peso, altura, edad) => 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * edad),
        imc: (peso, altura_metros) => peso / (altura_metros * altura_metros)
    },
    niveles_actividad: {
        sedentario: { factor: 1.2, descripcion: "Poco o ningún ejercicio" },
        ligero: { factor: 1.375, descripcion: "Ejercicio ligero 1-3 días/semana" },
        moderado: { factor: 1.55, descripcion: "Ejercicio moderado 3-5 días/semana" },
        intenso: { factor: 1.725, descripcion: "Ejercicio fuerte 6-7 días/semana" },
        muy_intenso: { factor: 1.9, descripcion: "Ejercicio muy fuerte, trabajo físico" }
    },
    objetivos: {
        ganar_masa: { 
            nombre: "Ganar Masa Muscular", 
            calorias: 400, 
            proteinas: 30, 
            carbohidratos: 45, 
            grasas: 25
        },
        perder_peso: { 
            nombre: "Perder Peso", 
            calorias: -500, 
            proteinas: 35, 
            carbohidratos: 30, 
            grasas: 35
        },
        mantener_peso: { 
            nombre: "Mantener Peso", 
            calorias: 0, 
            proteinas: 25, 
            carbohidratos: 45, 
            grasas: 30
        },
        mejorar_salud: { 
            nombre: "Mejorar Salud General", 
            calorias: -200, 
            proteinas: 25, 
            carbohidratos: 50, 
            grasas: 25
        }
    },
    alimentos_base: [
        { nombre: "Pechuga de pollo", calorias: 165, proteinas: 31, carbohidratos: 0, grasas: 3.6, categoria: "Proteinas" },
        { nombre: "Salmón", calorias: 208, proteinas: 20, carbohidratos: 0, grasas: 13, categoria: "Pescados" },
        { nombre: "Huevos", calorias: 155, proteinas: 13, carbohidratos: 1, grasas: 11, categoria: "Proteinas" },
        { nombre: "Arroz integral", calorias: 111, proteinas: 2.6, carbohidratos: 23, grasas: 0.9, categoria: "Cereales" },
        { nombre: "Brócoli", calorias: 34, proteinas: 2.8, carbohidratos: 7, grasas: 0.4, categoria: "Verduras" },
        { nombre: "Manzana", calorias: 52, proteinas: 0.3, carbohidratos: 14, grasas: 0.2, categoria: "Frutas" },
        { nombre: "Almendras", calorias: 579, proteinas: 21, carbohidratos: 22, grasas: 50, categoria: "Frutos_secos" },
        { nombre: "Aceite de oliva", calorias: 884, proteinas: 0, carbohidratos: 0, grasas: 100, categoria: "Grasas" }
    ]
};

// Variables globales
let currentUserData = null;
let currentCalculations = null;

// DOM Elements
const elements = {
    personalSection: document.getElementById('personalSection'),
    preferencesSection: document.getElementById('preferencesSection'),
    previewSection: document.getElementById('previewSection'),
    dietSection: document.getElementById('dietSection'),
    personalForm: document.getElementById('personalForm'),
    preferencesForm: document.getElementById('preferencesForm'),
    calculationsDisplay: document.getElementById('calculationsDisplay'),
    tmbValue: document.getElementById('tmbValue'),
    imcValue: document.getElementById('imcValue'),
    caloriasMantenimientoValue: document.getElementById('caloriasMantenimientoValue'),
    categoriaIMC: document.getElementById('categoriaIMC'),
    personalPreview: document.getElementById('personalPreview'),
    bodyPreview: document.getElementById('bodyPreview'),
    preferencesPreview: document.getElementById('preferencesPreview'),
    planSummaryPreview: document.getElementById('planSummaryPreview'),
    dietContent: document.getElementById('dietContent'),
    continueToPreferencesBtn: document.getElementById('continueToPreferencesBtn'),
    backToPersonalBtn: document.getElementById('backToPersonalBtn'),
    continueToPreviewBtn: document.getElementById('continueToPreviewBtn'),
    backToPreferencesBtn: document.getElementById('backToPreferencesBtn'),
    generateDietBtn: document.getElementById('generateDietBtn'),
    downloadPngBtn: document.getElementById('downloadPngBtn'),
    downloadWordBtn: document.getElementById('downloadWordBtn'),
    downloadMarkdownBtn: document.getElementById('downloadMarkdownBtn'),
    downloadSheetsBtn: document.getElementById('downloadSheetsBtn'),
    printDietBtn: document.getElementById('printDietBtn'),
    newDietBtn: document.getElementById('newDietBtn'),
    editDietBtn: document.getElementById('editDietBtn')
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Isaac Nutrición v4.1.0 iniciando...');
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    showSection('personal');
    console.log('✅ App inicializada correctamente');
}

function setupEventListeners() {
    console.log('🔗 Configurando event listeners...');

    // Personal form inputs
    const personalInputs = ['edad', 'peso', 'altura', 'nivelActividad'];
    personalInputs.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('input', calculateRealTime);
            field.addEventListener('change', validatePersonalForm);
        }
    });

    // Radio buttons
    document.querySelectorAll('input[name="sexo"]').forEach(radio => {
        radio.addEventListener('change', () => {
            calculateRealTime();
            validatePersonalForm();
        });
    });

    // Navigation buttons
    if (elements.continueToPreferencesBtn) {
        elements.continueToPreferencesBtn.addEventListener('click', () => showSection('preferences'));
    }
    if (elements.backToPersonalBtn) {
        elements.backToPersonalBtn.addEventListener('click', () => showSection('personal'));
    }
    if (elements.continueToPreviewBtn) {
        elements.continueToPreviewBtn.addEventListener('click', generatePreview);
    }
    if (elements.backToPreferencesBtn) {
        elements.backToPreferencesBtn.addEventListener('click', () => showSection('preferences'));
    }
    if (elements.generateDietBtn) {
        elements.generateDietBtn.addEventListener('click', generateDiet);
    }

    // Export buttons - MEJORADOS Y SIMPLIFICADOS
    if (elements.downloadPngBtn) {
        elements.downloadPngBtn.addEventListener('click', function() {
            console.log('📸 Exportando PNG...');
            downloadPNG();
        });
    }
    if (elements.downloadWordBtn) {
        elements.downloadWordBtn.addEventListener('click', function() {
            console.log('📝 Exportando Word...');
            downloadWord();
        });
    }
    if (elements.downloadMarkdownBtn) {
        elements.downloadMarkdownBtn.addEventListener('click', function() {
            console.log('📄 Exportando Markdown...');
            downloadMarkdown();
        });
    }
    if (elements.downloadSheetsBtn) {
        elements.downloadSheetsBtn.addEventListener('click', function() {
            console.log('📊 Exportando CSV...');
            downloadGoogleSheets();
        });
    }
    if (elements.printDietBtn) {
        elements.printDietBtn.addEventListener('click', function() {
            console.log('🖨️ Imprimiendo...');
            printDiet();
        });
    }
    if (elements.newDietBtn) {
        elements.newDietBtn.addEventListener('click', resetApp);
    }
    if (elements.editDietBtn) {
        elements.editDietBtn.addEventListener('click', () => showSection('personal'));
    }

    console.log('✅ Event listeners configurados');
}

function showSection(sectionName) {
    elements.personalSection.style.display = 'none';
    elements.preferencesSection.style.display = 'none';
    elements.previewSection.style.display = 'none';
    elements.dietSection.style.display = 'none';

    switch(sectionName) {
        case 'personal':
            elements.personalSection.style.display = 'block';
            break;
        case 'preferences':
            elements.preferencesSection.style.display = 'block';
            break;
        case 'preview':
            elements.previewSection.style.display = 'block';
            break;
        case 'diet':
            elements.dietSection.style.display = 'block';
            break;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function calculateRealTime() {
    const edad = parseInt(document.getElementById('edad')?.value);
    const peso = parseFloat(document.getElementById('peso')?.value);
    const altura = parseInt(document.getElementById('altura')?.value);
    const sexo = document.querySelector('input[name="sexo"]:checked')?.value;
    const nivelActividad = document.getElementById('nivelActividad')?.value;

    if (edad && peso && altura && sexo) {
        const tmb = sexo === 'mujer' ? 
            CONFIG.formulas.tmb_mujer(peso, altura, edad) : 
            CONFIG.formulas.tmb_hombre(peso, altura, edad);

        const alturaMetros = altura / 100;
        const imc = CONFIG.formulas.imc(peso, alturaMetros);

        let categoriaIMC = 'Normal';
        if (imc < 18.5) categoriaIMC = 'Bajo peso';
        else if (imc >= 25 && imc < 30) categoriaIMC = 'Sobrepeso';
        else if (imc >= 30) categoriaIMC = 'Obesidad';

        let caloriasMantenimiento = Math.round(tmb);
        if (nivelActividad) {
            const factor = CONFIG.niveles_actividad[nivelActividad].factor;
            caloriasMantenimiento = Math.round(tmb * factor);
        }

        currentCalculations = {
            tmb: Math.round(tmb),
            imc: Math.round(imc * 10) / 10,
            categoriaIMC,
            caloriasMantenimiento
        };

        if (elements.tmbValue) elements.tmbValue.textContent = currentCalculations.tmb;
        if (elements.imcValue) elements.imcValue.textContent = currentCalculations.imc;
        if (elements.caloriasMantenimientoValue) elements.caloriasMantenimientoValue.textContent = currentCalculations.caloriasMantenimiento;
        if (elements.categoriaIMC) elements.categoriaIMC.textContent = categoriaIMC;

        if (elements.calculationsDisplay) elements.calculationsDisplay.style.display = 'block';
    }
}

function validatePersonalForm() {
    const requiredFields = ['nombre', 'apellido', 'edad', 'peso', 'altura', 'nivelActividad'];
    const sexo = document.querySelector('input[name="sexo"]:checked');

    let isValid = true;

    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!field || !field.value.trim()) {
            isValid = false;
        }
    });

    if (!sexo) {
        isValid = false;
    }

    if (elements.continueToPreferencesBtn) {
        elements.continueToPreferencesBtn.disabled = !isValid;
    }
}

function generatePreview() {
    const personalData = getPersonalFormData();
    const preferencesData = getPreferencesFormData();

    if (!personalData || !preferencesData) {
        alert('Por favor completa todos los campos obligatorios');
        return;
    }

    currentUserData = { ...personalData, ...preferencesData };
    console.log('📊 Datos del usuario:', currentUserData);

    displayPersonalPreview(personalData);
    displayBodyPreview(personalData);
    displayPreferencesPreview(preferencesData);
    displayPlanSummaryPreview();

    showSection('preview');
}

function getPersonalFormData() {
    if (!elements.personalForm) return null;

    const formData = new FormData(elements.personalForm);
    const sexo = document.querySelector('input[name="sexo"]:checked')?.value;

    if (!sexo) return null;

    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    data.sexo = sexo;

    return data;
}

function getPreferencesFormData() {
    if (!elements.preferencesForm) return null;

    const formData = new FormData(elements.preferencesForm);
    const objetivo = document.querySelector('input[name="objetivo"]:checked')?.value;

    if (!objetivo) return null;

    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    data.objetivo = objetivo;

    return data;
}

function displayPersonalPreview(data) {
    if (!elements.personalPreview) return;

    elements.personalPreview.innerHTML = `
        <div class="preview-row">
            <span class="preview-label">Nombre completo:</span>
            <span class="preview-value">${data.nombre} ${data.apellido}</span>
        </div>
        <div class="preview-row">
            <span class="preview-label">Edad:</span>
            <span class="preview-value">${data.edad} años</span>
        </div>
        <div class="preview-row">
            <span class="preview-label">Sexo:</span>
            <span class="preview-value">${data.sexo.charAt(0).toUpperCase() + data.sexo.slice(1)}</span>
        </div>
        <div class="preview-row">
            <span class="preview-label">Peso:</span>
            <span class="preview-value">${data.peso} kg</span>
        </div>
        <div class="preview-row">
            <span class="preview-label">Altura:</span>
            <span class="preview-value">${data.altura} cm</span>
        </div>
    `;
}

function displayBodyPreview(data) {
    if (!elements.bodyPreview || !currentCalculations) return;

    elements.bodyPreview.innerHTML = `
        <div class="preview-row">
            <span class="preview-label">TMB:</span>
            <span class="preview-value">${currentCalculations.tmb} kcal/día</span>
        </div>
        <div class="preview-row">
            <span class="preview-label">IMC:</span>
            <span class="preview-value">${currentCalculations.imc} (${currentCalculations.categoriaIMC})</span>
        </div>
        <div class="preview-row">
            <span class="preview-label">Calorías mantenimiento:</span>
            <span class="preview-value">${currentCalculations.caloriasMantenimiento} kcal/día</span>
        </div>
    `;
}

function displayPreferencesPreview(data) {
    if (!elements.preferencesPreview) return;

    const objetivoConfig = CONFIG.objetivos[data.objetivo];

    elements.preferencesPreview.innerHTML = `
        <div class="preview-row">
            <span class="preview-label">Objetivo:</span>
            <span class="preview-value">${objetivoConfig.nombre}</span>
        </div>
        ${data.alimentosPreferidos ? `
        <div class="preview-row">
            <span class="preview-label">Alimentos preferidos:</span>
            <span class="preview-value">${data.alimentosPreferidos}</span>
        </div>
        ` : ''}
    `;
}

function displayPlanSummaryPreview() {
    if (!elements.planSummaryPreview || !currentUserData || !currentCalculations) return;

    const objetivoConfig = CONFIG.objetivos[currentUserData.objetivo];
    const caloriasObjetivo = currentCalculations.caloriasMantenimiento + objetivoConfig.calorias;

    const proteinasGramos = Math.round((caloriasObjetivo * objetivoConfig.proteinas / 100) / 4);
    const carbohidratosGramos = Math.round((caloriasObjetivo * objetivoConfig.carbohidratos / 100) / 4);
    const grasasGramos = Math.round((caloriasObjetivo * objetivoConfig.grasas / 100) / 9);

    elements.planSummaryPreview.innerHTML = `
        <div class="macros-grid">
            <div class="macro-card">
                <span class="macro-value">${caloriasObjetivo}</span>
                <span class="macro-label">Calorías/día</span>
            </div>
            <div class="macro-card">
                <span class="macro-value">${proteinasGramos}g</span>
                <span class="macro-label">Proteínas</span>
            </div>
            <div class="macro-card">
                <span class="macro-value">${carbohidratosGramos}g</span>
                <span class="macro-label">Carbohidratos</span>
            </div>
            <div class="macro-card">
                <span class="macro-value">${grasasGramos}g</span>
                <span class="macro-label">Grasas</span>
            </div>
        </div>
    `;
}

function generateDiet() {
    if (!currentUserData || !currentCalculations) {
        alert('Error: Datos incompletos. Por favor vuelve a completar el formulario.');
        return;
    }

    console.log('🍽️ Generando dieta...');

    const objetivoConfig = CONFIG.objetivos[currentUserData.objetivo];
    const caloriasObjetivo = currentCalculations.caloriasMantenimiento + objetivoConfig.calorias;

    // Generar plan simple
    const planHTML = `
        <div class="diet-header">
            <h3>Plan Nutricional para ${currentUserData.nombre} ${currentUserData.apellido}</h3>
            <p class="diet-subtitle">Objetivo: ${objetivoConfig.nombre} • ${caloriasObjetivo} kcal/día</p>
        </div>

        <div class="weekly-diet">
            <h4>Plan Semanal</h4>
            <div class="day-plan">
                <h5 class="day-header">Lunes</h5>
                <div class="meal-section">
                    <h6>Desayuno (08:00)</h6>
                    <ul class="meal-foods">
                        <li>
                            <div class="food-main">
                                <span class="food-name">Huevos</span>
                                <span class="food-amount">100g</span>
                                <span class="food-calories">155 kcal</span>
                            </div>
                        </li>
                        <li>
                            <div class="food-main">
                                <span class="food-name">Arroz integral</span>
                                <span class="food-amount">80g</span>
                                <span class="food-calories">89 kcal</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        ${generateHSNRecommendations(currentUserData.objetivo)}
    `;

    if (elements.dietContent) {
        elements.dietContent.innerHTML = planHTML;
    }

    showSection('diet');

    console.log('✅ Dieta generada correctamente');
}

function generateHSNRecommendations(objetivo) {
    console.log('💊 Generando recomendaciones HSN para:', objetivo);

    const recommendations = [];

    // Buscar productos relevantes
    Object.values(PRODUCTOS_HSN).forEach(categoria => {
        categoria.forEach(product => {
            if (product.objetivos.includes(objetivo)) {
                recommendations.push(product);
            }
        });
    });

    // Limitar a 4 productos máximo
    const selectedProducts = recommendations.slice(0, 4);

    if (selectedProducts.length === 0) {
        return '<div class="hsn-recommendations-section"><h4>💊 Productos HSN</h4><p>No hay productos específicos para este objetivo.</p></div>';
    }

    let html = `
        <div class="hsn-recommendations-section">
            <h4><i class="fas fa-pills"></i> Productos HSN Recomendados</h4>
            <div class="hsn-products-grid">
    `;

    selectedProducts.forEach(product => {
        html += `
            <div class="hsn-product-card">
                <div class="hsn-product-header">
                    <h5>${product.nombre}</h5>
                    <span class="hsn-price">${product.precio_aprox}</span>
                </div>
                <div class="hsn-product-body">
                    <div><strong>Beneficios:</strong> ${product.beneficios.join(', ')}</div>
                    <div><strong>Cantidad:</strong> ${product.cantidad}</div>
                    <div><strong>Cómo tomar:</strong> ${product.forma_toma}</div>
                    <div><strong>Cuándo:</strong> ${product.cuando_tomar}</div>
                </div>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;

    return html;
}

// ==========  FUNCIONES DE EXPORTACIÓN SIMPLIFICADAS Y FUNCIONALES ==========

// PNG Export - SIMPLIFICADO PERO FUNCIONAL
function downloadPNG() {
    try {
        console.log('📸 Iniciando exportación PNG...');

        if (!currentUserData || !currentCalculations) {
            alert('❌ No hay datos para exportar. Genera la dieta primero.');
            return;
        }

        // Crear un canvas simple
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Configurar canvas
        canvas.width = 1200;
        canvas.height = 800;

        // Fondo blanco
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Título
        ctx.fillStyle = '#4CAF50';
        ctx.font = 'bold 32px Arial';
        ctx.fillText('ISAAC NUTRICIÓN', 50, 60);

        // Datos del cliente
        ctx.fillStyle = '#333333';
        ctx.font = '20px Arial';
        ctx.fillText(`Cliente: ${currentUserData.nombre} ${currentUserData.apellido}`, 50, 120);
        ctx.fillText(`Objetivo: ${CONFIG.objetivos[currentUserData.objetivo].nombre}`, 50, 150);
        ctx.fillText(`TMB: ${currentCalculations.tmb} kcal`, 50, 180);
        ctx.fillText(`IMC: ${currentCalculations.imc}`, 50, 210);

        // Fecha
        ctx.font = '16px Arial';
        ctx.fillText(`Generado: ${new Date().toLocaleDateString('es-ES')}`, 50, 250);

        // Plan básico
        ctx.font = 'bold 24px Arial';
        ctx.fillText('PLAN NUTRICIONAL:', 50, 320);

        ctx.font = '18px Arial';
        ctx.fillText('• Lunes a Sábado: 5 comidas diarias', 50, 360);
        ctx.fillText('• Domingo: Día libre', 50, 390);
        ctx.fillText('• Productos HSN recomendados incluidos', 50, 420);

        // Convertir a imagen y descargar
        canvas.toBlob(function(blob) {
            if (!blob) {
                console.error('❌ Error al crear el blob');
                alert('Error al generar la imagen PNG');
                return;
            }

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Plan_Nutricional_${currentUserData.nombre}_${currentUserData.apellido}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            console.log('✅ PNG descargado correctamente');
            alert('✅ Imagen PNG descargada correctamente');
        }, 'image/png');

    } catch (error) {
        console.error('❌ Error en downloadPNG:', error);
        alert(`Error al generar PNG: ${error.message}`);
    }
}

// Word Export - RTF SIMPLE PERO FUNCIONAL
function downloadWord() {
    try {
        console.log('📝 Iniciando exportación Word...');

        if (!currentUserData || !currentCalculations) {
            alert('❌ No hay datos para exportar. Genera la dieta primero.');
            return;
        }

        const objetivoConfig = CONFIG.objetivos[currentUserData.objetivo];
        const caloriasObjetivo = currentCalculations.caloriasMantenimiento + objetivoConfig.calorias;

        // Contenido RTF simple
        let rtfContent = `{\rtf1\ansi\deff0 {\fonttbl {\f0 Times New Roman;}}
{\colortbl;\red76\green175\blue80;\red0\green0\blue0;}

\f0\fs28\cf1\b ISAAC NUTRICIÓN\b0\cf2\par
\fs20 Plan Nutricional Personalizado\par\par

\fs16 DATOS DEL CLIENTE:\par
Cliente: ${currentUserData.nombre} ${currentUserData.apellido}\par
Fecha: ${new Date().toLocaleDateString('es-ES')}\par
Objetivo: ${objetivoConfig.nombre}\par
TMB: ${currentCalculations.tmb} kcal/día\par
IMC: ${currentCalculations.imc} (${currentCalculations.categoriaIMC})\par
Calorías objetivo: ${caloriasObjetivo} kcal/día\par\par

PLAN SEMANAL:\par
• Lunes a Sábado: 5 comidas diarias\par
• Domingo: Día libre con moderación\par
• Hidratación: 2-3 litros agua/día\par\par

PRODUCTOS HSN RECOMENDADOS:\par`;

        // Agregar productos HSN
        const recommendations = [];
        Object.values(PRODUCTOS_HSN).forEach(categoria => {
            categoria.forEach(product => {
                if (product.objetivos.includes(currentUserData.objetivo)) {
                    recommendations.push(product);
                }
            });
        });

        recommendations.slice(0, 4).forEach(product => {
            rtfContent += `\par ${product.nombre}:\par`;
            rtfContent += `Cantidad: ${product.cantidad}\par`;
            rtfContent += `Cuándo tomar: ${product.cuando_tomar}\par`;
            rtfContent += `Precio: ${product.precio_aprox}\par`;
        });

        rtfContent += `\par\par Generado por Isaac Nutrición v4.1.0}`;

        // Crear blob y descargar
        const blob = new Blob([rtfContent], { type: 'application/rtf;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Plan_Nutricional_${currentUserData.nombre}_${currentUserData.apellido}.rtf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('✅ Word RTF descargado correctamente');
        alert('✅ Documento Word descargado correctamente');

    } catch (error) {
        console.error('❌ Error en downloadWord:', error);
        alert(`Error al generar Word: ${error.message}`);
    }
}

// Markdown Export - SIMPLE PERO FUNCIONAL
function downloadMarkdown() {
    try {
        console.log('📄 Iniciando exportación Markdown...');

        if (!currentUserData || !currentCalculations) {
            alert('❌ No hay datos para exportar. Genera la dieta primero.');
            return;
        }

        const objetivoConfig = CONFIG.objetivos[currentUserData.objetivo];
        const caloriasObjetivo = currentCalculations.caloriasMantenimiento + objetivoConfig.calorias;

        let markdown = `# 🥗 Plan Nutricional Personalizado

## 👤 Datos del Cliente

- **Nombre:** ${currentUserData.nombre} ${currentUserData.apellido}
- **Fecha:** ${new Date().toLocaleDateString('es-ES')}
- **Objetivo:** ${objetivoConfig.nombre}
- **TMB:** ${currentCalculations.tmb} kcal/día
- **IMC:** ${currentCalculations.imc} (${currentCalculations.categoriaIMC})
- **Calorías objetivo:** ${caloriasObjetivo} kcal/día

## 📊 Plan Nutricional

### Estructura
- **Lunes a Sábado:** 5 comidas diarias
- **Domingo:** Día libre con moderación
- **Hidratación:** 2-3 litros de agua diarios

## 💊 Productos HSN Recomendados

`;

        // Agregar productos HSN
        const recommendations = [];
        Object.values(PRODUCTOS_HSN).forEach(categoria => {
            categoria.forEach(product => {
                if (product.objetivos.includes(currentUserData.objetivo)) {
                    recommendations.push(product);
                }
            });
        });

        recommendations.slice(0, 4).forEach(product => {
            markdown += `### ${product.nombre}
- **Beneficios:** ${product.beneficios.join(', ')}
- **Cantidad:** ${product.cantidad}
- **Cómo tomar:** ${product.forma_toma}
- **Cuándo tomar:** ${product.cuando_tomar}
- **Precio:** ${product.precio_aprox}

`;
        });

        markdown += `---

*Generado por Isaac Nutrición v4.1.0 el ${new Date().toLocaleDateString('es-ES')}*`;

        // Crear blob y descargar
        const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Plan_Nutricional_${currentUserData.nombre}_${currentUserData.apellido}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('✅ Markdown descargado correctamente');
        alert('✅ Archivo Markdown descargado correctamente');

    } catch (error) {
        console.error('❌ Error en downloadMarkdown:', error);
        alert(`Error al generar Markdown: ${error.message}`);
    }
}

// CSV Export para Google Sheets - SIMPLE PERO FUNCIONAL
function downloadGoogleSheets() {
    try {
        console.log('📊 Iniciando exportación CSV...');

        if (!currentUserData || !currentCalculations) {
            alert('❌ No hay datos para exportar. Genera la dieta primero.');
            return;
        }

        const objetivoConfig = CONFIG.objetivos[currentUserData.objetivo];
        const caloriasObjetivo = currentCalculations.caloriasMantenimiento + objetivoConfig.calorias;

        // Crear CSV básico
        let csv = 'Información,Valor\n';
        csv += `Nombre,"${currentUserData.nombre} ${currentUserData.apellido}"\n`;
        csv += `Fecha,"${new Date().toLocaleDateString('es-ES')}"\n`;
        csv += `Objetivo,"${objetivoConfig.nombre}"\n`;
        csv += `TMB,${currentCalculations.tmb}\n`;
        csv += `IMC,${currentCalculations.imc}\n`;
        csv += `Calorías objetivo,${caloriasObjetivo}\n`;
        csv += '\n';
        csv += 'PRODUCTOS HSN RECOMENDADOS\n';
        csv += 'Producto,Cantidad,Cuándo tomar,Precio\n';

        // Agregar productos HSN
        const recommendations = [];
        Object.values(PRODUCTOS_HSN).forEach(categoria => {
            categoria.forEach(product => {
                if (product.objetivos.includes(currentUserData.objetivo)) {
                    recommendations.push(product);
                }
            });
        });

        recommendations.slice(0, 4).forEach(product => {
            csv += `"${product.nombre}","${product.cantidad}","${product.cuando_tomar}","${product.precio_aprox}"\n`;
        });

        // Crear blob y descargar
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Plan_Nutricional_${currentUserData.nombre}_${currentUserData.apellido}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('✅ CSV descargado correctamente');
        alert('✅ Archivo CSV para Google Sheets descargado correctamente\n\nPara importar:\n1. Abre Google Sheets\n2. Archivo > Importar\n3. Selecciona el archivo CSV');

    } catch (error) {
        console.error('❌ Error en downloadGoogleSheets:', error);
        alert(`Error al generar CSV: ${error.message}`);
    }
}

// Print function - SIMPLE PERO FUNCIONAL
function printDiet() {
    try {
        console.log('🖨️ Iniciando impresión...');

        if (!currentUserData || !currentCalculations) {
            alert('❌ No hay datos para imprimir. Genera la dieta primero.');
            return;
        }

        // Usar la función de impresión básica del navegador
        const printContent = document.getElementById('dietContent');
        if (!printContent) {
            alert('❌ No hay contenido de dieta para imprimir');
            return;
        }

        // Crear ventana de impresión
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Plan Nutricional - ${currentUserData.nombre}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h3 { color: #4CAF50; }
                    .hsn-product-card { border: 1px solid #ddd; padding: 10px; margin: 10px 0; }
                    .hsn-product-header h5 { color: #FF9800; }
                    @media print { body { margin: 0; } }
                </style>
            </head>
            <body>
                ${printContent.innerHTML}
            </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.focus();

        // Esperar un poco y luego imprimir
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);

        console.log('✅ Impresión iniciada correctamente');

    } catch (error) {
        console.error('❌ Error en printDiet:', error);
        alert(`Error al imprimir: ${error.message}`);
    }
}

function resetApp() {
    console.log('🔄 Reiniciando aplicación...');

    if (elements.personalForm) elements.personalForm.reset();
    if (elements.preferencesForm) elements.preferencesForm.reset();

    currentUserData = null;
    currentCalculations = null;

    if (elements.calculationsDisplay) elements.calculationsDisplay.style.display = 'none';
    if (elements.continueToPreferencesBtn) elements.continueToPreferencesBtn.disabled = true;

    showSection('personal');

    console.log('✅ Aplicación reiniciada');
}

// Initialize validation on form changes
document.addEventListener('change', function(e) {
    if (e.target.closest('#personalForm')) {
        validatePersonalForm();
    }
});

document.addEventListener('input', function(e) {
    if (e.target.closest('#personalForm')) {
        validatePersonalForm();
    }
});

console.log('✅ Isaac Nutrición v4.1.0 JavaScript cargado correctamente');