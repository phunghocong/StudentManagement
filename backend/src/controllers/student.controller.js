const db = require("../models");
const Student = db.students;
/*
Đổi, sửa, xóa thông tin cá nhân
fix front end

*/
//Will make studentID auto increment based on the student count at currentYear
function studentCountThisYear(year)
{
  return Student.find({"startedYear":year}).count();
}
   function createStudentID() {
     var currentYear = new Date().getFullYear();
  return (int)(
    (String)(currentYear) + 
    (int)(studentCountThisYear(currentYear).padStart(4,"0"))++)
}
// Tạo 1 thông tin mới
exports.create = (req, res) => {
  // Kiểm tra req. 
  if (//!req.body.studentID ||
    !req.body.firstName || !req.body.surName || !req.body.birthday || !req.body.national || !req.body.ethnic
    || !req.body.religion || !req.body.bornAddress || !req.body.citizenCardId || !req.body.currentAddress
    || !req.body.phoneNumber || !req.body.email || !req.body.isEnlisted /* || !req.body.draftDate can be null*/
  ) {
    res.status(400).send({ message: "Some basic info is empty" });
    return;
  }
  if (req.body.school || !req.body.academyMethod || !req.body.levelOfAcademy || !req.body.schoolSessionGroup
    || !req.body.baseClass || !req.body.major || !req.body.startedYear
  ) {
    res.status(400).send({ message: "Some school info is empty" });
    return;
  }
  //Duplicate handling
  Student.findOne({ "studentID": createStudentID(req.body.studentID) })
    .then(data => {
      if (!data) {
        const tutorial = new Account({
          //studentID: createStudentID(req.body.studentID),//19021111, need to make this auto increment
          //Basic info
          firstName: req.body.firstName,
          surName: req.body.surName,
          birthday: req.body.birthday,
          national: req.body.national,//Viet nam
          ethnic: req.body.ethnic,//King
          religion: req.body.religion,//Dao phat
          bornAddress: req.body.bornAddress,
          citizenCardId: req.body.citizenCardId, //chung minh thu

          //contact
          currentAddress: req.body.currentAddress,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,

          //activity info
          //military
          isEnlisted: req.body.isEnlisted,
          draftDate: req.body.draftDate,

          //school info
          school: req.body.school,// UET
          academyMethod: req.body.academyMethod, //chinh quy...
          levelOfAcademy: req.body.levelOfAcademy, //University, Doctorate
          schoolSessionGroup: req.body.schoolSessionGroup, //K64,.. ??
          baseClass: req.body.baseClass, //CA-CLC4
          major: req.body.major,//Khoa hoc may tinh
          startedYear: req.body.startedYear,
        });

        // Save Tutorial in the database
        student
          .save(student)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Error when create studentData."
            });
          });
      }
      else {
        console.log("Duplicated studentID");
        res.status(400).send({ message: "Please choose a new studentID" });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error when create studentData" });
    });
};

// Danh sách tất cả hs.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Student.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Student.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Student.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Student.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Student.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Student.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
