document.getElementById("nav-companias").addEventListener("click", cargarCompanias);

function cargarCompanias() {
  cleanPag();
  let cabeCompania = document.createElement("h2");
  document.getElementById("companias").appendChild(cabeCompania);
  cabeCompania.innerHTML = "COMPAÑIAS";
  getCompany();
  traerCiudades();
}

let arrayCiudades = [];
function traerCiudades() {
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const urlCiudades = "http://localhost:5500/cities";
  fetch(urlCiudades, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);
      if (arrayCiudades.length == 0) {
        for (y = 0; y < json.length; y++) {
          arrayCiudades.push(json[y]);
        }
      }
      console.log(arrayCiudades);
    })
    .catch((error) => console.error("Error:", error));
}

function getCompany() {
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const urlCompanias = "http://localhost:5500/companies";
  fetch(urlCompanias, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      let conteNuevaCompania = document.createElement("div");
      let nuevaCompania = document.createElement("h1");
      document.getElementById("companias").appendChild(conteNuevaCompania);
      conteNuevaCompania.appendChild(nuevaCompania);
      nuevaCompania.innerHTML = "Agregar Compañia";
      nuevaCompania.style.cursor="pointer";
      conteNuevaCompania.addEventListener("click", newCompany);

      let tablaCompanias = document.createElement("table");
      document.getElementById("companias").appendChild(tablaCompanias);
      let headTablaCom = document.createElement("thead");
      tablaCompanias.appendChild(headTablaCom);
      let trCompaniaHead = document.createElement("tr");
      headTablaCom.appendChild(trCompaniaHead);
      let tituloNombre = document.createElement("th");
      let tituloDireccion = document.createElement("th");
      let tituloEmail = document.createElement("th");
      let tituloCiudad = document.createElement("th");
      let tituloAccion = document.createElement("th");
      trCompaniaHead.appendChild(tituloNombre);
      trCompaniaHead.appendChild(tituloDireccion);
      trCompaniaHead.appendChild(tituloEmail);
      trCompaniaHead.appendChild(tituloCiudad);
      trCompaniaHead.appendChild(tituloAccion);
      tituloNombre.innerHTML = "Compañia";
      tituloDireccion.innerHTML = "Direccion";
      tituloEmail.innerHTML = "Email";
      tituloCiudad.innerHTML = "Ciudad";
      tituloAccion.innerHTML = "Acciones";

      let tablaCompaniasDatos = document.createElement("tbody");
      tablaCompanias.appendChild(tablaCompaniasDatos);

      for (i = 0; i < json.length; i++) {
        let trCompaniaDetalle = document.createElement("tr");
        let nombre = document.createElement("th");
        let direccion = document.createElement("th");
        let email = document.createElement("th");
        let ciudad = document.createElement("th");
        let accion = document.createElement("th");
        let editar = document.createElement("h3");
        let eliminar = document.createElement("h3");
        tablaCompaniasDatos.appendChild(trCompaniaDetalle);
        trCompaniaDetalle.appendChild(nombre);
        trCompaniaDetalle.appendChild(direccion);
        trCompaniaDetalle.appendChild(email);
        trCompaniaDetalle.appendChild(ciudad);
        trCompaniaDetalle.appendChild(accion);
        accion.appendChild(editar);
        accion.appendChild(eliminar);
        editar.setAttribute("class","editar");
        editar.style.cursor="pointer";
        eliminar.setAttribute("class","eliminar");
        eliminar.style.cursor="pointer";
        nombre.innerHTML = json[i].name;
        direccion.innerHTML = json[i].adress;
        email.innerHTML = json[i].email;
        ciudad.innerHTML = json[i].city_name;

        let company_id = json[i].company_id;
        let cname = json[i].name;
        let cadress = json[i].adress;
        let cemail = json[i].email;
        let cphone = json[i].phone;
        let city_id = json[i].city_id;
        let city_name=json[i].city_name;
        editar.innerHTML = "Editar";
        editar.addEventListener("click", function () {
          editarCompania(company_id, cname, cadress, cemail, cphone,city_name);
        });
        eliminar.innerHTML = "Eliminar";
        eliminar.addEventListener("click", function () {
          eliminarCompania(company_id);
        });
      }
    })
    .catch((error) => console.error("Error:", error));
}

function newCompany() {
  formularioCompania();
  let botonAccion = document.getElementById("botonaccion");
  botonAccion.innerHTML = "Crear";
  botonAccion.addEventListener("click", function () {
    postCompany();
  });
}

function postCompany() {
  let cityCompany = document.getElementById("city_id").value;
  let newCompany = {
    name: cname.value,
    adress: cadress.value,
    email: cemail.value,
    phone: cphone.value,
    city_id: cityCompany,
  };

  console.log(newCompany);

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(newCompany),
  };

  const urlUsuarios = "http://localhost:5500/companies";
  fetch(urlUsuarios, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (json.msj == "Compañia creada exitosamente") {
        alert("Compañia creada exitosamente");
        cargarCompanias();
      } else {
        alert("Error - Companía existente");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function editarCompania(company_id, cname, cadress, cemail, cphone,city_name) {
  formularioCompania(cname, cadress, cemail, cphone,city_name);
  let botonAccion = document.getElementById("botonaccion");
  botonAccion.innerHTML = "Modificar";
  botonAccion.addEventListener("click", function () {
    putCompany(company_id);
  });
}

function putCompany(company_id) {
  let cityCompany = document.getElementById("city_id").value;
  let editCompany = {
    name: cname.value,
    adress: cadress.value,
    email: cemail.value,
    phone: cphone.value,
    city_id: cityCompany,
  };

  console.log(editCompany);

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(editCompany),
  };

  const urlUsuarios = `http://localhost:5500/companies/${company_id}`;
  fetch(urlUsuarios, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (json.msj == "Compañia modificada exitosamente") {
        alert("Compañia modificada exitosamente");
        cargarCompanias();
      } else
        alert(
          "Error al modificar la compañia, faltan campos por completar"
        );
    })
    .catch((error) => console.error("Error:", error));
}

function eliminarCompania(company_id) {
  let confirmacion = confirm("Realmente desea eliminar la compañia?");
  if (confirmacion == true) {
    deleteCompany(company_id);
    cargarCompanias();
  }
}

function deleteCompany(company_id) {
  let requestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  const urlUsuarios = `http://localhost:5500/companies/${company_id}`;
  fetch(urlUsuarios, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (json == "Compañia eliminada exitosamente") {
        alert("Compañia eliminada exitosamente");
        cargarCompanias();
      } else alert("La compañia esta en uso, no esta permitido eliminarla");
    })
    .catch((error) => console.error("Error:", error));
}

function formularioCompania(cname, cadress, cemail, cphone,city_name) {
  cleanPag();
  let cabeCompanias = document.createElement("h2");
  document.getElementById("companias").appendChild(cabeCompanias);
  cabeCompanias.innerHTML = "COMPAÑIAS";

  let formulario = document.createElement("form");
  let ulForm = document.createElement("ul");
  let li1 = document.createElement("li");
  let li2 = document.createElement("li");
  let li3 = document.createElement("li");
  let li4 = document.createElement("li");
  let li5 = document.createElement("li");
  let lblForm1 = document.createElement("label");
  let lblForm2 = document.createElement("label");
  let lblForm3 = document.createElement("label");
  let lblForm4 = document.createElement("label");
  let lblForm5 = document.createElement("label");
  let inputForm1 = document.createElement("input");
  let inputForm2 = document.createElement("input");
  let inputForm3 = document.createElement("input");
  let inputForm4 = document.createElement("input");
  let selectForm5 = document.createElement("select");

  document.getElementById("companias").appendChild(formulario);
  formulario.appendChild(ulForm);
  ulForm.appendChild(li1);
  ulForm.appendChild(li2);
  ulForm.appendChild(li3);
  ulForm.appendChild(li4);
  ulForm.appendChild(li5);
  li1.appendChild(lblForm1);
  li2.appendChild(lblForm2);
  li3.appendChild(lblForm3);
  li4.appendChild(lblForm4);
  li5.appendChild(lblForm5);
  li1.appendChild(inputForm1);
  li2.appendChild(inputForm2);
  li3.appendChild(inputForm3);
  li4.appendChild(inputForm4);
  li5.appendChild(selectForm5);

  lblForm1.setAttribute("for", "cname");
  lblForm1.innerHTML = "Compañia*";
  lblForm2.setAttribute("for", "cadress");
  lblForm2.innerHTML = "Direccion*";
  lblForm3.setAttribute("for", "cemail");
  lblForm3.innerHTML = "Correo electrónico*";
  lblForm4.setAttribute("for", "cphone");
  lblForm4.innerHTML = "Numero de telefono*";
  lblForm5.setAttribute("for", "city_id");
  lblForm5.innerHTML = "Ciudad*";
  lblForm5.setAttribute("disabled", "disabled");

  inputForm1.setAttribute("type", "text");
  inputForm1.setAttribute("id", "cname");
  inputForm2.setAttribute("type", "text");
  inputForm2.setAttribute("id", "cadress");
  inputForm3.setAttribute("type", "email");
  inputForm3.setAttribute("id", "cemail");
  inputForm4.setAttribute("type", "tel");
  inputForm4.setAttribute("id", "cphone");
  selectForm5.setAttribute("id", "city_id");

  let opcion0 = document.createElement("option");
  opcion0.innerHTML = "Seleccione una ciudad...";
  selectForm5.appendChild(opcion0);
  for (i = 0; i < arrayCiudades.length; i++) {
    let opcion = document.createElement("option");
    opcion.innerHTML = arrayCiudades[i].name;
    selectForm5.appendChild(opcion);
    opcion.setAttribute("value", arrayCiudades[i].city_id);
    opcion.innerHTML = arrayCiudades[i].name;
  }

  let select = document.getElementById("city_id");
  select.addEventListener("change", function () {
    var optionCity = this.options[select.selectedIndex].value;
    console.log(optionCity);
    selectForm5.setAttribute("value", optionCity);
  });

  if (cname && cadress && cemail && cphone) {
    inputForm1.setAttribute("value", cname);
    inputForm2.setAttribute("value", cadress);
    inputForm3.setAttribute("value", cemail);
    inputForm4.setAttribute("value", cphone);
  }

  var botonAccion = document.createElement("h2");
  formulario.appendChild(botonAccion);
  botonAccion.setAttribute("id", "botonaccion");
  botonAccion.style.cursor="pointer";
}
