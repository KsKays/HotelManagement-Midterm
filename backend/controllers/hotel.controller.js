const { where } = require("sequelize");
const Hotel = require("../models/hotel.model"); //ต้อง import >> (../models/restaurant.model)
const { Op } = require("sequelize");

//Create and Save a new Hotel
exports.create = async (req, res) => {
  const { roomName, roomType, roomImage, roomDescription, roomPrice } =
    req.body; //สลายโครงสร้าง
  //Validate data
  if (!roomName || !roomType || !roomImage || !roomDescription || !roomPrice) {
    res.status(400).send({
      message: "Rooms can not be empty!",
    });
  }

  await Hotel.findOne({ where: { roomName: roomName } }).then((hotel) => {
    if (
      !roomName ||
      !roomType ||
      !roomImage ||
      !roomDescription ||
      !roomPrice
    ) {
      return res.status(400).send({
        message: "Rooms cannot be empty!",
      });
    }

    // Create a Hotel สร้าง Hotel
    const newRooms = {
      roomName: roomName,
      roomType: roomType,
      roomImage: roomImage,
      roomDescription: roomDescription,
      roomPrice: roomPrice,
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
          error.massage || "Somthing error occured while creating the Hotel.",
      });
    });
};

//UpdateById
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

exports.hotelSearch = async (req, res) => {
  try {
    const search = req.query.name;
    const result = await Hotel.findAll({
      where: {
        [Op.or]: [
          { roomName: { [Op.like]: `%${search}%` } }, // Search in roomName
          { roomDescription: { [Op.like]: `%${search}%` } }, // Search in roomDescription
        ],
      },
    });
    res.send({
      message: "Searched successfully",
      searched: result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      message: error,
      //error.massage || "Somthing error occured while creating the Hotel.",
    });
  }
};
