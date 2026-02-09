import { BrowserRouter, Routes, Route } from "react-router-dom";
import AlumniPage from "./pages/Alumni/AlumniPage";
import CoachesPage from "./pages/Coaches/CoachesPage";
import FansPage from "./pages/Fans/FansPage";
import LineupBuilderPage from "./pages/LineupBuilder/LineupBuilderPage";
import ManagementPage from "./pages/Management/ManagementPage";
import RosterPage from "./pages/Roster/RosterPage";
import SchoolDetailPage from "./pages/SchoolDetails/SchoolDetailsPage";
import SchoolsPage from "./pages/Schools/SchoolsPage";
import AllCharactersPage from "./pages/AllCharacters/AllCharactersPage";
import PlayersPage from "./pages/Players/PlayersPage";

const HomePage = () => (
  <div style={{ padding: "2rem" }}>
    <h1>🏐 Haikyuu Management System</h1>
    <p>Welcome! Start building your pages here.</p>
    <p>Navigate using the routes below to add more pages.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
        {/* Simple navigation for testing */}
        <nav
          style={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
            padding: "1rem 2rem",
            color: "white",
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}>
          <h2
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              color: "#FF6600",
              margin: 0,
              fontSize: "2rem",
            }}>
            Haikyuu!!
          </h2>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="/" style={{ color: "white", textDecoration: "none" }}>
              Home
            </a>
            <a
              href="/characters"
              style={{ color: "white", textDecoration: "none" }}>
              Characters
            </a>
            <a
              href="/players"
              style={{ color: "white", textDecoration: "none" }}>
              Players
            </a>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/characters" element={<AllCharactersPage />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/coaches" element={<CoachesPage />} />
          <Route path="/management" element={<ManagementPage />} />
          <Route path="/fans" element={<FansPage />} />
          <Route path="/alumni" element={<AlumniPage />} />
          <Route path="/schools" element={<SchoolsPage />} />
          <Route path="/schools/:schoolId" element={<SchoolDetailPage />} />
          <Route path="/roster/:rosterId" element={<RosterPage />} />
          <Route path="/lineup/:rosterId" element={<LineupBuilderPage />} />
        </Routes>

        {/* AI Chat Widget - Coming Soon */}
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FF6600 0%, #CC5200 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(255, 102, 0, 0.4)",
            cursor: "pointer",
            color: "white",
            fontSize: "1.5rem",
            zIndex: 9999,
          }}>
          💬
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
