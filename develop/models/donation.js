  module.exports = function(sequelize, DataTypes) {
    var Donation = sequelize.define("Donation", {
      money: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1,500]
        }
      }
    });
  
    Donation.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Donation.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Donation;
  };