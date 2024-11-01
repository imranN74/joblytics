import { useSetRecoilState } from "recoil";
import { modalFormAtom } from "../../store/atoms/atom";
import axios from "axios";
import { specificAppAtom } from "../../store/atoms/atom";
import { modalFormPageAtom } from "../../store/atoms/atom";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const EditButton: React.FC<{ id: string }> = ({ id }) => {
  const setModalVisibility = useSetRecoilState(modalFormAtom);
  const setModalUpdateData = useSetRecoilState(specificAppAtom);
  const setFormPageValue = useSetRecoilState(modalFormPageAtom);
  const token = localStorage.getItem("jwt");

  async function handleeditClick() {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/job/application/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setModalUpdateData({ ...response.data.response, isUpdating: true });
    setFormPageValue("update");
    setModalVisibility(true);
  }

  return (
    <div
      onClick={handleeditClick}
      id={id}
      className="cursor-pointer px-1 md:px-3"
      title="Edit"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1"
        stroke="currentColor"
        className="size-4 md:size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>
    </div>
  );
};
