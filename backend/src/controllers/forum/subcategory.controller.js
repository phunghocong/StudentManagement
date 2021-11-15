const db = require("../../models");
const passport = require('passport');

const subcategoryController = db.subcategoryController;
const Subcategory = require('../models/forum/Subcategory');
const Category = require('../models/forum/Category');
const Topic = require('../models/forum/Topic');


// retrieve all subcategories
subcategoryController.get('/', (req, res) => {
    console.log('hit / route');
    Subcategory.find()
        .populate('topics')
        .populate('topics.posts')
        .then(subcategories => {
            res.status(200).json(subcategories);
        });
});


// get basic info from a single subcategory
subcategoryController.get('/info', (req, res) => {
    const { sid } = req.query;
    Subcategory.findOne({ shortid: sid }, '-topics')
        .then(subcategory => {
            return res.status(200).json(subcategory);
        })
        .catch(err =>
            res.status(400).json({ msg: 'Failed to get info of subcategory', err })
        );
});


// get all topics from a subcategory
subcategoryController.get('/topics', (req, res) => {
    const { page = 1, limit = 10, sid = null } = req.query;
    const result = { currentPage: page };

    if (!sid) {
        return res.status(400).json({ msg: 'No shortid provided.' });
    }

    Subcategory.findOne({ shortid: sid })
        .populate({
            path: 'topics',
            options: {
                limit,
                skip: (page - 1) * limit,
                sort: { updatedAt: -1 },
            },
            populate: {
                path: 'lastpost',
                select: '-message',
                populate: {
                    path: 'author',
                    select: 'username',
                },
            },
        })
        .lean()
        .then(subcategory => {
            result.topics = subcategory.topics;
            result.name = subcategory.name;
            result.description = subcategory.description;

            return Topic.countDocuments({ subcategory: subcategory._id });
        })
        .then(count => {
            result.totalPages = Math.ceil(count / limit);
            return res.status(200).json(result);
        })
        .catch(err =>
            res.status(400).json({ msg: 'Failed to get info of subcategory.', err })
        );
});


// add a new subcategory
subcategoryController.post(
    '/add',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { name, description, category } = req.body;
        const newSubcategory = new Subcategory({
            name,
            description,
            category,
        });

        newSubcategory
            .save()
            .then(subcategory => {
                Category.findById(category).then(c => {
                    c.subcategories.push(newSubcategory);
                    c.save().then(() => {
                        res.status(200).json({ subcategory });
                    });
                });
            })
            .catch(err => res.json({ msg: 'Failed to add a new subcategory', err }));
    }
);


// update a subcategory
subcategoryController.post(
    '/update',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Subcategory.findByIdAndUpdate(req.body.id, req.body, {
                useFindAndModify: false,
            })
            .then(subcategory =>
                res.status(200).json({ msg: 'Subcategory updated', subcategory })
            )
            .catch(err =>
                res.status(400).json({ msg: 'Failed to update subcategory', err })
            );
    }
);


// delete a subcategory
subcategoryController.post(
    '/delete',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Subcategory.findByIdAndDelete(req.body.id)
            .then(() => res.status(200).json({ msg: 'Subcategory deleted' }))
            .catch(err =>
                res.status(400).json({ msg: 'Failed to delete subcategory', err })
            );
    }
);

module.exports = subcategoryController;