module.exports = (sequelize, DataTypes) => {
  const Office = sequelize.define('office', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
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

  Office.associate = function ({ user }) {
    this.hasMany(user, {
      foreignKey: { name: 'officeId', field: 'office_id' }
    });
  };
  return Office;
};
