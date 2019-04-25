'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {msg: 'must be a valid email!'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "standard"
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Wiki, {
      foreignKey: 'userId',
      as: 'wikis'
    });
  };

  User.prototype.isAdmin = function() {
    return this.role === 'admin';
  };
  User.prototype.isOwner = function(userId) {
    return this.id === userId;
  };
  // User.prototype.promoteUser = function(userId) {
  //   console.log('{MODEL} INSIDE PROMOTEUSER() 1: ', this.role);
  //   this.setDataValue('role', 'premium');
  //   console.log('{MODEL} INSIDE PROMOTEUSER() 2: ', this.role);
  // }
  
  return User;
};