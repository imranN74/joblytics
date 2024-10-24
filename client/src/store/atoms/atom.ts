import { atom, selectorFamily, atomFamily } from "recoil";

//for modal form visibility
export const modalFormAtom = atom({
  key: "modalView",
  default: false,
});

//for fetch all job application Data
export const appData = atomFamily({
  key: "fetchAppData",
  default: [],
});
