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
              />
            
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[62%] -translate-y-1/2 opacity-60 hover:opacity-90"
              >
                {showPassword ? (
                  // 🔒 Eye Off Icon
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                    className="w-6 h-6 text-black">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M3 3l18 18M10.584 10.587A2 2 0 0112 10c1.105 0 2 .895 2 2 
                         0 .416-.127.802-.344 1.12m2.588 2.588A7.962 7.962 0 0012 20
                         c-4.418 0-8-3.582-8-8 0-1.79.584-3.439 1.584-4.768m2.63-2.63A7.963 
                         7.963 0 0112 4c4.418 0 8 3.582 8 8 0 1.373-.346 2.663-.96 3.788" />
                  </svg>
                ) : (
                  // 👁️ Eye Icon
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                    className="w-6 h-6 text-black">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 
                         9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
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
              </ul>
            </div>
          </aside>
          {error && <p className="text-red-600 mt-2">{erroMsg}</p>}
        </div>
      </div>
    </>
  );
}
