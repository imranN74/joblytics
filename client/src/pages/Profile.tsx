import { ProfileIcon } from "../components/ProfileIcon";
import { TextTag } from "../components/user/TextTag";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Loader } from "../components/loader/Loader";

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
            value={profileValue.profile ? profileValue.profile : "Add Profile"}
            editable={true}
          />
        </div>
        <div>
          <TextTag value={profileValue.email} />
        </div>
      </div>
    </div>
  );
};
