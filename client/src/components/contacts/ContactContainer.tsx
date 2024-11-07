import { DeleteButton } from "../jobContainer/DeleteButton";
import { EditButton } from "../jobContainer/EditButton";
import { useParams } from "react-router-dom";

export const ContactContainer = () => {
  const { id } = useParams();
  return (
    <div>
      <div className="flex gap-4">
        <div>Name</div>
        <div>Contact</div>
        <DeleteButton id={id ? id : ""} />
        <EditButton id={id ? id : ""} />
      </div>
    </div>
  );
};
