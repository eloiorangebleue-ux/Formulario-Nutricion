document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('nutrition-form');
  const confirmation = document.getElementById('confirmation');
  const errorMsg = document.getElementById('error-msg');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Limpiar mensajes previos
    errorMsg.textContent = '';
    errorMsg.style.display = 'none';
    confirmation.classList.remove('visible');
    confirmation.style.opacity = 0;

    // Validar campos obligatorios
    const nombre = form.nombre.value.trim();
    const apellido = form.apellido.value.trim();
    const email = form.email.value.trim();
    const telefono = form.telefono.value.trim();
    const edad = form.edad.value.trim();

    let errores = [];

    if (!nombre) errores.push('El campo Nombre es obligatorio.');
    if (!apellido) errores.push('El campo Apellido es obligatorio.');
    if (!email) {
      errores.push('El campo Email es obligatorio.');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) errores.push('El Email no tiene un formato válido.');
    }
    if (!telefono) errores.push('El campo Teléfono es obligatorio.');
    else {
      const telRegex = /^\+?\d{7,15}$/;
      if (!telRegex.test(telefono)) errores.push('El Teléfono no es válido. Ejemplo: +34600000000');
    }
    if (!edad) errores.push('El campo Edad es obligatorio.');
    else {
      const edadNum = parseInt(edad, 10);
      if (isNaN(edadNum) || edadNum < 1 || edadNum > 120) errores.push('La Edad debe ser un número entre 1 y 120.');
    }

    if (errores.length > 0) {
      errorMsg.innerHTML = errores.join('<br>');
      errorMsg.style.display = 'block';
      return;
    }

    // Recolectar datos
    const data = {
      nombre,
      apellido,
      email,
      telefono,
      edad,

      preferidos: [...form.querySelectorAll('input[name="preferidos"]:checked')].map(cb => cb.value),
      noGustan: [...form.querySelectorAll('input[name="no_gustan"]:checked')].map(cb => cb.value),

      intolerancias: [...form.querySelectorAll('input[name="intolerancias"]:checked')].map(cb => cb.value),
      otrosIntolerancias: form['otros-intolerancias'].value.trim(),

      alergias: [...form.querySelectorAll('input[name="alergias"]:checked')].map(cb => cb.value),
      otrosAlergias: form['otros-alergias'].value.trim(),

      restricciones: form.restricciones.value.trim(),
      fecha: new Date().toISOString()
    };

    if (data.otrosIntolerancias) data.intolerancias.push(data.otrosIntolerancias);
    if (data.otrosAlergias) data.alergias.push(data.otrosAlergias);

    console.log('Datos recibidos:', data);

    // Mostrar mensaje de confirmación
    confirmation.classList.add('visible');
    confirmation.style.opacity = 1;
    form.reset();

    // Ocultar tras unos segundos
    setTimeout(() => {
      confirmation.classList.remove('visible');
      confirmation.style.opacity = 0;
    }, 4000);
  });
});
