module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {type: DataTypes.STRING(400), allowNull: false},
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
};
