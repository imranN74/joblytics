export const StatusDropDown = () => {
  return (
    <div className="font-semibold border border-black rounded-md md:px-2">
      <select title="status" className="focus:outline-none">
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Neglect</option>
      </select>
    </div>
  );
};
