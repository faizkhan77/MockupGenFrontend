import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check for auth token on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setMenuOpen(false); // Close menu on logout
    navigate('/'); // Redirect to home page
    window.location.reload(); // Force a refresh to ensure all states are cleared
  };

  // Define NavLink items based on login state
  const loggedOutLinks = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Demo', path: '/demo' },
  ];

  const loggedInLinks = [
    { name: 'Home', path: '/' },
    { name: 'Generate', path: '/generate' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Demo', path: '/demo' },
    { name: 'My Mockups', path: '/my-mockups' },
  ];
  
  const navLinks = isLoggedIn ? loggedInLinks : loggedOutLinks;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-transparent">
      <div className="container mx-auto flex items-center justify-between relative">
        {/* Brand (Left) */}
        <Link to="/" className="text-white text-2xl font-bold">
          MockupGen<span className="text-cyan-400">.</span>
        </Link>

        {/* Centered Navigation (Desktop) */}
        <nav className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center bg-[#22252A]/70 backdrop-blur-lg p-2 rounded-full ring-1 ring-white/10">
            {navLinks.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `px-5 py-2 block rounded-full text-sm transition-colors ${
                      isActive ? "bg-white/10 text-white" : "text-gray-300 hover:text-white"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right-side Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-gray-700/80 text-white hover:bg-gray-600 px-5 py-2 rounded-full text-sm font-medium transition">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white px-5 py-2 rounded-full text-sm font-medium transition">
                Login
              </Link>
              <Link to="/register" className="bg-cyan-600 text-white hover:bg-cyan-500 px-5 py-2 rounded-full text-sm font-bold transition">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button (Right) */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white focus:outline-none z-20">
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-0 right-0 w-full bg-[#1c1f24] rounded-xl shadow-lg p-4 pt-20 mt-[-1rem] mr-[-1rem] ring-1 ring-white/10 md:hidden">
            <ul className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
              <hr className="border-gray-700 my-2" />
              {isLoggedIn ? (
                 <li>
                   <button onClick={handleLogout} className="w-full text-left block px-4 py-3 rounded-lg text-red-400 hover:bg-white/10 transition">
                     Logout
                   </button>
                 </li>
              ) : (
                <>
                  <li>
                    <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-lg bg-cyan-600 text-white font-semibold text-center hover:bg-cyan-500 transition">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;