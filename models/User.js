module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      password: {type: DataTypes.STRING(30), allowNull: false},
      email: {type: DataTypes.STRING(40), allowNull: false},
      nickname: {type: DataTypes.STRING(30), allowNull: false},
      phone: {type: DataTypes.STRING(24)},
      address: {type: DataTypes.STRING(200)},
      sns: {type: DataTypes.STRING(100)},
      info: {type: DataTypes.TEXT},
      avatar: {type: DataTypes.STRING(100)},
      role: {type: DataTypes.TINYINT(8), defaultValue: 0},
      lastLogin: {
        type: DataTypes.DATE,
        defalutValue: sequelize.literal("now()"),
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  User.associate = (db) => {
    db.User.hasOne(db.Apply);
    db.User.hasMany(db.Photo);
    db.User.hasMany(db.Comment);
    db.User.hasMany(db.CDclare);
    db.User.hasMany(db.PDclare);
    db.User.hasMany(db.Notice);
    db.User.hasMany(db.Faq);
    db.User.hasMany(db.Cancel);
    db.User.hasMany(db.Paylist);
    db.User.hasMany(db.Picstory);
    db.User.belongsToMany(db.Photo, {through: "Like", as: "Liked"});
    db.User.belongsToMany(db.Photo, {through: "Cart", as: "CartIn"});
  };
  return User;
};
