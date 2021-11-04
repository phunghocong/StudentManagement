module.exports = app => {
  const students = require("../controllers/student.controller");

  var router = require("express").Router();

  router.post('/', students.create);

  router.post('/multiple', students.createMultiple);

  router.get('/', students.findAll);

  router.get('/a', students.findRange);

  router.get('/count/:year', students.countStudent);


  router.delete("/", students.deleteAll);

  app.use("/api/students", router);
  };
  