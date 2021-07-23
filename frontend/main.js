// HEADERS PARA MIS REQUESTS DE BACK

const token = JSON.parse(localStorage.getItem("tokenLogin"));
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${token}`);

// USUARIOS DISPONIBLE SOLO PARA ADMINS

let admin = localStorage.getItem("admin");
if (admin == 0) {
  document.getElementById("nav-usuarios").style.display = "none";
}

// LIMPIAR PAGINA

function cleanPag() {
    let borraContactos = document.getElementById("contactos");
    while (borraContactos.firstChild) {
      borraContactos.removeChild(borraContactos.firstChild);
    }
    let borraUsuarios = document.getElementById("usuarios");
    while (borraUsuarios.firstChild) {
      borraUsuarios.removeChild(borraUsuarios.firstChild);
    }
    let borraCompanias = document.getElementById("companias");
    while (borraCompanias.firstChild) {
      borraCompanias.removeChild(borraCompanias.firstChild);
    }
    let borraZonas = document.getElementById("zonas");
    while (borraZonas.firstChild) {
      borraZonas.removeChild(borraZonas.firstChild);
    }
    let borrarBienvenida= document.getElementById("bienvenida");
    while (borrarBienvenida.firstChild) {
      borrarBienvenida.removeChild(borrarBienvenida.firstChild);
    }
  }