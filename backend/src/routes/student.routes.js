module.exports = app => {
  const students = require("../controllers/student.controller");

  var router = require("express").Router();
  //Create a student without automatic account creation
  router.post('/createStudent', students.createStudent);
  //Create a student and automatically register an account
  router.post('/createStudentAndRegisterNewAccount', students.createStudentAndRegisterNewAccount);
  //Create a bunch of student from an array
  router.post('/createMultipleStudent', students.createMultipleStudent);
  //Get all student listed alphabetically
  router.get('/', students.findAll);
  //Get student by their studentID
  router.get('/:studentID', students.findByID);

  router.put('/update', students.update);

  router.get('/range', students.findRange);

  router.get('/count/:year', students.countStudent);

  router.delete("/", students.deleteAll);

  app.use("/api/students", router);
  };
  