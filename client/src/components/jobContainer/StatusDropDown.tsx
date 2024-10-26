import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UpdateAppstatus } from "@imrannazir/joblytics-zod";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const StatusDropDown: React.FC<{ status: string; id: string }> = ({
  status,
  id,
}) => {
  const [bgColor, setBgColor] = useState("");
  const [appStatusValue, setAppStatusValue] = useState<UpdateAppstatus>({
    applicationStatus: status,
  });

  function handleColorChange(value: string) {
    switch (value) {
      case "applied":
        setBgColor("bg-yellow-400");
        break;
      case "rejected":
        setBgColor("bg-red-500");
        break;
      case "interview scheduled":
        setBgColor("bg-green-400");
        break;
      case "neglect":
        setBgColor("bg-slate-500");
        break;
      default:
        setBgColor("");
    }
  }

  async function handleStatusChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const { value } = event.target;

    setAppStatusValue((prevValue) => {
      return { ...prevValue, applicationStatus: value };
    });
    handleColorChange(value);
    console.log(appStatusValue);
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.post(
        `${BACKEND_BASE_URL}/job/status/${id}`,
        {
          applicationStatus: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    handleColorChange(status);
  }, []);

  return (
    <div
      className={`font-semibold border ${bgColor} flex justify-center border-black rounded-md md:px-2`}
    >
      <select
        id={id}
        title={appStatusValue.applicationStatus}
        className={`focus:outline-none w-full py-2 ${bgColor} capitalize`}
        onChange={handleStatusChange}
        value={appStatusValue.applicationStatus}
      >
        <option value={status} className="capitalize" disabled>
          {status}
        </option>
        <option className="" value="applied">
          Applied
        </option>
        <option value={"interview scheduled"}>Interview Scheduled</option>
        <option value={"rejected"}>Rejected</option>
        <option value={"neglect"}>Neglect</option>
      </select>
    </div>
  );
};
