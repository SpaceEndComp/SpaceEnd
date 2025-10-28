import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RouterWrapper from "./route/RouterWrapper.jsx";
import { SpeedInsights } from "@vercel/speed-insights/react";

import "./index.css";

import "remixicon/fonts/remixicon.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterWrapper />
    <SpeedInsights />
  </StrictMode>
);
