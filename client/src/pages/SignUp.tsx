import { OtpCard } from "../components/user/OtpCard";
import { useState } from "react";
import { SignupInput } from "@imrannazir/joblytics-zod";
import { ChangeEvent } from "react";
import { Logo } from "../components/Logo";
import { Link } from "react-router-dom";
import { InputBox } from "../components/InputBox";
import { SubmitButton } from "../components/SubmitButton";
import { toast } from "react-toastify";
import axios from "axios";
import { SignContent } from "./SignContent";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const SignUp = () => {
  const [optCardVisibility, setOtpCardVisibility] = useState(false);
  const [cnfPwd, setCnfPwd] = useState<string>("");

  //to disable signup button while requesting
  const [isSigniUpButtonActive, setIsSigniUpButtonActive] = useState(false);

  const [formData, setFormData] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
    profile: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "cnfpassword") {
      setCnfPwd(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const { email, name, password, profile } = formData;
  async function submitClick() {
    if (email === "" && password === "" && name === "") {
      toast.warn("Pleae fill all the fileds");
    } else {
      try {
        setIsSigniUpButtonActive(true);
        const response = await axios.post(`${BACKEND_BASE_URL}/user/otp`, {
          email: email,
          name: name,
          password: password,
          profile: profile,
        });

        //set visiblity of OTP modal
        setOtpCardVisibility(true);

        toast.success(response.data);
        setIsSigniUpButtonActive(false);
      } catch (error: any) {
        setIsSigniUpButtonActive(false);
        toast.warning(error.response.data.message);
      }
    }
  }

  return (
    <div className="md:flex md:h-screen">
      <SignContent />
      <div className="flex justify-center items-center h-screen md:h-auto md:mt-20 md:w-1/2">
        <div className="w-full px-3 md:w-4/5 py-4 rounded-md">
          {!optCardVisibility ? (
            <div>
              <div className="flex justify-center pb-2">
                <Logo />
              </div>
              <div className="flex justify-center">
                <div className="font-semibold text-xl">
                  Already have an account?
                </div>
                <span className="pl-2 underline">
                  <Link to={"/signin"}>Login</Link>
                </span>
              </div>
              <div className="">
                <InputBox
                  value={formData.name}
                  labelValue="Name"
                  typeValue="text"
                  handleOnChange={handleChange}
                  idValue="name"
                />

                <InputBox
                  value={formData.email}
                  labelValue="Email"
                  typeValue="email"
                  handleOnChange={handleChange}
                  idValue="email"
                />

                <InputBox
                  value={formData.password}
                  labelValue="Password"
                  typeValue="password"
                  handleOnChange={handleChange}
                  idValue="password"
                />

                <InputBox
                  value={cnfPwd}
                  labelValue="Confirm Password"
                  typeValue="password"
                  handleOnChange={handleChange}
                  idValue="cnfpassword"
                />

                {formData.password != cnfPwd ? (
                  <div className="text-red-600">
                    Confirm Password doesn't match
                  </div>
                ) : (
                  ""
                )}
                <div className="flex justify-center mt-2">
                  <SubmitButton
                    handleClick={submitClick}
                    value={isSigniUpButtonActive ? "Signing Up..." : "SignUp"}
                    buttonType={
                      !isSigniUpButtonActive
                        ? formData.password != cnfPwd
                          ? true
                          : false
                        : true
                    }
                  />
                </div>
              </div>
            </div>
          ) : (
            <OtpCard
              resendClick={submitClick}
              name={name}
              email={email}
              password={password}
              profile={profile}
            />
          )}
        </div>
      </div>
    </div>
  );
};
