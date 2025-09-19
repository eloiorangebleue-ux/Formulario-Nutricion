function doGet(e) {
  return ContentService.createTextOutput('API Nutricional activa').setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    var hoja = SpreadsheetApp.openById('1oo3HMvcl6lDyW5a1mzSbAXZX6R8p3BKpo29WXpPCGWc').getSheetByName('Respuestas');
    var p = e.parameter;

    // Función para procesar arrays y unir en string
    var arr = function(key) {
      if (!e.parameters[key]) return '';
      if (typeof e.parameters[key] === 'string') return e.parameters[key];
      if (Array.isArray(e.parameters[key])) return e.parameters[key].join(', ');
      return '';
    };

    // Crear encabezados si hoja vacía
    if (hoja.getLastRow() === 0) {
      hoja.appendRow([
        'Fecha',
        'Nombre',
        'Apellido',
        'Email',
        'Teléfono',
        'Edad',
        'Estatura (cm)',
        'Objetivo',
        'Alimentos preferidos',
        'Alimentos que no me gustan',
        'Intolerancias y alergias',
        'Observaciones'
      ]);
    }

    // Combinar intolerancias y alergias para registro
    var intolerAl = [];
    if (e.parameters['intolerancias']) {
      if (Array.isArray(e.parameters['intolerancias'])) intolerAl = intolerAl.concat(e.parameters['intolerancias']);
      else intolerAl.push(e.parameters['intolerancias']);
    }
    if (e.parameters['alergias']) {
      if (Array.isArray(e.parameters['alergias'])) intolerAl = intolerAl.concat(e.parameters['alergias']);
      else intolerAl.push(e.parameters['alergias']);
    }
    if (p.otrosIntolerAl && p.otrosIntolerAl.trim() !== '') {
      intolerAl.push(p.otrosIntolerAl.trim());
    }
    var intolerAlStr = intolerAl.join(', ');

    hoja.appendRow([
      new Date(),
      p.nombre || '',
      p.apellido || '',
      p.email || '',
      p.telefono || '',
      p.edad || '',
      p.estatura || '',
      p.objetivo || '',
      arr('preferidos'),
      arr('noGustan'),
      intolerAlStr,
      p.restricciones || ''
    ]);

    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "result": "error",
      "error": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
