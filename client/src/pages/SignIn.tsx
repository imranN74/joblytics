import { SignForm } from "../components/SignForm";

export const SignIn = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full px-3 md:w-1/3 border shadow-lg py-4 rounded-md">
        <SignForm page="signin" />
      </div>
    </div>
  );
};
