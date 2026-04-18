function register() {
  let email = document.getElementById("email").value.trim().toLowerCase();

  let user = {
    name: document.getElementById("name").value,
    email: email,
    password: document.getElementById("password").value,
    role: document.getElementById("role").value
  };

  localStorage.setItem(email, JSON.stringify(user));
  alert("Registered Successfully!");
  window.location.href = "login.html";
}

function login() {
  console.log("Login clicked");
  let email = document.getElementById("email").value.trim().toLowerCase();
  let password = document.getElementById("password").value;

  let user = JSON.parse(localStorage.getItem(email));

  if (!user) {
    alert("User not found! Please register first.");
    return;
  }

  if (user.password === password) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    alert("Wrong password!");
  }
}