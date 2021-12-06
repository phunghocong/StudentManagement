const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const config = require("../config/config");
const Account = db.accounts;

const saltRound = 10;

/*
Tạo tài khoản cả sinh viên và quản lý.

Hàm sửa thông tin duy nhất - updateInfo.
Khi cần đổi cái gì chỉ cần sửa ở request gửi:
- Đổi mật khẩu
- Sửa E-mail(Dành cho sinh viên)
- Thêm sửa thông tin sinh viên (Dành cho quản lý).

Đăng nhập - Nếu là sinh viên / Nếu là quản lý
*/

function dateToPassword(date) {
  date = date.split("-");
  date = date.join("");
  return date;
}

function randomAvatarColor() {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
}

function getCurrentDateTimeString() {
  let currentdate = new Date();
  return (
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    "-" +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds()
  );
}

function sortDate(noti1, noti2) {
  const aDate = noti1.createdTime.split('-')[0].split("/");
  const bDate = noti2.createdTime.split('-')[0].split("/");
  const aTime = noti1.createdTime.split('-')[1].split(":");
  const bTime = noti2.createdTime.split('-')[1].split(":");
  const aDateTime = new Date(...aDate, ...aTime);
  const bDateTime = new Date(...bDate, ...bTime);
  
  return bDateTime - aDateTime;
};

// Đăng nhập sẽ nhận request gồm username và password - sau đó trả về JSON {username, _id của đối tượng acocunt trên database, jwtoken sử dụng cho phiên làm việc}.
exports.login = (req, res) => {
  // Tiếp nhận request
  const { username, password } = req.body;

  Account.findOne({ username })
    .then(async (data) => {
      if (!data) {
        return res.status(401).send({ message: "User doesn't exist" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, data.password);

      if (!isPasswordCorrect) {
        return res
          .status(401)
          .send({ message: "Invalid username or password!" });
      }

      const token = jwt.sign(
        { username: data.username },
        config.ACCESS_TOKEN_STATIC,
        { expiresIn: "1h" }
      );

      res
        .status(200)
        .send({
          username: username,
          id: data._id,
          authorityLevel: data.authorityLevel,
          token: token,
        });
    })
    .catch((err) => {
      res.status(500).send({ message: "Something went wrong when login" });
    });
};

// Tạo 1 tài khoản mới
exports.create = (req, res) => {
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.firstName ||
    !req.body.surName ||
    !req.body.email
  ) {
    res.status(400).send({ message: "Necessary information can not be empty" });
    return;
  } else {
    Account.findOne({ username: req.body.username })
      .then(async (data) => {
        if (!data) {
          const account = new Account({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, saltRound),
            firstName: req.body.firstName,
            surName: req.body.surName,
            email: req.body.email,
            messageOn: req.body.messageOn != null ? req.body.messageOn : true,
            avatarColor: req.body.avatarColor != null
              ? req.body.avatarColor
              : randomAvatarColor(),
            notification: req.body.notification != null ? req.body.notification : [],
            authorityLevel: req.body.authorityLevel != null ? req.body.authorityLevel : ""
          });

          account
            .save(account)
            .then((data) => {
              res.send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "Error when create Account",
              });
            });
        } else {
          res.status(400).send({ message: "User name is not available" });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error when create account" });
      });
  }
};

// Xóa 1 tài khoản
exports.delete = (req, res) => {
  const id = req.params.id;

  Account.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find Account with id=${id}`,
        });
      } else {
        res.send({
          message: "Account was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(401).send({
        message: "Could not delete Account with id=" + id,
      });
    });
};

// Đổi mật khẩu hoặc cập nhật thông tin tùy request
exports.updateInfo = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  const password = req.body.password;
  //Add hash password property
  if (password) {
    req.body.password = bcrypt.hashSync(req.body.password, saltRound);
  }

  Account.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find id=${id} or something went wrong!`,
        });
      } else {
        res.send({ message: "Information is updated!" });
      }
    })
    .catch((err) => {
      res.status(401).send({
        message: "Error when update information!",
      });
    });
};

// Lấy dữ liệu 1 model
exports.getOneById = (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ message: "Username be filled in" });
  }

  Account.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `There is no account with id: ${req.params.id}` });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error when get data",
      });
    });
};

exports.createAccountFromStudent = (student) => {
  Account.findOne({ username: student.studentID })
    .then((data) => {
      if (!data) {
        const account = new Account({
          username: student.studentID,
          password: bcrypt.hashSync(
            dateToPassword(student.birthday),
            saltRound
          ),
          firstName: student.firstName,
          surName: student.surName,
          email: student.email,
          messageOn: true,
          avatarColor: randomAvatarColor(),
          notification: [],
          authorityLevel: ""
        });

        account
          .save(account)
          .then((data) => {
            //console.log(data);
          })
          .catch((err) => {
            console.log("Error when create data");
          });
      } else {
        console.log("Account for this student is exist");
      }
    })
    .catch((err) => {
      console.log("Error when create account from student");
    });
};

// Tạo thông báo cho 1 tài khoản.=
exports.createNotification = (req, res) => {
  if (!req.body.title || !req.body.message || req.body.title == "" || req.body.message == "") {
    return res.status(400).send({
      message: "Notification can not be empty!",
    });
  }

  const accountId = req.params.id;
  const tempNotification = {
    read: false,
    title: req.body.title,
    message: req.body.message,
    createdTime: getCurrentDateTimeString(),
  };

  Account.findOneAndUpdate(
    { _id: accountId },
    { $push: { notification: tempNotification } },
    { useFindAndModify: false }
  )
    .then((data) => {
      res.status(200).send("Created a new notification!");
    })
    .catch((err) => {
      res.status(401).send("Error when create new notification");
    });
};

// Xóa 1 thông báo của 1 tài khoản.
exports.deleteNotification = (req, res) => {
  const accountId = req.body.accountId;
  const notificationId = req.body.notificationId;

  Account.findOneAndUpdate(
      { _id: accountId },
      { $pull: { notification: { _id: notificationId }} },
      { safe: true, multi: false }
  )
  .then(data => {
      res.status(200).send({message: "Deleted notification"});
  })
  .catch(error => {
      res.status(500).send({message: `Error when delete comment ${error}`});
  })
}

// Lấy danh sách tất cả các object model tài khoản.
exports.getAll = (req, res) => {
  Account.find()
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "There is no account in database!" });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error when get data",
      });
    });
};

exports.getOneByUsername = (req, res) => {
  const username = req.params.username;

  if (!username || username == "") {
    res.status(400).send({message: "Username must be filled in!"});
  }

  Account.findOne({ username: username })
    .then(data => {
        if (!data) {
            res.status(404).send({ message: `There is no account with username: ${req.params.username}`});
        } else {
            res.status(200).send(data);
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error when get data",
        })
    });
}
// Xóa tât cả các tài khoản.
exports.deleteAll = (req, res) => {
  Account.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} All Accoumt info were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Accoumt."
      });
    });
};

// Xóa tât cả các tài khoản.
exports.deleteAllStudent = (req, res) => {
  Account.deleteMany({"authorityLevel":["","NONE"]})
    .then(data => {
      res.send({
        message: `${data.deletedCount} All student account info were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all student account."
      });
    });
};

// lấy thông báo của 1 tài khoản từ id.
exports.getNotification = (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ message: "Username be filled in" });
  }

  Account.findById(req.params.id)
    .sort({notification: -1})
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `There is no account with id: ${req.params.id}` });
      } else {
        let dataRes = data.notification.sort(sortDate);
        res.status(200).send(dataRes);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error when get data",
      });
    });
};