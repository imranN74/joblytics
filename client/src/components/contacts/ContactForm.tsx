import { InputBox } from "../InputBox";
import { SubmitButton } from "../SubmitButton";

export const ContactForm = () => {
  function handleOnChange() {
    console.log("");
  }

  function handlSubmit() {}

  return (
    <div className="w-full">
      <div className="flex items-end justify-center sm:gap-5 gap-2 bg-red-200 p-4 rounded-md w-full">
        <InputBox
          typeValue="text"
          placeHolder="Eg: HR,Manager"
          labelValue="Name"
          handleOnChange={handleOnChange}
          idValue=""
          value=""
        />
        <InputBox
          typeValue="text"
          placeHolder="Eg: johndoe@gmail.com"
          labelValue="Contact"
          handleOnChange={handleOnChange}
          idValue=""
          value=""
        />
        <SubmitButton handleClick={handlSubmit} value="Add" />
      </div>
    </div>
  );
};
