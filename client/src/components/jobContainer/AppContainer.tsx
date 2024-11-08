import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { StatusDropDown } from "./StatusDropDown";
import { AppValues } from "./AppValues";
import { NotesButton } from "./NotesButton";
import { Loader } from "../loader/Loader";
import { InitAdd } from "./InitAdd";
import { ReminderIcon } from "./ReminderIcon";
import { ContactsIcon } from "./ContactsIcon";
import { useFetchData } from "../../hooks/fetchData";
import { ErrorPage } from "./ErrorPage";

export const AppContainer = () => {
  const { appData, fetchDataValue } = useFetchData();

  if ((appData?.length ?? 0) === 0 && fetchDataValue.state != "loading") {
    return (
      <div className="mt-64">
        <InitAdd />
      </div>
    );
  }

  if (fetchDataValue.state === "loading") {
    return (
      <div className="flex justify-center mt-56 items-center">
        <Loader />
      </div>
    );
  } else if (fetchDataValue.state === "hasError") {
    return <ErrorPage />;
  } else if (fetchDataValue.state === "hasValue") {
    return appData.map((data) => {
      const dateObject = new Date(data.appliedDate);

      const fullDate = String(dateObject).split(" ");
      const finDate = `${fullDate[2]} ${fullDate[1]},${fullDate[3]}`;

      return (
        <div
          className="border-b-2 shadow-sm rounded-sm md:px-5 capitalize hover:shadow-md hover:mx-1 cursor-pointer"
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
                <ContactsIcon id={data.id} />
                {data.appStatus === "interview scheduled" ? (
                  <ReminderIcon id={data.id} />
                ) : (
                  ""
                )}
                <EditButton id={data.id} />
                <DeleteButton
                  endpoint="/job/delete/"
                  id={data.id}
                  buttonSize={4}
                />
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
