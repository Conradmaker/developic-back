module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {type: DataTypes.STRING(30), allowNull: false, unique: true},
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
        type: Datatypes.DATE(50),
        defalutValue: sequelize.literal("now()"),
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
};
