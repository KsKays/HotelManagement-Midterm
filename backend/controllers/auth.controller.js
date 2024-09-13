const config = require("../config/auth.config");
const db = require("../models"); //index
const User = db.User;
const Role = db.Role;
const jwt = require("jsonwebtoken"); // npm i jsonwebtoken
const bcrypt = require("bcryptjs"); // npm i bcryptjs
const { Op } = require("sequelize");

//Register a new user
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).send({
      message: "Please provide all required fields!",
    });
    return;
  }

  //Prepare user data
  const newUser = {
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 8),
  };

  //Save user in the database
  await User.create(newUser)
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: { [Op.or]: req.body.roles },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({
              message: "User registered successfully!",
            });
          });
        });
      } else {
        //set default role to "user" id = 1
        user.setRoles([1]).then(() => {
          res.send({
            message: "User registered successfully!",
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occured while creating the user.",
      });
    });
};

//update 18/07/2567
//Signin
exports.signin = async (req, res) => {
  const { username, password } = req.body;
  if (!username && !password) {
    res.status(400).send({
      message: "Please provide al required fields",
    });
    return;
  }

  //SELECT * FROM User where username = "username"
  await User.findOne({
    where: { username: username },
  }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    // เอา password ไปทำการ Hash
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      res.status(401).send({
        accessToken: null,
        message: "Invalid password!",
      });
    }
    //ถ้าผ่านจะเข้าขั้นตอน jwt
    const token = jwt.sign({ id: user.username }, config.secret, {
      expiresIn: 86400, // 24Hours
    });
    const authorities = [];
    user
      .getRoles()
      .then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLES_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message || "Something error occured while creating the user.",
        });
      });
  });
};
