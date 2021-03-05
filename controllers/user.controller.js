function getUsers(users, param) {

  return users.filter((user) => {
    
    return (
      user.name.toLowerCase().includes(param) ||
      user.nativeName.toLowerCase().includes(param)
    );
  });
  
}
exports.getUsers = getUsers;
