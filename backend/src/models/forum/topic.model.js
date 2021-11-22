const shortid = require('shortid');
module.exports = mongoose => {
    var topicSchema = mongoose.Schema({
        shortid: {
            type: String,
            unique: true,
            default: shortid.generate,
        },
        title: {
            type: String,
            required: true,
        },
        subtitle: String,
        subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subcategory',
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'account',
        },
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        }, ],
        lastpost: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
    }, { timestamps: true });

    topicSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Topic = mongoose.model('Topic', topicSchema);
    return Topic;
};