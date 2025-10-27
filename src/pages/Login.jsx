import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../db/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (user) navigate("/Dashboard");
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Login ke Komunitas Space End</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-2 w-64">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      {error && <p className="text-red-600">{error.message}</p>}

      <p className="mt-2">
        Belum punya akun?{" "}
        <a href="/Register" className="text-green-600 hover:underline">
          Daftar di sini
        </a>
      </p>
    </div>
  );
}
