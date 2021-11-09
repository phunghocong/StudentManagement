const shortid = require('shortid');
module.exports = mongoose => {
    var postSchema = mongoose.Schema({
        shortid: {
            type: String,
            unique: true,
            default: shortid.generate,
        },
        message: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'account',
        },
        topic: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Topic',
        },
    }, { timestamps: true });

    postSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Post = mongoose.model('Post', postSchema);
    return Post;
};