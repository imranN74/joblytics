import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { StatusDropDown } from "./StatusDropDown";
import { AppValues } from "./AppValues";
import { NotesButton } from "./NotesButton";
import { fetchDataSelector } from "../../store/atoms/atom";
import { appDataAtom } from "../../store/atoms/atom";
import { useRecoilValueLoadable, useRecoilState } from "recoil";
import { useEffect } from "react";
import { Loader } from "./loader/Loader";

export const AppContainer = () => {
  type JobApp = {
    company: string;
    role: string;
    location: string;
    appliedDate: Date;
    id: string;
    appNote: string;
    name: string;
    appStatus: string;
  };

  const fetchDataValue = useRecoilValueLoadable(fetchDataSelector("/job"));
  const [appData, setAppData] = useRecoilState<JobApp[]>(
    appDataAtom("bulkJobApp")
  );

  if (fetchDataValue.state === "hasValue") {
    console.log(fetchDataValue.contents.data);
  }

  useEffect(() => {
    if (fetchDataValue.state === "hasValue") {
      setAppData(fetchDataValue.contents.data);
    }
  }, [fetchDataValue]);

  console.log("appdata", appData);

  if (fetchDataValue.state === "loading") {
    return (
      <div className="flex justify-center h-screen items-center">
        <Loader />
      </div>
    );
  } else if (fetchDataValue.state === "hasValue") {
    return appData.map((data, index) => {
      const dateObject = new Date(data.appliedDate);

      const fullDate = String(dateObject).split(" ");
      const finDate = `${fullDate[2]} ${fullDate[1]},${fullDate[3]}`;

      return (
        <div
          className="border rounded-xl md:px-5 shadow-md mt-2 capitalize"
          id={data.id}
          key={index}
        >
          <div>
            <div className="flex justify-between px-5 py-2">
              <div>
                <NotesButton />
              </div>
              <div>
                <StatusDropDown status={data.appStatus} />
              </div>
              <div className="flex">
                <DeleteButton />
                <EditButton />
              </div>
            </div>
            <div className="flex justify-around items-center py-5">
              <AppValues value={data.company} titleValue="Company" />
              <AppValues
                value={data.role ? data.role : "Add Role"}
                titleValue="Role"
              />
              <AppValues
                value={data.location ? data.location : "add location"}
                titleValue="Location"
              />
              <AppValues value={finDate} titleValue="Applied Date" />
            </div>
          </div>
        </div>
      );
    });
  }
};
