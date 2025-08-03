import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import defaultAvatar from "../assets/user.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-700">
        MiniLinkedIn
      </Link>

      <div className="relative" ref={dropdownRef}>
        {user ? (
          <>
            <img
              src={defaultAvatar}
              alt="Profile"
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full object-cover border cursor-pointer"
            />

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                <div className="px-4 py-2 text-sm text-gray-700 font-medium">
                  {user.name}
                </div>
                <Link
                  to={`/profile/${user._id}`}
                  className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  View Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
