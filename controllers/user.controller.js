function getUsers(users, param, sort) {
  // Сортировка по имени

  return users
    .filter((user) => {
      return (
        user.name.toLowerCase().includes(param) ||
        user.nativeName.toLowerCase().includes(param)
      );
    })
    .sort(function (a, b) {
      if (a[sort] < b[sort]) return -1;
      if (a[sort] > b[sort]) return 1;
      return 0;
    });
}
exports.getUsers = getUsers;
