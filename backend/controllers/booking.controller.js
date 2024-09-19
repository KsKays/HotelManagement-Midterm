const { where } = require("sequelize");
const Booking = require("../models/booking.model"); //ต้อง import >> (../models/restaurant.model)

//Create and Save a new Booking
exports.create = async (req, res) => {
  const { roomName, username, checkIn, checkOut, bookingStatus, personAmount } =
    req.body; //สลายโครงสร้าง
  //Validate data

  await Booking.findOne({ where: { roomName: roomName } }).then((booking) => {
    if (
      !roomName ||
      !username ||
      !checkIn ||
      !checkOut ||
      !bookingStatus ||
      !personAmount
    ) {
      return res.status(400).send({
        message: "Rooms cannot be empty!",
      });
    }

    // Create a Booking สร้าง Bookings
    const newBooking = {
      roomName: roomName,
      username: username,
      checkIn: checkIn,
      checkOut: checkOut,
      bookingStatus: bookingStatus,
      personAmount: personAmount,
    };
    Booking.create(newBooking)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.massage ||
            "Somthing error occured while creating the Booking.",
        });
      });
  });
};

//Get all Booking สร้าง Get all
exports.getAll = async (req, res) => {
  await Booking.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.massage || "Somthing error occured while creating the Booking.",
      });
    });
};

//Get By ID Booking สร้าง Get By ID
exports.getById = async (req, res) => {
  const id = req.params.id;
  await Booking.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No found Booking with id " + id });
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

//UpdateById แก้ไข Booking
exports.update = async (req, res) => {
  const id = req.params.id;
  await Booking.update(req.body, {
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Booking was update successfully" });
      } else {
        res.send({
          message:
            "Cannot update Booking with id" +
            id +
            ". Maybe Booking was not found or res.body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.massage || "Somthing error occured while creating the Booking.",
      });
    });
};

//Delete Booking ลบ Booking
exports.delete = async (req, res) => {
  const id = req.params.id;
  await Booking.destroy({
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
          error.massage || "Somthing error occured while creating the Booking.",
      });
    });
};
