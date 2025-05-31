'use client';

import { createContext, useContext, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Correct named import
import { baseUrl } from '@/const';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginWithGoogle = async (credential) => {
    try {
      const decoded = jwtDecode(credential); // decode the Google token
      setUser(decoded);

      // Send the token to your backend for verification or registration
      const response = await fetch(`${baseUrl}/google-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credential }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message || 'Google login failed' };
      }

      return { success: true };
    } catch (err) {
      console.error('Google login error:', err);
      return { success: false, message: 'Google login failed' };
    }
  };

  return (
    <GoogleOAuthProvider clientId="647545445342-0271m6b92v0cfmd69tj8sgd49ikpodq6.apps.googleusercontent.com">
      <AuthContext.Provider value={{ user, loginWithGoogle }}>
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
};

export const useAuth = () => useContext(AuthContext);
