import { atom } from "recoil";

//for loggedin state
const isToken = localStorage.getItem("jwt");
export const isAuthAtom = atom({
  key: "isLoggedIn",
  default: isToken ? true : false,
});
