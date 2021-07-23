document.getElementById("login-button").addEventListener("click", login);

function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  console.log(email);
  console.log(pass);
  const data = { email: email, pass: pass };
  loginstring = JSON.stringify( data );
  console.log(loginstring);

  const url = "http://localhost:5500/users/login";

  fetch(url, {
    method: "POST",
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    body: loginstring
  })
    .then(res => res.json())
    .then(json => {
      //console.log(json);
      if (json == "El usuario o contraseña ingresada no es válida") {
        alert("Los datos ingresados no son válidos, por favor verifique su email y contraseña");
      } else {
        //console.log(json);
        localStorage.setItem("tokenLogin", JSON.stringify(json.token));
        localStorage.setItem("admin", JSON.stringify(json.admin));
        window.location.href = "main.html";
      }
    })
    .catch((error) => console.error("Req failed: Error:", error));
}