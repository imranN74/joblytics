export const AnalyticsLandContainer = () => {
  return (
    <div className="flex justify-around w-full bg-gradient-to-bl from-cyan-50 to-cyan-100">
      <div className="flex items-center w-1/2 p-5">
        <div className="text-sm sm:text-2xl font-serif">
          Gain insights into your job search progress with Joblytics. Track your
          job search progress.
        </div>
      </div>
      <div className="w-1/2 p-5">
        <img
          src="/analytics.png"
          title="application image"
          className="object-cover rounded-2xl border shadow-2xl"
          height={500}
          width={500}
        />
      </div>
    </div>
  );
};
