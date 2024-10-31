import { appDataAtom } from "../../store/atoms/atom";
import { toast } from "react-toastify";
import {
  useRecoilValueLoadable,
  useRecoilRefresher_UNSTABLE,
  useSetRecoilState,
} from "recoil";
import { fetchDataSelector } from "../../store/atoms/atom";
import { useState, useEffect } from "react";

export const RefreshIcon = () => {
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

  const fetchDataValue = useRecoilValueLoadable(fetchDataSelector("/job"));
  const refreshFetchedData = useRecoilRefresher_UNSTABLE(
    fetchDataSelector("/job")
  );
  const setAppData = useSetRecoilState<JobApp[]>(appDataAtom("bulkJobApp"));

  let [iconAnimation, setIconAnimation] = useState(false);
  const [refreshTriggered, setRefreshTriggered] = useState(false);

  if (fetchDataValue.state === "hasValue") {
    console.log(fetchDataValue);
  }

  useEffect(() => {
    if (!refreshTriggered) {
      return;
    } else {
      if (fetchDataValue.state === "loading") {
        setIconAnimation(true);
      } else if (fetchDataValue.state === "hasError") {
        setIconAnimation(false);
        setRefreshTriggered(false);
        toast.warn("error while fetching data");
      } else if (fetchDataValue.state === "hasValue") {
        setIconAnimation(false);
        setRefreshTriggered(false);
        setAppData(fetchDataValue.contents.response);
        toast.success("application fetched successfully");
        setRefreshTriggered(false);
      }
    }
  }, [fetchDataValue, setAppData, refreshTriggered]);

  const handleRefreshClick = () => {
    setIconAnimation(true);
    setRefreshTriggered(true);
    refreshFetchedData();
  };

  return (
    <div
      onClick={handleRefreshClick}
      className={`${iconAnimation ? "animate-spin" : ""}`}
      title="refresh"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    </div>
  );
};
