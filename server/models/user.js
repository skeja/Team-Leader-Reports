const bcrypt = require('bcrypt');

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

  return User;
};
