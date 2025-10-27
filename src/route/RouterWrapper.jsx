import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../db/firebase";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App.jsx";
import Changelog from "../pages/Changelog.jsx";
import Profile from "../pages/Profile.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import { Navigate } from "react-router-dom";

export default function RouterWrapper() {
  const [user, loading] = useAuthState(auth);
  
  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/Profile" /> : <App />} />
        <Route path="/Changelog" element={<Changelog />} />
        <Route
          path="/Login"
          element={user ? <Navigate to="/Profile" /> : <Login />}
        />
        <Route
          path="/Profile"
          element={user ? <Profile /> : <Navigate to="/Login" />}
        />
        <Route
          path="/Register"
          element={user ? <Navigate to="/Profile" /> : <Register />}
        />
      </Routes>
    </Router>
  );
}
