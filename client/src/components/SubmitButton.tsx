type SubmitVal = {
  value: string;
  handleClick: () => void;
  buttonType?: boolean;
};

export const SubmitButton: React.FC<SubmitVal> = ({
  value,
  handleClick,
  buttonType,
}) => {
  return (
    <div>
      <button
        onClick={handleClick}
        type="button"
        disabled={buttonType}
        className={`"text-gray-900 bg-white border-2 border-black focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" ${
          buttonType ? "cursor-not-allowed" : ""
        }`}
      >
        {value}
      </button>
    </div>
  );
};
