module.exports = app => {
    const usergroup = require("../controllers/forum/userGroup.controller.js");

    var router = require("express").Router();

    router.get('/', usergroup.getAll);

    router.get('/:id', usergroup.getById);

    router.post('/add', usergroup.addNewUserGroup);

    router.post('/update', usergroup.update);

    router.delete('/delete', usergroup.delete);

    app.use("/api/forum/usergroup", router);
};