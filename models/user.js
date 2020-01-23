  //npm package import, bcrypt does the encrypting for us
var bcrypt = require('bcrypt');
  
  module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [1,500]
        }
      }, 
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,500]
        }
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,500]
        }
      }, 
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,500]
        }
      },
      default_car: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1,500]
        }
      },
      default_city: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1,500]
        }
      }
    });
  
    User.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        User.hasMany(models.Trip, {
          onDelete: "cascade"
        });
        User.hasMany(models.Donation, {
            onDelete: "cascade"
          });
      };

          //sequelize hook, will run before model instance is created and hash password
    User.beforeCreate(function(user) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    
      return User;
    };