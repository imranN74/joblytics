import { atom } from "recoil";

//contacts state
type Contacts = {
  id: string;
  name: string;
  contact: string;
};

export const contactAtom = atom<Contacts[]>({
  key: "contactAtom",
  default: [],
});

//to check if contact page state updated
export const isContactUpdated = atom({
  key: "isContactUpdated",
  default: false,
});
