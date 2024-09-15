// เขียน Design pattern แบบ "Singleton"
const { DataType, DataTypes } = require("sequelize");
const sequelize = require("./db");

//define DB Schema

const Hotel = sequelize.define("hotel", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  roomName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roomType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roomImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roomDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roomPrice: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Hotel.sync({ force: false })
  .then(() => {
    console.log("Hotel Table created or already exists");
  })
  .catch((error) => {
    console.log("Error creating table: ", error);
  });

module.exports = Hotel;
