module.exports = (sequelize, DataTypes) => {
  const ProjectHistory = sequelize.define('project_history', {
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

  ProjectHistory.associate = function ({ user, project }) {
    this.belongsTo(user, {
      foreignKey: { name: 'userId', field: 'user_id' } });
    this.belongsTo(project, {
      foreignKey: { name: 'projectId', field: 'project_id' } });
  };
  return ProjectHistory;
};
