import { LandingPage } from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import { Applications } from "./pages/Applications";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Navbar } from "./components/Navbar";
import { isAuthAtom } from "./store/atoms/userAtom";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { Analytics } from "./pages/Analytics";
import { Contacts } from "./pages/Contacts";
import { Footer } from "./components/Footer";
import { About } from "./components/About";
import { Profile } from "./pages/Profile";

function App() {
  const isLoggedIn = useRecoilValue(isAuthAtom);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/applications" element={<Applications />} />
          <Route
            path="/signin"
            element={
              !isLoggedIn ? <SignIn /> : <Navigate to="/applications" replace />
            }
          />
          <Route
            path="/signup"
            element={
              !isLoggedIn ? <SignUp /> : <Navigate to="/applications" replace />
            }
          />
          <Route
            path="/analytics"
            element={
              isLoggedIn ? <Analytics /> : <Navigate to="/signup" replace />
            }
          />
          <Route
            path="/profile"
            element={
              isLoggedIn ? <Profile /> : <Navigate to="/signup" replace />
            }
          />

          <Route
            path="applications/contacts/:id"
            element={
              isLoggedIn ? <Contacts /> : <Navigate to="/signup" replace />
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
