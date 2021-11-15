module.exports = mongoose => {


  
  var chatRecordSchema = mongoose.Schema(
    {
      user1: String,
      user2: String,
      message: String
    }
  );
  chatRecordSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const chatRecord = mongoose.model("chatRecord", chatRecordSchema);
  return chatRecord;
};
