import { InputBox } from "./InputBox";
import { SubmitButton } from "./SubmitButton";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const SignForm: React.FC<{ page: string }> = ({ page }) => {
  const handleChange = () => {};
  return (
    <div>
      <div className="flex justify-center pb-2">
        <Logo />
      </div>
      <div className="flex justify-center">
        <div className="font-semibold text-xl">
          {page === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}
        </div>
        <span className="pl-2 underline">
          <Link to={page === "signup" ? "/signin" : "/signup"}>
            {page === "signup" ? "Login" : "Singup"}
          </Link>
        </span>
      </div>
      <div className="">
        {page === "signup" ? (
          <InputBox
            // value=""
            placeHolder="Name"
            typeValue="text"
            handleOnChange={() => {
              handleChange();
            }}
            idValue="name"
            isRequired={true}
          />
        ) : (
          ""
        )}
        <InputBox
          // value=""
          placeHolder="Email"
          typeValue="email"
          handleOnChange={() => {
            handleChange();
          }}
          idValue="email"
          isRequired={true}
        />
        {page === "signup" ? (
          <InputBox
            // value=""
            placeHolder="Profile"
            typeValue="text"
            handleOnChange={() => {
              handleChange();
            }}
            idValue="profile"
            isRequired={true}
          />
        ) : (
          ""
        )}

        <InputBox
          // value=""
          placeHolder="Password"
          typeValue="password"
          handleOnChange={() => {
            handleChange();
          }}
          idValue="pwd"
          isRequired={true}
        />

        {page === "signup" ? (
          <InputBox
            // value=""
            placeHolder="Confirm Password"
            typeValue="password"
            handleOnChange={() => {
              handleChange();
            }}
            idValue="cnfpwd"
            isRequired={true}
          />
        ) : (
          ""
        )}
        <div className="flex justify-center mt-2">
          <SubmitButton value={page === "signup" ? "SignUp" : "Login"} />
        </div>
      </div>
    </div>
  );
};
