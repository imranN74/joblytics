export const CountContainer: React.FC<{
  count: number;
  status: string;
  bgColor: string;
}> = ({ count, status, bgColor }) => {
  return (
    <div className="flex flex-col items-center font-thin">
      <div
        className={`border-2 p-5 rounded-full text-center w-16 h-16 ${bgColor}`}
      >
        <div className="font-normal">{count}</div>
      </div>
      <div>{status}</div>
    </div>
  );
};
