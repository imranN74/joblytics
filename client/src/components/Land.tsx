import { Navbar } from "./Navbar";

export const Land = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center h- items-center">
        <div className="bg-yellow-300 inline-block shadow-md rounded-md px-5 py-5">
          <div className="flex items-center font-mono flex-col font-bold text-2xl md:text-4xl h-full">
            <div className="">TRACK</div>
            <div className="">Your Job Application</div>
            <div>With Ease</div>
          </div>
          <div className="flex flex-col items-center mt-5">
            <div className="font-semibold text-2xl">
              What<span className="text-3xl text-red-600">?</span> & How
              <span className="text-3xl text-red-600">?</span>
            </div>
            <div className="border rounded-xl px-4 py-2">Let's Explore</div>
          </div>
        </div>
      </div>
    </div>
  );
};
