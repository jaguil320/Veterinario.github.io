function eventListener() {
  mascotaInput.addEventListener('input', datosCitas);
  propietarioInput.addEventListener('input', datosCitas);
  telefonoInput.addEventListener('input', datosCitas);
  fechaInput.addEventListener('input', datosCitas);
  horaInput.addEventListener('input', datosCitas);
  sintomasInput.addEventListener('input', datosCitas);
  formulario.addEventListener('submit', nuevaCita);
}
