import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../db/firebase";
import { setDoc, doc } from "firebase/firestore";
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
            <div>
              <label className="block font-semibold" htmlFor="name">
                Gamertag
              </label>
              <input
                className="shadow-inner bg-gray-100 text-black rounded-lg placeholder-black p-4 border-none block mt-1 w-full"
                id="name"
                type="text"
                name="name"
                required
                autoFocus="autofocus"
                placeholder="Gamertag . . ."
                value={gamertag}
                onChange={(e) => setGamertag(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold" htmlFor="email">
                Email
              </label>
              <input
                className="shadow-inner bg-gray-100 text-black rounded-lg placeholder-black p-4 border-none block mt-1 w-full"
                id="email"
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email . . ."
              />
            </div>

           <div className="mt-4 relative">
              <label className="block font-semibold" htmlFor="password">
                Password
              </label>
            
              <input
                className="shadow-inner bg-gray-100 rounded-lg text-black placeholder-black p-4 border-none block mt-1 w-full pr-12"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Password . . ."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[62%] -translate-y-1/2 text-black opacity-60 hover:opacity-90"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                type="submit"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-secondary hover:opacity-70 md:py-4 md:text-lg md:px-10"
              >
                {loading ? "Loading..." : "Register"}
              </button>
              <a className="font-semibold hover:opacity-55" href="/Login">
                Sudah punya akun?
              </a>
            </div>
          </form>

          <aside>
            <div className="bg-gray-100 text-black p-8 rounded">
              <h2 className="font-bold text-2xl">
                Intruksi untuk membuat akun SpaceEnd
              </h2>
              <ul className="list-disc mt-4 list-inside">
                <li>
                  Pastikan email yang didaftarkan aktif dan dapat diakses.
                </li>
                <li>Gunakan password yang kuat untuk keamanan akunmu.</li>
                <li>Gunakan Gamertag yang masuk akal, contoh: Flaxen_Zikari.
                </li>
                <li>Dilarang menggunakan Gamertag yang tidak masuk akal, contoh: Rehan Goyang, Cicak Kayang, Asep Racing, dll.
                </li>
                <li>Pastikan punya nama depan dan belakang.
                </li>
                <li>Spasi haru diganti dengan underscore "_" seperti Flaxen_Zikari <strong>(WAJIB)</strong>.
                </li>
              </ul>
            </div>
          </aside>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      </div>

      <Footer />
    </>
  );
}
