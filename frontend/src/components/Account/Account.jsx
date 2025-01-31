import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Account() {
  const [user, setUser] = useState(null); // Store user data
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details when the component is mounted
    axios
      .get('http://localhost:3000/user', { withCredentials: true })
      .then((response) => {
        if (response.data) {
          setUser(response.data);
        } else {
          navigate('/login'); // Redirect to login if user is not authenticated
        }
      })
      .catch(() => navigate('/login')); // Redirect to login if any error occurs
  }, [navigate]);

  const handleLogout = () => {
    axios
      .post('http://localhost:3000/logout', {}, { withCredentials: true })
      .then(() => {
        navigate('/login'); // Navigate to login after logout
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="w-1/2 px-32">
          <h3 className="text-4xl mb-3">Account Page</h3>
          {user ? (
            <div>
              <h4 className="text-2xl mb-5">Welcome, {user.fullname}</h4>
              <p className="text-lg">Email: {user.email}</p>
              <div className="mt-5">
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
