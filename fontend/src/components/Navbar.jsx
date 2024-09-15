import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import UserProfile from "./UserProfile";
import { useAuthContext } from "../contexts/AuthContext";
import hotelLogo from "../../public/Image/hotellogo.png";

const Navbar = () => {
  // ดึงข้อมูล user จาก AuthContext
  const { user } = useAuthContext();

  return (
    <div className="  ">
      <div className="navbar px-20 p-6 bg-[#ffffff] drop-shadow-lg rounded-b-lg">
        <div className="navbar-start">
          <a href="/">
            <img src={hotelLogo} alt="hotelLogo" />
          </a>
        </div>

        <div className="navbar-end flex items-center space-x-4 text-black">
          {user && (
            <div>
              Welcome,{" "}
              <span className="font-medium border-zinc-800">
                {user.username}
                <div className="inline-flex space-x-2 ml-2 border-zinc-800">
                  {user.roles.map((role, index) => (
                    <span
                      key={index}
                      className="badge badge-neutral text-xs py-1 px-2 rounded text-white"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </span>
            </div>
          )}

          {user ? (
            <div className="text-black">
              <UserProfile />
            </div>
          ) : (
            <div className="space-x-2">
              <LoginButton />
              <RegisterButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
