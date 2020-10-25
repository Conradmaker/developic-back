module.exports = (sequelize, Datatypes) => {
  const Picstory = sequelize.define(
    "Picstory",
    {
      name: {type: Datatypes.STRING(48), allowNull: false},
    },
    {charset: "utf8", collate: "utf8_general_ci"}
  );
  Picstory.associate = (db) => {
    db.Picstory.belongsTo(db.User);
    db.Picstory.belongsToMany(db.Photo, {through: "PicPhotos"});
  };
  return Picstory;
};
