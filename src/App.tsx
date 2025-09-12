import "./styles/global.css";
import { Routes, Route, Navigate } from "react-router";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import useCricketerStore from "./store/crickterStore";

const App = () => {
  // read reactive auth state from the store so the app re-renders on login/logout
  const isAuthenticatedFromStore = useCricketerStore((s) => s.isAuthenticated);
  // keep a fallback to localStorage so direct refreshes still work
  const isAuthenticated = isAuthenticatedFromStore || Boolean(localStorage.getItem("auth"));

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
