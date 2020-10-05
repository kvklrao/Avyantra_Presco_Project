
const { DataTypes, BOOLEAN } = require('sequelize');

const { sequelize } = require('../sequelize')

const DashboardUser = sequelize.define('DashboardUser', {
  // Model attributes are defined here
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  hospital_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  hospital_branch_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  is_primary_user: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  hospital_access: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  branch_access: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

}, {
  tableName: 'dashboard_users'
});

// `sequelize.define` also returns the model
//console.log(DashboardUser === sequelize.models.User); // true

module.exports = DashboardUser