module.exports = (sequelize, Datatypes) => {
  const Paycard = sequelize.define(
    "Paycard",
    {
      purchase_corp: {type: Datatypes.STRING(100), allowNull: false},
      issuer_corp: {type: Datatypes.STRING(400), allowNull: false},
      bin: {type: Datatypes.STRING(600), allowNull: false},
      card_type: {type: Datatypes.STRING(500), allowNull: false},
      install_month: {type: Datatypes.STRING(500), allowNull: false},
      approve_id: {type: Datatypes.STRING(500), allowNull: false},
      card_item_code: {type: Datatypes.STRING(500), allowNull: false},
    },
    {charset: "utf8", collate: "utf8_general_ci"}
  );
};
