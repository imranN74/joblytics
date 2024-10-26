import { AddButton } from "./AddButton";

export const InitAdd = () => {
  return (
    <div className="flex justify-center flex-col h-screen items-center">
      <div className="text-xl md:text-3xl font-bold">
        <div className="flex justify-center">No Applications Yet!</div>
        <div> Start Tracking You Job Applications</div>
      </div>
      <div>
        <AddButton />
      </div>
    </div>
  );
};
