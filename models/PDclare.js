module.exports = (sequelize, DataTypes) => {
  const PDclare = sequelize.define(
    "PDclare",
    {
      reason: {type: DataTypes.STRING(600), allowNull: false},
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  PDclare.associate = (db) => {
    db.PDclare.belongsTo(db.User);
    db.PDclare.belongsTo(db.Photo);
  };
  return PDclare;
};
