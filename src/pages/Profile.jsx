import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth, db } from "../db/firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Profile() {
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

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Dashboard Player</h1>
      {data ? (
        <>
          <p>Gamertag: {data.gamertag}</p>
          <p>Email: {data.email}</p>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-4"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
