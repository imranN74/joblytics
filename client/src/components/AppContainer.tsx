import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { StatusDropDown } from "./StatusDropDown";
import { AppValues } from "./AppValues";
import { NotesButton } from "./NotesButton";

const BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const AppContainer = () => {
  return (
    <div className="border rounded-xl md:px-5 shadow-md mt-2">
      <div>
        <div className="flex justify-between px-5 py-2">
          <div>
            <NotesButton />
          </div>
          <div>
            <StatusDropDown />
          </div>
          <div className="flex">
            <DeleteButton />
            <EditButton />
          </div>
        </div>
        <div className="flex justify-around items-center py-5">
          <AppValues value="Google" titleValue="Company" />
          <AppValues value="SDE-1" titleValue="Role" />
          <AppValues value="Banglore" titleValue="Location" />
          <AppValues value="2 Oct,2024" titleValue="Applied Date" />
        </div>
      </div>
    </div>
  );
};
