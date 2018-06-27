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
      foreignKey: { name: 'reporterId', field: 'reporter_id' },
      as: 'reporter'
    });
    this.belongsTo(user, {
      foreignKey: { name: 'subjectId', field: 'subject_id' },
      as: 'subject'
    });
  };

  return Report;
};
