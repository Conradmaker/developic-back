module.exports = (sequelize, Datatypes) => {
  const Photo = sequelize.define(
    "Photo",
    {
      name: {type: Datatypes.STRING(248), allowNull: false}, //작품명
      sale: {type: Datatypes.BOOLEAN, allowNull: false}, //판매여부
      price: {type: Datatypes.INTEGER}, //가격
      state: {type: Datatypes.TINYINT(8), allowNull: false, defaultValue: 0}, //작품상태
      image_src: {type: Datatypes.STRING(300), allowNull: false}, //이미지경로
      info: {type: Datatypes.TEXT, allowNull: false}, //작품정보
      catagory: {type: Datatypes.TINYINT(8), allowNull: false, defaultValue: 4}, //카테고리
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Photo.associate = (db) => {
    db.Photo.hasOne(db.Paylist);
    db.Photo.hasMany(db.Comment);
    db.Photo.hasMany(db.PDclare);
    db.Photo.belongsTo(db.User);
    db.Photo.belongsToMany(db.User, {through: "Like", as: "Likers"});
    db.Photo.belongsToMany(db.User, {through: "Cart", as: "Shoper"});
    db.Photo.belongsToMany(db.Picstory, {through: "PicPhotos"});
  };
  return Photo;
};
