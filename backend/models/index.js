const sequelize = require("./db"); //obj database
const Sequelize = require("sequelize") //class from pakage sequelize
const User = require("./user.model");
const Role = require("./role.model");

const db ={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Role = Role;

//Association (1toM)
db.User.belongsToMany(db.Role, {
    through: "user_roles"
});
//Association (1toM)
db.Role.belongsToMany(db.User, {
    through:"user_roles"
})

module.exports = db;