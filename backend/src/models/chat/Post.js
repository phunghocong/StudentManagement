module.exports = mongoose => {
    var postSchema = mongoose.Schema({
        userId: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            max: 500,
        },

    }, { timestamps: true });

    postSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const post = mongoose.model('Post', postSchema);
    return post;
};