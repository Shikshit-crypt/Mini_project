let user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
  window.location.href = "login.html";
}

// Hide NGO section if donor
if (user.role !== "ngo") {
  document.getElementById("ngoSection").style.display = "none";
}

// Load needs
function loadNeeds() {
  let needs = JSON.parse(localStorage.getItem("needs")) || [];
  let list = document.getElementById("needsList");
  list.innerHTML = "";

  needs.forEach((n, index) => {
    let li = document.createElement("li");
    li.innerHTML = `${n.item} - ${n.status} 
      <button onclick="donate(${index})">Donate</button>`;
    list.appendChild(li);
  });
}

function addNeed() {
  let item = document.getElementById("item").value;

  let needs = JSON.parse(localStorage.getItem("needs")) || [];

  needs.push({ item: item, status: "Pending" });

  localStorage.setItem("needs", JSON.stringify(needs));

  alert("Need Added");
  loadNeeds();
}

function donate(index) {
  let needs = JSON.parse(localStorage.getItem("needs"));

  needs[index].status = "Fulfilled";

  localStorage.setItem("needs", JSON.stringify(needs));

  loadNeeds();
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

loadNeeds();