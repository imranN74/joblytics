import { Loader } from "../loader/Loader";
import { useFetchData } from "../../hooks/fetchData";
import { ErrorPage } from "../jobContainer/ErrorPage";

export const AppCount = () => {
  const { appData, fetchDataValue } = useFetchData();

  {
    if (fetchDataValue.state === "loading") {
      return (
        <div className="flex justify-center mt-56 items-center">
          <Loader />
        </div>
      );
    } else if (fetchDataValue.state === "hasError") {
      return <ErrorPage />;
    } else if (fetchDataValue.state === "hasValue" && appData.length > 0) {
      return (
        <div className="h-screen flex flex-col justify-center items-center text-xl">
          <div className="border-2 p-5 w-16 h-16 rounded-full text-center bg-yellow-500">
            <div>{appData.length}</div>
          </div>
          <div>
            <div>Applied</div>
          </div>
          <div className="flex gap-24 mt-2">
            <div className="flex flex-col items-center">
              <div className="border-2 p-5 rounded-full text-center w-16 h-16 bg-green-400">
                <div>{appData.length}</div>
              </div>
              <div>Offered</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="border-2 p-5 rounded-full text-center w-16 h-16 bg-cyan-300">
                <div>{appData.length}</div>
              </div>
              <div>interviewed</div>
            </div>
          </div>
        </div>
      );
    }
  }
};
