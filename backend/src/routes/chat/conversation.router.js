module.exports = app => {
    const conversation = require("../controllers/chat/conversations.controller.js");

    var router = require("express").Router();

    router.get('/', conversation.getConversation);

    router.post('/add', conversation.addNewConversation);

    app.use("/api/chat/conversation", router);
};