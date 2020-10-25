module.exports = (sequelize, DataTypes) => {
  const Apply = sequelize.define(
    "Apply",
    {
      reason: {type: DataTypes.STRING(200)},
      progress: {type: DataTypes.TINYINT(8), defaultValue: 0},
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Apply.associate = (db) => {
    db.Apply.belongsTo(db.User);
  };
  return Apply;
};
