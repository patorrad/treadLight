  module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,500]
        }
      }, 
      pwd: {
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
    
      return User;
    };