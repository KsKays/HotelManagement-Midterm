// เขียน Design pattern แบบ "Singleton"
const { DataType, DataTypes } = require("sequelize");
const sequelize = require("./db");

//define DB Schema

//สร้างชื่อของ Table Restaurant และสร้างข้อมูล(attribute)
const Hotel = sequelize.define("hotel", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  roomNumber: {
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
  isAvailable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

Hotel.sync({ force: false })
  .then(() => {
    console.log("Table created or already exists");
  })
  .catch((error) => {
    console.log("Error creating table: ", error);
  });

module.exports = Hotel;
