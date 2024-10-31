import { useRecoilState } from "recoil";
import { InputBox } from "../InputBox";
import { StatusDropDown } from "./StatusDropDown";
import { TextArea } from "../TextArea";
import { SubmitButton } from "../SubmitButton";
import { modalFormAtom } from "../../store/atoms/atom";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { CreateApplication } from "@imrannazir/joblytics-zod";
import { toast } from "react-toastify";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const CreateApplicationForm = () => {
  const token = localStorage.getItem("jwt");

  const [modalState, setModalView] = useRecoilState(modalFormAtom);
  const [formValue, setFormValue] = useState<CreateApplication>({
    company: "",
    appliedDate: "",
    applicationStatus: "applied",
    role: "",
    location: "",
    appNote: "",
  });

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  }
  console.log(formValue);
  async function onClickSubmit() {
    const { company, appliedDate, applicationStatus } = formValue;
    if (!company && !appliedDate && !applicationStatus) {
      toast.warn("Required fields are empty");
    } else {
      try {
        const response = await axios.post(
          `${BACKEND_BASE_URL}/job/create`,
          {
            company: formValue.company,
            appliedDate: formValue.appliedDate,
            applicationStatus: formValue.applicationStatus,
            role: formValue.role,
            location: formValue.location,
            appNote: formValue.appNote,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(response.data.message);
        setModalView(false);
      } catch (error: any) {
        toast.warning(error.response.data.message);
      }
    }
  }

  return (
    <div
      className={`md:flex md:justify-center border shadow-xl rounded-lg py-1 mt-1 ${
        modalState ? "block" : "hidden"
      }`}
    >
      <div className="md:w-1/2 ">
        <div className="px-3 md:px-0">
          <div className="md:flex md:justify-between">
            <InputBox
              value={formValue.company}
              labelValue="Company"
              typeValue="text"
              handleOnChange={handleChange}
              idValue="company"
              maxlength={10}
            />
            <InputBox
              value={formValue.role ? formValue.role : ""}
              labelValue="Role"
              typeValue="text"
              handleOnChange={handleChange}
              idValue="role"
              maxlength={10}
            />
          </div>
          <div className="md:flex md:justify-around">
            <InputBox
              value={formValue.location ? formValue.location : ""}
              labelValue="Location"
              typeValue="text"
              handleOnChange={handleChange}
              idValue="location"
              maxlength={10}
            />
            <InputBox
              value={formValue.appliedDate}
              labelValue="Applied Date"
              typeValue="date"
              handleOnChange={handleChange}
              idValue="appliedDate"
              maxlength={10}
            />
          </div>
          <div className="mt-2">
            <div>Status</div>
            <StatusDropDown handleCreateStatus={handleChange} page={"create"} />
          </div>
          <div className="mt-2">
            <TextArea
              value={formValue.appNote ? formValue.appNote : ""}
              textAreaChange={handleChange}
            />
          </div>
          <div className="flex justify-center mt-2">
            <SubmitButton handleClick={onClickSubmit} value="Add" />
          </div>
        </div>
      </div>
    </div>
  );
};
