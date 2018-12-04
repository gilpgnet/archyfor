import { setVisible } from "../lib/util.js";
customElements.define("herramientas-detalle", class extends HTMLElement {
  static get observedAttributes() {
    return ["regreso", "agrega"];
  }
  connectedCallback() {
    if (!this.hasAttribute("regreso")) {
      this.setAttribute("index.html");
    }
    this.innerHTML =
      `<a accesskey="C" href="${this.getAttribute('regreso')}">Cancelar</a>
      <input type="submit" accesskey="G" value="Guardar">
      <input name="elimina" type="button" accesskey="E" value="Eliminar">`;
    this.actualizaElimina();
  }
  attributeChangedCallback(nombre, valorAnterior, valorNuevo) {
    switch (nombre) {
      case "regeso":
        const a = this.querySelector(a);
        if (a) {
          a.href = valorNuevo;
        }
        break;
      case "agrega":
        this.actualizaElimina();
        break;
    }
  }
  actualizaElimina() {
    setVisible(this.querySelector("[name=elimina]"), !this.hasAttribute("agrega"));
  }
});