import { useState, useContext, createContext, useEffect } from "react";
import HotelService from "../services/hotel.service";
import AuthService from "./../services/auth.service";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser);
  const [bookings, setBookings] = useState([]);

  //Func ทั้งคู่ login - logout
  const login = (user) => setUser(user);
  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  // fetchbookings เป็นฟังก์ชันสำหรับ ดึงข้อมูล
  const fetchBookings = async () => {
    try {
      const response = await HotelService.getAllBooking();
      //console.log(response.data);
      if (response.status === 200) {
        setBookings(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);

  function getUser() {
    const temp = localStorage.getItem("user");
    const savedUser = JSON.parse(temp);
    return savedUser || null;
  }

  useEffect(() => {
    const temp = JSON.stringify(user);
    localStorage.setItem("user", temp);
  }, [user]);

  const deleteBooking = async (id) => {
    try {
      const response = await HotelService.deleteBooking(id);
      if (response.status === 200) {
        setBookings((prev) => prev.filter((booking) => booking.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateBooking = async (id, newBooking) => {
    try {
      const response = await HotelService.editBooking(id, newBooking);
      if (response.status === 200) {
        setBookings((prev) =>
          prev.map((booking) => (booking.id === id ? newBooking : booking))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        bookings,
        login,
        logout,
        fetchBookings,
        deleteBooking,
        updateBooking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
