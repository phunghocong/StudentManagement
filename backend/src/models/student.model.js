module.exports = mongoose => {
  var studentSchema = mongoose.Schema(
    {
      studentID: String,
      //Basic info
      firstName: String,
      surName: String,
      birthday: String,
      national: String,//Viet nam
      ethnic: String,//King
      gender: String,
      religion: String,//Dao phat 
      bornAddress: String,
      homeAddress: String,
      citizenCardId: String, //chung minh thu

      //contact
      currentAddress: String,
      phoneNumber: String,
      email: String,
      fatherPhoneNumber: String,
      motherPhoneNumber: String,
      //activity info


      //school info
      school: String,// UET
      academyMethod: String, //chinh quy...
      levelOfAcademy: String, //University, Doctorate
      schoolYearGroup: String, //K64,.. ??
      baseClass: String, //CA-CLC4
      major: String,//Khoa hoc may tinh
      startedYear: String,
      //School activity
      majorAchievement: { type: Array, "default": [] },
      GPA: String,
      conduct: { type: Array, "default": [] },
      //For moderator
      managedBy: String,
      note: String,
    },
    { timestamps: true } 
  );
  studentSchema.index()
  studentSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const student = mongoose.model("student", studentSchema);

  return student;
};