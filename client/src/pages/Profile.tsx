import { ProfileIcon } from "../components/ProfileIcon";
import { TextTag } from "../components/user/TextTag";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Loader } from "../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const Profile = () => {
  type Profile = {
    name: string;
    profile: string;
    email: string;
  };

  const [profileValue, setProfileValue] = useState<Profile>({
    name: "",
    profile: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    try {
      setLoading(true);
      axios
        .get(`${BACKEND_BASE_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProfileValue(response.data.response);
        });
      setLoading(false);
    } catch (error: any) {
      toast.error(error.data.response.message);
      setLoading(false);
    }
  });

  const initialName = profileValue.name.split("")[0];
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="h-screen justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="rounded-lg p-10 shadow-md">
        <div className="">
          <ProfileIcon value={initialName} />
        </div>
        <div>
          <TextTag
            size="text-4xl font-semibold capitalize"
            value={profileValue.name}
            editable={true}
          />
        </div>
        <div>
          <TextTag
            value={
              profileValue.profile
                ? profileValue.profile
                : "Add profile: software eng..."
            }
            editable={true}
          />
        </div>
        <div>
          <TextTag value={profileValue.email} size="text-md" />
        </div>
        <div
          onClick={() => {
            navigate("/analytics");
          }}
          className="flex justify-center mt-10"
        >
          <button
            type="button"
            className="flex  gap-2 text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Your Analytics
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
                d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
