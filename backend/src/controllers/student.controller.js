const db = require("../models");
const Student = db.students;
/*
Đổi, sửa, xóa thông tin cá nhân
fix front end

*/
//Will make studentID auto increment based on the student count at currentYear

// Tạo 1 thông tin mới
exports.create = (req, res) => {
  // Kiểm tra req. 
  if (!req.body.firstName || !req.body.surName || !req.body.birthday || !req.body.national || !req.body.ethnic
    || !req.body.religion || !req.body.bornAddress || !req.body.citizenCardId || !req.body.currentAddress
    || !req.body.phoneNumber || !req.body.email || !req.body.isEnlisted /* || !req.body.draftDate can be null*/
  ) {
    res.status(400).send({ message: "Some basic info is empty" });
    return;
  }
  if (!req.body.school || !req.body.academyMethod || !req.body.levelOfAcademy || !req.body.schoolYearGroup
    || !req.body.baseClass || !req.body.major || !req.body.startedYear
  ) {
    res.status(400).send({ message: "Some school info is empty" });
    return;
  }
  var year = req.body.startedYear;
  //Duplicate handling
  Student
    .countDocuments({ startedYear: year })
    .then(docCount => {
      //var currentYear = new Date().getFullYear();

      var id = (String)(year) + (String)(docCount).padStart(4, "0");
      const student = new Student({
        studentID: id,
        firstName: req.body.firstName,
        surName: req.body.surName,
        birthday: req.body.birthday,
        national: req.body.national,
        ethnic: req.body.ethnic,//King
        religion: req.body.religion,//Dao phat
        bornAddress: req.body.bornAddress,
        citizenCardId: req.body.citizenCardId, //chung minh thu
        currentAddress: req.body.currentAddress,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        isEnlisted: req.body.isEnlisted,
        draftDate: req.body.draftDate,
        school: req.body.school,// UET
        academyMethod: req.body.academyMethod, //chinh quy...
        levelOfAcademy: req.body.levelOfAcademy, //University, Doctorate
        schoolYearGroup: req.body.schoolYearGroup, //K64,.. ??
        baseClass: req.body.baseClass, //CA-CLC4
        major: req.body.major,//Khoa hoc may tinh
        startedYear: req.body.startedYear,
      });
      student
        .save(student)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message + ", Error when create studentData."
          });
        });


    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      })
    });

  // Save Tutorial in the database

}
exports.createMultiple = (req, res) => {
  req.body.studentList.forEach(stu => {
    var year = stu.startedYear;
    Student
      .countDocuments({ startedYear: year })
      .then(docCount => {
        var id = (String)(year) + (String)(docCount).padStart(4, "0");
        const student = new Student({
          studentID: id,
          firstName: stu.firstName,
          surName: stu.surName,
          birthday: stu.birthday,
          national: stu.national,
          ethnic: stu.ethnic,//King
          religion: stu.religion,//Dao phat
          bornAddress: stu.bornAddress,
          citizenCardId: stu.citizenCardId, //chung minh thu
          currentAddress: stu.currentAddress,
          phoneNumber: stu.phoneNumber,
          email: stu.email,
          isEnlisted: stu.isEnlisted,
          draftDate: stu.draftDate,
          school: stu.school,// UET
          academyMethod: stu.academyMethod, //chinh quy...
          levelOfAcademy: stu.levelOfAcademy, //University, Doctorate
          schoolYearGroup: stu.schoolYearGroup, //K64,.. ??
          baseClass: stu.baseClass, //CA-CLC4
          major: stu.major,//Khoa hoc may tinh
          startedYear: stu.startedYear,
        });
        student
          .save(student)
          .then(data => {
          })
          .catch(err => {
            res.status(500).send({
              message: err.message + ", Error when create studentData."
            });
          });
        log("added");
      })
      .catch(err => {

      });
  })

  res.send({ message: "success" });

  //res.send(req.body);
}
exports.countStudent = (req, res) => {
  const year = req.query.year;
  Student
    .countDocuments({ startedYear: year })
    .then(docCount => {
      res.send(docCount)
    });
};
// Danh sách tất cả hs.
exports.findAll = (req, res) => {
  Student.find()
    .sort({ "firstName": 1 })
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

exports.findRange = (req, res) => {
  const page = req.query.page;
  const range = req.query.range;

  Student.find(/* $range: {(page - 1) * range, page * range, 1} */)
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
        message: `${data.deletedCount} All student info were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Student."
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
