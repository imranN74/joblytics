import { AddButton } from "./AddButton";

export const InitAdd = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="text-xl md:text-3xl font-semibold">
        <div className="flex justify-center">No Applications Yet!</div>
        <div> Start Tracking Your Job Applications</div>
      </div>
      <div>
        <AddButton />
      </div>
    </div>
  );
};
