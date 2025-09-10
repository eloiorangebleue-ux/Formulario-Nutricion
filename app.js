document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('nutrition-form');
  const confirmation = document.getElementById('confirmation');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let errores = [];

    const nombre = form.nombre.value.trim();
    const apellido = form.apellido.value.trim();
    const email = form.email.value.trim();
    const telefono = form.telefono.value.trim();
    const edad = form.edad.value.trim();

    if (!nombre) errores.push('Nombre');
    if (!apellido) errores.push('Apellido');

    if (!email) {
      errores.push('Email');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) errores.push('Email (formato inválido)');
    }

    if (!telefono) {
      errores.push('Teléfono');
    } else {
      const telRegex = /^\+?\d{7,15}$/;
      if (!telRegex.test(telefono)) errores.push('Teléfono (formato inválido)');
    }

    if (!edad) {
      errores.push('Edad');
    } else {
      const edadNum = parseInt(edad, 10);
      if (isNaN(edadNum) || edadNum < 1 || edadNum > 120)
        errores.push('Edad (debe ser un número entre 1 y 120)');
    }

    if (errores.length > 0) {
      alert('Por favor complete o corrija los siguientes campos obligatorios:\n- ' + errores.join('\n- '));
      return;
    }

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

      restricciones: form.restricciones.value.trim()
    };

    const url = 'https://script.google.com/macros/s/AKfycbyRiSWmtTLVSGRaoqK3fPiHLS90jtkoa--9EkPh72jKTUwinTLg0tVamn4yJeyGm7j53A/exec';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(json => {
        if (json.result === 'success') {
          confirmation.classList.add('visible');
          confirmation.style.opacity = 1;
          form.reset();
          setTimeout(() => {
            confirmation.classList.remove('visible');
            confirmation.style.opacity = 0;
          }, 4000);
        } else {
          alert('Error guardando el formulario, intenta más tarde.');
        }
      })
      .catch(error => {
        alert('Error al conectar con servidor: ' + error.message);
      });
  });
});
