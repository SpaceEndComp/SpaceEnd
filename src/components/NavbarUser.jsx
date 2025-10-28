import { useState, useRef, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../db/firebase";
import { doc, getDoc } from "firebase/firestore";

// import NavLogo from "/assets/nav_logo.jpeg";

export default function Navbar() {
  const navItem = ["ChatRoom", "Settings"];
  const [user] = useAuthState(auth);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!user) return;
    const getUser = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setData(snap.data());
    };
    getUser();
  }, [user]);

  const [nav, setNav] = useState(false);

  // refs untuk menu dan toggle button
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav className="sticky top-0 bg-black/12 backdrop-blur-md py-4 px-8 z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* <img src={NavLogo} alt="Space End Logo" className="w-8 h-8" /> */}
          <p className="text-white text-2xl font-bold animate-pulse">
            {data ? data.gamertag : "SpaceEnd"}
          </p>
        </div>

        <div className="gap-8 items-center hidden md:flex">
          {navItem.map((link) => (
            <a
              href={link == "ChatRoom" ? "/CommunityChat" : `/${link}`}
              key={link}
              className="text-white font-medium hover:text-teal-300 transition"
            >
              {link}
            </a>
          ))}
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
              href={link == "ChatRoom" ? "/CommunityChat" : `/${link}`}
              key={link}
              onClick={() => setNav(false)}
              className="text-white font-bold hover:text-teal-300 transition w-full text-center py-4"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
