import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Layout from "../components/Layout";
import AddRooms from "../components/AddRooms";
import RoomsCard from "../components/RoomsCard";
import AddBooking from "../components/AddBooking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/addrooms",
        element: <AddRooms />,
      },
      {
        path: "/roomscard",
        element: <RoomsCard />,
      },
      {
        path: "/addBooking",
        element: <AddBooking />,
      },
    ],
  },
]);

export default router;
