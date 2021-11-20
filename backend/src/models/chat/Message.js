module.exports = mongoose => {
    var messageSchema = mongoose.Schema({
        conversationId: {
            type: String,
        },
        sender: {
            type: String,
        },
        text: {
            type: String,
        },
    }, { timestamps: true });

    messageSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const message = mongoose.model('Message', messageSchema);
    return message;
};