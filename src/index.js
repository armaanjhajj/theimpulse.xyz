import React from "react";
import { createRoot } from "react-dom/client"; // ✅ correct import
import App from "./App";

const root = createRoot(document.getElementById("root")); // ✅ new root
root.render(<App />);
