import { SignForm } from "../components/SignForm";

export const SignUp = () => {
  return (
    <div className="flex justify-center h-screen items-center ">
      <div className="w-full px-3 md:w-1/3 border shadow-lg py-4 rounded-md">
        <SignForm page="signup" />
      </div>
    </div>
  );
};
