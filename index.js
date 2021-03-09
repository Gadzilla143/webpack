const userList = [
  {
    name: "Dzmitry Antonenka",
    nativeName: "Дмитрий Антоненка",
    department: "Web & Mobile",
    avatar: "dzmitry.jpg",
    room: "1608",
  },
  {
    name: "Aleh Zhukau",
    nativeName: "Олег Жуков",
    department: "Web & Mobile",
    avatar: "aleh.jpg",
    room: "1608",
  },
  {
    name: "Maxim Podolsky",
    nativeName: "Максим Подольский",
    department: "Web & Mobile",
    avatar: "maxim.jpg",
    room: "1608",
  },
  {
    name: "Anna Belova",
    nativeName: "Анна Белова",
    department: "Web & Mobile",
    avatar: "anna.jpg",
    room: "1608",
  },
  {
    name: "Vitaliy Vlasov",
    nativeName: "Виталий Власов",
    department: "Web & Mobile",
    avatar: "vitaliy.jpg",
    room: "1608",
  },
  {
    name: "Stepan Smirnov",
    nativeName: "Степан Смирнов",
    department: "Web & Mobile",
    avatar: "stepan.jpg",
    room: "1608",
  },
];

const enterKeyCode = 13;

const userListBlock = document.getElementById("container");
const searchBar = document.getElementById("searchBar");
const userCounter = document.getElementById("user-counter");
let searchString = "";
let viewState = "grid";

searchBar.addEventListener("keyup", (e) => {
  if (e.keyCode === enterKeyCode) {
    search();
  } 
  searchString = e.target.value.toLowerCase();
});

const search = () => {
  const filteredUsers = userList.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchString) ||
      user.nativeName.toLowerCase().includes(searchString)
    );
  });
  displayUsers(filteredUsers);
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
  let newUserList = data.reduce((str, el) => {
    return str +  `
            <div class="users__card-${viewState}">
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
            </div>
          `;
    
  }, '');
  userListBlock.innerHTML = newUserList;
  userCounter.innerHTML = `${data.length} employers displayed`;
};
displayUsers(userList);