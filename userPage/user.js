const userInfBlock = document.getElementById("user-inf-general");
const userInf = document.getElementById("user-inf");
const userPanel = document.getElementById("user-panel");
const popup = document.getElementById("popup-1");

const userLogin = document.getElementById("login");
const userPassword = document.getElementById("pass");
const singIn = document.getElementById("singIn");

const singUp = document.getElementById("singUp");
const register = document.getElementById("popup-2");
const regEmail = document.getElementById("regEmail");
const regPass = document.getElementById("regPass");
const regName = document.getElementById("regName");

let userList = [];

singUp.addEventListener("submit", (e) => {
  e.preventDefault();
  setUsers();
});

singIn.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
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
        displayUserInformation(JSON.parse(this.responseText));
        displayUserPanel(JSON.parse(this.responseText));
      } else {
        alert(this.status + ": " + this.statusText);
      }
    }
  };
  request.send(this.responseText);
  toggleRegister();
};

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

const exit = () => {
  localStorage.setItem("userId", "");
  displayUserPanel(userList);
};

const togglePopup = () => {
  popup.classList.toggle("active");
};

const toggleRegister = () => {
  console.log("asda");
  register.classList.toggle("active");
};
// Запрашиваем информацию о выбранном пользователе (id хранится в localStorage)
const getUser = () => {
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    "http://127.0.0.1:3000/user/" + localStorage.getItem("userPageId"),
    true
  );
  request.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  );
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        displayUserInformation(JSON.parse(this.responseText));
      } else {
        alert(this.status + ": " + this.statusText);
      }
    }
  };
  request.send(this.responseText);
};

const pickUser = (id) => {
  console.log(id);
  localStorage.setItem("userPageId", id);
};

const getDate = (data) => {
  
  if (data) {
    const date = new Date(data);
    return (
      date.getDate() +
      1 +
      "." +
      (date.getMonth() + 1) +
      "." +
      date.getFullYear()
    );
  } else {
    return data
  }
};

const displayUserPanel = (data) => {
  userList = data;
  const id = localStorage.getItem("userId");
  const user = data.find(
    (user) => user.id == +localStorage.getItem("userId") + 1
  );
  userPanel.innerHTML = id
    ? `
    <div class="header__item">
      <img src='../assets/near.svg' alt="near" />
    </div>
    <a class="header__user" onclick="pickUser(${user.id})" href="./user.html">
      <img src='${user.avatar}' alt="user" />
      <h2>${user.name}</h2>
    </a>
    <div class="header__item">
      <img onclick='exit()' src='../assets/exit.svg' alt="exit" />
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

const displayUserInformation = (data) => {
  
  userInf.innerHTML = `
        <img src='${data.avatar}'>
        <p>- ${data.gender} -</p>
        <h2>${data.name}</h2>
        <p>${data.fullName}</p>
        <div class="user-inf__btn">
            <p>ID ${data.employee_id}</p>
            <p>Buisness card</p>
        </div>
    `;
  userInfBlock.innerHTML = `
        <div class="user-general-inf__block" style="height: 80px;">
            <h2>GENERAL INFO</h2>
            <hr />
            <div class="field">
                <h5>Department</h5>
                <p>${data.department}</p>
            </div>
            <div class="field">
                <h5>Room</h5>
                <p>${data.room}</p>
            </div>
        </div>
        <div class="user-general-inf__block" style="height: 160px;">
            <h2>CONTACTS</h2>
            <hr />
            <div class="field">
                <h5>Home Phone</h5>
                <p>${data.employee_id}</p>
            </div>
            <div class="field">
                <h5>Mobile phone</h5>
                <p>${data.phone}</p>
            </div>
            <div class="field">
                <h5>Email</h5>
                <p>${data.email}</p>
            </div>
            <div class="field">
                <h5>Skype ID</h5>
                <p>${data.skype}</p>
            </div>
            <div class="field">
                <h5>C-Number</h5>
                <p>${data.cNumber}</p>
            </div>
        </div>
        <div class="user-general-inf__block" style="height: 80px;">
            <h2>PROFILE INFO</h2>
            <hr />
            <div class="field">
                <h5>Hire date</h5>
                <p>${getDate(data.date_hired)}</p>
            </div>
            <div class="field">
                <h5>Status</h5>
                <p>${data.status}</p>
            </div>
        </div>
        <div class="user-general-inf__block" style="height: 120px;">
            <h2>EMPLOYMENT INFO</h2>
            <hr />
            <div class="field">
                <h5>State of employment period</h5>
                <p>${getDate(data.employment_period[0].start_date)}</p>
            </div>
            <div class="field">
                <h5>Working day duration</h5>
                <p>${data.employment_period[0].working_day_duration} hours</p>
            </div>
            <div class="field">
                <h5>State of employment period 2</h5>
                <p>${getDate(data.employment_period[1].start_date)}</p>
            </div>
            <div class="field">
                <h5>Working day duration</h5>
                <p>${data.employment_period[1].working_day_duration} hours</p>
            </div>
        </div>
        <div class="user-general-inf__block" style="height: 80px;">
            <h2>ADDITIONAL MODULES</h2>
            <hr />
            <div class="field">
                <h5>Vacation</h5>
                <p>${data.vacantion}</p>
            </div>
            <div class="field">
                <h5>Address book redesign</h5>
                <p>${data.address_book_redesign}</p>
            </div>
        </div>
    `;
};

getUser();
getUsers();
