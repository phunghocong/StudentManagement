module.exports = mongoose => {
  
    var topicSchema = mongoose.Schema({
        title: String,
        detail: String,
        comment: [{
          detail: String,
          poster: String,
          createTime: String,
        }],
        poster: String,
      },
      { timestamps: true }
    );
   
    topicSchema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const topic = mongoose.model("topic", topicSchema);
    return topic;
  };
  