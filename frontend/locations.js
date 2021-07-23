document.getElementById("nav-zonas").addEventListener("click", displayLocations);

function displayLocations() {
  cleanPag();
  let cargarLocations = document.createElement("h2");
  document.getElementById("zonas").appendChild(cargarLocations);
  cargarLocations.innerHTML = "LOCALIZACIONES";
  getRegiones();
}

// MANIPULACION DE REGIOES
function getRegiones() {
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const urlRegiones = "http://localhost:5500/regions";
  fetch(urlRegiones, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      let conteNuevaRegion = document.createElement("div");
      let nuevaRegion = document.createElement("h1");
      document.getElementById("zonas").appendChild(conteNuevaRegion);
      conteNuevaRegion.appendChild(nuevaRegion);
      nuevaRegion.innerHTML = "Agregar Region";
      nuevaRegion.style.cursor = "pointer";
      conteNuevaRegion.addEventListener("click", newRegion);

      for (i = 0; i < json.length; i++) {
        let conteReg = document.createElement("div");
        let regiones = document.createElement("h3");
        document.getElementById("zonas").appendChild(conteReg);
        conteReg.setAttribute("id", "region" + json[i].region_id);
        conteReg.setAttribute("class","region");
        regiones.innerHTML = json[i].name;
        
        let conR=document.createElement("div");
        let editar = document.createElement("h4");
        let eliminar = document.createElement("h4");
        let agregarPais = document.createElement("h1");
        conteReg.appendChild(conR);
        conR.appendChild(regiones);
        conR.appendChild(editar);
        conR.appendChild(eliminar);
        conR.appendChild(agregarPais);
        editar.setAttribute("id", "editar-region" + json[i].region_id);
        eliminar.setAttribute("id", "eliminar-region" + json[i].region_id);
        editar.innerHTML = "Editar";
        editar.setAttribute("class", "editar");
        editar.style.cursor = "pointer";

        let region_id = json[i].region_id;
        let nombreRegion = json[i].name;
        editar.addEventListener("click", function () {
          editarRegiones(region_id, nombreRegion);
        });
        eliminar.innerHTML = "Eliminar";
        eliminar.setAttribute("class", "eliminar");
        eliminar.style.cursor = "pointer";
        eliminar.addEventListener("click", function () {
          eliminarRegiones(region_id);
        });

        agregarPais.innerHTML = "Agregar Pais";
        agregarPais.style.cursor = "pointer";
        agregarPais.setAttribute("id", "agregarPais" + region_id);
        agregarPais.setAttribute("class","agregarpais");
        agregarPais.addEventListener("click", function () {
          newCountry(region_id);
        });

        let idReg = json[i].region_id;
        getPaises(idReg);
      }
    })
    .catch((error) => console.error("Error:", error));
}

function newRegion() {
  formularioRegiones();
  let botonAccion = document.getElementById("botonaccion");
  botonAccion.innerHTML = "Crear";
  botonAccion.addEventListener("click", function () {
    postRegion();
  });
}

function postRegion() {
  let zregion = document.getElementById("zregion");
  let newRegion = {
    name: zregion.value,
  };

  console.log(newRegion);

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(newRegion),
  };

  const urlRegiones = "http://localhost:5500/regions";
  fetch(urlRegiones, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (json.msj == "Region creada exitosamente") {
        alert("Region creada exitosamente");
        displayLocations();
      } else {
        alert("Error al generar la region, la mismo ya existe o faltan campos por completar");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function editarRegiones(region_id, nombreRegion) {
  formularioRegiones(nombreRegion);
  let botonAccion = document.getElementById("botonaccion");
  botonAccion.innerHTML = "Modificar";
  botonAccion.addEventListener("click", function () {
    putRegion(region_id);
  });
}

function putRegion(region_id) {
  let editRegion = {
    name: zregion.value,
  };
  // console.log(editRegion);

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(editRegion),
  };

  const urlRegiones = `http://localhost:5500/regions/${region_id}`;
  fetch(urlRegiones, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);
      if (json == "Región modificada exitosamente") {
        alert("Región modificada exitosamente");
        displayLocations();
      } else {
        alert("Error al modificar la región");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function eliminarRegiones(region_id) {
  let confirmacion = confirm("Realmente desea eliminar la region?");
  if (confirmacion == true) {
    deleteRegion(region_id);
    displayLocations();
  }
}

function deleteRegion(region_id) {
  let requestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  const urlRegiones = `http://localhost:5500/regions/${region_id}`;
  fetch(urlRegiones, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);
      if (json == "Región eliminada exitosamente") {
        alert("Región eliminada exitosamente");
        displayLocations();
      } else {
        alert(
          "Error al eliminar la region"
        );
      }
    })
    .catch((error) => console.error("Error:", error));
}

function formularioRegiones(nombreRegion) {
  cleanPag();

  let cargarLocations=document.createElement("h2");
  document.getElementById("zonas").appendChild(cargarLocations);
  cargarLocations.innerHTML="REGIONES"

  let formulario = document.createElement("form");
  let ulForm = document.createElement("ul");
  let li1 = document.createElement("li");
  let lblForm1 = document.createElement("label");
  let inputForm1 = document.createElement("input");

  document.getElementById("zonas").appendChild(formulario);
  formulario.appendChild(ulForm);
  ulForm.appendChild(li1);
  li1.appendChild(lblForm1);
  li1.appendChild(inputForm1);

  lblForm1.setAttribute("for", "zregion");
  lblForm1.innerHTML = "Nueva region*";
  if (nombreRegion !== undefined) {
    lblForm1.innerHTML = "Nombre de la region a modificar:";
    inputForm1.placeholder = nombreRegion;
  }

  inputForm1.setAttribute("type", "text");
  inputForm1.setAttribute("id", "zregion");

  var botonAccion = document.createElement("h2");
  formulario.appendChild(botonAccion);
  botonAccion.setAttribute("id", "botonaccion");
  botonAccion.style.cursor = "pointer";
}

function getPaises(idReg) {
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const urlPaises = "http://localhost:5500/countries";
  fetch(urlPaises, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);
      for (x = 0; x < json.length; x++) {
        if (json[x].region_id == idReg) {
          let contePai = document.createElement("div");
          let paises = document.createElement("h3");
          document.getElementById("region" + idReg).appendChild(contePai);
          contePai.setAttribute("id", "pais" + json[x].country_id);
          contePai.setAttribute("class","pais");
          paises.innerHTML = json[x].name;
          
          let conP=document.createElement("div");
          let editar = document.createElement("h4");
          let eliminar = document.createElement("h4");
          let agregarCiudad = document.createElement("h1");
          contePai.appendChild(conP);
          conP.appendChild(paises);
          conP.appendChild(editar);
          conP.appendChild(eliminar);
          conP.appendChild(agregarCiudad);
          editar.setAttribute("id", "editar-pais" + json[x].country_id);
          eliminar.setAttribute("id", "eliminar-pais" + json[x].country_id);
          editar.innerHTML = "Editar";
          editar.setAttribute("class", "editar");
          editar.style.cursor = "pointer";

          let country_id = json[x].country_id;
          let nombrePais = json[x].name;
          let countryRegion = json[x].region_id;
          editar.addEventListener("click", function () {
            editarPais(country_id, nombrePais, countryRegion);
          });
          eliminar.innerHTML = "Eliminar";
          eliminar.setAttribute("class", "eliminar");
          eliminar.style.cursor = "pointer";
          eliminar.addEventListener("click", function () {
            eliminarPais(country_id, countryRegion);
          });
          agregarCiudad.innerHTML = "Agregar Ciudad";
          agregarCiudad.style.cursor = "pointer";
          agregarCiudad.setAttribute("id", "agregarCiudad" + country_id);
          agregarCiudad.setAttribute("class","agregarciudad");
          agregarCiudad.addEventListener("click", function () {
            newCity(country_id, idReg);
          });

          let idPai = json[x].country_id;
          getCiudades(idPai);
        }
      }
    })
    .catch((error) => console.error("Error:", error));
}

function newCountry(region_id) {
  formularioPaises();
  let botonAccion = document.getElementById("botonaccion");
  botonAccion.innerHTML = "Crear";
  botonAccion.addEventListener("click", function () {
    postCountry(region_id);
  });
}

function postCountry(region_id) {
  let zpais = document.getElementById("zpais");
  let newPais = {
    name: zpais.value,
    region_id: region_id,
  };

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(newPais),
  };

  const urlPais = "http://localhost:5500/countries";
  fetch(urlPais, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);
      if (json == "País creado exitosamente") {
        alert("País creado exitosamente");
        displayLocations();
      } else {
        alert("Error al generar la ciudad, la misma ya existe o faltan campos por completar");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function editarPais(country_id, nombrePais, countryRegion) {
  formularioPaises(nombrePais);
  let botonAccion = document.getElementById("botonaccion");
  botonAccion.innerHTML = "Modificar";
  botonAccion.addEventListener("click", function () {
    putCountry(country_id, countryRegion);
  });
}

function putCountry(country_id, countryRegion) {
  let editPais = {
    name: zpais.value,
    region_id: countryRegion,
  };
  // console.log(editPais);

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(editPais),
  };

  const urlPaises = `http://localhost:5500/countries/${country_id}`;
  fetch(urlPaises, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);
      if (json == "País modificado exitosamente") {
        alert("País modificado exitosamente");
        displayLocations();
      } else {
        alert("Error al modificar el pais");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function eliminarPais(country_id) {
  let confirmacion = confirm("Realmente desea eliminar el pais?");
  if (confirmacion == true) {
    deleteCountry(country_id);
    displayLocations();
  }
}

function deleteCountry(country_id) {
  let requestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  const urlPais = `http://localhost:5500/countries/${country_id}`;
  fetch(urlPais, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);
      if (json == "País eliminado exitosamente") {
        alert("País eliminado exitosamente");
        displayLocations();
      } else {
        alert("Error al eliminar el pais");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function formularioPaises(nombrePais) {
  cleanPag();

  let cargarLocations=document.createElement("h2");
  document.getElementById("zonas").appendChild(cargarLocations);
  cargarLocations.innerHTML="PAISES"

  let formulario = document.createElement("form");
  let ulForm = document.createElement("ul");
  let li1 = document.createElement("li");
  let lblForm1 = document.createElement("label");
  let inputForm1 = document.createElement("input");

  document.getElementById("zonas").appendChild(formulario);
  formulario.appendChild(ulForm);
  ulForm.appendChild(li1);
  li1.appendChild(lblForm1);
  li1.appendChild(inputForm1);

  lblForm1.setAttribute("for", "zpais");
  lblForm1.innerHTML = "Nuevo pais*";
  if (nombrePais !== undefined) {
    lblForm1.innerHTML = "Nombre del pais a modificar:";
    inputForm1.placeholder = nombrePais;
  }

  inputForm1.setAttribute("type", "text");
  inputForm1.setAttribute("id", "zpais");

  var botonAccion = document.createElement("h2");
  formulario.appendChild(botonAccion);
  botonAccion.setAttribute("id", "botonaccion");
  botonAccion.style.cursor = "pointer";
}

function getCiudades(idPai) {
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const urlCiudades = "http://localhost:5500/cities";
  fetch(urlCiudades, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);
      for (z = 0; z < json.length; z++) {
        if (json[z].country_id == idPai) {
          let conteCiu = document.createElement("div");
          let ciudades = document.createElement("h3");
          document.getElementById("pais" + idPai).appendChild(conteCiu);
          conteCiu.setAttribute("id", "ciudad" + json[z].city_id);
          conteCiu.setAttribute("class","ciudad");
          ciudades.innerHTML = json[z].name;
          
          let conC=document.createElement("div");
          let editar = document.createElement("h4");
          let eliminar = document.createElement("h4");
          conteCiu.appendChild(conC)
          conC.appendChild(ciudades);
          conC.appendChild(editar);
          conC.appendChild(eliminar);
          editar.setAttribute("id", "editar-ciudad" + json[z].city_id);
          editar.innerHTML = "Editar";
          editar.setAttribute("class", "editar");
          editar.style.cursor = "pointer";

          let city_id = json[z].city_id;
          let nombreCiudad = json[z].name;
          let cityCountry = json[z].country_id;
          editar.addEventListener("click", function () {
            editarCiudad(city_id, nombreCiudad, cityCountry);
          });
          eliminar.innerHTML = "Eliminar";
          eliminar.setAttribute("class", "eliminar");
          eliminar.style.cursor = "pointer";
          eliminar.addEventListener("click", function () {
            eliminarCiudad(city_id, cityCountry);
          });
        }
      }
    })
    .catch((error) => console.error("Error:", error));
}

function newCity(country_id) {
  formularioCiudades();
  let botonAccion = document.getElementById("botonaccion");
  botonAccion.innerHTML = "Crear";
  botonAccion.addEventListener("click", function () {
    postCity(country_id);
  });
}

function postCity(country_id) {
  let zciudad = document.getElementById("zciudad");
  let newCity = {
    name: zciudad.value,
    country_id: country_id,
  };

  console.log(newCity);

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(newCity),
  };

  const urlCiudad = "http://localhost:5500/cities";
  fetch(urlCiudad, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (json.msj == "Ciudad creada exitosamente") {
        alert("Ciudad creada exitosamente");
        displayLocations();
      } else {
        alert("Error al generar la ciudad, la mismo ya existe o faltan campos por completar");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function editarCiudad(city_id, nombreCiudad, cityCountry) {
  formularioCiudades(nombreCiudad);
  let botonAccion = document.getElementById("botonaccion");
  botonAccion.innerHTML = "Modificar";
  botonAccion.addEventListener("click", function () {
    putCity(city_id, cityCountry);
  });
}

function putCity(city_id, cityCountry) {
  let editCiudad = {
    name: zciudad.value,
    country_id: cityCountry,
  };

  // console.log(editCiudad);

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(editCiudad),
  };

  const urlCiudades = `http://localhost:5500/cities/${city_id}`;
  fetch(urlCiudades, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);
      if (json == "Ciudad modificada exitosamente") {
        alert("Ciudad modificada exitosamente");
        displayLocations();
      } else {
        alert("Error al modificar la ciudad, faltan campos por completar");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function eliminarCiudad(city_id) {
  let confirmacion = confirm("Realmente desea eliminar la ciudad?");
  if (confirmacion == true) {
    deleteCity(city_id);
    displayLocations();
  }
}

function deleteCity(city_id) {
  let requestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  const urlCiudades = `http://localhost:5500/cities/${city_id}`;
  fetch(urlCiudades, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (json == "Ciudad desactivada exitosamente") {
        alert("Ciudad eliminada exitosamente");
        displayLocations();
      } else {
        alert(
          "Error al eliminar la ciudad"
        );
      }
    })
    .catch((error) => console.error("Error:", error));
}

function formularioCiudades(nombreCiudad) {
  cleanPag();

  let cargarLocations=document.createElement("h2");
  document.getElementById("zonas").appendChild(cargarLocations);
  cargarLocations.innerHTML="CIUDADES"

  let formulario = document.createElement("form");
  let ulForm = document.createElement("ul");
  let li1 = document.createElement("li");
  let lblForm1 = document.createElement("label");
  let inputForm1 = document.createElement("input");

  document.getElementById("zonas").appendChild(formulario);
  formulario.appendChild(ulForm);
  ulForm.appendChild(li1);
  li1.appendChild(lblForm1);
  li1.appendChild(inputForm1);

  lblForm1.setAttribute("for", "zciudad");
  lblForm1.innerHTML = "Nueva ciudad*";
  if (nombreCiudad !== undefined) {
    lblForm1.innerHTML = "Nombre de la ciudad a modificar:";
    inputForm1.placeholder = nombreCiudad;
  }

  inputForm1.setAttribute("type", "text");
  inputForm1.setAttribute("id", "zciudad");

  var botonAccion = document.createElement("h2");
  formulario.appendChild(botonAccion);
  botonAccion.setAttribute("id", "botonaccion");
  botonAccion.style.cursor = "pointer";
}
