const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/booking.controller");
const { authJwt } = require("../middlewares");

//Create a restaurant ( Admin and Mod can use it! )
//PORT =>  http://localhost:5000/api/v1/booking/
router.post("/", [authJwt.verifyToken], BookingController.create);

//Get all restaurant
router.get("/", BookingController.getAll);

//Get ById restaurant
router.get("/:id", [authJwt.verifyToken], BookingController.getById);

//Update a restaurant ( Admin and Mod can use it! )
router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isModOrAdmin],
  BookingController.update
);

//Delete a restaurant ( Admin can use it! )
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  BookingController.delete
);

module.exports = router;
