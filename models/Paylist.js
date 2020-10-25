module.exports = (sequelize, DataTypes) => {
  const Paylist = sequelize.define(
    "Paylist",
    {
      tid: {type: DataTypes.STRING(1024), allowNull: false},
      pay_state: {type: DataTypes.STRING(1024), allowNull: false},
      payment_method_type: {type: DataTypes.STRING(1024), allowNull: false},
      amount: {type: DataTypes.STRING(1024), allowNull: false},
      card_info: {type: DataTypes.STRING(1024)},
      item_name: {type: DataTypes.STRING(1024), allowNull: false},
      item_code: {type: DataTypes.STRING(1024), allowNull: false},
      quantity: {type: DataTypes.INTEGER},
      approved_at: {type: DataTypes.DATE, allowNull: false},
      payload: {type: DataTypes.STRING(1024)},
      our_payinfo: {
        type: DataTypes.TINYINT(8),
        allowNull: false,
        defaultValue: 0,
      },
      ship_company: {type: DataTypes.STRING(50)},
      ship_code: {type: DataTypes.STRING(40)},
      ship_updatedAt: {type: DataTypes.DATE},
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Paylist.associate = (db) => {
    db.Paylist.hasOne(db.Cancel);
    db.Paylist.hasOne(db.Paycard);
    db.Paylist.belongsTo(db.User);
    db.Paylist.belongsTo(db.Photo);
  };
  return Paylist;
};
