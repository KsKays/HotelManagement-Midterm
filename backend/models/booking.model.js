const { DataType, DataTypes } = require("sequelize");
const sequelize = require("./db");
const Hotel = require("./hotel.model");

// Booking ทำการจอง
const Booking = sequelize.define("booking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  roomName: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Hotel, // foreign key to Room model
      key: "roomName",
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  checkIn: {
    type: DataTypes.DATEONLY, // YYYY-MM-DD
    allowNull: false,
  },
  checkOut: {
    type: DataTypes.DATEONLY, // YYYY-MM-DD
    allowNull: false,
  },
  bookingStatus: {
    type: DataTypes.ENUM("confirmed", "cancelled"),
    defaultValue: "confirmed",
  },
  personAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Booking.sync({ force: false })
  .then(() => {
    console.log("Booking Table created or already exists");
  })
  .catch((error) => {
    console.log("Error creating table: ", error);
  });

module.exports = Booking;
