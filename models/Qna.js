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
  Qna.associate = (db) => {
    db.Qna.belongsTo(db.User, {as: "QueUser"});
    db.Qna.belongsTo(db.User, {as: "AnsUser"}); //안되면 Entity로 올리자.
  };
  return Qna;
};
