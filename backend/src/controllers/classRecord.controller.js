const { json } = require("body-parser");
const { students } = require("../models");
const db = require("../models");
const ClassRecord = db.classRecords;
const Student = db.students;
var classNamePrefix = Array('INT', 'INT', 'INT', 'INT', 'MAT', 'ESL', 'POL', 'DOC', 'ENG', 'VIE', 'SCI', 'OMC', 'ALP');
var subjectName = Array('Quản lý dự án phần mềm', 'An toàn và an ninh mạng',
  'Đồ họa máy tính', 'Chủ nghĩa xã hội khoa học', 'Phát triển ứng dụng Web',
  'Kinh tế chính trị Mác – Lênin', 'Lý thuyết thông tin', 'Cơ sở dữ liệu', 'Vật lý đại cương',
  'Toán cao cấp', 'Cấu Trúc Dữ Liệu và Giải Thuật', 'Kiến Trúc Máy Tính', 'Lập Trình Cơ Bản',
  'Lập Trình Nâng Cao', 'Tín Hiệu Hệ Thống', 'Xử Lý Ảnh', 'Trí tuệ nhân tạo', 'Toán Rời Rạc',
  'Lập trình hướng đối tượng', 'Giải Tích', 'Kiểm thử và đảm bảo chất lượng phần mềm',
  'Phát triển phần mềm dựa trên thành phần', 'Phương pháp hình thức', 'Phương pháp hình thức',
  'Thu thập và phân tích yêu cầu', 'Phân tích và thiết kế hướng đối tượng',
  'Phân tích và thiết kế hướng đối tượng', 'Xử lý tiếng nói',
  'Hệ quản trị cơ sở dữ liệu', 'Xử lý phân tích thông tin trực tuyến', 'Khai phá dữ liệu hướng lĩnh vực',
  'Khai phá dữ liệu hướng lĩnh vực', 'Hệ thống đảm bảo an toàn thông tin', 'Truyền thông đa phương tiện',
  'Truyền thông đa phương tiện', 'Phân tích và thiết kế mạng máy tính', 'Xử lý ngôn ngữ tự nhiên',
  'Các vấn đề hiện đại của Công nghệ thông tin', 'Các hệ thống thương mại điện tử', 'Kiến trúc hướng dịch vụ',
  'Bóng chuyền', 'Bóng rổ', 'Cầu lông', 'Bóng đá', 'Bóng bàn', 'Golf');
var semeterEnum = Array('1', '2')
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
exports.generateMockData = (req, res) => {
  const step = async _ => {
    var studentIdList = Student.find({}, {
      "studentID": 1, "startedYear": 1, _id: 0
    });
    for await (const doc of studentIdList) {
      var choose = getRandomInt(subjectName.length);
      var subjectNameLength = subjectName[choose].length;
      //Giong tao hash code cho subject
      var subjectCode =
        subjectNameLength * 5 +
        subjectName[choose].charCodeAt(0) +
        subjectName[choose].charCodeAt(subjectNameLength / 2) +
        subjectName[choose].charCodeAt(subjectNameLength / 4) +
        subjectName[choose].charCodeAt(subjectNameLength / 6) +
        subjectName[choose].charCodeAt(subjectNameLength / 8) +
        subjectName[choose].charCodeAt(subjectNameLength - 1);
      var roll1 = getRandomArbitrary(0, 100), roll2 = getRandomArbitrary(0, 100);
      var midtermGrade, grade;
      if (roll1 < 15) {
        midtermGrade = getRandomArbitrary(1, 3)
      } else if (roll1 < 30) {
        midtermGrade = getRandomArbitrary(3, 6)
      } else if (roll1 < 70) {
        midtermGrade = getRandomArbitrary(6, 8)
      } else {
        midtermGrade = getRandomArbitrary(8, 10)
      }
      if (roll2 < 10) {
        grade = getRandomArbitrary(0, 3)
      } else if (roll1 < 35) {
        grade = getRandomArbitrary(3, 5)
      } else if (roll1 < 75) {
        grade = getRandomArbitrary(5, 8)
      } else {
        grade = getRandomArbitrary(8, 10)
      }
      const classRecord = new ClassRecord({
        classname:
          classNamePrefix[subjectCode % classNamePrefix.length] //INT
          + (String)(subjectCode).padStart(5, "0") //00213
          + "_"
          + getRandomInt(4),  //3
        subjectName: subjectName[choose],//Toán cao cấp
        subjectCredit: 2 + (subjectCode % 3),//2,3
        belongToStudent: doc.studentID,//MSSV
        year: parseInt(doc.startedYear) + getRandomInt(5),//2015
        semeter: semeterEnum[getRandomInt(semeterEnum.length)],//1 or 2
        midtermGrade: midtermGrade,//0-10
        grade: grade,//0-10
      });

      classRecord
        .save()
        .catch(err => {
          res.send({ message: err.message })
        });
    }
  }
  step()
    .then(() => {
      res.send("finished")

    })

}
exports.create = (req, res) => {
  if (!req.body.classname
    || !req.body.subjectName
    || !req.body.subjectCredit
    || !req.body.belongToStudent
    || !req.body.year
    || !req.body.semeter
    || !req.body.midtermGrade
    || !req.body.grade) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const classRecord = new ClassRecord({
    classname: req.body.classname, //INT2021_22
    subjectName: req.body.subjectName,//Toán cao cấp
    subjectCredit: req.body.subjectCredit,//2,3
    belongToStudent: req.body.belongToStudent,//MSSV
    year: req.body.year,//2015
    semeter: req.body.semeter,//1,2 or extra
    midtermGrade: req.body.midtermGrade,//0-10
    grade: req.body.grade,//0-10
  });
  classRecord
    .save(classRecord)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
}
exports.findAll = (req, res) => {

  ClassRecord.find()
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
exports.findClass = (req, res) => {
  const classname = req.params.classname;
  const year = req.params.year;
  const semeter = req.params.semeter;

  ClassRecord.find({ "classname": classname, "year": year, "semeter": semeter })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "Not found class record with name " + classname + " at year " + year + " and semeter " + semeter });
      }
      else {
        res.send(data);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving class record with name=" + classname });
    });
};
exports.findByStudentId = (req, res) => {
  const studentID = req.params.studentID;
  ClassRecord.find({ "belongToStudent": studentID })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "Not found class record with student id " + studentID });
      }
      else {
        res.send(data);
      }
    }
    )
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving class record with student id=" + studentID });
    });
};
exports.getGPAof = async (studentID) => {
  var totalMid = 0, totalFinal = 0, count = 0;
  var classRecordList = await ClassRecord.find({ "belongToStudent": studentID });
  for await (const classRecord of classRecordList) {
    totalMid += parseFloat(classRecord.midtermGrade);
    totalFinal += parseFloat(classRecord.grade);
    count++;
  }
  return Math.round((totalMid * 0.4 + totalFinal * 0.6) * 4 / count) / 10;
}
exports.getStudentGPA = (req, res) => {
  const studentID = req.params.studentID;
  var totalMid = 0, totalFinal = 0, count = 0;
  const step = async _ => {
    var classRecordList = ClassRecord.find({ "belongToStudent": studentID });
    for await (const classRecord of classRecordList) {
      totalMid += parseFloat(classRecord.midtermGrade);
      totalFinal += parseFloat(classRecord.grade);
      count++;
    }
  }
  step()
    .then(
      () => {
        res.send({ GPA: Math.round((totalMid * 0.4 + totalFinal * 0.6) * 4 / count) / 10 });
      })
};

exports.getStudentGPAYear = (req, res) => {
  const studentID = req.params.studentID;
  const year = req.params.year;

  var totalMid = 0, totalFinal = 0, count = 0;
  const step = async _ => {
    var classRecordList = ClassRecord.find({ "belongToStudent": studentID, "year": year });
    for await (const classRecord of classRecordList) {
      totalMid += parseFloat(classRecord.midtermGrade);
      totalFinal += parseFloat(classRecord.grade);
      count++;
    }
  }
  step()
    .then(
      () => {
        res.send((totalMid * 0.4 + totalFinal * 0.6) * 0.4 / count)
      })
};
exports.getStudentListFromClass = (req, res) => {
  const classname = req.params.classname;
  var studentArray = [];
  const step = async _ => {
    var classRecordList = ClassRecord.find({ "classname": classname }, { "belongToStudent": 1, "_id": 0 });
    for await (const classRecord of classRecordList) {
      students.find({ "studentID": classRecord.belongToStudent })
        .then(data => {
          studentArray.push(data[0]);
        })
        .catch(err => {
          res.send(err);
        })
    }
  }
  step()
    .then(() => {
      res.json(studentArray);
    })
};
exports.update = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  ClassRecord.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

  ClassRecord.findByIdAndRemove(id, { useFindAndModify: false })
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
  ClassRecord.deleteMany({})
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
  ClassRecord.find({ published: true })
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

exports.findTest = (req, res) => {
  const title = req.params.title;

  ClassRecord.findOne({ "title": title })
    .then(data => {
      console.log(data);
      if (!data) {
        console.log("Nothing in data");
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with title=" + title });
    });
};

//Graph
exports.graphGPAPerYear = (req, res) => {
  const from = req.params.from;
  const to = req.params.to;


  ClassRecord.aggregate([
    { $match: { year: { $gte: from, $lte: to } } },
    {
      $group:
      {
        _id: '$year',
        /*         "averageMidtermGrade": {
                  $avg: { $convert: { input: '$midtermGrade', to: "double" } }
                },
                "averageFinalGrade": {
                  $avg: { $convert: { input: '$grade', to: "double" } }
                }, */
        "totalGrade": {//averageMidtermGrade
          $avg: {
            $add: [
              {
                $multiply: [
                  { $convert: { input: '$midtermGrade', to: "double" } }, 0.4]
              },
              {
                $multiply: [
                  { $convert: { input: '$grade', to: "double" } }, 0.6]
              },
            ]
          }
        }
      }
    }

  ])
    .sort({ "_id": 'asc' })
    .then(data => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  //step();
}
exports.graphGradeCount = (req, res) => {
  const year = req.params.year;
  const semeter = req.params.semeter

  ClassRecord.aggregate([
    { $match: { year: year, semeter: semeter } },
    {
      $project:
      {
        'score': {
          $add: [
            {
              $multiply: [
                { $convert: { input: '$midtermGrade', to: "double" } }, 0.4]
            },
            {
              $multiply: [
                { $convert: { input: '$grade', to: "double" } }, 0.6]
            },
          ]
        }

      }
    }

  ])
    .sort({ "_id": 'asc' })
    .then(data => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  //step();
}