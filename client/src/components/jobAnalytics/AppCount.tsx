import { Loader } from "../loader/Loader";
import { useFetchData } from "../../hooks/fetchData";
import { ErrorPage } from "../jobContainer/ErrorPage";
import { CountContainer } from "./CountContainer";
import { useMemo } from "react";

export const AppCount = () => {
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

  const { appData, fetchDataValue } = useFetchData();

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

  {
    if (fetchDataValue.state === "loading") {
      return (
        <div className="flex justify-center mt-40 items-center">
          <Loader />
        </div>
      );
    } else if (fetchDataValue.state === "hasError") {
      return <ErrorPage />;
    } else if (fetchDataValue.state === "hasValue" && appData.length > 0) {
      return (
        <div className="h-screen flex flex-col justify-center items-center text-xl">
          <CountContainer
            count={appData.length}
            bgColor="bg-yellow-500"
            status="Applied"
          />
          <div className="flex gap-10 mt-2">
            <CountContainer
              count={offeredData.length}
              bgColor="bg-green-500"
              status="Offered"
            />
            <CountContainer
              count={interviewingData.length}
              bgColor="bg-orange-500"
              status="Interviewing"
            />
            <CountContainer
              count={rejectedData.length}
              bgColor="bg-red-500"
              status="Rejected"
            />
          </div>
        </div>
      );
    }
  }
};
