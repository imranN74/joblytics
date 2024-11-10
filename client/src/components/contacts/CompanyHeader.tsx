import { useFilterApp } from "../../hooks/filter";

export const CompanyHeader: React.FC<{ id: string }> = ({ id }) => {
  const applicationData = useFilterApp(id);

  return (
    <div className="flex gap-5 text-xl font-semibold text-red-900 rounded-md">
      <div className="capitalize">{applicationData[0]?.company ?? ""}</div>
      <div className="uppercase">{applicationData[0]?.role ?? ""}</div>
    </div>
  );
};
