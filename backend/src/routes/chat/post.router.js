module.exports = app => {
    const post = require("../controllers/chat/post.controller.js");

    var router = require("express").Router();

    router.get('/', post.getAllPost);

    router.get('/:id', post.getById);

    router.post('/add', post.addNewPost);

    router.post('/update', post.update);

    router.delete('/delete', post.delete);

    app.use("/api/chat/post", router);
};