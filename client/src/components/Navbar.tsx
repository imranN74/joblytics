import { Logo } from "./Logo";
import { useRecoilValue } from "recoil";
import { isAuthAtom } from "../store/atoms/atom";
import { Profile } from "./user/Profile";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isAuthAtom);
  return (
    <div className="fixed top-0 rounded-b-xl z-[1000] w-full">
      <nav className="shadow shadow-gray-300 w-100 px-2 md:px-auto bg-gradient-to-r from-cyan-200 to-green-500">
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          <div className="text-indigo-500 md:order-1">
            <a href="/applications" title="jobLutics">
              <Logo />
            </a>
          </div>
          <div className="text-black order-3 mx-5 w-full md:w-auto md:order-2">
            <ul className="flex font-medium justify-between">
              <li className="md:px-4 md:py-2 hover:text-indigo-500">
                <a href="/applications">Applications</a>
              </li>
              <li className="md:px-4 md:py-2 hover:text-indigo-500">
                <a href="">Analytics</a>
              </li>

              <li className="md:px-4 md:py-2 hover:text-indigo-500">
                <a href="">AboutUs</a>
              </li>
            </ul>
          </div>
          <div className="order-2 md:order-3 mr-3">
            {isLoggedIn ? (
              <Profile />
            ) : (
              <button
                title="login"
                onClick={() => {
                  navigate("/signup");
                }}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 animate-pulse"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>SignUp</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
