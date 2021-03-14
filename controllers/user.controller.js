function getUsers(users, param, sort) {
  if (!param) {
    return (
      users
        .sort(function (a, b) {
          if (a[sort] < b[sort]) return -1;
          if (a[sort] > b[sort]) return 1;
        return 0;
    }))
  } else {
    return (
      users
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
        })
    );
  }
}

function filteredUsersByRole(users, param) {
  return (
    users
      // Поиск
      .filter((user) => {
        return (
          user.role.toLowerCase().includes(param) 
        );
      })
  );
}

exports.filteredUsersByRole = filteredUsersByRole;
exports.getUsers = getUsers;
