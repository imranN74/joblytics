type TextValue = { value: string; size?: string };

export const TextTag: React.FC<TextValue> = ({ value, size }) => {
  return (
    <div className={`${size ? size : "text-2xl"} text-center mt-2`}>
      {value}
    </div>
  );
};
