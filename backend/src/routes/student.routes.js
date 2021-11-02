module.exports = app => {
  const students = require("../controllers/student.controller");

  var router = require("express").Router();

  //Create a new object model
  router.post('/', students.create);

  // Create a new Tutorial
  // router.post('/', accounts.rePassword);

  // // Retrieve all accounts
  // router.get("/", accounts.findAll);

  // // Retrieve all published accounts
  // router.get("/published", accounts.findAllPublished);

  // // Retrieve a single Tutorial with id
  // router.get("/:id", accounts.findOne);

  // // Update a Tutorial with id
  // router.put("/:id", accounts.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", accounts.delete);

  // // Create a new Tutorial
  // router.delete("/", accounts.deleteAll);

  app.use("/api/students", router);
  };
  