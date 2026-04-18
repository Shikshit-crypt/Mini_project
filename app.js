let user = JSON.parse(localStorage.getItem("currentUser"));

document.getElementById("welcome").innerText =
  "Welcome, " + user.name + " (" + user.role + ")";

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

  if (needs.length === 0) {
  list.innerHTML = "<p class='text-center text-muted'>No needs available</p>";
}

  needs.forEach((n, index) => {
    let col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";

    let card = `
  <div class="card shadow mb-3">
    <div class="card-body">
      <h5 class="card-title"><i class="fa fa-box"></i> ${n.item}</h5>
      <p>Status: 
  <span class="badge ${n.status === 'Fulfilled' ? 'bg-success' : 'bg-warning text-dark'}">
    ${n.status}
  </span>
</p>
      ${
        user.role === "donor"
          ? `<button class="btn btn-success" onclick="donate(${index})">
              <i class="fa fa-hand-holding-heart"></i> Donate
            </button>`
          : ""
      }
    </div>
  </div>
`;

    col.innerHTML = card;
    list.appendChild(col);
  });
  document.getElementById("totalNeeds").innerText = needs.length;

let pending = needs.filter(n => n.status === "Pending").length;
let fulfilled = needs.filter(n => n.status === "Fulfilled").length;

document.getElementById("pendingNeeds").innerText = pending;
document.getElementById("fulfilledNeeds").innerText = fulfilled;
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
function showDashboard() {
  document.getElementById("needsList").parentElement.style.display = "block";
  document.getElementById("donationSection").style.display = "none";
}

function showDonations() {
  document.getElementById("needsList").parentElement.style.display = "none";
  document.getElementById("donationSection").style.display = "block";

  let needs = JSON.parse(localStorage.getItem("needs")) || [];
  let list = document.getElementById("donationList");
  list.innerHTML = "";

  needs
    .filter(n => n.status === "Fulfilled")
    .forEach(n => {
      let li = document.createElement("li");
      li.innerText = n.item + " donated";
      list.appendChild(li);
    });
}

loadNeeds();
