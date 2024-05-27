import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import Application from "./Application.js";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Application />
  </StrictMode>
);