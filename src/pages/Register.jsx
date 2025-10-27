import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../db/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gamertag, setGamertag] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          gamertag: gamertag,
          timestamp: new Date(),
        });
      }

      navigate("/Dashboard");
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Daftar Akun Space End</h1>
      <form className="flex flex-col gap-2 w-64" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Gamertag"
          value={gamertag}
          onChange={(e) => setGamertag(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      <p className="mt-2">
        Udah punya akun?{" "}
        <a href="/Login" className="text-blue-600 hover:underline">
          Login di sini
        </a>
      </p>
    </div>
  );
}
