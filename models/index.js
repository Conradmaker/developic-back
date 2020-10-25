const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = require("./User")(sequelize, Sequelize);
db.Photo = require("./Photo")(sequelize, Sequelize);
db.Picstory = require("./Picstory")(sequelize, Sequelize);
db.Apply = require("./Apply")(sequelize, Sequelize);
db.Cancel = require("./Cancel")(sequelize, Sequelize);
db.CDclare = require("./CDeclare")(sequelize, Sequelize);
db.PDclare = require("./PDclare")(sequelize, Sequelize);
db.Comment = require("./Comment")(sequelize, Sequelize);
db.Qna = require("./Qna")(sequelize, Sequelize);
db.Faq = require("./Faq")(sequelize, Sequelize);
db.Notice = require("./Notice")(sequelize, Sequelize);
db.Paycard = require("./Paycard")(sequelize, Sequelize);
db.Paylist = require("./Paylist")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
