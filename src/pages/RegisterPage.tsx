import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import Navbar from '../components/Navbar';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Registration failed.');
      }
      
      navigate('/login');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <Navbar />
      <div className="flex-grow flex items-center justify-center w-full px-4">
        <div className="bg-[#1a1a1e] p-8 rounded-2xl shadow-lg w-full max-w-sm border border-gray-800">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-center mb-6 text-cyan-400">Create Account</h2>
            {error && <p className="bg-red-500/20 text-red-400 text-center p-3 rounded-lg mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
                maxLength={72}
              />
            </div>
            <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 font-semibold py-3 rounded-lg transition">
              Register
            </button>
          </form>

          {/* --- NEW LINK --- */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-cyan-400 hover:text-cyan-300">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;