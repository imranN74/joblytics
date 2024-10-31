import axios from "axios";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { isJobAppUpdate } from "../../store/atoms/atom";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const DeleteButton: React.FC<{ id: string }> = ({ id }) => {
  const setIsUpdatedStateValue = useSetRecoilState(isJobAppUpdate);

  async function handleDeleteClick() {
    const confirmation = window.confirm("Delete the application ?");
    if (!confirmation) {
      return;
    }
    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/job/delete/${id}`);
      toast.success(response.data.message);
      setIsUpdatedStateValue(true);
    } catch (error: any) {
      toast.warn(error.respnse.data.messsage);
    }
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
