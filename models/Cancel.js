module.exports = (sequelize, DataTypes) => {
  const Cancel = sequelize.define(
    "Cancel",
    {
      reason: {type: DataTypes.STRING(128)},
      state: {type: DataTypes.TINYINT(8), allowNull: false, defaultValue: 0},
    },
    {charset: "utf8", collate: "utf8_general_ci"}
  );
};
