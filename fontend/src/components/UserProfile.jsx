import { useAuthContext } from "../contexts/AuthContext";
import { UserIcon } from "./FontAwesome";

const UserProfile = () => {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="relative dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-circle avatar">
        <div className="w-10 rounded-full flex items-center justify-center">
          <UserIcon className="w-full h-full" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content rounded-box z-[9999] mt-3 w-52 p-2 shadow"
      >
        <li className="z-100">
          <a onClick={handleLogout}>Logout</a>
        </li>
        <li>
          <a href="/userprofile" className="justify-between">
            Profile
            <span className="badge badge-neutral">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
