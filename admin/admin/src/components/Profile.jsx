import React, { useEffect, useState } from 'react';
import apiClient from '../api/api-client';
import './Profile.css';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if (!user || !user.id) {
      setError('User not found in local storage.');
      return;
    }

    const userId = user.id

    const fetchUserDetails = async () => {
      try {
        const response = await apiClient.get(`/auth/profile/${userId}`);
        console.log(response.data);
        setUserDetails(response.data);
      } catch (err) {
        console.error('Profile fetch error:', err.response || err.message || err);
        setError('Failed to fetch user details');
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      {error && <p className="profile-error">{error}</p>}
      {userDetails && (
        <div className="profile-details">
          <p className="profile-field"><strong>Name:</strong> {userDetails.name}</p>
          <p className="profile-field"><strong>Email:</strong> {userDetails.email}</p>
          <p className="profile-field"><strong>Role:</strong> {userDetails.role}</p>
          {/* Add more fields here if needed */}
        </div>
      )}
    </div>
  );
};

export default Profile;
