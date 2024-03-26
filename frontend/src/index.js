import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { EquipmentContextProvider } from "./context/EquipmentContext";
import { ReservationContextProvider } from "./context/ReservationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <EquipmentContextProvider>
        <ReservationContextProvider>
          <App />
        </ReservationContextProvider>
      </EquipmentContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
