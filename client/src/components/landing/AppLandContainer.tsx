export const AppLandContainer = () => {
  return (
    <div
      id="applicationsInfo"
      className="flex justify-around w-full bg-gradient-to-bl from-cyan-50 to-cyan-100"
    >
      <div className="w-1/2 p-5">
        <img
          src="/applications.png"
          title="application image"
          className="object-cover rounded-2xl border shadow-2xl"
          height={500}
          width={500}
        />
      </div>
      <div className="flex items-center w-1/2 p-5">
        <div className="text-sm sm:text-2xl font-serif">
          Manage all your job applications in one place. Track dates,
          follow-ups, and details effortlessly with Joblytics.
        </div>
      </div>
    </div>
  );
};
