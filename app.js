const form = document.getElementById('nutrition-form');
const confirmation = document.getElementById('confirmation');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const data = {
    nombre: form.nombre.value.trim(),
    apellido: form.apellido.value.trim(),
    email: form.email.value.trim(),
    telefono: form.telefono.value.trim(),
    edad: form.edad.value.trim(),

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

  // Aquí puedes enviar los datos a un servidor o guardarlos remotamente

  console.log('Datos recibidos:', data);

  confirmation.classList.remove('hidden');
  form.reset();

  setTimeout(() => confirmation.classList.add('hidden'), 5000);
});
