import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    apiClient.get('/teachers/profile').then((res) => setProfile(res.data));
  }, []);

  return (
    <div>
      <h2>My Profile</h2>
      {profile && (
        <div>
          <p>Name: {profile.user.name}</p>
          <p>Phone: {profile.phone}</p>
          <p>Subjects: {profile.subjects.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
