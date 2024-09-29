const express = require("express");
const app = express();
require("dotenv").config();
const fontend_url = process.env.FONTEND_URL;

const PORT = process.env.PORT || 5000;
const hotelRouter = require("./routers/hotel.router");
const bookingRouter = require("./routers/booking.router");
const authRouter = require("./routers/auth.router");
const db = require("./models/"); //index
const role = db.Role;
const cors = require("cors");

const coreOption = {
  origin: fontend_url,
};

//Dev Mode
// db.sequelize.sync({ force: true }).then(() => {
//   initRole();
//   console.log("Drop and Sync Database");
// });

const initRole = () => {
  role.create({ id: 1, name: "user" });
  role.create({ id: 2, name: "moderator" });
  role.create({ id: 3, name: "admin" });
};

//use Middleware
app.use(cors(coreOption)); //cors
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use Router
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/hotel", hotelRouter);
app.use("/api/v1/auth/", authRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello Hotel API</h1>");
});

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
