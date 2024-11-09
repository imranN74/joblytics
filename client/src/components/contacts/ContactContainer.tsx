import { CopyIcon } from "../jobContainer/CopyIcon";
import { DeleteButton } from "../DeleteButton";

export const ContactContainer: React.FC<{
  name: string;
  contact: string;
  contactId: string;
}> = ({ name, contact, contactId }) => {
  return (
    <div
      className="flex border-b-2 rounded-md py-5 px-2 w-full"
      id={contactId}
      key={contactId}
    >
      <div className="flex gap-4 justify-center w-full">
        <div className="min-w-20 max-w-24 md:max-w-72 sm:min-w-32 overflow-auto border border-black text-center p-2 rounded-md">
          {name}
        </div>
        <div className="min-w-36 max-w-48 md:max-w-96 sm:min-w-64 border border-black text-center p-2 overflow-auto rounded-md">
          {contact}
        </div>
        <div className="flex items-center gap-1">
          <CopyIcon buttonSize={6} value="" />
          <DeleteButton
            endpoint={`/contact/delete/`}
            id={contactId}
            buttonSize={6}
          />
        </div>
      </div>
    </div>
  );
};
