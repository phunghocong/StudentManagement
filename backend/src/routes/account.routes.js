module.exports = app => {
  const accounts = require("../controllers/account.controller");
  const auth = require('../middleware/auth');

  var router = require("express").Router();

  // Test authorization middbleware
  router.get('/one/', auth.auth, (req, res) => {
    try {
      res.status(200).send({message: "Success author"});
    } catch(error) {
      res.status(401).send({error: error});
    }
  });

  // Login
  router.post('/login/', accounts.login);

  // Tạo 1 object tài khoản
  router.post('/create/', accounts.create);

  // Tạo thông báo về tài khoản
  router.post('/createNotification/', accounts.createNotification);

  // Update một object tài khoản.
  router.post('/update/:id', auth.auth, accounts.updateInfo);
  
  // Xóa một tài khoản
  router.delete('/delete/:id', auth.auth, accounts.delete);

  // Lấy một model account từ id
  router.get('/get/:id', accounts.getOneById);

  // Lấy một model account từ username
  router.get('/get/', accounts.getOneByUsername);
 
  app.use("/api/accounts", router);
  };
  