type Value = {
  value: String;
};

export const AppValues: React.FC<Value> = ({ value }) => {
  return (
    <div className="font-semibold border whitespace-nowrap border-black rounded-md px-1 md:px-2">
      {value}
    </div>
  );
};
