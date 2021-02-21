function loadRegistrationLogin() {
  // create the elements
  let div = document.createElement("div"),
    log = document.createElement("div"),
    reg = document.createElement("div"),
    loginForm = document.createElement("form"),
    registerForm = document.createElement("form");

  //set div container attributes
  div.setAttribute("id", "login-form-container");
  //set form attributes
  loginForm.setAttribute("id", "login-form");
  loginForm.setAttribute("method", "POST");

  registerForm.setAttribute("id", "registration-form");
  registerForm.setAttribute("method", "POST");

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
      "background:#7dcce0;border:none;width:100%;color:#fff;padding:5px;margin:5px;",
    forgetStyles = "color:#fff;",
    startYears = 10,
    endYears = 70,
    i;

  // set loginForm styles
  loginForm.style.margin = "50px 20px 20px 20px";
  loginForm.id = "loginForm";

  // set the elements and styles on the form
  loginForm.innerHTML =
    "<label>username</label><br/>" +
    "<input type='text' id='login-email' value='' placeholder='email' style='" +
    inputStyles +
    "' /><br/>" +
    "<label>password</label><br/>" +
    "<input type='password' id='login-password' value='' placeholder='*************' style='" +
    inputStyles +
    "' /><br/>" +
    "<input type='button' id='login-button' value='Login' style='" +
    btnStyles +
    "' />"; //+
  // "<p><a style='" +
  // forgetStyles +
  // "' href='#'>forget password ?</a></p><br/>";

  // set registerForm styles
  registerForm.style.margin = "50px 20px 20px 20px";
  registerForm.style.display = "none";
  registerForm.id = "registerForm";

  // set the elements and styles on the form
  registerForm.innerHTML =
    "<label>first name</label><br/>" +
    "<input type='text' id='register-first-name' placeholder='first name' style='" +
    inputStyles +
    "' /><br/>" +
    "<label>last name</label><br/>" +
    "<input type='text' id='register-last-name'placeholder='last name' style='" +
    inputStyles +
    "' /><br/>" +
    "<label>Email</label><br/>" +
    "<input type='email' id='register-email' placeholder='your email' style='" +
    inputStyles +
    "' /><br/>" +
    "<label>password</label><br/>" +
    "<input type='password' id='register-password' placeholder='*************' style='" +
    inputStyles +
    "' /><br/>" +
    "<label>confirm password</label><br/>" +
    "<input type='password' id='register-password-confirmation' placeholder='*************' style='" +
    inputStyles +
    "' /><br/>" +
    "<input type='button' id='register-button' value='Register' style='" +
    btnStyles +
    "' />";

  // append the buttons and form on main-div
  div.appendChild(log);
  div.appendChild(reg);
  div.appendChild(loginForm);
  div.appendChild(registerForm);

  // append main-div on the body
  document.body.appendChild(div);

  //event listeners to submit forms
  let loginButton = document.getElementById("login-button");
  let registerButton = document.getElementById("register-button");
  loginButton.addEventListener("click", submitLogin);
  registerButton.addEventListener("click", submitRegistration);

  let loginPassword = document.getElementById("login-password");

  loginPassword.addEventListener("keydown", (e) => {
    let key = e.which;

    if (key === 13) {
      submitLogin();
    }
  });

  let registerPasswordConfirmation = document.getElementById(
    "register-password-confirmation"
  );

  registerPasswordConfirmation.addEventListener("keydown", (e) => {
    let key = e.which;

    if (key === 13) {
      submitRegistration();
    }
  });
}

async function submitLogin() {
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;
  const memberLogin = { member: { email, password } };

  if (email === "" || password === "") {
    window.alert(
      "Looks like there is a blank field. Please fill in email and password to log in."
    );
    return;
  }
  let options = {
    method: "POST",
    credential: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(memberLogin),
  };

  let response = await fetch(`${BACKEND_URL}/login`, options);
  let memberData = await response.json();

  if (memberData.errors) {
    //future edits: build out further to include modal or flash message with message.errors
    window.alert(memberData.errors);
  } else {
    //set localStorage for logged in member
    localStorage.setItem("memberId", JSON.stringify(memberData.member.id));
    localStorage.setItem("loggedIn", true);

    //make logout and find book club options appear in navbar
    navLogout.style.display = "block";
    navBookClubs.style.display = "block";
    //make login form disappear
    let formContainer = document.getElementById("login-form-container");
    formContainer.style.display = "none";

    //clear login form values
    document.getElementById("login-email").value = "";
    document.getElementById("login-password").value = "";
  }
}

async function submitRegistration() {
  let first_name = document.getElementById("register-first-name").value;
  let last_name = document.getElementById("register-last-name").value;
  let email = document.getElementById("register-email").value;
  let password = document.getElementById("register-password").value;
  let password_confirmation = document.getElementById(
    "register-password-confirmation"
  ).value;

  const memberRegistration = {
    member: { first_name, last_name, email, password, password_confirmation },
  };

  if (
    email.trim() === "" ||
    password.trim() === "" ||
    first_name.trim() === "" ||
    last_name.trim() === "" ||
    password_confirmation.trim() === ""
  ) {
    window.alert(
      "Looks like there is a blank field. Please fill in all fields to register."
    );
    return;
  }
  let options = {
    method: "POST",
    credential: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(memberRegistration),
  };

  let response = await fetch(`${BACKEND_URL}/members`, options);
  let memberData = await response.json();

  if (memberData.errors) {
    //build out further to include modal or flash message with message.errors
    window.alert(memberData.errors, "Member was not created.");
  } else {
    //set localStorage for logged in member
    localStorage.setItem("memberId", JSON.stringify(memberData.member.id));
    localStorage.setItem("loggedIn", true);

    //make login/registration form disappear
    let formContainer = document.getElementById("login-form-container");
    formContainer.style.display = "none";
    window.alert(memberData.message);

    //make logout and find book club options appear in navbar
    navLogout.style.display = "block";
    navBookClubs.style.display = "block";

    //clear registration form fields
    document.getElementById("register-first-name").value = "";
    document.getElementById("register-last-name").value = "";
    document.getElementById("register-email").value = "";
    document.getElementById("register-password").value = "";
    document.getElementById("register-password-confirmation").value = "";
  }
}

async function submitLogout() {
  let loggedInMemberId = parseInt(localStorage.getItem("memberId"));
  let memberIdObject = { memberId: loggedInMemberId };

  let options = {
    method: "DELETE",
    // credential: "same-origin",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(memberIdObject),
  };

  let response = await fetch(`${BACKEND_URL}/logout`, options);
  let logoutResponse = await response.json();

}
