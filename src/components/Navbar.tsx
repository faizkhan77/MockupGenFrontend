import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-transparent">
      <div className="container mx-auto flex items-center justify-between relative">
        {/* Brand (Left) */}
        <div className="text-white text-2xl font-bold">
          <NavLink to="/">
            MockupGen
            <span className="text-sm bg-gray-700 px-2 py-0.5 rounded-md ml-1">
              .dev
            </span>
          </NavLink>
        </div>

        {/* Centered Navigation (Desktop) */}
        <nav className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center bg-[#22252A]/70 backdrop-blur-lg p-2 rounded-full ring-1 ring-white/10">
            {["Home", "Generate", "Register", "Login"].map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `px-5 py-2 block rounded-full text-sm transition-colors ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-gray-300 hover:text-white"
                    }`
                  }
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button (Right) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-16 right-4 w-56 bg-[#22252A]/90 backdrop-blur-md rounded-xl shadow-lg p-3 ring-1 ring-white/10 md:hidden">
            <ul className="flex flex-col gap-1">
              {["Home", "Generate", "Register", "Login"].map((item, idx) => (
                <li key={idx}>
                  <NavLink
                    to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition"
                  >
                    {item}
                  </NavLink>
                </li>
              ))}

              <hr className="border-gray-700 my-2" />

              <li className="px-4 text-xs text-gray-400">
                Signed in as
                <br />
                <span className="text-white font-medium">
                  faizkhan.net7@gmail.com
                </span>
              </li>

              <li>
                <NavLink
                  to="/account"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition"
                >
                  Account
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/logout"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 rounded-lg text-red-400 hover:bg-white/10 transition"
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
