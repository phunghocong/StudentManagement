const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require("../models");
const config = require('../config/config');
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

function dateToPassword(date) {
    date = date.split("-");
    date = date.join("");
    return date;
}

function randomAvatarColor() {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
}

function getCurrentDateTimeString() {
    let currentdate = new Date(); 
    return currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "-"
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
}

// Đăng nhập sẽ nhận request gồm username và password - sau đó trả về JSON {username, _id của đối tượng acocunt trên database, jwtoken sử dụng cho phiên làm việc}.
exports.login = (req, res) => {
    // Tiếp nhận request
    const { username, password } = req.body;

    Account.findOne({ username })
        .then(async(data) => {
            if (!data) {
                return res.status(404).send({ message: "User doesn't exist" });
            }

            const isPasswordCorrect = await bcrypt.compare(password, data.password);

            if (!isPasswordCorrect) {
                return res.status(400).send({ message: "Invalid password!" });
            }

            const token = jwt.sign({ username: data.username }, config.ACCESS_TOKEN_STATIC, { expiresIn: "1h" });

            res.status(200).send({ username: username, id: data._id, token: token });
        })
        .catch(err => {
            res.status(500).send({ message: "Something went wrong when login" });
        });
}

// Tạo 1 tài khoản mới
exports.create = (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.firstName || !req.body.surName || !req.body.email) {
        res.status(400).send({ message: "Necessary information can not be empty" });
        return;
    } else {
        Account.findOne({ "username": req.body.username })
            .then(async data => {
                if (!data) {
                    const account = new Account({
                        username: req.body.username,
                        password: bcrypt.hashSync(req.body.password, saltRound),
                        firstName: req.body.firstName,
                        surName: req.body.surName,
                        email: req.body.email,
                        messageOn: req.body.messageOn ? req.body.messageOn : true,
                        isStudent: req.body.isStudent ? req.body.isStudent : true,
                        avatarColor: req.body.avatarColor ? req.body.avatarColor : randomAvatarColor(),
                        notification: req.body.notification ? req.body.notification : [],
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
                } else {
                    res.status(400).send({ message: "User name is not available" });
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error when create account" });
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
            res.status(401).send({
                message: "Could not delete Account with id=" + id
            });
        });
};

// Đổi mật khẩu hoặc cập nhật thông tin tùy request
exports.updateInfo = (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    const password = req.body.password;
    //Add hash password property
    if (password) {
        const salt = 10;
        req.body.password = bcrypt.hashSync(req.body.password, salt);
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
            res.status(401).send({
                message: "Error when update information!"
            });
        });

}

// Lấy dữ liệu 1 model
exports.getOneById = (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ message: "Username be filled in" });
    }

    Account.findById(req.params.id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `There is no account with id: ${req.params.id}` });
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

// lấy dữ liệu 1 model từ Tên đăng nhập.

// exports.getOneByUsername = (req, res) => {
//     // if (!req.body.username) {
//     //     return res.status(400).send({ message: "Username be filled in" });
//     // }

//     const {username} = req.body;

//     Account.findOne({ username: username })
//         .then(data => {
//             if (!data) {
//                 res.status(404).send({ message: `There is no account with username: ${req.body.username}`});
//             } else {
//                 res.status(200).send(data);
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error when get data",
//             })
//         });

// }

// Tạo tài khoản từ thông tin sinh viên.

exports.createAccountFromStudent = (student) => {
    Account.findOne({ "username": student.studentID })
        .then(data => {
            if (!data) {
                const account = new Account({
                    username: student.studentID,
                    password: bcrypt.hashSync(dateToPassword(student.birthday), saltRound),
                    firstName: student.firstName,
                    surName: student.surName,
                    email: student.email,
                    messageOn: false,
                    isStudent: true,
                    avatarColor: randomAvatarColor(),
                    notification: [],
                });

                account
                    .save(account)
                    .then(data => {
                        console.log(data);
                    })
                    .catch(err => {
                        console.log("Error when create data");
                    });
            } else {
                console.log("Account for this student is exist");
            }
        })
        .catch(err => {
            console.log("Error when create account from student");
        });
}

// Tạo thông báo cho 1 tài khoản.=
exports.createNotification = (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Notification can not be empty!"
        });
    }

    const idDest = req.body.destinationID;
    const tempNotification = {read: false, message: req.body.message, createTime: getCurrentDateTimeString()};
    
    Account.findOneAndUpdate({_id: idDest}, {$push: {notification: tempNotification}}, { useFindAndModify: false })
        .then(data => {
            res.status(200).send("Created a new notification!");
        })
        .catch(err => {
            res.status(401).send("Error when create new notification");
        });

}

// Lấy danh sách tất cả các object model tài khoản.
exports.getAll = (req, res) => {

    Account.find({})
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "There is no account in database!" });
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

