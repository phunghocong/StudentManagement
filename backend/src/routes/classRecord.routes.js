module.exports = app => {
  const classRecords = require("../controllers/classRecord.controller");

  var router = require("express").Router();
//Create a record
  router.post('/', classRecords.create);
//Create record automatically (dev testing only)
  router.post('/createAlot', classRecords.generateMockData);
//Find all
  router.get('/',classRecords.findAll);
  //Find student by id
  router.get('/student/:studentID', classRecords.findByStudentId);
  //Get student GPA by id
  router.get('/student/gpa/:studentID', classRecords.getStudentGPA);
  //Get student GPA by id at year 
  router.get('/student/gpa/:studentID&:year', classRecords.getStudentGPAYear);
  //Find class
  router.get('/class/:classname&:year&:semeter', classRecords.findClass);
  //Get list of student from class (Not working for now)
  router.get('/class/students/:classname', classRecords.getStudentListFromClass);

  router.delete('/', classRecords.deleteAll);
  router.get('/graph/graphGPAPerYear/:from&:to', classRecords.graphGPAPerYear);
  router.get('/graph/graphGradeCount/:year&:semeter', classRecords.graphGradeCount);
  router.get('/graph/graphGradeCountOfStudent/:studentID', classRecords.graphGradeCountOfStudent);

  app.use("/api/classRecords", router);
  };
  