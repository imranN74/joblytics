import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { StatusDropDown } from "./StatusDropDown";
import { AppValues } from "./AppValues";

export const AppContainer = () => {
  return (
    <div className="border rounded-xl md:px-5 shadow-md mt-2">
      <div>
        <div className="flex justify-end px-5 py-2">
          <DeleteButton />
          <EditButton />
        </div>
        <div className="flex justify-around items-center py-5">
          <AppValues value="Google" />
          <AppValues value="SDE-1" />
          <AppValues value="Banglore" />
          <AppValues value="2 Oct,2024" />
          <StatusDropDown />
        </div>
      </div>
    </div>
  );
};
