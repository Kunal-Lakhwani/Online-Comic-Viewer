import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
