'use client'; // if using Next.js 13+ app router

import React, { useState } from 'react';
import './Signup.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignupForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: 'Pakistan',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://backend-service-marketplace.vercel.app/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to login page on success
        router.push('/login');
      } else {
        setError(result.message || 'Registration failed');
      }

    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign up</h2>

      <div className="social-buttons">
        <button className="google-btn">
          <img src="/assets/google.jpeg" alt="Google" className="google-logo" />
          Continue with Google
        </button>
      </div>

      <div className="divider">
        <span>or</span>
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="name-fields">
          <input 
            type="text" 
            name="firstName" 
            placeholder="First name" 
            value={formData.firstName} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="text" 
            name="lastName" 
            placeholder="Last name" 
            value={formData.lastName} 
            onChange={handleChange} 
            required 
          />
        </div>
        <input 
          type="email" 
          name="email" 
          placeholder="Work email address" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password (8 or more characters)" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />

        <select name="country" value={formData.country} onChange={handleChange}>
          <option>Pakistan</option>
          <option>United States</option>
          <option>United Kingdom</option>
          <option>India</option>
        </select>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Creating account...' : 'Create my account'}
        </button>

        <p className="login-text">
          Already have an account? <Link href="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
