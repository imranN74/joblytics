import { AppContainer } from "../components/jobContainer/AppContainer";
import { AddButton } from "../components/jobContainer/AddButton";
import { CreateApplicationForm } from "../components/jobContainer/CreateApplicationForm";
import { useRecoilValue } from "recoil";
import { modalFormAtom } from "../store/atoms/atom";
import { JobAppMsg } from "../components/JobAppMsg";

export const Applications = () => {
  const modalView = useRecoilValue(modalFormAtom);

  return (
    <div className="grid grid-cols-1 md:grid-cols-8">
      <div className="col-span-full md:col-start-3 md:col-end-8">
        <div className="flex justify-between items-center px-2 md:px-5 sticky top-0 py-2 rounded-md bg-red-300">
          <JobAppMsg
            msg={modalView ? "Add Application" : "Your Applicatuons"}
          />
          <AddButton />
        </div>
        {modalView ? (
          <div className="">
            <CreateApplicationForm />
          </div>
        ) : (
          <div>
            <AppContainer />
            <AppContainer />
            <AppContainer />
            <AppContainer />
            <AppContainer />
            <AppContainer />
            <AppContainer />
            <AppContainer />
            <AppContainer />
            <AppContainer />
          </div>
        )}
      </div>
    </div>
  );
};
