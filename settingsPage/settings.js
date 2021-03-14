const userPanel = document.getElementById("user-panel");
const popup = document.getElementById("popup-1");
const userLogin = document.getElementById("login");
const userPassword = document.getElementById("pass");
const singIn = document.getElementById("singIn");
const usersInf = document.getElementById("users-inf");

const singUp = document.getElementById("singUp");
const register = document.getElementById("popup-2");
const regEmail = document.getElementById("regEmail");
const regPass = document.getElementById("regPass");
const regName = document.getElementById("regName");

let userList = [];
let userListUnFiltered = "";

singUp.addEventListener("submit", (e) => {
  e.preventDefault();
  setUsers();
});

singIn.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});

searchBar.addEventListener("keyup", (e) => {
  getUsers(e.target.value.toLowerCase());
});

const setUsers = () => {
  const url = new URL("http://127.0.0.1:3000/user_reg");
  url.searchParams.set("email", regEmail.value);
  url.searchParams.set("password", regPass.value);
  url.searchParams.set("name", regName.value);
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  );
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        displayUsers(JSON.parse(this.responseText));
        displayUserPanel(JSON.parse(this.responseText));
        userListUnFiltered = JSON.parse(this.responseText);
      } else {
        alert(this.status + ": " + this.statusText);
      }
    }
  };
  request.send(this.responseText);
  toggleRegister();
};

const getUsers = (searchString = "") => {
  const url = new URL("http://127.0.0.1:3000/user_role");
  url.searchParams.set("filterBy", searchString);
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  );
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        displayUsers(JSON.parse(this.responseText));
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
    const userId = userList.findIndex((user) => user.email === userLogin.value);
    if (userList[userId].password == userPassword.value) {
      localStorage.setItem("userId", userList[userId].id);
      localStorage.setItem("userRole", userList[userId].role);
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
  console.log(id);
  localStorage.setItem("userPageId", id);
};

const exit = () => {
  localStorage.setItem("userId", "");
  localStorage.setItem("userRole", "Employee");
};

const changeRole = (id, role) => {
  if (localStorage.getItem("userRole") == "Admin") {
    const url = new URL("http://127.0.0.1:3000/change_role");
    url.searchParams.set("id", id);
    url.searchParams.set("role", role);
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          displayUsers(JSON.parse(this.responseText));
          displayUserPanel(JSON.parse(this.responseText));
        } else {
          alert(this.status + ": " + this.statusText);
        }
      }
    };
    request.send(this.responseText);
  }
};

const togglePopup = () => {
  popup.classList.toggle("active");
};

const toggleRegister = () => {
  register.classList.toggle("active");
};

const displayUserPanel = (data) => {
  if (!userListUnFiltered) {
    userListUnFiltered = data;
  }
  const id = localStorage.getItem("userId");
  const user = userListUnFiltered.find(
    (user) => user.id == localStorage.getItem("userId")
  );
  userPanel.innerHTML = id
    ? `
    <div class="header__item">
      <img src='../assets/near.svg' alt="near" />
    </div>
    <a class="header__user" onclick="pickUser(${user.id})" href="../userPage/user.html">
      <img src='${user.avatar}' alt="user" />
      <h2>${user.name}</h2>
    </a>
    <a href="../index.html" class="header__item">
      <img onclick='exit()' src='../assets/exit.svg' alt="exit" />
    </a>
    `
    : `
    <div onclick="toggleRegister()" class="header__sign btn">
      Sing Up
    </div>
    <div onclick="togglePopup()" class="header__sign btn">
      Sing In
    </div
    `;
};

const displayUsers = (data) => {
  userList = data;

  let newUserList = data.reduce((str, el, i) => {
    let style = i % 2 ? "even" : "";
    let role = "";
    if (el.role === "Admin") {
      role = `
      <div class="users-inf__role" style="width: 248px;">
        <div onclick="changeRole(${el.id}, 'Employee')" class="role">
            EMPLOYEE
        </div>
        <div onclick="changeRole(${el.id}, 'Hr')" class="role">
            HR
        </div>
      </div>
      <div class="users-inf__role" style="width: 345px;">
        <div class="role">
          EMPLOYEE
        </div>
        <div class="role active">
          PO
        </div>
        <div class="role">
          DD
        </div>
      </div>
      <div  class="users-inf__role" style="width: 143px;">
        <div onclick="changeRole(${el.id}, 'Admin')" class="role active">
          ADMIN
        </div>
      </div>
      `;
    } else if (el.role === "Employee") {
      role = `
      <div class="users-inf__role" style="width: 248px;">
        <div onclick="changeRole(${el.id}, 'Employee')" class="role active">
            EMPLOYEE
        </div>
        <div onclick="changeRole(${el.id}, 'Hr')" class="role">
            HR
        </div>
      </div>
      <div class="users-inf__role" style="width: 345px;">
        <div class="role active">
          EMPLOYEE
        </div>
        <div class="role">
          PO
        </div>
        <div class="role">
          DD
        </div>
      </div>
      <div class="users-inf__role" style="width: 143px;">
        <div onclick="changeRole(${el.id}, 'Admin')" class="role">
          ADMIN
        </div>
      </div>
      `;
    } else {
      role = `
      <div class="users-inf__role" style="width: 248px;">
        <div onclick="changeRole(${el.id}, 'Employee')" class="role">
            EMPLOYEE
        </div>
        <div onclick="changeRole(${el.id}, 'Hr')" class="role active">
            HR
        </div>
      </div>
      <div class="users-inf__role" style="width: 345px;">
        <div class="role">
          EMPLOYEE
        </div>
        <div class="role">
          PO
        </div>
        <div class="role active">
          DD
        </div>
      </div>
      <div onclick="changeRole(${el.id}, 'Admin')" class="users-inf__role" style="width: 143px;">
        <div class="role">
          ADMIN
        </div>
      </div>
      `;
    }
    return (
      str +
      `
      <div class="user ${style}">
        <div class="user-inf__img-name">
            <img src="${el.avatar}"
                alt="user" />
            <div class="user-inf__name">
                ${el.name}/ <br /> ${el.nativeName}
            </div>
        </div>
        ${role}
      </div>
        `
    );
  }, "");
  usersInf.innerHTML = newUserList;
};

getUsers();
