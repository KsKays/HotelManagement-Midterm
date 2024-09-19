import api from "./api"; // Import the Axios instance with base URL
const HOTEL_API = import.meta.env.VITE_HOTEL_API; // Import the hotel API path
const BOOKING_API = import.meta.env.VITE_BOOKING_API;

// get all hotels
const getAllHotel = async () => {
  return await api.get(`${HOTEL_API}/all`); // This will use the base URL + /api/v1/hotel
};

// get hotel by Id
const getHotelById = async (id) => {
  return await api.get(`${HOTEL_API}/room/${id}`); // This will use the base URL + /api/v1/hotel/{id}
};

// update a hotel
const editHotel = async (id, hotel) => {
  return await api.put(`${HOTEL_API}/${id}`, hotel);
};

// delete hotel
const deleteHotel = async (id) => {
  return await api.delete(`${HOTEL_API}/${id}`);
};

// add new hotel
const insertHotel = async (hotel) => {
  return await api.post(HOTEL_API, hotel);
};

// ADD BOOKING
const addNewBooking = async (bookings) => {
  return await api.post(BOOKING_API, bookings);
};

// GET BOOKING
const getAllBooking = async () => {
  return await api.get(BOOKING_API); // This will use the base URL + /api/v1/hotel
};

// DELETE BOOKING
const deleteBooking = async (id) => {
  return await api.delete(`${BOOKING_API}/${id}`);
};

// UDATE BOOKING
const editBooking = async (id, bookings) => {
  return await api.put(`${BOOKING_API}/${id}`, bookings);
};

// Hotel Search
const hotelSearch = async (name) => {
  return await api.get(`${HOTEL_API}/search?name=${name}`);
};

// export the services
const HotelService = {
  getAllHotel,
  getHotelById,
  editHotel,
  deleteHotel,
  insertHotel,
  addNewBooking, //ADD BOOKING
  getAllBooking, //GET BOOKING
  deleteBooking, //DELETE BOOKING
  editBooking, //UDATE BOOKING
  hotelSearch, // HotelSearch
};

export default HotelService;
