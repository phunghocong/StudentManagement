module.exports = app => {
    const topic = require("../controllers/forum/topic.controller.js");

    var router = require("express").Router();

    router.get('/:id', topic.getById);

    router.post('/add', topic.addNewTopic);

    router.post('/update', topic.update);

    router.delete('/delete', topic.delete);

    app.use("/api/forum/topic", router);
};