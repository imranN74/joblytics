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

function App() {
  const isLoggedIn = useRecoilValue(isAuthAtom);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
          path="applications/contacts/:id"
          element={
            isLoggedIn ? <Contacts /> : <Navigate to="/signup" replace />
          }
        />
      </Routes>
    </>
  );
}

export default App;
