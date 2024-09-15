import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import hotelService from "../services/hotel.service";

const BookingBar = () => {
  const [rooms, setRooms] = useState([]);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  useEffect(() => {
    const fetchHotel = async () => {
      setRooms(await hotelService.getAllHotel());
    };
    fetchHotel();
  }, []);

  const handleClick = () => {
    setOpenDate((prev) => !prev);
  };

  const handleChange = (ranges) => {
    setDate(ranges.selection);
  };

  //TODOS
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="card-compact bg-white w-full max-w-4xl p-6 shadow-xl rounded-lg mx-auto">
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        <div className="checkin flex-1 relative">
          <p className="text-lg font-semibold text-gray-800 mb-2">
            Check-In & Check-Out
          </p>
          <span
            onClick={handleClick}
            className="calendar cursor-pointer inline-block px-4 py-2 text-black rounded-md shadow-md"
          >
            {`${format(date.startDate, "dd-MMM-yyyy")} To ${format(
              date.endDate,
              "dd-MMM-yyyy"
            )}`}
          </span>
          {openDate && (
            <div className="absolute z-10 mt-2">
              <DateRangePicker
                className="dateRange"
                ranges={[date]}
                onChange={handleChange}
                minDate={new Date()}
              />
            </div>
          )}
        </div>
        <div className="selectroom flex-1">
          <p className="text-lg font-semibold text-gray-800 mb-2">
            Select Room
          </p>
          <select
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="room"
            id="room"
          >
            {rooms?.data?.map((itm) => {
              return (
                <option key={itm.id} value="{itm.roomName}">
                  {itm.roomName}
                </option>
              );
            })}
            {/* <option value="1">1 Rooms</option>
            <option value="2">2 Rooms</option>
            <option value="3">3 Rooms</option>
            <option value="4">4 Rooms</option> */}
          </select>
        </div>
        <div className="adult flex-1">
          <p className="text-lg font-semibold text-gray-800 mb-2">
            Number of People
          </p>
          <select
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="people"
            id="people"
          >
            <option value="1">1 Adult</option>
            <option value="2">2 Adults</option>
            <option value="3">3 Adults</option>
            <option value="4">4 Adults</option>
            <option value="5">5 Adults</option>
          </select>
        </div>
      </div>
      <div className="button mt-8 text-center">
        <button
          onClick={handleSubmit}
          className="btn btn-active btn-neutral text-white "
        >
          BOOK NOW
        </button>
      </div>
    </div>
  );
};

export default BookingBar;
