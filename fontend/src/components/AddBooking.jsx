import { useEffect, useState } from "react";
import HotelService from "../services/hotel.service";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

const AddBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomName } = location.state;
  // Updated state to reflect booking fields
  const [bookings, setBooking] = useState({
    roomName: "",
    username: "",
    checkIn: "",
    checkOut: "",
    bookingStatus: "confirmed",
    personAmount: "",
  });

  useEffect(() => {
    if (roomName) {
      setBooking((prevBookings) => ({
        ...prevBookings, // Spread the existing properties
        roomName: roomName, // Update only the roomName field
      }));
    }
  }, []);

  // sfd
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...bookings, [name]: value }); // Update to setBooking
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(bookings);

    try {
      const response = await HotelService.addNewBooking(bookings);
      console.log(response); // ตรวจสอบการตอบกลับจาก API

      if (response.status === 200) {
        Swal.fire({
          title: "Booking Added",
          text: "Your booking has been successfully added.",
          icon: "success",
        });
        navigate("/"); // Redirect to homepage or any other route
      } else {
        Swal.fire({
          title: "Booking Failed",
          text: "The booking could not be added.",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error); // ตรวจสอบ error ที่เกิดขึ้น
      Swal.fire({
        title: "Booking Failed",
        text: "Booking error, please sign up or log in.",
        icon: "error",
      });
      navigate("/register");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md mx-auto rounded-lg space-y-6 text-start ">
        <form
          className="bg-slate-50 drop-shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-96"
          onSubmit={handleSubmit}
        >
          {/* Room Name */}
          <div className="relative">
            <span className="block text-lg font-medium text-gray-700 mt-3">
              Room Name
            </span>
            <input
              type="text"
              className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Room Name"
              name="roomName"
              value={bookings.roomName}
              onChange={handleChange}
            />
          </div>

          {/* Username */}
          <div className="relative">
            <span className="block text-lg font-medium text-gray-700 mt-3">
              Username
            </span>
            <input
              type="text"
              className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Username"
              name="username"
              value={bookings.username}
              onChange={handleChange}
            />
          </div>

          {/* Check In Date */}
          <div className="relative">
            <span className="block text-lg font-medium text-gray-700 mt-3">
              Check-In Date
            </span>
            <input
              type="date"
              className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              name="checkIn"
              value={bookings.checkIn}
              onChange={handleChange}
            />
          </div>

          {/* Check Out Date */}
          <div className="relative">
            <span className="block text-lg font-medium text-gray-700 mt-3">
              Check-Out Date
            </span>
            <input
              type="date"
              className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              name="checkOut"
              value={bookings.checkOut}
              onChange={handleChange}
            />
          </div>

          {/* Booking Status */}
          <div className="relative">
            <span className="block text-lg font-medium text-gray-700 mt-3">
              Booking Status
            </span>
            <select
              name="bookingStatus"
              value={bookings.bookingStatus}
              onChange={handleChange}
              className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Person Amount */}
          <div className="relative">
            <span className="block text-lg font-medium text-gray-700 mt-3">
              Person Amount
            </span>
            <input
              type="number"
              className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Person Amount"
              name="personAmount"
              value={bookings.personAmount}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6 text-center pt-5">
            <button
              className="btn btn-active btn-neutral text-white font-normal text-base"
              type="submit"
            >
              Add Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBooking;
