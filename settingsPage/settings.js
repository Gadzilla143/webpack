const userPanel = document.getElementById("user-panel");
const popup = document.getElementById("popup-1");
const userLogin = document.getElementById("login");
const userPassword = document.getElementById("pass");
const singIn = document.getElementById("singIn");

let userList = [];

singIn.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});

const getUsers = () => {
  const url = new URL("http://127.0.0.1:3000/user_list");
  url.searchParams.set("filterBy", "");
  url.searchParams.set("sortBy", "");
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  );
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        displayUserPanel(JSON.parse(this.responseText));
      } else {
        alert(this.status + ": " + this.statusText);
      }
    }
  };
  request.send(this.responseText);
};

const login = () => {
  if (userList.find((user) => user.email === userLogin.value)) {
    const userId =
      userList.find((user) => user.email === userLogin.value).id - 1;
    if (userList[userId].password == userPassword.value) {
      localStorage.setItem("userId", userId);
      togglePopup();
      displayUserPanel(userList);
    } else {
      alert("Error: password");
    }
  } else {
    alert("Error: no person with this email");
  }
};

const pickUser = (id) => {
  console.log(id)
  localStorage.setItem("userPageId", id);
};


const exit = () => {
  localStorage.setItem("userId", "");
  displayUserPanel(userList);
};

const togglePopup = () => {
  popup.classList.toggle("active");
};

const displayUserPanel = (data) => {
  userList = data;
  const id = localStorage.getItem("userId");
  const user = data.find(user => user.id == +localStorage.getItem("userId") + 1)
  userPanel.innerHTML = id
    ? `
    <div class="header__item">
      <img src='../assets/near.svg' alt="near" />
    </div>
    <a class="header__user" onclick="pickUser(${user.id})" href="../userPage/user.html">
      <img src='${user.avatar}' alt="user" />
      <h2>${user.name}</h2>
    </a>
    <div class="header__item">
      <img onclick='exit()' src='../assets/exit.svg' alt="exit" />
    </div>
    `
    : `
    <div class="header__sign btn">
      Sing Up
    </div>
    <div onclick="togglePopup()" class="header__sign btn">
      Sing In
    </div
    `;
};

getUsers();
