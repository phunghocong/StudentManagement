module.exports = mongoose => {
  
    var topicSchema = mongoose.Schema({
        title: String,
        detail: String,
        createdTime: String,
        poster: String,
        comment: [{
          detail: String,
          poster: String,
          createdTime: String,
        }],
      }, { timestamps: true });
   
    topicSchema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Topic = mongoose.model("topic", topicSchema);
    return Topic;
  };
  