const scriptURL = 'https://script.google.com/macros/s/AKfycbwKECuCJOkJFYY7jM7BGB1iN7q8lFUL-5JQNjrsUe6x-ccTzl5fb979d3Z_nPdYTEb4JA/exec';

const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.innerText = 'Enviando...';

  // Empaquetado de datos del formulario
  const formData = new FormData();
  formData.append('nombreProfesor', document.getElementById('nombreProfesor').value);
  formData.append('asignatura', document.getElementById('asignatura').value);
  formData.append('fechaActividad', document.getElementById('fechaActividad').value);
  formData.append('horarioInicio', document.getElementById('horarioInicio').value);
  formData.append('horarioFinal', document.getElementById('horarioFinal').value);
  formData.append('laboratorio', document.getElementById('laboratorio').value);
  formData.append('insumos', document.getElementById('insumos').value);
  formData.append('insumos', document.getElementById('correo').value);

  // Envío al servidor (Google App Script)
  fetch(scriptURL, {
    method: 'POST',
    mode: 'no-cors', // Permite el envío a Google sin errores de política de origen
    body: formData 
  })
  .then(() => {
    // Al usar 'no-cors', no podemos leer la respuesta, pero el éxito se asume si no hay error
    alert('¡Solicitud registrada correctamente! El pañolero lo ha recibido y puede consultarle al respecto');
    form.reset();
    submitButton.disabled = false;
    submitButton.innerText = 'Enviar Solicitud';
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Hubo un error al procesar la solicitud. Por favor, intente nuevamente.');
    submitButton.disabled = false;
    submitButton.innerText = 'Enviar Solicitud';
  });
});