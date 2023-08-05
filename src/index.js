import React from "react";
import ReactDOM from "react-dom/client";

import { CountriesProvider } from "./contexts/CountriesContext";

import App from "./App";

import "./main.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CountriesProvider>
      <App />
    </CountriesProvider>
  </React.StrictMode>
);
