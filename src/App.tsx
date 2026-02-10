import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/common/Navigation/Navigation";
import { ErrorBoundary } from "./components/common/ErrorBoundary/ErrorBoundary";
import AlumniPage from "./pages/Alumni/AlumniPage";
import CoachesPage from "./pages/Coaches/CoachesPage";
import FansPage from "./pages/Fans/FansPage";
import LineupBuilderPage from "./pages/LineupBuilder/LineupBuilderPage";
import ManagementPage from "./pages/Management/ManagementPage";
import RosterPage from "./pages/Roster/RosterPage";
import SchoolDetailPage from "./pages/SchoolDetails/SchoolDetailsPage";
import SchoolsPage from "./pages/Schools/SchoolsPage";
import AllCharactersPage from "./pages/AllCharacters/AllCharactersPage";
import CharacterDetailsPage from "./pages/CharacterDetails/CharacterDetailsPage";
import PlayersPage from "./pages/Players/PlayersPage";
import HomePage from "./pages/Home/HomePage";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
          {/* Navigation Component */}
          <Navigation />

          {/* Main Content */}
          <main style={{ paddingTop: "80px" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/characters" element={<AllCharactersPage />} />
              <Route
                path="/characters/:characterId"
                element={<CharacterDetailsPage />}
              />
              <Route path="/players" element={<PlayersPage />} />
              <Route path="/coaches" element={<CoachesPage />} />
              <Route path="/management" element={<ManagementPage />} />
              <Route path="/fans" element={<FansPage />} />
              <Route path="/alumni" element={<AlumniPage />} />
              <Route path="/schools" element={<SchoolsPage />} />
              <Route path="/schools/:schoolId" element={<SchoolDetailPage />} />
              <Route path="/rosters" element={<RosterPage />} />
              <Route path="/roster/:rosterId" element={<RosterPage />} />
              <Route path="/lineup/:rosterId" element={<LineupBuilderPage />} />
            </Routes>
          </main>

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
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
