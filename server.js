const http = require("http");
const url = require("url");

const userController = require("./controllers/user.controller");
const { userList } = require("./userList");

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
    } else {
      const id = req.url.split("/")[2];
      console.log(userList.find(el => el.id == id))
      res.end(JSON.stringify(userList.find(el => el.id == id)));
    }
  })
  .listen(3000, "127.0.0.1");
