const db = require("../models");
const Account = db.accounts;
/*
Tạo tài khoản
Đổi mật khẩu
Đăng nhập - Nếu là sinh viên / Nếu là quản lý
Sửa E-mail(Dành cho sinh viên)
Thêm sửa xóa thông tin sinh viên (Dành cho quản lý).

*/

//HashFunction
function hashCode(password) {
  let hashed;
  for(let i = 0; i < password.length; i++) 
        hashed = Math.imul(31, hashed) + password.charCodeAt(i) | 0;
  return hashed;
}

// Create and Save a new Tutorial
exports.create = (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.firstName || !req.body.surName || !req.body.email) {
    res.status(400).send({message: "Necessary information can not be empty"});
    return;
  }

  //check if username is duplicated? and create account
  Account.findOne({"username": req.body.username})
  .then(data => {
    if (!data) {
      console.log("Not duplicate");

      const account = new Account({
        username: req.body.username,
        hashedPassword: hashCode(req.body.password),
        firstName: req.body.firstName,
        surName: req.body.surName,
        email: req.body.email,
        published: req.body.published ? req.body.published : false,
        messageOn: req.body.messageOn ? req.body.messageOn : false,
        isStudent: req.body.isStudent ? req.body.isStudent : false, //nếu là sinh viên
        avatarColor: req.body.avatarColor ? req.body.avatarColor : "#ffffff",
      });
    
      account
        .save(account)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Error when create Account",
          });
        });
    }
    else {
      console.log("data is duplicate");
      res.status(400).send({message: "User name is not available"});
    }
  })
  .catch(err => {
    res.status(500).send({message: "Error when create account"});
  });


}

// exports.rePassword = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!"
//     });
//   }

//   const id = req.params.id;
  
// }