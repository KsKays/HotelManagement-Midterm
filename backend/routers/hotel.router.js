const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotel.controller");
const { authJwt } = require("../middlewares");

//Create a Hotels ( Admin and Mod can use it! )
//PORT =>  http://localhost:5000/api/v1/hotel/
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModOrAdmin],
  hotelController.create
);

//Get all Hotels
router.get("/all", hotelController.getAll);

//Get ById Hotels
router.get("/room/:id", [authJwt.verifyToken], hotelController.getById);

//Update a Hotels ( Admin and Mod can use it! )
router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isModOrAdmin],
  hotelController.update
);

//Delete a Hotels ( Admin can use it! )
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  hotelController.delete
);

// Hotel Search
router.get("/search", hotelController.hotelSearch);

module.exports = router;
