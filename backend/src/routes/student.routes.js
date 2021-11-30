module.exports = app => {
  const students = require("../controllers/student.controller");

  var router = require("express").Router();
  //Create a student without automatic account creation
  router.post('/createStudent', students.createStudent);
  //Create a student and automatically register an account
  router.post('/createStudentAndRegisterNewAccount', students.createStudentAndRegisterNewAccount);
  //Create a bunch of student from an array
  router.post('/createMultipleStudent', students.createMultipleStudent);
  router.post('/createMultipleAccountFromExistingStudent', students.generateStudentAccount);

  router.post('/updateGPA', students.updateDatabaseGPA);

  //Get all student listed alphabetically 
  router.get('/list/:mode', students.findAll);
  //Get all student listed alphabetically and smaller size
  router.get('/smallList/:mode', students.findAllToStudentList);
  //get all base class (CA clc...)
  router.get('/class/list', students.getAllClass)
  //Find students from class X
  router.get('/class/:baseClass', students.findStudentsFromClass)

  //Get student by their studentID
  router.get('/:studentID', students.findByID);
  //Get student by their manager
  router.get('/mod/:managedBy', students.findByMod);
  //Update student info with ID
  router.put('/update/:studentID', students.update);
  router.put('/update/id/:id', students.updateByID);

  router.get('/range', students.findRange);

  router.get('/count/:year', students.countStudent);

  router.delete("/", students.deleteAll);
  
  router.delete("/id/:studentID", students.deleteWithID);
  router.delete("/firstname/:firstname", students.deleteWithFirstname);

  app.use("/api/students", router);
  };
  