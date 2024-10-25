import { useEffect, useState } from "react";

export const StatusDropDown = () => {
  const [bgColor, setBgColor] = useState("");

  function handleColorChange(value: string) {
    switch (value) {
      case "applied":
        setBgColor("bg-yellow-400");
        break;
      case "rejected":
        setBgColor("bg-red-500");
        break;
      case "interview":
        setBgColor("bg-green-400");
        break;
      case "neglect":
        setBgColor("bg-slate-500");
        break;
      default:
        setBgColor("");
    }
  }

  function handleStatusChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    handleColorChange(value);
  }

  useEffect(() => {
    handleColorChange("applied");
  }, []);

  return (
    <div
      className={`font-semibold border ${bgColor} flex justify-center border-black rounded-md md:px-2`}
    >
      <select
        title="status"
        className={`focus:outline-none w-full py-2 ${bgColor}`}
        onChange={handleStatusChange}
      >
        <option value={"applied"}>Applied</option>
        <option value={"interview"}>Interview Scheduled</option>
        <option value={"rejected"}>Rejected</option>
        <option value={"neglect"}>Neglect</option>
      </select>
    </div>
  );
};
