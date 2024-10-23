import { AppContainer } from "../components/AppContainer";

export const Applications = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-8">
      <div className="col-span-1 md:col-start-3 md:col-end-8 mt-10">
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
    </div>
  );
};
