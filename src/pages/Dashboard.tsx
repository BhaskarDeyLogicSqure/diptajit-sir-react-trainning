import { useState } from "react";
import AllPlayer from "../components/AllPlayer";
import PreferredPlayer from "../components/PreferredPlayer";
import useCricketerStore from "../store/crickterStore";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const {
    allPlayers,
    preferredPlayers,
    addToPreferred,
    removeFromPreferred,
    logout,
  } = useCricketerStore();
  const [isOverAll, setIsOverAll] = useState(false);
  const [isOverPreferred, setIsOverPreferred] = useState(false);
  const navigate = useNavigate();

  // Drop handlers
  const handleDropToPreferred = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOverPreferred(false);

    const raw = e.dataTransfer.getData("application/json");
    if (!raw) return;

    try {
      const { id, from } = JSON.parse(raw);
      if (from === "all") {
        const dragged = allPlayers.find((p) => p.id === id);
        if (dragged) addToPreferred(dragged);
      }
    } catch {
      // Intentionally left blank: ignore invalid drag data
    }
  };

  const handleDropToAll = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOverAll(false);

    const raw = e.dataTransfer.getData("application/json");
    if (!raw) return;

    try {
      const { id, from } = JSON.parse(raw);
      if (from === "preferred") {
        const dragged = preferredPlayers.find((p) => p.id === id);
        if (dragged) removeFromPreferred(dragged);
      }
    } catch {
      // Intentionally left blank: ignore invalid drag data
    }
  };
  return (
    <div className="app-container">
      <header className="header">
        <h1 className="app-title">Cricketer Selector</h1>
        <p className="header-sub">Pick your favorite players</p>
        <button
          className="logout-button"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      </header>

      <div className="app-layout">
        {/* All Players Column */}
        <div
          className={`dropzone players-column ${isOverAll ? "drop-over" : ""}`}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsOverAll(true)}
          onDragLeave={() => setIsOverAll(false)}
          onDrop={handleDropToAll}
        >
          <h3>All Players</h3>
          <div className="grid">
            <AllPlayer />
          </div>
        </div>

        {/* Preferred Players Column */}
        <aside
          className={`dropzone preferred-column ${
            isOverPreferred ? "drop-over" : ""
          }`}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsOverPreferred(true)}
          onDragLeave={() => setIsOverPreferred(false)}
          onDrop={handleDropToPreferred}
        >
          <PreferredPlayer />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
