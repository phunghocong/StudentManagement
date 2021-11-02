module.exports = mongoose => {
 
  var activityRecordSchema = mongoose.Schema(
    {
      actionType: String,
      dataBeforeEdit: String,
      dataAfterEdit: String
    }
  );
  
  activityRecordSchema.method("toJSON",  () => {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const activityRecord = mongoose.model("activityRecord", activityRecordSchema);
  return activityRecord;
};
