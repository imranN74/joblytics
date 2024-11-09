import { useSetRecoilState } from "recoil";
import { isJobAppUpdate } from "../store/atoms/appAtom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { isContactUpdated } from "../store/atoms/contactAtoms";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const useDeleteData = (endpoint: string) => {
  const setIsUpdatedStateValue = useSetRecoilState(isJobAppUpdate);
  const isContactUpdatedVal = useSetRecoilState(isContactUpdated);
  const token = localStorage.getItem("jwt");

  const deletData = useCallback(
    async (id: string) => {
      const confirmation = window.confirm("Do you want to delete ?");
      if (!confirmation) {
        return;
      }
      try {
        const response = await axios.post(
          `${BACKEND_BASE_URL}${endpoint}${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(response.data.message);
        setIsUpdatedStateValue(true);
        isContactUpdatedVal(true);
      } catch (error: any) {
        toast.warn(error.respnse.data.messsage);
      }
    },
    [endpoint, setIsUpdatedStateValue]
  );

  return deletData;
};
