module.exports = mongoose => {
 
  var notificationRecordSchema = mongoose.Schema(
    {
      id: Int32Array,
      username: String, //user to notify
      read: Boolean,
      message: String
    }
  );
  notificationRecordSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const notificationRecord = mongoose.model("notificationRecord", notificationRecordSchema);
  return notificationRecord;
};
