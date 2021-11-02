module.exports = mongoose => {
  
 
  var classRecordSchema = mongoose.Schema(
    {
      classname: String,
      subjectName: String,
      subjectCredit: String,
      belongToStudent: String,
      midtermGrade: String,
      grade: String,
      paymentStatus: String,
    }
  );
 
  classRecordSchema.method("toJSON", () => {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const classRecord = mongoose.model("classRecord", classRecordSchema);
  return classRecord;
};
