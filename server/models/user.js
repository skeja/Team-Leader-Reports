const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mail = require('../shared/mail');

const saltRounds = parseInt(process.env.SALT_ROUNDS);
const AUTH_SECRET = process.env.SECRET_OR_KEY;

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
      validate: { notEmpty: true, len: [5, 100] }
    },
    token: {
      type: DataTypes.STRING,
      unique: true
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
    role: DataTypes.ENUM('ADMIN', 'TEAM_LEAD', 'DEVELOPER')
  }, {
    timestamps: true
  });

  User.beforeCreate((user, options) => {
    return hashPassword(user);
  });

  User.beforeUpdate((user, options) => {
    return user.changed('password')
      ? hashPassword(user)
      : Promise.resolve();
  });

  User.prototype.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.prototype.createToken = function (options = {}) {
    const payload = { id: this.id };
    return jwt.sign(payload, AUTH_SECRET, options);
  };

  User.prototype.sendResetToken = function () {
    this.token = this.createToken({ expiresIn: '2 days' });
    mail.resetPassword(this);
    return this.save();
  };

  User.associate = function ({ projectHistory, team, teamHistory, report, office }) {
    this.hasMany(projectHistory, {
      foreignKey: { name: 'userId', field: 'user_id' }
    });
    this.hasMany(teamHistory, {
      foreignKey: { name: 'userId', field: 'user_id' }
    });
    this.hasMany(report, {
      foreignKey: { name: 'reporterId', field: 'reporter_id' },
      as: 'writtenReports'
    });
    this.hasMany(report, {
      foreignKey: { name: 'subjectId', field: 'subject_id' },
      as: 'reports'
    });
    this.belongsTo(team, {
      foreignKey: { name: 'teamId', field: 'team_id' }
    });
    this.belongsTo(office, {
      foreignKey: { name: 'officeId', field: 'office_id' }
    });
  };

  function hashPassword(user) {
    return bcrypt.hash(user.password, saltRounds)
      .then(hash => {
        user.password = hash;
      });
  }

  return User;
};
