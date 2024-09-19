const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/booking.controller");
const { authJwt } = require("../middlewares");

//Create a Bookings ( Admin and Mod can use it! )
//PORT =>  http://localhost:5000/api/v1/booking/
router.post("/", [authJwt.verifyToken], BookingController.create);

//Get all Bookings
router.get(
  "/",
  [authJwt.verifyToken, authJwt.isModOrAdmin],
  BookingController.getAll
);

//Get ById Bookings
router.get("/:id", [authJwt.verifyToken], BookingController.getById);

//Update a Bookings ( Admin and Mod can use it! )
router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isModOrAdmin],
  BookingController.update
);

//Delete a Bookings ( Admin can use it! )
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  BookingController.delete
);

module.exports = router;
