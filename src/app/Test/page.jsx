'use client';

import React, { useEffect, useState } from 'react';
import { baseUrl } from '@/const';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/userdetails`, {
          method: 'GET',
          credentials: 'include', // if cookies/session is needed
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${your_token}` if needed
          }
        });

        const result = await response.json();
        if (response.ok && result.success) {
          setUser(result.user);
        } else {
          setError('Failed to fetch user details');
        }
      } catch (err) {
        setError('An error occurred while fetching user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="user-details-container">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Country:</strong> {user.country}</p>
      <p><strong>Verified:</strong> {user.verified ? 'Yes' : 'No'}</p>
      <p><strong>Blocked:</strong> {user.blocked ? 'Yes' : 'No'}</p>
      <p><strong>Roles:</strong> {user.role.join(', ')}</p>
      <p><strong>Account Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default UserDetails;
