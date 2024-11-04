type NoteCardType = {
  company: string;
  role: string;
  note: string;
  isVisible: boolean;
};

export const NoteCard: React.FC<NoteCardType> = ({
  isVisible,
  company,
  role,
  note,
}) => {
  return (
    <div
      className={`${
        isVisible ? "block" : "hidden"
      } absolute bg-white w-56 border rounded-md shadow-xl p-2`}
    >
      <div className="flex justify-around border-b font-semibold">
        <div>{company}</div>
        <div>{role}</div>
      </div>
      <div className={`${!note ? "text-red-500" : ""} normal-case`}>
        {note ? note : "add a short note about this application :- Edit"}
      </div>
    </div>
  );
};
