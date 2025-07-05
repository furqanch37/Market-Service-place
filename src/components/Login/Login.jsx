'use client';

import React, { useState } from 'react';
import './Login.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { baseUrl } from '../../const';
import { loginUser, setCurrentDashboard } from '@/redux/features/userSlice';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
     
      if (res.ok && data.success && Array.isArray(data.user?.role)) {
        const userDetailsRes = await fetch(`${baseUrl}/users/userdetails`, {
          method: 'GET',
          credentials: 'include',
        });

        const userDetailsData = await userDetailsRes.json();


        if (userDetailsRes.ok && userDetailsData.success) {
        const userWithWallet = {
    ...userDetailsData.user,
    wallet: userDetailsData.wallet,
    buyerReviews: userDetailsData.buyerReviews,
    sellerReviews: userDetailsData.sellerReviews,
  };

  dispatch(loginUser(userWithWallet));
        } else {
          setError('Failed to fetch user details.');
          setLoading(false);
          return;
        }

        const roles = data.user.role;
        const rolePriority = { seller: 1, buyer: 2 };
        const validRoles = roles.filter((r) => ['seller', 'buyer'].includes(r));
        if (validRoles.length === 0) {
          setError('No valid roles found.');
          setLoading(false);
          return;
        }

        const sortedRoles = validRoles.sort((a, b) => rolePriority[a] - rolePriority[b]);
        const topRole = sortedRoles[0];
        dispatch(setCurrentDashboard(topRole));

        if (topRole === 'seller') {
          router.push('/seller/dashboard');
        } else if (topRole === 'buyer') {
          router.push('/buyer/home');
        }
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/users/google-login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ token: tokenResponse.access_token }),
        });

        const data = await response.json();

        if (response.ok) {
          const userDetailsRes = await fetch(`${baseUrl}/users/userdetails`, {
            method: 'GET',
            credentials: 'include',
          });

          const userDetailsData = await userDetailsRes.json();

          if (userDetailsRes.ok && userDetailsData.success) {
            dispatch(loginUser(userDetailsData.user));
          } else {
            setError('Failed to fetch user details.');
            setLoading(false);
            return;
          }

          const { topRole } = data;
          dispatch(setCurrentDashboard(topRole));
          if (topRole === 'seller') {
            router.push('/seller/dashboard');
          } else if (topRole === 'buyer') {
            router.push('/buyer/home');
          } else {
            setError('Unrecognized role.');
          }
        } else {
          setError(data.message || 'Google login failed.');
        }
      } catch (err) {
        console.error('Google login error:', err);
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError('Google login was cancelled or failed.');
    },
  });

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log in</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn green-btn" disabled={loading}>
            {loading ? 'Loading, please wait...' : 'Continue'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <div className="separator">
          <hr />
          <span>or</span>
          <hr />
        </div>

        <button className="login-btn google-btn" onClick={() => googleLogin()} disabled={loading}>
          <img
            src="/assets/google.jpeg"
            style={{ borderRadius: '50%' }}
            alt="Google"
            className="google-icon"
          />
          Continue with Google
        </button>

        <div className="signup-text">
          <hr />
          <span>Don't have an account?</span>
          <hr />
        </div>

        <Link href="/register" className="navLink">
          <button className="login-btn outline-btn" disabled={loading}>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
