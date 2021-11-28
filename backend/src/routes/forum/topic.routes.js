module.exports = app => {
    const topic = require("../controllers/forum/topic.controller.js");

    var router = require("express").Router();

    //lấy 1 topic từ id
    router.get('/:id', topic.getById);

    //thêm mới 1 topic
    router.post('/add', topic.addNewTopic);

    //update 1 topic
    router.post('/update', topic.update);

    //xóa 1 topic
    router.delete('/delete', topic.delete);

    app.use("/api/forum/topic", router);
};