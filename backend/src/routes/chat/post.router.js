module.exports = app => {
    const post = require("../controllers/chat/post.controller.js");

    var router = require("express").Router();

    //lấy array toàn bộ post đang có
    router.get('/', post.getAllPost);

    //lấy 1 post từ id
    router.get('/:id', post.getById);

    //thêm mới 1 post
    router.post('/add', post.addNewPost);

    //update một post
    router.post('/update', post.update);

    //xóa 1 post
    router.delete('/delete', post.delete);

    app.use("/api/chat/post", router);
};