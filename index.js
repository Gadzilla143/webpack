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

const userListBlock = document.getElementById('container');
const searchBar = document.getElementById('searchBar');
const userCounter = document.getElementById('user-counter');

let viewState = 'grid'

const gridView = () => {
  viewState = 'grid'
  displayUsers(userList)
}

const listView = () => {
  viewState = 'list'
  displayUsers(userList)
}
const displayUsers = (data) => {
    userListBlock.innerHTML =''
    let counter = 0;
    data.map((el) => {
        counter++;
        const row = document.createElement("div");
        row.classList.add(`users__card-${viewState}`);
        row.innerHTML = `
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
          `;
          userListBlock.appendChild(row);
      });
    userCounter.innerHTML = `${counter} employers displayed`
      
}

searchBar.addEventListener('keypress', (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredUsers = userList.filter((user) => {
      return (
          user.name.toLowerCase().includes(searchString) ||
          user.nativeName.toLowerCase().includes(searchString)
      );
  });
  displayUsers(filteredUsers);
});

displayUsers(userList)