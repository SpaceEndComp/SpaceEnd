import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../db/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Login() {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const [erroMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (error) {
      const message = error.message || "";

      const bracketMatch = message.match(/\[(.*?)\]/);

      if (bracketMatch) {
        setErrorMsg(bracketMatch[1]);
      } else {
        const parenMatch = message.match(/\((.*?)\)/);
        setErrorMsg(parenMatch ? parenMatch[1] : message);
      }
      console.error(message);
    } else {
      setErrorMsg("");
    }
  }, [error]);

  useEffect(() => {
    if (user) navigate("/Dashboard");
  }, [user, navigate]);

  return (
    // <div className="flex flex-col items-center justify-center h-screen">
    //   <h1 className="text-3xl font-bold mb-4">Login ke Komunitas Space End</h1>
    //   <form onSubmit={handleLogin} className="flex flex-col gap-2 w-64">
    //     <input
    //       name="email"
    //       type="email"
    //       placeholder="Email"
    //       className="p-2 border rounded"
    //       required
    //     />
    //     <input
    //       name="password"
    //       type="password"
    //       placeholder="Password"
    //       className="p-2 border rounded"
    //       required
    //     />
    //     <button
    //       type="submit"
    //       className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
    //     >
    //       {loading ? "Loading..." : "Login"}
    //     </button>
    //   </form>

    //   {error && <p className="text-red-600">{error.message}</p>}

    //   <p className="mt-2">
    //     Belum punya akun?{" "}
    //     <a href="/Register" className="text-green-600 hover:underline">
    //       Daftar di sini
    //     </a>
    //   </p>

    // </div>

    <>
      <div className="p-10 flex flex-col items-center w-full">
        <h1 className="mb-8 font-extrabold text-4xl">Welcome to SpaceEnd</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleLogin}>
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
                placeholder="Email . . ."
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold" htmlFor="password">
                Password
              </label>
              <input
                className="shadow-inner bg-gray-100 rounded-lg text-black placeholder-black p-4 border-none block mt-1 w-full"
                id="password"
                type="password"
                name="password"
                required
                placeholder="Password . . ."
              />
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                type="submit"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-secondary hover:opacity-70 md:py-4 md:text-lg md:px-10"
              >
                {loading ? "Loading..." : "Login"}
              </button>
              <a className="font-semibold hover:opacity-55" href="/Register">
                Belum punya akun?
              </a>
            </div>
          </form>

          <aside>
            <div className="bg-gray-100 text-black p-8 rounded">
              <h2 className="font-bold text-2xl">
                Intruksi untuk membuat akun SpaceEnd
              </h2>
              <ul className="list-disc mt-4 list-inside">
                <li>Gunakan Gamertag dari akun minecraft yang kamu miliki.</li>
                <li>
                  Pastikan email yang didaftarkan aktif dan dapat diakses.
                </li>
                <li>Gunakan password yang kuat untuk keamanan akunmu.</li>
              </ul>
            </div>
          </aside>
          {error && <p className="text-red-600 mt-2">{erroMsg}</p>}
        </div>
      </div>
    </>
  );
}
