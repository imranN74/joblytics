import { EditButton } from "../jobContainer/EditButton";

type TextValue = { value: string; size?: string; editable?: boolean };

export const TextTag: React.FC<TextValue> = ({ value, size, editable }) => {
  return (
    <div className="flex justify-between items-center gap-10">
      <div className={`${size ? size : "text-xl"} text-center mt-2`}>
        {value}
      </div>
      <div>{editable ? <EditButton /> : ""}</div>
    </div>
  );
};
