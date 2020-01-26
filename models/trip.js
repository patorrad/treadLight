  module.exports = function(sequelize, DataTypes) {
    var Trip = sequelize.define("Trip", {
      used_carbon: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1,500]
        }
      },
      saved_carbon: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1,500]
        }
      },
      travel_mode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      starting_city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ending_city: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    Trip.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Trip.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Trip;
  };