module.exports = (sequelize, Datatypes) => {
  const Picstory = sequelize.define(
    "Picstory",
    {
      name: {type: Datatypes.STRING(48), allowNull: false},
    },
    {charset: "utf8", collate: "utf8_general_ci"}
  );
};
