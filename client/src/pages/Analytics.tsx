import { AppCount } from "../components/jobAnalytics/AppCount";
import { GraphContainer } from "../components/jobAnalytics/GraphContainer";

export const Analytics = () => {
  return (
    <div>
      <div className="flex justify-center mt-28 sm:mt-16 rounded-b-xl sticky top-16">
        <AppCount />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row justify-evenly my-5 mx-2">
        <div className="">
          <GraphContainer />
        </div>
      </div>
    </div>
  );
};
