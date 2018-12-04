import { query, execute } from "./lib/util.js";
const vista = document.vista;
document.vista.addEventListener("submit", guarda);
query("servicios/usuarios_busca.php",
  respuesta => {
    Util.agregaOpciones(vista.aficion, respuesta.aficiones);
    Util.agregaOpciones(vista["roles[]"], respuesta.roles);
  });
function guarda() {
  execute("servicios/usuarios_agrega.php", vista, "index.html");
}