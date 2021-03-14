const enterKeyCode = 13;

const userListBlock = document.getElementById("container");
const searchBar = document.getElementById("searchBar");
const userCounter = document.getElementById("user-counter");
const userInformation = document.getElementById("user_inf");
const userPanel = document.getElementById("user-panel");
const popup = document.getElementById("popup-1");

const userLogin = document.getElementById("login");
const userPassword = document.getElementById("pass");
const singIn = document.getElementById("singIn");

const singUp = document.getElementById("singUp")
const register = document.getElementById("popup-2");


let sortState = "name";
let searchString = "";
let viewState = "grid";
let userList = [];
let userListUnFiltered = ''

singUp.addEventListener("submit", (e) => {
  e.preventDefault();
  setUsers();
})

singIn.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});

searchBar.addEventListener("keyup", (e) => {
  if (e.keyCode === enterKeyCode) {
    getUsers();
  }
  searchString = e.target.value.toLowerCase();
});

const setUsers = () => {
  alert("ERROR")
};

// Запрашиваем массив пользователей с параметрами сортировки и фильтрации
const getUsers = () => {
  const url = new URL("http://127.0.0.1:3000/user_list");
  url.searchParams.set("filterBy", searchString);
  url.searchParams.set("sortBy", sortState);
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
    const userId =
      userList.find((user) => user.email === userLogin.value).id - 1;
    if (userList[userId].password == userPassword.value) {
      localStorage.setItem("userId", userId);
      togglePopup();
      displayUsers(userList);
      displayUserPanel(userList);
    } else {
      alert("Error: password");
    }
  } else {
    alert("Error: no person with this email");
  }
};
// Запоминаем id выбранного пользователя
const pickUser = (id) => {
  console.log(id)
  localStorage.setItem("userPageId", id);
};

const sortByName = () => {
  sortState = "name";
  getUsers();
};

const sortByNativeName = () => {
  sortState = "nativeName";
  getUsers();
};

const gridView = () => {
  viewState = "grid";
  displayUsers(userList);
};

const listView = () => {
  viewState = "list";
  displayUsers(userList);
};


const exit = () => {
  localStorage.setItem("userId", "");
  displayUserPanel(userList);
};

const togglePopup = () => {
  popup.classList.toggle("active");
};

const toggleRegister = () => {
  
  register.classList.toggle("active")
}

const displayUserPanel = (data) => {
  if (!userListUnFiltered) {userListUnFiltered = data}
  const id = localStorage.getItem("userId")
  const user = userListUnFiltered.find(user => user.id == +localStorage.getItem("userId") + 1)

  userPanel.innerHTML = id
    ? `
  <div class="header__item">
    <img src='./assets/near.svg' alt="near" />
  </div>
  <a class="header__user" onclick="pickUser(${user.id})" href="./userPage/user.html">
    <img src='${user.avatar}' alt="user" />
    <h2>${user.name}</h2>
  </a>
  <div class="header__item">
    <img onclick='exit()' src='./assets/exit.svg' alt="exit" />
  </div>
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
  

  let newUserList = data.reduce((str, el) => {
    return (
      str +
      `
          <a href="./userPage/user.html" onclick="pickUser(${el.id})" class="users__card-${viewState}">
            <div class="users__personal-info-${viewState}">
                <img src="${el.avatar}" alt="aleh">
                <h2>${el.name}</h2>
                <p>${el.nativeName}</p>
            </div>
            <div class="users__work-info-${viewState}">
                <div class="users__department">
                    <img src="./assets/case.svg" alt="aleh">
                    ${el.department}
                </div>
                <div class="users__room">
                    <img src="./assets/door.svg" alt="aleh">
                    ${el.room}
                </div>
            </div>
          </a>
        `
    );
  }, "");

  userListBlock.innerHTML = newUserList;
  userCounter.innerHTML = `${data.length} employers displayed`;
};

getUsers();
