import { useEffect, useState } from "react";
import HotelService from "../services/hotel.service";
import { useNavigate } from "react-router-dom";

const RoomsCard = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = (roomName) => {
    navigate("/addBooking", {
      state: { roomName: roomName },
    });
  };

  const fetchHotel = async () => {
    try {
      const response = await HotelService.getAllHotel();

      setHotels(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 pt-8">
        {hotels.map((hotel) => {
          return (
            <div key={hotel.id} className="card bg-base-100 w-96 shadow-xl">
              <figure>
                <img
                  className="w-full h-64 object-cover"
                  src={hotel.roomImage}
                  alt={hotel.roomName}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {hotel.roomName}
                  {hotel.isNew && (
                    <div className="badge badge-secondary">NEW</div>
                  )}
                </h2>
                <p>{hotel.roomDescription}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">{hotel.roomType}</div>
                  <div className="badge badge-outline">${hotel.roomPrice}</div>
                </div>
              </div>

              <div className="button mt-4 text-center">
                <a
                  className="btn btn-active btn-neutral text-white w-full py-3"
                  onClick={() => {
                    handleSubmit(hotel.roomName);
                  }}
                >
                  BOOK NOW
                </a>
                {/* <a
                  href="/addBooking"
                  className="btn btn-active btn-neutral text-white w-full py-3"
                >
                  BOOK NOW
                </a> */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RoomsCard;
