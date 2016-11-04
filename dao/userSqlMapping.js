var UserSQL = {
  insert: 'insert into user(id,name,age) values(0,?,?)',
  delete: 'delete from user where id=?',
  update: 'update user set name=?, age=? where id=?',
  queryAll: 'select * from user'
};
module.exports = UserSQL;
