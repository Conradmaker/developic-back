module.exports = (sequelize, DataTypes) => {
  const Qna = sequelize.define(
    "Qna",
    {
      title: {type: DataTypes.STRING(400), allowNull: false},
      que_content: {type: DataTypes.TEXT, allowNull: false},
      ans_content: {type: DataTypes.TEXT},
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
};
