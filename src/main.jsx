import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";
import Changelog from "./pages/Changelog.jsx";
import Community from "./pages/Community.jsx";
import Login from "./pages/Login.jsx";

import "remixicon/fonts/remixicon.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Changelog" element={<Changelog />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  </StrictMode>
);
