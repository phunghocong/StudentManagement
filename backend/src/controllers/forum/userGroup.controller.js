const db = require("../../models");

const UserGroup = require('../models/UserGroup');


// retrieve all user groups
exports.getAll = (req, res) => {
    UserGroup.find().then(usergroups => {
        res.status(200).json({
            usergroups,
        });
    });
}


// get info from a single user group
exports.getById = (req, res) => {
    UserGroup.findById(req.params.id)
        .then(usergroup => res.status(200).json({ usergroup }))
        .catch(err =>
            res.status(400).json({ msg: 'Failed to get info of user group', err })
        );
}


// add a new user group
exports.addNewUserGroup = (req, res) => {
    const { name, auth_level } = req.body;
    const newUserGroup = new UserGroup({
        name,
        auth_level,
    });

    newUserGroup
        .save()
        .then(usergroup => res.status(200).json({ usergroup }))
        .catch(err => res.json({ msg: 'Failed to add a new user group', err }));
}



// update an usergroup
exports.update = (req, res) => {
    UserGroup.findByIdAndUpdate(req.body.id, req.body, {
            useFindAndModify: false,
        })
        .then(usergroup =>
            res.status(200).json({ msg: 'User group updated', usergroup })
        )
        .catch(err =>
            res.status(400).json({ msg: 'Failed to update user group', err })
        );
}



// delete an usergroup
exports.delete = (req, res) => {
    UserGroup.findByIdAndDelete(req.body.id)
        .then(() => res.status(200).json({ msg: 'User group deleted' }))
        .catch(err =>
            res.status(400).json({ msg: 'Failed to delete user group', err })
        );
}


module.exports = exports.create;