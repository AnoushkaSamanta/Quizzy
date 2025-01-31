import React from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });

      if (response.data.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="w-full px-6 py-4 bg-[#0A192F] shadow-md">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h3 className="text-3xl font-bold text-cyan-400 tracking-wide">Quizzy</h3>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <NavLink 
            to="/home" 
            className="text-gray-300 hover:text-cyan-400 font-medium"
          >
            Home
          </NavLink>
          <NavLink 
            to="/account" 
            className="text-gray-300 hover:text-cyan-400  font-medium"
          >
            My Account
          </NavLink>
          <NavLink 
            to="/about" 
            className="text-gray-300 hover:text-cyan-400  font-medium"
          >
            About Us
          </NavLink>

          <button 
            onClick={handleLogout} 
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md 
                      hover:bg-red-600 "
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Subtle Divider */}
      <div className="mt-3 w-full h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-50"></div>
    </header>
  );
}

export default Header;
