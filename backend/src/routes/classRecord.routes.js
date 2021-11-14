module.exports = app => {
  const classRecords = require("../controllers/classRecord.controller");

  var router = require("express").Router();

  router.post('/', classRecords.create);

  router.post('/createAlot', classRecords.generateMockData);

  router.get('/',classRecords.findAll);
  router.get('/student/:studentID', classRecords.findByStudentId);
  router.get('/class/:classname&:year&:semeter', classRecords.findClass);
  router.get('/class/students/:classname', classRecords.getStudentListFromClass);

  router.delete('/', classRecords.deleteAll);

  app.use("/api/classRecords", router);
  };
  