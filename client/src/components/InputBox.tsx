import { ChangeEvent } from "react";

type InputValues = {
  placeHolder?: string;
  labelValue: string;
  value: string;

  typeValue: string;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  idValue: string;
  isRequired: boolean;
};

export const InputBox: React.FC<InputValues> = ({
  placeHolder,
  value,
  labelValue,
  typeValue,
  handleOnChange,
  idValue,
  isRequired,
}) => {
  return (
    <div>
      <div>
        <label
          htmlFor={idValue}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {labelValue}
        </label>
        <input
          value={value}
          name={idValue}
          type={typeValue}
          onChange={handleOnChange}
          id={idValue}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeHolder ? placeHolder : labelValue}
          required={isRequired}
        />
      </div>
    </div>
  );
};
