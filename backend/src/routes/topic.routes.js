module.exports = app => {
    const topics = require("../controllers/topic.controller.js");
  
    var router = require("express").Router();
  
    // Tạo 1 topic
    router.post("/create/", topics.createTopic);

    // Xóa 1 Topic
    router.delete("/delete/:id", topics.deleteTopic);

    // Cập nhật 1 Topic
    router.post("/update/:id", topics.updateTopic);

    // Get 1 topic
    router.get("/get/:id", topics.getOneById);

    // Tạo 1 Comment cho 1 topic
    router.post("/createComment/:id", topics.createComment);

    // Lấy array tất các object Topic
    router.get("/getAll/:sortType", topics.getAllTopic);

    // Xóa tất cả topic
    router.delete("/deleteAll/", topics.deleteAll);

    // Xóa 1 Comment của topic
    router.delete("/deleteComment/", topics.deleteComment);
  
    //
    app.use("/api/topic", router);
  };
  