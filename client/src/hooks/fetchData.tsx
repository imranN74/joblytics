import {
  useRecoilRefresher_UNSTABLE,
  useRecoilValueLoadable,
  useRecoilState,
} from "recoil";
import { appDataAtom } from "../store/atoms/atom";
import { fetchDataSelector } from "../store/atoms/atom";
import { isJobAppUpdate } from "../store/atoms/atom";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const useFetchData = () => {
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

  //fetch the data using recoil selector
  const fetchDataValue = useRecoilValueLoadable(fetchDataSelector("/job"));
  const [appData, setAppData] = useRecoilState<JobApp[]>(
    appDataAtom("bulkJobApp")
  );

  //check if any cahnges occured and refetch the data
  const [isUpdatedStateValue, setIsUpdatedStateValue] =
    useRecoilState(isJobAppUpdate);

  //refresh the fetching recoil selector
  const refreshFetchedData = useRecoilRefresher_UNSTABLE(
    fetchDataSelector("/job")
  );

  //re-render the component if some changes occured like delete, update etc
  useEffect(() => {
    try {
      if (!isUpdatedStateValue) {
        return;
      } else {
        refreshFetchedData();
        if (fetchDataValue.state === "hasValue") {
          setAppData(fetchDataValue.contents.response);
        }
        setIsUpdatedStateValue(false);
      }
    } catch (error) {
      toast.warning("something went wrong");
    }
  }, [isUpdatedStateValue]);

  //initial mount on page load
  useEffect(() => {
    try {
      if (fetchDataValue.state === "hasValue") {
        setAppData(fetchDataValue.contents.response);
      }
    } catch (error) {
      toast.warning("something went wrong");
    }
  }, [fetchDataValue]);

  return { appData, fetchDataValue };
};
