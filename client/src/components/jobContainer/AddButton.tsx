import { useRecoilState, useSetRecoilState } from "recoil";
import { modalFormAtom, modalFormPageAtom } from "../../store/atoms/appAtom";
import { isAuthAtom } from "../../store/atoms/userAtom";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AddButton = () => {
  const navigate = useNavigate();

  //check if the user is logged in
  const isLoggedIn = useRecoilValue(isAuthAtom);

  //create modal open
  const [modalState, setModalState] = useRecoilState(modalFormAtom);

  //
  const setFormPageValue = useSetRecoilState(modalFormPageAtom);
  const handleAddClick = () => {
    if (!isLoggedIn) {
      navigate("/signin");
      toast.warn("login to continue");
    } else {
      setModalState(!modalState);
      setFormPageValue("create");
    }
  };

  return (
    <div
      className="cursor-pointer"
      title={modalState ? "close" : "add application"}
      onClick={handleAddClick}
    >
      {!modalState ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="lime"
          viewBox="0 0 24 24"
          strokeWidth="0.5"
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
          strokeWidth="0.5"
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
