import { ChangeEvent } from "react";
import { InputBox } from "../InputBox";
import { SubmitButton } from "../SubmitButton";
import axios from "axios";
import { useState } from "react";
import { CreateContacts } from "@imrannazir/joblytics-zod";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { contactAtom } from "../../store/atoms/contactAtoms";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const ContactForm = () => {
  const { id } = useParams();
  const token = localStorage.getItem("jwt");

  type Contacts = {
    id: string;
    name: string;
    contact: string;
  };

  const [contactData, setCreatedContactData] =
    useRecoilState<Contacts[]>(contactAtom);

  const [contactValues, setContactValues] = useState<CreateContacts>({
    jobId: id ?? "",
    name: "",
    contact: "",
  });

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setContactValues({ ...contactValues, [name]: value });
  }

  async function handlSubmit() {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/contact/create`,
        {
          name: contactValues.name,
          contact: contactValues.contact,
          jobId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCreatedContactData([...contactData, response.data.response]);
      setContactValues({ name: "", contact: "", jobId: "" });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-end justify-center sm:gap-5 gap-2 bg-red-200 p-4 rounded-md w-full">
        <InputBox
          maxlength={10}
          typeValue="text"
          placeHolder="Eg: HR,Manager"
          labelValue="Name"
          handleOnChange={handleOnChange}
          idValue="name"
          value={contactValues.name}
        />
        <InputBox
          typeValue="text"
          placeHolder="Eg: johndoe@gmail.com"
          labelValue="Contact"
          handleOnChange={handleOnChange}
          idValue="contact"
          value={contactValues.contact}
        />
        <SubmitButton handleClick={handlSubmit} value="Add" />
      </div>
    </div>
  );
};
