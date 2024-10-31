import { InputBox } from "./InputBox";
import { SubmitButton } from "./SubmitButton";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { useState } from "react";
import { SignupInput } from "@imrannazir/joblytics-zod";
import { ChangeEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const SignForm: React.FC<{ page: string }> = ({ page }) => {
  const [formData, setFormData] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
    profile: "",
  });

  const [cnfPwd, setCnfPwd] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "cnfpassword") {
      setCnfPwd(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const { email, name, password, profile } = formData;
  const navigate = useNavigate();
  async function submitClick() {
    if (email === "" || password === "") {
      if (page === "signup" && name === "") {
        toast.warn("Pleae fill all the fileds");
      }
      toast.warn("Pleae fill all the fileds");
    } else {
      try {
        const response = await axios.post(
          `${BACKEND_BASE_URL}/user/${page === "signup" ? "signup" : "signin"}`,
          {
            name: name,
            email: email,
            profile: profile,
            password: password,
          }
        );
        const token = response.data.token;
        localStorage.setItem("jwt", token);
        toast.success(
          `${page === "signup" ? "Signed" : "Logged"} up successfully`
        );
        navigate("/applications");
      } catch (error: any) {
        toast.warning(error.response.data.message);
      }
    }
  }

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
            value={formData.name}
            labelValue="Name"
            typeValue="text"
            handleOnChange={handleChange}
            idValue="name"
          />
        ) : (
          ""
        )}
        <InputBox
          value={formData.email}
          labelValue="Email"
          typeValue="email"
          handleOnChange={handleChange}
          idValue="email"
        />
        {page === "signup" ? (
          <InputBox
            value={formData.profile}
            labelValue="Profile"
            placeHolder="Software Engineer, Full Stack Developer"
            typeValue="text"
            handleOnChange={handleChange}
            idValue="profile"
          />
        ) : (
          ""
        )}

        <InputBox
          value={formData.password}
          labelValue="Password"
          typeValue="password"
          handleOnChange={handleChange}
          idValue="password"
        />

        {page === "signup" ? (
          <InputBox
            value={cnfPwd}
            labelValue="Confirm Password"
            typeValue="password"
            handleOnChange={handleChange}
            idValue="cnfpassword"
          />
        ) : (
          ""
        )}
        {page === "signup" ? (
          formData.password != cnfPwd ? (
            <div className="text-red-600">Password doesn't match</div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        <div className="flex justify-center mt-2">
          <SubmitButton
            handleClick={submitClick}
            value={page === "signup" ? "SignUp" : "Login"}
            buttonType={
              page === "signup"
                ? formData.password != cnfPwd
                  ? "cursor-not-allowed"
                  : ""
                : ""
            }
          />
        </div>
      </div>
    </div>
  );
};
