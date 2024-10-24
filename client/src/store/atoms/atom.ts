import { atom, selectorFamily, atomFamily } from "recoil";
import axios from "axios";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

//for modal form visibility
export const modalFormAtom = atom({
  key: "modalView",
  default: false,
});

//for fetch all job application Data
export const appDataAtom = atomFamily({
  key: "appDataAtom",
  default: [],
});

export const fetchDataSelector = selectorFamily({
  key: "fetchDataSeelctor",
  get: (type: string) => {
    return async () => {
      const response = await axios.get(`${BACKEND_BASE_URL}${type}`);
      return response.data;
    };
  },
});
