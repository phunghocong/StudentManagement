const db = require("../../models");

const postController = db.postController;
const Topic = require('../../models/forum/Topic');
const Post = require('../../models/forum/Post');
const User = require('../../models/account.model');
const Subcategory = require('../models/forum/Subcategory');


// get info from a single post
exports.getByID = (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.status(200).json({ post }))
        .catch(err =>
            res.status(400).json({ msg: 'Failed to get info of post', err })
        );
}


// create a new post
exports.addNewPost = (req, res) => {
    const { message, author, topic } = req.body;
    const newPost = new Post({
        message,
        author,
        topic,
    });
    const limit = 10;

    newPost
        .save()
        .then(savedPost => {
            const post = savedPost.toObject();

            User.findByIdAndUpdate(
                    author, { $push: { posts: post._id } }, { useFindAndModify: false }
                )
                .lean()
                .then(() => {
                    return Topic.findByIdAndUpdate(
                        topic, { $set: { lastpost: post._id }, $push: { posts: post._id } }, { useFindAndModify: false }
                    );
                })
                .then(updatedTopic => {
                    return Subcategory.findByIdAndUpdate(
                        updatedTopic.subcategory, { $set: { lastpost: post._id } }, { useFindAndModify: false }
                    );
                })
                .then(() => {
                    return Post.countDocuments({ topic });
                })
                .then(count => {
                    post.topicTotalPages = Math.ceil(count / limit);

                    return Post.findById(post._id, 'author')
                        .lean()
                        .populate({
                            path: 'author',
                            populate: {
                                path: 'usergroup',
                                select: '-users',
                            },
                        });
                })
                .then(populatedPost => {
                    populatedPost.author.topicCount =
                        populatedPost.author.topics.length;
                    populatedPost.author.postCount = populatedPost.author.posts.length;

                    post.author = populatedPost.author;

                    return res.status(200).json({ post });
                });
        })
        .catch(err => res.json({ msg: 'Failed to add a new post', err }));
}


// update a post
exports.update = (req, res) => {
    Post.findByIdAndUpdate(req.body.id, req.body, {
            useFindAndModify: false,
        })
        .then(post => res.status(200).json({ msg: 'Post updated', post }))
        .catch(err =>
            res.status(400).json({ msg: 'Failed to update post', err })
        );
}



// delete a post
exports.delete = (req, res) => {
    Post.findByIdAndDelete(req.body.id)
        .then(post => {
            User.findByIdAndUpdate(
                    post.author, { $pull: { posts: post._id } }, { useFindAndModify: false }
                )
                .then(() => {
                    return Topic.findByIdAndUpdate(
                        post.topic, { $pull: { posts: post._id } }, { useFindAndModify: false }
                    );
                })
                .then(() => {
                    return res.status(200).json({ msg: 'Post deleted' });
                });
        })
        .catch(err =>
            res.status(400).json({ msg: 'Failed to delete post', err })
        );
}

module.exports = exports.create;