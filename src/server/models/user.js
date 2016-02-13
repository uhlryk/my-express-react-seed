export default function user(sequelize, DataTypes) {
  var STATUS = {
    INACTIVE: 'I',
    ACTIVE: 'A'
  };

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
    },
    status: {
      type: DataTypes.CHAR(1),
      defaultValue: STATUS.INACTIVE
    },
  }, {
    classMethods: {
      associate: (models) => {},
      STATUS
    }
  });
}
