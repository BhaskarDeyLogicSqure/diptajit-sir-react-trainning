import "./styles/global.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const isAuthenticated = Boolean(localStorage.getItem("auth")) || false;
  console.log("isAuthenticated", isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default App;
