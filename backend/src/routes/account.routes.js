module.exports = app => {
  const accounts = require("../controllers/account.controller");

  var router = require("express").Router();

  // Login main
  // router.post('/login/', accounts.authentication accounts.login);


  // Login
  router.post('/login/', accounts.login);

  // Tạo 1 object tài khoản
  router.post('/', accounts.create);

  // Update một object tài khoản.
  router.post('/:id', accounts.updateInfo);
  
  // Xóa một tài khoản
  router.delete('/:id', accounts.delete);

  // Lấy một model account về bằng username và password
  router.get('/', accounts.getOne);
 
  app.use("/api/accounts", router);
  };
  