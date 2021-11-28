module.exports = app => {
    const post = require("../../controllers/forum/post.controller.js");

    var router = require("express").Router();

    //lấy infor của 1 post từ id
    router.get('/:id', post.getById);

    //thêm mới 1 post
    router.post('/add', post.addNewPost); //

    //update 1 object post
    router.post('/update', post.update);

    //xóa 1 post
    router.delete('/delete', post.delete);

    app.use("/api/forum/post", router);
};