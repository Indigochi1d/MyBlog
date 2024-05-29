// UserPage.js
import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

const UserPage = () => {
  const { username } = useParams();
  return (
    <div>
      <h1>Profile of {username}</h1>
      <Outlet />
    </div>
  );
};

export default UserPage;
