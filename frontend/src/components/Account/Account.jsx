import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";

function Account() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/user-data", { withCredentials: true })
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        navigate("/login");
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0A192F] text-white">
        <div className="text-lg font-semibold animate-pulse">Loading your account...</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0A192F] text-white flex flex-col items-center pt-20">
        <div className="bg-[#112240] p-8 rounded-lg shadow-lg w-96 text-center">
          <h1 className="text-2xl font-bold text-cyan-400">Welcome, {userData.fullname}</h1>
          <p className="mt-2 text-gray-300">Email: {userData.email}</p>
        </div>
      </div>
    </>
  );
}

export default Account;
