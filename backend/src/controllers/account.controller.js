const db = require("../models");
const Account = db.accounts;
/*
Tạo tài khoản cả sinh viên và quản lý.

Hàm sửa thông tin duy nhất - updateInfo.
Khi cần đổi cái gì chỉ cần sửa ở request gửi:
- Đổi mật khẩu
- Sửa E-mail(Dành cho sinh viên)
- Thêm sửa thông tin sinh viên (Dành cho quản lý).

Đăng nhập - Nếu là sinh viên / Nếu là quản lý


*/

//HashFunction
function hashCode(password) {
  let hashed;
  for(let i = 0; i < password.length; i++) 
        hashed = Math.imul(31, hashed) + password.charCodeAt(i) | 0;
  return hashed;
}

// Tạo 1 tài khoản mới
exports.create = (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.firstName || !req.body.surName || !req.body.email) {
    res.status(400).send({message: "Necessary information can not be empty"});
    return;
  }
  else {
    Account.findOne({"username": req.body.username})
      .then(data => {
        if (!data) {
          const account = new Account({
            username: req.body.username,
            hashedPassword: hashCode(req.body.password),
            firstName: req.body.firstName,
            surName: req.body.surName,
            email: req.body.email,
            messageOn: req.body.messageOn ? req.body.messageOn : false,
            isStudent: req.body.isStudent ? req.body.isStudent : false,
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
          res.status(400).send({message: "User name is not available"});
        }
      })
      .catch(err => {
        res.status(500).send({message: "Error when create account"});
      });
  }
}

// Xóa 1 tài khoản
exports.delete = (req, res) => {
  const id = req.params.id;

  Account.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find Account with id=${id}`
        });
      } else {
        res.send({
          message: "Account was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Account with id=" + id
      });
    });
};

// Đổi mật khẩu hoặc cập nhật thông tin tùy request
exports.updateInfo = (req, res) => {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  
  const id = req.params.id;
  const password = req.body.password;
  //Add hashedPassword property
  if (password) {
    req.body.hashedPassword = hashCode(password);
  }
  
  Account.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot find id=${id} or something went wrong!`,
      });
    } else {
      res.send({ message: "Information is updated!" });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error when update information!"
    });
  });

}

// Lấy dữ liệu 1 model - Đăng nhập có lẽ sẽ dùng cái này
exports.getOne = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({message: "Username and password must be filled in"});
  }

  Account.findOne({username: req.body.username, hashedPassword: hashCode(req.body.password)},)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: "Wrong id or password.",
        });
      }
      else {
        res.status(200).send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error when get data",
      })
    });

}

