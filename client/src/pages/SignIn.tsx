import { InputBox } from "../components/InputBox";
import { useState } from "react";
import { SigninInput } from "@imrannazir/joblytics-zod";
import { toast } from "react-toastify";
import { ChangeEvent } from "react";
import { SubmitButton } from "../components/SubmitButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { Link } from "react-router-dom";
import { isAuthAtom } from "../store/atoms/atom";
import { useSetRecoilState } from "recoil";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const SignIn = () => {
  const navigate = useNavigate();

  //set logged in flag
  const setIsLOggedIn = useSetRecoilState(isAuthAtom);

  const [formData, setFormData] = useState<SigninInput>({
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  //submit login
  const { email, password } = formData;
  async function submitClick() {
    if (email === "" && password === "") {
      toast.warn("Pleae fill all the fileds");
    } else {
      try {
        const response = await axios.post(`${BACKEND_BASE_URL}/user/signin`, {
          email: email,
          password: password,
        });
        const token = response.data.token;
        const name = response.data.response.name.split(" ")[0];
        localStorage.setItem("jwt", token);
        localStorage.setItem("name", name);
        toast.success("LoggedIn successfully");
        setIsLOggedIn(true);
        navigate("/applications");
      } catch (error: any) {
        toast.warning(error.response.data.message);
      }
    }
  }

  return (
    <div className="mt-24 flex justify-center items-center">
      <div className="w-full px-3 md:w-1/3 py-4 rounded-md">
        <div className="flex justify-center pb-2">
          <Logo />
        </div>
        <div className="flex justify-center">
          <div className="font-semibold text-xl">Don't have an account?</div>
          <span className="pl-2 underline">
            <Link to={"/signup"}>SignUp</Link>
          </span>
        </div>
        <div className="mt-2">
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
          <div className="flex justify-center mt-2">
            <SubmitButton handleClick={submitClick} value="Login" />
          </div>
        </div>
      </div>
    </div>
  );
};
