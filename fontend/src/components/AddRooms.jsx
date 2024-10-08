import { useState } from "react";
import HotelService from "../services/hotel.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Addrooms = () => {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState({
    roomName: "",
    roomType: "",
    roomImage: "",
    roomDescription: "",
    roomPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRooms({ ...rooms, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call HotelService to add the rooms
      const response = await HotelService.insertHotel(rooms); // Ensure you're passing the correct data

      // Check the response status
      if (response.status === 200) {
        Swal.fire({
          title: "Room Added",
          text: "Your room has been successfully added.",
          icon: "success",
        });
        navigate("/"); // Redirect to homepage or any other route
      } else {
        Swal.fire({
          title: "Room Addition Failed",
          text: "The room could not be added.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Room Addition Failed",
        text: error?.message || "An error occurred while adding the room",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md mx-auto rounded-lg space-y-6 text-start ">
        <form className="bg-slate-50 drop-shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-96">
          <div className="relative">
            <span className="block text-lg font-medium text-gray-700 mt-3">
              rooms Name
            </span>
            <input
              type="text"
              className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="rooms Name"
              name="roomName"
              value={rooms.roomName}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <span className="block text-lg font-medium text-gray-700 mt-3">
              rooms Type
            </span>
            <input
              type="text"
              className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="rooms Type"
              name="roomType"
              value={rooms.roomType}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <span className="block text-lg font-medium text-gray-700 mt-3">
              rooms Image URL
            </span>
            <input
              type="text"
              className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="rooms Image URL"
              name="roomImage"
              value={rooms.roomImage}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <span className="block text-lg font-medium text-gray-700 mt-3">
              rooms Description
            </span>
            <textarea
              className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="rooms Description"
              name="roomDescription"
              value={rooms.roomDescription}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <span className="block text-lg font-medium text-gray-700 mt-3">
              rooms Price
            </span>
            <input
              type="text"
              className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="rooms Price"
              name="roomPrice"
              value={rooms.roomPrice}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6 text-center pt-5">
            <button
              className="btn btn-active btn-neutral text-white font-normal text-base"
              type="submit"
              onClick={handleSubmit}
            >
              Add rooms
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addrooms;
