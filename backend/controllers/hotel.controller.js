const { where } = require("sequelize");
const Hotel = require("../models/hotel.model"); //ต้อง import >> (../models/restaurant.model)

//Create and Save a new Hotel
exports.create = async (req, res) => {
  const { roomNumber, roomType, roomImage } = req.body; //สลายโครงสร้าง
  //Validate data
  if (!roomNumber || !roomType || !roomImage) {
    res.status(400).send({
      message: "roomNumber, roomType or roomImage can not be empty!",
    });
  }

  await Hotel.findOne({ where: { roomNumber: roomNumber } }).then((hotel) => {
    if (hotel) {
      res.status(400).send({
        massage: "Hotel already exists!",
      });
      return;
    }
    // create a Hotel สร้าง Hotel
    const newRooms = {
      roomNumber: roomNumber,
      roomType: roomType,
      roomImage: roomImage,
    };
    Hotel.create(newRooms)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.massage || "Somthing error occured while creating the Hotel.",
        });
      });
  });
};

//Get all Hotel สร้าง Get all
exports.getAll = async (req, res) => {
  await Hotel.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.massage || "Somthing error occured while creating the Hotel.",
      });
    });
};

//Get By ID Hotel สร้าง Get By ID
exports.getById = async (req, res) => {
  const id = req.params.id;
  await Hotel.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No found Hotel with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.massage ||
          "Somthing error occured while creating the restaurant.",
      });
    });
};

//UpdateById restaurant
exports.update = async (req, res) => {
  const id = req.params.id;
  await Hotel.update(req.body, {
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Hotel was update successfully" });
      } else {
        res.send({
          message:
            "Cannot update Hotel with id" +
            id +
            ". Maybe Hotel was not found or res.body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.massage || "Somthing error occured while creating the Hotel.",
      });
    });
};

//Delete Hotel
exports.delete = async (req, res) => {
  const id = req.params.id;
  await Hotel.destroy({
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Delete successfully" });
      } else {
        res.send({
          message: "Cannot Delete" + id + ".",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.massage || "Somthing error occured while creating the Hotel.",
      });
    });
};
