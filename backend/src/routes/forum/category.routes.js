module.exports = app => {
    const category = require("../controllers/forum/category.controller.js");

    var router = require("express").Router();

    router.get('/', category.getAll);

    router.get('/:id', category.getById);

    router.post('/add', category.addNewCategory);

    router.post('/update', category.update);

    router.delete('/delete', category.delete);

    app.use("/api/forum/category", router);
};