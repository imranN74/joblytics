import { useRecoilState } from "recoil";
import { modalFormAtom } from "../../store/atoms/atom";

export const AddButton = () => {
  const [modalState, setModalState] = useRecoilState(modalFormAtom);
  const handleAddClick = () => {
    setModalState(modalState ? false : true);
  };

  return (
    <div
      className="cursor-pointer"
      title="add applications"
      onClick={handleAddClick}
    >
      {!modalState ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="lime"
          viewBox="0 0 24 24"
          strokeWidth="1"
          stroke="currentColor"
          className="size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="red"
          viewBox="0 0 24 24"
          strokeWidth="1"
          stroke="currentColor"
          className="size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      )}
    </div>
  );
};
