const userList = [
  {
    id: 1,
    name: "Dzmitry Gordon",
    nativeName: "Дмитрий Гордон",
    department: "Web & Mobile",
    role: "Admin",
    avatar:
      "https://i1.sndcdn.com/artworks-7yHR0xGSzLgPu5AL-OUzjfA-t500x500.jpg",
    room: "1608",
    employee_id: "223",
    fullName: "Дмитрий Ильич Гордон",
    phone: "+375343334343",
    email: "dima.ant@leverx.com",
    skype: "dima",
    password: 1212,
    cNumber: "C9200001",
    date_hired: 1561939200000,
    status: "Active",
    employment_period: [
      {
        start_date: 1561939200000,
        working_day_duration: 8,
      },
      {
        start_date: 1561932200000,
        working_day_duration: 2,
      },
    ],
    vacantion: "Enabled",
    address_book_redesign: "Enabled",
    gender: "Mr",
  },
  {
    id: 2,
    name: "Aleh Zhukau",
    nativeName: "Олег Жуков",
    department: "Web & Mobile",
    role: "Employee",
    avatar:
      "https://kcsmile.com/wp-content/uploads/2017/05/canstockphoto2083668-min.jpg",
    room: "1608",
    employee_id: "224",
    fullName: "Олег Александрович Жуков",
    phone: "+375343334344",
    email: "oleg.ant@leverx.com",
    skype: "sseg",
    password: 1212,
    cNumber: "C9200002",
    date_hired: 1561939200000,
    status: "Active",
    employment_period: [
      {
        start_date: 1561939200000,
        working_day_duration: 8,
      },
      {
        start_date: 1561932200000,
        working_day_duration: 1,
      },
    ],
    vacantion: "Enabled",
    address_book_redesign: "Enabled",
    gender: "Mr",
  },
  {
    id: 3,
    name: "Maxim Podolsky",
    nativeName: "Максим Подольский",
    department: "Web & Mobile",
    role: "Employee",
    avatar:
      "https://pbs.twimg.com/profile_images/562876953997221888/fdrVbVYU.jpeg",
    room: "1608",
    employee_id: "225",
    fullName: "Максим Адольфович Подольский",
    phone: "+375343334345",
    email: "olegg.ant@leverx.com",
    skype: "ssseg",
    password: 1212,
    cNumber: "C9200003",
    date_hired: 1561939200000,
    status: "Active",
    employment_period: [
      {
        start_date: 1561939200000,
        working_day_duration: 8,
      },
      {
        start_date: 1561932200000,
        working_day_duration: 3,
      },
    ],
    vacantion: "Enabled",
    address_book_redesign: "Enabled",
    gender: "Mr",
  },
  {
    id: 4,
    name: "Anna Belova",
    nativeName: "Анна Белова",
    department: "Web & Mobile",
    role: "Hr",
    avatar: "http://pompa.zshop.kz/lander/amst_black/ava3.jpg",
    room: "1608",
    employee_id: "225",
    fullName: "Анна Александровна Белова",
    phone: "+375343334345",
    email: "olsseg.ant@leverx.com",
    skype: "sseg",
    password: 1212,
    cNumber: "C9200002",
    date_hired: 1561939200000,
    status: "Active",
    employment_period: [
      {
        start_date: 1561939200000,
        working_day_duration: 8,
      },
      {
        start_date: 1561932200000,
        working_day_duration: 4,
      },
    ],
    vacantion: "Enabled",
    address_book_redesign: "Enabled",
    gender: "Ms",
  },
  {
    id: 5,
    name: "Vitaliy Vlasov",
    nativeName: "Виталий Власов",
    department: "Web & Mobile",
    role: "Employee",
    avatar:
      "https://pbs.twimg.com/profile_images/1262549910190198785/Mq_bcT1f.jpg",
    room: "1608",
    employee_id: "226",
    fullName: "Виталий Владимирович Власов",
    phone: "+375343334346",
    email: "olssegg.ant@leverx.com",
    skype: "olssseg",
    password: 1212,
    cNumber: "C9200002",
    date_hired: 1561939200000,
    status: "Active",
    employment_period: [
      {
        start_date: 1561939200000,
        working_day_duration: 8,
      },
      {
        start_date: 1561932200000,
        working_day_duration: 6,
      },
    ],
    vacantion: "Enabled",
    address_book_redesign: "Enabled",
    gender: "Mr",
  },
  {
    id: 6,
    name: "Zhmashenko Valeriy",
    nativeName: "Жмышенко Валерий",
    department: "Web & Mobile",
    role: "Admin",
    avatar:
      "https://www.meme-arsenal.com/memes/1de8fd7b3ea843febb7941e0ad21517d.jpg",
    room: "1608",
    employee_id: "227",
    fullName: "Жмышенко Валерий Альбертович",
    phone: "+375343334347",
    email: "oasdasd.ant@leverx.com",
    skype: "asd",
    password: 1212,
    cNumber: "C9200002",
    date_hired: 1561939200000,
    status: "Active",
    employment_period: [
      {
        start_date: 1561939200000,
        working_day_duration: 6,
      },
      {
        start_date: 1561932200000,
        working_day_duration: 3,
      },
    ],
    vacantion: "Enabled",
    address_book_redesign: "Enabled",
    gender: "Mr",
  },
];

const http = require("http");
const url = require("url");

const userController = require("./controllers/user.controller");

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "origin, content-type, accept"
    );

    if (path === "/user_list") {
      const queryObject = url.parse(req.url, true).query || "";
      const filteredUsers = userController.getUsers(
        userList,
        queryObject.filterBy,
        queryObject.sortBy
      );
      res.end(JSON.stringify(filteredUsers));
    } else if (path === "/change_role") {
      const queryObject = url.parse(req.url, true).query || "";
      const userId = userList.findIndex((user) => user.id == queryObject.id);
      userList[userId].role = queryObject.role;
      res.end(JSON.stringify(userList));
    } else if (path === "/user_role") {
      const queryObject = url.parse(req.url, true).query || "";
      const filteredUsers = userController.filteredUsersByRole(
        userList,
        queryObject.filterBy
      );
      res.end(JSON.stringify(filteredUsers));
    } else if (path === "/user_reg") {
      const queryObject = url.parse(req.url, true).query || "";
      userList.push({
        id: userList.length + 1,
        name: queryObject.name,
        nativeName: queryObject.name,
        department: "Web & Mobile",
        role: "Employee",
        avatar:
          "https://yt3.ggpht.com/a/AATXAJwvIVm1ukHh2FvA1XXpxNFwMQZ_sMTmtaYslg=s900-c-k-c0xffffffff-no-rj-mo",
        room: "1608",
        employee_id: "223",
        fullName: queryObject.name,
        phone: "+375343334343",
        email: queryObject.email,
        skype: "dima",
        password: queryObject.password,
        cNumber: "C9200001",
        date_hired: 1561939200000,
        status: "Active",
        employment_period: [
          {
            start_date: 1561939200000,
            working_day_duration: 8,
          },
          {
            start_date: 1561932200000,
            working_day_duration: 2,
          },
        ],
        vacantion: "Enabled",
        address_book_redesign: "Enabled",
        gender: "Mr",
      });

      res.end(JSON.stringify(userList));
    } else {
      const id = req.url.split("/")[2];
      
      res.end(JSON.stringify(userList.find((el) => el.id == id)));
    }
  })
  .listen(3000, "127.0.0.1");
