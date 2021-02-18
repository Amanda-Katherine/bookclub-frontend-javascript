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

  // hide register form and show login form
  reg.onclick = function () {
    this.style.color = "#fff";
    log.style.color = "#888";
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  };

  // hide login form and show register form
  log.onclick = function () {
    this.style.color = "#fff";
    reg.style.color = "#888";
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  };

  // create some variables for styling
  var inputStyles =
      "background:none;border-color:#888;border-width:0 0 1px 0;width:100%;color:#fff;padding:5px;margin:5px;",
    btnStyles =
      "background:red;border:none;width:100%;color:#fff;padding:5px;margin:5px;",
    forgetStyles = "color:#fff;",
    startYears = 10,
    endYears = 70,
    i;

}
