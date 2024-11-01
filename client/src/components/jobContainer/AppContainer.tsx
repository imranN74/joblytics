import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { StatusDropDown } from "./StatusDropDown";
import { AppValues } from "./AppValues";
import { NotesButton } from "./NotesButton";
import { fetchDataSelector } from "../../store/atoms/atom";
import { appDataAtom } from "../../store/atoms/atom";
import {
  useRecoilValueLoadable,
  useRecoilState,
  useRecoilRefresher_UNSTABLE,
} from "recoil";
import { useEffect } from "react";
import { Loader } from "../loader/Loader";
import { InitAdd } from "./InitAdd";
import { ReminderIcon } from "./ReminderIcon";
import { Contacts } from "../jobContainer/Contacts";
import { isJobAppUpdate } from "../../store/atoms/atom";
import { toast } from "react-toastify";

export const AppContainer = () => {
  type JobApp = {
    company: string;
    role: string;
    location: string;
    appliedDate: Date;
    id: string;
    appNote: string;
    user: {
      name: string;
    };
    appStatus: string;
  };

  const fetchDataValue = useRecoilValueLoadable(fetchDataSelector("/job"));
  const [appData, setAppData] = useRecoilState<JobApp[]>(
    appDataAtom("bulkJobApp")
  );

  const [isUpdatedStateValue, setIsUpdatedStateValue] =
    useRecoilState(isJobAppUpdate);

  const refreshFetchedData = useRecoilRefresher_UNSTABLE(
    fetchDataSelector("/job")
  );

  //re-render the component if some changes occured like delete, update etc
  useEffect(() => {
    try {
      if (!isUpdatedStateValue) {
        return;
      } else {
        refreshFetchedData();
        if (fetchDataValue.state === "hasValue") {
          setAppData(fetchDataValue.contents.response);
        }
        setIsUpdatedStateValue(false);
      }
    } catch (error) {
      toast.warning("something went wrong");
    }
  }, [isUpdatedStateValue]);

  //initial mount on page load
  useEffect(() => {
    try {
      if (fetchDataValue.state === "hasValue") {
        setAppData(fetchDataValue.contents.response);
      }
    } catch (error) {
      toast.warning("something went wrong");
    }
  }, [fetchDataValue]);

  if ((appData?.length ?? 0) === 0 && fetchDataValue.state != "loading") {
    return (
      <div>
        <InitAdd />
      </div>
    );
  }

  if (fetchDataValue.state === "loading") {
    return (
      <div className="flex justify-center h-screen items-center">
        <Loader />
      </div>
    );
  } else if (fetchDataValue.state === "hasValue") {
    const userName = appData[0].user.name;
    const name = userName.split(" ")[0];
    localStorage.setItem("name", name);
    return appData.map((data) => {
      const dateObject = new Date(data.appliedDate);

      const fullDate = String(dateObject).split(" ");
      const finDate = `${fullDate[2]} ${fullDate[1]},${fullDate[3]}`;

      return (
        <div
          className="border-b-2 shadow-sm rounded-sm md:px-5 mt-2 capitalize hover:shadow-md hover:mx-1 cursor-pointer"
          id={data.id}
          key={data.id}
        >
          <div>
            <div className="flex justify-between px-5 py-2">
              <div>
                <NotesButton
                  company={data.company}
                  role={data.role}
                  appNote={data.appNote}
                />
              </div>
              <div>
                <StatusDropDown
                  page="update"
                  status={data.appStatus}
                  id={data.id}
                />
              </div>
              <div className="flex">
                <Contacts id={data.id} />
                <ReminderIcon id={data.id} />
                <EditButton id={data.id} />
                <DeleteButton id={data.id} />
              </div>
            </div>
            <div className="flex justify-around items-center py-5">
              <AppValues value={data.company} titleValue="Company" />
              <AppValues
                value={data.role ? data.role : "role"}
                titleValue="Role"
              />
              <AppValues
                value={data.location ? data.location : "location"}
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
