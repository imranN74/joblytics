export const ProfileIcon: React.FC<{ value: string }> = ({ value }) => {
  return (
    <div className="flex justify-center">
      <div className="w-24 h-24 bg-red-400 rounded-full border-2 flex justify-center items-center text-5xl font-sans text-white uppercase">
        {value}
      </div>
    </div>
  );
};
