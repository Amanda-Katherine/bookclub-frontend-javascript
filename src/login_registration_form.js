function loadRegistrationLogin() {
  // create the elements
  var div = document.createElement("div"),
    log = document.createElement("div"),
    reg = document.createElement("div"),
    loginForm = document.createElement("form"),
    registerForm = document.createElement("form");

  // set body styles
  document.body.style.color = "#fff";
  document.body.style.textTransform = "capitalize";

  // set main-div styles
  div.style.background = "rgba(0,0,0,0.4)";
  div.style.width = "300px";
  div.style.margin = "50px auto";
  div.style.padding = "10px";
  div.style.borderRadius = "10px";

  log.style.width = "calc(50% - (5px * 2))";
  log.style.padding = "5px";
  log.style.textAlign = "center";
  log.style.display = "inline-block";
  log.style.color = "#fff";
  log.style.cursor = "pointer";
  log.id = "login";
  log.innerHTML = "login";

  reg.style.width = "calc(50% - (5px * 2))";
  reg.style.padding = "5px";
  reg.style.textAlign = "center";
  reg.style.display = "inline-block";
  reg.style.color = "#888";
  reg.style.cursor = "pointer";
  reg.id = "register";
  reg.innerHTML = "register";

}
