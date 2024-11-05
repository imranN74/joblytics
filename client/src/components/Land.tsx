export const Land = () => {
  return (
    <div className="flex justify-center h-screen items-center ">
      <div className="flex items-center logo-font flex-col text-2xl md:text-4xl ">
        <div>
          <div className="">Track</div>
          <div className="pt-2">Your Job Application</div>
          <div className="ml-40 sm:ml-56 pt-2">With Ease</div>
        </div>
        <div className="mt-5">
          <button className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
            Explore
          </button>
        </div>
        <div className="mt-10 border-2 rounded-full border-black p-2 animate-bounce ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
