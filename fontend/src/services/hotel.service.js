import api from "./api";
const VITE_HOTEL_API = import.meta.env.VITE_HOTEL_API;

//get all hotels
const getAllHotel = async () => {
  return await api.get(VITE_HOTEL_API);
};

//get hotels by Id
const getHotelById = async (id) => {
  return await api.get(VITE_HOTEL_API + `/${id}`);
};

// update a hotel date
const editHotel = async (id, hotel) => {
  return await api.put(VITE_HOTEL_API + `/${id}`, hotel);
};

//delete hotels
const deleteHotel = async (id) => {
  return await api.delete(VITE_HOTEL_API + `/${id}`);
};

//add hotels
const insertHotel = async (hotel) => {
  return await api.post(VITE_HOTEL_API, hotel);
};

//export public function
const hotelService = {
  getAllHotel,
  getHotelById,
  editHotel,
  deleteHotel,
  insertHotel,
};

export default hotelService;
