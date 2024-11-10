import { useFetchData } from "./fetchData";

export const useFilterApp = (id: string) => {
  const { appData } = useFetchData();

  const applicationData = appData.filter((element) => {
    return element.id === id;
  });

  return applicationData;
};
