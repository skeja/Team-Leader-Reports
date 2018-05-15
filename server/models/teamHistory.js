module.exports = (sequelize, DataTypes) => {
  const TeamHistory = sequelize.define('team_history', {
    startDate: {
      type: DataTypes.DATE,
      field: 'start_date'
    },
    endDate: {
      type: DataTypes.DATE,
      field: 'end_date'
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

  TeamHistory.associate = function ({team, user}) {
    this.belongsTo(team, {
      foreignKey: { name: 'teamId', field: 'team_id' }
    });
    this.belongsTo(user, {
      foreignKey: { name: 'userId', field: 'user_id' }
    });
  };
  return TeamHistory;
};
