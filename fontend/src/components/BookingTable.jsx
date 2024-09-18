import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthContext } from "../contexts/AuthContext";
import { PenIcon, TrashIcon } from "./FontAwesome";

const BookingTable = () => {
  const { bookings, fetchBookings, deleteBooking } = useAuthContext();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Are you about to delete this record?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBooking(id);
        Swal.fire("Deleted!", `Record has been deleted.`, "success");
      }
    });
  };

  const handleEdit = (
    id,
    roomName,
    username,
    checkIn,
    checkOut,
    bookingStatus,
    personAmount
  ) => {
    navigate(`/editbooking/${id}`, {
      state: {
        id: id,
        roomName: roomName,
        username: username,
        checkIn: checkIn,
        checkOut: checkOut,
        bookingStatus: bookingStatus,
        personAmount: personAmount,
      },
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA");
  };

  console.log(user);

  return (
    <div className="flex flex-col justify-between">
      <div className="overflow-x-auto rounded-lg">
        <table className="table-auto w-full bg-white">
          <thead>
            <tr className="bg-cyan-100">
              <th className="py-3 px-4">Room Name</th>
              <th className="py-3 px-4">Username</th>
              <th className="py-3 px-4">Check-In</th>
              <th className="py-3 px-4">Check-Out</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Persons</th>
              <th className="py-3 px-4">Edit</th>
              <th className="py-3 px-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {bookings &&
              bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{booking.roomName}</td>
                  <td className="py-2 px-4 border-b">{booking.username}</td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(booking.checkIn)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(booking.checkOut)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {booking.bookingStatus}
                  </td>
                  <td className="py-2 px-4 border-b">{booking.personAmount}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="btn btn-warning btn-sm mx-1 btn-outline hover:bg-lime-500"
                      onClick={() =>
                        handleEdit(
                          booking.id,
                          booking.roomName,
                          booking.username,
                          booking.checkIn,
                          booking.checkOut,
                          booking.bookingStatus,
                          booking.personAmount
                        )
                      }
                    >
                      <PenIcon />
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {user.roles[0].includes("ROLES_ADMIN") ? (
                      <button
                        className="btn btn-error btn-sm mx-1 btn-outline hover:bg-red-600"
                        onClick={() => handleDelete(booking.id)}
                      >
                        <TrashIcon />
                      </button>
                    ) : (
                      <button
                        className="btn btn-error btn-sm mx-1 btn-outline hover:bg-red-600"
                        disabled="disable"
                        onClick={() => handleDelete(booking.id)}
                      >
                        <TrashIcon />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;
