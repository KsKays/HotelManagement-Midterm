import roomImg from "../../public/Image/rooms-photo.jpg";
//import BookingBar from "./BookingBar";

const HotelLandingPage = () => {
  return (
    <div className="relative w-full h-screen">
      {/* รูปภาพแบบเต็มจอ */}
      <div className="relative w-full h-full">
        <img src={roomImg} alt="Room" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-black/5"></div>
      </div>

      {/* ข้อความทับบนรูป */}
      <div className="absolute text-center top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-7xl">
        <p className="font-chonburi mb-5 text-3xl">Hotel & Spa</p>
        <h1 className="font-jamjuree m-5">THE BLOSSOM HIBIRI</h1>
        <p className="text-2xl">
          Restaurant. The lively open kitchen serves a buffet style breakfast
          with specialties from both Western and Japanese cuisine!
        </p>
      </div>
      {/* Booking Bar */}
      <div className="absolute top-[45%] bottom-10 left-1/2 transform -translate-x-1/2 px-4 max-w-4xl">
        <a href="/roomscard" className="btn btn-info text-white mx-2">
          Check Room!
        </a>
      </div>
    </div>
  );
};

export default HotelLandingPage;
