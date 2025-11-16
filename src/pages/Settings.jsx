import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth, db } from "../db/firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import NavbarUser from "../components/NavbarUser";

export default function Settings() {
  const [user] = useAuthState(auth);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const getUser = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setData(snap.data());
    };
    getUser();
  }, [user]);

  const logout = async () => {
    await signOut(auth);
    navigate("/Login");
  };

  if (!user) return <p>Loading...</p>;

  console.log(user);

  return (
    <div>
      <NavbarUser />
      <div className="p-8">
        {data ? (
          <>
            <h1 className="text-3xl font-bold mb-4">Dashboard Player</h1>
            <p>Gamertag: {data.gamertag}</p>
            <p>Email: {data.email}</p>
            <p>PlayerId: {data.playerId}</p>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-4"
            >
              Logout
            </button>
          </>
        ) : (
          <div>
            <p>Loading data...</p>
            <span>Jika Loading lama refresh halaman.</span>
          </div>
        )}
      </div>
    </div>
  );
}
