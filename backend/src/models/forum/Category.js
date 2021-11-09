module.exports = mongoose => {
    var categorySchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }],
    });

    categorySchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Category = mongoose.model('Category', categorySchema);
    return Category;
};