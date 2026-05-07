import { Routes, Route, useLocation } from "react-router-dom";
import "./styles/index.css";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./pages/features/ProtectedRoutes";

import LoginPage from "./pages/users/LoginPage";
import SignupPage from "./pages/users/SignupPage";
import DashboardPage from "./pages/users/DashboardPage";
import ProfilePage from "./pages/users/ProfilePage";

import GetBikes from "./pages/bikes/GetBikes";
import GetBike from "./pages/bikes/GetBike";
import AddBike from "./pages/bikes/AddBike";
import EditBike from "./pages/bikes/EditBike";

import GetRides from "./pages/rides/GetRides";
import GetRide from "./pages/rides/GetRide";
import AddRide from "./pages/rides/AddRide";
import EditRide from "./pages/rides/EditRide";

import GetServices from "./pages/services/GetServices";
import GetService from "./pages/services/GetService";
import AddService from "./pages/services/AddService";
import EditService from "./pages/services/EditService";

import GetComponents from "./pages/parts/GetComponents";
import GetComponent from "./pages/parts/GetComponent";
import AddComponent from "./pages/parts/AddComponent";
import EditComponent from "./pages/parts/EditComponent";

function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bikes"
          element={
            <ProtectedRoute>
              <GetBikes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bikes/:id"
          element={
            <ProtectedRoute>
              <GetBike />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bikes/add"
          element={
            <ProtectedRoute>
              <AddBike />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bikes/:id/edit"
          element={
            <ProtectedRoute>
              <EditBike />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rides"
          element={
            <ProtectedRoute>
              <GetRides />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rides/:id"
          element={
            <ProtectedRoute>
              <GetRide />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rides/add"
          element={
            <ProtectedRoute>
              <AddRide />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rides/:id/edit"
          element={
            <ProtectedRoute>
              <EditRide />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <GetServices />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services/:id"
          element={
            <ProtectedRoute>
              <GetService />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services/add"
          element={
            <ProtectedRoute>
              <AddService />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services/:id/edit"
          element={
            <ProtectedRoute>
              <EditService />
            </ProtectedRoute>
          }
        />

        <Route
          path="/components"
          element={
            <ProtectedRoute>
              <GetComponents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/components/:id"
          element={
            <ProtectedRoute>
              <GetComponent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/components/add"
          element={
            <ProtectedRoute>
              <AddComponent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/components/:id/edit"
          element={
            <ProtectedRoute>
              <EditComponent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
