import React from "react";
import ReactDOM from "react-dom/client";
import { Alert } from "./components";
import "./index.scss";
import RootRouter from "./routes/RootRouter";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Alert />
    <RootRouter />
  </React.StrictMode>
);
