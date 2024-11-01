import { useState } from "react";
import { NoteCard } from "./NoteCard";

type NoteType = {
  company: string;
  role: string;
  appNote: string;
};

export const NotesButton: React.FC<NoteType> = ({ company, role, appNote }) => {
  const [inforCardVisiblity, setInfoCardVaisiblity] = useState(false);

  const handleMouseOver = () => setInfoCardVaisiblity(true);
  const handleMouseOut = () => setInfoCardVaisiblity(false);

  function toggleVisibiltyOnClick() {
    setInfoCardVaisiblity((prevValue) => !prevValue);
  }

  return (
    <div>
      <div
        onClick={toggleVisibiltyOnClick}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        className="flex cursor-pointer"
        // title="your note"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="green"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
        <div className="font-semibold italic pl-1">Note</div>
      </div>
      <NoteCard
        isVisible={inforCardVisiblity}
        company={company}
        role={role}
        note={appNote}
      />
    </div>
  );
};
