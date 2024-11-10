import { useMemo } from "react";
import { useFetchData } from "./fetchData";

export const useFilterApp = (id: string) => {
  const { appData } = useFetchData();

  const applicationData = useMemo(() => {
    return appData.filter((element) => {
      return element.id === id;
    });
  }, [appData]);

  return applicationData;
};

export const useFilterAppStatus = () => {
  const { appData } = useFetchData();

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

  // to get data of all application status
  const { offeredData, interviewingData, rejectedData } = useMemo(() => {
    return appData.reduce(
      (
        acc: {
          offeredData: JobApp[];
          interviewingData: JobApp[];
          rejectedData: JobApp[];
        },
        element
      ) => {
        if (element.appStatus === "offered") acc.offeredData.push(element);
        else if (element.appStatus === "rejected")
          acc.rejectedData.push(element);
        else if (element.appStatus === "interviewing")
          acc.interviewingData.push(element);
        return acc;
      },
      { offeredData: [], interviewingData: [], rejectedData: [] }
    );
  }, [appData]);

  return { offeredData, interviewingData, rejectedData };
};
