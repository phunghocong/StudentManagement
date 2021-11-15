module.exports = mongoose => {
  
 
  var classRecordSchema = mongoose.Schema(
    {
      classname: String, //INT2021_22
      subjectName: String,//Toán cao cấp
      subjectCredit: String,//2,3
      belongToStudent: String,//MSSV
      year: String,//2015
      semeter: String,//1 or 2
      midtermGrade: String,//0-10
      grade: String,//0-10
    }
  );
 
  classRecordSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const classRecord = mongoose.model("classRecord", classRecordSchema);
  return classRecord;
};
