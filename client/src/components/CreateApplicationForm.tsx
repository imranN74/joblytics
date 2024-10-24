import { useRecoilValue } from "recoil";
import { modalFormAtom } from "../store/atoms/atom";
import { InputBox } from "./InputBox";
import { StatusDropDown } from "./StatusDropDown";
import { TextArea } from "./TextArea";
import { SubmitButton } from "./SubmitButton";

export const CreateApplicationForm = () => {
  const modalState = useRecoilValue(modalFormAtom);

  function handleChange() {}

  return (
    <div
      className={`md:flex md:justify-center border shadow-xl rounded-lg py-2 mt-2 ${
        modalState ? "block" : "hidden"
      }`}
    >
      <div className="md:w-1/2 ">
        <div className="px-3 md:px-0">
          <div className="md:flex md:justify-between">
            <InputBox
              // value=""
              placeHolder="Company"
              typeValue="text"
              handleOnChange={() => {
                handleChange();
              }}
              idValue="company"
              isRequired={true}
            />
            <InputBox
              // value=""
              placeHolder="Role"
              typeValue="text"
              handleOnChange={() => {
                handleChange();
              }}
              idValue="role"
              isRequired={true}
            />
          </div>
          <div className="md:flex md:justify-around">
            <InputBox
              // value=""
              placeHolder="Location"
              typeValue="text"
              handleOnChange={() => {
                handleChange();
              }}
              idValue="location"
              isRequired={true}
            />
            <InputBox
              // value=""
              placeHolder="Applied Date"
              typeValue="date"
              handleOnChange={() => {
                handleChange();
              }}
              idValue="appDate"
              isRequired={true}
            />
          </div>
          <div className="mt-2">
            <div>Status</div>
            <StatusDropDown />
          </div>
          <div className="mt-2">
            <TextArea />
          </div>
          <div className="flex justify-center mt-2">
            <SubmitButton value="Add" />
          </div>
        </div>
      </div>
    </div>
  );
};
