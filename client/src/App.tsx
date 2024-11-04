import { LandingPage } from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import { Applications } from "./pages/Applications";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Navbar } from "./components/Navbar";
import { isAuthAtom } from "./store/atoms/atom";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";

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
      </Routes>
    </>
  );
}

export default App;
