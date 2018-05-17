module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('report', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
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

  Report.associate = function ({ user }) {
    this.belongsTo(user, {
      foreignKey: { as: 'reporter', name: 'reporterId', field: 'reporter_id' }
    });
    this.belongsTo(user, {
      foreignKey: { as: 'subject', name: 'subjectId', field: 'subject_id' }
    });
  };

  return Report;
};
