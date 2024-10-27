import { Logo } from "./Logo";
import { useRecoilValue } from "recoil";
import { isAuthAtom } from "../store/atoms/atom";

export const Navbar = () => {
  const isLoggedIn = useRecoilValue(isAuthAtom);
  return (
    <div className="sticky top-0 rounded-b-xl">
      {/* <!-- component --> */}
      <nav className="bg-gray-100 shadow shadow-gray-300 w-100 px-8 md:px-auto">
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          {/* <!-- Logo --> */}
          <div className="text-indigo-500 md:order-1">
            {/* <!-- Heroicon - Chip Outline --> */}
            <a href="/applications" title="jobLutics">
              <Logo />
            </a>
          </div>
          <div className="text-black order-3 w-full md:w-auto md:order-2">
            <ul className="flex font-normal justify-between">
              {/* <!-- Active Link = text-indigo-500
                Inactive Link = hover:text-indigo-500 --> */}
              <li className="md:px-4 md:py-2 hover:text-indigo-500">
                <a href="#">Applications</a>
              </li>
              <li className="md:px-4 md:py-2 hover:text-indigo-500">
                <a href="#">Analytics</a>
              </li>
              <li className="md:px-4 md:py-2 hover:text-indigo-500">
                <a href="#">Contacts</a>
              </li>
              <li className="md:px-4 md:py-2 hover:text-indigo-500">
                <a href="#">About</a>
              </li>
            </ul>
          </div>
          <div className="order-2 md:order-3">
            <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
              {/* <!-- Heroicons - Login Solid --> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>{!isLoggedIn ? "Login" : "Logout"}</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
