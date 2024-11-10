import { Chart } from "./Chart";

export const GraphContainer = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="border rounded-md shadow-md p-2 w-96 h-full">
        <Chart />
      </div>
    </div>
  );
};
