
document.getElementById("nav-contactos").addEventListener("click", displayContacts);

function displayContacts() {
  cleanPag();
  bringRegion();
  bringCountry();
  bringCity();
  bringCompanies();
  bringContacts();
}

function bringContacts() {
  const urlContactos = "http://localhost:5500/contacts";
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  fetch(urlContactos, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      arrayContactos = [];
      for (x = 0; x < json.length; x++) {
        let contLimpio = {
          contact_id: json[x].contact_id,
          first_name: json[x].first_name,
          last_name: json[x].last_name,
          charge: json[x].charge,
          email: json[x].email,
          company_name: json[x].company_name,
          city_name: json[x].city_name,
          country_name: json[x].country_name,
          region_name: json[x].region_name,
          adress: json[x].adress,
          interest: json[x].interest,
          whatsapp_user: json[x].whatsapp_user,
          whatsapp_preferences: json[x].whatsapp_preferences,
          instagram_user: json[x].instagram_user,
          instagram_preferences: json[x].instagram_preferences,
          linkedin_user: json[x].linkedin_user,
          linkedin_preferences: json[x].linkedin_preferences,
        };
        arrayContactos.push(contLimpio);
      }
      console.log(arrayContactos);
      cabeceraContactos(arrayContactos);
      cabeceraTablaContactos(arrayContactos);
      contactsData(json);
    })
    .catch((error) => console.error("Error:", error));
}

function bringCompanies() {
  const compURL = "http://localhost:5500/companies";
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  fetch(compURL, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);
      arrayCompanies = [];
      for (x = 0; x < json.length; x++) {
        let contLimpio = {
          company_id: json[x].company_id,
          name: json[x].name,
        };
        arrayCompanies.push(contLimpio);
      }
      console.log(arrayCompanies);
    })
    .catch((error) => console.error("Error:", error));
}

function bringCity() {
  const citiesURL = "http://localhost:5500/cities";
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  fetch(citiesURL, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      // console.table(json);
      arrayCities = [];
      for (x = 0; x < json.length; x++) {
        let contLimpio = {
          city_id: json[x].city_id,
          city_name: json[x].name,
          country_id: json[x].country_id,
        };
        arrayCities.push(contLimpio);
      }
      //console.log(arrayCities);
    })
    .catch((error) => console.error("Error:", error));
}

function bringCountry() {
  const countriesURL = "http://localhost:5500/countries";
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  fetch(countriesURL, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      // console.table(json);
      arrayPaises = [];
      for (x = 0; x < json.length; x++) {
        let contLimpio = {
          country_id: json[x].country_id,
          country_name: json[x].name,
          region_id: json[x].region_id,
        };
        arrayPaises.push(contLimpio);
      }
      // console.log(arrayPaises);
    })
    .catch((error) => console.error("Error:", error));
}

function bringRegion() {
  const regionsURL = "http://localhost:5500/regions";
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  fetch(regionsURL, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      // console.table(json);
      arrayRegiones = [];
      for (x = 0; x < json.length; x++) {
        let contLimpio = {
          region_id: json[x].region_id,
          region_name: json[x].name,
        };
        arrayRegiones.push(contLimpio);
      }
      // console.log(arrayRegiones);
    })
    .catch((error) => console.error("Error:", error));
}

function contactsData(json) {
  for (i = 0; i < json.length; i++) {
    let contactos = document.createElement("tr");
    document.getElementById("tcontenido").appendChild(contactos);
    contactos.setAttribute("id", "contacto" + json[i].contact_id);

    let square = document.createElement("th");
    let check = document.createElement("i");
    let spanCheck = document.createElement("span");
    let contacto = document.createElement("th");
    let localización = document.createElement("th");
    let direccion = document.createElement("th");
    let compania = document.createElement("th");
    let cargo = document.createElement("th");
    let interes = document.createElement("th");
    let accion = document.createElement("th");
    contactos.appendChild(square);
    square.appendChild(spanCheck);
    spanCheck.appendChild(check);
    contactos.appendChild(contacto);
    contactos.appendChild(localización);
    contactos.appendChild(direccion);
    contactos.appendChild(compania);
    contactos.appendChild(cargo);
    contactos.appendChild(interes);
    contactos.appendChild(accion);
    check.setAttribute("class", "far fa-square");
    check.setAttribute("id", "check" + json[i].contact_id);
    contacto.innerHTML = json[i].first_name + " " + json[i].last_name;
    localización.innerHTML = json[i].city_name;
    direccion.innerHTML = json[i].adress;
    compania.innerHTML = json[i].company_name;
    cargo.innerHTML = json[i].charge;
    interes.innerHTML = json[i].interest+"%";

    let contact_id = json[i].contact_id;
    arrayEliminar = [];
    square.addEventListener("click", function () {
      if (arrayEliminar.some((elem) => elem == contact_id)) {
        for (i = 0; i < arrayEliminar.length; i++) {
          if (arrayEliminar[i] === contact_id) {
            arrayEliminar.splice(i, 1);
          }
        }
        document.getElementById("check" + contact_id).removeAttribute("class", "far fa-check-square");
        document.getElementById("check" + contact_id).setAttribute("class", "far fa-square");
        contactos.removeAttribute("class","contactive");
      } else {
        arrayEliminar.push(contact_id);
        document.getElementById("check" + contact_id).removeAttribute("class", "far fa-square");
        document.getElementById("check" + contact_id).setAttribute("class", "far fa-check-square");
        contactos.setAttribute("class","contactive");
      }
      seleccionEliminar();
    });

    let editar = document.createElement("h3");
    let eliminar = document.createElement("h3");
    accion.appendChild(editar);
    accion.appendChild(eliminar);
    editar.innerHTML = "Editar";
    editar.setAttribute("class","editar");
    editar.style.cursor="pointer";
    eliminar.innerHTML = "Eliminar";
    eliminar.setAttribute("class","eliminar");
    eliminar.style.cursor="pointer";

    // console.log(json[i]);
    let data = json[i];
    // console.log(data);
    editar.addEventListener("click", function () {
      modificarContacto(data, contact_id);
    });
    eliminar.addEventListener("click", function () {
      eliminarContacto(contact_id);
    });
  }
}

function cabeceraContactos(arrayContactos) {
  let cabeContactos = document.createElement("h2");
  let cabecera = document.createElement("div");
  let cabIzquierda = document.createElement("div");
  let search = document.createElement("input");
  let conteLupa = document.createElement("span");
  let lupa = document.createElement("i");
  let cabDerecha = document.createElement("div");
  let agregarContacto = document.createElement("h1");
  document.getElementById("contactos").appendChild(cabeContactos);
  document.getElementById("contactos").appendChild(cabecera);
  cabecera.appendChild(cabIzquierda);
  cabIzquierda.appendChild(search);
  cabIzquierda.appendChild(conteLupa);
  conteLupa.appendChild(lupa);
  cabecera.appendChild(cabDerecha);
  cabDerecha.appendChild(agregarContacto);
  cabeContactos.innerHTML = "CONTACTOS";
  agregarContacto.innerHTML = "Agregar contacto";
  agregarContacto.style.cursor="pointer";
  search.setAttribute("type", "text");
  search.setAttribute("id", "inputsearch");
  cabecera.setAttribute("id", "cabecera");
  lupa.setAttribute("class", "fas fa-search");
  conteLupa.addEventListener("click", function () {
    busqueda(arrayContactos);
  });
  agregarContacto.addEventListener("click", newContact);
  let conteDelete = document.createElement("div");
  cabecera.appendChild(conteDelete);
  conteDelete.setAttribute("id", "arrayDelete");
}

function cabeceraTablaContactos(arrayContactos) {
  let tContactos = document.createElement("div");
  document.getElementById("contactos").appendChild(tContactos);
  let table = document.createElement("table");
  tContactos.appendChild(table);
  table.setAttribute("class", "default");
  let thead = document.createElement("thead");
  table.appendChild(thead);
  let trTitulos = document.createElement("tr");
  thead.appendChild(trTitulos);

  let thCheck = document.createElement("th");
  trTitulos.appendChild(thCheck);

  let thContacto = document.createElement("th");
  let spanThContacto = document.createElement("span");
  let iThContacto = document.createElement("i");
  thContacto.innerHTML = "Contacto";
  iThContacto.setAttribute("class", "fas fa-sort");
  trTitulos.appendChild(thContacto);
  thContacto.appendChild(spanThContacto);
  spanThContacto.appendChild(iThContacto);
  spanThContacto.addEventListener("click", function () {
    ordenContacto(arrayContactos);
  });

  let thZona = document.createElement("th");
  let spanThZona = document.createElement("span");
  let iThZona = document.createElement("i");
  thZona.innerHTML = "Localización";
  iThZona.setAttribute("class", "fas fa-sort");
  trTitulos.appendChild(thZona);
  thZona.appendChild(spanThZona);
  spanThZona.appendChild(iThZona);
  spanThZona.addEventListener("click", function () {
    ordenZona(arrayContactos);
  });

  let thDir = document.createElement("th");
  let spanthDir = document.createElement("span");
  let ithDir = document.createElement("i");
  thDir.innerHTML = "Dirección";
  ithDir.setAttribute("class", "fas fa-sort");
  trTitulos.appendChild(thDir);
  thDir.appendChild(spanthDir);
  spanthDir.appendChild(ithDir);
  spanthDir.addEventListener("click", function () {
    ordenDir(arrayContactos);
  });

  let thCompania = document.createElement("th");
  let spanThCompania = document.createElement("span");
  let iThCompania = document.createElement("i");
  thCompania.innerHTML = "Compañia";
  iThCompania.setAttribute("class", "fas fa-sort");
  trTitulos.appendChild(thCompania);
  thCompania.appendChild(spanThCompania);
  spanThCompania.appendChild(iThCompania);
  spanThCompania.addEventListener("click", function () {
    ordenCompania(arrayContactos);
  });

  let thCargo = document.createElement("th");
  let spanThCargo = document.createElement("span");
  let iThCargo = document.createElement("i");
  thCargo.innerHTML = "Cargo";
  iThCargo.setAttribute("class", "fas fa-sort");
  trTitulos.appendChild(thCargo);
  thCargo.appendChild(spanThCargo);
  spanThCargo.appendChild(iThCargo);
  spanThCargo.addEventListener("click", function () {
    ordenCargo(arrayContactos);
  });

  let thInteres = document.createElement("th");
  let spanThInteres = document.createElement("span");
  let iThInteres = document.createElement("i");
  thInteres.innerHTML = "Interés";
  iThInteres.setAttribute("class", "fas fa-sort");
  trTitulos.appendChild(thInteres);
  thInteres.appendChild(spanThInteres);
  spanThInteres.appendChild(iThInteres);
  spanThInteres.addEventListener("click", function () {
    ordenInteres(arrayContactos);
  });

  let thAccion = document.createElement("th");
  thAccion.innerHTML = "Acciones";
  trTitulos.appendChild(thAccion);

  let tbody = document.createElement("tbody");
  table.appendChild(tbody);
  tbody.setAttribute("id", "tcontenido");
}

function busqueda(arrayContactos) {
  // console.log(arrayContactos);
  let palabra = document.getElementById("inputsearch").value;
  let encontrado = arrayContactos.filter(
    (a) =>
      a.first_name.toLowerCase().includes(palabra.toLowerCase()) == true ||
      a.last_name.toLowerCase().includes(palabra.toLowerCase()) == true ||
      a.charge.toLowerCase().includes(palabra.toLowerCase()) == true ||
      a.email.toLowerCase().includes(palabra.toLowerCase()) == true ||
      a.company_name.toLowerCase().includes(palabra.toLowerCase()) == true ||
      a.city_name.toLowerCase().includes(palabra.toLowerCase()) == true ||
      a.interest == palabra
  );
  let borraTabla = document.getElementById("tcontenido");
  while (borraTabla.firstChild) {
    borraTabla.removeChild(borraTabla.firstChild);
  }
  contactsData(encontrado);
}

function newContact() {
  formularioContacto();
  let botonAccion = document.getElementById("botonaccion");
  botonAccion.innerHTML = "Crear";
  botonAccion.addEventListener("click", function () {
    postContact();
  });
}

function postContact() {
  let companyContact = document.getElementById("company_id").value;
  let ciudadContact = document.getElementById("cciudad").value;
  let interesContact = document.getElementById("cinteres").value;
  let preWha = document.getElementById("cwha").value;
  let preIns = document.getElementById("cins").value;
  let preLin = document.getElementById("clin").value;
  let newContact = {
    first_name: cfirst_name.value,
    last_name: clast_name.value,
    charge: ccharge.value,
    email: cemail.value,
    company_id: companyContact,
    city_id: ciudadContact,
    adress: cdireccion.value,
    interest: interesContact,
    whatsapp_user: cwhatsapp.value,
    whatsapp_preferences: preWha,
    instagram_user: cinstagram.value,
    instagram_preferences: preIns,
    linkedin_user: clinkedin.value,
    linkedin_preferences: preLin,
  };

  console.log(newContact);

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(newContact),
  };

  const urlContactos = "http://localhost:5500/contacts";
  fetch(urlContactos, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (json == "Contacto creado exitosamente") {
        alert("Contacto creado exitosamente");
        displayContacts();
      } else {
        alert("Error al generar el contacto, el mismo ya existe o faltan campos por completar");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function formularioContacto(data) {
  cleanPag();
  console.log(data);
  let cabeContactos = document.createElement("h2");
  document.getElementById("contactos").appendChild(cabeContactos);
  cabeContactos.innerHTML = "CONTACTOS";

  let formulario = document.createElement("form");
  let ulPrincipal = document.createElement("ul");
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

  document.getElementById("contactos").appendChild(formulario);
  formulario.appendChild(ulPrincipal);
  ulPrincipal.appendChild(li1);
  ulPrincipal.appendChild(li2);
  ulPrincipal.appendChild(li3);
  ulPrincipal.appendChild(li4);
  ulPrincipal.appendChild(li5);
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

  ulPrincipal.setAttribute("id", "cont-up");
  lblForm1.setAttribute("for", "cfirst_name");
  lblForm1.innerHTML = "Nombre*";
  lblForm2.setAttribute("for", "clast_name");
  lblForm2.innerHTML = "Apellido*";
  lblForm3.setAttribute("for", "ccharge");
  lblForm3.innerHTML = "Cargo*";
  lblForm4.setAttribute("for", "cemail");
  lblForm4.innerHTML = "Correo electronico*";
  lblForm5.setAttribute("for", "company_id");
  lblForm5.innerHTML = "Compañia*";

  inputForm1.setAttribute("type", "text");
  inputForm1.setAttribute("id", "cfirst_name");
  inputForm2.setAttribute("type", "text");
  inputForm2.setAttribute("id", "clast_name");
  inputForm3.setAttribute("type", "text");
  inputForm3.setAttribute("id", "ccharge");
  inputForm4.setAttribute("type", "email");
  inputForm4.setAttribute("id", "cemail");
  selectForm5.setAttribute("id", "company_id");

  let opcion0 = document.createElement("option");
  opcion0.innerHTML = "Seleccione una compañia...";
  selectForm5.appendChild(opcion0);
  for (i = 0; i < arrayCompanies.length; i++) {
    let opcion = document.createElement("option");
    opcion.innerHTML = arrayCompanies[i].name;
    selectForm5.appendChild(opcion);
    opcion.setAttribute("value", arrayCompanies[i].company_id);
  }

  let select = document.getElementById("company_id");
  select.addEventListener("change", function () {
    var optionCompany = this.options[select.selectedIndex].value;
    console.log(optionCompany);
    selectForm5.setAttribute("value", optionCompany);
  });

  let ulSecundario = document.createElement("ul");
  let li01 = document.createElement("li");
  let li02 = document.createElement("li");
  let li03 = document.createElement("li");
  let li04 = document.createElement("li");
  let li05 = document.createElement("li");
  let li07 = document.createElement("li");
  let li08 = document.createElement("li");
  let li010 = document.createElement("li");
  li01.setAttribute("class","reg");
  li02.setAttribute("class","pai");
  li03.setAttribute("class","ciu");
  li04.setAttribute("class","dir");
  li05.setAttribute("class","int");
  li07.setAttribute("class","wha");
  li08.setAttribute("class","ins");
  li010.setAttribute("class","lin");

  let lblForm01 = document.createElement("label");
  let lblForm02 = document.createElement("label");
  let lblForm03 = document.createElement("label");
  let lblForm04 = document.createElement("label");
  let lblForm05 = document.createElement("label");
  let lblForm06 = document.createElement("label");
  let lblForm07 = document.createElement("label");
  let lblForm08 = document.createElement("label");
  let selectForm01 = document.createElement("select");
  let selectForm02 = document.createElement("select");
  let selectForm03 = document.createElement("select");
  let inputForm04 = document.createElement("input");
  let selectForm05 = document.createElement("select");
  let inputForm06 = document.createElement("input");
  let lblCanal07 = document.createElement("label");
  let inputForm07 = document.createElement("input");
  let selectForm07 = document.createElement("select");
  let lblCanal08 = document.createElement("label");
  let inputForm08 = document.createElement("input");
  let selectForm08 = document.createElement("select");
  let lblCanal010 = document.createElement("label");
  let inputForm010 = document.createElement("input");
  let selectForm010 = document.createElement("select");

  formulario.appendChild(ulSecundario);
  ulSecundario.appendChild(li01);
  ulSecundario.appendChild(li02);
  ulSecundario.appendChild(li03);
  ulSecundario.appendChild(li04);
  ulSecundario.appendChild(li05);
  ulSecundario.appendChild(li07);
  ulSecundario.appendChild(li08);
  ulSecundario.appendChild(li010);
  li01.appendChild(lblForm01);
  li02.appendChild(lblForm02);
  li03.appendChild(lblForm03);
  li04.appendChild(lblForm04);
  li05.appendChild(lblForm05);
  li01.appendChild(selectForm01);
  li02.appendChild(selectForm02);
  li03.appendChild(selectForm03);
  li04.appendChild(inputForm04);
  li05.appendChild(selectForm05);
  li07.appendChild(lblCanal07);
  li07.appendChild(inputForm07);
  li07.appendChild(selectForm07);
  li08.appendChild(lblCanal08);
  li08.appendChild(inputForm08);
  li08.appendChild(selectForm08);
  li010.appendChild(lblCanal010);
  li010.appendChild(inputForm010);
  li010.appendChild(selectForm010);

  ulSecundario.setAttribute("id", "cont-down");
  lblForm01.setAttribute("for", "cregion");
  lblForm01.innerHTML = "Region*";
  lblForm02.setAttribute("for", "cpais");
  lblForm02.innerHTML = "Pais*";
  lblForm03.setAttribute("for", "cciudad");
  lblForm03.innerHTML = "Ciudad*";
  lblForm04.setAttribute("for", "cdireccion");
  lblForm04.innerHTML = "Direccion:";
  lblForm05.setAttribute("for", "cinteres");
  lblForm05.innerHTML = "Interes:";
  lblCanal07.setAttribute("for", "cwhatsapp");
  lblCanal07.innerHTML = "Whatsapp";
  lblCanal08.setAttribute("for", "cinstagram");
  lblCanal08.innerHTML = "Instagram";
  lblCanal010.setAttribute("for", "clinkedin");
  lblCanal010.innerHTML = "Linkedin";

  selectForm01.setAttribute("id", "cregion");
  selectForm02.setAttribute("id", "cpais");
  selectForm03.setAttribute("id", "cciudad");
  inputForm04.setAttribute("type", "text");
  inputForm04.setAttribute("id", "cdireccion");
  selectForm05.setAttribute("id", "cinteres");
  inputForm06.setAttribute("type", "text");
  inputForm07.setAttribute("id", "cwhatsapp");
  inputForm08.setAttribute("type", "text");
  inputForm08.setAttribute("id", "cinstagram");
  inputForm010.setAttribute("type", "text");
  inputForm010.setAttribute("id", "clinkedin");
  selectForm07.setAttribute("id", "cwha");
  selectForm08.setAttribute("id", "cins");
  selectForm010.setAttribute("id", "clin");

  let opcionReg = document.createElement("option");
  opcionReg.innerHTML = "Seleccione una Region...";
  selectForm01.appendChild(opcionReg);
  for (i = 0; i < arrayRegiones.length; i++) {
    let opcionR = document.createElement("option");
    opcionR.innerHTML = arrayRegiones[i].region_name;
    selectForm01.appendChild(opcionR);
    opcionR.setAttribute("value", arrayRegiones[i].region_id);
  }

  let selectReg = document.getElementById("cregion");
  let selectPai = document.getElementById("cpais");
  let selectCiu = document.getElementById("cciudad");
  selectReg.addEventListener("change", function () {
    var optionRegion = this.options[selectReg.selectedIndex].value;
    console.log(optionRegion);
    selectForm01.setAttribute("value", optionRegion);

    let borraPais = document.getElementById("cpais");
    while (borraPais.firstChild) {
      borraPais.removeChild(borraPais.firstChild);
    }

    let opcionPai = document.createElement("option");
    opcionPai.innerHTML = "Seleccione un Pais...";
    selectForm02.appendChild(opcionPai);
    for (i = 0; i < arrayPaises.length; i++) {
      if (arrayPaises[i].region_id == optionRegion) {
        let opcionP = document.createElement("option");
        opcionP.innerHTML = arrayPaises[i].country_name;
        selectForm02.appendChild(opcionP);
        opcionP.setAttribute("value", arrayPaises[i].country_id);
      }
    }
    selectPai.addEventListener("change", function () {
      var optionPais = this.options[selectPai.selectedIndex].value;
      console.log(optionPais);
      selectForm02.setAttribute("value", optionPais);

      let borraCiudad = document.getElementById("cciudad");
      while (borraCiudad.firstChild) {
        borraCiudad.removeChild(borraCiudad.firstChild);
      }

      let opcionCiu = document.createElement("option");
      opcionCiu.innerHTML = "Seleccione una Ciudad...";
      selectForm03.appendChild(opcionCiu);
      for (i = 0; i < arrayCities.length; i++) {
        if (arrayCities[i].country_id == optionPais) {
          let opcionC = document.createElement("option");
          opcionC.innerHTML = arrayCities[i].city_name;
          selectForm03.appendChild(opcionC);
          opcionC.setAttribute("value", arrayCities[i].city_id);
        }
      }
      selectCiu.addEventListener("change", function () {
        var optionCiudad = this.options[selectCiu.selectedIndex].value;
        console.log(optionCiudad);
        selectForm03.setAttribute("value", optionCiudad);
      });
    });
  });

  let opcion00 = document.createElement("option");
  opcion00.innerHTML = "0%";
  selectForm05.appendChild(opcion00);
  opcion00.setAttribute("value", 0);
  let opcion25 = document.createElement("option");
  opcion25.innerHTML = "25%";
  selectForm05.appendChild(opcion25);
  opcion25.setAttribute("value", 25);
  let opcion50 = document.createElement("option");
  opcion50.innerHTML = "50%";
  selectForm05.appendChild(opcion50);
  opcion50.setAttribute("value", 50);
  let opcion75 = document.createElement("option");
  opcion75.innerHTML = "75%";
  selectForm05.appendChild(opcion75);
  opcion75.setAttribute("value", 75);
  let opcion100 = document.createElement("option");
  opcion100.innerHTML = "100%";
  selectForm05.appendChild(opcion100);
  opcion100.setAttribute("value", 100);

  let selectInt = document.getElementById("cinteres");
  selectInt.addEventListener("change", function () {
    var optionInt = this.options[selectInt.selectedIndex].value;
    console.log(optionInt);
    selectForm05.setAttribute("value", optionInt);
  });

  let opcionWha1 = document.createElement("option");
  opcionWha1.innerHTML = "Sin preferencia";
  selectForm07.appendChild(opcionWha1);
  opcionWha1.setAttribute("value", 1);
  let opcionWha2 = document.createElement("option");
  opcionWha2.innerHTML = "Canal Favorito";
  selectForm07.appendChild(opcionWha2);
  opcionWha2.setAttribute("value", 2);
  let opcionWha3 = document.createElement("option");
  opcionWha3.innerHTML = "No molestar";
  selectForm07.appendChild(opcionWha3);
  opcionWha3.setAttribute("value", 3);

  let selectWha = document.getElementById("cwha");
  selectWha.addEventListener("change", function () {
    var optionWha = this.options[selectWha.selectedIndex].value;
    console.log(optionWha);
    selectForm07.setAttribute("value", optionWha);
  });

  let opcionIns1 = document.createElement("option");
  opcionIns1.innerHTML = "Sin preferencia";
  selectForm08.appendChild(opcionIns1);
  opcionIns1.setAttribute("value", 1);
  let opcionIns2 = document.createElement("option");
  opcionIns2.innerHTML = "Canal Favorito";
  selectForm08.appendChild(opcionIns2);
  opcionIns2.setAttribute("value", 2);
  let opcionIns3 = document.createElement("option");
  opcionIns3.innerHTML = "No molestar";
  selectForm08.appendChild(opcionIns3);
  opcionIns3.setAttribute("value", 3);

  let selectIns = document.getElementById("cins");
  selectIns.addEventListener("change", function () {
    var optionIns = this.options[selectIns.selectedIndex].value;
    console.log(optionIns);
    selectForm08.setAttribute("value", optionIns);
  });

  let opcionLin1 = document.createElement("option");
  opcionLin1.innerHTML = "Sin preferencia";
  selectForm010.appendChild(opcionLin1);
  opcionLin1.setAttribute("value", 1);
  let opcionLin2 = document.createElement("option");
  opcionLin2.innerHTML = "Canal Favorito";
  selectForm010.appendChild(opcionLin2);
  opcionLin2.setAttribute("value", 2);
  let opcionLin3 = document.createElement("option");
  opcionLin3.innerHTML = "No molestar";
  selectForm010.appendChild(opcionLin3);
  opcionLin3.setAttribute("value", 3);

  let selectLin = document.getElementById("clin");
  selectLin.addEventListener("change", function () {
    var optionLin = this.options[selectLin.selectedIndex].value;
    console.log(optionLin);
    selectForm010.setAttribute("value", optionLin);
  });

  if (data) {
    let aviso = document.createElement("h5");
    cabeContactos.appendChild(aviso);
    aviso.innerHTML =
      "Editar únicamente los campos a modificar. El resto de la información previa se mantendrá intacta.";
    inputForm1.setAttribute("value", data.first_name);
    inputForm2.setAttribute("value", data.last_name);
    inputForm3.setAttribute("value", data.charge);
    inputForm4.setAttribute("value", data.email);
    selectForm5.setAttribute("value", data.company_id);
    selectForm01.setAttribute("value", data.region_id);
    selectForm02.setAttribute("value", data.country_id);
    selectForm03.setAttribute("value", data.city_id);
    inputForm04.setAttribute("value", data.adress);
    selectForm05.setAttribute("value", data.interest);
    inputForm07.setAttribute("value", data.whatsapp_user);
    selectForm07.setAttribute("value", data.whatsapp_preferences);
    inputForm08.setAttribute("value", data.instagram_user);
    selectForm08.setAttribute("value", data.instagram_preferences);
    inputForm010.setAttribute("value", data.linkedin_user);
    selectForm010.setAttribute("value", data.linkedin_preferences);
  }

  var botonAccion = document.createElement("h2");
  formulario.appendChild(botonAccion);
  botonAccion.setAttribute("id", "botonaccion");
  botonAccion.style.cursor="pointer";
}

function borrarDatos() {
  let borraDatos = document.getElementById("tcontenido");
  while (borraDatos.firstChild) {
    borraDatos.removeChild(borraDatos.firstChild);
  }
}

let orden;
function ordenContacto(arrayContactos) {
  if (orden == undefined || orden == true) {
    arrayContactos.sort((a, b) => (a.first_name > b.first_name ? 1 : -1));
    orden = false;
  } else {
    arrayContactos.sort((a, b) => (a.first_name < b.first_name ? 1 : -1));
    orden = true;
  }
  borrarDatos();
  contactsData(arrayContactos);
}

function ordenZona(arrayContactos) {
  if (orden == undefined || orden == true) {
    arrayContactos.sort((a, b) => (a.country_name > b.country_name ? 1 : -1));
    orden = false;
  } else {
    arrayContactos.sort((a, b) => (a.country_name < b.country_name ? 1 : -1));
    orden = true;
  }
  borrarDatos();
  contactsData(arrayContactos);
}

function ordenDir(arrayContactos) {
  if (orden == undefined || orden == true) {
    arrayContactos.sort((a, b) => (a.adress > b.adress ? 1 : -1));
    orden = false;
  } else {
    arrayContactos.sort((a, b) => (a.adress < b.adress ? 1 : -1));
    orden = true;
  }
  borrarDatos();
  contactsData(arrayContactos);
}

function ordenCompania(arrayContactos) {
  if (orden == undefined || orden == true) {
    arrayContactos.sort((a, b) => (a.company_name > b.company_name ? 1 : -1));
    orden = false;
  } else {
    arrayContactos.sort((a, b) => (a.company_name < b.company_name ? 1 : -1));
    orden = true;
  }
  borrarDatos();
  contactsData(arrayContactos);
}

function ordenCargo(arrayContactos) {
  if (orden == undefined || orden == true) {
    arrayContactos.sort((a, b) => (a.charge > b.charge ? 1 : -1));
    orden = false;
  } else {
    arrayContactos.sort((a, b) => (a.charge < b.charge ? 1 : -1));
    orden = true;
  }
  borrarDatos();
  contactsData(arrayContactos);
}

function ordenInteres(arrayContactos) {
  if (orden == undefined || orden == true) {
    arrayContactos.sort((a, b) => (a.interest > b.interest ? 1 : -1));
    orden = false;
  } else {
    arrayContactos.sort((a, b) => (a.interest < b.interest ? 1 : -1));
    orden = true;
  }
  borrarDatos();
  contactsData(arrayContactos);
}

function modificarContacto(data, contact_id) {
  formularioContacto(data);
  let botonAccion = document.getElementById("botonaccion");
  botonAccion.innerHTML = "Modificar";
  botonAccion.addEventListener("click", function () {
    putContact(contact_id);
  });
}

function eliminarContacto(contact_id) {
  let confirmacion = confirm("Realmente desea eliminar el contacto?");
  if (confirmacion == true) {
    deleteContact(contact_id);
  }
}

function putContact(contact_id) {
  let ciudadContact = document.getElementById("cciudad").value;
  let interesContact = document.getElementById("cinteres").value;
  let preWha = document.getElementById("cwha").value;
  let preIns = document.getElementById("cins").value;
  let preLin = document.getElementById("clin").value;
  let editContact = {
    first_name: cfirst_name.value,
    last_name: clast_name.value,
    charge: ccharge.value,
    email: cemail.value,
    company_id: company_id.value,
    city_id: ciudadContact,
    adress: cdireccion.value,
    interest: interesContact,
    whatsapp_user: cwhatsapp.value,
    whatsapp_preferences: preWha,
    instagram_user: cinstagram.value,
    instagram_preferences: preIns,
    linkedin_user: clinkedin.value,
    linkedin_preferences: preLin,
  };

  console.log(editContact);

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(editContact),
  };

  const urlContactos = `http://localhost:5500/contacts/${contact_id}`;
  fetch(urlContactos, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (json == "Contact successfully updated") {
        alert("Contacto modificado exitosamente");
        displayContacts();
      } else {
        alert("Error al modificar el contacto");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function deleteContact(contact_id) {
  let requestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  const urlContactos = `http://localhost:5500/contacts/${contact_id}`;
  fetch(urlContactos, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (json == "Contacto eliminado exitosamente") {
        alert("Contacto eliminado exitosamente");
        displayContacts();
      } else alert("Error al eliminar el contacto");
    })
    .catch((error) => console.error("Error:", error));
}

function seleccionEliminar() {
  let cd = document.getElementById("arrayDelete");
  while (cd.firstChild) {
    cd.removeChild(cd.firstChild);
  }
  let selDelete = document.createElement("h5");
  cd.appendChild(selDelete);
  selDelete.innerHTML = "Seleccionados: " + arrayEliminar.length;

  let multiDelete = document.createElement("h5");
  cd.appendChild(multiDelete);
  multiDelete.innerHTML = "Eliminar contactos seleccionados";

  if (arrayEliminar.length === 0) {
    selDelete.style.visibility = "hidden";
    multiDelete.style.visibility = "hidden";
  } else {
    selDelete.style.visibility = "initial";
    multiDelete.style.visibility = "initial";
  }

  multiDelete.addEventListener("click", function () {
    let confirmacion = confirm("Realmente desea eliminar los contactos?");
    if (confirmacion == true) {
      for (i = 0; i < arrayEliminar.length; i++) {
        deleteContacts(arrayEliminar[i]);
      }
      alert("Contacto eliminado exitosamente");
      displayContacts();
    }
  });
}

function deleteContacts(contact_id) {
  let requestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  const urlContactos = `http://localhost:5500/contacts/${contact_id}`;
  fetch(urlContactos, requestOptions)
    .then((res) => res.json())
    .then((json) => {})
    .catch((error) => console.error("Error:", error));
}
