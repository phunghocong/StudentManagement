module.exports = app => {
    const message = require("../controllers/chat/message.controller.js");

    var router = require("express").Router();

    router.get('/', message.getMessage);

    router.post('/add', message.addNewMessage);

    app.use("/api/chat/message", router);
};