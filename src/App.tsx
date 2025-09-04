import "./styles/global.css";
import AllPlayer from './components/AllPlayer';
import PreferredPlayer from './components/PreferredPlayer';

const App = () => {
  return (
    <div className="app-container">
      <header className="header">
        <h1 className="app-title">Cricketer Selector</h1>
        <p className="header-sub">Pick your favorite players</p>
      </header>

      <div className="grid">
        <AllPlayer />
      </div>

      <aside className="preferred">
        <PreferredPlayer />
      </aside>
    </div>
  );
};

export default App;
