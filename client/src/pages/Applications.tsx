import { AppContainer } from "../components/jobContainer/AppContainer";
import { AddButton } from "../components/jobContainer/AddButton";
import { CreateApplicationForm } from "../components/jobContainer/CreateApplicationForm";
import { useRecoilValue } from "recoil";
import { modalFormAtom } from "../store/atoms/appAtom";
import { JobAppMsg } from "../components/jobContainer/JobAppMsg";
import { RefreshIcon } from "../components/jobContainer/RefreshIcon";

export const Applications = () => {
  const modalView = useRecoilValue(modalFormAtom);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12">
      <div className="col-span-full md:col-start-3 md:col-end-11">
        <div className="flex justify-between items-center px-2 md:px-5 sticky top-28 md:top-16 mt-1 py-2 rounded-md bg-red-300">
          <JobAppMsg
            msg={modalView ? "Add Application" : "Your Applications"}
          />
          <div className="md:flex md:justify-end">
            {!modalView ? <RefreshIcon /> : ""}
          </div>
          <AddButton />
        </div>
        {modalView ? (
          <div className="mt-28">
            <CreateApplicationForm />
          </div>
        ) : (
          <div className="mt-28">
            <AppContainer />
          </div>
        )}
      </div>
    </div>
  );
};
