module.exports = mongoose => {
  var studentSchema = mongoose.Schema(
    {
      studentID: String,//19021111
      //Basic info
      firstName: String,
      surName: String,
      birthday: Date,
      national: String,//Viet nam
      ethnic: String,//King
      religion: String,//Dao phat
      bornAddress: String,
      citizenCardId: String, //chung minh thu

      //contact
      currentAddress: String,
      phoneNumber: String,
      email: String,

      //activity info
      //military
      isEnlisted : Boolean,
      draftDate : Date,

      //school info
      school: String,// UET
      academyMethod : String, //chinh quy...
      levelOfAcademy: String, //University, Doctorate
      schoolSessionGroup : String, //K64,.. ??
      baseClass: String, //CA-CLC4
      major: String,//Khoa hoc may tinh
      startedYear: String,
      //School activity
      majorAchievement: {type : Array,"default":[]},
      GPA: { type: Array, "default": [] },
      conduct: { type: Array, "default": [] }


    },
    { timestamps: true }
  );

  studentSchema.method("toJSON", () => {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const student = mongoose.model("student", studentSchema);
  return student;
};
