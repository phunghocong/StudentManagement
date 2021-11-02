module.exports = mongoose => {
  
  var programSchema = mongoose.Schema(
    {
      title: String,
      description: String,
      minimunCredit: String,
      forcedSubject: {String:Array, "default" :[]},//or type:Array, check pls
      published: Boolean
    },
    { timestamps: false }
  );
 
  programSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const program = mongoose.model("program", programSchema);
  return program;
};
