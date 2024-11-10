export const CountContainer: React.FC<{
  count: number;
  status: string;
  bgColor: string;
}> = ({ count, status, bgColor }) => {
  return (
    <div className="flex gap-1 items-center font-semibold text-sm">
      <div>{status}</div>
      <div
        className={`border flex border-black w-8 h-8 rounded-full justify-center items-center ${bgColor}`}
      >
        <div className="font-normal">{count}</div>
      </div>
    </div>
  );
};
