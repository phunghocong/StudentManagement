module.exports = app => {
    const message = require("../controllers/chat/message.controller.js");

    var router = require("express").Router();

    //lấy array toàn bộ tin nhắn của 1 conversation
    router.get('/', message.getMessage);

    //thêm mới 1 message vào conversation
    router.post('/add', message.addNewMessage);

    app.use("/api/chat/message", router);
};