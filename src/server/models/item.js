export default function item(sequelize, DataTypes) {
  return sequelize.define('items', {
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: (models) => {}
    }
  });
}
