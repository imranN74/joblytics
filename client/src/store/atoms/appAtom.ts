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

//modal form page
export const modalFormPageAtom = atom({
  key: "modalPage",
  default: "",
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

//track jobApplication state
export const isJobAppUpdate = atom({
  key: "isJobAppUpdate",
  default: false,
});

type JobAppUpdate = {
  company: string;
  role: string;
  location: string;
  appliedDate: Date;
  id: string;
  appNote: string;
  appStatus: string;
  isUpdating: boolean;
};

//store specific application
export const specificAppAtom = atom<JobAppUpdate>({
  key: "specificAppUpdate",
  default: {
    company: "",
    role: "",
    location: "",
    appliedDate: new Date(),
    id: "",
    appNote: "",
    appStatus: "",
    isUpdating: false,
  },
});
