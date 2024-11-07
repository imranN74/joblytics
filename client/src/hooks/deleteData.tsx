import { useSetRecoilState } from "recoil";
import { isJobAppUpdate } from "../store/atoms/atom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCallback } from "react";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const useDeleteData = (endpoint: string) => {
  const setIsUpdatedStateValue = useSetRecoilState(isJobAppUpdate);

  const deletData = useCallback(
    async (id: string) => {
      const confirmation = window.confirm("Delete the application ?");
      if (!confirmation) {
        return;
      }
      try {
        const response = await axios.post(
          `${BACKEND_BASE_URL}${endpoint}${id}`
        );
        toast.success(response.data.message);
        setIsUpdatedStateValue(true);
      } catch (error: any) {
        toast.warn(error.respnse.data.messsage);
      }
    },
    [endpoint, setIsUpdatedStateValue]
  );

  return deletData;
};
