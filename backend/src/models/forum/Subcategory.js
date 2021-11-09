const shortid = require('shortid');
module.exports = mongoose => {
    var categorySchema = mongoose.Schema({
        shortid: {
            type: String,
            unique: true,
            default: shortid.generate,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
        lastpost: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
        topics: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Topic',
        }, ],
    });

    categorySchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Subcategory = mongoose.model('Subcategory', subcategorySchema);
    return Category;
};