export function texto(s) {
  return s ? s : "";
}
export function muestraError(e) {
  console.error(e);
  alert(e.message);
}
export function eh(texto) {
  let div = document.createElement('div');
  div.innerText = texto;
  return div.innerHTML;
}
export async function fetchJson(url, datos) {
  const respuestaHttp = await fetch(url, datos);
  if (respuestaHttp.ok) {
    const respuesta = await respuestaHttp.json();
    if (respuesta.error) {
      throw new Error(respuesta.error);
    } else {
      return respuesta;
    }
  } else {
    throw new Error(respuestaHttp.statusText);
  }
}
export async function query(url) {
  return fetchJson(url, { credentials: 'include' });
}
export async function execute(url, forma, regreso) {
  await fetchJson(url,
    { credentials: 'include', method: "POST", body: new FormData(forma) });
  window.location = regreso;
}
export function agregaOpciones(select, opciones) {
  select.innerHTML = "";
  for (const opcion of opciones) {
    const option = document.createElement("option");
    option.value = opcion.value;
    option.selected = opcion.selected;
    option.text = opcion.text;
    select.appendChild(option);
  }
}
export function archivoSeleccionado(file) {
  /* file.files
   * El componente "file" tiene una lista, cuyo nombre es "files"
   * con los archivos seleccionados por el usuario.
   * 
   * file.files[0]
   * es el primer archivo de la lista con los archivos seleccionados.
   *
   * file.files && file.files[0]
   * Primero evalúa que la lista no esté vacía; si este es el caso,
   * el resultado es true si en la posición 0 apunta a un File.
   * En cualquier otro caso, devuelve false. */
  return file.files && file.files[0];
}
/** Muestra en el element img de la forma, la imagen seleccionada en el
 * input con type="file". */
export function muestraArchivoSeleccionado(img, evt) {
  const file = evt.target;
  if (archivoSeleccionado(file)) {
    /* Crea un FileReader, que sirve para leer el contenido de
     * archivos. */
    const reader = new FileReader();
    /* Se invoca al método readAsDataURL del FileReader, pero
     * previamente se configura para que notifique cuando termine.
     *
     * Cuando termina de leer exitosamente, invoca al método
     * "onload", el cual pasa a un componente img el resultado de la
     * operación que se invoca más adelante. */
    reader.onload = () => img.src = reader.result;
    /* Cuando termina de leer con error, invoca al método
    * "onerror", el cual pasa a muestra el Error generado. */
    reader.onerror = () => muestraError(reader.error);
    /* Devuelve una url que incluye el contenido del archivo
     * seleccionado. */
    reader.readAsDataURL(file.files[0]);
    /* Si se usa reader.readAsArrayBuffer, se puede usar
     * directamente cualquier posición dentro del File. Es lo que se
     * conoce como acceso aleatorio. */
  }
}