module.exports = (sequelize, DataTypes) => {
  const CDclare = sequelize.define(
    "CDclare",
    {
      reason: {type: DataTypes.STRING(600), allowNull: false},
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  CDclare.associate = (db) => {
    db.CDclare.belongsTo(db.User);
    db.CDclare.belongsTo(db.Comment);
  };
  return CDclare;
};
