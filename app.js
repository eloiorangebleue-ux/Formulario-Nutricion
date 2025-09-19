function doPost(e) {
  try {
    var hoja = SpreadsheetApp.openById('1oo3HMvcl6lDyW5a1mzSbAXZX6R8p3BKpo29WXpPCGWc').getSheetByName('Respuestas');
    var datos;
    if (e.postData && e.postData.contents) {
      try {
        datos = JSON.parse(e.postData.contents);
      } catch (err) {
        return ContentService.createTextOutput(JSON.stringify({ result: "error", error: "Formato de datos inválido" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    } else {
      // Manejo tradicional para envío tipo formulario
      datos = e.parameter;
    }

    // Encabezados automáticos si no existen
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

    // Combinar intolerancias y alergias (arrays y string posibles)
    function arr(key) {
      return Array.isArray(datos[key])
        ? datos[key].join(', ')
        : (typeof datos[key] === 'string' ? datos[key] : '');
    }
    var intolerAl = [];
    if (Array.isArray(datos['intolerancias'])) intolerAl = intolerAl.concat(datos['intolerancias']);
    else if (datos['intolerancias']) intolerAl.push(datos['intolerancias']);
    if (Array.isArray(datos['alergias'])) intolerAl = intolerAl.concat(datos['alergias']);
    else if (datos['alergias']) intolerAl.push(datos['alergias']);
    if (datos['otrosIntolerAl']) intolerAl.push(datos['otrosIntolerAl']);
    var intolerAlStr = intolerAl.join(', ');

    hoja.appendRow([
      new Date(),
      datos.nombre || '',
      datos.apellido || '',
      datos.email || '',
      datos.telefono || '',
      datos.edad || '',
      datos.estatura || '',
      datos.objetivo || '',
      arr('preferidos'),
      arr('noGustan'),
      intolerAlStr,
      datos.restricciones || ''
    ]);

    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "result": "error",
      "error": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
