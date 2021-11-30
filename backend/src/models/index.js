const dbConfig = require("../config/config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.students = require("./student.model.js")(mongoose);
//db.programs = require("./program.model.js")(mongoose);
db.accounts = require("./account.model.js")(mongoose);
db.tutorials = require("./tutorial.model.js")(mongoose);
//forum
/*db.userController = require('./forum/user.controller');
db.userGroupController = require('./forum/userGroup.controller');
db.categoryController = require('./forum/category.controller');
db.subcategoryController = require('./forum/subcategory.controller');
db.topicController = require('./forum/topic.controller');
db.postController = require('./forum/post.controller');
db.statsController = require('./forum/stats.controller');*/
//end forum
db.topic = require("./topic.model")(mongoose);
// db.forumCUsergroup = require("./forum/Usergroup.js")(mongoose);

//db.chatRecords = require("./chatRecord.model.js")(mongoose);
db.classRecords = require("./classRecord.model.js")(mongoose);
//db.activityRecords = require("./activityRecord.model.js")(mongoose);
//db.notificationRecords = require("./notificationRecord.model.js")(mongoose);

module.exports = db;
