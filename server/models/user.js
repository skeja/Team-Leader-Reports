const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const saltRounds = parseInt(process.env.SALT_ROUNDS);

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    role: DataTypes.ENUM('ADMIN', 'TEAM_LEAD', 'DEVELOPER'),
    office: DataTypes.STRING
  }, {
    timestamps: true
  }
  );

  User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, saltRounds)
      .then(hash => {
        user.password = hash;
      });
  });

  User.prototype.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.associate = function ({ projectHistory, team, teamHistory, report }) {
    this.hasMany(projectHistory, {
      foreignKey: { name: 'userId', field: 'user_id' }
    });
    this.hasMany(teamHistory, {
      foreignKey: { name: 'userId', field: 'user_id' }
    });
    this.hasMany(report, {
      foreignKey: { name: 'reporterId', field: 'reporter_id' }
    });
    this.hasMany(report, {
      foreignKey: { name: 'subjectId', field: 'subject_id' }
    });
  };

  return User;
};
