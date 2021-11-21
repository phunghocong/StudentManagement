module.exports = app => {
    const subcategory = require("../../controllers/forum/subcategory.controller");

    var router = require("express").Router();

    router.get('/', subcategory.getAll);

    router.get('/:id', subcategory.getById);

    router.get('/topics', subcategory.getAllTopic);

    router.post('/add', subcategory.addNewSubCategory);

    router.post('/update', subcategory.update);

    router.delete('/delete', subcategory.delete);

    app.use("/api/forum/subcategory", router);
};