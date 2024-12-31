import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const appContext = useContext(AppContext);
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <span className="text-2xl text-white font-bold tracking-tight">
            <Link to="/">Soken Booking app</Link>
          </span>
          <span className="flex space-x-2">
            {appContext?.isAuthenticated ? (
              <>
                <Link to="/my-bookings" className="flex items-center text-white px-3 font-bold hover:bg-blue-600">My Bookings</Link>
                <Link to="/my-hotels" className="flex items-center text-white px-3 font-bold hover:bg-blue-600">My Hotels</Link>
                <SignOutButton />
              </>
            ) : (
              <Link
                to="/sign-in"
                className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100 hover:text-green-500"
              >
                Sign In
              </Link>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
