const enterKeyCode = 13;

const userListBlock = document.getElementById("container");
const searchBar = document.getElementById("searchBar");
const userCounter = document.getElementById("user-counter");
const userInformation = document.getElementById("user_inf")

let sortState = 'name';
let searchString = "";
let viewState = "grid";
let userList = {}

searchBar.addEventListener("keyup", (e) => {
  if (e.keyCode === enterKeyCode) {
    getUsers();
  }
  searchString = e.target.value.toLowerCase();
});

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
      } else {
        alert(this.status + ': ' + this.statusText);
      }
    }
  };
  request.send(this.responseText);
};

// Запоминаем id выбранного пользователя
const pickUser = (id) => {
  localStorage.setItem('userId', id)
}

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

const displayUsers = (data) => {
  userList = data
  let newUserList = data.reduce((str, el) => {
    return (
      str +
        `
          <a href="user.html" onclick="pickUser(${el.id})" class="users__card-${viewState}">
            <div class="users__personal-info-${viewState}">
                <img src="./assets/user-list/${el.avatar}" alt="aleh">
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