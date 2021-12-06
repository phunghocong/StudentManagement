const db = require("../models");
const config = require("../config/config");
const Topic = db.topic;

function getCurrentDateTimeString() {
  let currentdate = new Date();
  return (
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    "-" +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds()
  );
}

// Tạo 1 topic mới
exports.createTopic = (req, res) => {
  if (req.body) {
    const topic = new Topic({
      title: req.body.title,
      detail: req.body.detail,
      comment: [],
      poster: req.body.poster,
      createdTime: getCurrentDateTimeString(),
    });

    topic
      .save(topic)
      .then((data) => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({ message: "error when create topic", err: err });
      })
  } else {
    res.status(400).send({ message: "Data must be filled in" });
  }
};

// Xóa 1 topic
exports.deleteTopic = (req, res) => {
  const id = req.params.id;

  Topic.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find Topic with id=${id}`,
        });
      } else {
        res.send({
          message: "Topic was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(401).send({
        message: "Could not delete Topic with id=" + id,
        error: err,
      });
    });
};

// Đổi mật khẩu hoặc cập nhật thông tin tùy request
exports.updateTopic = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Topic.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find id=${id} or something went wrong!`,
        });
      } else {
        res.send({ message: "Topic is updated!" });
      }
    })
    .catch((err) => {
      res.status(401).send({
        message: "Error when update Topic!",
        error: err,
      });
    });
};

// Lấy dữ liệu 1 model Topic
exports.getOneById = (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ message: "ID must be filled in" });
  }

  Topic.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `There is no Topic with id: ${req.params.id}` });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error when get data",
        error: err,
      });
    });
};

// Lấy danh sách tất cả các object model tài khoản.
exports.getAllTopic = (req, res) => {
  const sortType = req.params.sortType;
  const sort = sortType == "oldest"? 1: -1;
  Topic.find()
    .sort({ createdAt: sort })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "There is no Topic in database!" });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error when get data",
        error: err
      });
    });
};

// Xóa tât cả các tài khoản.
exports.deleteAll = (req, res) => {
  Topic.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} All Accoumt info were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all topic."
      });
    });
};

// Tạo thông báo cho 1 tài khoản.=
exports.createComment = (req, res) => {
  if (!req.body.detail || req.body.detail == "" || !req.body.poster || req.body.poster == "") {
    return res.status(400).send({
      message: "Information must be filled in",
    });
  }

  const topicId = req.params.id;
  const tempComment = {
    detail: req.body.detail,
    poster: req.body.poster,
    createdTime: getCurrentDateTimeString(),
  };

  Topic.findOneAndUpdate(
    { _id: topicId },
    { $push: { comment: tempComment } },
    { useFindAndModify: false }
  )
    .then((data) => {
      res.status(200).send("Created a new comment!");
    })
    .catch((err) => {
      res.status(401).send("Error when create new comment");
    });
};

// Xóa 1 comment của 1 topic
exports.deleteComment = (req, res) => {
  const topicId = req.body.topicId;
  const commentId = req.body.commentId;

  Topic.findOneAndUpdate(
    { _id: topicId },
    { $pull: { comment: { _id: commentId } } },
    { safe: true, multi: false }
  )
    .then(data => {
      res.status(200).send({ message: "Deleted Comment!" });
    })
    .catch(error => {
      res.status(500).send({ message: `Error when delete comment ${error}` });
    })

}