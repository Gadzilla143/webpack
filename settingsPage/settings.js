const userPanel = document.getElementById("user-panel");
const popup = document.getElementById("popup-1");
const userLogin = document.getElementById("login");
const userPassword = document.getElementById("pass");
const singIn = document.getElementById("singIn");
const usersInf = document.getElementById("users-inf")

let userList = [];
let userListUnFiltered = ''



singIn.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});

searchBar.addEventListener("keyup", (e) => {
  getUsers(e.target.value.toLowerCase())
});

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
        displayUsers(JSON.parse(this.responseText))
        displayUserPanel(JSON.parse(this.responseText))
        
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
  console.log(id);
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

  if (!userListUnFiltered) {userListUnFiltered = data}
  const id = localStorage.getItem("userId");
  const user = userListUnFiltered.find(
    (user) => user.id == +localStorage.getItem("userId") + 1
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

const displayUsers = (data) => {
  userList = data;

  let newUserList = data.reduce((str, el, i) => {
    let style = i%2 ? 'even' : ''
    let role = ''
    if (el.role === "Admin") {
      role = 
      `
      <div class="users-inf__role" style="width: 248px;">
        <div class="role">
            EMPLOYEE
        </div>
        <div class="role">
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
      <div class="users-inf__role" style="width: 143px;">
        <div class="role active">
          ADMIN
        </div>
      </div>
      `
    } else if (el.role === "Employee") {
      role = 
      `
      <div class="users-inf__role" style="width: 248px;">
        <div class="role active">
            EMPLOYEE
        </div>
        <div class="role">
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
        <div class="role">
          ADMIN
        </div>
      </div>
      `
    } else {
      role = 
      `
      <div class="users-inf__role" style="width: 248px;">
        <div class="role">
            EMPLOYEE
        </div>
        <div class="role active">
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
      <div class="users-inf__role" style="width: 143px;">
        <div class="role">
          ADMIN
        </div>
      </div>
      `
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
