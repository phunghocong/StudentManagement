const authorityLevel = [
    "", "NONE",//Hoc sinh
    "MOD", "MODERATOR",//Quan ly
    "CON", "CONSULTANT",//Co van hoc tap
    "ADMIN", "ADMINISTRATOR"]// Admin]
module.exports = mongoose => {
    var accountSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        surName: String,
        email: String,
        published: Boolean,
        messageOn: Boolean,
        avatarColor: String,
        authorityLevel: String,
        notification: [
            { read: Boolean,
            title: String,
            message: String,
            createTime: String,
            } ],
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
        topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }]
    }, { timestamps: true });

    accountSchema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Account = mongoose.model("account", accountSchema);
    return Account;
};