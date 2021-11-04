const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.students = require("./student.model.js")(mongoose);
//db.programs = require("./program.model.js")(mongoose);
db.accounts = require("./account.model.js")(mongoose);
db.tutorials = require("./tutorial.model.js")(mongoose);
//db.chatRecords = require("./chatRecord.model.js")(mongoose);
db.classRecords = require("./classRecord.model.js")(mongoose);
//db.activityRecords = require("./activityRecord.model.js")(mongoose);
//db.notificationRecords = require("./notificationRecord.model.js")(mongoose);

module.exports = db;
