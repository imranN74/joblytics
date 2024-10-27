import { LandingPage } from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import { Applications } from "./pages/Applications";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
