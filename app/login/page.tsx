"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    console.log({router})
    const query = new URLSearchParams(router.asPath?.split('?')[1]);
    if (query.get('signupSuccess')) {
      setMessage('Signup successful! Please login with your email and password.');
    }
  }, [router.asPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });
      console.log(response.data);
      // Handle successful login here
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat().join(' ');
        setError(errorMessages);
      } else {
        setError('There was an error! Please try again.');
      }
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {message && <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded">{message}</div>}
        {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded">{error}</div>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Login</button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-700">Don't have an account?</p>
          <button
            onClick={() => router.push('/signup')}
            className="mt-2 text-indigo-600 hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
