type Value = {
  value: string;
  titleValue: string;
};

export const AppValues: React.FC<Value> = ({ value, titleValue }) => {
  return (
    <div
      title={titleValue ? titleValue : ""}
      className="font-semibold border whitespace-nowrap border-black rounded-md px-1 md:px-02"
    >
      {value}
    </div>
  );
};
