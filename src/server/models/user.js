export default function user(sequelize, DataTypes) {
  return sequelize.define('users', {
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    classMethods: {
      associate: (models) => {}
    }
  });
}
