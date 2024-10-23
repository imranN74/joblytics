import { LandingPage } from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import { Applications } from "./pages/Applications";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </>
  );
}

export default App;
