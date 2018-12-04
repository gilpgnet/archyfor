export function muestraError(e) {
  console.error(e);
  alert(e.message);
}
export function eh(texto) {
  let div = document.createElement('div');
  div.innerText = texto;
  return div.innerHTML;
}
export function setVisible(element, visible) {
  if (element) {
    if (visible) {
      element.style.height = "";
      element.style.width = "";
      element.style.overflow = "";
    } else {
      element.style.height = "0";
      element.style.width = "0";
      element.style.overflow = "hidden";
    }
    element.style.display = visible ? "" : "none";
  }
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
export function query(url, funcion) {
  fetchJson(url, { credentials: 'include' }, funcion);
}
export function execute(url, forma, regreso) {
  fetchJson(url,
    { credentials: 'include', method: "POST", body: new FormData(forma) },
    () => window.location = regreso);
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