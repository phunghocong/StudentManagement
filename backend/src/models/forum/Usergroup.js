module.exports = mongoose => {
    var userGroupSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        auth_level: {
            type: Number,
            required: true,
        },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    });

    userGroupSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const UserGroup = mongoose.model('UserGroup', userGroupSchema);
    return UserGroup;
};