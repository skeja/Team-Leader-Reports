module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('team', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 50] }
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    timestamps: true
  });

  Team.associate = function ({ user, teamHistory }) {
    this.hasMany(teamHistory, {
      foreignKey: { name: 'teamId', field: 'team_id' }
    });
  };
  return Team;
};
