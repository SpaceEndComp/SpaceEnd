import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../db/firebase";
import {
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gamertag, setGamertag] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // ===== Generate playerId 5 digit unik =====
  async function generateUniquePlayerId() {
    let playerId = "";
    let found = true;

    while (found) {
      playerId = String(Math.floor(10000 + Math.random() * 90000));
      const snap = await getDocs(collection(db, "users"));
      found = snap.docs.some((doc) => doc.data().playerId === playerId);
    }

    return playerId;
  }

  // ===== Cek gamertag unik =====
  async function checkGamertagExists(tag) {
    const q = query(collection(db, "users"), where("gamertag", "==", tag));
    const snap = await getDocs(q);
    return !snap.empty;
  }

  // ===== Validasi format gamertag =====
  function validateGamertag(tag) {
    // Harus Format: Nama_Depan
    const regex = /^[A-Za-z]+_[A-Za-z]+$/;

    if (!regex.test(tag)) {
      return "Format gamertag wajib: Nama_Depan (contoh: Flaxen_Zikari). Gunakan hanya huruf & underscore.";
    }

    if (tag.length < 3 || tag.length > 20) {
      return "Gamertag harus 3-20 karakter.";
    }

    return null;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Cek format gamertag
    const formatError = validateGamertag(gamertag);
    if (formatError) {
      setLoading(false);
      setError(formatError);
      return;
    }

    try {
      // Cek gamertag sudah dipake atau belum
      const exists = await checkGamertagExists(gamertag);
      if (exists) {
        setLoading(false);
        setError("Gamertag sudah digunakan orang lain.");
        return;
      }

      // Register Firebase auth
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      // Generate Player ID unik
      const newPlayerId = await generateUniquePlayerId();

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          gamertag,
          playerId: newPlayerId,
          timestamp: new Date(),
        });
      }

      navigate("/Dashboard");
    } catch (err) {
      let match = err.message.match(/\[(.*?)\]/);
      if (match) {
        setError(match[1]);
      } else {
        let parenMatch = err.message.match(/\((.*?)\)/);
        setError(parenMatch ? parenMatch[1] : err.message);
      }

      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-10 flex flex-col items-center">
        <h1 className="mb-8 font-extrabold text-4xl">Welcome to SpaceEnd</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleRegister}>
            {/* GAMERTAG */}
            <div>
              <label className="block font-semibold" htmlFor="name">
                Gamertag
              </label>
              <input
                className="shadow-inner bg-gray-100 text-black rounded-lg placeholder-black p-4 mt-1 w-full"
                id="name"
                type="text"
                required
                placeholder="Flaxen_Zikari"
                value={gamertag}
                onChange={(e) => setGamertag(e.target.value)}
              />
            </div>

            {/* EMAIL */}
            <div className="mt-4">
              <label className="block font-semibold" htmlFor="email">
                Email
              </label>
              <input
                className="shadow-inner bg-gray-100 text-black rounded-lg placeholder-black p-4 mt-1 w-full"
                id="email"
                type="email"
                required
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div className="mt-4 relative">
              <label className="block font-semibold" htmlFor="password">
                Password
              </label>
              <input
                className="shadow-inner bg-gray-100 rounded-lg text-black p-4 mt-1 w-full pr-12"
                id="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[62%] -translate-y-1/2 
                bg-white rounded-full p-1 shadow text-black hover:bg-gray-200 transition"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* BUTTON SUBMIT */}
            <div className="flex items-center justify-between mt-8">
              <button
                type="submit"
                className="px-8 py-3 rounded-md bg-secondary hover:opacity-70"
              >
                {loading ? "Loading..." : "Register"}
              </button>

              <a className="font-semibold hover:opacity-55" href="/Login">
                Sudah punya akun?
              </a>
            </div>

            {/* ERROR */}
            {error && <p className="text-red-600 mt-4">{error}</p>}
          </form>

          {/* ASIDE */}
          <aside>
            <div className="bg-gray-100 text-black p-8 rounded">
              <h2 className="font-bold text-2xl">
                Instruksi untuk membuat akun SpaceEnd
              </h2>
              <ul className="list-disc mt-4 list-inside">
                <li>Email harus aktif.</li>
                <li>Gunakan password kuat.</li>
                <li>Format Gamertag wajib: Nama_Depan.</li>
                <li>Dilarang gamertag aneh: RehanGoyang, AsepRacing, dll.</li>
                <li>Spasi wajib diganti underscore "_"</li>
                <li>Contoh benar: Flaxen_Zikari</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </>
  );
}
