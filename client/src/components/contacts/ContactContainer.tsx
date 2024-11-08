import { DeleteButton } from "../jobContainer/DeleteButton";
import { useParams } from "react-router-dom";
import { CopyIcon } from "../jobContainer/CopyIcon";

export const ContactContainer = () => {
  const { id } = useParams();
  return (
    <div className="flex border-b-2 rounded-md py-5 px-2 w-full">
      <div className="flex gap-4">
        <div className="max-w-24 overflow-auto border text-center p-2 rounded-md">
          Manager
        </div>
        <div className="max-w-48 border text-center p-2 overflow-auto rounded-md">
          manager@gmail.com
        </div>
      </div>
      <div className="flex items-center gap-1">
        <CopyIcon buttonSize={6} value="" />
        <DeleteButton endpoint={""} id={id ? id : ""} buttonSize={6} />
      </div>
    </div>
  );
};
