import "./styles/global.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import useCricketerStore from "./store/crickterStore";

const App = () => {

  const isAuthenticatedFromStore = useCricketerStore((s) => s.isAuthenticated);
  const isAuthenticated = isAuthenticatedFromStore || Boolean(localStorage.getItem("auth"));
  console.log(isAuthenticated);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        }
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default App;
