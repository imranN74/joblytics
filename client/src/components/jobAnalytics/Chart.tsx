import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useFilterAppStatus } from "../../hooks/filter";

export const Chart = () => {
  const { offeredData, interviewingData, rejectedData } = useFilterAppStatus();

  const data = [
    { name: "Offered", applications: offeredData.length },
    { name: "Interviewing", applications: interviewingData.length },
    { name: "Rejected", applications: rejectedData.length },
  ];

  return (
    <div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="applications" fill="#82ca9d" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
