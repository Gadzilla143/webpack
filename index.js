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


const displayUsers = (data) => {
    data.map((el) => {
        const row = document.createElement("div");
        row.classList.add("users__card");
        row.innerHTML = `
          <div class="users__personal-info">
              <img src="./assets/user-list/${el.avatar}" alt="aleh">
              <h2>${el.name}</h2>
              <p>${el.nativeName}</p>
          </div>
          <div class="users__work-info">
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
      
}

searchBar.addEventListener('keypress', (e) => {

  userListBlock.innerHTML =''
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