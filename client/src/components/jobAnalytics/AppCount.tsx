import { Loader } from "../loader/Loader";
import { useFetchData } from "../../hooks/fetchData";
import { ErrorPage } from "../jobContainer/ErrorPage";
import { CountContainer } from "./CountContainer";
import { useFilterAppStatus } from "../../hooks/filter";

export const AppCount = () => {
  const { appData, fetchDataValue } = useFetchData();

  const { offeredData, interviewingData, rejectedData } = useFilterAppStatus();

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
        <div className="flex flex-col items-center bg-red-200 w-full py-1">
          <CountContainer
            count={appData.length}
            bgColor="bg-yellow-500"
            status="Applied"
          />
          <div className="flex gap-5 mt-2">
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
