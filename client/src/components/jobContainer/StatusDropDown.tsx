import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UpdateAppstatus } from "@imrannazir/joblytics-zod";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

type DropDown = {
  status?: string;
  id?: string;
  handleCreateStatus?: (e: ChangeEvent<HTMLSelectElement>) => void;
  page: string;
};

export const StatusDropDown: React.FC<DropDown> = ({
  status,
  id,
  handleCreateStatus,
  page,
}) => {
  status = status ? status : "applied";
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
      case "interviewing":
        setBgColor("bg-orange-400");
        break;
      case "neglect":
        setBgColor("bg-slate-500");
        break;
      case "offered":
        setBgColor("bg-green-500");
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
        name="applicationStatus"
        id={id}
        title={appStatusValue.applicationStatus}
        className={`focus:outline-none w-28 md:w-full md:py-2 py-1 ${bgColor} capitalize  cursor-pointer rounded-md`}
        onChange={page === "create" ? handleCreateStatus : handleStatusChange}
        value={appStatusValue.applicationStatus}
      >
        <option value={status} className="capitalize" disabled>
          {status}
        </option>
        <option className="" value="applied">
          Applied
        </option>
        <option value={"interviewing"}>Interviewing</option>
        <option value={"rejected"}>Rejected</option>
        <option value={"neglect"}>Neglect</option>
        <option value={"offered"}>Offered</option>
      </select>
    </div>
  );
};
