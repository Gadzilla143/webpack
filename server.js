const http = require('http');
const url = require('url');
const userController = require("./controllers/user.controller");


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


http
  .createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    
        const queryObject = url.parse(req.url, true).query || '';
        
        const filteredUsers = userController.getUsers(userList, queryObject.filterBy);
        res.end(JSON.stringify(filteredUsers));
  })
  .listen(3000, '127.0.0.1');
