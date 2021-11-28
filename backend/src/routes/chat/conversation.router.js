module.exports = app => {
    const conversation = require("../controllers/chat/conversations.controller.js");

    var router = require("express").Router();

    //lấy toàn bộ conversation của 1 account
    router.get('/', conversation.getConversation);

    //thêm mới 1 conversation
    router.post('/add', conversation.addNewConversation);

    app.use("/api/chat/conversation", router);
};