module.exports = app => {
    const subcategory = require("../../controllers/forum/subcategory.controller");

    var router = require("express").Router();

    //lấy mảng chứa toàn bộ model subcategory hiện có -- k cần nữa
    router.get('/', subcategory.getAll);

    //lấy subcategory theo id -- k cần nữa
    router.get('/:id', subcategory.getById);

    //lấy toàn bộ topic trong subcategory hiện tại đang chứa
    router.get('/topics', subcategory.getAllTopic);

    //thêm mới 1 subcategory -- k cần nữa
    router.post('/add', subcategory.addNewSubCategory);

    //update 1 subcategory -- k cần nữa
    router.post('/update', subcategory.update);

    //xóa 1 subcategory -- k cần nữa
    router.delete('/delete', subcategory.delete);

    app.use("/api/forum/subcategory", router);
};