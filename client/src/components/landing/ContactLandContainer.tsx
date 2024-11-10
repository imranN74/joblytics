export const ContactLandContainer = () => {
  return (
    <div className="flex justify-around w-full bg-gradient-to-bl from-cyan-50 to-cyan-100">
      <div className="w-1/2 p-5">
        <img
          src="/contacts.png"
          title="application image"
          className="object-cover rounded-2xl border shadow-2xl"
          height={500}
          width={500}
        />
      </div>
      <div className="flex items-center w-1/2 p-5">
        <div className="text-sm sm:text-2xl font-serif">
          Organize and access essential contacts for each company, keeping you
          connected throughout your job search.
        </div>
      </div>
    </div>
  );
};
