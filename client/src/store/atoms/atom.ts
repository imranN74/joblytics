import { atom, selectorFamily, atomFamily } from "recoil";
import axios from "axios";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

type JobApp = {
  company: string;
  role: string;
  location: string;
  appliedDate: Date;
  id: string;
  appNote: string;
  user: {
    name: string;
  };
  appStatus: string;
};

//for modal form visibility
export const modalFormAtom = atom({
  key: "modalView",
  default: false,
});

//for fetch all job application Data
export const appDataAtom = atomFamily<JobApp[], string>({
  key: "appDataAtom",
  default: [],
});

export const fetchDataSelector = selectorFamily({
  key: "fetchDataSeelctor",
  get: (type: string) => {
    return async () => {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(`${BACKEND_BASE_URL}${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    };
  },
});

//for loggedin state
const isToken = localStorage.getItem("jwt");
export const isAuthAtom = atom({
  key: "isLoggedIn",
  default: isToken,
});

//track jobApplication state
export const isJobAppUpdate = atom({
  key: "isJobAppUpdate",
  default: false,
});
