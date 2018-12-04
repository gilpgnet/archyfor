import { consulta, agregaOpciones, execute } from "./lib/util.js";
const roles = document.querySelector('name="roles[]"');
const parametros = new URLSearchParams(location.search);
const cue = parametros.get("cue");
const vista = document.vista;
vista.cue.value = cue;
vista.addEventListener("submit", guarda);
vista.elimina.addEventListener("click", elimina);
consulta("servicios/usuarios_busca.php?cue=" + encodeURIComponent(cue),
  respuesta => {
    document.title = cue;
    vista.titulo.value = cue;
    vista.nombre.value = respuesta.modelo.nombre;
    agregaOpciones(vista.aficion, respuesta.aficiones);
    agregaOpciones(roles, respuesta.roles);
  });
function guarda() {
  execute("servicios/usuarios_modifica.php", vista, "index.html");
}
function elimina() {
  if (confirm("Confirma la eliminación\nPerderás los datos.")) {
    execute("servicios/usuarios_elimina.php?cue=" + encodeURIComponent(cue),
      vista, "index.html");
  }
}