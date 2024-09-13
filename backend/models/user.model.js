const { DataType, DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    primaryKey: true, //ถึงไม่ใส่ primaryKey แต่ Sequlize ก็เพิ่มให้ auto
    //unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
