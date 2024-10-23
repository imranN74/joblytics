export const Land = () => {
  return (
    <div className="h-screen  bg-[url('https://img.freepik.com/free-photo/top-view-blue-monday-concept-with-copy-space_23-2148719974.jpg')] bg-cover bg-center">
      <div className="absolute backdrop-blur-md"></div>
      <div className="text-white">
        <div className="flex items-center font-mono flex-col font-bold text-2xl md:text-4xl h-full">
          <div className="mt-40 md:mt-20">TRACK</div>
          <div className="">Your Job Application</div>
          <div>With Ease</div>
        </div>
        <div className="flex flex-col items-center pt-2">
          <div className="font-semibold mt-12 md:mt-10 text-2xl">
            What<span className="text-3xl text-red-600">?</span> & How
            <span className="text-3xl text-red-600">?</span>
          </div>

          <div className="font-serif border border-black hover:border px-2 py-2 cursor-pointer rounded-xl hover:bg-slate-400 hover:italic bg-slate-300 hover:border-y-2 hover:border-spacing-x-4 mt-10 md:mt-20">
            Let's Explore
          </div>
        </div>
      </div>
    </div>
  );
};
