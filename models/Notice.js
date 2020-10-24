module.exports = (sequelize, Datatypes) => {
  const Notice = sequelize.define(
    "Notice",
    {
      title: {type: Datatypes.STRING(200), allowNull: false},
      content: {type: Datatypes.TEXT, allowNull: false},
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
};
