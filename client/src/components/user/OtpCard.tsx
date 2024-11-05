import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { isAuthAtom } from "../../store/atoms/atom";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

type OtpType = {
  resendClick: () => void;
  name: string;
  email: string;
  password: string;
  profile: string;
};

export const OtpCard: React.FC<OtpType> = ({
  resendClick,
  email,
  name,
  password,
  profile,
}) => {
  const navigate = useNavigate();

  //otp value
  const [otpValue, setOtpValue] = useState("");

  //to disable verify button while requesting
  const [isVerifyButtonActive, setIsVerifyButtonActive] = useState(false);

  //set logged in flag
  const setIsLOggedIn = useSetRecoilState(isAuthAtom);

  function handleOnChangeOtp(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setOtpValue(value);
  }

  console.log(`${email}/${name}/${password}`);

  async function onVerify() {
    if (!otpValue) {
      toast.warning("Kindly enter the OTP");
    } else {
      try {
        setIsVerifyButtonActive(true);
        const response = await axios.post(`${BACKEND_BASE_URL}/user/signup`, {
          email: email,
          name: name,
          password: password,
          profile: profile,
          otp: otpValue,
        });

        const userName = name.split(" ")[0];
        const token = response.data.token;
        localStorage.setItem("jwt", token);
        localStorage.setItem("name", userName);
        setIsLOggedIn(true);
        navigate("/applications");
        setIsVerifyButtonActive(false);
        toast.success(response.data.message);
      } catch (error: any) {
        setIsVerifyButtonActive(false);
        console.log(error);
        toast.error(error.response.data.message);
        navigate("/signup");
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-80 ">
      <div
        id="popup-modal"
        tabIndex={-1}
        className="border shadow-2xl rounded-md"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div>
              <button
                onClick={() => {
                  window.location.reload();
                }}
                type="button"
                className="absolute -top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>

                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    OTP sent to your Email
                  </label>
                  <input
                    onChange={handleOnChangeOtp}
                    type="number"
                    maxLength={4}
                    id="otp"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter OTP"
                  />
                </div>
              </h3>
              <button
                onClick={onVerify}
                disabled={isVerifyButtonActive}
                data-modal-hide="popup-modal"
                type="button"
                className={`text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center ${
                  isVerifyButtonActive ? "cursor-not-allowed" : ""
                }`}
              >
                {!isVerifyButtonActive ? "Verify" : "Verifying..."}
              </button>
              <button
                onClick={resendClick}
                data-modal-hide="popup-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Resend OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
