import { useState } from "react";
import React from "react";
import hotelService from "../services/hotel.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [rooms, setRooms] = useState({
    title: "",
    type: "",
    img: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRooms({ ...rooms, [name]: value });
  };

  const handSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await hotelService.insertHotel(rooms);
      if (response.status === 200) {
        Swal.fire({
          title: "Add Restaurant!",
          text: "Restaurant has been added successfully.",
          icon: "success",
        });
        setRooms({
          name: "",
          type: "",
          imageUrl: "",
        });
      }
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Add Restaurant",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-8">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
          {/* Menu Type */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="menuType"
            >
              ชื่อเมนู:
            </label>
            <input
              className="input input-bordered w-full"
              type="text"
              placeholder="Name"
              name="name"
              value={rooms.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="menuType"
            >
              ประเภทเมนู:
            </label>
            <input
              className="input input-bordered w-full"
              type="text"
              placeholder="Type"
              name="type"
              value={rooms.type}
              onChange={handleChange}
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="menuType"
            >
              IMG:
            </label>
            <input
              className="input input-bordered w-full"
              type="text"
              placeholder="imageUrl"
              name="imageUrl"
              value={rooms.imageUrl}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="mb-6 text-center">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handSubmit}
            >
              ส่งข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
