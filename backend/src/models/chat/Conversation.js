module.exports = mongoose => {
    var conversationSchema = mongoose.Schema({
        members: {
            type: Array,
        },

    }, { timestamps: true });

    conversationSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const conversation = mongoose.model('Conversation', conversationSchema);
    return conversation;
};