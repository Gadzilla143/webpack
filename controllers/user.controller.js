function getUsers(users, param, sort) {
  return users
    // Поиск
    .filter((user) => {
      return (
        user.name.toLowerCase().includes(param) ||
        user.nativeName.toLowerCase().includes(param)
      );
    })
    // Сортировка 
    .sort(function (a, b) {
      if (a[sort] < b[sort]) return -1;
      if (a[sort] > b[sort]) return 1;
      return 0;
    });
}
exports.getUsers = getUsers;
