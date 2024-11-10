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

export const useFilterAppStatus = () => {};
