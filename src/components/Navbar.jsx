import { useState, useEffect, useRef } from "react";
import NavLogo from "/assets/nav_logo.jpeg";

import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const navItem = ["Home", "Changelog", "Profile"];

  const [nav, setNav] = useState(false);

  // refs untuk menu dan toggle button
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  const handleNav = () => {
    setNav(!nav);
  };

  // tutup saat klik di luar menu atau tekan Escape
  useEffect(() => {
    const handleOutside = (e) => {
      if (!nav) return;
      const target = e.target;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        setNav(false);
      }
    };

    const handleKey = (e) => {
      if (e.key === "Escape") setNav(false);
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [nav]);

  return (
    <nav className="sticky top-0 bg-black/12 backdrop-blur-md py-4 px-8 z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={NavLogo} alt="Space End Logo" className="w-8 h-8" />
          <p className="text-white text-2xl font-bold animate-pulse">
            Space End
          </p>
        </div>

        <div className="gap-8 items-center hidden md:flex">
          {navItem.map((link) => (
            <a
              href={link == "Home" ? "/" : `/${link}`}
              key={link}
              className="text-white font-medium hover:text-teal-300 transition"
            >
              {link == "Profile" ? "Community" : link}
            </a>
          ))}

          <button
            className="bg-primary text-black px-4 py-2 rounded hover:bg-secondary transition select-none"
            id="loginButton"
            onClick={() => {
              navigate("/Login");
            }}
          >
            Login
          </button>
        </div>

        {/* toggle button dengan ref */}
        {nav ? (
          <i
            ref={toggleRef}
            className="ri-close-line md:hidden text-3xl"
            onClick={handleNav}
            role="button"
            aria-label="close menu"
          ></i>
        ) : (
          <i
            ref={toggleRef}
            className="ri-menu-line md:hidden text-3xl"
            onClick={handleNav}
            role="button"
            aria-label="open menu"
          ></i>
        )}

        {/* menu mobile dengan ref; klik item menutup menu */}
        <div
          ref={menuRef}
          className={`items-center bg-[var(--background)] justify-center md:hidden fixed left-0 w-full flex flex-col z-40 ${
            nav ? "top-16" : "-top-[100vw]"
          } transition-top duration-300`}
        >
          {navItem.map((link) => (
            <a
              href={link == "Home" ? "/" : `/${link}`}
              key={link}
              onClick={() => setNav(false)}
              className="text-white font-bold hover:text-teal-300 transition w-full text-center py-4"
            >
              {link == "Profile" ? "Community" : link}
            </a>
          ))}

          <button
            className="bg-primary text-black rounded hover:bg-secondary transition select-none w-50 text-center py-4 mb-4"
            id="loginButton"
            onClick={() => {
              setNav(false);
              navigate("/Login");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
