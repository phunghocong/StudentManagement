module.exports = app => {
  const category = require("../controllers/forum/category.controller.js");

  var router = require("express").Router();

  router.get('/', category.getAll);

  router.get('/:id', category.getById);

  router.post('/add', category.addNewCategory/* , passport.authenticate('jwt', { session: false }) */);

  router.post('/update', category.update/* , passport.authenticate('jwt', { session: false }) */);

  router.delete('/delete', category.delete/* , passport.authenticate('jwt', { session: false }) */);

  app.use("/api/forum/category", router);
};
