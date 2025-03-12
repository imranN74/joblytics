import { ChangeEvent } from "react";

export const TextArea: React.FC<{
  value: string;
  label: string;
  textAreaChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ value, textAreaChange, label }) => {
  return (
    <div>
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={textAreaChange}
        id="message"
        name="appNote"
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your note here..."
      ></textarea>
    </div>
  );
};
