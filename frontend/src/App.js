import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminEquipmentDetails from "./components/AdminEquipmentDetails";
import AdminUpdateEquipment from "./components/AdminUpdateEquipment";
import UserEquipmentDetails from "./components/UserEquipmentDetails";
import AdminResForm from "./components/AdminResForm";
import AdminResPage from "./pages/AdminResPage";
import UserReservations from "./pages/UserReservations";
import Footer from "./components/Footer";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <div className="pages">
          <Routes>
            <Route
              path="/equipment/:equipmentId"
              element={
                user ? (
                  user.role === "admin" ? (
                    <AdminEquipmentDetails />
                  ) : (
                    <UserEquipmentDetails />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/admin/equipment/edit/:equipmentId"
              element={
                user && user.role === "admin" ? (
                  <AdminUpdateEquipment />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/Reservations"
              element={
                user ? (
                  user.role === "admin" ? (
                    <AdminResPage />
                  ) : (
                    <UserReservations />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/admin/addNewElement"
              element={
                user && user.role === "admin" ? (
                  <AdminResForm />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
