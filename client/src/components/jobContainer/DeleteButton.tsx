import { useDeleteData } from "../../hooks/deleteData";

export const DeleteButton: React.FC<{ id: string }> = ({ id }) => {
  const deletData = useDeleteData("/job/delete/");

  async function handleDeleteClick() {
    deletData(id);
  }

  return (
    <div
      id={id}
      className="cursor-pointer px-1 md:px-3"
      title="Delete"
      onClick={handleDeleteClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="red"
        className="size-4 md:size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </div>
  );
};
