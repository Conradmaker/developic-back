module.exports = (sequelize, DataTypes) => {
  const Faq = sequelize.define(
    "Faq",
    {
      title: {type: DataTypes.STRING(300), allowNull: false},
      content: {type: DataTypes.TEXT, allowNull: false},
    },
    {charset: "utf8", collate: "utf8_general_ci"}
  );
};
